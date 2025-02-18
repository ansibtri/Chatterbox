import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/messages/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_layout"!

    <Outlet/>
  </div>
}
