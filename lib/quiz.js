import quizData from '@/data/quiz.json'

export async function getQuizQuestion(id) {
  try {
    // Find the question with the matching ID in the local quiz data
    const question = quizData.data.find(q => q.id === id)
    
    if (!question) {
      // If question not found, return the first question instead
      const fallbackQuestion = quizData.data[0]
      const { correct_answer, ...safeFallback } = fallbackQuestion
      return { question: safeFallback }
    }
    
    // Return the question without the correct answer (for security)
    const { correct_answer, ...safeQuestion } = question
    return { question: safeQuestion }
  } catch (error) {
    console.error('Error getting quiz question:', error)
    // Return the first question as a fallback
    const fallbackQuestion = quizData.data[0]
    const { correct_answer, ...safeFallback } = fallbackQuestion
    return { question: safeFallback }
  }
}

export async function getRandomQuizQuestion() {
  // Get a random question ID from the local quiz data
  const randomIndex = Math.floor(Math.random() * quizData.data.length)
  const randomId = quizData.data[randomIndex].id
  
  return { id: randomId }
}
