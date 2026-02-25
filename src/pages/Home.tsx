import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Plane as Drone, 
  Sparkles, 
  Play, 
  Mail, 
  Linkedin, 
  Instagram, 
  ChevronDown,
  ArrowUp,
  Briefcase,
  Brain,
  Cpu,
  FileText,
  Clapperboard,
  Send,
  Code,
  Globe,
  Monitor,
  Layout,
  Bot,
  Layers,
  Star,
  Check,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import VideoModal from "@/components/VideoModal";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Lightbox from "@/components/Lightbox";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";
import { useI18n } from "@/i18n";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Yet Another React Lightbox
import YARLightbox from "yet-another-react-lightbox";
import YARVideo from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

// Imagens da galeria de IA
const aiGalleryImages = [
  { src: '/JACOBASTRONAUTA.webp', title: 'Astronauta' },
  { src: '/JACOBBRAIN.webp', title: 'Neural' },
  { src: '/JACOBTRONO1.webp', title: 'Trono Futurista' },
  { src: '/JACOBESTUDIO.webp', title: 'Estúdio' },
  { src: '/JACOBJUMP1.webp', title: 'Salto Dimensional' },
  { src: '/JACOBTIME.webp', title: 'Viajante do Tempo' },
  { src: '/JACOBHORIZONTEDEEVENTOS.webp', title: 'Horizonte de Eventos' },
  { src: '/JACOBMULHERCYBER.webp', title: 'Cyber' },
  { src: '/JACOBCYBER1.webp', title: 'Cyberpunk Street' },
  { src: '/JACOBCYBER2.webp', title: 'Neon Rain' },
  { src: '/JACOBSHIELD1.webp', title: 'Force Shield' },
  { src: '/JACOBSHIELD2.webp', title: 'Energy Barrier' },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoId: string; title: string }>({ 
    isOpen: false, 
    videoId: '', 
    title: '' 
  });
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; currentIndex: number }>({
    isOpen: false,
    currentIndex: 0
  });
  
  // Estado para o Video Lightbox (yet-another-react-lightbox)
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { t, lang } = useI18n();
  
  // Array de vídeos para o Lightbox
  const videoSlides = [
    {
      type: "video" as const,
      width: 1080,
      height: 1920,
      poster: "/IDEIA.webp",
      sources: [
        {
          src: "/showreel.mp4",
          type: "video/mp4",
        },
      ],
    },
    {
      type: "video" as const,
      width: 1920,
      height: 1080,
      poster: "/JACOBCYBER1.webp",
      sources: [
        {
          src: "/video1.mp4",
          type: "video/mp4",
        },
      ],
    },
    {
      type: "video" as const,
      width: 1920,
      height: 1080,
      poster: "/JACOBSHIELD1.webp",
      sources: [
        {
          src: "/video2.mp4",
          type: "video/mp4",
        },
      ],
    },
  ];
  
  const tagline = t('hero.tagline');

  useEffect(() => {
    setIsVisible(true);
    setTypedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index <= tagline.length) {
        setTypedText(tagline.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [lang]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.3');
        const rect = el.getBoundingClientRect();
        const offsetY = (rect.top + scrollY) - scrollY;
        el.style.transform = `translateY(${offsetY * speed * -0.1}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, currentIndex: index });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skillCategories = [
    {
      category: t('skills.cat.audiovisual'),
      color: 'pink' as const,
      icon: Camera,
      items: [
        { name: 'Premiere Pro', icon: Play },
        { name: 'After Effects', icon: Sparkles },
        { name: 'CapCut', icon: Clapperboard },
        { name: 'Photoshop', icon: Layers },
      ],
    },
    {
      category: t('skills.cat.ai'),
      color: 'cyan' as const,
      icon: Brain,
      items: [
        { name: 'Claude Code', icon: Bot },
        { name: 'Gemini', icon: Brain },
        { name: 'Adobe Firefly', icon: Sparkles },
        { name: 'Cursor', icon: Code },
      ],
    },
    {
      category: t('skills.cat.dev'),
      color: 'green' as const,
      icon: Code,
      items: [
        { name: t('skills.websites'), icon: Globe },
        { name: t('skills.systems'), icon: Monitor },
        { name: 'React / Next.js', icon: Layout },
        { name: 'TypeScript', icon: Code },
      ],
    },
  ];

  const projects = [
    {
      title: t('projects.showreel.title'),
      category: "Drone",
      description: t('projects.showreel.desc'),
      image: "/hero_background.png",
      color: "cyan" as const,
      videoId: "dQw4w9WgXcQ",
    },
    {
      title: t('projects.agro.title'),
      category: lang === 'en' ? "Agribusiness" : "Agronegócio",
      description: t('projects.agro.desc'),
      image: "/drone_icon.png",
      color: "green" as const,
      videoId: "dQw4w9WgXcQ",
    },
    {
      title: t('projects.motion.title'),
      category: "Motion",
      description: t('projects.motion.desc'),
      image: "/ai_brain_icon.png",
      color: "pink" as const,
      videoId: "dQw4w9WgXcQ",
    },
    {
      title: t('projects.events.title'),
      category: lang === 'en' ? "Institutional" : "Institucional",
      description: t('projects.events.desc'),
      image: "/cinema_camera_icon.png",
      color: "yellow" as const,
      videoId: "dQw4w9WgXcQ",
    },
  ];

  const experiences = [
    {
      title: t('exp.dev.title'),
      company: t('exp.dev.company'),
      period: t('exp.dev.period'),
      description: t('exp.dev.desc'),
      icon: Code,
      color: "cyan" as const,
    },
    {
      title: t('exp.pr.title'),
      company: t('exp.pr.company'),
      period: t('exp.pr.period'),
      description: t('exp.pr.desc'),
      icon: Briefcase,
      color: "pink" as const,
    },
    {
      title: t('exp.filmmaker.title'),
      company: t('exp.filmmaker.company'),
      period: t('exp.filmmaker.period'),
      description: t('exp.filmmaker.desc'),
      icon: Camera,
      color: "green" as const,
    },
    {
      title: t('exp.founder.title'),
      company: t('exp.founder.company'),
      period: t('exp.founder.period'),
      description: t('exp.founder.desc'),
      icon: Drone,
      color: "yellow" as const,
    },
    {
      title: t('exp.editor.title'),
      company: t('exp.editor.company'),
      period: t('exp.editor.period'),
      description: t('exp.editor.desc'),
      icon: Play,
      color: "pink" as const,
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />
      <ParticleBackground />
      
      {/* Preloader */}
      <Preloader />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          data-parallax="0.4"
          className="absolute inset-0 w-full h-full object-cover opacity-15 scale-110"
        >
          <source src="/showreel.mp4" type="video/mp4" />
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="container relative z-10 text-center space-y-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[rgb(255,0,110)] via-[rgb(0,245,255)] to-[rgb(57,255,20)] bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            <h2 className="text-lg md:text-2xl text-foreground/70 font-light max-w-3xl mx-auto mb-4">
              {t('hero.subtitle')}
            </h2>
            <div className="h-12 flex items-center justify-center">
              <p className="text-base md:text-lg text-primary/80 font-mono">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <GlowButton 
              size="lg" 
              glowColor="pink"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-5 w-5" />
              {t('hero.cta.contact')}
            </GlowButton>
            <GlowButton 
              size="lg" 
              glowColor="cyan"
              onClick={() => scrollToSection('projects')}
            >
              <Play className="mr-2 h-5 w-5" />
              {t('hero.cta.projects')}
            </GlowButton>
          </div>

          <button 
            onClick={() => scrollToSection('about')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-primary" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative pt-8 pb-24 bg-background/50 backdrop-blur-sm">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <NeonCard borderColor="pink" className="space-y-6">
                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{
                  __html: t('about.p1')
                    .replace('<highlight1>', '<span class="text-primary font-semibold">')
                    .replace('</highlight1>', '</span>')
                }} />
                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{
                  __html: t('about.p2')
                    .replace('<highlight2>', '<span class="text-secondary font-semibold">')
                    .replace('</highlight2>', '</span>')
                    .replace('<highlight3>', '<span class="text-accent font-semibold">')
                    .replace('</highlight3>', '</span>')
                }} />
                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{
                  __html: t('about.p3')
                    .replace('<highlight1>', '<span class="text-primary font-semibold">')
                    .replace('</highlight1>', '</span>')
                    .replace('<highlight2>', '<span class="text-secondary font-semibold">')
                    .replace('</highlight2>', '</span>')
                }} />
              </NeonCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="grid grid-cols-2 gap-6">
                <NeonCard borderColor="cyan" className="text-center">
                  <AnimatedCounter end={15} suffix="+" className="text-4xl font-bold text-secondary mb-2 block" />
                  <div className="text-sm text-muted-foreground">{t("about.stats.years")}</div>
                </NeonCard>
                <NeonCard borderColor="green" className="text-center">
                  <AnimatedCounter end={60} suffix="+" className="text-4xl font-bold text-accent mb-2 block" />
                  <div className="text-sm text-muted-foreground">{t("about.stats.projects")}</div>
                </NeonCard>
                <NeonCard borderColor="yellow" className="text-center">
                  <AnimatedCounter end={6} className="text-4xl font-bold text-[rgb(255,214,10)] mb-2 block" />
                  <div className="text-sm text-muted-foreground">{t("about.stats.jjp")}</div>
                </NeonCard>
                <NeonCard borderColor="pink" className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">{t("about.stats.ideas")}</div>
                </NeonCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mind Map - A Mente Criativa */}
      <section id="mindmap" className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('mindmap.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('mindmap.subtitle')}
            </p>
          </ScrollReveal>

          {/* Layout: Top row → Center photo → Bottom row */}
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Top row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NeonCard borderColor="pink" className="text-center p-5 hover:scale-105 transition-transform">
                <Camera className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="text-base font-bold mb-1">{t("mindmap.filmmaker")}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.filmmaker.desc')}</p>
              </NeonCard>

              <NeonCard borderColor="cyan" className="text-center p-5 hover:scale-105 transition-transform">
                <Sparkles className="h-10 w-10 mx-auto mb-3 text-secondary" />
                <h3 className="text-base font-bold mb-1">{t('mindmap.vfx')}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.vfx.desc')}</p>
              </NeonCard>

              <NeonCard borderColor="green" className="text-center p-5 hover:scale-105 transition-transform">
                <Drone className="h-10 w-10 mx-auto mb-3 text-accent" />
                <h3 className="text-base font-bold mb-1">{t('mindmap.drone')}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.drone.desc')}</p>
              </NeonCard>
            </div>

            {/* Center: Photo with glow */}
            <div className="flex justify-center py-4">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-2xl animate-pulse" />
                <img 
                  src="/IDEIA.webp" 
                  alt="Jacob Jonson - Mente Criativa" 
                  className="relative w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-primary/50 shadow-[0_0_50px_rgba(255,0,110,0.3)]"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-background/95 border border-primary/50 backdrop-blur-sm whitespace-nowrap">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">JACOB JONSON</span>
                </div>
              </div>
            </div>

            {/* Bottom row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NeonCard borderColor="yellow" className="text-center p-5 hover:scale-105 transition-transform">
                <Briefcase className="h-10 w-10 mx-auto mb-3 text-[rgb(255,214,10)]" />
                <h3 className="text-base font-bold mb-1">{t("mindmap.pr")}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.pr.desc')}</p>
              </NeonCard>

              <NeonCard borderColor="pink" className="text-center p-5 hover:scale-105 transition-transform">
                <Brain className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="text-base font-bold mb-1">{t('mindmap.ai')}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.ai.desc')}</p>
              </NeonCard>

              <NeonCard borderColor="cyan" className="text-center p-5 hover:scale-105 transition-transform">
                <Cpu className="h-10 w-10 mx-auto mb-3 text-secondary" />
                <h3 className="text-base font-bold mb-1">{t('mindmap.3d')}</h3>
                <p className="text-xs text-muted-foreground">{t('mindmap.3d.desc')}</p>
              </NeonCard>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Criativo - Timeline */}
      <section id="process" className="relative py-24 bg-background/50 backdrop-blur-sm">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              {t('process.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </ScrollReveal>

          {/* Timeline horizontal */}
          <div className="relative max-w-5xl mx-auto">
            {/* Linha conectora (hidden on mobile) */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: t('process.step1'), desc: t('process.step1.desc'), icon: FileText, color: 'pink' as const },
                { step: '02', title: t('process.step2'), desc: t('process.step2.desc'), icon: Clapperboard, color: 'cyan' as const },
                { step: '03', title: t('process.step3'), desc: t('process.step3.desc'), icon: Camera, color: 'green' as const },
                { step: '04', title: t('process.step4'), desc: t('process.step4.desc'), icon: Send, color: 'yellow' as const },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="flex flex-col items-center text-center group">
                    {/* Step number circle */}
                    <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 border-2 transition-all duration-500 group-hover:scale-110 ${
                      item.color === 'pink' ? 'border-primary/50 bg-primary/5 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(255,0,110,0.3)]' :
                      item.color === 'cyan' ? 'border-secondary/50 bg-secondary/5 group-hover:border-secondary group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]' :
                      item.color === 'green' ? 'border-accent/50 bg-accent/5 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]' :
                      'border-[rgb(255,214,10)]/50 bg-[rgb(255,214,10)]/5 group-hover:border-[rgb(255,214,10)] group-hover:shadow-[0_0_30px_rgba(255,214,10,0.3)]'
                    }`}>
                      <item.icon className={`h-12 w-12 ${
                        item.color === 'pink' ? 'text-primary' :
                        item.color === 'cyan' ? 'text-secondary' :
                        item.color === 'green' ? 'text-accent' :
                        'text-[rgb(255,214,10)]'
                      }`} />
                      {/* Step number badge */}
                      <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        item.color === 'pink' ? 'bg-primary text-background' :
                        item.color === 'cyan' ? 'bg-secondary text-background' :
                        item.color === 'green' ? 'bg-accent text-background' :
                        'bg-[rgb(255,214,10)] text-background'
                      }`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="relative py-24">
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((cat, catIndex) => (
              <ScrollReveal key={catIndex} delay={catIndex * 150}>
                <NeonCard borderColor={cat.color} className="h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cat.color === 'pink' ? 'bg-primary/10 border border-primary/30' :
                      cat.color === 'cyan' ? 'bg-secondary/10 border border-secondary/30' :
                      'bg-accent/10 border border-accent/30'
                    }`}>
                      <cat.icon className={`h-6 w-6 ${
                        cat.color === 'pink' ? 'text-primary' :
                        cat.color === 'cyan' ? 'text-secondary' :
                        'text-accent'
                      }`} />
                    </div>
                    <h3 className="text-lg font-bold">{cat.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {cat.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        cat.color === 'pink' ? 'bg-primary/5 hover:bg-primary/10 border border-primary/10' :
                        cat.color === 'cyan' ? 'bg-secondary/5 hover:bg-secondary/10 border border-secondary/10' :
                        'bg-accent/5 hover:bg-accent/10 border border-accent/10'
                      }`}>
                        <item.icon className={`h-5 w-5 flex-shrink-0 ${
                          cat.color === 'pink' ? 'text-primary/70' :
                          cat.color === 'cyan' ? 'text-secondary/70' :
                          'text-accent/70'
                        }`} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="relative py-24 bg-background/50 backdrop-blur-sm">
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <NeonCard key={index} borderColor={project.color} className="overflow-hidden group">
                <div 
                  className="relative h-48 mb-4 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setVideoModal({ isOpen: true, videoId: project.videoId, title: project.title })}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-background ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-primary font-semibold">{project.category}</div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </NeonCard>
            ))}
          </div>

        </div>
      </section>

      {/* VFX Before/After Showcase */}
      <section id="vfx" className="relative py-24 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-accent/20 border-2 border-accent/50">
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
              <span className="text-sm font-bold text-accent">{t('vfx.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              {t('vfx.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("vfx.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* VFX Comparison 1 */}
            <NeonCard borderColor="cyan" className="overflow-hidden">
              <div className="relative rounded-lg overflow-hidden">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src="/JACOBCASA.webp" alt="Antes - Raw Footage" />}
                  itemTwo={<ReactCompareSliderImage src="/JACOBESTUDIO.webp" alt="Depois - VFX Final" />}
                  style={{ aspectRatio: "16/9" }}
                  
                  handle={
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-1 h-full bg-white shadow-lg shadow-white/50" />
                      <div className="absolute w-10 h-10 rounded-full bg-white border-4 border-accent shadow-lg shadow-accent/50 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-accent" />
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-accent" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{t('vfx.scene')}</h3>
                <p className="text-sm text-muted-foreground">{t('vfx.scene.desc')}</p>
              </div>
            </NeonCard>

            {/* VFX Comparison 2 */}
            <NeonCard borderColor="pink" className="overflow-hidden">
              <div className="relative rounded-lg overflow-hidden">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src="/JACOBPENSATIVO1.webp" alt="Antes - Raw Footage" />}
                  itemTwo={<ReactCompareSliderImage src="/JACOBBRAIN.webp" alt="Depois - VFX Final" />}
                  style={{ aspectRatio: "16/9" }}
                  
                  handle={
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-1 h-full bg-white shadow-lg shadow-white/50" />
                      <div className="absolute w-10 h-10 rounded-full bg-white border-4 border-primary shadow-lg shadow-primary/50 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-primary" />
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-primary" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{t('vfx.neural')}</h3>
                <p className="text-sm text-muted-foreground">{t('vfx.neural.desc')}</p>
              </div>
            </NeonCard>

            {/* VFX Comparison 3 */}
            <NeonCard borderColor="green" className="overflow-hidden">
              <div className="relative rounded-lg overflow-hidden">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src="/JACOBRADIO.webp" alt="Antes - Raw Footage" />}
                  itemTwo={<ReactCompareSliderImage src="/JACOBTRONO1.webp" alt="Depois - VFX Final" />}
                  style={{ aspectRatio: "16/9" }}
                  
                  handle={
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-1 h-full bg-white shadow-lg shadow-white/50" />
                      <div className="absolute w-10 h-10 rounded-full bg-white border-4 border-green-500 shadow-lg shadow-green-500/50 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-green-500" />
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-green-500" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{t('vfx.chroma')}</h3>
                <p className="text-sm text-muted-foreground">{t('vfx.chroma.desc')}</p>
              </div>
            </NeonCard>

            {/* VFX Comparison 4 */}
            <NeonCard borderColor="yellow" className="overflow-hidden">
              <div className="relative rounded-lg overflow-hidden">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src="/JACOBJUMP2.webp" alt="Antes - Raw Footage" />}
                  itemTwo={<ReactCompareSliderImage src="/JACOBJUMP1.webp" alt="Depois - VFX Final" />}
                  style={{ aspectRatio: "16/9" }}
                  
                  handle={
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-1 h-full bg-white shadow-lg shadow-white/50" />
                      <div className="absolute w-10 h-10 rounded-full bg-white border-4 border-yellow-500 shadow-lg shadow-yellow-500/50 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-yellow-500" />
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-yellow-500" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{t('vfx.jump')}</h3>
                <p className="text-sm text-muted-foreground">{t('vfx.jump.desc')}</p>
              </div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section id="web-dev" className="relative py-24 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-secondary/20 border-2 border-secondary/50">
              <Code className="h-6 w-6 text-secondary animate-pulse" />
              <span className="text-sm font-bold text-secondary">{t('webdev.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              {t('webdev.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('webdev.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: t('webdev.landing.title'),
                description: t('webdev.landing.desc'),
                icon: Layout,
                features: [t('webdev.landing.f1'), t('webdev.landing.f2'), t('webdev.landing.f3')],
                color: "cyan" as const,
              },
              {
                title: t('webdev.platforms.title'),
                description: t('webdev.platforms.desc'),
                icon: Monitor,
                features: [t('webdev.platforms.f1'), t('webdev.platforms.f2'), t('webdev.platforms.f3')],
                color: "green" as const,
              },
              {
                title: t('webdev.ai.title'),
                description: t('webdev.ai.desc'),
                icon: Bot,
                features: [t('webdev.ai.f1'), t('webdev.ai.f2'), t('webdev.ai.f3')],
                color: "pink" as const,
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <NeonCard borderColor={item.color} className="h-full group hover:scale-[1.02] transition-transform">
                  <item.icon className={`h-14 w-14 mb-4 ${
                    item.color === 'cyan' ? 'text-secondary' :
                    item.color === 'green' ? 'text-accent' :
                    'text-primary'
                  }`} />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          item.color === 'cyan' ? 'bg-secondary' :
                          item.color === 'green' ? 'bg-accent' :
                          'bg-primary'
                        }`} />
                        {feat}
                      </div>
                    ))}
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <NeonCard borderColor="cyan" className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">{t('webdev.cta.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('webdev.cta.desc')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton 
                  size="lg"
                  glowColor="cyan"
                  onClick={() => scrollToSection('contact')}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  {t('webdev.cta.button')}
                </GlowButton>
              </div>
            </NeonCard>
          </div>
        </div>
      </section>



      {/* Experience Timeline */}
      <section id="experience" className="relative py-24">
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t('exp.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-card ${
                    exp.color === 'pink' ? 'border-primary' :
                    exp.color === 'cyan' ? 'border-secondary' :
                    exp.color === 'green' ? 'border-accent' :
                    'border-[rgb(255,214,10)]'
                  }`}>
                    <exp.icon className="h-6 w-6" />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <NeonCard borderColor={exp.color} className="flex-1 group-hover:scale-[1.02]">
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="text-sm text-primary mb-2">{exp.company}</div>
                  <div className="text-xs text-muted-foreground mb-3">{exp.period}</div>
                  <p className="text-sm">{exp.description}</p>
                </NeonCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* AI Gallery Section */}
      <section id="ai-tools" className="relative py-24">
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t('ai.title')}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t("ai.subtitle")}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiGalleryImages.map((img, index) => (
                <NeonCard 
                  key={index} 
                  borderColor={['pink', 'cyan', 'green', 'yellow', 'pink', 'cyan', 'green', 'yellow'][index] as any}
                  className="overflow-hidden group cursor-pointer p-0"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={img.src} 
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-sm font-semibold">{img.title}</span>
                    </div>
                  </div>
                </NeonCard>
              ))}
          </div>
          
          {/* Foto Mind Blowing */}
          <div className="flex justify-center mt-20">
            <div className="relative w-full max-w-5xl">
              <img 
                src="/MINDBLOWING.webp" 
                alt="Jacob Jonson - Mind Blowing IA" 
                className="w-full h-auto object-contain drop-shadow-[0_0_70px_rgba(255,0,110,0.5)] hover:drop-shadow-[0_0_100px_rgba(0,255,255,0.7)] transition-all duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="pricing" className="relative py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('pricing.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Pacote Conteúdo Viral */}
            <ScrollReveal delay={0}>
              <NeonCard borderColor="yellow" className="h-full flex flex-col">
                <div className="text-center mb-6">
                  <Play className="h-12 w-12 mx-auto mb-4 text-[rgb(255,214,10)]" />
                  <h3 className="text-lg font-bold mb-2">{t('pricing.viral.title')}</h3>
                  <div className="text-2xl font-bold text-[rgb(255,214,10)]">{t('pricing.viral.price')}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t('pricing.viral.from')}</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[t('pricing.viral.f1'), t('pricing.viral.f2'), t('pricing.viral.f3'), t('pricing.viral.f4'), t('pricing.viral.f5')].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[rgb(255,214,10)] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <GlowButton glowColor="yellow" className="w-full mt-6" onClick={() => scrollToSection('contact')}>
                  {t('pricing.cta')}
                </GlowButton>
              </NeonCard>
            </ScrollReveal>

            {/* Pacote Presença Web */}
            <ScrollReveal delay={100}>
              <NeonCard borderColor="cyan" className="h-full flex flex-col">
                <div className="text-center mb-6">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-secondary" />
                  <h3 className="text-lg font-bold mb-2">{t('pricing.web.title')}</h3>
                  <div className="text-2xl font-bold text-secondary">{t('pricing.web.price')}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t('pricing.web.from')}</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[t('pricing.web.f1'), t('pricing.web.f2'), t('pricing.web.f3'), t('pricing.web.f4'), t('pricing.web.f5')].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <GlowButton glowColor="cyan" className="w-full mt-6" onClick={() => scrollToSection('contact')}>
                  {t('pricing.cta')}
                </GlowButton>
              </NeonCard>
            </ScrollReveal>

            {/* Pacote Ecossistema Completo - DESTAQUE */}
            <ScrollReveal delay={200}>
              <div className="relative h-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-sm animate-pulse" />
                <NeonCard borderColor="pink" className="relative h-full flex flex-col bg-card">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold text-background whitespace-nowrap">
                    {t('pricing.popular')}
                  </div>
                  <div className="text-center mb-6 pt-2">
                    <Layers className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-bold mb-2">{t('pricing.full.title')}</h3>
                    <div className="text-2xl font-bold text-primary">{t('pricing.full.price')}</div>
                    <p className="text-xs text-muted-foreground mt-1">{t('pricing.full.from')}</p>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[t('pricing.full.f1'), t('pricing.full.f2'), t('pricing.full.f3'), t('pricing.full.f4'), t('pricing.full.f5'), t('pricing.full.f6')].map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <GlowButton glowColor="pink" className="w-full mt-6" onClick={() => scrollToSection('contact')}>
                    {t('pricing.cta')}
                  </GlowButton>
                </NeonCard>
              </div>
            </ScrollReveal>

            {/* Pacote Audiovisual */}
            <ScrollReveal delay={300}>
              <NeonCard borderColor="green" className="h-full flex flex-col">
                <div className="text-center mb-6">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-bold mb-2">{t('pricing.av.title')}</h3>
                  <div className="text-2xl font-bold text-accent">{t('pricing.av.price')}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t('pricing.av.from')}</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[t('pricing.av.f1'), t('pricing.av.f2'), t('pricing.av.f3'), t('pricing.av.f4'), t('pricing.av.f5')].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <GlowButton glowColor="green" className="w-full mt-6" onClick={() => scrollToSection('contact')}>
                  {t('pricing.cta')}
                </GlowButton>
              </NeonCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cases / Success Stories */}
      <section id="cases" className="relative py-24">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              {t('cases.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('cases.subtitle')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: t('cases.c1.title'), desc: t('cases.c1.desc'), result: t('cases.c1.result'), color: 'pink' as const, image: '/JACOBESTUDIO2.webp' },
              { title: t('cases.c2.title'), desc: t('cases.c2.desc'), result: t('cases.c2.result'), color: 'cyan' as const, image: '/JACOBCYBER1.webp' },
              { title: t('cases.c3.title'), desc: t('cases.c3.desc'), result: t('cases.c3.result'), color: 'green' as const, image: '/JACOBASTRONAUTA2.webp' },
              { title: t('cases.c4.title'), desc: t('cases.c4.desc'), result: t('cases.c4.result'), color: 'yellow' as const, image: '/JACOBDEATH1.webp' },
            ].map((c, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <NeonCard borderColor={c.color} className="overflow-hidden group h-full">
                  <div className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img 
                      src={c.image} 
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    c.color === 'pink' ? 'bg-primary/10 text-primary border border-primary/20' :
                    c.color === 'cyan' ? 'bg-secondary/10 text-secondary border border-secondary/20' :
                    c.color === 'green' ? 'bg-accent/10 text-accent border border-accent/20' :
                    'bg-[rgb(255,214,10)]/10 text-[rgb(255,214,10)] border border-[rgb(255,214,10)]/20'
                  }`}>
                    <Star className="h-3 w-3" fill="currentColor" />
                    {c.result}
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology / Our Process */}
      <section id="methodology" className="relative py-24 bg-background/50 backdrop-blur-sm overflow-hidden">
        <div className="container relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              {t('method.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {t('method.subtitle')}
            </p>
          </ScrollReveal>

          <div className="relative max-w-5xl mx-auto">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 -translate-y-1/2">
              <div className="w-full h-full bg-gradient-to-r from-secondary via-accent to-primary opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-60 blur-sm" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { step: '01', title: t('method.s1.title'), desc: t('method.s1.desc'), icon: FileText, color: 'cyan' as const },
                { step: '02', title: t('method.s2.title'), desc: t('method.s2.desc'), icon: Cpu, color: 'green' as const },
                { step: '03', title: t('method.s3.title'), desc: t('method.s3.desc'), icon: Send, color: 'pink' as const },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 200}>
                  <div className="flex flex-col items-center text-center group">
                    <div className={`relative w-28 h-28 rounded-2xl flex items-center justify-center mb-6 border-2 transition-all duration-500 group-hover:scale-110 ${
                      item.color === 'cyan' ? 'border-secondary/50 bg-secondary/5 group-hover:border-secondary group-hover:shadow-[0_0_40px_rgba(0,245,255,0.3)]' :
                      item.color === 'green' ? 'border-accent/50 bg-accent/5 group-hover:border-accent group-hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]' :
                      'border-primary/50 bg-primary/5 group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(255,0,110,0.3)]'
                    }`}>
                      <item.icon className={`h-12 w-12 ${
                        item.color === 'cyan' ? 'text-secondary' :
                        item.color === 'green' ? 'text-accent' :
                        'text-primary'
                      }`} />
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        item.color === 'cyan' ? 'bg-secondary text-background' :
                        item.color === 'green' ? 'bg-accent text-background' :
                        'bg-primary text-background'
                      }`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-24">
        <div className="container relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('testimonials.title')}
            </h2>
          </ScrollReveal>

          {(() => {
            const testimonials = [
              { name: t('test.t1.name'), role: t('test.t1.role'), text: t('test.t1.text') },
              { name: t('test.t2.name'), role: t('test.t2.role'), text: t('test.t2.text') },
              { name: t('test.t3.name'), role: t('test.t3.role'), text: t('test.t3.text') },
            ];
            return (
              <div className="relative">
                <NeonCard borderColor="pink" className="text-center px-8 py-10">
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-0.5">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{testimonials[testimonialIndex].name.charAt(0)}</span>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[rgb(255,214,10)]" fill="currentColor" />
                    ))}
                  </div>
                  {/* Quote */}
                  <Quote className="h-8 w-8 mx-auto mb-4 text-primary/30" />
                  <p className="text-lg italic text-foreground/80 mb-6 leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  <div className="font-bold text-lg">{testimonials[testimonialIndex].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[testimonialIndex].role}</div>
                </NeonCard>
                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-6">
                  <button 
                    onClick={() => setTestimonialIndex(testimonialIndex === 0 ? testimonials.length - 1 : testimonialIndex - 1)}
                    className="p-2 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-primary" />
                  </button>
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === testimonialIndex ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setTestimonialIndex(testimonialIndex === testimonials.length - 1 ? 0 : testimonialIndex + 1)}
                    className="p-2 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-background/50 backdrop-blur-sm">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('faq.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {t("faq.subtitle")}
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
              { q: t('faq.q4'), a: t('faq.a4') },
              { q: t('faq.q5'), a: t('faq.a5') },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <div 
                  className={`rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-md ${
                    openFaqIndex === index 
                      ? 'border border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(255,0,110,0.1)]' 
                      : 'border border-border/30 bg-background/20 hover:border-primary/30 hover:bg-background/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24">
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('contact.form.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t("contact.form.desc")}
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <NeonCard borderColor="cyan">
                <h3 className="text-2xl font-bold mb-4">{t('contact.social.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("contact.social.desc")}
                </p>
                <div className="flex flex-col gap-3">
                  <GlowButton 
                    size="lg"
                    glowColor="cyan"
                    className="w-full"
                    onClick={() => window.open('https://www.linkedin.com/in/jacob-jonson-portela-742b9a128/', '_blank')}
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </GlowButton>
                  <GlowButton 
                    size="lg"
                    glowColor="pink"
                    className="w-full"
                    onClick={() => window.open('https://www.instagram.com/jacobjonsonportela/', '_blank')}
                  >
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram
                  </GlowButton>
                </div>
              </NeonCard>

              <NeonCard borderColor="green">
                <h3 className="text-2xl font-bold mb-4">{t('contact.location.title')}</h3>
                <p className="text-muted-foreground mb-2">{t('contact.location.city')}</p>
                <p className="text-sm text-muted-foreground">{t("contact.location.available")}</p>
              </NeonCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 pb-28 md:pb-16 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Slogan */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                Jacob Jonson
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('footer.slogan')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-foreground">{t('footer.links')}</h4>
              <div className="space-y-2">
                {[
                  { label: t('nav.about'), href: '#about' },
                  { label: t('nav.projects'), href: '#projects' },
                  { label: t('footer.pricing'), href: '#pricing' },
                  { label: t('nav.contact'), href: '#contact' },
                ].map((link, i) => (
                  <a key={i} href={link.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4 text-foreground">{t('footer.services')}</h4>
              <div className="space-y-2">
                {[t('footer.svc.sites'), t('footer.svc.ai'), t('footer.svc.video'), t('footer.svc.motion')].map((svc, i) => (
                  <span key={i} className="block text-sm text-muted-foreground">{svc}</span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold mb-4 text-foreground">{t('contact.social.title')}</h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:border-primary hover:text-primary transition-colors"
                  onClick={() => window.open('https://www.linkedin.com/in/jacob-jonson-portela-742b9a128/', '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:border-primary hover:text-primary transition-colors"
                  onClick={() => window.open('https://www.instagram.com/jacobjonsonportela/', '_blank')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Jacob Jonson Portela. {t('footer.rights')}
          </div>
        </div>
      </footer>

      {/* Mobile Fixed CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/95 backdrop-blur-md border-t border-primary/20 px-4 py-3 flex gap-3">
          <a
            href={`https://wa.me/5542988283963?text=${encodeURIComponent(t('whatsapp.message'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-bold text-sm shadow-[0_0_20px_rgba(255,0,110,0.3)] active:scale-95 transition-transform"
          >
            <Mail className="h-4 w-4" />
            {t('cta.budget')}
          </a>
          <button
            onClick={() => setIsVideoLightboxOpen(true)}
            className="w-12 flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10"
          >
            <Play className="h-5 w-5 text-accent" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 md:bottom-8 right-8 z-50 p-3 rounded-full bg-primary/20 border-2 border-primary/50 backdrop-blur-sm hover:bg-primary/30 hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,110,0.6)]"
        aria-label={t('nav.about')}
      >
        <ArrowUp className="h-6 w-6 text-primary" />
      </button>

      {/* Video Modal */}
      <VideoModal 
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, videoId: '', title: '' })}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />

      {/* Lightbox para galeria de IA */}
      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ isOpen: false, currentIndex: 0 })}
        images={aiGalleryImages}
        currentIndex={lightbox.currentIndex}
        onNavigate={(index) => setLightbox({ ...lightbox, currentIndex: index })}
      />

      {/* Video Lightbox (yet-another-react-lightbox) */}
      <YARLightbox
        open={isVideoLightboxOpen}
        close={() => setIsVideoLightboxOpen(false)}
        slides={videoSlides}
        plugins={[YARVideo]}
      />

      {/* Showreel Video Player - Canto inferior esquerdo (hidden on mobile - CTA bar takes over) */}
      <div className="fixed bottom-8 left-8 z-50 hidden md:block">
        <div className="relative group cursor-pointer" onClick={() => setIsVideoLightboxOpen(true)}>
          {/* Video thumbnail pequeno */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/50 shadow-[0_0_20px_rgba(57,255,20,0.3)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all duration-300 group-hover:scale-110">
            <video 
              src="/showreel.mp4" 
              muted 
              loop 
              playsInline 
              autoPlay
              className="w-full h-full object-cover"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/80 flex items-center justify-center">
                <Play className="h-5 w-5 text-background ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
          {/* Label */}
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent/90 text-[10px] font-bold text-background">
            PLAY
          </div>
        </div>
      </div>
    </div>
  );
}
