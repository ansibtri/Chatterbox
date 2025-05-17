import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactPost } from "../../lib/axios/posts";
import { useDeferredValue, useState } from "react";
import { savePostForUser } from "../../lib/axios/users";
import { useToasts } from "../../lib/Provider/ToastsContext";
import { formOptions, useForm } from "@tanstack/react-form";
import { postComment } from "../../lib/axios/comments";
import { useModal } from "../../lib/Provider/ModalContext";
import { usePostContext } from "../../lib/Provider/PostContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { getAllCommentsOfPosts } from "../../lib/axios/comments";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards'

import { formatTimeAgo } from "../../helper/time";

const Posts = ({ context, post }) => {
  // get queryClient hook
  const queryClient = useQueryClient();

  // set post after react
  const [reactedPost, setReactedPost] = useState(post);

  // get toasts
  const { setToasts } = useToasts();
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
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

  // get modal context
  const { setModalOpen, dispatchModalChild } = useModal();
  // post context
  const { setPost } = usePostContext();

  // open detail post card
  function openDetailPost() {
    setModalOpen(true);
    dispatchModalChild({ type: "post" });
    setPost({post,context});
  }

  // get api
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  return (
    <div>
      <div className="flex justify-between items-center w-[500px] mt-10">
        {/* post head  */}
        <div className="flex gap-3 items-center">
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
            <p className="text-gray-400 text-xs">
              {formatTimeAgo(new Date(post?.postedAt))}
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
      </div>
      {/* post head ends here  */}

      {/* post image  */}
      <div className="w-[500px] h-[400px] mt-3 rounded-md overflow-clip">
        <Swiper modules={[Navigation, Pagination, EffectCards]} effect="fade" pagination={{type:"fraction"}} className="w-full h-full" navigation={true} >
          {post?.images.map((item, key) => {
            return (
              <SwiperSlide key={key} className="">
                <div className="overflow-clip rounded-md h-[400px] w-full">
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
      {/* post image ends here  */}
      {/* post content  */}
      <div className="mt-3 text-white text-sm">
        <p className="text-gray-400 text-xs mt-2">
          {post?.tags?.length > 0 ? post?.tags.map((tag) => `#${tag} `) : ""}
        </p>
      </div>

      {/* post content ends here  */}
      {/* post reactions  */}
      <div className="flex justify-between items-center mt-3">
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
          <button onClick={() => openDetailPost()} onMouseEnter={()=>queryClient.prefetchQuery({queryKey:["comments", post?._id], queryFn:()=>getAllCommentsOfPosts(post?._id)})} className="cursor-pointer">
            <ChatBubbleOvalLeftIcon className="w-6 h-6 text-white" />
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
      <div className="flex justify-between items-center mt-3">
        <p className="text-gray-400 text-sm">
          {deferredReactedPost?.likedBy?.length || 0}{" "}
          {deferredReactedPost?.likedBy?.length > 1 ? "Likes" : "Like"}
        </p>
      </div>

      {/* post likes ends here  */}
      <div className="flex justify-start items-center gap-2">
        <p className="font-bold text-white flex justify-start items-center gap-2">
          @{post?.postedBy?.username || "media_user"}
        </p>
        <p className="text-gray-400 text-sm"> {post?.description}</p>
      </div>

      <div className="flex justify-start items-center gap-2 mt-3">
        <p
          className="text-gray-400 text-sm cursor-pointer"
          onClick={() => openDetailPost()}
        >
          {post?.comments?.length > 0
            ? `View all ${post?.comments?.length} comments`
            : null}
        </p>
      </div>

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
              <div className="flex justify-start items-center gap-2">
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
                        } text-md cursor-pointer text-center font-bold`}
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
  );
};

export default Posts;
