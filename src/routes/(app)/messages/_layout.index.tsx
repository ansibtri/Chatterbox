import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/messages/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full bg-gray-900 border-l-1 border-gray-300'>
    <div className='flex justify-center items-center h-dvh'>
      <h5 className='text-white font-bold' >Select Your Friend For Chat</h5>
    </div>
  </div>
}
