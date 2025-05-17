import { createLazyFileRoute, Link } from "@tanstack/react-router";
import Layout from "../../components/Layout/Layout";
import { usePanel } from "../../lib/Provider/PanelContext";
import { useSidebar } from "../../lib/Provider/SidebarContext";
export const Route = createLazyFileRoute("/(app)/reels")({
  component: RouteComponent,
});

function RouteComponent() {
  // get panel access
  const { setPanelOpen }:any = usePanel();
  // get sidebar access
  const { setSideBarFullOpen }:any = useSidebar();
  // set default for every page
  setPanelOpen(false);
  setSideBarFullOpen(true);
  return (
    <>
      <Layout>
        <div>
          Hello "/(app)/reels"!
          <Link to="/user/$profile" params={{ profile: "ansibtri" }}>
            Go to Profile
          </Link>
          <Link to="/messages">Go to Messages</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
      </Layout>
    </>
  );
}
