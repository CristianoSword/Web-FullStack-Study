/**
 * AuraStore Catalog & Product Models
 */

export const MOCK_PRODUCTS = [
  {
    id: 'aurabook-pro',
    name: 'AuraBook Pro 16"',
    category: 'Laptops',
    price: 2499.00,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=AuraBook',
    description: 'O notebook definitivo para desenvolvedores e criativos exigentes. Equipado com processador de 12 núcleos de alta performance e tela Retina OLED de 120Hz.',
    specs: {
      'Processador': 'Aura M3 Max 12-Core',
      'Memória RAM': '32GB LPDDR5X',
      'Armazenamento': '1TB NVMe PCIe 4.0 SSD',
      'Tela': '16.2" OLED Liquid View (3456 x 2234)',
      'Bateria': 'Até 22 horas de reprodução contínua'
    },
    reviews: [
      { id: 1, author: 'Cristiano S.', rating: 5, comment: 'Performance insana em builds C++ e compilation de shaders OpenGL. Vale cada centavo.' },
      { id: 2, author: 'Helena R.', rating: 5, comment: 'A tela OLED é simplesmente espetacular para design e color grading!' }
    ]
  },
  {
    id: 'aurabuds-max',
    name: 'AuraBuds Max',
    category: 'Áudio',
    price: 349.00,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=AuraBuds',
    description: 'Fones de ouvido over-ear premium com cancelamento de ruído ativo inteligente de última geração (ANC) e assinatura de áudio espacial 3D.',
    specs: {
      'Driver': '40mm Dinâmico Customizado',
      'Conexão': 'Bluetooth 5.3 com LE Audio',
      'Cancelamento Ruído': 'ANC Híbrido Reativo (Até 48dB)',
      'Bateria': 'Até 40 horas com ANC ativado',
      'Carregamento': 'USB-C com carga rápida (10 min = 5 horas)'
    },
    reviews: [
      { id: 1, author: 'Lucas M.', rating: 4, comment: 'Cancelamento de ruído excepcional para trabalhar em escritórios barulhentos.' }
    ]
  },
  {
    id: 'aurawatch-elite',
    name: 'AuraWatch Elite',
    category: 'Wearables',
    price: 499.00,
    rating: 4.7,
    reviewsCount: 92,
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=AuraWatch',
    description: 'Smartwatch corporativo luxuoso construído em titânio aeroespacial. Sensores médicos de alta fidelidade e monitoramento cardíaco por IA.',
    specs: {
      'Caixa': 'Titânio Aeroespacial de 46mm',
      'Tela': '1.43" AMOLED Cristal de Safira',
      'Sensores': 'ECG, Oxímetro (SpO2), Termômetro corporal',
      'Resistência': '10 ATM (Até 100 metros de profundidade)',
      'Bateria': 'Até 14 dias em modo econômico'
    },
    reviews: [
      { id: 1, author: 'Fernando K.', rating: 5, comment: 'Muito robusto e o acabamento em titânio fica excelente com trajes sociais.' }
    ]
  },
  {
    id: 'auracharge-core',
    name: 'AuraCharge Core GaN',
    category: 'Acessórios',
    price: 89.00,
    rating: 4.6,
    reviewsCount: 154,
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=AuraCharge',
    description: 'Estação de carregamento rápido ultra-compacta baseada em Nitreto de Gálio (GaN) com potência total combinada de 140W de distribuição reativa.',
    specs: {
      'Tecnologia': 'GaN Prime 3ª Geração',
      'Potência': '140W Máximo',
      'Portas': '3x USB-C (Power Delivery 3.1) + 1x USB-A',
      'Proteção': 'AuraSafe Reativo contra sobrecargas',
      'Compatibilidade': 'Universal (MacBook, iPhone, Android, Nintendo Switch)'
    },
    reviews: [
      { id: 1, author: 'Juliana P.', rating: 5, comment: 'Substituiu todos os meus outros blocos de carregamento em viagens. Muito compacto!' }
    ]
  }
];
