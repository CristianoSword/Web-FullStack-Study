<script setup>
import { ref, computed, onMounted } from 'vue';
import { UserProfile } from './models/user';

const users = ref([]);
const isLoading = ref(false);
const error = ref(null);
const searchTerm = ref('');

const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await fetch('https://randomuser.me/api/?results=6&noinfo');
    if (!res.ok) throw new Error('Falha ao obter dados da API');
    const data = await res.json();
    users.value = data.results.map(u => new UserProfile(u));
  } catch (err) {
    error.value = err.message || 'Erro de conexão com o servidor';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const filteredUsers = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return users.value;
  return users.value.filter(user => 
    user.name.toLowerCase().includes(term) || 
    user.location.toLowerCase().includes(term)
  );
});
</script>

<template>
  <div class="profiles-container">
    <header class="profiles-header">
      <h1>Mural de Usuários</h1>
      <p>Ciclo de vida e consumo de API REST no Vue 3</p>
    </header>

    <!-- Barra de busca e ações -->
    <div class="actions-bar">
      <input 
        v-model="searchTerm"
        type="text" 
        placeholder="Buscar por nome ou cidade..." 
        class="search-input"
      />
      <button @click="fetchUsers" :disabled="isLoading" class="refresh-btn">
        {{ isLoading ? 'Carregando...' : 'Recarregar Perfis' }}
      </button>
    </div>

    <!-- Feedback de Erro -->
    <div v-if="error" class="error-panel">
      <p>⚠️ Ocorreu um erro: {{ error }}</p>
      <button @click="fetchUsers" class="retry-btn">Tentar Novamente</button>
    </div>

    <!-- Grid de Usuários -->
    <div v-else class="profiles-grid-wrapper">
      <div v-if="isLoading" class="shimmer-grid">
        <div v-for="i in 6" :key="i" class="profile-card shimmer-card">
          <div class="shimmer-avatar"></div>
          <div class="shimmer-line long"></div>
          <div class="shimmer-line short"></div>
        </div>
      </div>

      <div v-else-if="filteredUsers.length === 0" class="empty-state">
        Nenhum usuário corresponde à busca.
      </div>

      <div v-else class="profiles-grid">
        <div 
          v-for="user in filteredUsers" 
          :key="user.id" 
          class="profile-card"
        >
          <span class="flag-badge">{{ user.nat }}</span>
          <div class="avatar-container">
            <img :src="user.picture" :alt="user.name" class="profile-avatar" />
          </div>
          <div class="profile-info">
            <h3>{{ user.name }}</h3>
            <p class="location-text">📍 {{ user.location }}</p>
            
            <hr class="card-divider" />
            
            <div class="contact-details">
              <p><strong>✉️ Email:</strong> <span>{{ user.email }}</span></p>
              <p><strong>📞 Tel:</strong> <span>{{ user.phone }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
