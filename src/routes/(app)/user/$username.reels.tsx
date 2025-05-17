import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/user/$username/reels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/user/$username/reels"!</div>
}
