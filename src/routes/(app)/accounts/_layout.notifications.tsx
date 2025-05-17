import { createFileRoute } from '@tanstack/react-router'
import Notifications from './../../../components/Notifications/Notifications';

export const Route = createFileRoute('/(app)/accounts/_layout/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="bg-gray-900 w-full block overflow-hidden">
  <div className="overflow-y-scroll h-dvh">
  <p className='text-white'>Notifications</p>
  </div>
</div>
}
