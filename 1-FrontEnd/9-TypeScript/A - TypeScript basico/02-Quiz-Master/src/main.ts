import './style.css'
import { QuizEngine } from './engine'
import { QUESTIONS } from './data'

const app = document.querySelector<HTMLDivElement>('#app')!
const engine = new QuizEngine(QUESTIONS)

function render() {
  const state = engine.getState()
  const currentQuestion = engine.getCurrentQuestion()

  if (state.isFinished) {
    app.innerHTML = `
      <div class="quiz-container">
        <h1>Quiz Finalizado!</h1>
        <p>Sua pontuao: ${state.score} de ${QUESTIONS.length}</p>
        <p>Porcentagem: ${engine.getScorePercentage().toFixed(2)}%</p>
        <button onclick="location.reload()">Reiniciar</button>
      </div>
    `
    return
  }

  if (currentQuestion) {
    app.innerHTML = `
      <div class="quiz-container">
        <span class="difficulty">${currentQuestion.difficulty}</span>
        <h1>${currentQuestion.text}</h1>
        <div class="options">
          ${currentQuestion.options.map((opt, i) => `
            <button class="option-btn" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <p class="progress">Pergunta ${state.currentQuestionIndex + 1} de ${QUESTIONS.length}</p>
      </div>
    `

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.target as HTMLButtonElement).dataset.index!)
        engine.submitAnswer(index)
        render()
      })
    })
  }
}

render()
