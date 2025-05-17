import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";
import LoginComponents from "./../components/Auth/LoginComponents";
import LogoutComponents from "./../components/Auth/LogoutComponents";
import Modal from "../components/Modal";
type RouterContext = {
  auth?: {
    isAuthenticated: boolean;
    authToken?: string | null;
  };
  user?: any;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => {
    return ({
      meta: [
        {
          name: 'ChitChat',
          content: 'ChitChat',
        },
        {
          title: 'ChitChat',
        },
      ],
      links: [
        {
          // rel: 'icon',
          // href: '/favicon.ico',
        },
      ],
      scripts: [
        {
          src: '',
        },
      ],
    });
  },
  pendingComponent: () => {
    return <>Loading...</>;
  },
  component: root,
});

function root() {
  return (
    <>
    <HeadContent/>
      <div className="relative bg-blue-500 h-dvh">
        <LogoutComponents>
          <Navbar />
        </LogoutComponents>
        <Outlet />
        {/* <LoginComponents>
          <h2>Logged In</h2>
        </LoginComponents> */}
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
