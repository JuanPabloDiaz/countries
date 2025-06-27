/**
Renders a navigation component with a sticky header, containing a logo and a link to take a quiz.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import { Container } from '.'
import { TbArrowBigRightFilled } from 'react-icons/tb'
import { TbWorld } from 'react-icons/tb'

export const Navigation = () => {
  return (
    <div className="sticky top-0 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-50 shadow-sm">
      <Container className="flex justify-between items-center py-4" as="nav">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <TbWorld className="text-2xl" />
          <span>CountryHub</span>
        </Link>
        
        <div className="flex gap-4 items-center">
          <Link 
            href="/"
            className="hidden sm:block font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/quiz"
            className="btn btn-primary"
          >
            <TbArrowBigRightFilled className="text-lg" />
            Take a Quiz
          </Link>
        </div>
      </Container>
    </div>
  )
}
