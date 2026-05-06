$(document).ready(function() {
    const $taskInput = $('#task-input');
    const $taskList = $('#task-list');
    const $addBtn = $('#add-btn');

    // Adicionar Tarefa
    $addBtn.on('click', function() {
        const val = $taskInput.val().trim();
        
        if (val !== "") {
            const taskHtml = `
                <li class="task-item">
                    <span>${val}</span>
                    <button class="delete-btn">Excluir</button>
                </li>
            `;
            $taskList.append(taskHtml);
            $taskInput.val(""); // Limpar input
        }
    });

    // Remover Tarefa (Delegação de evento para elementos dinâmicos)
    $taskList.on('click', '.delete-btn', function() {
        $(this).parent().remove();
    });
});
