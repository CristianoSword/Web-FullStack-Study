export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  type: 'currency' | 'number' | 'percent';
  trendPercent: number;
  isPositive: boolean;
  history: number[];
}

export interface ReportItem {
  id: string;
  name: string;
  type: 'PDF' | 'XLSX' | 'CSV';
  date: string;
  size: string;
  status: 'Concluído' | 'Pendente' | 'Erro';
  author: string;
}
