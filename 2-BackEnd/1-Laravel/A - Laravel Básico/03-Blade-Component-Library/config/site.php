<?php

return [
    'meta' => [
        'name' => 'Studio Aurora',
        'tagline' => 'Experiencias digitais claras para marcas que precisam escalar com consistencia.',
        'hero_title' => 'Componentes Blade para apresentar servicos, resultados e captacao de leads.',
        'hero_copy' => 'Uma base enxuta para sites institucionais em Laravel, com secoes reutilizaveis e conteudo centralizado.',
        'cta_primary' => 'Solicitar proposta',
        'cta_secondary' => 'Ver servicos',
    ],
    'navigation' => [
        [
            'label' => 'Inicio',
            'route_name' => 'site.home',
            'href' => '/',
            'primary' => false,
        ],
        [
            'label' => 'Servicos',
            'route_name' => 'site.services',
            'href' => '/servicos',
            'primary' => false,
        ],
        [
            'label' => 'Contato',
            'route_name' => 'site.contact',
            'href' => '/contato',
            'primary' => true,
        ],
    ],
    'services' => [
        [
            'title' => 'Landing pages orientadas a conversao',
            'description' => 'Paginas com narrativa objetiva, SEO tecnico e chamadas para acao alinhadas ao funil.',
            'highlight' => 'Entrega rapida para campanhas e lancamentos.',
            'bullets' => [
                'Hero section com CTA principal e secundario',
                'Prova social com metricas e depoimentos',
                'Secoes reusaveis com componentes Blade',
            ],
        ],
        [
            'title' => 'Design system editorial',
            'description' => 'Biblioteca de componentes para manter paginas institucionais consistentes entre equipes.',
            'highlight' => 'Padrao visual unico para novas paginas.',
            'bullets' => [
                'Cards de servico e estatistica',
                'Blocos reutilizaveis para FAQ e beneficios',
                'Tokens simples para tipografia e cores',
            ],
        ],
        [
            'title' => 'Fluxo de captacao comercial',
            'description' => 'Formulario de interesse com validacao e persistencia simples para leads internos.',
            'highlight' => 'Preparado para evoluir para CRM ou email transacional.',
            'bullets' => [
                'Campos focados em qualificacao',
                'Tratamento de erros por request',
                'Armazenamento local inicial para estudos',
            ],
        ],
    ],
    'metrics' => [
        [
            'value' => '42%',
            'label' => 'media de ganho em conversao',
            'description' => 'Projetos que reorganizaram paginas institucionais com foco em clareza de oferta.',
        ],
        [
            'value' => '7 dias',
            'label' => 'para publicar um microsite',
            'description' => 'Estrutura pronta para acelerar criacao de paginas de campanha.',
        ],
        [
            'value' => '100%',
            'label' => 'conteudo centralizado',
            'description' => 'Dados do site mantidos em um unico ponto para reduzir retrabalho.',
        ],
    ],
    'testimonials' => [
        [
            'quote' => 'Conseguimos padronizar tres paginas de produto sem duplicar codigo nem perder identidade.',
            'author' => 'Marina Tavares',
            'role' => 'Head de Marketing, Pixel Norte',
        ],
        [
            'quote' => 'O formulario ficou simples para o usuario e util de verdade para o time comercial.',
            'author' => 'Rafael Costa',
            'role' => 'Sales Ops, Nova Linha',
        ],
    ],
    'contact_channels' => [
        [
            'label' => 'Email',
            'value' => 'contato@studioaurora.test',
            'href' => 'mailto:contato@studioaurora.test',
            'availability' => 'Resposta em ate 1 dia util',
        ],
        [
            'label' => 'WhatsApp',
            'value' => '+55 11 4000-2026',
            'href' => 'https://wa.me/551140002026',
            'availability' => 'Seg a sex, 9h as 18h',
        ],
    ],
];
