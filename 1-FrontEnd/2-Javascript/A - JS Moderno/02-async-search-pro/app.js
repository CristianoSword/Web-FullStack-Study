/**
 * Async Search Pro
 * Demonstração de AbortController para cancelamento de requisições assíncronas
 */

const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const loader = document.getElementById('loader');
const statusBar = document.getElementById('status-bar');

let currentAbortController = null;

// Função de Busca
async function searchRepositories(query) {
    // 1. Cancela a requisição anterior se existir
    if (currentAbortController) {
        currentAbortController.abort();
        console.log('%c Requisição cancelada pelo AbortController', 'color: orange');
    }

    // 2. Cria um novo controller para a requisição atual
    currentAbortController = new AbortController();
    const { signal } = currentAbortController;

    loader.classList.remove('hidden');
    statusBar.textContent = `Buscando por: "${query}"...`;

    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10`, { signal });
        
        if (!response.ok) throw new Error('Erro na API');

        const data = await response.json();
        renderResults(data.items);
        statusBar.textContent = `${data.total_count.toLocaleString()} resultados encontrados.`;
    } catch (error) {
        if (error.name === 'AbortError') {
            // Requisição foi cancelada propositalmente, ignoramos o erro no UI
            return;
        }
        console.error('Erro na busca:', error);
        statusBar.textContent = 'Erro ao buscar dados. Tente novamente.';
        renderError();
    } finally {
        if (!signal.aborted) {
            loader.classList.add('hidden');
        }
    }
}

function renderResults(repos) {
    if (repos.length === 0) {
        resultsList.innerHTML = '<li class="placeholder">Nenhum repositório encontrado.</li>';
        return;
    }

    resultsList.innerHTML = repos.map(repo => `
        <li>
            <a href="${repo.html_url}" target="_blank" style="text-decoration: none;">
                <span class="repo-name">${repo.full_name}</span>
                <span class="repo-desc">${repo.description || 'Sem descrição.'}</span>
            </a>
        </li>
    `).join('');
}

function renderError() {
    resultsList.innerHTML = '<li class="placeholder" style="color: #f85149;">Falha na conexão com a API do GitHub.</li>';
}

// Debounce para evitar múltiplas chamadas rápidas
let debounceTimer;
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(debounceTimer);
    
    if (query.length < 3) {
        resultsList.innerHTML = '<li class="placeholder">Digite pelo menos 3 caracteres...</li>';
        statusBar.textContent = 'Pronto para buscar...';
        return;
    }

    debounceTimer = setTimeout(() => {
        searchRepositories(query);
    }, 500); // 500ms de atraso
});
