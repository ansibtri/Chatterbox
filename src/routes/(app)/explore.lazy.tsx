import { createLazyFileRoute } from "@tanstack/react-router";
import Layout from "../../components/Layout/Layout";
import { usePanel } from "../../lib/Provider/PanelContext";
import { useSidebar } from "../../lib/Provider/SidebarContext";

export const Route = createLazyFileRoute("/(app)/explore")({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <>
      <Layout>
        <div>Hello "/(app)/explore"!</div>
      </Layout>
    </>
  );
}
