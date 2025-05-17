import { motion } from "framer-motion";
import {ChatBubbleOvalLeftIcon} from "@heroicons/react/24/outline"
import { HeartIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { useModal } from "../../lib/Provider/ModalContext";


const PostsOverviewCard = ({ post }:any) => {
  // get api url for photo
  const API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  // get modal
  const {dispatchModalChild, setModalOpen} = useModal();
  return (
    <div
      className={`group card w-full h-[400px] relative`}
      style={{
        backgroundImage: `url(${API_URL}${post.images[0].filename})`,
        backgroundSize: "cover", // Optional: Ensures the image covers the entire div
        backgroundPosition: "center", // Optional: Centers the image
        backgroundAttachment: "scroll",
      }}
      onClick={()=>{setModalOpen(true);dispatchModalChild({type:"post"})}}
    >
      {post?.images?.length>1?<div className="absolute right-2 top-2">{<DocumentDuplicateIcon className="h-6 w-6 text-white/70 font-bold"/>}</div>:null }
      <motion.div className="invisible group-hover:visible z-10 bg-black/70 w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center gap-6">
          <div className="flex justify-content items-center gap-3"><p className="text-lg font-bold">{post.likedBy.length}</p><HeartIcon className="h-7 w-7 text-white font-bold"/></div>
          <div className="flex justify-content items-center gap-3"><p className="text-lg font-bold">3</p><ChatBubbleOvalLeftIcon className="h-7 w-7 text-white font-bold"/></div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostsOverviewCard;
