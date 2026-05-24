export const CHART_DATA = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  datasets: [
    {
      label: "Largura de Banda (Gbps)",
      data: [12, 19, 15, 25, 22, 30, 28],
      borderColor: "#00e5ff",
      backgroundColor: "rgba(0, 229, 255, 0.1)",
      tension: 0.4
    },
    {
      label: "Carga do CPU (%)",
      data: [8, 12, 10, 15, 14, 18, 16],
      borderColor: "#ab47bc",
      backgroundColor: "rgba(171, 71, 188, 0.1)",
      tension: 0.4
    }
  ]
};
