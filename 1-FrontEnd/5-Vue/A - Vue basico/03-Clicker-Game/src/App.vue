<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { UPGRADES_LIST } from './models/upgrades';

const points = ref(0);
const pointsPerClick = ref(1);
const pointsPerSecond = ref(0);
const upgrades = ref(JSON.parse(JSON.stringify(UPGRADES_LIST)));
const clickScale = ref(1);
let gameInterval = null;

// Conquistas desbloqueadas
const achievements = ref([
  { id: 'first_100', name: 'Primeiros Passos', desc: 'Acumule 100 pontos', reached: false, check: (p) => p >= 100 },
  { id: 'first_upgrade', name: 'Investidor ágil', desc: 'Compre o primeiro upgrade', reached: false, check: (_, u) => u.some(item => item.count > 0) },
  { id: 'master_cps', name: 'Automatização Completa', desc: 'Alcance 15 CPS (Pontos por segundo)', reached: false, check: (_, __, cps) => cps >= 15 },
]);

// Carregar Dados
onMounted(() => {
  const savedPoints = localStorage.getItem('clicker_points');
  const savedUpgrades = localStorage.getItem('clicker_upgrades');
  
  if (savedPoints) points.value = parseFloat(savedPoints);
  if (savedUpgrades) {
    try {
      upgrades.value = JSON.parse(savedUpgrades);
    } catch(e) {}
  }
  
  // Recalcular multiplicadores globais
  recalculateStats();

  // Iniciar Loop do jogo (CPS)
  gameInterval = setInterval(() => {
    points.value += pointsPerSecond.value / 10;
  }, 100);
});

onUnmounted(() => {
  clearInterval(gameInterval);
});

// Watcher para salvar progresso
watch([points, upgrades], () => {
  localStorage.setItem('clicker_points', points.value.toString());
  localStorage.setItem('clicker_upgrades', JSON.stringify(upgrades.value));
  checkAchievements();
}, { deep: true });

// Ações
const clickMainButton = () => {
  points.value += pointsPerClick.value;
  clickScale.value = 0.92;
  setTimeout(() => clickScale.value = 1, 80);
};

const buyUpgrade = (id) => {
  const upgrade = upgrades.value.find(u => u.id === id);
  if (!upgrade || points.value < upgrade.cost) return;

  points.value -= upgrade.cost;
  upgrade.count++;
  upgrade.cost = Math.round(upgrade.cost * upgrade.multiplier);
  
  recalculateStats();
};

const recalculateStats = () => {
  let cpc = 1;
  let cps = 0;
  
  upgrades.value.forEach(u => {
    if (u.type === 'cpc') {
      cpc += u.count * u.effect;
    } else if (u.type === 'cps') {
      cps += u.count * u.effect;
    }
  });
  
  pointsPerClick.value = cpc;
  pointsPerSecond.value = cps;
};

const checkAchievements = () => {
  achievements.value.forEach(ach => {
    if (!ach.reached && ach.check(points.value, upgrades.value, pointsPerSecond.value)) {
      ach.reached = true;
    }
  });
};

const resetGame = () => {
  if (confirm('Deseja realmente resetar todo o seu progresso no jogo?')) {
    points.value = 0;
    upgrades.value = JSON.parse(JSON.stringify(UPGRADES_LIST));
    achievements.value.forEach(a => a.reached = false);
    recalculateStats();
  }
};
</script>

<template>
  <div class="game-container">
    <header class="game-header">
      <h1>Neon Clicker incremental</h1>
      <p>Persistência e loops de tempo em Vue 3</p>
    </header>

    <div class="game-layout">
      <!-- Painel Esquerdo: Clicker Principal -->
      <section class="clicker-section">
        <div class="score-display">
          <h2>{{ Math.floor(points) }}</h2>
          <p class="cps-display">CPS (Pontos/Seg): {{ pointsPerSecond }} | Por Clique: {{ pointsPerClick }}</p>
        </div>

        <button 
          @click="clickMainButton" 
          :style="{ transform: `scale(${clickScale})` }"
          class="main-click-btn"
        >
          <span>CLIQUE AQUI</span>
        </button>

        <button @click="resetGame" class="reset-btn">Resetar Jogo</button>
      </section>

      <!-- Painel Direito: Loja e Conquistas -->
      <section class="store-section">
        <h3>🛒 Upgrades Hardware</h3>
        <div class="upgrades-list">
          <div 
            v-for="item in upgrades" 
            :key="item.id" 
            class="upgrade-item"
            :class="{ locked: points < item.cost }"
          >
            <div class="upgrade-info">
              <h4>{{ item.name }} (x{{ item.count }})</h4>
              <p>{{ item.description }}</p>
              <span class="cost-text">💰 Custo: {{ item.cost }}</span>
            </div>
            <button 
              @click="buyUpgrade(item.id)" 
              :disabled="points < item.cost"
              class="buy-btn"
            >
              Comprar
            </button>
          </div>
        </div>

        <!-- Painel Conquistas -->
        <h3 class="achievements-title">🏆 Conquistas</h3>
        <div class="achievements-list">
          <div 
            v-for="ach in achievements" 
            :key="ach.id" 
            class="ach-item"
            :class="{ unlocked: ach.reached }"
          >
            <div class="ach-badge">{{ ach.reached ? '🔓' : '🔒' }}</div>
            <div class="ach-info">
              <h4>{{ ach.name }}</h4>
              <p>{{ ach.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
