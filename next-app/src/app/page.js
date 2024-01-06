import Image from 'next/image'
import Button from '@/components/Elements/Buttons'

export default function Home() {
  return (
    <div className='p-5 w-screen border-2'>
      <Button intent="primary" size="full" href="/">Login</Button>
    </div>
  )
}
