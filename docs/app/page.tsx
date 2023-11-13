import { Examples } from '@/app/Examples'
import { Heading } from '@/app/Heading'
import { CodeInsight } from '@/app/CodeInsight'
import { OptionsOverview } from '@/app/OptionsOverview'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center gap-12 p-24 pt-[22vh]">
      <Heading />
      <h3 className="text-center text-lg text-gray-400">
        One hook - endless options to choose from
      </h3>
      <section className="w-full max-w-md">
        <Examples />
      </section>
      <CodeInsight />
      <OptionsOverview />
    </main>
  )
}
