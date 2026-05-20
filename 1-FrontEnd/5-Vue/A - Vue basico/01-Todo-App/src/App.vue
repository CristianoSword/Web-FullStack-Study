<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Todo } from './models/todo';

const todos = ref([]);
const newTodoText = ref('');
const currentFilter = ref('all'); // 'all' | 'active' | 'completed'

// Carregar do localStorage
onMounted(() => {
  const saved = localStorage.getItem('vue-basic-todo-app');
  if (saved) {
    try {
      todos.value = JSON.parse(saved).map(t => new Todo(t.id, t.text, t.completed));
    } catch (e) {
      todos.value = [];
    }
  }
});

// Salvar no localStorage
watch(todos, (newVal) => {
  localStorage.setItem('vue-basic-todo-app', JSON.stringify(newVal));
}, { deep: true });

// Métodos
const addTodo = () => {
  const text = newTodoText.value.trim();
  if (!text) return;
  // Prevenir duplicados
  if (todos.value.some(t => t.text.toLowerCase() === text.toLowerCase() && !t.completed)) {
    alert('Esta tarefa pendente já existe!');
    return;
  }
  todos.value.push(new Todo(Date.now(), text));
  newTodoText.value = '';
};

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id);
};

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed);
};

// Computed Properties
const filteredTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter(t => !t.completed);
  } else if (currentFilter.value === 'completed') {
    return todos.value.filter(t => t.completed);
  }
  return todos.value;
});

const stats = computed(() => {
  const total = todos.value.length;
  const completed = todos.value.filter(t => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, pending, percentage };
});
</script>

<template>
  <div class="todo-app-container">
    <header class="app-header">
      <h1>Task Master Vue</h1>
      <p>Organize suas tarefas diárias com Composition API</p>
    </header>

    <main class="app-card">
      <!-- Input de Tarefa -->
      <form @submit.prevent="addTodo" class="todo-form">
        <input 
          v-model="newTodoText"
          type="text" 
          placeholder="O que você precisa fazer hoje?" 
          class="todo-input"
          required
        />
        <button type="submit" class="todo-submit-btn">Adicionar</button>
      </form>

      <!-- Barra de Filtros -->
      <div v-if="stats.total > 0" class="todo-filters-bar">
        <div class="filters">
          <button 
            @click="currentFilter = 'all'" 
            :class="{ active: currentFilter === 'all' }"
            class="filter-btn"
          >
            Todas
          </button>
          <button 
            @click="currentFilter = 'active'" 
            :class="{ active: currentFilter === 'active' }"
            class="filter-btn"
          >
            Pendentes
          </button>
          <button 
            @click="currentFilter = 'completed'" 
            :class="{ active: currentFilter === 'completed' }"
            class="filter-btn"
          >
            Concluídas
          </button>
        </div>
        <button @click="clearCompleted" v-if="stats.completed > 0" class="clear-btn">
          Limpar Concluídas
        </button>
      </div>

      <!-- Lista de Todos -->
      <TransitionGroup name="list" tag="ul" class="todo-list">
        <li 
          v-for="todo in filteredTodos" 
          :key="todo.id" 
          :class="{ completed: todo.completed }"
          class="todo-item"
        >
          <div class="todo-item-content" @click="toggleTodo(todo.id)">
            <span class="custom-checkbox"></span>
            <span class="todo-text">{{ todo.text }}</span>
          </div>
          <button @click="deleteTodo(todo.id)" class="delete-btn" title="Excluir tarefa">
            &times;
          </button>
        </li>
      </TransitionGroup>

      <!-- Mensagem Vazia -->
      <div v-if="filteredTodos.length === 0" class="empty-state">
        <p v-if="currentFilter === 'all'">Nenhuma tarefa cadastrada. Adicione uma acima!</p>
        <p v-else-if="currentFilter === 'active'">Nenhuma tarefa pendente!</p>
        <p v-else>Nenhuma tarefa concluída ainda.</p>
      </div>

      <!-- Barra de Estatísticas -->
      <footer v-if="stats.total > 0" class="todo-footer">
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: stats.percentage + '%' }"></div>
        </div>
        <div class="stats-text">
          <span>{{ stats.completed }} de {{ stats.total }} tarefas concluídas ({{ stats.percentage }}%)</span>
          <span>{{ stats.pending }} pendentes</span>
        </div>
      </footer>
    </main>
  </div>
</template>
