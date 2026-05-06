$(document).ready(function() {
    const $taskInput = $('#task-input');
    const $taskList = $('#task-list');
    const $addBtn = $('#add-btn');

    // Adicionar Tarefa
    $addBtn.on('click', function() {
        const val = $taskInput.val().trim();
        
        if (val !== "") {
            const $taskItem = $(`
                <li class="task-item" style="display: none;">
                    <span>${val}</span>
                    <button class="delete-btn">Excluir</button>
                </li>
            `);
            $taskList.append($taskItem);
            $taskItem.fadeIn(300); // Efeito de entrada
            $taskInput.val("");
        }
    });

    // Remover Tarefa com Efeito
    $taskList.on('click', '.delete-btn', function() {
        const $parent = $(this).parent();
        $parent.fadeOut(300, function() {
            $(this).remove();
        });
    });
});
