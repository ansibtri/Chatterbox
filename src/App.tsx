import {preconnect, prefetchDNS} from "react-dom"
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { getCountryList } from "./lib/axios/country.tsx";
import { Toasts } from "./components/Toasts/index.tsx";
import { useAuth } from "./lib/Provider/AuthContext.tsx";
import Error from "./components/Error/Error.tsx";
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
    user: undefined,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultPendingMinMs: 0,
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultNotFoundComponent: () => <div>Not Found</div>,
  defaultErrorComponent: (e) => {return <Error errorTitle={e?.error?.code} errorMessage={e?.error?.message}/>},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// prefetch dns To improve performance by performing DNS lookups for a domain early, before the user navigates to it. 
prefetchDNS("https://restcountries.com/")

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
// fetching country list for
queryClient.prefetchQuery({
  queryKey: ["country"],
  queryFn: getCountryList,
});

function App() {
  // get api
  const API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL
  // PRECONNECT TO THE SERVER will hint browser that it should open a connection to the server
  preconnect(API_URL)
  const { userAuth }: any = useAuth(); 
  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider
        router={router}
        context={{
          auth: {
            isAuthenticated: userAuth?.isAuthenticated,
            authToken: userAuth?.authToken,
          },
          user: userAuth?.user,
          queryClient: queryClient,
        }}
      />
      <Toasts />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
