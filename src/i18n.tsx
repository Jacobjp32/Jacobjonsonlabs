import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getPathLang } from './lib/seo'

export type Lang = 'pt' | 'en'

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (key: string) => key,
})

export function useI18n() {
  return useContext(I18nContext)
}

const resolveInitialLang = (): Lang => {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  const bootLang = (window as typeof window & { __INITIAL_LANG__?: Lang }).__INITIAL_LANG__
  if (bootLang === 'pt' || bootLang === 'en') {
    return bootLang
  }

  const pathLang = getPathLang(window.location.pathname)
  if (pathLang === 'pt' || pathLang === 'en') {
    return pathLang
  }

  const saved = localStorage.getItem('lang') as Lang | null
  if (saved === 'pt' || saved === 'en') {
    return saved
  }

  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  const prefersPortuguese = browserLocales.some((locale) =>
    locale.toLowerCase().startsWith('pt')
  )

  return prefersPortuguese ? 'pt' : 'en'
}

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    // Nav
    'nav.about': 'Sobre',
    'nav.mindmap': 'Mente Criativa',
    'nav.process': 'Processo',
    'nav.projects': 'Projetos',
    'nav.webdev': 'Dev Web',
    'nav.gallery': 'Galeria IA',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contato',

    // Hero
    'hero.title': 'Transformando Visão em Realidade Digital',
    'hero.subtitle': 'Soluções completas de Audiovisual Cinematográfico e Desenvolvimento de Sistemas Web com IA',
    'hero.tagline': 'Cinema • Drones • IA • Desenvolvimento Web',
    'hero.cta.projects': 'Ver Portfólio',
    'hero.cta.contact': 'Solicitar Orçamento',
    'hero.cta.showreel': 'Assistir Showreel',

    // Brands
    'brands.title': 'Empresas que confiam em nosso ecossistema',

    // About
    'about.title': 'O Estrategista Digital',
    'about.p1': 'Não sou apenas um executor de tarefas; sou o <highlight1>arquiteto da sua autoridade digital</highlight1>. Com mais de 15 anos de mercado audiovisual, fundei produtoras, atendi grandes marcas e cobri desde campanhas políticas a projetos cinematográficos.',
    'about.p2': 'Hoje, atuo como <highlight2>Diretor Criativo e de Tecnologia</highlight2>, unindo a narrativa clássica do cinema com o poder do <highlight3>desenvolvimento Web e da Inteligência Artificial</highlight3>. Meu objetivo não é entregar apenas um vídeo bonito ou um site estético, mas sim construir um ecossistema digital completo.',
    'about.p3': 'Um ecossistema que <highlight1>posicione sua marca</highlight1>, capture atenção e <highlight2>converta leads de forma automática</highlight2>. De ponta a ponta: do código à lente da câmera.',
    'about.stats.years': 'Anos de Experiência',
    'about.stats.projects': 'Projetos entregues',
    'about.stats.jjp': 'Anos JJP Produções',
    'about.stats.ideas': 'Ideias Criativas',

    // Mind Map
    'mindmap.title': 'Estrategista Visual & Desenvolvedor Tech',
    'mindmap.subtitle': 'Diretor Criativo e de Tecnologia | Unindo a narrativa clássica do cinema com desenvolvimento Web e IA | Do código à lente da câmera',
    'mindmap.filmmaker': 'Filmmaker & Roteirista',
    'mindmap.filmmaker.desc': 'Direção, roteiro e cinematografia. Formado em Cinema pelo Centro Europeu',
    'mindmap.vfx': 'VFX & Motion Design',
    'mindmap.vfx.desc': 'Especialista em pós-produção avançada, After Effects, Motion Art Pro',
    'mindmap.drone': 'Tecnologia Aérea',
    'mindmap.drone.desc': 'Cinematografia com Drones (Mastercod) e estratégias de captação aérea',
    'mindmap.pr': 'Dir. Relações Públicas',
    'mindmap.pr.desc': 'Prefeitura de São Mateus do Sul — comunicação institucional e estratégia de mídia',
    'mindmap.ai': 'IA Generativa',
    'mindmap.ai.desc': 'IA para otimizar roteiros, pré-visualização e criar mundos complexos e dinâmicos',
    'mindmap.3d': 'Imersão & 3D',
    'mindmap.3d.desc': 'Unreal Engine e Blender para cenários virtuais e visualizações de produtos',

    // Process
    'process.title': 'Processo Criativo',
    'process.subtitle': 'Do briefing à entrega final — cada projeto passa por etapas cuidadosas para garantir excelência',
    'process.step1': 'Briefing',
    'process.step1.desc': 'Entendo sua visão, objetivos e público-alvo',
    'process.step2': 'Roteiro & Planejamento',
    'process.step2.desc': 'Storyboard, locações, cronograma e equipe',
    'process.step3': 'Captação',
    'process.step3.desc': 'Filmagem com câmeras cinema, drones e áudio profissional',
    'process.step4': 'Pós-Produção & Entrega',
    'process.step4.desc': 'Edição, VFX, color grading, mixagem e masterização',

    // Skills
    'skills.title': 'Arsenal Criativo',
    'skills.cat.audiovisual': 'Audiovisual',
    'skills.cat.ai': 'Inteligência Artificial',
    'skills.cat.dev': 'Desenvolvimento',
    'skills.websites': 'Criação de Sites',
    'skills.systems': 'Sistemas Web',

    // Projects
    'projects.title': 'Portfólio Visual',
    'projects.showreel.title': 'JJP PRODUÇÕES - Showreel',
    'projects.showreel.desc': 'Compilação de imagens aéreas profissionais',
    'projects.agro.title': 'Registre seu plantio ou colheita',
    'projects.agro.desc': 'Cobertura aérea de colheita - 2.2k visualizações',
    'projects.motion.title': 'Motion Design 3D',
    'projects.motion.desc': 'Animações 3D para redes sociais',
    'projects.events.title': 'Eventos Corporativos',
    'projects.events.desc': 'Inaugurações e coberturas empresariais',

    // VFX
    'vfx.badge': 'VFX & PÓS-PRODUÇÃO',
    'vfx.title': 'Antes & Depois',
    'vfx.subtitle': 'Veja a magia da pós-produção. Arraste o slider para comparar as filmagens brutas com o resultado final após VFX.',
    'vfx.scene': 'Composição de Cenário',
    'vfx.scene.desc': 'Substituição de fundo e correção de cor profissional',
    'vfx.neural': 'Neural Enhancement',
    'vfx.neural.desc': 'Efeitos visuais com IA e motion graphics',
    'vfx.cyber': 'Transformação Cyberpunk',
    'vfx.cyber.desc': 'Manipulação digital e estilização cinematográfica',
    'vfx.shield': 'Efeitos de Energia',
    'vfx.shield.desc': 'Partículas, shields e efeitos sci-fi com compositing 3D',
    'vfx.chroma': 'Chroma Key Avançado',
    'vfx.chroma.desc': 'Integração perfeita de cenários virtuais',
    'vfx.jump': 'Dimensional Jump',
    'vfx.jump.desc': 'Efeitos de transição e manipulação dimensional',

    // Music Videos
    'music.title': 'Clipes Musicais',
    'music.subtitle': 'Narrativas que dão vida à música. Nosso segmento em expansão com produções conceituais completas, do roteiro à finalização, cinema em cada frame.',
    'music.clip1.title': 'Clipe Musical - Artista 1',
    'music.clip1.desc': 'Produção completa com chroma key e efeitos visuais',
    'music.clip2.title': 'Clipe Musical - Artista 2',
    'music.clip2.desc': 'Filmagem em locação com drone e câmera cinematográfica',
    'music.clip3.title': 'Clipe Musical - Artista 3',
    'music.clip3.desc': 'Estúdio chroma key com animações 3D',
    'music.cta.title': 'Quer criar seu próximo clipe?',
    'music.cta.desc': 'Oferecemos pacotes completos para artistas independentes e gravadoras. Do conceito à entrega final, transformamos sua música em experiência visual.',
    'music.cta.budget': 'Solicitar Orçamento para Clipe',
    'music.cta.prices': 'Ver Pacotes e Preços',

    // Experience
    'exp.title': 'Jornada Profissional',
    'exp.dev.title': 'Desenvolvedor de Sistemas & Soluções com IA',
    'exp.dev.company': 'JJP Produções / Freelance',
    'exp.dev.period': '2024 - Presente',
    'exp.dev.desc': 'Expansão do portfólio para criação de plataformas web, landing pages de alta conversão e automações inteligentes com IA, agregando valor à sólida base em produção audiovisual.',
    'exp.pr.title': 'Diretor de Relações Públicas',
    'exp.pr.company': 'Prefeitura Municipal de São Mateus do Sul',
    'exp.pr.period': 'Mar 2024 - Presente',
    'exp.pr.desc': 'Gestão de comunicação institucional, produção de conteúdo e estratégias de mídia social.',
    'exp.filmmaker.title': 'Filmmaker & Motion Designer',
    'exp.filmmaker.company': 'JJP Produções',
    'exp.filmmaker.period': 'Jan 2016 - Presente (9 anos)',
    'exp.filmmaker.desc': 'Produção audiovisual completa, motion design e animação 3D para diversos clientes.',
    'exp.founder.title': 'Fundador',
    'exp.founder.company': 'JJP PRODUÇÕES',
    'exp.founder.period': '2019 - Presente (6 anos)',
    'exp.founder.desc': 'Especialização em imagens aéreas com drone para empresas e eventos.',
    'exp.editor.title': 'Cinegrafista e Editor',
    'exp.editor.company': 'Uniguaçu',
    'exp.editor.period': 'Mai 2013 - Mar 2015',
    'exp.editor.desc': 'Produção de programas para público jovem/adulto, captação e edição de eventos.',

    // AI Gallery
    'ai.title': 'Criações com IA Generativa',
    'ai.subtitle': 'Explorações criativas geradas com inteligência artificial — clique para ampliar',

    // Web Development
    'webdev.badge': 'NOVA VERTICAL',
    'webdev.title': 'Desenvolvimento de Sites & Sistemas',
    'webdev.subtitle': 'Landing pages de alta conversão, plataformas web e automações inteligentes com IA — da concepção ao deploy.',
    'webdev.landing.title': 'Landing Pages de Alta Conversão',
    'webdev.landing.desc': 'Páginas otimizadas para captar leads e converter visitantes em clientes.',
    'webdev.landing.f1': 'Design responsivo e moderno',
    'webdev.landing.f2': 'Otimização SEO integrada',
    'webdev.landing.f3': 'Integração com WhatsApp e formulários',
    'webdev.platforms.title': 'Plataformas & Sistemas Web',
    'webdev.platforms.desc': 'Sistemas completos para gestão, portais de transparência e dashboards.',
    'webdev.platforms.f1': 'React, Next.js, TypeScript',
    'webdev.platforms.f2': 'Banco de dados e APIs',
    'webdev.platforms.f3': 'Painel administrativo',
    'webdev.ai.title': 'Automações com IA',
    'webdev.ai.desc': 'Inteligência artificial integrada para otimizar processos e experiências.',
    'webdev.ai.f1': 'Chatbots e assistentes inteligentes',
    'webdev.ai.f2': 'Geração de conteúdo automatizada',
    'webdev.ai.f3': 'Integração com Claude e Gemini',
    'webdev.cta.title': 'Precisa de um site ou sistema?',
    'webdev.cta.desc': 'Combinamos expertise audiovisual com desenvolvimento moderno para criar experiências digitais que impressionam e convertem.',
    'webdev.cta.button': 'Solicitar Orçamento Web',

    // Services / Pricing
    'pricing.title': 'Nossos Serviços',
    'pricing.subtitle': 'Soluções criativas de alto impacto. Do design à animação, transformamos sua visão em realidade.',
    'pricing.cta': 'Solicite um Orçamento',

    // Service 1 - Animation
    'svc.anim.title': 'Dê Vida aos Seus Desenhos',
    'svc.anim.desc': 'Transformamos esboços estáticos, ilustrações ou mascotes em animações fluidas de qualidade cinematográfica.',
    'svc.anim.f1': 'Animação 2D e 3D a partir de artes estáticas',
    'svc.anim.f2': 'Sincronia labial (Lipsync) e dublagem com IA',
    'svc.anim.f3': 'Movimentos de câmera profissionais',
    'svc.anim.f4': 'Ideal para autores, ilustradores e criadores',
    'svc.anim.price': 'A partir de R$ 397',

    // Service 2 - Thumbnails
    'svc.thumb.title': 'Thumbs e Artes para YouTube',
    'svc.thumb.desc': 'Aumente seus cliques (CTR) com miniaturas hipnotizantes e identidade visual de alta retenção para o seu canal.',
    'svc.thumb.f1': 'Thumbnails fotorrealistas de alta conversão',
    'svc.thumb.f2': 'Banners e artes para aba Comunidade',
    'svc.thumb.f3': 'Personagens consistentes para Canais Dark',
    'svc.thumb.f4': 'Design focado na psicologia da atenção',
    'svc.thumb.price': 'Pacotes a partir de R$ 97',

    // Service 3 - Branding
    'svc.brand.title': 'Identidade Visual Completa',
    'svc.brand.desc': 'Construímos marcas memoráveis. Muito além de uma logo, entregamos o ecossistema visual perfeito para o seu negócio.',
    'svc.brand.f1': 'Criação de Logotipo Profissional',
    'svc.brand.f2': 'Definição de paleta de cores e tipografia',
    'svc.brand.f3': 'Brand Book (Manual de uso da Marca)',
    'svc.brand.f4': 'Aplicações em redes sociais e impressos',
    'svc.brand.price': 'A partir de R$ 997',

    // Service 4 - Restoration
    'svc.restore.title': 'Recuperação de Acervo Histórico',
    'svc.restore.desc': 'O passado ganha vida. Restauramos, colorizamos e animamos fotografias e vídeos antigos com inteligência artificial.',
    'svc.restore.f1': 'Restauração de fotos danificadas ou arranhadas',
    'svc.restore.f2': 'Colorização realista de imagens Preto e Branco',
    'svc.restore.f3': 'Animação sutil de fotos (efeito de movimento)',
    'svc.restore.f4': 'Upscale e melhoria de resolução para 4K',
    'svc.restore.price': 'A partir de R$ 147 / material',

    // Cases
    'cases.title': 'Projetos em Destaque',
    'cases.subtitle': 'Resultados reais que transformam negócios. Conheça alguns dos nossos projetos de maior impacto.',
    'cases.c1.title': 'Portal de Turismo SMS',
    'cases.c1.desc': 'Plataforma web completa com mapa 3D interativo e suporte multilíngue para a Prefeitura de São Mateus do Sul.',
    'cases.c1.result': 'Sistema em produção',
    'cases.c2.title': 'Vídeos Institucionais JJP',
    'cases.c2.desc': 'Produção audiovisual cinematográfica para empresas do varejo, moda e agronegócio.',
    'cases.c2.result': '+60 projetos entregues',
    'cases.c3.title': 'Portal PNAB Transparência',
    'cases.c3.desc': 'Sistema de transparência cultural com compliance LAI/LGPD para a gestão pública municipal.',
    'cases.c3.result': 'Conformidade legal',
    'cases.c4.title': 'Coberturas Aéreas',
    'cases.c4.desc': 'Filmagens aéreas profissionais com drone para eventos, imobiliárias e turismo regional.',
    'cases.c4.result': '+2k visualizações',

    // Methodology
    'method.title': 'Nosso Processo',
    'method.subtitle': 'Metodologia clara em 3 etapas para entregar resultados excepcionais — do conceito ao lançamento.',
    'method.s1.title': 'Briefing & Estratégia',
    'method.s1.desc': 'Entendemos seu negócio, público-alvo e objetivos. Definimos escopo, cronograma e métricas de sucesso.',
    'method.s2.title': 'Produção & Desenvolvimento',
    'method.s2.desc': 'Gravação cinematográfica, motion design e codificação com IA. Tudo integrado numa pipeline ágil.',
    'method.s3.title': 'Entrega & Escala',
    'method.s3.desc': 'Lançamento, otimização de performance e acompanhamento pós-entrega para garantir resultados.',

    // Testimonials
    'testimonials.title': 'O Que Meus Clientes Dizem',
    'test.t1.name': 'Carlos Eduardo',
    'test.t1.role': 'Diretor Comercial',
    'test.t1.text': 'O nível de profissionalismo é absurdo. Contratamos para fazer apenas um vídeo institucional, mas a visão estratégica dele nos levou a reformular toda nossa presença web. O novo site integrado com o audiovisual aumentou nossa captação de clientes em poucas semanas.',
    'test.t2.name': 'Mariana Silveira',
    'test.t2.role': 'Founder & CEO de Startup',
    'test.t2.text': 'A rapidez e a modernidade que o Jacob traz para a mesa são incomparáveis. A utilização de Inteligência Artificial combinada com a edição de altíssimo nível nos entregou um material que parecia ter levado meses para ser feito, mas foi entregue em tempo recorde e com qualidade de cinema.',
    'test.t3.name': 'Roberto Alves',
    'test.t3.role': 'Produtor de Conteúdo e Host de Podcast',
    'test.t3.text': 'Estávamos perdendo engajamento nas redes sociais. A entrada dele com os cortes virais, legendas dinâmicas e uma edição focada em retenção mudou o jogo do nosso perfil. Excelente parceiro estratégico.',

    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Tudo que você precisa saber antes de investir no seu próximo projeto',
    'faq.q1': 'Como funciona o pacote de Ecossistema Completo?',
    'faq.a1': 'É a nossa solução definitiva de ponta a ponta. Nós planejamos a sua narrativa, gravamos o material audiovisual cinematográfico e desenvolvemos um site (Landing Page ou Sistema) de alta conversão já integrado com esse material e automações de IA para captar clientes 24h por dia.',
    'faq.q2': 'O pacote de Presença Web inclui a hospedagem do site?',
    'faq.a2': 'Para garantir a sua total autonomia técnica, o domínio e a hospedagem ficam sempre no nome do cliente. No entanto, eu presto toda a consultoria e configuração necessária nas melhores plataformas do mercado, entregando o site no ar, rápido e seguro, sem dor de cabeça para você.',
    'faq.q3': 'Vocês fazem clipes musicais ou apenas vídeos para empresas?',
    'faq.a3': 'Tenho uma raiz forte na produção de clipes musicais, englobando roteiro, direção, chroma key e VFX. Embora hoje meu foco principal seja o corporativo e o desenvolvimento web, abro espaço na agenda para projetos artísticos que demandem alta qualidade cinematográfica.',
    'faq.q4': 'Como funciona o processo de aprovação e revisão dos vídeos?',
    'faq.a4': 'Trabalhamos com processos validados. Após a edição do primeiro corte (Rough Cut), o material é enviado via plataforma para apontamentos. Nossos pacotes intermediários e avançados cobrem rodadas de revisão generosas para garantir que o resultado final supere suas expectativas antes da entrega em 4K/8K.',
    'faq.q5': 'Os cortes virais para TikTok/Shorts são criados a partir de material meu ou vocês gravam?',
    'faq.a5': 'Ambas as opções. Podemos tanto decupar e editar o seu material já existente (como podcasts e palestras) aplicando técnicas de retenção visual e legendas dinâmicas, quanto marcar diárias de gravação exclusivas em estúdio para produzir um banco de vídeos curtos para o seu mês inteiro.',

    // Contact
    'contact.title': 'Conexão Direta',
    'contact.cta.heading': 'Vamos transformar sua visão em realidade?',
    'contact.cta.desc': 'Preencha o formulário ao lado e receba um orçamento personalizado em até 24 horas. Atendemos todo o Brasil — do audiovisual cinematográfico ao desenvolvimento de sistemas com IA.',
    'contact.form.title': 'Envie sua mensagem',
    'contact.form.desc': 'Preencha o formulário abaixo e entrarei em contato em até 24 horas',
    'contact.social.title': 'Redes Sociais',
    'contact.social.desc': 'Conecte-se comigo nas redes sociais para acompanhar meus trabalhos',
    'contact.location.title': 'Localização',
    'contact.location.city': 'São Mateus do Sul, Paraná, Brasil',
    'contact.location.available': 'Disponível para projetos freelance em todo o Brasil',

    // Footer
    'footer.slogan': 'Transformando ideias em narrativas visuais e digitais de alto impacto.',
    'footer.links': 'Links Rápidos',
    'footer.services': 'Serviços',
    'footer.pricing': 'Nossos Serviços',
    'footer.svc.sites': 'Desenvolvimento de Sites',
    'footer.svc.ai': 'Sistemas com IA',
    'footer.svc.video': 'Vídeo Institucional',
    'footer.svc.motion': 'Motion Design',
    'footer.dev': 'Desenvolvido por Jacob Jonson Portela',
    'footer.rights': 'Todos os direitos reservados.',

    // Mobile CTA
    'cta.budget': 'Orçamento Grátis',

    // Contact Form
    'form.name': 'Nome',
    'form.name.placeholder': 'Seu nome',
    'form.company': 'Empresa',
    'form.company.placeholder': 'Nome da sua empresa',
    'form.message': 'Mensagem',
    'form.message.placeholder': 'Descreva seu projeto...',
    'form.send': 'Enviar Mensagem',
    'form.sending': 'Enviando...',

    // 404
    '404.subtitle': 'SINAL PERDIDO',
    '404.desc': 'A transmissão que você procura foi interrompida ou nunca existiu nesta dimensão.',
    '404.terminal.search': '$ locate page',
    '404.terminal.searching': 'Searching...',
    '404.terminal.error': 'ERROR 404: File not found in /multiverse/',
    '404.terminal.redirect': 'Redirecting to home base...',
    '404.home': 'Base Principal',
    '404.back': 'Voltar',

    // Preloader
    'preloader.subtitle': 'Produções',

    // WhatsApp
    'whatsapp.label': 'Fale no WhatsApp',
    'whatsapp.message': 'Olá! Gostaria de solicitar um orçamento.',

    // Services Page
    'services.title': 'Serviços & Preços',
    'services.subtitle': 'Pacotes transparentes para cada necessidade. Do mais simples ao mais complexo, entregamos excelência cinematográfica.',
    'services.back': 'Voltar ao Portfólio',
    'services.features': 'Inclui:',
    'services.budget': 'Solicitar Orçamento',
    'services.custom.title': 'Projeto sob medida?',
    'services.custom.desc': 'Tem um projeto que não se encaixa nos pacotes acima? Sem problemas! Cada projeto é único e podemos criar um pacote personalizado para atender suas necessidades.',
    'services.custom.cta': 'Falar sobre meu projeto',
    'svc.drone': 'Filmagem Aérea com Drone',
    'svc.drone.desc': 'Imagens únicas de perspectiva aérea para imóveis, eventos e empresas',
    'svc.drone.f1': 'Piloto certificado ANAC',
    'svc.drone.f2': 'Equipamento DJI profissional',
    'svc.drone.f3': 'Filmagem em 4K/60fps',
    'svc.drone.f4': 'Edição básica incluída',
    'svc.drone.f5': 'Entrega em até 7 dias',
    'svc.drone.p1': 'Básico',
    'svc.drone.p1d': 'Até 30 minutos de voo, 5 tomadas editadas',
    'svc.drone.p2': 'Profissional',
    'svc.drone.p2d': 'Até 1h de voo, 8 tomadas editadas, color grading',
    'svc.drone.p3': 'Premium',
    'svc.drone.p3d': 'Até 2h de voo, vídeo completo editado, música',
    'svc.motion': 'Motion Design & Animação 3D',
    'svc.motion.desc': 'Conteúdo animado que diferencia sua marca nas redes sociais',
    'svc.motion.f1': 'Animações 2D e 3D',
    'svc.motion.f2': 'After Effects e Cinema 4D',
    'svc.motion.f3': 'Identidade visual animada',
    'svc.motion.f4': 'Formatos para redes sociais',
    'svc.motion.f5': 'Revisões ilimitadas',
    'svc.motion.p1': 'Logo Animado',
    'svc.motion.p1d': 'Logo em movimento, 5-10 segundos, 2 revisões',
    'svc.motion.p2': 'Vídeo Redes Sociais',
    'svc.motion.p2d': '15-30 segundos, animação completa',
    'svc.motion.p3': 'Motion Completo',
    'svc.motion.p3d': '60-90 segundos, animação 3D, trilha',
    'svc.production': 'Produção Audiovisual Completa',
    'svc.production.desc': 'Do roteiro à entrega final, projetos cinematográficos profissionais',
    'svc.production.f1': 'Roteiro e storyboard',
    'svc.production.f2': 'Captação profissional',
    'svc.production.f3': 'Iluminação e áudio',
    'svc.production.f4': 'Edição e pós-produção',
    'svc.production.f5': 'Color grading e finalização',
    'svc.production.p1': 'Institucional Curto',
    'svc.production.p1d': 'Até 2 minutos, 1 diária de gravação',
    'svc.production.p2': 'Institucional Completo',
    'svc.production.p2d': 'Até 5 minutos, 2 diárias, entrevistas',
    'svc.production.p3': 'Documentário',
    'svc.production.p3d': 'Até 15 minutos, múltiplas locações',
    'svc.editing': 'Edição de Vídeo Profissional',
    'svc.editing.desc': 'Pós-produção de alta qualidade com ferramentas profissionais',
    'svc.editing.f1': 'Adobe Premiere Pro',
    'svc.editing.f2': 'Color grading profissional',
    'svc.editing.f3': 'Legendas e gráficos',
    'svc.editing.f4': 'Mixagem de áudio',
    'svc.editing.f5': 'Exportação para múltiplas plataformas',
    'svc.editing.p1': 'Reel/Shorts',
    'svc.editing.p1d': 'Até 60 segundos, cortes e música',
    'svc.editing.p2': 'Vídeo Completo',
    'svc.editing.p2d': 'Até 10 minutos, efeitos e gráficos',
    'svc.editing.p3': 'Pós-Produção Avançada',
    'svc.editing.p3d': 'VFX, compositing, animação',
    'svc.music': 'Clipe Musical',
    'svc.music.desc': 'Produção cinematográfica para artistas e bandas',
    'svc.music.f1': 'Direção criativa',
    'svc.music.f2': 'Chroma key profissional',
    'svc.music.f3': 'Captação multicâmera',
    'svc.music.f4': 'VFX e motion graphics',
    'svc.music.f5': 'Entrega para YouTube/Spotify',
    'svc.music.p1': 'Clipe Simples',
    'svc.music.p1d': 'Locação única, 1 diária, edição completa',
    'svc.music.p2': 'Clipe Conceitual',
    'svc.music.p2d': 'Roteiro, 2 locações, efeitos visuais',
    'svc.music.p3': 'Clipe Premium',
    'svc.music.p3d': 'Produção completa, múltiplas locações, VFX',
    'svc.ai': 'Produção com IA',
    'svc.ai.desc': 'Inteligência artificial integrada ao fluxo criativo',
    'svc.ai.f1': 'Geração de conceitos visuais',
    'svc.ai.f2': 'Roteiros assistidos por IA',
    'svc.ai.f3': 'Pré-visualização com IA',
    'svc.ai.f4': 'Upscaling e restauração',
    'svc.ai.f5': 'Dublagem com ElevenLabs',
    'svc.ai.p1': 'Conceito Visual',
    'svc.ai.p1d': '10 imagens conceituais com IA',
    'svc.ai.p2': 'Pré-Produção IA',
    'svc.ai.p2d': 'Storyboard IA + roteiro + conceitos',
    'svc.ai.p3': 'Produção Híbrida',
    'svc.ai.p3d': 'Vídeo com elementos gerados por IA',
    'aa.s1.tag': 'Atendimento',
    'aa.s1.title': 'Fluxos de lead e primeira resposta',
    'aa.s1.desc': 'Automação para primeiro contato, qualificação e perguntas recorrentes em diferentes canais.',
    'aa.s1.f1': 'Respostas mais rápidas com informação consistente',
    'aa.s1.f2': 'Captação e direcionamento de leads para a pessoa certa',
    'aa.s1.f3': 'Menos follow-up manual no topo do funil',
    'aa.s2.tag': 'Operação',
    'aa.s2.title': 'Automação de fluxo interno',
    'aa.s2.desc': 'Etapas conectadas para aprovações, repasses, lembretes e tarefas internas repetitivas.',
    'aa.s2.f1': 'Menos atrito operacional',
    'aa.s2.f2': 'Menos repasses manuais entre ferramentas',
    'aa.s2.f3': 'Mais consistência na rotina',
    'aa.s3.tag': 'Conteúdo',
    'aa.s3.title': 'Apoio a briefing e conteúdo',
    'aa.s3.desc': 'Fluxos assistidos para coletar informações, organizar briefing e gerar primeiras versões.',
    'aa.s3.f1': 'Coleta estruturada de briefing e informações',
    'aa.s3.f2': 'Primeiras versões e documentação com mais rapidez',
    'aa.s3.f3': 'Mais tempo para estratégia e revisão',
    'aa.s4.tag': 'Visibilidade',
    'aa.s4.title': 'Relatórios e acompanhamento',
    'aa.s4.desc': 'Organização automática de dados e atualizações recorrentes para equipes que precisam decidir melhor.',
    'aa.s4.f1': 'Dashboards e resumos recorrentes',
    'aa.s4.f2': 'Menos tempo montando atualização manualmente',
    'aa.s4.f3': 'Mais rapidez para enxergar o que precisa de ação',
    'aa.p1': 'A equipe responde manualmente as mesmas perguntas todos os dias.',
    'aa.p2': 'Os leads chegam, mas ninguém qualifica ou direciona de forma consistente.',
    'aa.p3': 'Os repasses internos dependem demais de memória e mensagens soltas.',
    'aa.p4': 'Os relatórios demoram para ser montados e já nascem desatualizados.',
    'aa.p5': 'Existem gargalos claros, mas ninguém tem tempo para mapear tudo direito.',
    'aa.h1.title': 'Mapear o fluxo atual',
    'aa.h1.desc': 'Identificamos onde o tempo está sendo perdido, quais etapas mais se repetem e onde está o maior atrito.',
    'aa.h2.title': 'Priorizar a automação certa',
    'aa.h2.desc': 'Nem tudo deve ser automatizado. Escolhemos as partes que geram ganho operacional mais claro.',
    'aa.h3.title': 'Construir, testar e validar',
    'aa.h3.desc': 'A automação é estruturada, testada e ajustada em cima da rotina real antes de escalar.',
    'aa.h4.title': 'Monitorar e refinar',
    'aa.h4.desc': 'Depois de entrar no ar, o fluxo é revisto e melhorado para continuar confiável conforme a operação evolui.',
  },

  en: {
    // Nav
    'nav.about': 'About',
    'nav.mindmap': 'Creative Mind',
    'nav.process': 'Process',
    'nav.projects': 'Projects',
    'nav.webdev': 'Web Dev',
    'nav.gallery': 'AI Gallery',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Transforming Vision into Digital Reality',
    'hero.subtitle': 'Complete solutions for Cinematic Audiovisual and AI-Integrated Web Systems Development',
    'hero.tagline': 'Cinema • Drones • AI • Web Development',
    'hero.cta.projects': 'View Portfolio',
    'hero.cta.contact': 'Request Quote',
    'hero.cta.showreel': 'Watch Showreel',

    // Brands
    'brands.title': 'Companies that trust our ecosystem',

    // About
    'about.title': 'The Digital Strategist',
    'about.p1': "I'm not just a task executor; I'm the <highlight1>architect of your digital authority</highlight1>. With over 15 years in the audiovisual market, I founded production companies, served major brands and covered everything from political campaigns to cinematic projects.",
    'about.p2': 'Today, I work as <highlight2>Creative & Technology Director</highlight2>, merging classic cinema narrative with the power of <highlight3>Web Development and Artificial Intelligence</highlight3>. My goal is not just to deliver a beautiful video or an aesthetic website, but to build a complete digital ecosystem.',
    'about.p3': 'An ecosystem that <highlight1>positions your brand</highlight1>, captures attention and <highlight2>converts leads automatically</highlight2>. End to end: from code to camera lens.',
    'about.stats.years': 'Years of Experience',
    'about.stats.projects': 'Projects delivered',
    'about.stats.jjp': 'Years JJP Produções',
    'about.stats.ideas': 'Creative Ideas',

    // Mind Map
    'mindmap.title': 'Visual Strategist & Tech Developer',
    'mindmap.subtitle': 'Creative & Technology Director | Merging classic cinema narrative with Web Development and AI | From code to camera lens',
    'mindmap.filmmaker': 'Filmmaker & Screenwriter',
    'mindmap.filmmaker.desc': 'Directing, screenwriting and cinematography. Film graduate from Centro Europeu',
    'mindmap.vfx': 'VFX & Motion Design',
    'mindmap.vfx.desc': 'Advanced post-production specialist, After Effects, Motion Art Pro',
    'mindmap.drone': 'Aerial Technology',
    'mindmap.drone.desc': 'Drone cinematography (Mastercod) and aerial capture strategies',
    'mindmap.pr': 'Public Relations Dir.',
    'mindmap.pr.desc': 'São Mateus do Sul City Hall — institutional communication and media strategy',
    'mindmap.ai': 'Generative AI',
    'mindmap.ai.desc': 'AI to optimize scripts, pre-visualization and create complex dynamic worlds',
    'mindmap.3d': 'Immersion & 3D',
    'mindmap.3d.desc': 'Unreal Engine and Blender for virtual sets and product visualizations',

    // Process
    'process.title': 'Creative Process',
    'process.subtitle': 'From briefing to final delivery — every project goes through careful steps to ensure excellence',
    'process.step1': 'Briefing',
    'process.step1.desc': 'Understanding your vision, goals and target audience',
    'process.step2': 'Script & Planning',
    'process.step2.desc': 'Storyboard, locations, schedule and team',
    'process.step3': 'Production',
    'process.step3.desc': 'Filming with cinema cameras, drones and professional audio',
    'process.step4': 'Post-Production & Delivery',
    'process.step4.desc': 'Editing, VFX, color grading, mixing and mastering',

    // Skills
    'skills.title': 'Creative Arsenal',
    'skills.cat.audiovisual': 'Audiovisual',
    'skills.cat.ai': 'Artificial Intelligence',
    'skills.cat.dev': 'Development',
    'skills.websites': 'Website Creation',
    'skills.systems': 'Web Systems',

    // Projects
    'projects.title': 'Visual Portfolio',
    'projects.showreel.title': 'JJP PRODUÇÕES - Showreel',
    'projects.showreel.desc': 'Professional aerial footage compilation',
    'projects.agro.title': 'Record Your Planting or Harvest',
    'projects.agro.desc': 'Aerial harvest coverage - 2.2k views',
    'projects.motion.title': 'Motion Design 3D',
    'projects.motion.desc': '3D animations for social media',
    'projects.events.title': 'Corporate Events',
    'projects.events.desc': 'Openings and corporate coverage',

    // VFX
    'vfx.badge': 'VFX & POST-PRODUCTION',
    'vfx.title': 'Before & After',
    'vfx.subtitle': 'See the magic of post-production. Drag the slider to compare raw footage with the final result after VFX.',
    'vfx.scene': 'Scene Composition',
    'vfx.scene.desc': 'Background replacement and professional color correction',
    'vfx.neural': 'Neural Enhancement',
    'vfx.neural.desc': 'AI-powered visual effects and motion graphics',
    'vfx.cyber': 'Cyberpunk Transformation',
    'vfx.cyber.desc': 'Digital manipulation and cinematic stylization',
    'vfx.shield': 'Energy Effects',
    'vfx.shield.desc': 'Particles, shields and sci-fi effects with 3D compositing',
    'vfx.chroma': 'Advanced Chroma Key',
    'vfx.chroma.desc': 'Seamless virtual set integration',
    'vfx.jump': 'Dimensional Jump',
    'vfx.jump.desc': 'Transition effects and dimensional manipulation',

    // Music Videos
    'music.title': 'Music Videos',
    'music.subtitle': 'Narratives that bring music to life. Our expanding segment with complete conceptual productions, from script to final cut, cinema in every frame.',
    'music.clip1.title': 'Music Video - Artist 1',
    'music.clip1.desc': 'Full production with chroma key and visual effects',
    'music.clip2.title': 'Music Video - Artist 2',
    'music.clip2.desc': 'On-location filming with drone and cinema camera',
    'music.clip3.title': 'Music Video - Artist 3',
    'music.clip3.desc': 'Chroma key studio with 3D animations',
    'music.cta.title': 'Want to create your next music video?',
    'music.cta.desc': 'We offer complete packages for independent artists and labels. From concept to final delivery, we transform your music into a visual experience.',
    'music.cta.budget': 'Request Music Video Quote',
    'music.cta.prices': 'View Packages & Prices',

    // Experience
    'exp.title': 'Professional Journey',
    'exp.dev.title': 'Systems Developer & AI Solutions',
    'exp.dev.company': 'JJP Produções / Freelance',
    'exp.dev.period': '2024 - Present',
    'exp.dev.desc': 'Portfolio expansion into web platform creation, high-conversion landing pages and intelligent automations with AI, adding value to a solid audiovisual production foundation.',
    'exp.pr.title': 'Public Relations Director',
    'exp.pr.company': 'São Mateus do Sul City Hall',
    'exp.pr.period': 'Mar 2024 - Present',
    'exp.pr.desc': 'Institutional communication management, content production and social media strategies.',
    'exp.filmmaker.title': 'Filmmaker & Motion Designer',
    'exp.filmmaker.company': 'JJP Produções',
    'exp.filmmaker.period': 'Jan 2016 - Present (9 years)',
    'exp.filmmaker.desc': 'Full audiovisual production, motion design and 3D animation for diverse clients.',
    'exp.founder.title': 'Founder',
    'exp.founder.company': 'JJP PRODUÇÕES',
    'exp.founder.period': '2019 - Present (6 years)',
    'exp.founder.desc': 'Specialization in aerial drone imagery for businesses and events.',
    'exp.editor.title': 'Cinematographer & Editor',
    'exp.editor.company': 'Uniguaçu',
    'exp.editor.period': 'May 2013 - Mar 2015',
    'exp.editor.desc': 'Production of programs for young/adult audiences, event capture and editing.',

    // AI Gallery
    'ai.title': 'AI Generative Creations',
    'ai.subtitle': 'Creative explorations generated with artificial intelligence — click to enlarge',

    // Web Development
    'webdev.badge': 'NEW VERTICAL',
    'webdev.title': 'Website & Systems Development',
    'webdev.subtitle': 'High-conversion landing pages, web platforms and intelligent automations with AI — from concept to deploy.',
    'webdev.landing.title': 'High-Conversion Landing Pages',
    'webdev.landing.desc': 'Optimized pages to capture leads and convert visitors into clients.',
    'webdev.landing.f1': 'Responsive and modern design',
    'webdev.landing.f2': 'Integrated SEO optimization',
    'webdev.landing.f3': 'WhatsApp and forms integration',
    'webdev.platforms.title': 'Platforms & Web Systems',
    'webdev.platforms.desc': 'Complete systems for management, transparency portals and dashboards.',
    'webdev.platforms.f1': 'React, Next.js, TypeScript',
    'webdev.platforms.f2': 'Database and APIs',
    'webdev.platforms.f3': 'Admin panel',
    'webdev.ai.title': 'AI Automations',
    'webdev.ai.desc': 'Artificial intelligence integrated to optimize processes and experiences.',
    'webdev.ai.f1': 'Chatbots and smart assistants',
    'webdev.ai.f2': 'Automated content generation',
    'webdev.ai.f3': 'Claude and Gemini integration',
    'webdev.cta.title': 'Need a website or system?',
    'webdev.cta.desc': 'We combine audiovisual expertise with modern development to create digital experiences that impress and convert.',
    'webdev.cta.button': 'Request Web Quote',

    // Services / Pricing
    'pricing.title': 'Our Services',
    'pricing.subtitle': 'High-impact creative solutions. From design to animation, we transform your vision into reality.',
    'pricing.cta': 'Request a Quote',

    // Service 1 - Animation
    'svc.anim.title': 'Bring Your Drawings to Life',
    'svc.anim.desc': 'We transform static sketches, illustrations or mascots into fluid animations with cinematic quality.',
    'svc.anim.f1': '2D and 3D animation from static artwork',
    'svc.anim.f2': 'Lip sync and AI-powered dubbing',
    'svc.anim.f3': 'Professional camera movements',
    'svc.anim.f4': 'Ideal for authors, illustrators and creators',
    'svc.anim.price': 'Starting at R$ 397',

    // Service 2 - Thumbnails
    'svc.thumb.title': 'YouTube Thumbnails & Art',
    'svc.thumb.desc': 'Boost your clicks (CTR) with mesmerizing thumbnails and high-retention visual identity for your channel.',
    'svc.thumb.f1': 'Photorealistic high-conversion thumbnails',
    'svc.thumb.f2': 'Banners and Community tab artwork',
    'svc.thumb.f3': 'Consistent characters for Dark Channels',
    'svc.thumb.f4': 'Design focused on attention psychology',
    'svc.thumb.price': 'Packages from R$ 97',

    // Service 3 - Branding
    'svc.brand.title': 'Complete Visual Identity',
    'svc.brand.desc': 'We build memorable brands. Far beyond a logo, we deliver the perfect visual ecosystem for your business.',
    'svc.brand.f1': 'Professional Logo Creation',
    'svc.brand.f2': 'Color palette and typography definition',
    'svc.brand.f3': 'Brand Book (Brand Usage Manual)',
    'svc.brand.f4': 'Social media and print applications',
    'svc.brand.price': 'Starting at R$ 997',

    // Service 4 - Restoration
    'svc.restore.title': 'Historical Archive Recovery',
    'svc.restore.desc': 'The past comes alive. We restore, colorize and animate old photographs and videos with artificial intelligence.',
    'svc.restore.f1': 'Restoration of damaged or scratched photos',
    'svc.restore.f2': 'Realistic colorization of B&W images',
    'svc.restore.f3': 'Subtle photo animation (motion effect)',
    'svc.restore.f4': 'Upscale and resolution enhancement to 4K',
    'svc.restore.price': 'Starting at R$ 147 / piece',

    // Cases
    'cases.title': 'Featured Projects',
    'cases.subtitle': 'Real results that transform businesses. Discover some of our highest-impact projects.',
    'cases.c1.title': 'SMS Tourism Portal',
    'cases.c1.desc': 'Complete web platform with interactive 3D map and multilingual support for São Mateus do Sul City Hall.',
    'cases.c1.result': 'System in production',
    'cases.c2.title': 'JJP Institutional Videos',
    'cases.c2.desc': 'Cinematic audiovisual production for retail, fashion and agribusiness companies.',
    'cases.c2.result': '60+ projects delivered',
    'cases.c3.title': 'PNAB Transparency Portal',
    'cases.c3.desc': 'Cultural transparency system with LAI/LGPD compliance for municipal public management.',
    'cases.c3.result': 'Legal compliance',
    'cases.c4.title': 'Aerial Coverage',
    'cases.c4.desc': 'Professional aerial drone footage for events, real estate and regional tourism.',
    'cases.c4.result': '2k+ views',

    // Methodology
    'method.title': 'Our Process',
    'method.subtitle': 'Clear 3-step methodology to deliver exceptional results — from concept to launch.',
    'method.s1.title': 'Briefing & Strategy',
    'method.s1.desc': 'We understand your business, target audience and goals. We define scope, timeline and success metrics.',
    'method.s2.title': 'Production & Development',
    'method.s2.desc': 'Cinematic filming, motion design and AI-powered coding. Everything integrated in an agile pipeline.',
    'method.s3.title': 'Delivery & Scale',
    'method.s3.desc': 'Launch, performance optimization and post-delivery follow-up to ensure results.',

    // Testimonials
    'testimonials.title': 'What My Clients Say',
    'test.t1.name': 'Carlos Eduardo',
    'test.t1.role': 'Commercial Director',
    'test.t1.text': 'The level of professionalism is outstanding. We hired him for just an institutional video, but his strategic vision led us to overhaul our entire web presence. The new website integrated with audiovisual increased our client acquisition in just a few weeks.',
    'test.t2.name': 'Mariana Silveira',
    'test.t2.role': 'Founder & Startup CEO',
    'test.t2.text': 'The speed and modernity Jacob brings to the table are unmatched. The use of AI combined with top-tier editing delivered material that seemed like it took months, but was delivered in record time with cinema quality.',
    'test.t3.name': 'Roberto Alves',
    'test.t3.role': 'Content Producer & Podcast Host',
    'test.t3.text': 'We were losing social media engagement. His approach with viral cuts, dynamic subtitles and retention-focused editing completely changed our profile\'s game. Excellent strategic partner.',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know before investing in your next project',
    'faq.q1': 'How does the Complete Ecosystem package work?',
    'faq.a1': 'It\'s our definitive end-to-end solution. We plan your narrative, shoot cinematic audiovisual material and develop a high-conversion website (Landing Page or System) already integrated with that material and AI automations to capture clients 24/7.',
    'faq.q2': 'Does the Web Presence package include website hosting?',
    'faq.a2': 'To ensure your complete technical autonomy, the domain and hosting always remain in the client\'s name. However, I provide all the consulting and configuration needed on the best platforms, delivering your site live, fast and secure, with no hassle for you.',
    'faq.q3': 'Do you produce music videos or only corporate videos?',
    'faq.a3': 'I have strong roots in music video production, including screenwriting, directing, chroma key and VFX. Although my main focus today is corporate and web development, I make room in my schedule for artistic projects that demand high cinematic quality.',
    'faq.q4': 'How does the video approval and revision process work?',
    'faq.a4': 'We work with validated processes. After the first cut edit (Rough Cut), the material is sent via platform for feedback. Our intermediate and advanced packages cover generous revision rounds to ensure the final result exceeds your expectations before delivery in 4K/8K.',
    'faq.q5': 'Are viral cuts for TikTok/Shorts created from my material or do you film new content?',
    'faq.a5': 'Both options. We can either edit your existing material (like podcasts and talks) applying visual retention techniques and dynamic subtitles, or schedule exclusive studio filming sessions to produce a short video library for your entire month.',

    // Contact
    'contact.title': 'Direct Connection',
    'contact.cta.heading': 'Ready to transform your vision into reality?',
    'contact.cta.desc': 'Share a few details and I\'ll come back with a tailored quote within 24 business hours. Available for projects in Brazil and internationally.',
    'contact.form.title': 'Send your message',
    'contact.form.desc': 'Tell me a bit about the project and I\'ll reply within 24 business hours.',
    'contact.social.title': 'Social Media',
    'contact.social.desc': 'Follow my work, recent releases and behind-the-scenes updates.',
    'contact.location.title': 'Location',
    'contact.location.city': 'São Mateus do Sul, Paraná, Brazil',
    'contact.location.available': 'Available for remote collaboration and on-location production in Brazil and internationally',

    // Footer
    'footer.slogan': 'Transforming ideas into high-impact visual and digital narratives.',
    'footer.links': 'Quick Links',
    'footer.services': 'Services',
    'footer.pricing': 'Our Services',
    'footer.svc.sites': 'Website Development',
    'footer.svc.ai': 'AI Systems',
    'footer.svc.video': 'Institutional Video',
    'footer.svc.motion': 'Motion Design',
    'footer.dev': 'Developed by Jacob Jonson Portela',
    'footer.rights': 'All rights reserved.',

    // Mobile CTA
    'cta.budget': 'Free Quote',

    // Contact Form
    'form.name': 'Name',
    'form.name.placeholder': 'Your name',
    'form.company': 'Company',
    'form.company.placeholder': 'Your company name',
    'form.message': 'Message',
    'form.message.placeholder': 'Describe your project...',
    'form.send': 'Send Message',
    'form.sending': 'Sending...',

    // 404
    '404.subtitle': 'SIGNAL LOST',
    '404.desc': 'The transmission you seek has been interrupted or never existed in this dimension.',
    '404.terminal.search': '$ locate page',
    '404.terminal.searching': 'Searching...',
    '404.terminal.error': 'ERROR 404: File not found in /multiverse/',
    '404.terminal.redirect': 'Redirecting to home base...',
    '404.home': 'Home Base',
    '404.back': 'Go Back',

    // Preloader
    'preloader.subtitle': 'Productions',

    // WhatsApp
    'whatsapp.label': 'Chat on WhatsApp',
    'whatsapp.message': 'Hello! I would like to request a quote.',

    // Services Page
    'services.title': 'Services & Pricing',
    'services.subtitle': 'Transparent packages for every need. From simple to complex, we deliver cinematic excellence.',
    'services.back': 'Back to Portfolio',
    'services.features': 'Includes:',
    'services.budget': 'Request Quote',
    'services.custom.title': 'Custom project?',
    'services.custom.desc': "Have a project that doesn't fit the packages above? No problem! Every project is unique and we can create a custom package to meet your needs.",
    'services.custom.cta': 'Talk about my project',
    'svc.drone': 'Drone Cinematography',
    'svc.drone.desc': 'Aerial footage for brands, destinations, real estate and events that need scale and polish.',
    'svc.drone.f1': 'Licensed pilot and professional flight planning',
    'svc.drone.f2': 'DJI drone setup for commercial-grade capture',
    'svc.drone.f3': '4K aerial footage with cinematic framing',
    'svc.drone.f4': 'Color and editing aligned with the final campaign',
    'svc.drone.f5': 'Delivery prepared for web, ads and presentations',
    'svc.drone.p1': 'Essential aerial coverage',
    'svc.drone.p1d': 'Targeted capture session with selected hero shots',
    'svc.drone.p2': 'Campaign support',
    'svc.drone.p2d': 'Broader aerial coverage with graded selects and edit-ready assets',
    'svc.drone.p3': 'Signature aerial package',
    'svc.drone.p3d': 'Full aerial storytelling package with polished delivery',
    'svc.motion': 'Motion Design & 3D Animation',
    'svc.motion.desc': 'Animated pieces that help the brand feel more distinctive and more current.',
    'svc.motion.f1': '2D, 3D and composited motion work',
    'svc.motion.f2': 'After Effects, Cinema 4D and hybrid workflows',
    'svc.motion.f3': 'Animated brand assets and visual systems',
    'svc.motion.f4': 'Versions prepared for social, ads and presentations',
    'svc.motion.f5': 'Refinement focused on clarity and finish',
    'svc.motion.p1': 'Logo and identity animation',
    'svc.motion.p1d': 'Short-form animated ident with a polished reveal',
    'svc.motion.p2': 'Campaign motion piece',
    'svc.motion.p2d': 'Motion content for launches, ads or branded communication',
    'svc.motion.p3': 'Full motion package',
    'svc.motion.p3d': 'Broader 3D or mixed-media animation with layered delivery',
    'svc.production': 'Audiovisual Production',
    'svc.production.desc': 'From concept to final cut, films built to communicate clearly and elevate perception.',
    'svc.production.f1': 'Creative direction, script support and planning',
    'svc.production.f2': 'Professional filming for brand and institutional content',
    'svc.production.f3': 'Lighting, sound and production coordination',
    'svc.production.f4': 'Editing, post-production and delivery versions',
    'svc.production.f5': 'Color, polish and final finishing',
    'svc.production.p1': 'Core institutional film',
    'svc.production.p1d': 'Lean production scope for a concise brand film',
    'svc.production.p2': 'Expanded brand film',
    'svc.production.p2d': 'Broader scope with interviews, supporting scenes and campaign-ready edits',
    'svc.production.p3': 'High-end documentary or campaign scope',
    'svc.production.p3d': 'Multi-location production with stronger narrative depth and finishing',
    'svc.editing': 'Editing & Post-Production',
    'svc.editing.desc': 'Post-production for projects that need stronger rhythm, clarity and polish.',
    'svc.editing.f1': 'Editing in professional broadcast-grade workflows',
    'svc.editing.f2': 'Color grading and visual consistency',
    'svc.editing.f3': 'Graphics, captions and motion support',
    'svc.editing.f4': 'Sound clean-up and mix preparation',
    'svc.editing.f5': 'Exports tailored to each channel',
    'svc.editing.p1': 'Short-form edit',
    'svc.editing.p1d': 'Concise cut for reels, ads or fast-turn social content',
    'svc.editing.p2': 'Campaign or institutional edit',
    'svc.editing.p2d': 'Longer-form edit with graphics, pacing and finishing',
    'svc.editing.p3': 'Advanced post-production',
    'svc.editing.p3d': 'Compositing, VFX, cleanup and a higher-end finish',
    'svc.music': 'Music Video Production',
    'svc.music.desc': 'Concept-driven production for artists and releases that need stronger visual identity.',
    'svc.music.f1': 'Creative direction and concept development',
    'svc.music.f2': 'Studio or location-based filming',
    'svc.music.f3': 'Multi-camera coverage and performance capture',
    'svc.music.f4': 'VFX, motion and visual treatments',
    'svc.music.f5': 'Delivery prepared for launch and distribution',
    'svc.music.p1': 'Performance-based video',
    'svc.music.p1d': 'Lean shoot focused on performance and solid finishing',
    'svc.music.p2': 'Concept-driven release',
    'svc.music.p2d': 'Expanded visual treatment with narrative or stylized direction',
    'svc.music.p3': 'Signature music video',
    'svc.music.p3d': 'Broader production scope with multiple looks, locations and finish layers',
    'svc.ai': 'AI-Assisted Production',
    'svc.ai.desc': 'AI integrated where it speeds up development, concepts and delivery support.',
    'svc.ai.f1': 'Concept generation and mood exploration',
    'svc.ai.f2': 'AI-assisted scripting and pre-production support',
    'svc.ai.f3': 'Pre-visualization and creative testing',
    'svc.ai.f4': 'Restoration, upscaling and enhancement',
    'svc.ai.f5': 'Voice, dubbing and hybrid production support',
    'svc.ai.p1': 'Concept pack',
    'svc.ai.p1d': 'Visual references and concept exploration for early-stage direction',
    'svc.ai.p2': 'AI pre-production',
    'svc.ai.p2d': 'Storyboard, script support and concept material for planning',
    'svc.ai.p3': 'Hybrid AI production',
    'svc.ai.p3d': 'Video delivery that combines filmed material with AI-assisted elements',
    'aa.s1.tag': 'Service',
    'aa.s1.title': 'Lead handling and first-response flows',
    'aa.s1.desc': 'Automations for first contact, qualification and repeated questions across channels.',
    'aa.s1.f1': 'Faster replies with consistent information',
    'aa.s1.f2': 'Lead capture and routing to the right person',
    'aa.s1.f3': 'Less manual follow-up at the top of the funnel',
    'aa.s2.tag': 'Operations',
    'aa.s2.title': 'Internal workflow automation',
    'aa.s2.desc': 'Connected steps for approvals, handoffs, reminders and repetitive internal tasks.',
    'aa.s2.f1': 'Less operational friction',
    'aa.s2.f2': 'Fewer manual handoffs between tools',
    'aa.s2.f3': 'More consistency across the routine',
    'aa.s3.tag': 'Content',
    'aa.s3.title': 'Content and briefing support',
    'aa.s3.desc': 'Assistive flows for collecting information, preparing briefs and generating first drafts.',
    'aa.s3.f1': 'Structured intake and briefing collection',
    'aa.s3.f2': 'Faster first drafts and internal documentation',
    'aa.s3.f3': 'More time for strategy and review',
    'aa.s4.tag': 'Insights',
    'aa.s4.title': 'Reporting and visibility',
    'aa.s4.desc': 'Automatic organization of data and recurring updates for teams that need clearer decision-making.',
    'aa.s4.f1': 'Dashboards and recurring summaries',
    'aa.s4.f2': 'Less time spent compiling updates',
    'aa.s4.f3': 'Faster visibility into what needs action',
    'aa.p1': 'The team answers the same questions manually every day.',
    'aa.p2': 'Leads arrive, but nobody qualifies or routes them consistently.',
    'aa.p3': 'Internal handoffs depend too much on memory and chat messages.',
    'aa.p4': 'Reports take too long to assemble and quickly go out of date.',
    'aa.p5': 'The operation has bottlenecks, but no one has time to map them properly.',
    'aa.h1.title': 'Map the current workflow',
    'aa.h1.desc': 'We identify where time is being lost, which steps repeat the most and where the highest friction sits.',
    'aa.h2.title': 'Prioritize the right automation',
    'aa.h2.desc': 'Not everything should be automated. We choose the parts that create the clearest operational gain.',
    'aa.h3.title': 'Build, test and validate',
    'aa.h3.desc': 'The automation is structured, tested and adjusted around the real daily routine before scaling.',
    'aa.h4.title': 'Monitor and refine',
    'aa.h4.desc': 'Once live, the flow is reviewed and improved so it remains reliable as the operation evolves.',
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(resolveInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const t = (key: string): string => {
    return translations[lang][key] || translations['pt'][key] || key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
