import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Clapperboard,
  Code2,
  Cpu,
  Film,
  Frame,
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

interface ProcessArtifact {
  label: string;
  title: string;
  description: string;
}

export default function Home() {
  const { lang } = useI18n();
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    videoSrc: string;
    poster?: string;
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
          "Jacob Jonson | AI Creative Studio para Audiovisual, IA e Experiencias Digitais",
        description:
          "Direcao criativa, audiovisual cinematografico, IA generativa, design, web e automacao para marcas que precisam de presenca digital mais forte.",
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
          { value: "60+", label: "videos, campaigns and digital assets delivered" },
          { value: "AI", label: "image, video and concept workflows" },
          { value: "WEB", label: "landing pages, systems and automation flows" },
        ],
        capabilitiesTitle: "What I Do",
        capabilitiesHeading: "A hybrid studio for the visual, digital and automation layer",
        capabilitiesDescription:
          "The work connects creative direction, film production, generative AI, brand design, web interfaces and practical automation without splitting the project into disconnected pieces.",
        workflowTitle: "AI Creative Workflow",
        workflowHeading: "From raw idea to launch-ready assets",
        workflowDescription:
          "AI is used for exploration, previsualization and speed. Direction, judgment and final polish stay human.",
        projectsTitle: "Cases / Selected Projects",
        projectsHeading: "Selected work across film, AI visuals and digital launch assets",
        projectsDescription:
          "A short view of how the studio turns narrative, visual direction and digital execution into usable campaign material.",
        experimentsTitle: "Experiments",
        experimentsHeading: "A creative lab for AI image, motion and interface language",
        experimentsDescription:
          "Tests in characters, scenes, worlds, UI moods and motion ideas that can become campaigns, assets or visual systems.",
        processTitle: "Behind the Process",
        processHeading: "The thinking behind the finished asset",
        processDescription:
          "Before production, the project gets positioning, references and a delivery map. The output is cinematic, but built for channels, teams and next actions.",
        contactTitle: "Build the next visual system",
        contactHeading:
          "If the project needs film, AI, design and digital execution in the same direction, let's shape the brief.",
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
        skipLink: "Pular para o conteudo",
        hero: {
          badge: "AI Creative Studio / Filme + IA + Design + Automacao",
          title: "Filme, IA e sistemas digitais para marcas com presenca.",
          description:
            "Direciono e construo conteudo cinematografico, visuais generativos, landing pages, ativos de marca e fluxos de automacao com uma linha criativa clara.",
          primaryCta: "Iniciar briefing",
          secondaryCta: "Assistir showreel",
          tertiaryCta: "Explorar cases",
          reelLabel: "Showreel do studio",
          reelDescription:
            "Direcao, ritmo, imagem com IA, motion e acabamento em um corte curto.",
        },
        stats: [
          { value: "15+", label: "anos entre filme, conteudo e comunicacao" },
          { value: "60+", label: "videos, campanhas e ativos digitais entregues" },
          { value: "IA", label: "workflows de imagem, video e conceito" },
          { value: "WEB", label: "landing pages, sistemas e fluxos de automacao" },
        ],
        capabilitiesTitle: "What I Do",
        capabilitiesHeading: "Um studio hibrido para a camada visual, digital e automatizada",
        capabilitiesDescription:
          "O trabalho conecta direcao criativa, producao audiovisual, IA generativa, design de marca, interfaces web e automacoes praticas sem quebrar o projeto em partes soltas.",
        workflowTitle: "AI Creative Workflow",
        workflowHeading: "Da ideia bruta ao sistema criativo utilizavel",
        workflowDescription:
          "A IA entra para explorar, pre-visualizar e acelerar. Direcao, criterio e acabamento final continuam humanos.",
        projectsTitle: "Cases / Selected Projects",
        projectsHeading: "Trabalhos selecionados entre filme, visuais com IA e ativos de lancamento",
        projectsDescription:
          "Um recorte de como o studio transforma narrativa, direcao visual e execucao digital em material util para campanha.",
        experimentsTitle: "Experiments",
        experimentsHeading: "Laboratorio criativo de imagem com IA, motion e interfaces",
        experimentsDescription:
          "Testes de personagens, cenas, mundos, climas de interface e ideias de motion que podem virar campanha, ativo ou sistema visual.",
        processTitle: "Behind the Process",
        processHeading: "O pensamento antes do ativo final",
        processDescription:
          "Antes de produzir, o projeto ganha posicionamento, referencias e mapa de entrega. O resultado e cinematografico, mas nasce pronto para canais, equipes e proximas acoes.",
        contactTitle: "Construa o proximo sistema visual",
        contactHeading:
          "Se o projeto precisa unir filme, IA, design e execucao digital na mesma direcao, vamos organizar o briefing.",
        footer:
          "AI Creative Studio para conteudo cinematografico, experiencias digitais, visuais generativos e ativos de marca prontos para automacao.",
        seeVideo: "Assistir case",
        backToTop: "Voltar ao topo",
        projectBriefing: "Briefing do projeto",
        projectBriefingNote: "Conte o objetivo, os canais, referencias e o que precisa mudar na percepcao.",
        mobileQuote: "Briefing",
        mobileReel: "Showreel",
        bestFit: "Mais indicado para",
        workflowNote: "Stack central do studio",
      };

  const audienceTags = isEnglish
    ? [
        "Brands that need premium perception",
        "Launches that need film and web",
        "Founders and communication teams",
        "Agencies needing hybrid execution",
        "Institutions updating their public image",
      ]
    : [
        "Marcas que precisam de percepcao premium",
        "Lancamentos que precisam de filme e web",
        "Fundadores e equipes de comunicacao",
        "Agencias que precisam de execucao hibrida",
        "Instituicoes atualizando imagem publica",
      ];

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
          title: "Conteudo cinematografico e direcao criativa",
          description:
            "Filmes de marca, pecas de campanha e edicoes guiadas por estrategia, ritmo e linguagem visual precisa.",
          bullets: ["Conceito, apoio de roteiro e direcao", "Edicao, motion e finalizacao", "Drone, VFX, cor e tratamento de som"],
          icon: Clapperboard,
          color: "pink",
        },
        {
          title: "IA generativa para imagens, video e conceito",
          description:
            "Desenvolvimento visual com IA para cenas, personagens, boards, mundos de campanha e testes criativos rapidos.",
          bullets: ["Direcao de prompt e look development", "Workflows de imagem e video com IA", "Pacotes de pre-visualizacao para decisao"],
          icon: WandSparkles,
          color: "cyan",
        },
        {
          title: "Sistemas de marca, experiencias web e automacao",
          description:
            "Landing pages, ativos digitais e fluxos de automacao que carregam a ideia depois que o video e publicado.",
          bullets: ["Identidade visual e ativos de campanha", "Landing pages e interfaces digitais", "Automacoes com IA para briefings, leads e operacao"],
          icon: Workflow,
          color: "green",
        },
      ];

  const workflowItems: WorkflowItem[] = isEnglish
    ? [
        {
          step: "01",
          title: "Positioning and brief",
          description:
            "Define the objective, audience, tone, channels and the perception the project needs to create.",
        },
        {
          step: "02",
          title: "AI exploration and visual route",
          description:
            "Create moodframes, prompt routes, boards and references before locking the production path.",
        },
        {
          step: "03",
          title: "Production, edit and design",
          description:
            "Film, edit, design and build assets with one language across video, image, web and social.",
        },
        {
          step: "04",
          title: "Launch assets and automation",
          description:
            "Prepare campaign versions, landing-page modules, forms, lead flows and repeatable content support.",
        },
      ]
    : [
        {
          step: "01",
          title: "Posicionamento e briefing",
          description:
            "Definimos objetivo, publico, tom, canais e a percepcao que o projeto precisa criar.",
        },
        {
          step: "02",
          title: "Exploracao com IA e rota visual",
          description:
            "Criamos moodframes, rotas de prompt, boards e referencias antes de fechar o caminho de producao.",
        },
        {
          step: "03",
          title: "Producao, edicao e design",
          description:
            "Filmamos, editamos, desenhamos e construimos ativos com uma linguagem unica para video, imagem, web e social.",
        },
        {
          step: "04",
          title: "Ativos de lancamento e automacao",
          description:
            "Preparamos versoes de campanha, modulos de landing page, formularios, fluxos de lead e apoio de conteudo.",
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
          title: "Showreel de Assinatura do Studio",
          category: "Filme / Motion / Direcao Criativa",
          description:
            "Uma prova rapida da linguagem do studio: enquadramento, ritmo, drone, edicao, motion e acabamento.",
          challenge:
            "Mostrar rapidamente que o trabalho vai alem da captacao de video e sustenta um posicionamento criativo mais forte.",
          approach:
            "Curadoria de fragmentos cinematograficos em um reel curto, com ritmo, contraste e autoridade visual.",
          deliverable:
            "Reel hero, ativo de pitch e referencia visual para campanhas e propostas futuras.",
          result: "Primeira impressao mais forte para clientes e parceiros",
          highlights: ["Ritmo cinematografico", "Ativo pronto para pitch", "Posicionamento claro do studio"],
          poster: "/JACOBCYBER1.webp",
          videoSrc: "/showreel.mp4",
          color: "pink",
        },
        {
          title: "Brand Film com Camada Digital",
          category: "Audiovisual / Web / Conversao",
          description:
            "Conteudo de marca pensado para ir alem do filme principal: site, landing page, social e material comercial.",
          challenge:
            "Elevar a percepcao da marca e dar a campanha um destino util depois que o publico assiste ao video.",
          approach:
            "Conectar direcao, edicao, estrutura de pagina e ativos de campanha para a mesma narrativa atravessar os pontos de contato.",
          deliverable:
            "Brand film, cortes sociais, visuais de landing page e materiais de campanha prontos para CTA.",
          result: "Uma linha visual do video ate a landing page",
          highlights: ["Direcao e pos-producao", "Ativos criativos prontos para web", "CTA e caminho de lead alinhados"],
          poster: "/JACOBESTUDIO2.webp",
          videoSrc: "/video1.mp4",
          color: "cyan",
        },
        {
          title: "Mundos Visuais com IA e Testes de Motion",
          category: "IA Generativa / Design / VFX",
          description:
            "Pesquisa visual com IA expandida para motion, conceitos de campanha, personagens e direcao de arte cinematografica.",
          challenge:
            "Explorar rotas visuais mais ricas antes da producao sem travar a tomada de decisao criativa.",
          approach:
            "Usar IA de imagem e video como camada de pre-visualizacao, depois refinar as melhores rotas com design e motion.",
          deliverable:
            "Moodframes, rotas de prompt, testes de motion e ativos de conceito para planejamento de campanha.",
          result: "Decisao visual mais rapida e com mais alcance",
          highlights: ["Exploracao de imagem e video com IA", "Motion e compositing", "Look development para mundos de campanha"],
          poster: "/JACOBCYBER2.webp",
          videoSrc: "/video2.mp4",
          color: "green",
        },
      ];

  const experiments: ExperimentItem[] = isEnglish
    ? [
        {
          title: "AI Characters for Campaign Worlds",
          tag: "Image system",
          description: "Character and scene tests for campaigns, covers, short films and narrative assets.",
          image: "/JACOBASTRONAUTA.webp",
        },
        {
          title: "Cyber Brand Atmospheres",
          tag: "Look development",
          description: "Lighting, interface moods and visual codes for brands that need a sharper future-facing language.",
          image: "/JACOBCYBER2.webp",
        },
        {
          title: "Concept Frames for Pitches",
          tag: "Previsualization",
          description: "Fast visual routes for pitch decks, landing pages, thumbnails and early story direction.",
          image: "/JACOBHORIZONTEDEEVENTOS.webp",
        },
        {
          title: "AI Portrait and Avatar Systems",
          tag: "Brand presence",
          description: "Stylized portraits and avatars for campaigns, social identity and digital presence.",
          image: "/JACOBTRONO1.webp",
        },
      ]
    : [
        {
          title: "Personagens com IA para Mundos de Campanha",
          tag: "Sistema de imagem",
          description: "Testes de personagem e cena para campanhas, capas, filmes curtos e ativos narrativos.",
          image: "/JACOBASTRONAUTA.webp",
        },
        {
          title: "Atmosferas Cyber para Marca",
          tag: "Look development",
          description: "Luz, climas de interface e codigos visuais para marcas que precisam de uma linguagem mais futurista.",
          image: "/JACOBCYBER2.webp",
        },
        {
          title: "Concept Frames para Pitches",
          tag: "Pre-visualizacao",
          description: "Rotas visuais rapidas para pitch decks, landing pages, thumbnails e direcao inicial de narrativa.",
          image: "/JACOBHORIZONTEDEEVENTOS.webp",
        },
        {
          title: "Sistemas de Retrato e Avatar com IA",
          tag: "Presenca de marca",
          description: "Retratos estilizados e avatares para campanhas, identidade social e presenca digital.",
          image: "/JACOBTRONO1.webp",
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
          title: "Posicao antes da estetica",
          description:
            "O visual so funciona quando clareia a oferta, aumenta valor percebido e apoia a proxima acao.",
          icon: BrainCircuit,
        },
        {
          title: "Stack criativo hibrido",
          description:
            "Camera, edicao, design, IA, web e automacao sao planejados como um pipeline criativo conectado.",
          icon: Layers3,
        },
        {
          title: "Ativos feitos para canais",
          description:
            "As entregas nascem prontas para site, midia paga, social, decks, equipes internas e reutilizacao.",
          icon: Cpu,
        },
      ];

  const processArtifacts: ProcessArtifact[] = isEnglish
    ? [
        {
          label: "Inputs",
          title: "Offer, audience, channels",
          description: "Brief, perception target, tone, references, competitors and launch context.",
        },
        {
          label: "AI Lab",
          title: "Moodframes and prompt routes",
          description: "Concept frames, visual territories, character tests, scene ideas and campaign boards.",
        },
        {
          label: "Production",
          title: "Film, edit, motion, design",
          description: "Capture, post-production, motion treatments, web modules and brand assets.",
        },
        {
          label: "Delivery",
          title: "Launch-ready asset system",
          description: "Final videos, social cuts, landing visuals, lead paths and reusable creative rules.",
        },
      ]
    : [
        {
          label: "Inputs",
          title: "Oferta, publico, canais",
          description: "Briefing, alvo de percepcao, tom, referencias, concorrentes e contexto de lancamento.",
        },
        {
          label: "AI Lab",
          title: "Moodframes e rotas de prompt",
          description: "Frames de conceito, territorios visuais, testes de personagem, cenas e boards.",
        },
        {
          label: "Producao",
          title: "Filme, edicao, motion, design",
          description: "Captacao, pos-producao, tratamentos de motion, modulos web e ativos de marca.",
        },
        {
          label: "Entrega",
          title: "Sistema de ativos pronto para lancar",
          description: "Videos finais, cortes sociais, visuais de landing page, fluxos de lead e regras criativas reutilizaveis.",
        },
      ];

  const studioStack = [
    { label: "Audiovisual", icon: Camera },
    { label: "Motion", icon: Film },
    { label: "Design", icon: Palette },
    { label: "Generative AI", icon: Bot },
    { label: "Web", icon: Code2 },
    { label: "Automation", icon: Zap },
  ];

  const contactInfo = isEnglish
    ? [
        "Creative direction, production and digital execution in one workflow",
        "Remote collaboration and on-location production in Brazil or internationally",
        "Proposal shaped around scope, channels, assets and launch needs",
      ]
    : [
        "Direcao criativa, producao e execucao digital no mesmo fluxo",
        "Colaboracao remota e producao presencial no Brasil ou exterior",
        "Proposta montada por escopo, canais, ativos e necessidade de lancamento",
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        </div>

        <section id="hero" className="relative scroll-mt-28 pt-24 md:min-h-[92vh] md:scroll-mt-32 md:pt-28">
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
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/16 via-secondary/10 to-accent/10 blur-2xl" />
                  <NeonCard borderColor="cyan" className="floating-card relative overflow-hidden p-3 md:p-4">
                    <button
                      type="button"
                      onClick={() => openVideo(featuredProjects[0])}
                      className="group relative block overflow-hidden rounded-[1.35rem] text-left"
                      aria-label={copy.hero.secondaryCta}
                    >
                      <img
                        src={featuredProjects[0].poster}
                        alt={copy.hero.reelLabel}
                        className="aspect-[16/10] w-full object-cover object-center saturate-[1.12] contrast-[1.06] transition duration-500 group-hover:scale-105 md:aspect-[4/5]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
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
            <div className="grid gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
              {copy.stats.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 60}>
                  <div className="cinematic-surface rounded-2xl p-4">
                    <div className={index % 2 === 0 ? "text-2xl font-bold text-primary" : "text-2xl font-bold text-secondary"}>
                      {item.value}
                    </div>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">{item.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
              <ScrollReveal className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/75">
                  {copy.capabilitiesTitle}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl">{copy.capabilitiesHeading}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{copy.capabilitiesDescription}</p>
                <div className="cinematic-surface rounded-[1.5rem] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">
                    {copy.bestFit}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {audienceTags.map((audience) => (
                      <span key={audience} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              <div className="grid gap-6">
                {capabilities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.title} delay={index * 80}>
                      <NeonCard borderColor={item.color} className="h-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                          <div>
                            <div className="mb-5 flex items-center justify-between gap-3">
                              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                <Icon className="h-5 w-5 text-secondary" />
                              </div>
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/62">
                                {(isEnglish
                                  ? ["Direction", "AI lab", "Digital layer"]
                                  : ["Direcao", "AI lab", "Camada digital"])[index]}
                              </span>
                            </div>
                            <h3 className="text-2xl">{item.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                          </div>
                          <div className="space-y-3">
                            {item.bullets.map((bullet) => (
                              <div key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </NeonCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr]">
              <ScrollReveal className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                  {copy.workflowTitle}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl">{copy.workflowHeading}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{copy.workflowDescription}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {workflowItems.map((item, index) => (
                    <NeonCard key={item.step} borderColor={index % 2 === 0 ? "pink" : "cyan"} className="relative h-full overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-secondary/45 to-transparent" />
                      <div className="flex items-start gap-4">
                        <div className="text-2xl font-bold leading-none text-primary/90">{item.step}</div>
                        <div>
                          <h3 className="text-xl">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </NeonCard>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={120}>
                <NeonCard borderColor="green" className="overflow-hidden lg:sticky lg:top-28">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,245,255,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,0,110,0.10),transparent_32%)]" />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                      {copy.workflowNote}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {studioStack.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-background/45 p-4">
                            <Icon className="h-5 w-5 text-secondary" />
                            <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-3">
                        <Frame className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
                          {isEnglish ? "Output" : "Saida"}
                        </p>
                      </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {isEnglish
                          ? "Films, campaign visuals, web pages, AI assets, motion pieces, landing-page modules and repeatable creative workflows."
                          : "Filmes, visuais de campanha, paginas web, ativos com IA, pecas de motion, modulos de landing page e workflows criativos reutilizaveis."}
                      </p>
                    </div>
                  </div>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/75">{copy.projectsTitle}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.projectsHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{copy.projectsDescription}</p>
            </ScrollReveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 90}>
                  <NeonCard borderColor={project.color} className="h-full overflow-hidden p-0">
                    <button type="button" onClick={() => openVideo(project)} className="group block h-full text-left">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.poster}
                          alt={project.title}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="aspect-[16/11] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
                        <div className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-background/70 text-secondary transition group-hover:border-secondary/60 group-hover:bg-secondary/14">
                          <Play className="h-4 w-4" fill="currentColor" />
                        </div>
                      </div>
                      <div className="space-y-5 p-5 md:p-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary/80">{project.category}</p>
                          <h3 className="mt-3 text-2xl">{project.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                        </div>
                        <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-4 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                          <span className="mr-2 text-secondary">{isEnglish ? "Outcome:" : "Resultado:"}</span>
                          {project.result}
                        </div>
                        <div className="grid gap-3">
                          {[
                            [isEnglish ? "Challenge" : "Desafio", project.challenge],
                            [isEnglish ? "Studio response" : "Resposta do studio", project.approach],
                            [isEnglish ? "Deliverable" : "Entrega", project.deliverable],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-2xl border border-white/10 bg-background/45 p-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/75">{label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {project.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                          {copy.seeVideo}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  </NeonCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experiments" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <ScrollReveal className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                  {copy.experimentsTitle}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl">{copy.experimentsHeading}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{copy.experimentsDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {(isEnglish
                    ? ["AI video", "Concept frames", "Motion", "Brand systems", "Interfaces"]
                    : ["Video com IA", "Concept frames", "Motion", "Sistemas de marca", "Interfaces"]).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
              <div className="grid gap-5 md:grid-cols-2">
                {experiments.map((item, index) => (
                  <ScrollReveal key={item.title} delay={index * 80} className={index === 0 ? "md:col-span-2" : ""}>
                    <NeonCard borderColor={index % 2 === 0 ? "cyan" : "pink"} className="group h-full overflow-hidden p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className={`${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"} w-full object-cover saturate-[1.1] transition duration-500 group-hover:scale-105`}
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
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary/75">{copy.processTitle}</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.processHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{copy.processDescription}</p>
            </ScrollReveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {processItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 90}>
                    <NeonCard borderColor={index === 1 ? "cyan" : index === 2 ? "green" : "pink"} className="h-full">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-5 text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </NeonCard>
                  </ScrollReveal>
                );
              })}
            </div>
            <ScrollReveal delay={120} className="mt-8">
              <div className="cinematic-surface relative overflow-hidden rounded-[1.5rem] p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
                <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
                      {isEnglish ? "Creative operating system" : "Sistema operacional criativo"}
                    </p>
                    <h3 className="mt-4 text-2xl md:text-3xl">
                      {isEnglish ? "The output is designed to be reused, adapted and extended." : "A entrega nasce para ser reutilizada, adaptada e expandida."}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {isEnglish
                        ? "Instead of isolated files, the process creates assets, rules and decisions that can feed the next film, page, campaign or automation."
                        : "Em vez de arquivos isolados, o processo cria ativos, regras e decisoes que alimentam o proximo filme, pagina, campanha ou automacao."}
                    </p>
                  </div>
                  <div className="relative grid gap-3 md:grid-cols-4">
                    {processArtifacts.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-background/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary/80">{item.label}</p>
                        <h4 className="mt-3 text-base leading-tight">{item.title}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <ScrollReveal className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">{copy.contactTitle}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.contactHeading}</h2>
                </div>
                <NeonCard borderColor="cyan">
                  <div className="space-y-4">
                    {contactInfo.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </NeonCard>
                <NeonCard borderColor="pink">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="mailto:jacobjonson32@gmail.com" className="flex items-center gap-3 transition hover:text-foreground">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>
                        <strong className="mr-2 text-foreground">{isEnglish ? "Email:" : "E-mail:"}</strong>
                        jacobjonson32@gmail.com
                      </span>
                    </a>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>
                        <strong className="mr-2 text-foreground">{isEnglish ? "Base:" : "Base:"}</strong>
                        Sao Mateus do Sul, PR
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a href={`https://wa.me/5542988283963?text=${encodeURIComponent(isEnglish ? "Hello! I would like to start a creative studio project." : "Ola! Gostaria de iniciar um projeto criativo com audiovisual, IA e digital.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:text-accent">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                      <a href="https://www.linkedin.com/in/jacob-jonson-portela-742b9a128/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-secondary/50 hover:text-secondary">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a href="https://www.instagram.com/jacobjonsonportela/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </div>
                  </div>
                </NeonCard>
                <NeonCard borderColor="green">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link to={getLocalizedPath("/digital-assets", lang)} className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:border-secondary/40 hover:text-secondary">
                      {isEnglish ? "Digital assets" : "Ativos digitais"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to={getLocalizedPath("/ai-automation", lang)} className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:border-accent/40 hover:text-accent">
                      {isEnglish ? "AI automation" : "Automacao IA"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </NeonCard>
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

      <button type="button" onClick={scrollToTop} className="fixed bottom-24 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-background/75 text-foreground transition hover:border-primary/40 hover:text-primary md:inline-flex" aria-label={copy.backToTop}>
        <ArrowUp className="h-5 w-5" />
      </button>

      <VideoModal isOpen={Boolean(activeVideo)} onClose={() => setActiveVideo(null)} title={activeVideo?.title ?? ""} videoSrc={activeVideo?.videoSrc ?? ""} poster={activeVideo?.poster} />
    </div>
  );
}
