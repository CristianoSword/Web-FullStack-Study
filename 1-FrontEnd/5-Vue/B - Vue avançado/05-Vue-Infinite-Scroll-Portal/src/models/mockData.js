/**
 * AuraFeed Articles Paged Mock Data
 */

export const MOCK_PAGES = {
  1: [
    {
      id: 'vue3-composition-api',
      category: 'Tecnologia',
      title: 'Dominando Reatividade Avançada no Vue 3',
      summary: 'Explore como o motor do Composition API lida com tracking de dependências reativas e aprenda a otimizar sua aplicação.',
      content: 'A reatividade do Vue 3 baseia-se em Proxies do ES6. Ao acessar propriedades reativas, o Vue registra o getter atual na lista de dependências daquele efeito. Quando os valores mudam, o setter aciona re-renderizações direcionadas apenas nos nós alterados do DOM Virtual. Dominar APIs como customRef, markRaw e shallowRef permite modularizar lógicas complexas sem abrir mão de performance sob cargas intensas de dados reativos.',
      author: 'Cristiano Sword',
      readTime: '6 min read',
      date: '21 Mai, 2026'
    },
    {
      id: 'glassmorphism-ux-2026',
      category: 'Design',
      title: 'A Evolução do Glassmorphism no Design de UI',
      summary: 'Como efeitos de desfoque de fundo combinados com sombras suaves HSL criam profundidade em painéis modernos.',
      content: 'O Glassmorphism amadureceu de uma tendência puramente decorativa para uma ferramenta funcional de UI. Ao utilizar filtros de desfoque reativos e bordas translúcidas de contraste, conseguimos criar camadas de informação tridimensionais sem poluir a visão do usuário. A chave é manter uma opacidade baixa (entre 5% e 15%) em fundos escuros para preservar a legibilidade e evitar fadiga visual.',
      author: 'Helena Ribeiro',
      readTime: '4 min read',
      date: '19 Mai, 2026'
    }
  ],
  2: [
    {
      id: 'pinia-vs-vuex-architecture',
      category: 'Tecnologia',
      title: 'Pinia: Arquitetura Modular de Stores Limpas',
      summary: 'Analise por que a abolição das mutações síncronas reduziu o boilerplate de código e acelerou o autocompletion.',
      content: 'O Pinia tornou-se o gerenciador de estado oficial do ecossistema Vue por sua simplicidade. Ao eliminar o conceito rígido de Mutations e abraçar Actions reativas que suportam fluxos assíncronos nativos, o Pinia simplificou o fluxo de dados. Ele oferece suporte nativo total ao TypeScript, garantindo autocompletion impecável durante o desenvolvimento de sistemas modulares robustos.',
      author: 'Lucas Mendes',
      readTime: '5 min read',
      date: '15 Mai, 2026'
    },
    {
      id: 'solopreneurship-saas',
      category: 'Negócios',
      title: 'Construindo Micro-SaaS Sustentáveis em 2026',
      summary: 'Descubra como pequenos times geram receitas recorrentes focando em problemas de nicho super-específicos.',
      content: 'Desenvolvedores solopreneurs estão redefinindo o ecossistema de startups. Em vez de buscar venture capital para crescer de forma insustentável, focam em criar soluções focadas em nichos corporativos de alta demanda. A estratégia vencedora envolve MVP ágil, design altamente polido e APIs integradas que poupam tempo operacional para o cliente final.',
      author: 'Fernando Kobayashi',
      readTime: '7 min read',
      date: '12 Mai, 2026'
    }
  ],
  3: [
    {
      id: 'future-webgpu-standard',
      category: 'Futuro',
      title: 'A Revolução do WebGPU nos Navegadores Modernos',
      summary: 'Como o sucessor do WebGL desbloqueia poder de processamento gráfico de baixo nível diretamente na Web.',
      content: 'O padrão WebGPU oferece acesso direto ao hardware de vídeo (Metal, Vulkan, Direct3D 12) sem passar pelo gargalo clássico da CPU do WebGL antigo. Isso permite renderização complexa de modelos 3D volumétricos, animações de fluidos de alta densidade e treinamento local de redes neurais e IA diretamente no browser a 60 frames por segundo estáveis.',
      author: 'Juliana Pinho',
      readTime: '8 min read',
      date: '08 Mai, 2026'
    },
    {
      id: 'teleport-modal-advanced',
      category: 'Tecnologia',
      title: 'Padrões Limpos com Vue Teleport',
      summary: 'Evite conflitos de empilhamento de z-index transportando modais contextuais para a raiz do documento.',
      content: 'O elemento Teleport do Vue 3 resolve de vez o clássico pesadelo CSS de hierarquia de z-index e layouts de contêiner com overflow: hidden. Ao projetar componentes de diálogo dentro da lógica de seu componente-pai, mas renderizando o HTML fisicamente fora do contêiner principal, mantemos o encapsulamento de estado intacto e garantimos acessibilidade perfeita.',
      author: 'Aura-Bot',
      readTime: '3 min read',
      date: '05 Mai, 2026'
    }
  ]
};
