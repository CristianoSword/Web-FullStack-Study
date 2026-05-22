export interface MicroWidgetConfig {
  id: string;
  name: string;
  category: string;
  icon: string;
  loadingState: 'idle' | 'loading' | 'loaded' | 'error';
}

export interface WidgetAnalytics {
  loadedCount: number;
  lastInteractionTime?: string;
}
