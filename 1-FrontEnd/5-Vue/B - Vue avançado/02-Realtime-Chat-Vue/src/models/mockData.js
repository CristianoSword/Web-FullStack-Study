/**
 * AuraChat Mock Data & Models
 */

export const INITIAL_CHANNELS = [
  { id: 'general', name: 'geral', icon: '💬', description: 'Canal geral para conversas informais.' },
  { id: 'projects', name: 'projetos', icon: '🚀', description: 'Discussões de desenvolvimento e entregas.' },
  { id: 'announcements', name: 'anuncios', icon: '📢', description: 'Comunicados e avisos oficiais.' },
  { id: 'coffee', name: 'cafezinho', icon: '☕', description: 'Memes, café e papo furado.' }
];

export const MOCK_BOTS = {
  jarvis: {
    id: 'bot_jarvis',
    name: 'Jarvis',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jarvis',
    isBot: true,
    greeting: 'Olá! Sou o Jarvis, seu assistente pessoal de produtividade. Como posso ajudar você hoje?'
  },
  support: {
    id: 'bot_support',
    name: 'Suporte-Bot',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Support',
    isBot: true,
    greeting: 'Olá! Sou o Suporte-Bot. Estou aqui para responder dúvidas sobre a plataforma e problemas técnicos.'
  },
  gamer: {
    id: 'bot_gamer',
    name: 'GamerBot',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gamer',
    isBot: true,
    greeting: 'E aí! Sou o GamerBot. Quer saber as notícias dos últimos jogos ou tirar um X1?'
  }
};

export const INITIAL_MESSAGES = {
  general: [
    {
      id: 1,
      sender: { name: 'Ana Silva', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ana', isBot: false },
      text: 'Olá pessoal! Bem-vindos ao AuraChat! Sintam-se livres para criar canais e testar a reatividade.',
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      sender: { name: 'Carlos Santos', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Carlos', isBot: false },
      text: 'Sensacional esse novo chat! O tema dark está lindíssimo.',
      timestamp: '10:02 AM'
    }
  ],
  projects: [
    {
      id: 1,
      sender: { name: 'Ana Silva', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ana', isBot: false },
      text: 'Cristiano, terminamos a auditoria do SaaS Dashboard. O build está 100% livre de erros.',
      timestamp: '09:30 AM'
    },
    {
      id: 2,
      sender: { name: 'Jarvis', avatar: MOCK_BOTS.jarvis.avatar, isBot: true },
      text: 'Relatório compilado com sucesso. Status atual: Integrado e Estável. 📊',
      timestamp: '09:31 AM'
    }
  ],
  announcements: [
    {
      id: 1,
      sender: { name: 'Diretoria AuraSaaS', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Board', isBot: false },
      text: 'Atenção todos! Hoje teremos nossa demonstração ao vivo da nova release da trilha FullStack.',
      timestamp: '08:00 AM'
    }
  ],
  coffee: [
    {
      id: 1,
      sender: { name: 'Carlos Santos', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Carlos', isBot: false },
      text: 'Alguém disse CAFÉ? ☕ Já estou na minha terceira xícara.',
      timestamp: '10:15 AM'
    }
  ]
};
