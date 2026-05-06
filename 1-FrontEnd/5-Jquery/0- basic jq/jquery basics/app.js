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

    // Alternar Conclusão
    $taskList.on('click', 'span', function() {
        $(this).parent().toggleClass('completed');
    });

    // Remover Tarefa com Efeito
    $taskList.on('click', '.delete-btn', function() {
        const $parent = $(this).parent();
        $parent.fadeOut(300, function() {
            $(this).remove();
        });
    });

    // Filtros
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
            $('.task-item').fadeIn(200);
        } else if (filter === 'pending') {
            $('.task-item').hide();
            $('.task-item:not(.completed)').fadeIn(200);
        } else if (filter === 'completed') {
            $('.task-item').hide();
            $('.task-item.completed').fadeIn(200);
        }
    });
});
