import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import Layout from "../../../components/Layout/Layout";
import { useEffect } from "react";
import { useSidebar } from "../../../lib/Provider/SidebarContext";
import { getRoomsOfCurrentUser } from "../../../lib/axios/rooms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../public/spinner.svg"
import { Suspense } from "react";
import { useChatHeadContext } from "../../../lib/Provider/ChatHeadProvider";
import { getChatAndMemberInfoUsingRoomsId } from "../../../lib/axios/messages";
export const Route = createFileRoute("/(app)/messages/_layout")({
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
  loader:({ context }) => {
    context?.queryClient.prefetchQuery({
      queryKey: ["rooms"],
      queryFn: () => getRoomsOfCurrentUser(context.user.id),
      staleTime:Infinity
    })
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { setSideBarFullOpen } = useSidebar();
  // set sidebar half open
  useEffect(() => {
    setSideBarFullOpen(false);
    return () => {
      setSideBarFullOpen(true);
    };
  }, []);

  // get context
  const context = Route.useRouteContext();

  // get room list
  const { data, isPending } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRoomsOfCurrentUser(context.user.id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000  * 60 * 10,
  });

  // get queryClient
  const queryClient = useQueryClient();
  // return;

  // get chat head context hook 
  const { setHeadUser } = useChatHeadContext();

  // get photo api
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;
  return (
    <>
      <Layout>
        <div className="flex overflow-hidden">
          <div className="bg-gray-900 w-[400px] h-dvh [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-y-auto ">
            {/* How you use app  */}
            <div className="px-3 my-3">
              <h6 className=" font-bold text-white text-xl py-3">
                {context.user.username}
              </h6>
              <p className="text-gray-400 font-bold text-lg py-3">Messages</p>
              <ul>
                {isPending && <img src={Spinner}/>}
                {Array.from(data.rooms).map((item, key) => {
                  console.log(item)
                  return (
                    <li className=" w-full" key={key} onClick={()=>{setHeadUser(item)}}>
                      <Link
                        to={`/messages/${item.roomId}`}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center px-3 gap-3 rounded-md text-gray-400"
                        onMouseEnter={()=>queryClient.prefetchQuery({
                          queryKey:["rooms", item.roomId],
                          queryFn:()=>getChatAndMemberInfoUsingRoomsId(item.roomId)
                        })}
                      >
                        <div>
                          <img
                            className="w-[50px] rounded-full"
                            src={PHOTO_API_URL + item.groupImage}
                          />
                        </div>
                        <div className="flex justify-center items-start flex-col">
                          <p className="text-sm pt-2">
                            {item.name}
                          </p>
                          <p className="flex justify-start items-center gap-1">
                            <span className="text-xs">You: k xa?</span>
                            <span className="text-xl">
                              <sup>.</sup>
                            </span>
                            <span className="text-xs">28min</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}

                
              </ul>
            </div>
          </div>
          <Suspense fallback="Loading..."><Outlet /></Suspense>
        </div>
      </Layout>
    </>
  );
}
