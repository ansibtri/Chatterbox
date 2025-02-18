import React, { Suspense } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
console.log(
  "import.meta.env.VITE_ENVIRONMENT",
  import.meta.env.VITE_ENVIRONMENT
);
// Development Tools

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import tanstack router devtools with lazy loading
const TanStackRouterDevtools =
  import.meta.env.VITE_ENVIRONMENT == "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

// create a new router instance
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY) {
    throw new Error(
      "Clerk Publishable Key is missing. Please add Clerk Publishable Key in .env file. Refer to .env.example file for more details."
    );
  }

  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ClerkProvider>
      <Suspense>
        <TanStackRouterDevtools router={router} />
      </Suspense>
    </>
  );
}

export default App;
