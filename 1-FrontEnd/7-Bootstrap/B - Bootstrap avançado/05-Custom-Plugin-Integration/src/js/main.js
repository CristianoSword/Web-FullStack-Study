import { CHART_DATA } from './models.js';

let telemetryChart;

document.addEventListener('DOMContentLoaded', () => {
  renderChart();
  setupSimulation();
});

function renderChart() {
  const ctx = document.getElementById('telemetryChartCanvas');
  if (!ctx) return;

  // Chart.js global config overrides for beautiful dark look
  Chart.defaults.color = '#c5bcd2';
  Chart.defaults.borderColor = '#1e1136';

  telemetryChart = new Chart(ctx, {
    type: 'line',
    data: CHART_DATA,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#1e1136'
          }
        },
        x: {
          grid: {
            color: '#1e1136'
          }
        }
      }
    }
  });
}

function setupSimulation() {
  const updateBtn = document.getElementById('randomize-chart-btn');
  if (!updateBtn) return;

  updateBtn.addEventListener('click', () => {
    if (!telemetryChart) return;

    // Generate new random data points
    const newBandwidth = CHART_DATA.datasets[0].data.map(() => Math.floor(Math.random() * 20) + 10);
    const newCPU = CHART_DATA.datasets[1].data.map(() => Math.floor(Math.random() * 15) + 5);

    telemetryChart.data.datasets[0].data = newBandwidth;
    telemetryChart.data.datasets[1].data = newCPU;
    
    // Smooth update transition
    telemetryChart.update();
  });
}
