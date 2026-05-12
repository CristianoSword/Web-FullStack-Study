import './style.css'
import { QuizEngine } from './engine'
import { QUESTIONS } from './data'

console.log("DOM carregado, iniciando Quiz Master...");

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
    console.error("Erro: Elemento #app não encontrado!");
} else {
    const engine = new QuizEngine(QUESTIONS)

    function render() {
        console.log("Renderizando estado:", engine.getState());
        const state = engine.getState()
        const currentQuestion = engine.getCurrentQuestion()

        if (state.isFinished) {
            app!.innerHTML = `
                <div class="quiz-container">
                    <h1>Quiz Finalizado!</h1>
                    <p>Sua pontuação: ${state.score} de ${QUESTIONS.length}</p>
                    <p>Porcentagem: ${engine.getScorePercentage().toFixed(2)}%</p>
                    <button id="retry-btn">Reiniciar</button>
                </div>
            `;
            document.querySelector('#retry-btn')?.addEventListener('click', () => location.reload());
            return;
        }

        if (currentQuestion) {
            app!.innerHTML = `
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
            `;

            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    const index = parseInt(target.dataset.index!);
                    console.log("Resposta selecionada:", index);
                    engine.submitAnswer(index);
                    render();
                });
            });
        } else {
            console.warn("Nenhuma questão encontrada para renderizar.");
            app!.innerHTML = `<p>Erro: Nenhuma questão encontrada.</p>`;
        }
    }

    render();
}
