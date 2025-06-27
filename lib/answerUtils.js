import quizData from '@/data/quiz.json'

/**
 * Validates if the selected answer is correct for a given question ID
 * @param {string} questionId - The ID of the quiz question
 * @param {string} selectedAnswer - The answer selected by the user
 * @returns {Object} Object containing correctness info and next question
 */
export function validateAnswer(questionId, selectedAnswer) {
  try {
    // Find the question with the matching ID
    const question = quizData.data.find(q => q.id === questionId)
    
    if (!question) {
      // If question not found, use the first question as a fallback
      const fallbackQuestion = quizData.data[0]
      const isCorrect = fallbackQuestion.correct_answer === selectedAnswer
      
      // Get a random next question ID
      const randomIndex = Math.floor(Math.random() * quizData.data.length)
      const nextQuestionId = quizData.data[randomIndex].id
      
      return {
        correct: fallbackQuestion.correct_answer,
        next: nextQuestionId
      }
    }
    
    // Check if the selected answer is correct
    const isCorrect = question.correct_answer === selectedAnswer
    
    // Get a random next question ID (different from current)
    let nextQuestionId
    do {
      const randomIndex = Math.floor(Math.random() * quizData.data.length)
      nextQuestionId = quizData.data[randomIndex].id
    } while (nextQuestionId === questionId && quizData.data.length > 1)
    
    return {
      correct: question.correct_answer,
      next: nextQuestionId
    }
  } catch (error) {
    console.error('Error validating answer:', error)
    
    // Fallback to a safe response
    const randomIndex = Math.floor(Math.random() * quizData.data.length)
    return {
      correct: selectedAnswer, // Just assume it's correct as a fallback
      next: quizData.data[randomIndex].id
    }
  }
}
