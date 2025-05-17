import { Link } from "@tanstack/react-router";
import Panel from "./Panel";
import Logo from "../../../public/logo.svg";
import HomeIcon from "../../../public/home.svg";
import SearchIcon from "../../../public/search.svg";
import ExploreIcon from "../../../public/explore.svg";
import ReelsIcon from "../../../public/reels.svg";
import MessagesIcon from "../../../public/messages.svg";
import NotificationsIcon from "../../../public/notifications.svg";
import ProfileIcon from "../../../public/user.svg";
import MenuIcon from "../../../public/menu.svg";
import CreateIcon from "../../../public/create.svg";
import { useSidebar } from "../../lib/Provider/SidebarContext";
import { usePanel } from "../../lib/Provider/PanelContext";
import { motion } from "framer-motion";
import Modal from "../Modal";
import { useModal } from "../../lib/Provider/ModalContext";
import { useAuth } from "../../lib/Provider/AuthContext";
const LeftSideBarLinks = [
  {
    title: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    title: "Search",
    icon: SearchIcon,
    fn: (
      setSidebar: (arg0: boolean) => void,
      setPanel: any,
      setPanelOpen: any
    ) => {
      setSidebar(false);
      setPanel({ type: "search" });
      setPanelOpen(true);
    },
  },
  {
    title: "Explore",
    link: "/explore",
    icon: ExploreIcon,
  },
  {
    title: "Reels",
    link: "/reels",
    icon: ReelsIcon,
  },
  {
    title: "Messages",
    link: "/messages",
    icon: MessagesIcon,
  },
  {
    title: "Notifications",
    icon: NotificationsIcon,
    fn: (
      setSidebar: (arg0: boolean) => void,
      setPanel: any,
      setPanelOpen: any
    ) => {
      setSidebar(false);
      setPanel({ type: "notification" });
      setPanelOpen(true);
    },
  },
  {
    title: "Create",
    icon: CreateIcon,
    fn: (
      setModalOpen: (arg0: boolean) => void,
      dispatchModalChild: any,
    ) => {
      setModalOpen(true);
      dispatchModalChild({type:"create"})
    },
  },
  {
    title: "Profile",
    link: "/user/$profile",
    icon: ProfileIcon,
    params: true,
  },
  {
    title: "More",
    icon: MenuIcon,
    fn: (
      setSidebar: (arg0: boolean) => void,
      setPanel: any,
      setPanelOpen: any
    ) => {
      setSidebar(false);
      setPanel({ type: "menu" });
      setPanelOpen(true);
    },
  },
];
const LeftSidebar = () => {
  // get the app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  // get userAuth
  const {userAuth} = useAuth();
  
  // toggle sidebar
  const { isSidebarFullOpen, setSideBarFullOpen }: any = useSidebar();

  // get panel access
  const { panelChild, dispatchPanelChild, setPanelOpen, isPanelOpen }: any = usePanel();

  if (window.innerWidth < 850) {
    setSideBarFullOpen(false);
  }
  // get modal
  const {isModalOpen, setModalOpen, modalChild, dispatchModalChild} = useModal();
  return (
    <motion.div
      className={`bg-gray-900 px-2 h-dvh ${
        isSidebarFullOpen ? "w-[240px]" : "w-[60px]"
      } text-wrap border-r-[1px] border-r-gray-400`}
    >
      {isPanelOpen && <Panel children={panelChild} />}
      <h1 className="text-3xl text-center text-white tracking-wide px-2 py-10">
        <Link to="/home" className="flex justify-start gap-3 items-center">
          <img src={Logo} />
          {isSidebarFullOpen && <span>{APP_NAME}</span>}
        </Link>
      </h1>
      <ul>
        {Array.from(LeftSideBarLinks).map((item, id) => {
          return item?.link ? (
            <li
              className={`my-3 ${isSidebarFullOpen ? "mx-2" : null}`}
              key={id}
            >
              <Link
                to={item.link}
                activeOptions={{ exact: false }}
                className="text-white py-1.5 px-2 text-lg hover:bg-gray-700 flex justify-start items-center gap-3 transition-colors rounded-sm"
                activeProps={{ className: "bg-gray-700" }}
                {...(item.params && { params: { profile: userAuth?.user?.username } })}
              >
                <img src={item.icon} width="25px" />
                {isSidebarFullOpen && <span>{item.title}</span>}
              </Link>
            </li>
          ) : (
            <li
              className={`my-3 ${isSidebarFullOpen ? "mx-2" : null}`}
              key={id}
            >
              <button
                onClick={() => {
                  (item && item.title !== "Create") ?
                    item?.fn?.(setSideBarFullOpen, dispatchPanelChild, setPanelOpen) : item?.fn?.(setModalOpen, dispatchModalChild);
                }}
                className="w-full text-white py-1.5 px-2 text-lg hover:bg-gray-700 flex justify-start items-center gap-3 transition-colors rounded-sm"
              >
                <img src={item.icon} width="25px" />
                {isSidebarFullOpen && <span>{item.title}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {isModalOpen && <Modal children={modalChild}/>}
    </motion.div>
  );
};
 
export default LeftSidebar;
