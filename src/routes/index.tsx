import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion } from "motion/react";
import WavyText from "../components/Animation/WavyText";
import { validateAuth } from "../lib/axios/auth";
import { useQueryClient } from "@tanstack/react-query";
import { getCountryList } from "../lib/axios/country";
export const Route = createFileRoute("/")({
  head: () => {
    return {
      meta: [
        {
          name: "ChitChat",
          content: "Chatapp",
        },
        {
          title: "ChitChat",
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
          src: "",
        },
      ],
    };
  },
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined,
      };
      context.user = undefined;
    }
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
  component: App,
});

function App() {
  // get app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  // get queryClient
  const queryClient = useQueryClient();

  return (
    <div className="grid grid-cols-2 gap-4 md:mx-20 sm:mx-6 font-chitchat-sans-headline">
      <div className="p-8">
        <div className="mt-8">
          <motion.div
            initial={{ translateY: "-10px", opacity: 0 }}
            animate={{
              translateY: "0",
              opacity: 1,
              transition: { duration: 0.5 },
            }}
          >
            <h2 className="md:text-6xl sm:text-4xl text-white pb-6">
              Welcome To
            </h2>
          </motion.div>
          <motion.div
            initial={{ translateY: "-10px", opacity: 0 }}
            animate={{
              translateY: "0",
              opacity: 1,
              transition: { delay: 0.1, duration: 0.5 },
            }}
          >
            <h1 className="md:text-8xl sm:text-5xl text-white pb-8">
              {APP_NAME}
            </h1>
          </motion.div>
          <WavyText
            replay={true}
            className="text-white text-2xl sm:text-lg"
            text="Text Like Never Before"
          />
        </div>
        <div className="mt-8">
          <Link
            onMouseEnter={() => {
              // fetching country list for
              queryClient.prefetchQuery({
                queryKey: ["country"],
                queryFn: getCountryList,
              });
            }}
            to="/register"
            className="bg-black text-xl px-3 py-2 text-center rounded-lg text-white hover:bg-neutral-700"
          >
            Register
          </Link>
        </div>
      </div>
      <div>
        <img
          src="boy-ordering-junk-food-online.svg"
          style={{ maxWidth: "78%" }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
