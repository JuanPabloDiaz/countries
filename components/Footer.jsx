/**
 * Footer component that appears at the bottom of every page
 * @component
 * @returns {JSX.Element} The rendered footer component
 */

import Link from 'next/link'
import { Container } from '.'
import { TbWorld, TbBrandGithub, TbHeart } from 'react-icons/tb'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TbWorld className="text-2xl text-blue-500" />
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400">WorldFlags</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-3">
              <Link 
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/quiz"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Quiz
              </Link>
              <a 
                href="https://github.com/JuanPabloDiaz/countries" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <TbBrandGithub />
                <span>GitHub</span>
              </a>
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <span>Made with</span>
              <TbHeart className="text-red-500" />
              <span>© {currentYear} CountryHub</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
