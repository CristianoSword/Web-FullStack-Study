<script setup>
import { ref, watch, onMounted } from 'vue';

const query = ref('');
const weather = ref(null);
const isLoading = ref(false);
const error = ref(null);
const backgroundGradient = ref('linear-gradient(135deg, #1e293b 0%, #0f172a 100%)');

// Códigos climáticos da API Open-Meteo
const weatherDescriptions = {
  0: { text: 'Céu Limpo', bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  1: { text: 'Parcialmente Limpo', bg: 'linear-gradient(135deg, #f59e0b 0%, #64748b 100%)' },
  2: { text: 'Nublado', bg: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)' },
  3: { text: 'Encoberto', bg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' },
  45: { text: 'Névoa', bg: 'linear-gradient(135deg, #64748b 0%, #334155 100%)' },
  48: { text: 'Radares de Gelo', bg: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)' },
  51: { text: 'Garoa Leve', bg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' },
  61: { text: 'Chuva Fraca', bg: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)' },
  63: { text: 'Chuva Moderada', bg: 'linear-gradient(135deg, #0284c7 0%, #075985 100%)' },
  80: { text: 'Pancadas de Chuva', bg: 'linear-gradient(135deg, #0284c7 0%, #1e1b4b 100%)' },
  95: { text: 'Tempestade', bg: 'linear-gradient(135deg, #4f46e5 0%, #0f172a 100%)' }
};

const getWeatherInfo = (code) => {
  return weatherDescriptions[code] || { text: 'Condição Desconhecida', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' };
};

// Obter Clima
const fetchWeather = async (lat, lon, cityName = 'Sua Localização') => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    if (!res.ok) throw new Error('Não foi possível obter dados do clima');
    const data = await res.json();
    
    const cw = data.current_weather;
    const cond = getWeatherInfo(cw.weathercode);
    
    weather.value = {
      city: cityName,
      temp: cw.temperature,
      wind: cw.windspeed,
      condition: cond.text,
      code: cw.weathercode
    };
    
    backgroundGradient.value = cond.bg;
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Buscar por nome de cidade
const searchCity = async () => {
  const city = query.value.trim();
  if (!city) return;
  
  isLoading.value = true;
  error.value = null;
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`);
    if (!geoRes.ok) throw new Error('Erro na geocodificação da cidade');
    const geoData = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Cidade não encontrada.');
    }
    
    const result = geoData.results[0];
    await fetchWeather(result.latitude, result.longitude, `${result.name}, ${result.country}`);
    query.value = '';
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Localização GPS automática
const getLocalWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude, 'Minha Localização');
      },
      (err) => {
        // Fallback para São Paulo
        fetchWeather(-23.5489, -46.6388, 'São Paulo, Brasil');
      }
    );
  } else {
    fetchWeather(-23.5489, -46.6388, 'São Paulo, Brasil');
  }
};

onMounted(() => {
  getLocalWeather();
});

// Watcher do clima para logs no console
watch(weather, (newWeather) => {
  if (newWeather) {
    console.log(`Clima atualizado para ${newWeather.city}: ${newWeather.temp}°C, ${newWeather.condition}`);
  }
});
</script>

<template>
  <div class="app-wrapper" :style="{ background: backgroundGradient }">
    <div class="weather-widget">
      <header class="widget-header">
        <h2>Clima Tempo</h2>
        <p>Busca dinâmica e Geolocalização de clima</p>
      </header>

      <!-- Formulário de busca -->
      <form @submit.prevent="searchCity" class="search-form">
        <input 
          v-model="query"
          type="text" 
          placeholder="Pesquisar cidade..." 
          class="widget-input"
        />
        <button type="submit" class="search-btn">Buscar</button>
      </form>

      <!-- Botão localização local -->
      <button @click="getLocalWeather" class="geo-btn">📍 Usar Minha Localização</button>

      <!-- Feedback -->
      <div v-if="isLoading" class="loading-panel">
        <div class="spinner"></div>
        <p>Consultando dados meteorológicos...</p>
      </div>

      <div v-else-if="error" class="error-panel">
        <p>⚠️ Erro: {{ error }}</p>
      </div>

      <!-- Exibição de Clima -->
      <div v-else-if="weather" class="weather-details">
        <div class="city-name">{{ weather.city }}</div>
        
        <div class="temp-val">{{ Math.round(weather.temp) }}°C</div>
        
        <div class="weather-desc">{{ weather.condition }}</div>
        
        <div class="weather-meta">
          <div class="meta-item">
            <span class="meta-label">Vento</span>
            <span class="meta-val">{{ weather.wind }} km/h</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
