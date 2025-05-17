import { createLazyFileRoute, redirect } from "@tanstack/react-router";
import Login from "../components/Auth/Login";
import { validateAuth } from "../lib/axios/auth";
export const Route = createLazyFileRoute("/login")({
  beforeLoad: async ({ context }) => {

    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined
      }
      context.user = undefined;
    }
    // check if the user is already authenticated
    if (context?.auth?.isAuthenticated && context?.auth?.authToken) {
      // redirect to /home if already authenticated
      throw redirect({
        to: "/home"
      })
    }

    // Call ValidateAuth only if ths user is not authenticated
    const verifyAuthToken = await validateAuth();
    

    // update the context or handle authenticatio logic based on the result
    if (verifyAuthToken?.isAuthenticated) {
      context.auth.isAuthenticated = verifyAuthToken?.isAuthenticated
      context.auth.authToken = verifyAuthToken?.authToken
      context.user = verifyAuthToken?.user

      throw redirect({
        to: '/home'
      })
    } else {
      context.auth = {
        isAuthenticated: false,
        authToken: null
      }
      context.user = null;
    }
  },
  pendingComponent:()=>{
    return <>Loading...</>
  },
  component: RouteComponent,
});

function RouteComponent() {

  return <>
  <Login/>
  </>;
}
