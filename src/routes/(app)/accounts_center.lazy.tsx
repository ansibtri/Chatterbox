import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/accounts_center')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/accounts_center"!</div>
}
