import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validateAuth } from "../lib/axios/auth";
import LogoutComponents from "../components/Auth/LogoutComponents";
export const Route = createFileRoute("/_layout")({
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined,
      };
      context.user = undefined;
    }
    console.log("Layout", context);
    // check if the user is already authenticated
    if (context?.auth?.isAuthenticated && context?.auth?.authToken) {
      // redirect to /home if already authenticated
      throw redirect({
        to: "/home",
      });
    }

    // Call ValidateAuth only if ths user is not authenticated
    const verifyAuthToken = await validateAuth();

    // update the context or handle authenticatio logic based on the result
    if (verifyAuthToken?.isAuthenticated) {
      context.auth.isAuthenticated = verifyAuthToken?.isAuthenticated;
      context.auth.authToken = verifyAuthToken?.authToken;
      context.user = verifyAuthToken?.user;

      throw redirect({
        to: "/home",
      });
    } else {
      context.auth = {
        isAuthenticated: false,
        authToken: null,
      };
      context.user = null;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LogoutComponents>
        <Outlet />
      </LogoutComponents>
    </>
  );
}
