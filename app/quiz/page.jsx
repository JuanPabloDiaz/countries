/**
Renders a Next.js page component that displays a quiz introduction with an image and a link to start the quiz.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import { getRandomQuizQuestion } from '@/lib/quiz'
import Image from 'next/image'
import Link from 'next/link'
import { TbArrowBigRightFilled, TbWorld, TbFlag, TbMapPin } from 'react-icons/tb'

export default async function Page() {
  const data = await getRandomQuizQuestion()

  return (
    <main>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <Container size="lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-4">
                Test Your Knowledge
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Countries of the World Quiz
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Challenge yourself with our interactive quiz about countries, capitals, flags, and geography. 
                How much do you know about our world?
              </p>
              <Link
                href={`/quiz/${data.randomQuestion}`}
                className="btn btn-primary inline-flex items-center gap-2 text-lg"
              >
                <TbArrowBigRightFilled className="text-xl" />
                Start Quiz Now
              </Link>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg border-4 border-white dark:border-gray-700">
                <Image 
                  src="/world-map.jpg" 
                  alt="World Map" 
                  width={700} 
                  height={500} 
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Features section */}
      <Container size="lg" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quiz Features</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our country quiz offers a fun and educational way to test your knowledge about countries around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
              <TbWorld size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Geography Knowledge</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge about countries, capitals, and geographical facts from around the world.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 mb-4">
              <TbFlag size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Flag Recognition</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Challenge yourself to identify flags from different nations and learn about their designs and meanings.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 mb-4">
              <TbMapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Capitals & Cities</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn about major cities and capitals from countries across all continents.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href={`/quiz/${data.randomQuestion}`}
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            <TbArrowBigRightFilled />
            Take the Quiz
          </Link>
        </div>
      </Container>
    </main>
  )
}
