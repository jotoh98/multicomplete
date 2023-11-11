import { Examples } from '@/app/Examples'
import { Heading } from '@/app/Heading'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <section className='w-full max-w-md flex flex-col gap-12'>
        <Heading />
        <h3 className='text-center text-lg text-gray-400'>One hook - endless options to choose from</h3>
        <Examples />
      </section>
    </main>
  )
}
