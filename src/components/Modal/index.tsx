import { useModal } from "../../lib/Provider/ModalContext";
const Modal = ({ children }: any) => {
  const {setModalOpen} = useModal();
  return (
    <div className="absolute w-full h-dvh z-20 top-0 left-0 bg-black/65  overflow-hidden">
      <div className="relative top-1 right-1">
      <div className="absolute right-1 z-40">
        <div className="ml-auto p-4 cursor-pointer scale-105" onClick={()=>{setModalOpen(false)}}>
          <div className="w-[35px] bg-white rounded-lg h-[5px] rotate-45 origin-left" ></div>
          <div className="w-[35px] bg-white rounded-lg h-[5px] rotate-[135deg] origin-left translate-x-6 translate-y-[-5px]"></div>
        </div>
      </div>
      </div>
      <div className="flex justify-center items-center h-full w-full overflow-hidden absolute">
        {children}
      </div>
    </div>
  );
};

export default Modal;
