import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ContextType {
  user?: {
    profilePic?: string;
  };
}

const Story = ({ context }: { context: ContextType }) => {
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  return (
    <div className="bg-gray-900 h-[100px] overflow-hidden pt-4">
      {/* <div className="flex items-center justify-center"> */}
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-2 story unseen_story w-[65px]">
            <img
              src={PHOTO_API_URL + context?.user?.profilePic}
              alt="Profile"
              className="w-[65px] rounded-full z-10"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Story;
