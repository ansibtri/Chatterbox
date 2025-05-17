import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePanel } from "../../lib/Provider/PanelContext";
import { useSidebar } from "../../lib/Provider/SidebarContext";

interface PanelPropsType {
  children: ReactNode;
}
// closeIcon
const closeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 24 24"
    strokeWidth={2}
    className="size-10"
    stroke="white"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />{" "}
  </svg>
);

const Panel = ({ children }: PanelPropsType) => {
  // get panel access
  const { setPanelOpen }:any = usePanel();
  // get sidebar access
  const { setSideBarFullOpen }:any = useSidebar();
  // handle panel and content
  const closePanelandContent = () => {
    setPanelOpen(false);
    setSideBarFullOpen(true);
  };
  return (
    <motion.div
      initial={{ translateX: -500 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
      animate={{ translateX: 0 }}
      className="bg-gray-800 w-[300px] absolute z-10 h-dvh left-[59.4px]"
    >
      <div className="flex justify-end items-center text-2xl pt-4">
        <button
          onClick={() => {
            closePanelandContent();
          }}
          className="cursor-pointer"
        >
          {closeIcon()}
        </button>
      </div>
      {children}
    </motion.div>
  );
};

export default Panel;
