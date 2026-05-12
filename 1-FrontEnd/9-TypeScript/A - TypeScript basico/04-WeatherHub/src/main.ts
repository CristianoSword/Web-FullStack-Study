import './style.css'
import { WeatherService } from './service'
import { WeatherCache } from './cache'

const app = document.querySelector<HTMLDivElement>('#app')!
const service = new WeatherService()
const cache = new WeatherCache()

app.innerHTML = `
  <div class="weather-card">
    <h2>WeatherHub</h2>
    <div class="search-box">
      <input type="text" id="city-input" placeholder="Digite a cidade...">
      <button id="search-btn">Buscar</button>
    </div>
    <div id="weather-result"></div>
  </div>
`

const input = document.querySelector<HTMLInputElement>('#city-input')!
const btn = document.querySelector<HTMLButtonElement>('#search-btn')!
const resultDiv = document.querySelector<HTMLDivElement>('#weather-result')!

btn.addEventListener('click', async () => {
  const city = input.value.trim()
  if (!city) return

  let data = cache.get(city)
  if (!data) {
    data = await service.fetchWeather(city)
    cache.set(city, data)
  }

  resultDiv.innerHTML = `
    <div class="result">
      <h3>${data.city}</h3>
      <p class="temp">${data.temperature}C / ${service.toFahrenheit(data.temperature).toFixed(1)}F</p>
      <p class="condition">${data.condition}</p>
      <div class="details">
        <span>Umidade: ${data.humidity}%</span>
        <span>Vento: ${data.windSpeed} km/h</span>
      </div>
    </div>
  `
})
