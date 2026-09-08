'use strict';
// Ordem comercial para desempates. Intenções explícitas continuam determinantes.
const SERVICES = [
  {
    id: 'software', name: 'Sistemas Autorais e Software Sob Demanda', category: 'Software', card_name: 'Sistemas Autorais e Sob Demanda',
    description: 'Sistemas próprios, dados e regras do negócio.',
    scope: ['Arquitetura de sistemas proprietários', 'Desenvolvimento sob demanda, painéis e APIs', 'Regras de negócio, dados e integrações'],
    intents: ['tecnologia', 'sistema autoral', 'sistema proprietário', 'software proprietário', 'software sob demanda', 'software sob medida', 'sistema travando', 'substituir planilhas', 'erp próprio', 'painel de controle', 'aplicativo web', 'software legado', 'criar app', 'app', 'aplicativo', 'desenvolver aplicativo', 'sistema de gestão', 'preciso de um sistema', 'planilhas manuais', 'software personalizado', 'api'],
    related_ids: ['automation', 'sites']
  },
  {
    id: 'automation', name: 'Automação e Integrações', category: 'Automação', card_name: 'Automação e Integrações',
    description: 'Dados e rotinas entre sistemas e ferramentas.',
    scope: ['Mapeamento de processos e rotinas', 'Integração de sistemas, APIs e webhooks', 'Fluxos de dados e tratamento de falhas'],
    intents: ['planilha', 'planilhas', 'controlo tudo em planilha', 'automatizar processos', 'automatizar atendimento', 'integrar sistemas', 'integração de api', 'integrações apis', 'disparos automáticos', 'integração whatsapp', 'sincronizar dados', 'eliminar trabalho manual', 'fluxo de atendimento', 'webhook', 'conectar ferramentas', 'reduzir tarefas repetitivas', 'integrar crm'],
    related_ids: ['software', 'sites']
  },
  {
    id: 'support', name: 'Responda todas as suas redes em um único ambiente.', category: 'Atendimento centralizado', card_name: 'Responda todas as suas redes em um único ambiente.',
    description: 'WhatsApp, Instagram e e-mail com caixa de entrada unificada, histórico de conversas e distribuição entre atendentes.',
    scope: ['WhatsApp, Instagram e e-mail em um ambiente proprietário', 'Caixa de entrada unificada, histórico e responsáveis', 'Fluxos de atendimento conectados aos sistemas da empresa'],
    priority_terms: ['atendimento', 'atendimentos', 'atender', 'atendente', 'atendentes', 'atendendo', 'mensagem', 'mensagens', 'mensageria', 'conversa', 'conversas', 'whatsapp', 'whats', 'wpp', 'zap', 'email', 'inbox', 'omnichannel', 'multicanal', 'multicanais', 'helpdesk', 'sac', 'chat', 'chatbot', 'chatbots', 'direct', 'directs', 'dm', 'dms'],
    intents: ['centralizar atendimento', 'centralizar mensagens', 'atendimento centralizado', 'ambiente proprietário de atendimento', 'interface única de atendimento', 'atendimento ao cliente', 'atendimento ao consumidor', 'atendimento comercial', 'suporte ao cliente', 'central de suporte', 'caixa de entrada única', 'todos os canais em uma tela', 'unificar canais', 'mensagens espalhadas', 'perco mensagens', 'histórico de conversas', 'organizar fila de atendimento', 'distribuir conversas entre atendentes', 'responder clientes', 'integrar whatsapp instagram e email', 'não quero alternar entre aplicativos', 'central de relacionamento'],
    related_ids: ['software', 'automation']
  },
  {
    id: 'sites', name: 'Sites e Landing page', category: 'Sites e Landing page', card_name: 'Sites e Landing page',
    description: 'Páginas, interfaces e conteúdo da empresa.',
    scope: ['Sites institucionais e landing pages', 'Interfaces web, portais e áreas de clientes', 'Integração com sistemas e formulários'],
    intents: ['criar site novo', 'reformular página', 'landing page de alta conversão', 'página rápida', 'catálogo online', 'portal de clientes', 'site fora do ar', 'site mobile', 'preciso vender mais', 'captar clientes', 'apresentar a empresa', 'criar site', 'criar loja virtual', 'ecommerce', 'e-commerce', 'vender online', 'site antigo', 'landing page', 'site responsivo', 'portal web'],
    related_ids: ['software', 'seo']
  },
  {
    id: 'branding', name: 'Marca e Branding', category: 'Branding', card_name: 'Marca e Branding',
    description: 'Posicionamento, identidade e campanhas da marca.',
    scope: ['Estratégia e posicionamento de marca', 'Identidade visual e linguagem institucional', 'Planejamento de campanhas, conteúdo e distribuição'],
    intents: ['marketing', 'marketing digital', 'marca', 'branding', 'construção de marca', 'posicionamento de marca', 'identidade visual', 'criar marca', 'reposicionar marca', 'estratégia de marketing', 'comunicação institucional', 'visibilidade de marca'],
    related_ids: ['sites', 'social']
  },
  {
    id: 'seo', name: 'GEO & SEO (Buscas de IA e Google)', category: 'GEO', card_name: 'GEO & SEO',
    description: 'Conteúdo e dados para buscas de IA e Google.',
    scope: ['GEO: estrutura de conteúdo para buscas de IA', 'Organização semântica e dados estruturados', 'SEO: rastreamento, indexação e monitoramento'],
    intents: ['geo', 'seo', 'buscas de ia', 'ser encontrado por ia', 'busca generativa', 'otimização semântica', 'aparecer no google', 'tráfego orgânico', 'melhorar ranking', 'autoridade digital', 'otimização de seo', 'meu site não aparece', 'otimizar seo', 'poucas visitas', 'buscadores', 'posicionamento google', 'citado por ia'],
    related_ids: ['sites', 'branding']
  },
  {
    id: 'social', name: 'Conteúdo e Redes Sociais', category: 'Redes sociais', card_name: 'Conteúdo e Redes Sociais',
    description: 'Conteúdo e calendário dos canais da marca.',
    scope: ['Planejamento editorial a partir do branding', 'Publicações e distribuição nos canais sociais', 'Acompanhamento de conteúdo e calendário'],
    intents: ['gerenciar redes sociais', 'rede social', 'publicar nas redes', 'planejar conteúdo', 'estratégia de conteúdo', 'linkedin', 'instagram', 'criar conteúdo', 'aumentar engajamento', 'conseguir seguidores', 'facebook', 'não tenho tempo para postar'],
    related_ids: ['branding', 'sites']
  }
];
const CUSTOM_SERVICE = {
  id: 'custom', name: 'Projeto Personalizado', category: 'Sob demanda',
  description: 'Requisitos e etapas do projeto.',
  scope: ['Entendimento do problema e dos objetivos', 'Avaliação de viabilidade e alternativas técnicas', 'Definição de escopo e próximos passos'], related_ids: []
};

// Vocabulário por frente: produtos, tarefas e formas usuais de pedir ajuda.
// Nomes de plataformas indicam contexto da demanda, não vínculo comercial.
const SEARCH_VOCABULARY = {
  software: [
    'criação', 'criação de sistemas', 'criação de software', 'criação de aplicativos',
    'criação de apps', 'criação de plataformas', 'criação de ambientes proprietários',
    'desenvolvimento', 'programação', 'programar', 'desenvolvedor', 'engenharia de software',
    'sistemas sob medida', 'sistemas proprietários', 'sistemas autorais', 'sistema personalizado',
    'apps', 'aplicativos', 'aplicações', 'protótipos', 'dashboards', 'painel', 'painéis', 'relatórios',
    'frontend', 'front end', 'backend', 'back end', 'full stack',
    'plataforma', 'plataforma digital', 'produto digital', 'saas', 'mvp', 'protótipo',
    'aplicação', 'aplicação web', 'webapp', 'web app', 'aplicação mobile',
    'aplicativo android', 'aplicativo ios', 'aplicativo para celular', 'app de gestão',
    'erp', 'crm', 'intranet', 'extranet', 'painel administrativo', 'dashboard',
    'banco de dados', 'base de dados', 'relatórios gerenciais', 'gestão de estoque',
    'controle financeiro', 'controle de pedidos', 'gestão de clientes', 'gestão de contratos',
    'cadastro de clientes', 'controle de acesso', 'permissões de usuários', 'login',
    'sistema lento', 'corrigir bugs', 'corrigir erros', 'manutenção de software',
    'modernizar sistema legado', 'migrar sistema', 'refatoração', 'código fonte',
    'licenciamento de software', 'inteligência artificial', 'aplicação com ia'
  ],
  automation: [
    'criação de automação', 'criação de automações', 'criação de integração',
    'criação de integrações', 'criação de fluxos automáticos',
    'automatização', 'automatizações', 'automações', 'automatizar', 'automação de processos', 'automação comercial',
    'integração', 'integrações', 'integrar', 'conectar sistemas', 'conectar aplicativos',
    'api rest', 'rest api', 'webhooks', 'sincronização', 'sincronizar',
    'excel', 'google sheets', 'google planilhas', 'planilha de excel',
    'copiar e colar', 'digitar tudo de novo', 'trabalho repetitivo', 'retrabalho',
    'tarefas repetitivas', 'processo manual', 'processos manuais', 'rotinas manuais',
    'eliminar tarefas manuais', 'economizar tempo', 'reduzir custo operacional',
    'fluxo de trabalho', 'workflow', 'rpa', 'robô de atendimento', 'robôs', 'bots', 'chatbot', 'chatbots',
    'bot de whatsapp', 'whatsapp', 'whats app', 'whats', 'whatsapp business',
    'respostas automáticas', 'atendimento automático', 'agendamento automático',
    'notificações automáticas', 'envio automático', 'integrar pagamento',
    'integrar estoque', 'integrar pedidos', 'integrar erp', 'integrar whatsapp',
    'integrar chatgpt', 'integrar inteligência artificial', 'integrar email',
    'conectar crm', 'importar dados', 'exportar dados', 'migrar dados',
    'n8n', 'zapier', 'make', 'integromat'
  ],
  support: [
    'atendimentos separados', 'centralizar comunicação com clientes', 'plataforma de atendimento',
    'sistema de atendimento próprio', 'software de atendimento', 'crm de atendimento',
    'unificar whatsapp e instagram', 'unificar mensagens de email', 'central de mensagens',
    'responder direct do instagram', 'responder mensagens do facebook', 'atendimento por email',
    'atendimento via whatsapp', 'atendimento por instagram', 'atendimento em vários canais',
    'atendimento omnichannel', 'painel de conversas', 'inbox compartilhada', 'caixa compartilhada',
    'gestão de tickets', 'chamados de clientes', 'central de chamados', 'fila de chamados',
    'vários atendentes no mesmo número', 'controle de atendimentos', 'encaminhar mensagens',
    'organizar conversas de clientes', 'mensagens sem resposta', 'responder em uma única interface'
  ],
  sites: [
    'criação de sites', 'criação de páginas', 'criação de landing pages',
    'criação de portais', 'criação de lojas virtuais',
    'site', 'sites', 'website', 'web site', 'página web', 'páginas web',
    'página institucional', 'site institucional', 'presença na internet',
    'landing', 'landingpage', 'landing pages', 'landingpages',
    'página de vendas', 'página de captura', 'página de conversão', 'hotsite',
    'portal', 'portais', 'área do cliente', 'área de membros', 'portal institucional',
    'loja online', 'loja virtual', 'lojas virtuais', 'loja na internet', 'comércio eletrônico',
    'e commerce', 'ecomerce', 'catálogo digital', 'vitrine digital', 'vender pela internet',
    'gerar leads', 'captar leads', 'captação de clientes', 'conseguir clientes',
    'vendas online', 'preciso de mais vendas', 'receber orçamentos', 'página de orçamento',
    'portfólio', 'portfolio', 'blog', 'blogs', 'websites', 'wordpress', 'woocommerce', 'shopify',
    'wix', 'webflow', 'design de interface', 'webdesign', 'web design',
    'experiência do usuário', 'interface responsiva', 'responsividade',
    'domínio', 'dominio', 'hospedagem', 'site quebrado', 'página não abre',
    'página lenta', 'página não funciona no celular', 'reformular meu site'
  ],
  branding: [
    'criação de marcas', 'criação de logos', 'criação de logotipos',
    'criação de identidade visual', 'criação de branding',
    'brand', 'brand building', 'brand design', 'gestão de marca', 'estratégia de marca',
    'arquitetura de marca', 'propósito de marca', 'personalidade de marca',
    'naming', 'nome da empresa', 'nome para empresa', 'nome da marca',
    'rebranding', 'redesign de marca', 'reposicionamento', 'reformular marca',
    'logo', 'logos', 'logotipo', 'logotipos', 'logomarca', 'logomarcas', 'criar logo', 'redesenhar logo',
    'identidade', 'identidade da empresa', 'identidade corporativa', 'identidade de marca',
    'manual de marca', 'brandbook', 'brand book', 'guia de marca',
    'tom de voz', 'linguagem da marca', 'narrativa de marca', 'storytelling',
    'slogan', 'tagline', 'paleta de cores', 'tipografia da marca',
    'comunicação de marca', 'percepção de marca', 'diferenciação de marca',
    'posicionamento estratégico', 'consultoria de marketing', 'planejamento de marketing',
    'estratégia comercial', 'divulgação da empresa', 'apresentação institucional',
    'marketing institucional', 'identidade para redes sociais'
  ],
  seo: [
    'criação de conteúdo para GEO', 'criação de conteúdo para SEO',
    'generative engine optimization', 'search engine optimization', 'otimização para ia',
    'otimização para buscadores', 'otimização de busca', 'busca por inteligência artificial',
    'motores de resposta', 'mecanismos generativos', 'respostas de ia',
    'aparecer nas respostas de ia', 'ser citado por ia', 'ser recomendado pela ia',
    'chatgpt', 'chat gpt', 'perplexity', 'gemini', 'copilot',
    'google', 'bing', 'busca orgânica', 'pesquisa orgânica', 'resultados de busca',
    'posicionamento nos buscadores', 'ranking', 'ranqueamento', 'rankeamento',
    'indexação', 'indexar', 'rastreamento', 'robots', 'sitemap',
    'dados estruturados', 'schema', 'schema org', 'json ld', 'conteúdo semântico',
    'palavras chave', 'palavra chave', 'keywords', 'autoridade no google',
    'conteúdo para buscadores', 'ser encontrado na internet', 'visibilidade orgânica',
    'mais visitas orgânicas', 'tráfego orgânico qualificado', 'auditoria de seo',
    'search console', 'google meu negócio', 'google business profile', 'busca local'
  ],
  social: [
    'criação de conteúdo', 'criação de posts', 'criação para redes sociais',
    'criação para instagram', 'criação para tiktok', 'criação de vídeos',
    'tiktok', 'tik tok', 'tik-tok', 'tik tok para empresas',
    'instagram', 'insta', 'instagran', 'intagram', 'facebook', 'face book',
    'linkedin', 'linked in', 'linked-in', 'youtube', 'you tube', 'youtube shorts',
    'pinterest', 'threads', 'twitter', 'twitter x', 'kwai',
    'redes', 'redes sociais', 'mídias sociais', 'midias sociais', 'social media',
    'gestão de redes sociais', 'gerenciamento de redes sociais',
    'administrar instagram', 'cuidar do instagram', 'gerenciar tiktok',
    'perfil comercial', 'perfil profissional', 'perfil da empresa',
    'posts', 'postagens', 'postar', 'publicações', 'reels', 'reel',
    'stories', 'story', 'storys', 'feed', 'carrossel', 'carrosséis',
    'vídeos curtos', 'vídeos para tiktok', 'conteúdo para instagram',
    'calendário editorial', 'calendário de publicações', 'calendário de posts',
    'planejamento de posts', 'produção de conteúdo', 'conteúdo social',
    'engajamento', 'seguidores', 'comunidade nas redes', 'distribuição de conteúdo',
    'frequência de postagem', 'publicar com frequência', 'legendas para posts'
  ]
};
// Índice editorial por setor e assunto. Novos termos entram no grupo correspondente.
const SECTOR_VOCABULARY = {
  software: {
    produtos: ['sistema', 'sistemas', 'software', 'aplicativo', 'plataforma proprietária', 'sistema interno', 'sistema empresarial'],
    operacao: ['gestão de pedidos', 'gestão financeira', 'gestão de estoque', 'ordens de serviço', 'controle de produção', 'gestão de documentos'],
    engenharia: ['desenvolvimento de software', 'arquitetura de software', 'manutenção de sistemas', 'migração de sistemas', 'autenticação', 'permissões', 'banco de dados']
  },
  automation: {
    rotinas: ['automação', 'automacoes', 'rotina automática', 'tarefas manuais', 'processos repetitivos', 'planilha', 'planilhas'],
    conexoes: ['integração', 'integracoes', 'sincronização de dados', 'conectar plataformas', 'conector', 'conectores', 'importação de dados', 'exportação de dados'],
    fluxos: ['fluxo automático', 'fluxo de aprovação', 'agendamento de tarefas', 'automatizar relatórios', 'automação de marketing', 'automatizar campanhas']
  },
  support: {
    atendimento: ['atendimento', 'mensagens', 'central de atendimento', 'caixa de entrada', 'caixa unificada', 'histórico de atendimento'],
    canais: ['whatsapp', 'instagram direct', 'mensagens de email', 'mensagens do facebook', 'atendimento multicanal'],
    operacao: ['triagem de atendimento', 'transferência de atendimento', 'distribuição de mensagens', 'fila de atendimento', 'protocolo de atendimento']
  },
  sites: {
    paginas: ['site', 'portal', 'landing page', 'página de campanha', 'site de campanha', 'landing page para campanha', 'site de lançamento', 'página de produto'],
    comercio: ['ecommerce', 'e-commerce', 'catálogo de produtos', 'catálogo virtual', 'vitrine online', 'loja virtual'],
    interfaces: ['interface web', 'formulário online', 'formulário de inscrição', 'página de cadastro', 'redesign de site', 'acessibilidade web']
  },
  branding: {
    estrategia: ['marketing', 'estratégia', 'planejamento de campanha', 'planejamento de marketing', 'plano de marketing', 'público alvo', 'persona', 'pesquisa de mercado', 'posicionamento', 'proposta de valor'],
    campanhas: ['campanha', 'campanhas', 'campanha publicitária', 'campanha institucional', 'campanha de lançamento', 'campanha promocional', 'campanha de vendas', 'campanha de marketing', 'campanha digital', 'criação de campanha', 'lançamento', 'lançamento de produto', 'promoção', 'promocoes'],
    publicidade: ['publicidade', 'propaganda', 'anúncio', 'anúncios', 'anuncio', 'anuncios', 'anunciar', 'mídia paga', 'tráfego pago', 'gestão de tráfego', 'impulsionamento', 'impulsionar', 'ads', 'google ads', 'meta ads', 'facebook ads', 'instagram ads', 'tiktok ads', 'campanha no google', 'campanha no instagram', 'campanha no facebook', 'campanha no tiktok', 'anúncios no google', 'anúncios no instagram'],
    marca: ['marca', 'branding', 'identidade visual', 'identidade verbal', 'conceito criativo', 'direção de arte', 'design gráfico', 'peças publicitárias', 'criativos', 'copywriting', 'copy', 'reputação da marca', 'rebranding', 'naming']
  },
  seo: {
    generativa: ['geo', 'busca generativa', 'buscas de ia', 'respostas de inteligência artificial', 'citações em ia', 'otimização generativa'],
    organica: ['seo', 'busca orgânica', 'tráfego orgânico', 'posicionamento orgânico', 'conteúdo para google', 'otimização de conteúdo', 'auditoria técnica de seo'],
    estrutura: ['indexação', 'dados estruturados', 'marcação semântica', 'arquitetura da informação', 'sitemap', 'metadados', 'metadescrição']
  },
  social: {
    canais: ['instagram', 'facebook', 'tiktok', 'linkedin', 'youtube', 'pinterest'],
    conteudo: ['conteúdo', 'conteúdos', 'post', 'posts', 'publicação', 'publicações', 'postagem', 'postagens', 'reels', 'stories', 'carrossel', 'roteiro de vídeo', 'conteúdo para campanha', 'posts para campanha'],
    distribuicao: ['calendário de conteúdo', 'calendário editorial', 'gestão de comunidade', 'social media', 'planejamento de conteúdo', 'distribuição de conteúdo']
  }
};
SERVICES.forEach(service => {
  service.intents = [...new Set([...service.intents, ...(service.priority_terms || []), ...SEARCH_VOCABULARY[service.id], ...Object.values(SECTOR_VOCABULARY[service.id]).flat()])];
});

    // Dados institucionais. Preencha CNPJ, cidade e legendas quando disponíveis.
    const COMPANY = {
      brands: [{"client_name": "", "description": "", "name": "Banco do Brasil", "width": 998, "height": 991, "src": "assets/brand-9b5f426deb33.svg"}, {"client_name": "", "description": "", "name": "Chilli Beans", "width": 1000, "height": 541, "src": "assets/brand-4f4fb487fe30.svg"}, {"client_name": "", "description": "", "name": "Dell", "width": 1000, "height": 310, "src": "assets/brand-a58ebadc32e5.svg"}, {"client_name": "", "description": "", "name": "Fiat", "width": 1000, "height": 615, "src": "assets/brand-40c88c1094bf.svg"}, {"client_name": "", "description": "", "name": "Itaú", "width": 1000, "height": 1000, "src": "assets/brand-82db70303ae8.svg"}, {"client_name": "", "description": "", "name": "Jeep", "width": 1000, "height": 400, "src": "assets/brand-1a08d6ec441c.svg"}, {"client_name": "", "description": "", "name": "Natura", "width": 1000, "height": 751, "src": "assets/brand-495db4b93229.svg"}, {"client_name": "", "description": "", "name": "Vivo", "width": 1000, "height": 377, "src": "assets/brand-f5dad01e316a.svg"}], // EMBEDDED_BRANDS
      cnpj: '', city: '', whatsapp: '5571993081072',
      email: 'contato@somosluc.com.br'
    };
    const byId = new Map(SERVICES.map(service => [service.id, service]));


const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
const STOP_WORDS = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'um', 'uma', 'para', 'por', 'com', 'meu', 'minha', 'eu', 'quero', 'preciso', 'ter']);
const searchIndex = SERVICES.map(service => ({
  service,
  names: [service.name, service.card_name, service.category].filter(Boolean),
  intents: service.intents,
  intentWords: [...new Set(service.intents.flatMap(term => normalize(term).split(' ')))]
}));
// Construído uma vez: cada prefixo de palavra aponta para os setores que o atendem.
const sectorWordIndex = new Map();
searchIndex.forEach(entry => {
  const words = new Set([...entry.names, ...entry.intents].flatMap(term => normalize(term).split(' ')));
  words.forEach(word => {
    if (STOP_WORDS.has(word)) return;
    for (let length = 1; length <= word.length; length++) {
      const prefix = word.slice(0, length);
      if (!sectorWordIndex.has(prefix)) sectorWordIndex.set(prefix, new Set());
      sectorWordIndex.get(prefix).add(entry.service.id);
    }
  });
});
function searchCandidates(query) {
  const ids = new Set(query.split(' ').filter(token => !STOP_WORDS.has(token)).flatMap(token => [...(sectorWordIndex.get(token) || [])]));
  return searchIndex.filter(entry => ids.has(entry.service.id));
}
const GENERIC_ACTIONS = new Set(['criacao', 'criar', 'desenvolvimento', 'desenvolver', 'fazer', 'montar']);
// Todo prefixo começa em uma palavra. Não há busca por substring interna.
function scoreTerm(value, query) {
  const field = normalize(value), words = field.split(' ');
  const tokens = query.split(' ').filter(token => !STOP_WORDS.has(token));
  if (!tokens.length) return 0;
  if (field === query) return 1000;
  if (field.startsWith(query)) return 800 + query.length / field.length;
  return scoreTokens(words, tokens);
}
function scoreTokens(words, tokens) {
  const matched = tokens.filter(token => words.some(word => word.startsWith(token)));
  if (!matched.length) return 0;
  const exact = matched.filter(token => words.includes(token)).length;
  // Em pedidos compostos, o assunto pesa mais do que verbos genéricos como criar.
  const weight = token => tokens.length > 1 && GENERIC_ACTIONS.has(token) ? .2 : 1;
  return matched.reduce((sum, token) => sum + weight(token), 0) / tokens.reduce((sum, token) => sum + weight(token), 0) * 100 + exact * 10;
}
function bestMatch(terms, query) {
  return terms.map(term => ({ term, score: scoreTerm(term, query) })).sort((a, b) => b.score - a.score)[0];
}
function bestSectorMatch(entry, query) {
  const best = bestMatch(entry.intents, query) || { term: '', score: 0 };
  const tokens = query.split(' ').filter(token => !STOP_WORDS.has(token));
  // Palavras de assuntos diferentes do mesmo setor também podem se complementar.
  return { term: best.term, score: Math.max(best.score, scoreTokens(entry.intentWords, tokens)) };
}
function bestNameMatch(terms, query) {
  const tokens = query.split(' ').filter(token => !STOP_WORDS.has(token));
  const completeNames = terms.filter(term => {
    const words = normalize(term).split(' ');
    return tokens.length && tokens.every(token => words.some(word => word.startsWith(token)));
  });
  return bestMatch(completeNames, query) || { term: '', score: 0 };
}

// Endpoint público recebe apenas eventos de contagem. Nenhuma credencial no HTML.
const SEARCH_ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwXgem4c0Wkv-S5CweNEzegCMUn_a0_dhaK4vM6lrUOtEXKO3Fz-CwS7nBzSwlH_p0dgQ/exec';
const SearchAnalytics = (() => {
  const aliases = {'tik tok':'tiktok','face book':'facebook','linked in':'linkedin','you tube':'youtube','chat gpt':'chatgpt','whats app':'whatsapp','instagran':'instagram','intagram':'instagram','e commerce':'ecommerce'};
  function canonical(raw) {
    if (typeof raw !== 'string' || raw.trim().length > 120 || /@|https?:|www\./i.test(raw) || raw.replace(/\D/g,'').length >= 7) return null;
    const term = raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    return term.length >= 3 && !/\b(senha|password|cpf|cnpj)\b/.test(term) ? (aliases[term] || term) : null;
  }
  async function send(event) {
    if (!SEARCH_ANALYTICS_ENDPOINT) return false;
    for (const delay of [0,1000,3000]) {
      if (delay) await new Promise(resolve => setTimeout(resolve,delay));
      try {
        const response = await fetch(SEARCH_ANALYTICS_ENDPOINT, {
          method:'POST', mode:'cors', credentials:'omit', redirect:'follow',
          headers:{'Content-Type':'text/plain;charset=UTF-8'},
          body:JSON.stringify(event), signal:AbortSignal.timeout(15000)
        });
        if (!response.ok) continue;
        const result = await response.json();
        if (result.ok) return true;
        if (!['busy','unavailable','missing_search'].includes(result.error)) return false;
      } catch { /* A indisponibilidade da contagem não interrompe a busca. */ }
    }
    return false;
  }
  function confirm(raw, service) {
    const term = canonical(raw);
    if (!term || !SEARCH_ANALYTICS_ENDPOINT || !globalThis.crypto?.randomUUID) return null;
    const matched = ['software','automation','support','sites','branding','seo','social'].includes(service?.id);
    const event = {id:crypto.randomUUID(),action:'confirm',term,matched,service_id:matched ? service.id : null,created_at:Date.now()};
    const ticket = {event,confirmed:send(event),converted:false};
    return ticket;
  }
  async function contact(ticket) {
    if (!ticket || ticket.converted) return;
    ticket.converted = true;
    if (await ticket.confirmed) await send({...ticket.event,action:'contact'});
  }
  return {canonical,confirm,contact};
})();

// Contatos comerciais usam um receptor separado da contagem de pesquisas.
const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyWKZT2C9OB0r_PVm5gpXtUp2uUIAJupB7f3hqzKwvX26mOUcXtq4gixX3EGaMQ2Ols/exec';
const ContactClient = (() => {
  function createRequest(payload, formKind) {
    const body = {
      contract: 'luc-contact-v1', request_id: crypto.randomUUID(), form_kind: formKind,
      nome: payload.client_name, telefone: payload.client_phone,
      email: payload.client_email || '', empresa: '', lgpd: payload.privacy_acknowledged ? 'on' : '',
      servico: payload.service_name || 'Contato direto pelo site LUC',
      service_id: payload.service_id || '',
      mensagem: [payload.search_term ? 'Pesquisa: ' + payload.search_term : '',
        payload.related_services?.length ? 'Serviços complementares: ' + payload.related_services.map(item => item.name).join('; ') : ''].filter(Boolean).join('\n'),
      timestamp: new Date().toISOString(), website: payload.website || ''
    };
    return { body, signature: JSON.stringify({ payload, formKind }) };
  }
  async function submit(request) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(request.body), signal: controller.signal
      });
      if (!response.ok || response.type === 'opaque') throw Error('unconfirmed');
      const result = await response.json();
      if (result.ok !== true || result.status !== 'received' || result.receipt !== request.body.request_id) {
        throw Error(['invalid_fields', 'invalid_consent', 'invalid_name', 'invalid_phone', 'invalid_email', 'invalid_service', 'rate_limit', 'conflict'].includes(result.error) ? result.error : 'unconfirmed');
      }
      return result;
    } finally { clearTimeout(timer); }
  }
  return { createRequest, submit };
})();

// Busca e correspondência preservam os termos originais para exibição.
const $ = id => document.getElementById(id);
const ui = { search: $('search'), results: $('results'), hero: document.querySelector('.hero') };
const state = { suggestions: [], activeIndex: -1 };
let lastSearchTicket = null;
function textElement(tag, className, text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}
function debounce(callback, delay) {
  let timer;
  const delayed = (...args) => { clearTimeout(timer); timer = setTimeout(() => callback(...args), delay); };
  delayed.cancel = () => clearTimeout(timer);
  return delayed;
}
function matchTerm(term, query) {
  const words = term.split(/\s+/);
  const tokens = query.split(' ').filter(token => !STOP_WORDS.has(token));
  const first = words.findIndex(word => tokens.some(token => normalize(word).startsWith(token)));
  // A janela contém o trecho correspondente, com até quatro palavras.
  const start = Math.max(0, Math.min(first, words.length - 4));
  return words.slice(start, start + 4).join(' ');
}
function getSearchResponse(value, { confirmed = false } = {}) {
  const query = normalize(value);
  if ([...query].length < 3) return { mode: 'empty', suggestions: [] };
  const candidates = searchCandidates(query);
  const rank = field => candidates.map(entry => ({ service: entry.service, ...(field === 'names' ? bestNameMatch(entry.names, query) : bestSectorMatch(entry, query)) })).filter(entry => entry.score > 0).sort((a, b) => b.score - a.score);
  // O nome tem prioridade quando cobre a consulta, não apenas uma palavra isolada.
  const names = rank('names');
  // A intenção de atendimento prevalece sobre o canal ou outra tecnologia citada.
  const priorityQuery = query.replace(/\bchat gpt\b/g, 'chatgpt').replace(/\bwhats app\b/g, 'whatsapp').replace(/\be mail\b/g, 'email').replace(/\bhelp desk\b/g, 'helpdesk').replace(/\bomni channel\b/g, 'omnichannel');
  const priority = searchIndex.map(entry => ({ service: entry.service, ...bestMatch(entry.service.priority_terms || [], priorityQuery) })).find(entry => entry.score > 0);
  const primary = priority || (names.length ? names : rank('intents'))[0];
  if (primary?.score > 0) return {
    mode: 'matched', term: matchTerm(primary.term, query),
    suggestions: [primary.service, ...primary.service.related_ids.slice(0, 2).map(id => byId.get(id)).filter(Boolean)]
  };
  return confirmed ? { mode: 'custom', suggestions: [CUSTOM_SERVICE] } : { mode: 'empty', suggestions: [] };
}
function closeResults() {
  delayedSearch.cancel(); ui.results.hidden = true; state.activeIndex = -1;
  cancelAnimationFrame(positionFrame);
  ui.hero.classList.remove('search-open'); ui.hero.style.removeProperty('--hero-shift');
  ui.search.setAttribute('aria-expanded', 'false'); ui.search.removeAttribute('aria-activedescendant');
}
function positionResults() {
  if (ui.results.hidden) return;
  const anchor = $('search-area').getBoundingClientRect();
  const viewport = window.visualViewport;
  const topEdge = viewport?.offsetTop || 0, height = viewport?.height || innerHeight;
  ui.results.style.width = anchor.width + 'px'; ui.results.style.left = anchor.left + 'px';
  const below = Math.max(anchor.bottom, $('categories').getBoundingClientRect().bottom) + 8;
  const belowSpace = Math.max(0, topEdge + height - below - 12);
  ui.results.style.maxHeight = belowSpace + 'px';
  ui.results.style.top = below + 'px';
}
let positionFrame = 0;
function alignOpenResults() {
  if (ui.results.hidden) return;
  const baseTop = ui.hero.getBoundingClientRect().top - (parseFloat(getComputedStyle(ui.hero).top) || 0);
  const safeTop = Math.max(document.querySelector('.site-header').getBoundingClientRect().bottom + 12, (window.visualViewport?.offsetTop || 0) + 12);
  const lift = Math.min(80, Math.max(0, baseTop - safeTop));
  ui.hero.style.setProperty('--hero-shift', -lift + 'px');
  ui.hero.classList.add('search-open');
  cancelAnimationFrame(positionFrame);
  const started = performance.now();
  function follow() {
    positionResults();
    if (!ui.results.hidden && performance.now() - started < 180) positionFrame = requestAnimationFrame(follow);
  }
  follow();
}
function setActive(index) {
  state.activeIndex = index;
  [...ui.results.children].forEach((option, i) => option.setAttribute('aria-selected', String(i === index)));
  const option = ui.results.children[index];
  if (!option) { ui.search.removeAttribute('aria-activedescendant'); return; }
  ui.search.setAttribute('aria-activedescendant', option.id);
  if (option.offsetTop < ui.results.scrollTop) ui.results.scrollTop = option.offsetTop;
  else if (option.offsetTop + option.offsetHeight > ui.results.scrollTop + ui.results.clientHeight) ui.results.scrollTop = option.offsetTop + option.offsetHeight - ui.results.clientHeight;
}
function renderSuggestions() {
  const response = getSearchResponse(ui.search.value);
  state.suggestions = response.suggestions; state.activeIndex = -1;
  ui.results.replaceChildren(); ui.search.removeAttribute('aria-activedescendant');
  state.suggestions.forEach((service, index) => {
    const primary = index === 0;
    const option = textElement('div', 'result' + (primary ? ' primary' : ' complementary'));
    option.id = 'option-' + service.id; option.setAttribute('role', 'option'); option.setAttribute('aria-selected', 'false');
    if (index === 1) option.append(textElement('span', 'result-tag', 'Solução Complementar'));
    option.append(textElement('span', 'result-title', service.name));
    option.append(textElement('span', 'result-description', service.description));
    if (primary) option.append(textElement('span', 'result-match', response.term));
    option.addEventListener('pointerdown', event => { if (event.pointerType === 'mouse') event.preventDefault(); });
    option.addEventListener('pointermove', () => setActive(index));
    option.addEventListener('click', () => openService(service));
    ui.results.append(option);
  });
  ui.results.hidden = state.suggestions.length === 0;
  if (ui.results.hidden) closeResults(); else alignOpenResults();
  ui.search.setAttribute('aria-expanded', String(!ui.results.hidden));
  $('search-status').textContent = state.suggestions.length ? state.suggestions.length + ' opções. Use as setas e Enter para selecionar.' : '';
}
const delayedSearch = debounce(renderSuggestions, 150);
function syncSearchControls() {
  $('clear-search').hidden = !ui.search.value;
  document.querySelector('.search-submit').disabled = normalize(ui.search.value).length < 3;
  document.querySelectorAll('.chip').forEach(chip => chip.setAttribute('aria-pressed', String(normalize(chip.dataset.term) === normalize(ui.search.value))));
}
['software', 'automation', 'sites', 'seo'].map(id => byId.get(id)).forEach(service => {
  const chip = textElement('button', 'chip');
  chip.append(textElement('span', 'chip-label', service.category));
  if (service.id === 'sites') {
    chip.classList.add('sites-chip');
    chip.append(textElement('span', 'chip-short', 'Sites'));
  }
  chip.type = 'button'; chip.dataset.term = service.category; chip.setAttribute('aria-pressed', 'false');
  chip.addEventListener('click', () => {
    delayedSearch.cancel(); ui.search.value = chip.dataset.term; syncSearchControls();
    ui.search.focus({ preventScroll: true }); renderSuggestions();
  });
  $('categories').append(chip);
});
ui.search.addEventListener('input', event => {
  delayedSearch.cancel(); syncSearchControls(); $('search-status').textContent = '';
  // Opções antigas nunca ficam selecionáveis durante o debounce.
  state.suggestions = []; setActive(-1); ui.results.replaceChildren();
  ui.results.hidden = true; ui.search.setAttribute('aria-expanded', 'false');
  if (normalize(ui.search.value).length < 3) closeResults();
  if (!event.isComposing) delayedSearch();
});
ui.search.addEventListener('compositionend', () => delayedSearch());
ui.search.addEventListener('focus', () => { if (ui.search.value.trim()) renderSuggestions(); });
ui.search.addEventListener('keydown', event => {
  if (event.isComposing) return;
  if (event.key === 'Escape') { event.preventDefault(); closeResults(); }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault(); delayedSearch.cancel(); if (ui.results.hidden) renderSuggestions();
    const count = state.suggestions.length; if (!count) return;
    setActive(state.activeIndex < 0 ? (event.key === 'ArrowDown' ? 0 : count - 1) : (state.activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + count) % count);
  }
});
$('search-form').addEventListener('submit', event => {
  event.preventDefault(); delayedSearch.cancel();
  if (!ui.results.hidden && state.activeIndex >= 0) { openService(state.suggestions[state.activeIndex]); return; }
  const response = getSearchResponse(ui.search.value, { confirmed: true });
  if (response.suggestions.length) openService(response.suggestions[0]);
});
// A seta confirma a opção atual sem perder a seleção ao receber foco.
document.querySelector('.search-submit').addEventListener('pointerdown', event => {
  if (event.pointerType === 'mouse') event.preventDefault();
});
$('clear-search').addEventListener('click', () => {
  ui.search.value = ''; closeResults(); syncSearchControls(); $('search-status').textContent = ''; ui.search.focus();
});
function closeOutsideSearch(event) {
  if (!$('search-area').contains(event.target) && !$('categories').contains(event.target)) closeResults();
}
document.addEventListener('pointerdown', closeOutsideSearch);
document.addEventListener('focusin', closeOutsideSearch);
window.addEventListener('resize', alignOpenResults);
window.visualViewport?.addEventListener('resize', alignOpenResults);
window.visualViewport?.addEventListener('scroll', alignOpenResults);

// Um formulário, duas instâncias independentes. Dados permanecem apenas em memória.
const digitsOnly = value => value.replace(/\D/g, '');
function phoneDigits(value) {
  let digits = digitsOnly(value);
  if (digits.length === 13 && digits.startsWith('55')) digits = digits.slice(2);
  return digits.slice(0, 11);
}
function formatPhone(value) {
  const digits = phoneDigits(value);
  if (!digits) return '';
  if (digits.length <= 2) return '(' + digits;
  return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + (digits.length > 7 ? '-' + digits.slice(7) : '');
}
function bindPhoneMask(input) {
  function placeCursor(count) {
    let position = 0, seen = 0;
    while (position < input.value.length && seen < count) { if (/\d/.test(input.value[position])) seen++; position++; }
    input.setSelectionRange(position, position);
  }
  input.addEventListener('beforeinput', event => {
    const start = input.selectionStart, end = input.selectionEnd;
    if (start !== end || !['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
    const backward = event.inputType === 'deleteContentBackward', neighbor = input.value[backward ? start - 1 : start];
    if (!neighbor || /\d/.test(neighbor)) return;
    event.preventDefault();
    const preceding = digitsOnly(input.value.slice(0, start)).length, removeAt = backward ? preceding - 1 : preceding;
    const digits = digitsOnly(input.value).split('');
    if (removeAt >= 0) digits.splice(removeAt, 1);
    input.value = formatPhone(digits.join('')); placeCursor(Math.max(0, backward ? preceding - 1 : preceding));
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  input.addEventListener('input', () => {
    const original = input.value, caret = input.selectionStart, atEnd = caret === original.length;
    let count = digitsOnly(original.slice(0, caret)).length;
    if (digitsOnly(original).length === 13 && digitsOnly(original).startsWith('55')) count = Math.max(0, count - 2);
    input.value = formatPhone(original); placeCursor(atEnd ? phoneDigits(original).length : count);
  });
}
function isFullName(value) {
  const words = value.trim().split(/\s+/);
  return words.length >= 2 && words.every(word => /^\p{L}[\p{L}\p{M}]*(?:['’\-][\p{L}\p{M}]+)*$/u.test(word));
}
function isValidEmail(value) {
  const email = value.trim();
  if (email.length > 254) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
  const labels = domain.split('.');
  return labels.length >= 2 && labels.every(label => label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)) && /^[a-z]{2,}$/i.test(labels.at(-1));
}
function mountForm(slot, prefix, { fullContact = false } = {}) {
  const fragment = $('lead-form-template').content.cloneNode(true);
  if (fullContact) {
    const emailField = textElement('div', 'field');
    const label = textElement('label', '', 'E-mail'); label.dataset.label = 'email';
    const input = document.createElement('input');
    input.dataset.field = 'email'; input.name = 'client_email'; input.type = 'email';
    input.autocomplete = 'email'; input.maxLength = 254; input.required = true;
    const error = textElement('div', 'field-error'); error.dataset.error = 'email'; error.hidden = true;
    emailField.append(label, input, error);
    fragment.querySelector('[data-field="phone"]').closest('.field').before(emailField);
    const status = fragment.querySelector('[role="status"]');
    fragment.querySelector('button').before(status);
  }
  const privacyLink = textElement('a', '', 'Política de Privacidade');
  privacyLink.id = fullContact ? 'open-privacy' : 'open-service-privacy'; privacyLink.href = '#privacy-dialog';
  privacyLink.setAttribute('aria-haspopup', 'dialog'); privacyLink.setAttribute('aria-controls', 'privacy-dialog');
  fragment.querySelector('[data-label="consent"] span').replaceChildren(
    document.createTextNode('Autorizo o uso dos meus dados para contato conforme a '), privacyLink, document.createTextNode('.')
  );
  fragment.querySelectorAll('[data-field]').forEach(input => {
    const name = input.dataset.field;
    input.id = prefix + '-' + name;
    fragment.querySelector('[data-label="' + name + '"]').htmlFor = input.id;
    const error = fragment.querySelector('[data-error="' + name + '"]');
    error.id = input.id + '-error'; input.setAttribute('aria-describedby', error.id);
  });
  slot.append(fragment);
  const form = slot.querySelector('form'), confirmation = slot.querySelector('.form-confirmation');
  const name = form.elements.client_name, email = form.elements.client_email, phone = form.elements.client_phone, consent = form.elements.privacy_acknowledged;
  const fields = [name, email, phone, consent].filter(Boolean);
  const button = form.querySelector('button'), status = form.querySelector('[role="status"]');
  const ctaLabel = fullContact ? 'Entre em contato comigo' : 'Receber Análise e Proposta';
  button.textContent = ctaLabel;
  let context = {}, pending = false, session = 0, lastRequest = null;
  bindPhoneMask(phone);
  function validationMessage(field) {
    let message = '';
    if (field === name && !isFullName(field.value)) message = 'Informe nome e sobrenome.';
    if (field === email && !isValidEmail(field.value)) message = 'Informe um e-mail válido, como nome@empresa.com.br.';
    if (field === phone && !/^[1-9]\d9\d{8}$/.test(digitsOnly(field.value))) message = 'Informe DDD e celular com 11 dígitos.';
    if (field === consent && !field.checked) message = 'Autorize o contato para enviar.';
    return message;
  }
  function updateSubmit() {
    button.disabled = pending || fields.some(field => Boolean(validationMessage(field)));
  }
  function validate(field) {
    const message = validationMessage(field);
    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    const error = form.querySelector('[data-error="' + field.dataset.field + '"]');
    error.textContent = message; error.hidden = !message;
    return !message;
  }
  fields.forEach(field => {
    const check = () => { validate(field); updateSubmit(); };
    field.addEventListener('blur', check);
    field.addEventListener('input', check);
    field.addEventListener('change', check);
  });
  function setPending(value) {
    pending = value; form.setAttribute('aria-busy', String(value));
    [...form.elements].forEach(field => { field.disabled = value; });
    button.textContent = value ? 'Enviando…' : ctaLabel;
    status.textContent = value ? 'Enviando solicitação.' : '';
    updateSubmit();
  }
  function reset(nextContext = {}, nextTicket = null) {
    session++; context = nextContext; lastRequest = null; form.reset(); setPending(false);
    form.hidden = false; confirmation.hidden = true; slot.style.minHeight = '';
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    fields.forEach(field => field.setCustomValidity(''));
    form.querySelectorAll('.field-error').forEach(error => { error.hidden = true; error.textContent = ''; });
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (pending) return;
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) { invalid[0].focus(); return; }
    const payload = { ...context, client_name: name.value.trim().replace(/\s+/g, ' '), client_phone: digitsOnly(phone.value), privacy_acknowledged: consent.checked, website: form.elements.website.value };
    if (email) payload.client_email = email.value.trim();
    const currentSession = session; setPending(true);
    try {
      const formKind = fullContact ? 'contact' : 'service';
      const signature = JSON.stringify({ payload, formKind });
      if (!lastRequest || lastRequest.signature !== signature) lastRequest = ContactClient.createRequest(payload, formKind);
      await ContactClient.submit(lastRequest);
      if (currentSession !== session) return;
      // Contatos reais são registrados no receptor comercial, sem incrementar "Contatos simulados".
      slot.style.minHeight = form.getBoundingClientRect().height + 'px';
      form.reset(); lastRequest = null; context = {};
      form.hidden = true; confirmation.hidden = false;
      if (!slot.closest('[hidden]')) confirmation.focus({ preventScroll: true });
    } catch (error) {
      if (currentSession === session) status.textContent = error.message === 'rate_limit'
        ? 'Você já enviou várias solicitações. Aguarde um pouco ou escreva para contato@somosluc.com.br.'
        : 'Não conseguimos confirmar o recebimento. Tente novamente ou escreva para contato@somosluc.com.br.';
    } finally {
      if (currentSession === session) {
        pending = false; form.setAttribute('aria-busy', 'false');
        [...form.elements].forEach(field => { field.disabled = false; });
        button.textContent = ctaLabel;
        updateSubmit();
      }
    }
  });
  updateSubmit();
  return { reset };
}
const serviceForm = mountForm($('service-form-slot'), 'service');
const corporateForm = mountForm($('corporate-form-slot'), 'corporate', { fullContact: true });
function serviceContext(service) {
  return {
    service_id: service?.id || null, service_name: service?.name || null,
    related_services: service ? service.related_ids.slice(0, 2).map(id => ({ id, name: byId.get(id).name })) : [],
    search_term: ui.search.value.trim()
  };
}

// Dialog nativo: Escape, contenção de foco e fechamento pelo fundo.
function bindDialog(dialog, closeButton, onClose = () => {}) {
  let opener = null, backdrop = false;
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('pointerdown', event => { backdrop = event.target === dialog; });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (backdrop && event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    onClose(); (opener?.isConnected ? opener : ui.search).focus({ preventScroll: true }); closeResults();
  });
  return {
    open(focusTarget) {
      opener = document.activeElement; closeResults(); dialog.showModal(); dialog.scrollTop = 0;
      focusTarget.focus({ preventScroll: true });
    }
  };
}
const servicePanel = bindDialog($('service-dialog'), $('close-service'), () => serviceForm.reset());
function openService(service) {
  lastSearchTicket = SearchAnalytics.confirm(ui.search.value, service);
  $('service-title').textContent = service.card_name || service.name;
  $('service-description').textContent = service.description;
  $('service-scope').replaceChildren(...service.scope.map(item => textElement('li', '', item)));
  serviceForm.reset(serviceContext(service), lastSearchTicket); servicePanel.open($('service-title'));
}
COMPANY.brands.forEach(brand => {
  const figure = textElement('figure', 'brand-item'), image = document.createElement('img');
  image.loading = 'lazy'; image.src = brand.src; image.alt = brand.name; image.width = brand.width; image.height = brand.height; image.decoding = 'async';
  const caption = document.createElement('figcaption');
  caption.append(textElement('span', 'brand-name', brand.client_name), textElement('span', 'brand-description', brand.description));
  figure.append(image, caption); $('brand-gallery').append(figure);
});
function bindInstitutionalNavigation() {
  const dialog = $('institutional-dialog');
  const views = ['luc', 'companies', 'corporate'];
  const links = [...dialog.querySelectorAll('[data-drawer-view]')];
  const mobileMenu = $('open-mobile-menu');
  const panel = bindDialog(dialog, $('close-institutional'), () => {
    corporateForm.reset(); mobileMenu.setAttribute('aria-expanded', 'false');
  });
  function show(view) {
    const opening = !dialog.open;
    if (opening) {
      const ticket = lastSearchTicket?.event.term === SearchAnalytics.canonical(ui.search.value) ? lastSearchTicket : null;
      corporateForm.reset(serviceContext(null), ticket);
    }
    views.forEach(key => { $(key + '-dialog').hidden = key !== view; });
    links.forEach(link => {
      if (link.dataset.drawerView === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    dialog.setAttribute('aria-labelledby', view + '-title');
    const focusTarget = $(view === 'corporate' && opening ? 'corporate-name' : view + '-title');
    if (opening) panel.open(focusTarget);
    else { dialog.scrollTop = 0; focusTarget.focus({ preventScroll: true }); }
    mobileMenu.setAttribute('aria-expanded', 'true');
  }
  mobileMenu.addEventListener('click', () => show('luc'));
  views.forEach(view => {
    const trigger = $('open-' + view);
    trigger.setAttribute('aria-controls', 'institutional-dialog');
    trigger.addEventListener('click', event => { event.preventDefault(); show(view); });
  });
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); show(link.dataset.drawerView);
  }));
}
bindInstitutionalNavigation();
const privacyPanel = bindDialog($('privacy-dialog'), $('close-privacy'));
['open-privacy', 'open-service-privacy'].forEach(id => $(id).addEventListener('click', event => {
  event.preventDefault(); privacyPanel.open($('privacy-title'));
}));

// Efeito visual: o título acessível permanece completo, sem anunciar cada letra.
(() => {
  const word = document.getElementById('hero-word');
  if (!word) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const words = ['desenvolver?', 'criar?', 'anunciar?', 'desenvolver?', 'desenhar?'];
  let index = 0, length = words[0].length, deleting = true, timer;
  const schedule = delay => { timer = setTimeout(tick, delay); };
  function tick() {
    if (motion.matches || document.hidden) return;
    if (deleting) {
      length--;
      word.textContent = words[index].slice(0, length);
      if (length === 0) {
        index = (index + 1) % words.length;
        deleting = false;
        schedule(300);
      } else schedule(55);
    } else {
      length++;
      word.textContent = words[index].slice(0, length);
      if (length === words[index].length) {
        deleting = true;
        schedule(1800);
      } else schedule(110);
    }
  }
  function sync() {
    clearTimeout(timer);
    word.classList.toggle('is-typing', !motion.matches && !document.hidden);
    if (motion.matches) {
      index = 0; length = words[0].length; deleting = true;
      word.textContent = words[0];
    } else if (!document.hidden) schedule(1800);
  }
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
