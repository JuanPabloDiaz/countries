/**
Renders a component that displays a list of answer options for a quiz question.
@component
@param {Object} props - The component props.
@param {Array} props.answers - An array of answer options.
@param {string} props.questionId - The ID of the quiz question.
@returns {JSX.Element} The rendered component.
*/

'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { TbRepeat, TbArrowRight, TbLoader2 } from 'react-icons/tb'
import { TbCircleX } from 'react-icons/tb'
import { TbCircleCheck } from 'react-icons/tb'
import { validateAnswer } from '@/lib/answerUtils'

export const Answer = ({ answers, questionId }) => {
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    if (selected) {
      setLoading(true)
      
      // Simulate API call delay for better UX
      setTimeout(() => {
        try {
          // Use local data validation instead of API call
          const result = validateAnswer(questionId, selected)
          setData(result)
          
          // Update score if answer was correct
          if (result.correct === selected) {
            setScore(prev => ({
              correct: prev.correct + 1,
              total: prev.total + 1
            }))
          } else {
            setScore(prev => ({
              ...prev,
              total: prev.total + 1
            }))
          }
        } catch (error) {
          console.error('Error validating answer:', error)
        } finally {
          setLoading(false)
        }
      }, 600) // Simulate network delay
    }
  }, [questionId, selected])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {answers.map(item => {
          const isLoading = selected === item && loading
          const isWrong = selected === item && data && data?.correct !== selected
          const isCorrect = data?.correct === item
          const isSelected = selected === item

          return (
            <div key={item} className="h-full">
              <button
                disabled={data || loading}
                onClick={() => setSelected(item)}
                className={cn(
                  'w-full h-full p-4 rounded-lg flex items-center justify-between text-base font-medium transition-all duration-200',
                  'border-2 hover:shadow-md disabled:cursor-not-allowed',
                  isLoading && 'animate-pulse',
                  isSelected && !isWrong && !isCorrect && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                  !isSelected && !isWrong && !isCorrect && 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700',
                  isWrong && 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
                  isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400',
                )}
              >
                <span className="flex-1 text-left">{item}</span>
                <span className="flex-shrink-0 ml-2">
                  {isLoading && <TbLoader2 className="animate-spin" size={20} />}
                  {isCorrect && <TbCircleCheck size={20} />}
                  {isWrong && <TbCircleX size={20} />}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {data && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              {data.correct === selected ? (
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <TbCircleCheck className="mr-2" size={20} />
                  Correct answer!
                </div>
              ) : (
                <div className="text-red-600 dark:text-red-400 font-medium">
                  <div className="flex items-center">
                    <TbCircleX className="mr-2" size={20} />
                    Incorrect. The correct answer is: <span className="font-bold ml-1">{data.correct}</span>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Score: {score.correct} correct out of {score.total} questions
              </div>
            </div>
            
            {data?.random && (
              <Link
                href={`/quiz/${data.random}`}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <span>Next Question</span>
                <TbArrowRight />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
