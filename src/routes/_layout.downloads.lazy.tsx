import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/downloads')({
  component: RouteComponent,
  pendingComponent:()=>{
    return <>Loading..</>
  }
})

function RouteComponent() {
  return <>
  Downloads
  </>
}
