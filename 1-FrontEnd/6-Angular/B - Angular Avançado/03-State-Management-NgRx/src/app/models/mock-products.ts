import { ProductItem } from './cart.models';

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'Teclado Mecânico Cyberpunk',
    price: 899.90,
    description: 'Switches táteis lubrificados, keycaps PBT translucent com iluminação RGB HSL.',
    category: 'Periféricos',
    imageUrl: '⌨️'
  },
  {
    id: 'prod-002',
    name: 'Mouse Optomecânico Aura',
    price: 459.90,
    description: 'Sensor de 26k DPI, switches ópticos de latência ultra baixa (<0.2ms).',
    category: 'Periféricos',
    imageUrl: '🖱️'
  },
  {
    id: 'prod-003',
    name: 'Monitor Ultrawide 34" 165Hz',
    price: 2899.00,
    description: 'Painel VA curvo de 1500R, 1ms de resposta e 120% sRGB reativo.',
    category: 'Monitores',
    imageUrl: '🖥️'
  },
  {
    id: 'prod-004',
    name: 'Headset Gamer Gênesis',
    price: 749.00,
    description: 'Drivers de neodímio de 50mm, áudio espacial 7.1 e microfone cardioide.',
    category: 'Áudio',
    imageUrl: '🎧'
  }
];
