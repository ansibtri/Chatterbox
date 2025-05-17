import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getPostsOfUserByUserId } from "../../../lib/axios/posts";
import { getUserDataByUsername } from "../../../lib/axios/users";
import PostsOverviewCard from "../../../components/Posts/PostsOverviewCard";

export const Route = createFileRoute("/(app)/user/$username/")({
  component: RouteComponent,
  loader:async ({params})=>{
    console.log("from username index",params)
    
    const user = await getUserDataByUsername(params.username);
    console.log(user)
    return user;
  },
  pendingComponent:()=><p>Loading...</p>
});

function RouteComponent() {
  // get context
  const context = Route.useRouteContext();
  // get loader data
  const user = Route.useLoaderData();
  
  // fetch user data by using 
  const { data, isFetching } = useQuery({
    queryKey: ["userPosts", user.user._id],
    queryFn: () => getPostsOfUserByUserId(user.user._id),
  });
  

  // return ;
  if (data?.length < 1) {
    return (
      <div className="flex justify-center items-center w-full pt-4 font-bold text-xl">
        {context.user.id==user.user._id?"You":user.user.firstname} haven't shared any memories yet.
      </div>
    );
  }

  if (isFetching) {
    return <h1 className="mx-20">Fetching...</h1>;
  }

  if(data?.length>0)
  return (
    <div className="mx-20">
      <div className="grid grid-cols-3 gap-2 py-9">
        {Array.from(data).map((post,id)=>{
          return(
            <PostsOverviewCard post={post} key={id}/>
          )
    })}
      </div>
    </div>
  );
}
