import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { validateAuth } from "../../lib/axios/auth";

import Layout from "../../components/Layout/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoomsOfCurrentUser } from "../../lib/axios/rooms";
import RightSidebar from "./../../components/Sidebar/RightSidebar";
import Story from "../../components/Story/Story";
import Posts from "../../components/Posts/Posts";
import { getAllPosts } from "../../lib/axios/posts";
export const Route = createFileRoute("/(app)/home")({
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined,
      };
      context.user = undefined;
    }
    // check if the user is already authenticated
    if (!context?.auth?.isAuthenticated) {
      // redirect to /home if not authenticated
      throw redirect({
        to: "/",
      });
    }

    // Call ValidateAuth only if ths user is not authenticated
    const verifyAuthToken = await validateAuth();

    // update the context or handle authenticatio logic based on the result
    if (verifyAuthToken?.isAuthenticated) {
      context.auth.isAuthenticated = verifyAuthToken?.isAuthenticated;
      context.auth.authToken = verifyAuthToken?.authToken;
      context.user = verifyAuthToken?.user;
    } else {
      context.auth = {
        isAuthenticated: false,
        authToken: null,
      };
      context.user = null;
    }
  },
  loader: ({context}) => {
    context.queryClient.fetchQuery({ queryKey:["allPosts"], queryFn:()=> getAllPosts()})
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  // get context
  const context = Route.useRouteContext();

  const {data, isPending} = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getAllPosts(),
  });

  return (
    <>
      <Layout>
       <div className=" bg-gray-900 h-dvh overflow-y-scroll [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
       <div className="flex flex-col py-10 justify-center items-center ">
        {isPending ? (
          <div className="text-white text-2xl font-bold">
            Loading...
          </div>
        ) : null}
        {data?.length  <1 ? (
          <div className="text-white text-2xl font-bold">
            No Posts Available
          </div>
        ) : (
          data?.map((post,key) => (
            <Posts key={key} post={post} context={context} />
          ))
        )}
        </div>
        </div> 
      </Layout>
    </>
  );
}
