import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/user/$username/tagged')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/user/$profile/tagged"!</div>
}
