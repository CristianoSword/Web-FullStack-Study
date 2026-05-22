import { MetricItem, ReportItem } from './analytics.models';

export const MOCK_METRICS: MetricItem[] = [
  {
    id: 'mrr',
    label: 'MRR Corporativo',
    value: 128450.00,
    type: 'currency',
    trendPercent: 12.4,
    isPositive: true,
    history: [85, 92, 104, 110, 118, 128]
  },
  {
    id: 'active_users',
    label: 'Usuários Ativos (DAU)',
    value: 8430,
    type: 'number',
    trendPercent: 8.2,
    isPositive: true,
    history: [6000, 6800, 7200, 7500, 7900, 8430]
  },
  {
    id: 'server_load',
    label: 'Carga dos Servidores',
    value: 42.6,
    type: 'percent',
    trendPercent: 5.1,
    isPositive: false,
    history: [30, 35, 48, 40, 38, 42]
  },
  {
    id: 'conversion',
    label: 'Taxa de Conversão',
    value: 3.84,
    type: 'percent',
    trendPercent: 1.2,
    isPositive: true,
    history: [3.1, 3.3, 3.4, 3.6, 3.7, 3.84]
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'rep-001',
    name: 'Faturamento Anual AuraSaaS',
    type: 'PDF',
    date: '22 Mai, 2026',
    size: '2.4 MB',
    status: 'Concluído',
    author: 'Cristiano Sword'
  },
  {
    id: 'rep-002',
    name: 'Métricas de DAU e Engajamento',
    type: 'XLSX',
    date: '21 Mai, 2026',
    size: '15.8 MB',
    status: 'Concluído',
    author: 'Helena Ribeiro'
  },
  {
    id: 'rep-003',
    name: 'Logs de Erros de Transações',
    type: 'CSV',
    date: '20 Mai, 2026',
    size: '850 KB',
    status: 'Erro',
    author: 'Lucas Mendes'
  },
  {
    id: 'rep-004',
    name: 'Auditoria de Acesso RBAC',
    type: 'PDF',
    date: '18 Mai, 2026',
    size: '1.2 MB',
    status: 'Pendente',
    author: 'Aura-Bot'
  }
];
