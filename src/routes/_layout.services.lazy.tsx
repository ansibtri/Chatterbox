import { createLazyFileRoute } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/_layout/services')({
  component: RouteComponent,
  pendingComponent:()=>{
    return <>Loading..</>
  }
})

function RouteComponent() {
  return <div>
    Services
  </div>
}
