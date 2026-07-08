import type { SeoLang } from "@/lib/seo";

export type CaseColor = "pink" | "cyan" | "green";

export interface CaseStudy {
  id: "creativeos" | "tourism-sms" | "minha-arte";
  color: CaseColor;
  image: string;
  publishedUrl: string;
  routes: Record<SeoLang, string>;
  seo: Record<SeoLang, {
    title: string;
    description: string;
    keywords: string;
  }>;
  content: Record<SeoLang, {
    eyebrow: string;
    title: string;
    shortDescription: string;
    tags: string[];
    year: string;
    client: string;
    area: string;
    role: string;
    delivery: string;
    summary: Array<{ label: string; value: string }>;
    challenge: string;
    solution: string;
    process: string[];
    tools: string[];
    result: string;
    publicNote: string;
  }>;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "creativeos",
    color: "cyan",
    image: "/JACOBBRAIN.webp",
    publishedUrl: "https://creativeopsmvp.netlify.app/",
    routes: {
      pt: "/cases/creativeos",
      en: "/en/cases/creativeos",
    },
    seo: {
      pt: {
        title: "CreativeOS — case study de produto digital | Jacob Jonson",
        description:
          "Case study do CreativeOS, MVP público para organizar briefings, prompts, templates e fluxos criativos em um só painel.",
        keywords:
          "CreativeOS, case study, produto digital, IA aplicada, sistema criativo, operação criativa, MVP, Jacob Jonson",
      },
      en: {
        title: "CreativeOS — digital product case study | Jacob Jonson",
        description:
          "Case study for CreativeOS, a public MVP built to organize briefs, prompt bases, templates and creative workflows in one workspace.",
        keywords:
          "CreativeOS, case study, digital product, applied AI, creative system, creative operations, MVP, Jacob Jonson",
      },
    },
    content: {
      pt: {
        eyebrow: "Case study",
        title: "CreativeOS — Operação criativa em um painel só",
        shortDescription:
          "Um MVP autoral para organizar o caos antes da criação começar, conectando briefing, prompts, templates e fluxo criativo em um workspace beta.",
        tags: ["Produto digital", "IA aplicada", "Sistema criativo", "Operação criativa"],
        year: "2026",
        client: "Projeto pessoal",
        area: "Produto digital / IA aplicada / Sistema criativo / Operação criativa",
        role: "Desenvolvimento completo do CreativeOS, da concepção ao MVP publicado.",
        delivery:
          "Workspace beta para organizar briefings, prompts base, templates e fluxos criativos em um só painel.",
        summary: [
          { label: "Cliente/projeto", value: "Projeto pessoal" },
          { label: "Ano", value: "2026" },
          { label: "Área", value: "Produto digital / IA aplicada / Sistema criativo" },
          { label: "Função", value: "Concepção, produto, interface e desenvolvimento do MVP" },
          { label: "Entrega", value: "Workspace beta publicado" },
          { label: "Link publicado", value: "creativeopsmvp.netlify.app" },
        ],
        challenge:
          "Nem toda demanda criativa começa com um briefing claro. Muitas vezes ela nasce de uma mensagem solta, um print, uma referência perdida, uma ideia incompleta, um prompt jogado ou uma urgência. O desafio foi transformar esse início fragmentado em direção, roteiro, arte, post, vídeo, legenda, aprovação e entrega.",
        solution:
          "O CreativeOS foi estruturado como um workspace beta para centralizar briefings, prompts base, templates e fluxos criativos em um painel único. O projeto não é apresentado como SaaS finalizado, mas como um laboratório funcional de operação criativa para testar organização, velocidade e clareza antes da produção.",
        process: [
          "Identificação da dor em demandas criativas pouco estruturadas.",
          "Mapeamento do fluxo entre briefing, direção, produção, aprovação e entrega.",
          "Planejamento da arquitetura de conteúdo e dos módulos principais do workspace.",
          "Estudo de referências para manter a interface objetiva e utilizável.",
          "Prototipação e desenvolvimento de um MVP navegável.",
          "Publicação do beta e abertura para captação inicial de feedback.",
        ],
        tools: [
          "React/Vite",
          "JavaScript/TypeScript conforme o projeto",
          "CSS/Tailwind quando aplicável",
          "i18n",
          "localStorage",
          "Export/import JSON",
          "Firebase Auth/Firestore experimental em beta quando aplicável",
          "Netlify",
          "Scripts front-end",
        ],
        result:
          "MVP público publicado, com fluxo de organização de demandas, prompts, templates, workspace criativo e captação inicial de feedback.",
        publicNote:
          "Projeto autoral e experimental, apresentado como laboratório profissional de operação criativa.",
      },
      en: {
        eyebrow: "Case study",
        title: "CreativeOS — Creative operations in one workspace",
        shortDescription:
          "A self-initiated MVP built to organize the mess before creation starts, connecting briefs, prompt bases, templates and creative workflow in a beta workspace.",
        tags: ["Digital product", "Applied AI", "Creative system", "Creative operations"],
        year: "2026",
        client: "Personal project",
        area: "Digital product / Applied AI / Creative system / Creative operations",
        role: "Full CreativeOS development, from concept to published MVP.",
        delivery:
          "A beta workspace for organizing briefs, prompt bases, templates and creative workflows in one panel.",
        summary: [
          { label: "Client/project", value: "Personal project" },
          { label: "Year", value: "2026" },
          { label: "Area", value: "Digital product / Applied AI / Creative system" },
          { label: "Role", value: "Concept, product, interface and MVP development" },
          { label: "Delivery", value: "Published beta workspace" },
          { label: "Published link", value: "creativeopsmvp.netlify.app" },
        ],
        challenge:
          "Creative requests do not always start with a clear brief. They can begin with a loose message, a screenshot, a lost reference, an unfinished idea, a rough prompt or an urgent request. The challenge was to turn that fragmented start into direction, script, art, post, video, caption, approval and delivery.",
        solution:
          "CreativeOS was structured as a beta workspace that centralizes briefs, prompt bases, templates and creative flows in a single panel. It is not positioned as a finished SaaS product, but as a functional creative-operations lab for testing organization, speed and clarity before production.",
        process: [
          "Identified the pain behind poorly structured creative requests.",
          "Mapped the flow between brief, direction, production, approval and delivery.",
          "Planned the content architecture and main workspace modules.",
          "Studied references to keep the interface focused and usable.",
          "Prototyped and developed a navigable MVP.",
          "Published the beta and opened the path for initial feedback.",
        ],
        tools: [
          "React/Vite",
          "JavaScript/TypeScript according to the project",
          "CSS/Tailwind when applicable",
          "i18n",
          "localStorage",
          "JSON export/import",
          "Experimental Firebase Auth/Firestore beta where applicable",
          "Netlify",
          "Front-end scripts",
        ],
        result:
          "Public MVP published with a flow for organizing requests, prompts, templates, creative workspace and initial feedback capture.",
        publicNote:
          "A self-initiated experimental project, presented as a professional creative-operations lab.",
      },
    },
  },
  {
    id: "tourism-sms",
    color: "green",
    image: "/portfolio/turismo-onde-fica.jpg",
    publishedUrl: "https://turismo.saomateusdosul.pr.gov.br/",
    routes: {
      pt: "/cases/turismo-sao-mateus-do-sul",
      en: "/en/cases/tourism-sao-mateus-do-sul",
    },
    seo: {
      pt: {
        title: "Turismo São Mateus do Sul — case study | Jacob Jonson",
        description:
          "Case study do portal oficial de turismo de São Mateus do Sul, com organização visual, conteúdo, rotas, eventos e experiência digital.",
        keywords:
          "Turismo São Mateus do Sul, case study, site institucional, turismo, comunicação pública, experiência digital, Jacob Jonson",
      },
      en: {
        title: "Tourism São Mateus do Sul — case study | Jacob Jonson",
        description:
          "Case study for the official São Mateus do Sul tourism portal, covering visual organization, content, routes, events and digital experience.",
        keywords:
          "Tourism São Mateus do Sul, case study, institutional website, tourism, public communication, digital experience, Jacob Jonson",
      },
    },
    content: {
      pt: {
        eyebrow: "Case study",
        title: "Turismo São Mateus do Sul",
        shortDescription:
          "Portal oficial de turismo criado para organizar atrativos, eventos, rotas, empreendimentos e identidade turística do município.",
        tags: ["Site institucional", "Turismo", "Comunicação pública", "Experiência digital"],
        year: "2026",
        client: "Prefeitura de São Mateus do Sul / Turismo",
        area: "Site institucional / Turismo / Comunicação pública / Experiência digital",
        role: "Organização visual, conteúdo, estrutura do site, apoio técnico e comunicacional.",
        delivery:
          "Site oficial de turismo com páginas, estrutura visual, conteúdo, rotas, empreendimentos, eventos e identidade turística.",
        summary: [
          { label: "Cliente/projeto", value: "Prefeitura de São Mateus do Sul / Turismo" },
          { label: "Ano", value: "2026" },
          { label: "Área", value: "Site institucional / Turismo / Comunicação pública" },
          { label: "Função", value: "Organização visual, conteúdo, estrutura e apoio técnico" },
          { label: "Entrega", value: "Portal oficial de turismo publicado" },
          { label: "Link publicado", value: "turismo.saomateusdosul.pr.gov.br" },
        ],
        challenge:
          "Organizar informações de turismo de forma acessível, atrativa e utilizável pela população, visitantes e comunicação institucional, sem perder a identidade territorial do município.",
        solution:
          "O site estruturou uma presença oficial para apresentar atrativos, eventos, rotas, empreendimentos e conteúdos turísticos em uma navegação mais clara. A entrega conecta comunicação pública, organização de informação, experiência digital e valorização territorial.",
        process: [
          "Pesquisa e organização do conteúdo turístico disponível.",
          "Definição de seções e navegação para diferentes perfis de público.",
          "Tratamento visual alinhado à identidade turística do município.",
          "Estruturação de páginas, rotas, eventos e informações de empreendimentos.",
          "Publicação do portal e ajustes contínuos conforme necessidade institucional.",
        ],
        tools: [
          "HTML",
          "CSS",
          "JavaScript",
          "Estrutura multilíngue/traduzível quando aplicável",
          "SEO técnico",
          "Open Graph/Twitter Cards",
          "Analytics",
          "Schema.org/TouristDestination quando existente",
          "VLibras/recursos de acessibilidade quando existentes",
          "Organização de conteúdo turístico",
        ],
        result:
          "Portal oficial publicado para organizar atrativos, rotas, eventos, empreendimentos e a identidade turística de São Mateus do Sul.",
        publicNote:
          "Case institucional apresentado com foco em clareza, confiabilidade e utilidade pública.",
      },
      en: {
        eyebrow: "Case study",
        title: "Tourism São Mateus do Sul",
        shortDescription:
          "Official tourism portal built to organize attractions, events, routes, local businesses and the city's tourism identity.",
        tags: ["Institutional website", "Tourism", "Public communication", "Digital experience"],
        year: "2026",
        client: "São Mateus do Sul City Hall / Tourism",
        area: "Institutional website / Tourism / Public communication / Digital experience",
        role: "Visual organization, content, site structure, technical and communication support.",
        delivery:
          "Official tourism website with pages, visual structure, content, routes, local businesses, events and tourism identity.",
        summary: [
          { label: "Client/project", value: "São Mateus do Sul City Hall / Tourism" },
          { label: "Year", value: "2026" },
          { label: "Area", value: "Institutional website / Tourism / Public communication" },
          { label: "Role", value: "Visual organization, content, structure and technical support" },
          { label: "Delivery", value: "Published official tourism portal" },
          { label: "Published link", value: "turismo.saomateusdosul.pr.gov.br" },
        ],
        challenge:
          "Organize tourism information in a way that is accessible, attractive and useful for residents, visitors and institutional communication, while preserving the city's territorial identity.",
        solution:
          "The website created an official presence for attractions, events, routes, local businesses and tourism content through clearer navigation. The delivery connects public communication, information architecture, digital experience and territorial value.",
        process: [
          "Researched and organized available tourism content.",
          "Defined sections and navigation for different audience profiles.",
          "Shaped the visual treatment around the city's tourism identity.",
          "Structured pages, routes, events and business information.",
          "Published the portal and supported continuous institutional adjustments.",
        ],
        tools: [
          "HTML",
          "CSS",
          "JavaScript",
          "Multilingual/translatable structure where applicable",
          "Technical SEO",
          "Open Graph/Twitter Cards",
          "Analytics",
          "Schema.org/TouristDestination where present",
          "VLibras/accessibility resources where present",
          "Tourism content organization",
        ],
        result:
          "Official portal published to organize attractions, routes, events, local businesses and the tourism identity of São Mateus do Sul.",
        publicNote:
          "Institutional case presented with emphasis on clarity, reliability and public usefulness.",
      },
    },
  },
  {
    id: "minha-arte",
    color: "pink",
    image: "/portfolio/arte-e-vida.jpg",
    publishedUrl: "https://youtu.be/QuSUc3q5CIk?si=CDyYUbnsRTkE3RV6",
    routes: {
      pt: "/cases/minha-arte-e-minha-vida",
      en: "/en/cases/minha-arte-e-minha-vida",
    },
    seo: {
      pt: {
        title: "Minha Arte é Minha Vida — case study audiovisual | Jacob Jonson",
        description:
          "Case study do videoclipe Minha Arte é Minha Vida, de Alan Fuzer, com roteiro, captação, direção, edição, pós-produção e apoio criativo com IA.",
        keywords:
          "Minha Arte é Minha Vida, Alan Fuzer, case study, videoclipe, direção audiovisual, pós-produção, Jacob Jonson",
      },
      en: {
        title: "Minha Arte é Minha Vida — music video case study | Jacob Jonson",
        description:
          "Case study for Alan Fuzer's Minha Arte é Minha Vida music video, covering script, camera, direction, editing, post-production and AI-assisted creative support.",
        keywords:
          "Minha Arte é Minha Vida, Alan Fuzer, case study, music video, audiovisual direction, post-production, Jacob Jonson",
      },
    },
    content: {
      pt: {
        eyebrow: "Case study",
        title: "Videoclipe “Minha Arte é Minha Vida” — Alan Fuzer",
        shortDescription:
          "Nova versão visual do clipe, mantendo a essência da primeira versão e elevando a qualidade de captação, edição, curadoria e pós-produção.",
        tags: ["Videoclipe", "Direção audiovisual", "Pós-produção", "IA como apoio criativo"],
        year: "2026",
        client: "Alan Fuzer",
        area: "Videoclipe / Direção audiovisual / Pós-produção",
        role: "Roteirista, cinegrafista, editor e diretor.",
        delivery:
          "Reuniões, briefing, organização de agenda, captação em uma tarde de sábado, edição, curadoria de material antigo e integração de registros extras.",
        summary: [
          { label: "Cliente/projeto", value: "Alan Fuzer" },
          { label: "Ano", value: "2026" },
          { label: "Área", value: "Videoclipe / Direção audiovisual / Pós-produção" },
          { label: "Função", value: "Roteiro, câmera, edição e direção" },
          { label: "Entrega", value: "Nova versão visual do videoclipe" },
          { label: "Link publicado", value: "YouTube" },
        ],
        challenge:
          "Recriar o clipe de “Minha Arte é Minha Vida” mantendo a essência e algumas características da primeira versão, que havia sido produzida de forma mais amadora, mas elevando a organização, a qualidade visual e a entrega final.",
        solution:
          "A produção combinou briefing, agenda compacta de captação, direção audiovisual, edição, tratamento visual e curadoria de materiais antigos. O material extra gravado na RDXFM durante o lançamento da música foi integrado à narrativa e ajudou a dar um diferencial final ao clipe.",
        process: [
          "Reuniões e briefing para preservar a essência da primeira versão.",
          "Organização da agenda e captação das imagens em uma tarde de sábado.",
          "Seleção e curadoria de material antigo para compor a narrativa.",
          "Edição e tratamento visual com foco em ritmo, emoção e acabamento.",
          "Inserção de registros extras captados na RDXFM durante o lançamento da música.",
          "Finalização do videoclipe e entrega para aprovação do artista.",
        ],
        tools: ["iPhone", "Premiere", "After Effects", "CapCut", "Higgsfield", "Photoshop"],
        result:
          "Entrega aprovada pelo artista, com nova versão visual do clipe e material complementar captado durante o lançamento na RDXFM.",
        publicNote:
          "Case audiovisual com foco humano, artístico e profissional, destacando direção, captação, edição, curadoria, pós-produção e IA como apoio criativo.",
      },
      en: {
        eyebrow: "Case study",
        title: "“Minha Arte é Minha Vida” Music Video — Alan Fuzer",
        shortDescription:
          "A new visual version of the music video, preserving the essence of the first cut while improving capture, editing, curation and post-production quality.",
        tags: ["Music video", "Audiovisual direction", "Post-production", "AI-assisted creativity"],
        year: "2026",
        client: "Alan Fuzer",
        area: "Music video / Audiovisual direction / Post-production",
        role: "Writer, camera operator, editor and director.",
        delivery:
          "Meetings, briefing, schedule organization, footage captured in one Saturday afternoon, editing, old-material curation and integration of additional records.",
        summary: [
          { label: "Client/project", value: "Alan Fuzer" },
          { label: "Year", value: "2026" },
          { label: "Area", value: "Music video / Audiovisual direction / Post-production" },
          { label: "Role", value: "Script, camera, editing and direction" },
          { label: "Delivery", value: "New visual version of the music video" },
          { label: "Published link", value: "YouTube" },
        ],
        challenge:
          "Recreate the “Minha Arte é Minha Vida” video while keeping the essence and some characteristics of the first version, which had been produced in a more amateur way, and raise the organization, visual quality and final delivery.",
        solution:
          "The production combined briefing, compact shoot scheduling, audiovisual direction, editing, visual treatment and curation of older materials. Additional footage recorded at RDXFM during the song launch was integrated into the narrative and became an important final differentiator.",
        process: [
          "Held meetings and briefing to preserve the essence of the first version.",
          "Organized the schedule and captured footage in one Saturday afternoon.",
          "Selected and curated older material to support the narrative.",
          "Edited and treated the visuals with attention to rhythm, emotion and finish.",
          "Inserted additional records captured at RDXFM during the song launch.",
          "Finished the music video and delivered it for artist approval.",
        ],
        tools: ["iPhone", "Premiere", "After Effects", "CapCut", "Higgsfield", "Photoshop"],
        result:
          "Delivery approved by the artist, with a new visual version of the music video and complementary material captured during the RDXFM launch.",
        publicNote:
          "Human, artistic and professional audiovisual case, highlighting direction, capture, editing, curation, post-production and AI as creative support.",
      },
    },
  },
];

export const getCaseByPath = (pathname: string) => {
  const basePath = pathname.replace(/\/+$/, "") || "/";

  return CASE_STUDIES.find((caseStudy) =>
    Object.values(caseStudy.routes).includes(basePath)
  );
};

export const getCaseLangByPath = (pathname: string): SeoLang | null => {
  const basePath = pathname.replace(/\/+$/, "") || "/";
  const caseStudy = getCaseByPath(basePath);

  if (!caseStudy) return null;

  return caseStudy.routes.en === basePath ? "en" : "pt";
};

export const getCaseBySlug = (slug: string | undefined, lang: SeoLang) =>
  CASE_STUDIES.find((caseStudy) => {
    const route = caseStudy.routes[lang];
    const routeParts = route.split("/").filter(Boolean);
    return routeParts[routeParts.length - 1] === slug;
  });
