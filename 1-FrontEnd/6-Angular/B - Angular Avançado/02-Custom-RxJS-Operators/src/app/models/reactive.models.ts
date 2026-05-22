export interface StreamLogItem {
  id: string;
  timestamp: string;
  category: 'mouse' | 'click' | 'keyboard' | 'form';
  content: string;
  latencyMs?: number;
}

export interface MouseCoordinates {
  x: number;
  y: number;
}
