import type { ReactNode } from "@tanstack/react-router";

// Desc: Right Sidebar component
interface RightSidebarProps {
  children: ReactNode;
}
const RightSidebar = ({ children }: RightSidebarProps) => {
  return (
    <div className="w-[300px] bg-gray-900 lg:block sm:hidden">{children}</div>
  );
};

export default RightSidebar;
