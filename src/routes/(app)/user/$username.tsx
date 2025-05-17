import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { updateUserFollowAndFollowing } from "../../../lib/axios/users";
import Layout from "../../../components/Layout/Layout";
import {
  getPostsAndUserByUsername,
} from "../../../lib/axios/posts";

import spinner from "/spinner.svg";

export const Route = createFileRoute("/(app)/user/$username")({
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined,
      };
      context.user = undefined;
    }
    // check if the user is already authenticated
    if (!context?.auth?.isAuthenticated && !context?.auth?.authToken) {
      // redirect to /home if already authenticated
      throw redirect({
        to: "/",
      });
    }




  },
  loader: async ({ params }) => {
    const username = params.username;
    const userAndPosts = await getPostsAndUserByUsername(username);
    const userData = userAndPosts.user;
    const userPosts = userAndPosts.postOfUser;

    return { userData, userPosts };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // get context
  const context = Route.useRouteContext();
  // get loader data
  const { userData, userPosts } = Route.useLoaderData();

  // API URL for photos located in server
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  // get router instance
  const router= useRouter();
  // get mutation
  const {mutate, isPending} = useMutation({
      mutationFn: async (values: { targetUserId: string; currentUserId: string }) => {
        console.log(values)
        return updateUserFollowAndFollowing(values)
      },

      onSuccess:()=>{
        router.invalidate();
      }
    })

  return (
    <>
      <Layout>
        <div className="overflow-hidden">
          <div className="bg-gray-900 overflow-y-scroll h-dvh">
            {/* Main Profile Card Starts Here */}
            <div className="flex justify-start items-center gap-20 px-36 mb-10 py-14">
              {/* User profile picture starts here  */}
              <div className="w-[200px] rounded-full overflow-hidden">
                <img
                  src={`${PHOTO_API_URL + userData?.profilePic}`}
                  className="rounded-full"
                  alt={`Profile Picture of ${
                    userData.firstname + " " + userData.lastname
                  }`}
                />
              </div>
              {/* User profile picture ends here  */}

              {/* user profile detail starts here */}
              <div className="w-full">
                <div className="flex justify-start items-center gap-4 mb-5">
                  {/* Username  */}
                  <p className="text-white font-bold text-xl">
                    {userData?.username}
                  </p>

                  {/* user accounts edit link  */}
                  {context.user.id === userData?._id ? (
                    <Link
                      to="/accounts/edit"
                      className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-bold cursor:pointer"
                    >
                      Edit Profile
                    </Link>
                  ) : null}

                  {/* if user is not following the other user  */}
                  {context.user.id !== userData?._id && !userData.followers.includes(context.user.id) ? (
                    <button onClick={()=>{mutate({targetUserId: userData?._id, currentUserId:context.user.id})}} className="bg-blue-700 flex justify-center items-center gap-3 cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-bold cursor:pointer">
                      Follow {isPending&& <img src={spinner} className="w-[20px]"/>}
                    </button>
                  ) : null}
                  {context.user.id!==userData?._id && userData.followers.includes(context.user.id)?(
                    <button onClick={()=>{mutate({targetUserId: userData?._id, currentUserId:context.user.id})}}  className="bg-gray-600 flex justify-center items-center gap-3 hover:bg-gray-700 cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-bold cursor:pointer">
                      Unfollow {isPending&& <img src={spinner} className="w-[20px]"/>}
                    </button>
                  ):null}

                  {/* user archive stories link  */}
                  {context.user.id === userData?._id ? (
                    <Link
                      to="/archive/stories"
                      className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-bold cursor:pointer"
                    >
                      View Archive
                    </Link>
                  ) : null}
                </div>

                {/* Post counts, followers count and following counts  */}
                <div className="mb-5 flex justify-start items-center gap-10">
                  <p className="text-gray-300">
                    {/* user posts  counts*/}
                    <strong className="text-white">
                      {userPosts?.length}
                    </strong>{" "}
                    posts
                  </p>
                  {/* user followers count  */}
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {userData?.followers.length}
                    </strong>{" "}
                    followers
                  </p>
                  {/* user following counts  */}
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {userData?.following.length}
                    </strong>{" "}
                    following
                  </p>
                </div>

                {/* user fullname  and bio*/}
                <div>
                  {/* user fullname  */}
                  <p className="text-white font-bold">
                    {userData?.firstname + " " + userData?.lastname}
                  </p>
                  {/* user bio */}
                  <p className="text-white mt-3">{userData?.bio}</p>
                </div>
              </div>
            </div>
            {/* Main Profile Card Ends Here  */}
            {/* User profile details ends here  */}
            {/* ----------------------------------------------------------------------------------------------------  */}
            {/* user posts  */}
            <div>
              {/* tab panel starts here  */}
              <div className="flex justify-center items-center gap-10  border-t-1 border-gray-700">
                <Link
                  to={`/user/${userData?.username}`}
                  className="text-gray-500 py-4 font-bold"
                  activeOptions={{
                    exact: true,
                  }}
                  activeProps={{
                    className: "border-t-1 border-gray-50 text-white",
                  }}
                >
                  POSTS
                </Link>
                {context.user.id === userData._id?(
                  <Link
                  to={`/user/${userData?.username}/saved`}
                  className="text-gray-500 font-bold py-4"
                  activeOptions={{
                    exact: true,
                  }}
                  activeProps={{
                    className: "border-gray-50 border-t-1 text-white",
                  }}
                >
                  SAVED
                </Link>
                ):(
                  <Link
                  to={`/user/${userData?.username}/reels`}
                  className="text-gray-500 font-bold py-4"
                  activeOptions={{
                    exact: true,
                  }}
                  activeProps={{
                    className: "border-gray-50 border-t-1 text-white",
                  }}
                >
                  REELS
                </Link>
                )}
                <Link
                  to={`/user/${userData?.username}/tagged`}
                  className="text-gray-500 py-4 font-bold"
                  activeOptions={{
                    exact: true,
                  }}
                  activeProps={{
                    className: "border-gray-50 border-t-1 text-white",
                  }}
                >
                  TAGGED
                </Link>
              </div>
              {/* tab panel ends here  */}
              {/* ----------------------------------------------------------------------------------------------------  */}
              <div className="text-white">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
