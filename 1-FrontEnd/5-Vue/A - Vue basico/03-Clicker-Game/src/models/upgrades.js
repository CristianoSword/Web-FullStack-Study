// Lista de upgrades disponíveis no jogo
export const UPGRADES_LIST = [
  {
    id: "autoclicker",
    name: "Autoclique Básico",
    description: "Gera 1 ponto a cada segundo automaticamente",
    cost: 15,
    multiplier: 1.15,
    effect: 1,
    type: "cps",
    count: 0
  },
  {
    id: "powerclick",
    name: "Clique Reforçado",
    description: "Adiciona +2 pontos por clique manual",
    cost: 50,
    multiplier: 1.25,
    effect: 2,
    type: "cpc",
    count: 0
  },
  {
    id: "cybercore",
    name: "Módulo Cybercore",
    description: "Gera 10 pontos a cada segundo",
    cost: 250,
    multiplier: 1.2,
    effect: 10,
    type: "cps",
    count: 0
  },
  {
    id: "quantumprocessor",
    name: "Processador Quântico",
    description: "Adiciona +15 pontos por clique manual",
    cost: 1000,
    multiplier: 1.3,
    effect: 15,
    type: "cpc",
    count: 0
  }
];
