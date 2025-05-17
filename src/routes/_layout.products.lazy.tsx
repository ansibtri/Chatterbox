import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/products")({
  component: RouteComponent,
  pendingComponent: () => {
    return <>Loading..</>;
  },
});

function RouteComponent() {
  return <>Products</>;
}
