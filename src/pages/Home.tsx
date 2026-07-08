import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Clapperboard,
  Code2,
  Cpu,
  ExternalLink,
  Film,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Play,
  Send,
  Sparkles,
  WandSparkles,
  Workflow,
  Youtube,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import VideoModal from "@/components/VideoModal";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { DIGITAL_PRODUCTS, getLocalizedValue } from "@/data/products";
import { useI18n } from "@/i18n";
import { applyPageSeo, getLocalizedPath } from "@/lib/seo";
import { Link } from "react-router-dom";

type CardColor = "pink" | "cyan" | "green";

interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  challenge: string;
  approach: string;
  deliverable: string;
  result: string;
  highlights: string[];
  poster: string;
  videoSrc: string;
  color: CardColor;
}

interface CapabilityItem {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  color: CardColor;
}

interface WorkflowItem {
  step: string;
  title: string;
  description: string;
}

interface ExperimentItem {
  title: string;
  tag: string;
  description: string;
  image: string;
}

interface ProcessItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

type PortfolioGroup = "video" | "public" | "campaign" | "events" | "sites" | "ai";

interface PortfolioWork {
  title: string;
  group: PortfolioGroup;
  category: string;
  platform: string;
  delivery: string;
  description: string;
  href: string;
  cta: string;
  caseHref?: string;
  caseCta?: string;
  image?: string;
  embedSrc?: string;
  color: CardColor;
}

interface PortfolioArchiveGroup {
  label: string;
  items: PortfolioWork[];
}

export default function Home() {
  const { lang } = useI18n();
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    videoSrc: string;
    poster?: string;
    iframeSrc?: string;
    eyebrow?: string;
  } | null>(null);

  const isEnglish = lang === "en";

  const metaCopy = isEnglish
    ? {
        title:
          "Jacob Jonson | AI Creative Studio for Film, AI and Digital Experiences",
        description:
          "Creative direction, cinematic video, generative AI, design, web and automation for brands that need sharper digital presence.",
      }
    : {
        title:
          "Jacob Jonson | AI Creative Studio para Audiovisual, IA e Experiências Digitais",
        description:
          "Direção criativa, audiovisual cinematográfico, IA generativa, design, web e automação para marcas que precisam de presença digital mais forte.",
      };

  useEffect(() => {
    applyPageSeo({
      lang,
      title: metaCopy.title,
      description: metaCopy.description,
      pathname: "/",
    });
  }, [lang, metaCopy.description, metaCopy.title]);

  const copy = isEnglish
    ? {
        skipLink: "Skip to content",
        hero: {
          badge: "AI Creative Studio / Film + AI + Design + Automation",
          title: "Film, AI and digital systems for brands that need presence.",
          description:
            "I direct and build cinematic content, generative visuals, landing pages, brand assets and automation flows with one clear creative line.",
          primaryCta: "Start a brief",
          secondaryCta: "Watch showreel",
          tertiaryCta: "Explore cases",
          reelLabel: "Studio showreel",
          reelDescription:
            "Direction, pacing, AI imagery, motion and finishing in one short cut.",
        },
        stats: [
          { value: "15+", label: "years across film, content and communication" },
          { value: "200+", label: "videos, campaigns and digital assets delivered" },
          { value: "AI", label: "image, video and concept workflows" },
          { value: "WEB", label: "landing pages, systems and automation flows" },
        ],
        capabilitiesTitle: "Creative studio",
        capabilitiesHeading: "What I deliver and how it works",
        capabilitiesDescription:
          "Creative direction, film, generative AI, web and automation in one connected line of work.",
        workflowStripLabel: "How it works",
        projectsTitle: "Selected work",
        projectsHeading: "A curated view, not a full catalogue",
        projectsDescription:
          "One highlight and a short selection across film, web and AI.",
        projectsViewAll: "See all projects",
        projectsNote: "Highlight",
        moreWorkTitle: "SELECTED ARCHIVE",
        moreWorkHeading: "More work across video, web and public communication",
        moreWorkDescription:
          "Campaigns, events, institutional content and websites gathered in a compact showcase to highlight the range of deliveries.",
        watchHere: "Watch here",
        openExternal: "Open work",
        visitSite: "Visit site",
        viewProfile: "View profile",
        experimentsTitle: "Experiments",
        experimentsHeading: "A visual lab, separate from client work",
        experimentsDescription:
          "Personal AI tests in image, motion and interface language — not commissioned projects.",
        experimentsNote: "Lab / not client work",
        experimentsCta: "See experiments",
        processTitle: "Behind the process",
        processHeading: "The thinking before the final asset",
        processDescription:
          "Before producing, I organize context, aesthetics, channel and intent. AI comes in as an accelerator, not a replacement for creative direction.",
        contactTitle: "Start a brief",
        contactHeading: "Shall we organize your next visual system?",
        contactSubheading:
          "If the project needs to unite film, AI, design and digital execution, send a brief and I'll reply with the best path.",
        footer:
          "AI Creative Studio for cinematic content, digital experiences, generative visuals and automation-ready brand assets.",
        seeVideo: "Watch case",
        backToTop: "Back to top",
        projectBriefing: "Project briefing",
        projectBriefingNote: "Share the objective, channels, references and what needs to change in perception.",
        mobileQuote: "Brief",
        mobileReel: "Showreel",
        bestFit: "Best fit for",
        workflowNote: "Core studio stack",
      }
    : {
        skipLink: "Pular para o conteúdo",
        hero: {
          badge: "AI Creative Studio / Filme + IA + Design + Automação",
          title: "Filme, IA e sistemas digitais para marcas com presença.",
          description:
            "Direciono e construo conteúdo cinematográfico, visuais generativos, landing pages, ativos de marca e fluxos de automação com uma linha criativa clara.",
          primaryCta: "Iniciar briefing",
          secondaryCta: "Assistir showreel",
          tertiaryCta: "Explorar cases",
          reelLabel: "Showreel do estúdio",
          reelDescription:
            "Direção, ritmo, imagem com IA, motion e acabamento em um corte curto.",
        },
        stats: [
          { value: "15+", label: "anos entre filme, conteúdo e comunicação" },
          { value: "200+", label: "vídeos, campanhas e ativos digitais entregues" },
          { value: "IA", label: "fluxos de imagem, vídeo e conceito" },
          { value: "WEB", label: "landing pages, sistemas e fluxos de automação" },
        ],
        capabilitiesTitle: "Estúdio criativo",
        capabilitiesHeading: "O que entrego e como funciona",
        capabilitiesDescription:
          "Direção criativa, audiovisual, IA generativa, web e automação em uma só linha de trabalho.",
        workflowStripLabel: "Como funciona",
        projectsTitle: "Trabalhos selecionados",
        projectsHeading: "Uma curadoria, não um catálogo",
        projectsDescription:
          "Um destaque e uma seleção curta entre filme, web e IA.",
        projectsViewAll: "Ver todos os projetos",
        projectsNote: "Destaque",
        moreWorkTitle: "ACERVO SELECIONADO",
        moreWorkHeading: "Outros trabalhos em vídeo, web e comunicação pública",
        moreWorkDescription:
          "Campanhas, eventos, conteúdos institucionais e sites reunidos em uma vitrine compacta para mostrar a amplitude das entregas.",
        watchHere: "Assistir aqui",
        openExternal: "Abrir trabalho",
        visitSite: "Visitar site",
        viewProfile: "Ver perfil",
        experimentsTitle: "Experimentos",
        experimentsHeading: "Um laboratório visual, separado dos trabalhos reais",
        experimentsDescription:
          "Testes pessoais com IA em imagem, motion e interface — não são projetos de cliente.",
        experimentsNote: "Laboratório / fora de cliente",
        experimentsCta: "Ver experimentos",
        processTitle: "Por trás do processo",
        processHeading: "O pensamento antes do ativo final",
        processDescription:
          "Antes de produzir, organizo contexto, estética, canal e intenção. A IA entra como aceleradora, não como substituta da direção criativa.",
        contactTitle: "Iniciar briefing",
        contactHeading: "Vamos organizar seu próximo sistema visual?",
        contactSubheading:
          "Se o projeto precisa unir filme, IA, design e execução digital, envie um briefing e eu retorno com o melhor caminho.",
        footer:
          "AI Creative Studio para conteúdo cinematográfico, experiências digitais, visuais generativos e ativos de marca prontos para automação.",
        seeVideo: "Assistir case",
        backToTop: "Voltar ao topo",
        projectBriefing: "Briefing do projeto",
        projectBriefingNote: "Conte o objetivo, os canais, referências e o que precisa mudar na percepção.",
        mobileQuote: "Briefing",
        mobileReel: "Showreel",
        bestFit: "Mais indicado para",
        workflowNote: "Base criativa do estúdio",
      };

  const productsShowcaseCopy = isEnglish
    ? {
        eyebrow: "Digital products",
        title: "Digital products, in progress.",
        description:
          "A preview of kits, templates and resources shaped from real communication, video and AI workflows.",
        cta: "See digital products",
        cardCta: "See details",
        formatLabel: "Expected format",
      }
    : {
        eyebrow: "Produtos digitais",
        title: "Produtos digitais, em preparação.",
        description:
          "Uma prévia de kits, templates e materiais criados a partir de fluxos reais de comunicação, vídeo e IA.",
        cta: "Ver produtos digitais",
        cardCta: "Ver detalhes",
        formatLabel: "Formato previsto",
      };

  const capabilities: CapabilityItem[] = isEnglish
    ? [
        {
          title: "Cinematic content and creative direction",
          description:
            "Brand films, campaign pieces and edits shaped by strategy, rhythm and a precise visual language.",
          bullets: ["Concept, script support and direction", "Editing, motion and finishing", "Drone, VFX, color and sound polish"],
          icon: Clapperboard,
          color: "pink",
        },
        {
          title: "Generative AI for images, video and concepts",
          description:
            "AI-assisted visual development for scenes, characters, boards, campaign worlds and fast creative testing.",
          bullets: ["Prompt direction and look development", "AI image and video workflows", "Previsualization packs for decisions"],
          icon: WandSparkles,
          color: "cyan",
        },
        {
          title: "Brand systems, web experiences and automation",
          description:
            "Landing pages, digital assets and automation flows that carry the idea after the video is published.",
          bullets: ["Visual identity and campaign assets", "Landing pages and digital interfaces", "AI automations for briefs, leads and operations"],
          icon: Workflow,
          color: "green",
        },
      ]
    : [
        {
          title: "Conteúdo cinematográfico e direção criativa",
          description:
            "Filmes de marca, peças de campanha e edições guiadas por estratégia, ritmo e linguagem visual precisa.",
          bullets: ["Conceito, apoio de roteiro e direção", "Edição, motion e finalização", "Drone, VFX, cor e tratamento de som"],
          icon: Clapperboard,
          color: "pink",
        },
        {
          title: "IA generativa para imagens, vídeo e conceito",
          description:
            "Desenvolvimento visual com IA para cenas, personagens, boards, mundos de campanha e testes criativos rápidos.",
          bullets: ["Direção de prompt e desenvolvimento visual", "Fluxos de imagem e vídeo com IA", "Pacotes de pré-visualização para decisão"],
          icon: WandSparkles,
          color: "cyan",
        },
        {
          title: "Sistemas de marca, experiências web e automação",
          description:
            "Landing pages, ativos digitais e fluxos de automação que carregam a ideia depois que o vídeo é publicado.",
          bullets: ["Identidade visual e ativos de campanha", "Landing pages e interfaces digitais", "Automações com IA para briefings, leads e operação"],
          icon: Workflow,
          color: "green",
        },
      ];

  const workflowItems: WorkflowItem[] = isEnglish
    ? [
        {
          step: "01",
          title: "Brief and positioning",
          description: "Objective, audience, tone and channels.",
        },
        {
          step: "02",
          title: "Visual exploration with AI",
          description: "Moodframes, prompt routes and references.",
        },
        {
          step: "03",
          title: "Production, edit and design",
          description: "Film, edit, design and build assets.",
        },
        {
          step: "04",
          title: "Organized delivery",
          description: "Campaign versions, pages and lead flows.",
        },
      ]
    : [
        {
          step: "01",
          title: "Briefing e posicionamento",
          description: "Objetivo, público, tom e canais.",
        },
        {
          step: "02",
          title: "Exploração visual com IA",
          description: "Moodframes, rotas de prompt e referências.",
        },
        {
          step: "03",
          title: "Produção, edição e design",
          description: "Filme, edição, design e ativos.",
        },
        {
          step: "04",
          title: "Entrega organizada",
          description: "Versões de campanha, páginas e fluxos de lead.",
        },
      ];

  const featuredProjects: FeaturedProject[] = isEnglish
    ? [
        {
          title: "Studio Signature Reel",
          category: "Film / Motion / Creative Direction",
          description:
            "A fast proof of the studio language: framing, rhythm, drone, edit, motion and final polish.",
          challenge:
            "Show quickly that the work is more than video capture and can support a stronger creative position.",
          approach:
            "Curate cinematic fragments into a concise reel with clear pacing, contrast and visual authority.",
          deliverable:
            "Hero reel, pitch asset and visual reference for future campaigns and proposals.",
          result: "Stronger first impression for prospects and partners",
          highlights: ["Cinematic pacing", "Pitch-ready video asset", "Clear studio positioning"],
          poster: "/JACOBCYBER1.webp",
          videoSrc: "/showreel.mp4",
          color: "pink",
        },
        {
          title: "Brand Film and Digital Launch Layer",
          category: "Audiovisual / Web / Conversion",
          description:
            "Brand content designed to work beyond the main film: site, landing page, social channels and sales material.",
          challenge:
            "Raise brand perception and give the campaign a useful destination after people watch the video.",
          approach:
            "Connect direction, edit, page structure and campaign assets so the same story carries across touchpoints.",
          deliverable:
            "Brand film, social cutdowns, landing visuals and CTA-ready campaign material.",
          result: "One visual line from video to landing page",
          highlights: ["Direction and post-production", "Web-ready creative assets", "CTA and lead path alignment"],
          poster: "/JACOBESTUDIO2.webp",
          videoSrc: "/video1.mp4",
          color: "cyan",
        },
        {
          title: "AI Visual Worlds and Motion Tests",
          category: "Generative AI / Design / VFX",
          description:
            "AI visual research expanded into motion, campaign concepts, characters and cinematic art direction.",
          challenge:
            "Explore richer visual routes before production without slowing the creative decision process.",
          approach:
            "Use AI image and video as a previsualization layer, then refine the strongest routes with design and motion.",
          deliverable:
            "Moodframes, prompt routes, motion tests and concept assets ready for campaign planning.",
          result: "Faster visual decisions with more range",
          highlights: ["AI image and video exploration", "Motion and compositing", "Look development for campaign worlds"],
          poster: "/JACOBCYBER2.webp",
          videoSrc: "/video2.mp4",
          color: "green",
        },
      ]
    : [
        {
          title: "Showreel de Assinatura do Estúdio",
          category: "Filme / Motion / Direção Criativa",
          description:
            "Uma prova rápida da linguagem do estúdio: enquadramento, ritmo, drone, edição, motion e acabamento.",
          challenge:
            "Mostrar rapidamente que o trabalho vai além da captação de vídeo e sustenta um posicionamento criativo mais forte.",
          approach:
            "Curadoria de fragmentos cinematográficos em um reel curto, com ritmo, contraste e autoridade visual.",
          deliverable:
            "Reel hero, ativo de pitch e referência visual para campanhas e propostas futuras.",
          result: "Primeira impressão mais forte para clientes e parceiros",
          highlights: ["Ritmo cinematográfico", "Ativo pronto para pitch", "Posicionamento claro do estúdio"],
          poster: "/JACOBCYBER1.webp",
          videoSrc: "/showreel.mp4",
          color: "pink",
        },
        {
          title: "Filme de Marca com Camada Digital",
          category: "Audiovisual / Web / Conversão",
          description:
            "Conteúdo de marca pensado para ir além do filme principal: site, landing page, social e material comercial.",
          challenge:
            "Elevar a percepção da marca e dar à campanha um destino útil depois que o público assiste ao vídeo.",
          approach:
            "Conectar direção, edição, estrutura de página e ativos de campanha para a mesma narrativa atravessar os pontos de contato.",
          deliverable:
            "Filme de marca, cortes sociais, visuais de landing page e materiais de campanha prontos para CTA.",
          result: "Uma linha visual do vídeo até a landing page",
          highlights: ["Direção e pós-produção", "Ativos criativos prontos para web", "CTA e caminho de lead alinhados"],
          poster: "/JACOBESTUDIO2.webp",
          videoSrc: "/video1.mp4",
          color: "cyan",
        },
        {
          title: "Mundos Visuais com IA e Testes de Motion",
          category: "IA Generativa / Design / VFX",
          description:
            "Pesquisa visual com IA expandida para motion, conceitos de campanha, personagens e direção de arte cinematográfica.",
          challenge:
            "Explorar rotas visuais mais ricas antes da produção sem travar a tomada de decisão criativa.",
          approach:
            "Usar IA de imagem e vídeo como camada de pré-visualização, depois refinar as melhores rotas com design e motion.",
          deliverable:
            "Moodframes, rotas de prompt, testes de motion e ativos de conceito para planejamento de campanha.",
          result: "Decisão visual mais rápida e com mais alcance",
          highlights: ["Exploração de imagem e vídeo com IA", "Motion e compositing", "Desenvolvimento visual para mundos de campanha"],
          poster: "/JACOBCYBER2.webp",
          videoSrc: "/video2.mp4",
          color: "green",
        },
      ];

  const portfolioHighlights: PortfolioWork[] = isEnglish
    ? [
        {
          title: "CreativeOS",
          group: "ai",
          category: "Digital product",
          platform: "Netlify",
          delivery: "Creative operations MVP",
          description:
            "A public beta workspace for organizing briefs, prompt bases, templates and creative workflows in one panel.",
          href: "https://creativeopsmvp.netlify.app/",
          cta: copy.visitSite,
          caseHref: "/en/cases/creativeos",
          caseCta: "View case",
          image: "/JACOBBRAIN.webp",
          color: "cyan",
        },
        {
          title: "Bandeira Cravada",
          group: "video",
          category: "Music video",
          platform: "YouTube",
          delivery: "Music release",
          description:
            "Audiovisual production for a music launch, with visual direction and digital delivery.",
          href: "https://www.youtube.com/watch?v=MvFCy0EIUWQ",
          embedSrc: "https://www.youtube-nocookie.com/embed/MvFCy0EIUWQ?autoplay=1&rel=0",
          cta: copy.watchHere,
          image: "/JACOBESTUDIO2.webp",
          color: "pink",
        },
        {
          title: "Alan Fuzer - Minha Arte é Minha Vida",
          group: "video",
          category: "Music video",
          platform: "YouTube",
          delivery: "Artist presence",
          description:
            "Music video with artistic narrative and finishing shaped for the artist's digital presence.",
          href: "https://www.youtube.com/watch?v=QuSUc3q5CIk",
          embedSrc: "https://www.youtube-nocookie.com/embed/QuSUc3q5CIk?autoplay=1&rel=0",
          cta: copy.watchHere,
          caseHref: "/en/cases/minha-arte-e-minha-vida",
          caseCta: "View case",
          image: "/portfolio/arte-e-vida.jpg",
          color: "cyan",
        },
        {
          title: "Turismo São Mateus do Sul",
          group: "sites",
          category: "Digital experience",
          platform: "Site",
          delivery: "Tourism portal",
          description:
            "Tourism portal with content organization, visual identity and navigation for territorial promotion.",
          href: "https://turismo.saomateusdosul.pr.gov.br/",
          cta: copy.visitSite,
          caseHref: "/en/cases/tourism-sao-mateus-do-sul",
          caseCta: "View case",
          image: "/portfolio/turismo-onde-fica.jpg",
          color: "green",
        },
        {
          title: "Natal Ouro Verde 2024",
          group: "public",
          category: "Institutional / event",
          platform: "Instagram",
          delivery: "Public event coverage",
          description:
            "Audiovisual content for a public event, designed for social media and community communication.",
          href: "https://www.instagram.com/prefeiturasms/reel/DDHsRAWxVm4/",
          cta: "View on Instagram",
          color: "green",
        },
        {
          title: "Visit of the Consul of Poland in Brazil",
          group: "public",
          category: "Institutional / Polish Culture",
          platform: "YouTube",
          delivery: "Institutional video",
          description:
            "Institutional video produced to document the visit of the Consul of Poland in Brazil, connecting culture, memory and institutional relations.",
          href: "https://youtu.be/7YtPzj7gj8c",
          embedSrc: "https://www.youtube-nocookie.com/embed/7YtPzj7gj8c?autoplay=1&rel=0",
          cta: "Watch video",
          color: "pink",
        },
        {
          title: "Higgsfield / JJ VFX",
          group: "ai",
          category: "Generative AI",
          platform: "Higgsfield",
          delivery: "Visual lab",
          description:
            "AI visual experiments for characters, atmospheres, scenes and cinematic language.",
          href: "https://higgsfield.ai/@jjvfx",
          cta: copy.viewProfile,
          image: "/portfolio/sul-descoberta.jpg",
          color: "cyan",
        },
      ]
    : [
        {
          title: "CreativeOS",
          group: "ai",
          category: "Produto digital",
          platform: "Netlify",
          delivery: "MVP de operação criativa",
          description:
            "Workspace beta público para organizar briefings, prompts base, templates e fluxos criativos em um só painel.",
          href: "https://creativeopsmvp.netlify.app/",
          cta: copy.visitSite,
          caseHref: "/cases/creativeos",
          caseCta: "Ver case",
          image: "/JACOBBRAIN.webp",
          color: "cyan",
        },
        {
          title: "Bandeira Cravada",
          group: "video",
          category: "Videoclipe",
          platform: "YouTube",
          delivery: "Lançamento musical",
          description:
            "Produção audiovisual para lançamento musical, com direção visual e entrega digital.",
          href: "https://www.youtube.com/watch?v=MvFCy0EIUWQ",
          embedSrc: "https://www.youtube-nocookie.com/embed/MvFCy0EIUWQ?autoplay=1&rel=0",
          cta: copy.watchHere,
          image: "/JACOBESTUDIO2.webp",
          color: "pink",
        },
        {
          title: "Alan Fuzer - Minha Arte é Minha Vida",
          group: "video",
          category: "Videoclipe",
          platform: "YouTube",
          delivery: "Presença do artista",
          description:
            "Videoclipe com narrativa artística e acabamento voltado à presença digital do artista.",
          href: "https://www.youtube.com/watch?v=QuSUc3q5CIk",
          embedSrc: "https://www.youtube-nocookie.com/embed/QuSUc3q5CIk?autoplay=1&rel=0",
          cta: copy.watchHere,
          caseHref: "/cases/minha-arte-e-minha-vida",
          caseCta: "Ver case",
          image: "/portfolio/arte-e-vida.jpg",
          color: "cyan",
        },
        {
          title: "Turismo São Mateus do Sul",
          group: "sites",
          category: "Experiência digital",
          platform: "Site",
          delivery: "Portal turístico",
          description:
            "Portal turístico com organização de conteúdo, identidade visual e navegação para divulgação territorial.",
          href: "https://turismo.saomateusdosul.pr.gov.br/",
          cta: copy.visitSite,
          caseHref: "/cases/turismo-sao-mateus-do-sul",
          caseCta: "Ver case",
          image: "/portfolio/turismo-onde-fica.jpg",
          color: "green",
        },
        {
          title: "Natal Ouro Verde 2024",
          group: "public",
          category: "Institucional / evento",
          platform: "Instagram",
          delivery: "Cobertura de evento público",
          description:
            "Conteúdo audiovisual para evento público, pensado para redes sociais e comunicação comunitária.",
          href: "https://www.instagram.com/prefeiturasms/reel/DDHsRAWxVm4/",
          cta: "Ver no Instagram",
          color: "green",
        },
        {
          title: "Visita do Cônsul da Polônia no Brasil",
          group: "public",
          category: "Institucional / Cultura Polonesa",
          platform: "YouTube",
          delivery: "Vídeo institucional",
          description:
            "Vídeo institucional produzido para registrar a visita do Cônsul da Polônia no Brasil, conectando cultura, memória e relações institucionais.",
          href: "https://youtu.be/7YtPzj7gj8c",
          embedSrc: "https://www.youtube-nocookie.com/embed/7YtPzj7gj8c?autoplay=1&rel=0",
          cta: "Assistir vídeo",
          color: "pink",
        },
        {
          title: "Higgsfield / JJ VFX",
          group: "ai",
          category: "IA generativa",
          platform: "Higgsfield",
          delivery: "Laboratório visual",
          description:
            "Experimentos visuais com IA para personagens, atmosferas, cenas e linguagem cinematográfica.",
          href: "https://higgsfield.ai/@jjvfx",
          cta: copy.viewProfile,
          image: "/portfolio/sul-descoberta.jpg",
          color: "cyan",
        },
      ];

  const portfolioArchive: PortfolioWork[] = isEnglish
    ? [
        {
          title: "Fernanda Sardanha - Public Communication",
          group: "campaign",
          category: "Public figure",
          platform: "Instagram",
          delivery: "Campaign reel",
          description: "Political and institutional short-form content for public presence.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DX17zpqRk9w/",
          cta: "View on Instagram",
          color: "pink",
        },
        {
          title: "Fernanda Sardanha - Campaign Presence",
          group: "campaign",
          category: "Public figure",
          platform: "Instagram",
          delivery: "Campaign reel",
          description: "Message rhythm, visibility and social distribution for a public profile.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DWCiCUPCbhy/",
          cta: "View on Instagram",
          color: "pink",
        },
        {
          title: "Fernanda Sardanha - Institutional Agenda",
          group: "campaign",
          category: "Public figure",
          platform: "Instagram",
          delivery: "Campaign reel",
          description: "Short-form institutional communication for campaign channels.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DSqPVJOCala/",
          cta: "View on Instagram",
          color: "pink",
        },
        {
          title: "Natal Ouro Verde",
          group: "events",
          category: "Event",
          platform: "Instagram",
          delivery: "Event reel",
          description: "Social coverage for a public event with community reach.",
          href: "https://www.instagram.com/natalouroverde/reel/DRk0fZXCait/",
          cta: "View on Instagram",
          color: "green",
        },
        {
          title: "Agrosamas 2025",
          group: "events",
          category: "Agro / Event",
          platform: "Instagram",
          delivery: "Event reel",
          description: "Agro-event communication shaped for fast social viewing.",
          href: "https://www.instagram.com/agrosamas2025/reel/DOYvqGCETDD/",
          cta: "View on Instagram",
          color: "green",
        },
        {
          title: "Arena Cultural",
          group: "public",
          category: "Public communication",
          platform: "Instagram",
          delivery: "Institutional reel",
          description: "Cultural agenda coverage for city hall social channels.",
          href: "https://www.instagram.com/prefeiturasms/reel/DFaevmVR1aK/",
          cta: "View on Instagram",
          color: "cyan",
        },
        {
          title: "AI Elderly Care Course",
          group: "public",
          category: "Public communication",
          platform: "Instagram",
          delivery: "Institutional reel",
          description: "Public education content connecting community service and AI.",
          href: "https://www.instagram.com/prefeiturasms/reel/DUJMfLZD4Ch/",
          cta: "View on Instagram",
          color: "cyan",
        },
        {
          title: "Bandeira Cravada",
          group: "sites",
          category: "Website",
          platform: "Site",
          delivery: "Music launch site",
          description: "Focused digital experience for an audiovisual music release.",
          href: "https://oisbandeiracravada.com.br/",
          cta: copy.visitSite,
          color: "pink",
        },
        {
          title: "15 anos Manueli",
          group: "sites",
          category: "Website",
          platform: "Netlify",
          delivery: "Photo delivery site",
          description: "Themed debutante experience for presentation and photo delivery.",
          href: "https://15anosmanueli.netlify.app/",
          cta: copy.visitSite,
          color: "green",
        },
        {
          title: "Skylens Filmes",
          group: "sites",
          category: "Website",
          platform: "Netlify",
          delivery: "Producer website",
          description: "Digital presence for an audiovisual production brand.",
          href: "https://skylensfilmes.netlify.app/",
          cta: copy.visitSite,
          color: "cyan",
        },
        {
          title: "Lillian Murawski Comunicação Estratégica",
          group: "sites",
          category: "Website",
          platform: "Netlify",
          delivery: "Strategy website",
          description: "Strategic communication presence currently in construction.",
          href: "https://lillianmurawskicomunicacaoestrategica.netlify.app/",
          cta: copy.visitSite,
          color: "pink",
        },
      ]
    : [
        {
          title: "Fernanda Sardanha - Comunicação pública",
          group: "campaign",
          category: "Figura pública",
          platform: "Instagram",
          delivery: "Reel de campanha",
          description: "Conteúdo político e institucional em formato curto para presença pública.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DX17zpqRk9w/",
          cta: "Ver no Instagram",
          color: "pink",
        },
        {
          title: "Fernanda Sardanha - Presença de campanha",
          group: "campaign",
          category: "Figura pública",
          platform: "Instagram",
          delivery: "Reel de campanha",
          description: "Ritmo de mensagem, visibilidade e distribuição social para perfil público.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DWCiCUPCbhy/",
          cta: "Ver no Instagram",
          color: "pink",
        },
        {
          title: "Fernanda Sardanha - Agenda institucional",
          group: "campaign",
          category: "Figura pública",
          platform: "Instagram",
          delivery: "Reel de campanha",
          description: "Comunicação institucional curta para canais de campanha.",
          href: "https://www.instagram.com/fernanda_sardanha/reel/DSqPVJOCala/",
          cta: "Ver no Instagram",
          color: "pink",
        },
        {
          title: "Natal Ouro Verde",
          group: "events",
          category: "Evento",
          platform: "Instagram",
          delivery: "Reel de evento",
          description: "Cobertura social de evento público com alcance comunitário.",
          href: "https://www.instagram.com/natalouroverde/reel/DRk0fZXCait/",
          cta: "Ver no Instagram",
          color: "green",
        },
        {
          title: "Agrosamas 2025",
          group: "events",
          category: "Agro / Evento",
          platform: "Instagram",
          delivery: "Reel de evento",
          description: "Comunicação de evento agro pensada para consumo rápido nas redes.",
          href: "https://www.instagram.com/agrosamas2025/reel/DOYvqGCETDD/",
          cta: "Ver no Instagram",
          color: "green",
        },
        {
          title: "Arena Cultural",
          group: "public",
          category: "Comunicação pública",
          platform: "Instagram",
          delivery: "Reel institucional",
          description: "Cobertura de agenda cultural para canais sociais da prefeitura.",
          href: "https://www.instagram.com/prefeiturasms/reel/DFaevmVR1aK/",
          cta: "Ver no Instagram",
          color: "cyan",
        },
        {
          title: "Curso Cuidador de Idoso com IA",
          group: "public",
          category: "Comunicação pública",
          platform: "Instagram",
          delivery: "Reel institucional",
          description: "Conteúdo de educação pública conectando serviço comunitário e IA.",
          href: "https://www.instagram.com/prefeiturasms/reel/DUJMfLZD4Ch/",
          cta: "Ver no Instagram",
          color: "cyan",
        },
        {
          title: "Bandeira Cravada",
          group: "sites",
          category: "Site",
          platform: "Site",
          delivery: "Site de lançamento musical",
          description: "Experiência digital focada para lançamento audiovisual e musical.",
          href: "https://oisbandeiracravada.com.br/",
          cta: copy.visitSite,
          color: "pink",
        },
        {
          title: "15 anos Manueli",
          group: "sites",
          category: "Site",
          platform: "Netlify",
          delivery: "Site de entrega de fotos",
          description: "Experiência temática de debutante para apresentação e entrega de fotos.",
          href: "https://15anosmanueli.netlify.app/",
          cta: copy.visitSite,
          color: "green",
        },
        {
          title: "Skylens Filmes",
          group: "sites",
          category: "Site",
          platform: "Netlify",
          delivery: "Site de produtora",
          description: "Presença digital para marca de produção audiovisual.",
          href: "https://skylensfilmes.netlify.app/",
          cta: copy.visitSite,
          color: "cyan",
        },
        {
          title: "Lillian Murawski Comunicação Estratégica",
          group: "sites",
          category: "Site",
          platform: "Netlify",
          delivery: "Site de estratégia",
          description: "Presença digital para comunicação estratégica em construção.",
          href: "https://lillianmurawskicomunicacaoestrategica.netlify.app/",
          cta: copy.visitSite,
          color: "pink",
        },
      ];

  const portfolioArchiveGroups: PortfolioArchiveGroup[] = isEnglish
    ? [
        {
          label: "Public figure",
          items: portfolioArchive.filter((work) => work.group === "campaign"),
        },
        {
          label: "Sites",
          items: portfolioArchive.filter((work) => work.group === "sites"),
        },
        {
          label: "Events / Agro",
          items: portfolioArchive.filter((work) => work.group === "events"),
        },
        {
          label: "Public communication",
          items: portfolioArchive.filter((work) => work.group === "public"),
        },
      ]
    : [
        {
          label: "Figura pública",
          items: portfolioArchive.filter((work) => work.group === "campaign"),
        },
        {
          label: "Sites",
          items: portfolioArchive.filter((work) => work.group === "sites"),
        },
        {
          label: "Eventos / Agro",
          items: portfolioArchive.filter((work) => work.group === "events"),
        },
        {
          label: "Comunicação pública",
          items: portfolioArchive.filter((work) => work.group === "public"),
        },
      ];

  const experiments: ExperimentItem[] = isEnglish
    ? [
        {
          title: "AI Characters for Campaign Worlds",
          tag: "Image system",
          description: "Character and scene tests for narrative worlds.",
          image: "/JACOBASTRONAUTA.webp",
        },
        {
          title: "Cyber Brand Atmospheres",
          tag: "Look development",
          description: "Lighting, moods and codes for future-facing brands.",
          image: "/JACOBSHIELD2.webp",
        },
        {
          title: "Concept Frames for Pitches",
          tag: "Previsualization",
          description: "Fast visual routes for decks and early direction.",
          image: "/JACOBHORIZONTEDEEVENTOS.webp",
        },
      ]
    : [
        {
          title: "Personagens com IA para Mundos de Campanha",
          tag: "Sistema de imagem",
          description: "Testes de personagem e cena para mundos narrativos.",
          image: "/JACOBASTRONAUTA.webp",
        },
        {
          title: "Atmosferas Cyber para Marca",
          tag: "Desenvolvimento visual",
          description: "Luz, climas e códigos para marcas mais futuristas.",
          image: "/JACOBSHIELD2.webp",
        },
        {
          title: "Frames Conceituais para Apresentações",
          tag: "Pré-visualização",
          description: "Rotas visuais rápidas para decks e direção inicial.",
          image: "/JACOBHORIZONTEDEEVENTOS.webp",
        },
      ];

  const processItems: ProcessItem[] = isEnglish
    ? [
        {
          title: "Position before style",
          description:
            "The look only works when it clarifies the offer, raises perceived value and supports the next action.",
          icon: BrainCircuit,
        },
        {
          title: "Hybrid creative stack",
          description:
            "Camera, edit, design, AI, web and automation are planned as one connected creative pipeline.",
          icon: Layers3,
        },
        {
          title: "Assets built for channels",
          description:
            "Deliverables are prepared for sites, paid media, organic social, decks, internal teams and future reuse.",
          icon: Cpu,
        },
      ]
    : [
        {
          title: "Posição antes da estética",
          description:
            "O visual só funciona quando clareia a oferta, aumenta valor percebido e apoia a próxima ação.",
          icon: BrainCircuit,
        },
        {
          title: "Stack criativo híbrido",
          description:
            "Câmera, edição, design, IA, web e automação são planejados como um pipeline criativo conectado.",
          icon: Layers3,
        },
        {
          title: "Ativos feitos para canais",
          description:
            "As entregas nascem prontas para site, mídia paga, social, decks, equipes internas e reutilização.",
          icon: Cpu,
        },
      ];

  const studioStack = isEnglish
    ? [
        { label: "Audiovisual", icon: Camera },
        { label: "Motion", icon: Film },
        { label: "Design", icon: Palette },
        { label: "Generative AI", icon: Bot },
        { label: "Web", icon: Code2 },
        { label: "Automation", icon: Zap },
      ]
    : [
        { label: "Audiovisual", icon: Camera },
        { label: "Motion", icon: Film },
        { label: "Design", icon: Palette },
        { label: "IA generativa", icon: Bot },
        { label: "Web", icon: Code2 },
        { label: "Automação", icon: Zap },
      ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openVideo = (project: FeaturedProject) => {
    setActiveVideo({
      title: project.title,
      videoSrc: project.videoSrc,
      poster: project.poster,
    });
  };

  const openPortfolioVideo = (work: PortfolioWork) => {
    if (!work.embedSrc) {
      return;
    }

    setActiveVideo({
      title: work.title,
      videoSrc: "",
      iframeSrc: work.embedSrc,
      eyebrow: work.platform,
    });
  };

  const renderExperimentCard = (item: ExperimentItem, index: number, isLead = false) => (
    <NeonCard borderColor={index % 2 === 0 ? "cyan" : "pink"} className="group h-full overflow-hidden p-0">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className={`${isLead ? "aspect-[16/8]" : "aspect-[4/3]"} w-full object-cover saturate-[1.1] transition duration-500 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary backdrop-blur">
          {item.tag}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </NeonCard>
  );

  const renderProjectCard = (work: PortfolioWork, featured = false) => (
    <NeonCard borderColor={work.color} className="group h-full overflow-hidden p-0">
      <div className={featured ? "grid md:grid-cols-2" : "flex h-full flex-col"}>
        <div className="relative overflow-hidden">
          {work.image ? (
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              className={`${featured ? "aspect-[16/10] md:h-full" : "aspect-[16/9]"} w-full object-cover transition duration-500 group-hover:scale-105`}
            />
          ) : (
            <div className={`flex ${featured ? "aspect-[16/10] md:h-full" : "aspect-[16/9]"} flex-col justify-between bg-[radial-gradient(circle_at_24%_18%,rgba(0,229,255,0.14),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(255,43,135,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5`}>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-background/45 text-secondary">
                {work.platform === "Instagram" ? (
                  <Instagram className="h-5 w-5" />
                ) : work.group === "sites" ? (
                  <Globe2 className="h-5 w-5" />
                ) : (
                  <ExternalLink className="h-5 w-5" />
                )}
              </div>
              <p className="max-w-[24ch] text-sm leading-relaxed text-muted-foreground">{work.delivery}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary backdrop-blur">
            {work.category}
          </span>
          {work.embedSrc ? (
            <button
              type="button"
              onClick={() => openPortfolioVideo(work)}
              className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-background/70 text-secondary transition group-hover:border-secondary/60 group-hover:bg-secondary/14"
              aria-label={`${copy.watchHere}: ${work.title}`}
            >
              <Play className="h-4 w-4" fill="currentColor" />
            </button>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
          <div>
            <h3 className={`${featured ? "text-2xl md:text-[1.7rem]" : "text-lg"} leading-tight`}>{work.title}</h3>
            <p className="mt-2 text-sm font-semibold text-foreground/85">{work.delivery}</p>
            {featured ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{work.description}</p>
            ) : null}
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            {work.caseHref ? (
              <Link
                to={work.caseHref}
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/15"
              >
                <Layers3 className="h-4 w-4" />
                {work.caseCta}
              </Link>
            ) : null}
            {work.embedSrc ? (
              <button
                type="button"
                onClick={() => openPortfolioVideo(work)}
                className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2.5 text-sm font-semibold text-secondary transition hover:border-secondary/50 hover:bg-secondary/15"
              >
                <Youtube className="h-4 w-4" />
                {work.cta}
              </button>
            ) : (
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2.5 text-sm font-semibold text-secondary transition hover:border-secondary/50 hover:bg-secondary/15"
              >
                {work.group === "sites" ? <Globe2 className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                {work.cta}
              </a>
            )}
          </div>
        </div>
      </div>
    </NeonCard>
  );

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        {copy.skipLink}
      </a>
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />
      <main id="main-content" className="relative overflow-x-clip pb-24 md:pb-0">
        <div className="pointer-events-none absolute inset-0 -z-10 premium-grid">
          <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-[28rem] h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute left-0 top-[76rem] h-[30rem] w-[30rem] rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute right-[-6rem] top-[128rem] h-[32rem] w-[32rem] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute left-[-8rem] top-[188rem] h-[34rem] w-[34rem] rounded-full bg-secondary/8 blur-3xl" />
          <div className="absolute bottom-[18rem] right-[8%] h-[28rem] w-[28rem] rounded-full bg-accent/6 blur-3xl" />
        </div>

        <section id="hero" className="relative scroll-mt-28 pt-24 md:min-h-[min(92svh,860px)] md:scroll-mt-32 md:pt-28">
          <div className="container">
            <div className="grid items-center gap-8 pb-10 md:gap-12 md:pb-14 lg:grid-cols-[1.04fr_0.96fr]">
              <ScrollReveal className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-[0_0_35px_rgba(0,245,255,0.08)] backdrop-blur">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {copy.hero.badge}
                </div>
                <div className="space-y-5">
                  <h1 className="max-w-5xl text-[2.35rem] leading-[1.03] text-white drop-shadow-[0_0_32px_rgba(255,255,255,0.10)] sm:text-5xl lg:text-7xl">
                    {copy.hero.title}
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-foreground/85 md:text-xl">
                    {copy.hero.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap">
                  <GlowButton size="lg" glowColor="pink" className="col-span-2 border-white/20 bg-gradient-to-r from-primary via-[hsl(335_95%_62%)] to-secondary text-primary-foreground shadow-[0_18px_55px_rgba(255,0,110,0.22)] sm:col-span-1" onClick={() => scrollToSection("contact")}>
                    <Mail className="mr-2 h-5 w-5" />
                    {copy.hero.primaryCta}
                  </GlowButton>
                  <GlowButton size="lg" glowColor="cyan" className="px-4 text-sm sm:px-8 sm:text-lg" onClick={() => openVideo(featuredProjects[0])}>
                    <Play className="mr-2 h-5 w-5" />
                    {copy.hero.secondaryCta}
                  </GlowButton>
                  <button
                    type="button"
                    onClick={() => scrollToSection("projects")}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 px-4 py-4 text-sm font-semibold text-foreground/86 transition hover:border-white/30 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-secondary sm:px-6 sm:text-base"
                  >
                    {copy.hero.tertiaryCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary/8 via-secondary/6 to-accent/6 opacity-70 blur-3xl" />
                  <NeonCard borderColor="cyan" hover={false} className="floating-card relative overflow-hidden p-3 md:p-4">
                    <button
                      type="button"
                      onClick={() => openVideo(featuredProjects[0])}
                      className="group relative block overflow-hidden rounded-[1.35rem] text-left"
                      aria-label={copy.hero.secondaryCta}
                    >
                      <img
                        src={featuredProjects[0].poster}
                        alt={copy.hero.reelLabel}
                        className="aspect-[16/10] w-full object-cover object-center opacity-95 saturate-[0.9] contrast-[1.02] transition duration-500 group-hover:scale-105 md:aspect-[16/13]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-background/10" />
                      <div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/15 bg-background/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary backdrop-blur">
                        {copy.hero.reelLabel}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                        <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
                          {studioStack.slice(0, 4).map((item) => {
                            const Icon = item.icon;
                            return (
                              <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-foreground/86 backdrop-blur">
                                <Icon className="h-3.5 w-3.5 text-secondary" />
                                {item.label}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex items-end justify-between gap-4">
                          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            {copy.hero.reelDescription}
                          </p>
                          <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 transition group-hover:border-secondary/60 group-hover:bg-secondary/14">
                            <Play className="h-5 w-5 text-secondary" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </NeonCard>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/8 pb-8 pt-8 sm:grid-cols-4 lg:pb-12">
              {copy.stats.map((item, index) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className={`text-xl font-semibold ${index % 2 === 0 ? "text-primary/85" : "text-secondary/85"}`}>
                    {item.value}
                  </div>
                  <p className="text-xs leading-snug text-muted-foreground/80">{item.label}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-20 md:scroll-mt-32 md:py-28">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/75">
                {copy.capabilitiesTitle}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.capabilitiesHeading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {copy.capabilitiesDescription}
              </p>
            </ScrollReveal>

            <div className="grid gap-5 md:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 80}>
                    <NeonCard borderColor={item.color} className="flex h-full flex-col">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <h3 className="mt-5 text-xl leading-tight">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      <div className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                        {item.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground/90">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent/80" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </NeonCard>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={120} className="mt-10">
              <div className="cinematic-surface rounded-[1.5rem] p-6 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/70">
                  {copy.workflowStripLabel}
                </p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {workflowItems.map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <span className="text-sm font-semibold leading-none text-secondary/80">{item.step}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/75">{copy.projectsTitle}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.projectsHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{copy.projectsDescription}</p>
            </ScrollReveal>

            <ScrollReveal>{renderProjectCard(portfolioHighlights[0], true)}</ScrollReveal>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {portfolioHighlights.slice(1, 4).map((work, index) => (
                <ScrollReveal key={work.title} delay={index * 70}>
                  {renderProjectCard(work)}
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={120} className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => scrollToSection("archive-selected")}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-sm font-semibold text-foreground/85 transition hover:border-secondary/40 hover:bg-white/5 hover:text-foreground"
              >
                {copy.projectsViewAll}
                <ArrowRight className="h-4 w-4" />
              </button>
            </ScrollReveal>

            <ScrollReveal id="archive-selected" delay={120} className="mt-7">
              <div className="cinematic-surface rounded-[1.5rem] p-4 md:p-5">
                  <div className="grid items-start gap-4 lg:grid-cols-[0.42fr_1.58fr] lg:gap-5">
                    <div className="max-w-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                        {copy.moreWorkTitle}
                    </p>
                    <h3 className="mt-3 text-[1.85rem] leading-[1.08]">{copy.moreWorkHeading}</h3>
                    <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-muted-foreground">
                      {copy.moreWorkDescription}
                    </p>
                  </div>
                    <div className="grid auto-rows-min items-start gap-3 xl:grid-cols-2">
                      {portfolioArchiveGroups.map((group) => (
                        <div key={group.label} className="rounded-2xl border border-white/10 bg-background/45 p-3.5 md:p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary/80">{group.label}</p>
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                              {group.items.length}
                            </span>
                          </div>
                          <div className="mt-3 grid gap-2">
                            {group.items.map((work) => (
                              <a
                                key={`${work.title}-${work.href}`}
                                href={work.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 transition hover:border-secondary/35 hover:bg-secondary/8 sm:flex-row sm:items-center sm:justify-between"
                              >
                                <span className="min-w-0 flex-1">
                                  <span
                                    className="text-clamp-2 block text-sm font-semibold leading-snug text-foreground"
                                  >
                                    {work.title}
                                  </span>
                                  <span
                                    className="text-clamp-2 mt-1 block text-[11px] leading-relaxed text-muted-foreground"
                                  >
                                    {work.category} / {work.delivery}
                                  </span>
                                </span>
                                <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                                  {work.platform === "Instagram" ? (
                                    <Instagram className="h-3.5 w-3.5" />
                                  ) : work.group === "sites" ? (
                                  <Globe2 className="h-3.5 w-3.5" />
                                ) : (
                                  <ExternalLink className="h-3.5 w-3.5" />
                                )}
                                  {work.platform === "Instagram" ? "Instagram" : work.cta}
                                </span>
                              </a>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="experiments" className="scroll-mt-28 py-20 md:scroll-mt-32 md:py-28">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/70">
                {copy.experimentsNote}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.experimentsHeading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {copy.experimentsDescription}
              </p>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {experiments.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 80}>
                  {renderExperimentCard(item, index)}
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={120} className="mt-8 flex justify-center">
              <a
                href="https://higgsfield.ai/@jjvfx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-sm font-semibold text-foreground/85 transition hover:border-secondary/40 hover:bg-white/5 hover:text-foreground"
              >
                {copy.experimentsCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        <section id="process" className="scroll-mt-28 py-20 md:scroll-mt-32 md:py-28">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/70">{copy.processTitle}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.processHeading}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{copy.processDescription}</p>
            </ScrollReveal>
            <ScrollReveal delay={120} className="mx-auto mt-14 grid max-w-4xl gap-x-8 gap-y-8 sm:grid-cols-3">
              {processItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center sm:text-left">
                    <Icon className="mx-auto h-5 w-5 text-primary/80 sm:mx-0" />
                    <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground/85">{item.description}</p>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section id="products" className="scroll-mt-28 py-20 md:scroll-mt-32 md:py-28">
          <div className="container">
            <ScrollReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/70">
                  {productsShowcaseCopy.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{productsShowcaseCopy.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {productsShowcaseCopy.description}
                </p>
              </div>
              <Link
                to={getLocalizedPath("/products", lang)}
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-3.5 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/15 md:px-6 md:text-base"
              >
                {productsShowcaseCopy.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {DIGITAL_PRODUCTS.slice(0, 3).map((product, index) => {
                const title = getLocalizedValue(product.title, lang);
                const shortDescription = getLocalizedValue(product.shortDescription, lang);
                const statusLabel = getLocalizedValue(product.statusLabel, lang);

                return (
                  <ScrollReveal key={product.id} delay={index * 80}>
                    <Link to={getLocalizedPath("/products", lang)} className="block h-full">
                      <NeonCard borderColor={product.accent} className="flex h-full flex-col">
                        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {statusLabel}
                        </span>
                        <h3 className="text-clamp-2 mt-4 text-xl leading-tight">{title}</h3>
                        <p className="text-clamp-3 mt-3 text-sm leading-relaxed text-muted-foreground">
                          {shortDescription}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                          {productsShowcaseCopy.cardCta}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </NeonCard>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <ScrollReveal className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">{copy.contactTitle}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.contactHeading}</h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                    {copy.contactSubheading}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/8 bg-card/40 p-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="mailto:jacobjonson32@gmail.com" className="flex items-center gap-3 transition hover:text-foreground">
                      <Mail className="h-4 w-4 text-primary/80" />
                      <span>
                        <strong className="mr-2 text-foreground/90">{isEnglish ? "Email:" : "E-mail:"}</strong>
                        jacobjonson32@gmail.com
                      </span>
                    </a>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-secondary/80" />
                      <span>
                        <strong className="mr-2 text-foreground/90">{isEnglish ? "Base:" : "Base:"}</strong>
                        São Mateus do Sul, PR
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a href={`https://wa.me/5542988283963?text=${encodeURIComponent(isEnglish ? "Hello! I would like to start a creative studio project." : "Olá! Gostaria de iniciar um projeto criativo com audiovisual, IA e digital.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground/85 transition hover:border-accent/40 hover:text-accent">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                      <a href="https://www.linkedin.com/in/jacob-jonson-portela-742b9a128/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground/85 transition hover:border-secondary/40 hover:text-secondary">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a href="https://www.instagram.com/jacobjonsonportela/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground/85 transition hover:border-primary/40 hover:text-primary">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link to={getLocalizedPath("/products", lang)} className="inline-flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-foreground/85 transition hover:border-secondary/40 hover:text-secondary">
                    {isEnglish ? "Digital products" : "Produtos digitais"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={getLocalizedPath("/ai-automation", lang)} className="inline-flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-foreground/85 transition hover:border-accent/40 hover:text-accent">
                    {isEnglish ? "AI automation" : "Automação IA"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={100}>
                <div className="rounded-[2rem] border border-white/10 bg-card/60 p-1">
                  <div className="rounded-[1.7rem] border border-white/8 bg-background/30 p-4 md:p-5">
                    <div className="mb-5 flex items-center gap-3 px-2">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Send className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl">{copy.projectBriefing}</h3>
                        <p className="text-sm text-muted-foreground">{copy.projectBriefingNote}</p>
                      </div>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-background/80 py-12">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Jacob Jonson</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.footer}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Creative Studio
            </span>
            <span className="inline-flex items-center gap-2">
              <Clapperboard className="h-4 w-4 text-secondary" />
              Audiovisual
            </span>
            <span className="inline-flex items-center gap-2">
              <Workflow className="h-4 w-4 text-accent" />
              {isEnglish ? "Digital systems" : "Sistemas digitais"}
            </span>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex gap-3">
          <a href="#contact" className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-primary via-[hsl(335_95%_62%)] to-secondary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_45px_rgba(255,0,110,0.18)]">
            <Mail className="mr-2 h-4 w-4" />
            {copy.mobileQuote}
          </a>
          <button type="button" onClick={() => openVideo(featuredProjects[0])} className="inline-flex min-w-[7.5rem] items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
            <Play className="mr-2 h-4 w-4" />
            {copy.mobileReel}
          </button>
        </div>
      </div>

      <VideoModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title ?? ""}
        videoSrc={activeVideo?.videoSrc ?? ""}
        poster={activeVideo?.poster}
        iframeSrc={activeVideo?.iframeSrc}
        eyebrow={activeVideo?.eyebrow ?? (isEnglish ? "Showreel & projects" : "Showreel & projetos")}
        closeLabel={isEnglish ? "Close video" : "Fechar vídeo"}
        fallbackText={isEnglish ? "Your browser does not support video playback." : "Seu navegador não suporta reprodução de vídeo."}
      />
    </div>
  );
}
