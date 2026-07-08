import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers3,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import NeonCard from "@/components/NeonCard";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCaseBySlug } from "@/data/caseStudies";
import { useI18n } from "@/i18n";
import { applyPageSeo, getHomePath } from "@/lib/seo";

export default function CaseStudy() {
  const { lang } = useI18n();
  const { caseSlug } = useParams();
  const caseStudy = getCaseBySlug(caseSlug, lang);
  const homePath = getHomePath(lang);
  const isEnglish = lang === "en";
  const content = caseStudy?.content[lang];
  const seo = caseStudy?.seo[lang];
  const pagePath = caseStudy?.routes[lang];
  const whatsappText = isEnglish
    ? `Hello! I would like to talk about a project after seeing the ${content?.title ?? "case study"} case.`
    : `Olá! Gostaria de conversar sobre um projeto depois de ver o case ${content?.title ?? "case study"}.`;

  useEffect(() => {
    if (!caseStudy || !content || !seo || !pagePath) return;

    applyPageSeo({
      lang,
      title: seo.title,
      description: seo.description,
      pathname: pagePath,
      imageUrl: caseStudy.image,
      imageAlt: content.title,
    });
  }, [caseStudy, content, lang, pagePath, seo]);

  if (!caseStudy || !content || !seo || !pagePath) {
    return <Navigate to={homePath} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />

      <main className="relative overflow-x-clip pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-0 top-[34rem] h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute right-0 top-[60rem] h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <section className="pt-28 pb-14 md:pt-32 md:pb-16">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-6xl">
              <Link
                to={`${homePath}#projects`}
                className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {isEnglish ? "Back to cases" : "Voltar aos cases"}
              </Link>

              <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary/75">
                    {content.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-4xl text-4xl leading-[0.95] sm:text-5xl lg:text-[4.55rem]">
                    {content.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    {content.shortDescription}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={caseStudy.publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-3.5 text-sm font-semibold text-secondary transition hover:border-secondary/60 hover:bg-secondary/15 md:px-6 md:text-base"
                    >
                      {isEnglish ? "View published project" : "Ver projeto publicado"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://wa.me/5542988283963?text=${encodeURIComponent(whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3.5 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/15 md:px-6 md:text-base"
                    >
                      {isEnglish ? "Discuss a project" : "Falar sobre um projeto"}
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="cinematic-surface overflow-hidden rounded-[1.5rem]">
                  <div className="relative">
                    <img
                      src={caseStudy.image}
                      alt={content.title}
                      loading="eager"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover opacity-95 saturate-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-background/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary/80">
                        {content.area}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/82">
                        {content.publicNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-10 md:py-14" aria-labelledby="case-summary">
          <div className="container">
            <ScrollReveal>
              <NeonCard borderColor={caseStudy.color}>
                <div className="mb-6 flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-secondary" />
                  <h2 id="case-summary" className="text-2xl">
                    {isEnglish ? "Quick summary" : "Resumo rápido"}
                  </h2>
                </div>
                <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {content.summary.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </NeonCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2">
              <ScrollReveal>
                <NeonCard borderColor="pink" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
                    {isEnglish ? "Challenge" : "Desafio"}
                  </p>
                  <h2 className="mt-4 text-3xl">{isEnglish ? "The problem to solve" : "O problema a resolver"}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.challenge}</p>
                </NeonCard>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={80}>
                <NeonCard borderColor="cyan" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/75">
                    {isEnglish ? "Solution / Delivery" : "Solução / Entrega"}
                  </p>
                  <h2 className="mt-4 text-3xl">{isEnglish ? "What was built" : "O que foi entregue"}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.solution}</p>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" aria-labelledby="case-process">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <ScrollReveal className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                  {isEnglish ? "Process" : "Processo"}
                </p>
                <h2 id="case-process" className="text-3xl sm:text-4xl">
                  {isEnglish ? "How the project moved from brief to delivery" : "Como o projeto saiu do briefing para a entrega"}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">{content.delivery}</p>
              </ScrollReveal>
              <div className="grid gap-3">
                {content.process.map((step, index) => (
                  <ScrollReveal key={step} delay={index * 55}>
                    <div className="cinematic-surface rounded-2xl p-4">
                      <div className="flex gap-4">
                        <span className="text-lg font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                        <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <ScrollReveal>
                <NeonCard borderColor="green" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                    {isEnglish ? "Tools / Stack" : "Ferramentas / Stack"}
                  </p>
                  <h2 className="mt-4 text-3xl">{isEnglish ? "Production base" : "Base de produção"}</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {content.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </NeonCard>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={80}>
                <NeonCard borderColor={caseStudy.color} className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/75">
                    {isEnglish ? "Result" : "Resultado"}
                  </p>
                  <h2 className="mt-4 text-3xl">{isEnglish ? "What can be shown" : "O que pode ser mostrado"}</h2>
                  <div className="mt-5 flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-base leading-relaxed text-muted-foreground">{content.result}</p>
                  </div>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container">
            <ScrollReveal>
              <div className="cinematic-surface overflow-hidden rounded-[1.5rem] p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
                      {isEnglish ? "Next step" : "Próximo passo"}
                    </p>
                    <h2 className="mt-4 text-3xl">
                      {isEnglish ? "Need a hybrid creative delivery?" : "Precisa de uma entrega criativa híbrida?"}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {isEnglish
                        ? "I create audiovisual, digital and AI-assisted visual experiences for brands, artists and projects that need to turn ideas into memorable presence."
                        : "Crio experiências audiovisuais, digitais e visuais com IA para marcas, artistas e projetos que precisam transformar ideias em presença memorável."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <a
                      href={caseStudy.publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-3 text-sm font-semibold text-secondary transition hover:border-secondary/60 hover:bg-secondary/15"
                    >
                      {isEnglish ? "View published project" : "Ver projeto publicado"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link
                      to={homePath}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                      {isEnglish ? "Back to Home" : "Voltar para Home"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-background/80 py-12">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Jacob Jonson</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {isEnglish
                ? "A hybrid creative studio combining video, AI, web, design and automation."
                : "Um estúdio criativo híbrido que une audiovisual, IA, web, design e automação."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Creative Studio
            </span>
            <Link to={`${homePath}#contact`} className="inline-flex items-center gap-2 transition hover:text-foreground">
              <MessageCircle className="h-4 w-4 text-secondary" />
              {isEnglish ? "Contact" : "Contato"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
