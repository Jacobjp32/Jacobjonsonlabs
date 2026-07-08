export type ProductLang = "pt" | "en";
export type ProductStatus = "beta_in_progress" | "in_development" | "coming_soon";
export type ProductAccent = "pink" | "cyan" | "green" | "yellow";
export type ProductIcon = "prompts" | "video" | "planner" | "course";

export interface LocalizedText {
  pt: string;
  en: string;
}

export interface LocalizedList {
  pt: string[];
  en: string[];
}

export interface DigitalProduct {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  price: LocalizedText;
  statusLabel: LocalizedText;
  ctaLabel: LocalizedText;
  format: LocalizedText;
  audience: LocalizedText;
  benefits: LocalizedList;
  status: ProductStatus;
  accent: ProductAccent;
  icon: ProductIcon;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "kit-prompts-comunicacao-publica-ia",
    title: {
      pt: "Kit de Prompts para Comunicação Pública com IA",
      en: "AI Prompt Kit for Public Communication",
    },
    category: {
      pt: "Prompts e operação editorial",
      en: "Prompts and editorial operations",
    },
    shortDescription: {
      pt: "Prompts prontos para acelerar textos institucionais, notas, legendas, respostas e rotina editorial.",
      en: "Ready-to-use prompts for faster institutional copy, statements, captions, replies and editorial routines.",
    },
    longDescription: {
      pt: "Material criado para transformar briefing em texto claro, rápido e alinhado ao contexto institucional.",
      en: "Built to turn a briefing into clear, fast and context-aware institutional copy.",
    },
    price: {
      pt: "R$ 97",
      en: "US$ 19",
    },
    statusLabel: {
      pt: "Beta em preparação",
      en: "Beta in progress",
    },
    ctaLabel: {
      pt: "Quero acesso antecipado",
      en: "Request early access",
    },
    format: {
      pt: "PDF + banco de prompts + exemplos de aplicação",
      en: "PDF + prompt library + practical examples",
    },
    audience: {
      pt: "Assessorias, social media institucional, equipes de gabinete e comunicação pública.",
      en: "Press offices, institutional social media teams and public communication staff.",
    },
    benefits: {
      pt: [
        "Reduz tempo de escrita e revisão",
        "Melhora consistência entre peças recorrentes",
        "Ajuda a estruturar pauta, resposta e posicionamento",
      ],
      en: [
        "Cuts writing and revision time",
        "Improves consistency across recurring assets",
        "Helps structure editorial angle, response and positioning",
      ],
    },
    status: "beta_in_progress",
    accent: "pink",
    icon: "prompts",
  },
  {
    id: "pack-roteiros-videos-institucionais",
    title: {
      pt: "Pack de Roteiros para Vídeos Institucionais",
      en: "Institutional Video Script Pack",
    },
    category: {
      pt: "Roteiro e vídeo institucional",
      en: "Scriptwriting and institutional video",
    },
    shortDescription: {
      pt: "Modelos de roteiro com estrutura profissional para vídeos de marca, apresentação institucional e campanhas públicas.",
      en: "Professional script templates for brand films, institutional presentations and public campaigns.",
    },
    longDescription: {
      pt: "Pack pensado para organizar narrativa, blocos, tom e ordem de mensagem antes da gravação ou edição.",
      en: "Designed to organize narrative, tone, structure and message flow before filming or editing.",
    },
    price: {
      pt: "R$ 147",
      en: "US$ 29",
    },
    statusLabel: {
      pt: "Em desenvolvimento",
      en: "In development",
    },
    ctaLabel: {
      pt: "Receber aviso",
      en: "Get notified",
    },
    format: {
      pt: "Templates editáveis + guia de estrutura + exemplos",
      en: "Editable templates + structure guide + examples",
    },
    audience: {
      pt: "Produtoras, comunicação institucional, assessorias e profissionais de vídeo.",
      en: "Studios, institutional communication teams, agencies and video professionals.",
    },
    benefits: {
      pt: [
        "Organiza melhor o argumento antes da produção",
        "Evita vídeos frios ou sem direção",
        "Acelera aprovação interna com estrutura mais clara",
      ],
      en: [
        "Improves narrative planning before production",
        "Avoids flat or directionless institutional videos",
        "Speeds up internal approval with clearer structure",
      ],
    },
    status: "in_development",
    accent: "cyan",
    icon: "video",
  },
  {
    id: "template-planejamento-editorial-comunicacao",
    title: {
      pt: "Template de Planejamento Editorial para Comunicação",
      en: "Editorial Planning Template for Communication Teams",
    },
    category: {
      pt: "Planejamento e calendário",
      en: "Planning and calendar",
    },
    shortDescription: {
      pt: "Estrutura para organizar pauta, calendário, responsáveis, canais e prioridades sem depender de planilhas improvisadas.",
      en: "A clearer structure for editorial calendar, owners, channels and priorities without improvised spreadsheets.",
    },
    longDescription: {
      pt: "Template pensado para rotina recorrente, com visão mensal, acompanhamento de entregas e controle editorial mais claro.",
      en: "A planning template for recurring communication operations with monthly visibility and clearer editorial control.",
    },
    price: {
      pt: "R$ 79",
      en: "US$ 15",
    },
    statusLabel: {
      pt: "Em breve",
      en: "Coming soon",
    },
    ctaLabel: {
      pt: "Receber aviso",
      en: "Get notified",
    },
    format: {
      pt: "Template editável + visão de calendário + instruções de uso",
      en: "Editable template + calendar view + usage guide",
    },
    audience: {
      pt: "Times de comunicação, marketing institucional, assessorias e operações de conteúdo.",
      en: "Communication teams, institutional marketing, agencies and content operations.",
    },
    benefits: {
      pt: [
        "Dá previsibilidade para a produção",
        "Melhora alinhamento entre pauta e execução",
        "Reduz retrabalho de calendário e prioridades",
      ],
      en: [
        "Creates more predictable production flow",
        "Improves alignment between planning and execution",
        "Reduces rework around priorities and calendar changes",
      ],
    },
    status: "coming_soon",
    accent: "green",
    icon: "planner",
  },
  {
    id: "mini-curso-ia-comunicacao-video-conteudo",
    title: {
      pt: "Mini-curso IA para Comunicação, Vídeo e Conteúdo Institucional",
      en: "Mini Course: AI for Communication, Video and Institutional Content",
    },
    category: {
      pt: "Curso e capacitação aplicada",
      en: "Course and applied training",
    },
    shortDescription: {
      pt: "Treinamento introdutório para usar IA em briefing, roteiro, conteúdo, apoio visual e produtividade de comunicação.",
      en: "Practical training on using AI for briefing, scripting, content, visual support and communication productivity.",
    },
    longDescription: {
      pt: "Mini-curso para equipes e profissionais que querem usar IA com mais critério e utilidade real no fluxo de comunicação.",
      en: "A short course for teams and professionals who want to use AI with more judgment and practical value in communication workflows.",
    },
    price: {
      pt: "R$ 297",
      en: "US$ 59",
    },
    statusLabel: {
      pt: "Em desenvolvimento",
      en: "In development",
    },
    ctaLabel: {
      pt: "Receber aviso",
      en: "Get notified",
    },
    format: {
      pt: "Aulas gravadas + materiais de apoio + checklist operacional",
      en: "Recorded lessons + support materials + operational checklist",
    },
    audience: {
      pt: "Equipes de comunicação, criadores, videomakers e profissionais institucionais.",
      en: "Communication teams, creators, videographers and institutional professionals.",
    },
    benefits: {
      pt: [
        "Ajuda a aplicar IA com menos improviso",
        "Mostra casos de uso ligados à rotina real",
        "Organiza um ponto de partida para adoção interna",
      ],
      en: [
        "Helps teams use AI with less improvisation",
        "Focuses on real communication use cases",
        "Creates a practical starting point for adoption",
      ],
    },
    status: "in_development",
    accent: "yellow",
    icon: "course",
  },
];

export const getLocalizedValue = <T extends LocalizedText | LocalizedList>(
  value: T,
  lang: ProductLang
) => value[lang];
