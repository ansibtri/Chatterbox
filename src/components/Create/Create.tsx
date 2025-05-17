import { formOptions, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useAuth } from "../../lib/Provider/AuthContext";
import { createPost } from "../../lib/axios/posts";
import { useToasts } from "../../lib/Provider/ToastsContext";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "../../lib/Provider/ModalContext";
// image icon
const ImageIcon = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke={color}
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h.008v.008H6V6Z"
    />
  </svg>
);
const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);
const MusicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
    />
  </svg>
);

// create post
const Create = () => {
  // get image references
  const [image, setImage] = useState<File[] | null>(null);

  // get user details
  const { userAuth } = useAuth();

  // get toasts
  const { setToasts } = useToasts();

  // get modal
  const { setModalOpen } = useModal();

  // get form
  const formOpts = formOptions({
    defaultValues: {
      postedBy: userAuth?.user?.id,
      postedAt: Date.now(),
      images: image && image.length > 0 ? [...image] : ([] as string[]), // Explicitly define the type as string[]
      description: "",
      location: "",
      tagged: "",
      music: "",
      likedBy: [],
    },
  });

  // get mutation
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: any) => {
      return createPost(values);
    },
    onSuccess: (data): void => {
      // display toasts
      setToasts({
        open: true,
        data: { type: data?.type, message: data?.message },
      });

      // reset form
      form.reset();

      // reset image
      setImage(null);

      // close modal
      setModalOpen(false);
    },
    onError: (error) => {
      // display toasts
      setToasts({
        open: true,
        data: { type: error?.type, message: error?.message },
      });
    },
  });

  // get images
  // get form instance
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      // create post
      mutate(value);
    },
  });

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(e);
      }}
    >
      <div className={`w-auto max-w-[500px] max-h-[500px] z-50`}>
        <div className="bg-gray-800 shadow-lg rounded-lg shadow-gray-800 shadow-">
          {/* Post Card Heading starts here  */}
          <div className="px-3 flex justify-between items-center border-b-1 border-gray-300 py-3">
            <h6 className="font-bold text-white/80">Share Your Memories {}</h6>
            {image && image.length > 0 ? (
              <>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <input
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={`${
                        !canSubmit || isSubmitting || isPending
                          ? "text-gray-500"
                          : "text-blue-500"
                      }  font-bold cursor-pointer`}
                      value={isSubmitting || isPending ? "Posting..." : "Post"}
                    ></input>
                  )}
                />
              </>
            ) : (
              <p className="text-gray-500 font-bold px-3">Post</p>
            )}
          </div>
          {/* Post Card Heading Starts here  */}
          {/* ------------------------------------------------------------------------------------------------------------  */}
          {/* Post Card Content Starts Here */}
          <div className="p-2">
            <form.Field
              name="description"
              children={(field) => (
                <>
                  <div>
                    <textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="outline-none text-white/90"
                      rows={3}
                      cols={60}
                      placeholder="Write Something"
                    ></textarea>
                  </div>
                </>
              )}
            />

            {image && image.length > 0 ? (
              <>
                <div className="h-[240px] max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-[0.5px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}">
                  <div className="w-full border-1 h-[200px] border-gray-400 rounded-lg mb-2">
                    {image
                      ? Array.from(image).map((item, key) => (
                          <div key={key} className="relative">
                            <button
                              type="button"
                              className="bg-white/70 absolute text-red-500 top-3 right-3 px-2 py-1 rounded-lg font-bold"
                              onClick={() => {
                                let arr = Array.from(image).filter((links) => {
                                  return links !== item;
                                });

                                setImage(arr);
                              }}
                            >
                              Remove
                            </button>
                            <img
                              src={URL.createObjectURL(item as File)}
                              className="rounded-lg"
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex justify-end items-center bg-white/20 py-2 px-3 rounded-md shadow-lg gap-7 mt-2">
              <label className="cursor-pointer">
                {ImageIcon(
                  image && image.length > 0 ? "white" : "currentColor"
                )}
                <form.Field
                  name="images"
                  children={(field) => {
                    return (
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            field.handleChange(Array.from(e.target.files));
                          }
                          setImage((prev) => {
                            if (prev) {
                              return [
                                ...prev,
                                ...Array.from(e.target.files as FileList),
                              ];
                            } else {
                              return Array.from(e.target.files as FileList);
                            }
                          });
                        }}
                        className="hidden"
                      />
                    );
                  }}
                />
              </label>
              <button className="cursor-pointer">{LocationIcon()}</button>
              <button className="cursor-pointer">{TagIcon()}</button>
              <button className="cursor-pointer">{MusicIcon()}</button>
            </div>
          </div>
          {/* Post Card Content Ends Here  */}
        </div>
      </div>
    </form>
  );
};

export default Create;
