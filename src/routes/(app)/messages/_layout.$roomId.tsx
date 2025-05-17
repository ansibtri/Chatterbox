import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getChatAndMemberInfoUsingRoomsId,
  sendMessage,
} from "../../../lib/axios/messages";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useChatHeadContext } from "../../../lib/Provider/ChatHeadProvider";
import Spinner from "../../../../public/spinner.svg";
import { formOptions, useForm } from "@tanstack/react-form";
import { socket } from "../../../lib/socket/Socket";
import React, {
  useEffect,
  useState,
} from "react";
import { updateLastMessageOfRoom } from "../../../lib/axios/rooms";

interface Message {
  senderId: { _id: string; profilePic: string };
  content: string;
  createdAt: string;
}

export const Route = createFileRoute("/(app)/messages/_layout/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  // get params
  const { roomId } = Route.useParams();

  // fetch data if not available
  const { data, isPending } = useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => getChatAndMemberInfoUsingRoomsId(roomId),
    staleTime: 5000,
    refetchOnMount: true,
  });

  // state variable messages 
  const [messages, setMessages] = useState<Message[]>([...data]);

  // get router context
  const context = Route.useRouteContext();
  
  // get chatHeadContext hook
  const { headUser }: any = useChatHeadContext();

  const formOpts = formOptions({
    defaultValues: {
      roomId: roomId,
      senderId: { _id: context.user.id, profilePic: context.user.profilePic },
      content: "",
      image: "",
      createdAt: Date.now()
    },
  });

  // get form
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      socket.emit("sendMessage", value);
      // send message to server
      sendMessage(value)
      // update last message of a room
      updateLastMessageOfRoom({roomId, senderId: context.user.id,message: value.content})
      // reset form
      form.reset();
    },
  });

  // join the room
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);



  
  // useEffect
  useEffect(() => {
    socket.on("getMessage", (message) => {
      console.log("Receive Message",message)
      setMessages((prev) => [message, ...prev]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [roomId]);


  useEffect(()=>{
    setMessages([...data])
    return ()=>{
      setMessages([])
    }
  },[roomId])

  // get photo api
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;
  return (
    <>
      <div className="w-full flex justify-between flex-col bg-gray-900 border-l-1 border-gray-300">
        {/* Chat head starts here  */}
        <div className=" border-b-1  border-gray-300 py-5 pl-10 flex justify-between items-center">
          {/* Profile Info Starts Here */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-[50px] rounded-full overflow-clip">
              <img
                src={PHOTO_API_URL + headUser.groupImage}
                className="w-full"
              />
            </div>
            <p className="text-white font-bold">{headUser.name}</p>
          </div>
          {/* Profile Info Section Ends Here  */}
          <div className="flex justify-center items-center gap-6 pr-8">
            <button>
              <PhoneIcon className="text-xl w-6 h-6 text-white" />
            </button>
            <button>
              <VideoCameraIcon className="text-xl w-6 h-6 text-white" />
            </button>
            <button>
              <InformationCircleIcon className="text-xl w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Chat Head Section Ends Here  */}
        {/* ----------------------------------------------------------------------------------  */}
        {/* chat list starts here  */}
        <div className="text-white overflow-hidden ">
          {/* chat list */}
          <div className="flex flex-col-reverse overflow-y-auto h-[calc(100vh-200px)] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {isPending && (
              <div className="flex justify-center items-center h-full">
                <img src={Spinner} />
              </div>
            )}
            {(data?.length || messages?.length) < 1 && (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-400 text-lg font-bold">
                  No messages yet
                </p>
              </div>
            )}
            {messages?.length > 0 &&
              messages.map((item, key) => {
                return (
                  <div
                    key={key}
                    className={`flex group items-end gap-3 my-3 px-6 ${
                      item.senderId._id === context.user.id
                        ? "justify-start flex-row-reverse"
                        : "justify-start"
                    }`}
                  >
                    <div className="w-[20px] rounded-full overflow-clip">
                      <img
                        src={PHOTO_API_URL + item.senderId.profilePic}
                        className="w-full"
                      />
                    </div>
                    <div
                      className={`flex group justify-start items-center ${
                        item.senderId._id === context.user.id
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      } py-0.5 px-3 rounded-full`}
                    >
                      <p className="text-sm py-2">{item.content}</p>
                    </div>
                    <p className="text-xs invisible group-hover:visible text-gray-400">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    
                  </div>
                );
              })}
          </div>
        </div>
        {/* chat list ends here  */}
        {/* ----------------------------------------------------------------------------------  */}
        {/* chat input section starts here  */}
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
        >
          <div className="w-full h-[100px]">
            <div className="border-1 mx-6 my-2 rounded-full px-5 border-gray-100 flex justify-center items-center gap-3">
              <form.Field name="content">
                {(field) => {
                  return (
                    <label htmlFor={field.name} className="grow">
                      <input
                        type="text"
                        className="w-full py-3 outline-none text-white border-0"
                        placeholder="Write your messages"
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </label>
                  );
                }}
              </form.Field>
              <form.Field name="image">
                {(field) => {
                  return (
                    <label htmlFor={field.name} className="cursor-pointer">
                      <CameraIcon className="text-xl w-6 h-6 text-white cursor-pointer" />
                      <input
                        type="file"
                        name={field.name}
                        id={field.name}
                        className="py-3"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            field.handleChange(files[0]);
                          }
                        }}
                      />
                    </label>
                  );
                }}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => {
                  return (
                    <label>
                      <input
                        className={`py-3 cursor-pointer transition-transform text-xl rounded-md p-2 text-center w-full`}
                        type="submit"
                        disabled={!canSubmit}
                        hidden
                      />
                      <PaperAirplaneIcon
                        className={`text-xl w-6 h-6 text-white transition-transform ${
                           isSubmitting
                            ? "-rotate-[30deg]"
                            : "rotate-0"
                        }`}
                      />
                    </label>
                  );
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
