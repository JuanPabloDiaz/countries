/**
Renders a Next.js page component that displays a quiz question and its answer options.
@component
@param {Object} props - The component props.
@param {Object} props.params - The parameters passed to the page component.
@param {string} props.params.id - The ID of the quiz question.
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import { Answer } from '@/components/Answer'
import { getQuizQuestion } from '@/lib/quiz'
import { endpoint } from '@/utils/endpoint'
import Image from 'next/image'
import Link from 'next/link'
import { TbArrowLeft, TbHelpCircle } from 'react-icons/tb'

export default async function Page({ params }) {
  const { question } = await getQuizQuestion(params.id)

  return (
    <main>
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <Container size="lg">
          <Link 
            href="/quiz" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <TbArrowLeft className="mr-1" />
            Back to Quiz Home
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <TbHelpCircle className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold">Quiz Question</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {question.country && (
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-3xl mb-2">🌎</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Country: {question.country}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Question and answers */}
                <div className={`w-full ${question.country ? 'md:w-2/3' : ''}`}>
                  <h1 className="text-xl md:text-2xl font-bold mb-6">{question.title}</h1>
                  <Answer answers={question.answers} questionId={params.id} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
