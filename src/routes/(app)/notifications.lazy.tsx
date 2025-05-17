import { createLazyFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/notifications')({
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      context.auth = {
        isAuthenticated: false,
        authToken: undefined
      }
      context.user = undefined;
    }
    // check if the user is already authenticated
    if (!context?.auth?.isAuthenticated && !context?.auth?.authToken) {
      // redirect to /home if already authenticated
      throw redirect({
        to: "/"
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/notifications"!<Link to="/user/$profile" params={{ profile: "ansibtri" }}>
            Go to Profile
          </Link>
          <Link to="/messages">Go to Messages</Link>
          <Link to="/notifications">Notifications</Link></div>
}
