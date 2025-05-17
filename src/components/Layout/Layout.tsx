import type { ReactNode } from "@tanstack/react-router";
import RightSidebar from "../Sidebar/RightSidebar";
import LeftSidebar from "./../Sidebar/LeftSidebar";
import { Suspense } from "react";

interface LayoutProps {
  children: ReactNode;
  rightSidebarChildren?: ReactNode;
}
const Layout = ({ children, rightSidebarChildren=null}: LayoutProps) => {
  return (
    <div className="layout">
      <div className="flex">
        <div><LeftSidebar/></div>
        <Suspense fallback={<>Loading...</>}>
        <div className="grow-1">{children}</div>
        </Suspense>
        {rightSidebarChildren && <RightSidebar children={rightSidebarChildren} />}
      </div>
    </div>
  );
};

export default Layout;
