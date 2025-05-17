


import { useDeferredValue, useState } from "react";
import { usePostContext } from "../../lib/Provider/PostContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCommentsOfPosts, postComment } from "../../lib/axios/comments";
import { reactPost } from "../../lib/axios/posts";
import { savePostForUser } from "../../lib/axios/users";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { formOptions, useForm } from "@tanstack/react-form";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";



import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { formatTimeAgo } from "../../helper/time";
import { useRouter } from "@tanstack/react-router";
import { useToasts } from "../../lib/Provider/ToastsContext";

const PostsDetailCard = () => {
  // use post context
  const postContext = usePostContext();
  const { post, context} = postContext.post;
  
  // get comments of post
  const { data } = useQuery({
    queryKey: ["comments", post?._id],
    queryFn: () => getAllCommentsOfPosts(post?._id),
  });

  // set post after react
    const [reactedPost, setReactedPost] = useState(post);
  // defer the reactedPost
  const deferredReactedPost = useDeferredValue(reactedPost);
  // mutate react
  const mutateReact = useMutation({
    mutationFn: async (values: { postId: any; userId: any }) => {
      return reactPost(values.postId, values.userId);
    },
    onSuccess: (data) => {
      // setReactedPost
      setReactedPost(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // get router
  const router = useRouter();

  //set savedId
  const [savedPost, setSavedPost] = useState(post);
  // defer the state
  const deferredSavePost = useDeferredValue(savedPost);
  // mutate savePost event
  const mutateSavePost = useMutation({
    mutationFn: ({ userId, postId }) => {
      return savePostForUser(userId, postId);
    },
    onSuccess: (data) => {
      // setReactedPost
      setSavedPost(data);
      router.invalidate();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // get toast
  const {setToasts} = useToasts();

  // mutate comment
  const mutateComment = useMutation({
    mutationFn: (value) => {
      return postComment(value);
    },
    onSuccess: (data) => {
      setToasts({
        open: true,
        data: { type: data.type, message: data.message },
      });

      form.reset();
      router.invalidate();
    },
    onError: (error) => {
      setToasts({
        open: false,
        data: { type: error?.type, message: error?.message },
      });
    },
  });

  // comment form
  const formOpts = formOptions({
    defaultValues: {
      postId: post?._id,
      author: context.user.id,
      content: "",
    },
  });

  // get form
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
      mutateComment.mutate(value);
    },
  });

  // get api
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  console.log(data)
  return (
    <div className="flex justify-center items-center bg-gray-900 h-[500px]">
      <div>
        <div className="w-[500px] h-[500px] overflow-clip">
          <Swiper
            modules={[Navigation, Pagination, EffectCards]}
            effect="fade"
            pagination={{ type: "fraction" }}
            className="w-full h-full"
            navigation={true}
          >
            {post?.images.map((item, key) => {
              return (
                <SwiperSlide key={key} className="">
                  <div className="overflow-clip h-full w-full">
                    <img
                      src={`${PHOTO_API_URL}${item.filename}`}
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      
      <div className="flex justify-start items-start flex-col h-full">
        <div className="flex justify-between items-center w-[500px] px-3 py-3 border-b-1 border-b-white/55">
          {/* post head  */}
          <div className="flex gap-3 items-center ">
            <div className="">
              <img
                src={`${PHOTO_API_URL}${
                  post?.postedby?.profilePic || "male.avif"
                }`}
                alt="user profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <p className="font-bold text-white">
                {post?.postedBy?.username || "media_user"}
              </p>
            </div>
          </div>
          <div className="relative group">
            <EllipsisVerticalIcon className="w-6 h-6  text-gray-400 cursor-pointer" />
            <div className="hidden group-hover:flex flex-col justify-center items-start absolute right-0  z-30 bg-gray-800 text-white rounded-md shadow-lg p-2">
              <button className="text-sm hover:bg-gray-700 w-full text-left px-2 py-1 rounded-md">
                About this Account
              </button>
              <button className="text-sm hover:bg-gray-700 w-full text-left px-2 py-1 rounded-md">
                Delete
              </button>
            </div>
          </div>
          {/* post head ends here  */}
        </div>
        <div className="h-dvh w-full overflow-y-scroll [&::-webkit-scrollbar]:w-[0] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <div className="flex mb-2">
          <div className="flex justify-start items-center gap-2 py-2 px-3">
            <div className="w-[40px] rounded-full overflow-clip">
              <img src={PHOTO_API_URL+data[0]?.author?.profilePic}/>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-white font-bold">{data[0]?.author?.username || "media_user"}</p>
              <div className="flex justify-start items-center gap-2">
                <p className="text-xs text-white/50">{data[0]?.createdAt?formatTimeAgo(new Date(data[0]?.createdAt)):null}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start pt-3">
            <p className="text-white text-sm">{data[0]?.content}</p>
          </div>
        </div>

        {/* list all the comments  */}
        <div className="flex flex-col gap-1">
          {data?.map((comment,key)=>{
            return (
              <div className="flex" key={key}>
          <div className="flex justify-start items-center gap-2 py-2 px-3">
            <div className="w-[40px] rounded-full overflow-clip">
              <img src={PHOTO_API_URL+comment?.author?.profilePic}/>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-white font-bold">{comment?.author?.username || "media_user"}</p>
              <div className="flex justify-start items-center gap-2">
                <p className="text-xs text-white/50">{formatTimeAgo(new Date(comment?.createdAt))}</p>
                <p className="text-gray-400 text-xs">1 Like</p>
                <button className="text-xs text-white/50 text-bold">Reply</button>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start pt-3">
            <p className="text-white text-sm">{comment?.content}</p>
          </div>
        </div>
            )
          })}

        </div>
        </div>

        <div className="w-full">
          {/* post reactions  */}
      <div className="flex justify-between items-center mt-3 px-3">
        <div className="flex gap-3 items-center">
          <button
            onClick={() =>
              mutateReact.mutate({
                postId: post?._id,
                userId: context?.user?.id,
              })
            }
          >
            {deferredReactedPost?.likedBy?.includes(context.user.id) ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <button>
            <PaperAirplaneIcon className="w-6 h-6 text-white -rotate-[23deg] -translate-y-0.5" />
          </button>
        </div>
        {context.user.id != post?.postedBy?._id ? (
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                mutateSavePost.mutate({
                  postId: post?._id,
                  userId: context?.user?.id,
                });
              }}
            >
              {deferredSavePost?.savedPosts?.includes(post?._id) ? (
                <BookmarkSolidIcon className="w-6 h-6 text-white font-bold" />
              ) : (
                <BookmarkIcon className="w-6 h-6 text-white font-bold" />
              )}
            </button>
          </div>
        ) : null}
      </div>
      {/* post reactions ends here  */}
      {/* post likes  */}
      <div className="flex justify-between items-center mt-3 px-3">
        <p className="text-gray-400 text-sm">
          {deferredReactedPost?.likedBy?.length || 0}{" "}
          {deferredReactedPost?.likedBy?.length > 1 ? "Likes" : "Like"}
        </p>
      </div>

      {/* post likes ends here  */}


      {/* add a comments  */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <form.Field
          name="content"
          validators={{
            onChange: ({ value }) => {
              if (value.length < 3) {
                return "Comment must be at least 3 characters long";
              }
            },
          }}
        >
          {(field) => {
            return (
              <div className="flex justify-between items-center gap-2 py-3 px-3">
                <input
                  type="text"
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full text-white rounded-md focus:outline-none"
                />
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => {
                    return (
                      <input
                        className={`  ${
                          mutateComment.isPending
                            ? " text-blue-200"
                            : " text-blue-500"
                        } text-md px-3 cursor-pointer text-center font-bold`}
                        value={
                          mutateComment.isPending || isSubmitting
                            ? "Posting..."
                            : "Post"
                        }
                        type="submit"
                        disabled={!canSubmit || mutateComment.isPending}
                      />
                    );
                  }}
                />
              </div>
            );
          }}
        </form.Field>
      </form>
      {/* add a comments ends here  */}
        </div>

      </div>
    </div>
  );
};

export default PostsDetailCard;
