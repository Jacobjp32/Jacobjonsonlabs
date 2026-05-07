import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  MessageCircle,
  Mic,
  Plane as Drone,
  Play,
  Sparkles,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/i18n";
import { applyPageSeo, getHomePath } from "@/lib/seo";

export default function Services() {
  const { t, lang } = useI18n();
  const isEnglish = lang === "en";
  const pageMeta = isEnglish
    ? {
        title: "Services | Jacob Jonson",
        description:
          "Premium audiovisual services for brands, agencies and institutional projects in Brazil and internationally, including drone cinematography, editing and creative post-production.",
      }
    : {
        title: "Serviços | Jacob Jonson",
        description:
          "Serviços audiovisuais premium para marcas, empresas e projetos institucionais no Brasil e no exterior, incluindo drone, edição e pós-produção criativa.",
      };

  useEffect(() => {
    applyPageSeo({
      lang,
      title: pageMeta.title,
      description: pageMeta.description,
      pathname: isEnglish ? "/services" : "/servicos",
    });
  }, [isEnglish, lang, pageMeta.description, pageMeta.title]);

  const homePath = `${getHomePath(lang)}#services`;

  const serviceKeys = ["drone", "motion", "production", "editing", "music", "ai"] as const;
  const serviceIcons = [Drone, Sparkles, Camera, Play, Mic, Brain];
  const serviceColors = ["cyan", "pink", "green", "yellow", "pink", "cyan"] as const;

  const packageLabels = isEnglish
    ? ["Base scope", "Strategic scope", "Premium scope"]
    : ["Escopo base", "Escopo estratégico", "Escopo premium"];

  const packageNotes = isEnglish
    ? [
        "A lean starting point for smaller demands and punctual productions.",
        "A stronger structure for recurring content, campaigns and more complete delivery.",
        "Built for projects that need more direction, polish and perceived value.",
      ]
    : [
        "Ponto de partida enxuto para demandas menores e produções pontuais.",
        "Estrutura mais forte para conteúdo recorrente, campanhas e entregas mais completas.",
        "Pensado para projetos que precisam de mais direção, acabamento e percepção de valor.",
      ];

  const services = serviceKeys.map((key, index) => ({
    title: t(`svc.${key}`),
    icon: serviceIcons[index],
    color: serviceColors[index],
    description: t(`svc.${key}.desc`),
    features: [1, 2, 3, 4, 5].map((n) => t(`svc.${key}.f${n}`)),
    packages: [1, 2, 3].map((n, packageIndex) => ({
      name: t(`svc.${key}.p${n}`),
      details: t(`svc.${key}.p${n}d`),
      scopeLabel: packageLabels[packageIndex],
      scopeNote: packageNotes[packageIndex],
    })),
  }));

  const requestQuote = (serviceTitle: string, packageName?: string) => {
    const message = encodeURIComponent(
      isEnglish
        ? `Hello! I want to request a quote for ${serviceTitle}${packageName ? ` - ${packageName}` : ""}.`
        : `Olá! Quero solicitar um orçamento para ${serviceTitle}${packageName ? ` - ${packageName}` : ""}.`
    );

    window.open(`https://wa.me/5542988283963?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const copy = isEnglish
    ? {
        eyebrow: "Services",
        title: "Audiovisual services shaped around scope, strategy and delivery standard.",
        description:
          "From institutional films and branded campaigns to drone cinematography, editing and creative post-production, each scope is tailored to the objective, format and finish your project actually needs.",
        highlights: [
          "Custom quotes based on scope and deliverables",
          "Direction aligned to business goals and distribution",
          "Production, post and digital support under one lead",
        ],
        formatsTitle: "How these scopes work",
        formatsText:
          "Use the scopes below as a guide to the level of production each service can take. Final quotes depend on complexity, crew, shooting time, travel, revisions and post-production depth.",
        quoteButton: "Request quote",
        serviceButton: "Quote this project",
        customTitle: "Need a custom production scope?",
        customText:
          "For branded campaigns, institutional films, music videos, launches or projects that also need landing pages or automation, the best route is a tailored quote.",
        customButton: "Discuss my project",
      }
    : {
        eyebrow: "Serviços",
        title: "Soluções audiovisuais pensadas por escopo de projeto, não por tabela genérica de preço.",
        description:
          "De filmes institucionais e campanhas a captação com drone, edição e pós-produção criativa, cada serviço é desenhado de acordo com o objetivo, o formato e o padrão de entrega que o seu projeto precisa.",
        highlights: [
          "Orçamento personalizado para cada demanda",
          "Escopo alinhado ao objetivo, formato e padrão de entrega",
          "Audiovisual, edição e apoio digital sob uma direção única",
        ],
        formatsTitle: "Como ler estes blocos de serviço",
        formatsText:
          "Os blocos abaixo mostram o tipo de escopo que cada serviço pode assumir. O valor final depende de direção, tempo de captação, equipe, deslocamento, revisões e profundidade de pós-produção.",
        quoteButton: "Fazer orçamento",
        serviceButton: "Orçar este projeto",
        customTitle: "Precisa de um projeto totalmente sob medida?",
        customText:
          "Para campanhas, institucionais, clipes, lançamentos ou projetos integrados com frente digital, o melhor caminho é um diagnóstico direto e um orçamento personalizado.",
        customButton: "Falar sobre meu projeto",
      };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />

      <main className="relative overflow-x-clip pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-[24rem] h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <section className="pt-28 pb-16">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-4xl text-center">
              <Link
                to={homePath}
                className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {isEnglish ? "Back to portfolio" : "Voltar ao portfólio"}
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {copy.eyebrow}
              </div>

              <h1 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {copy.description}
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {copy.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-background/45 px-4 py-4 text-sm text-muted-foreground"
                  >
                    <div className="mb-2 flex items-center justify-center gap-2 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <GlowButton
                  size="lg"
                  glowColor="pink"
                  onClick={() => requestQuote(isEnglish ? "audiovisual project" : "projeto audiovisual")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {copy.quoteButton}
                </GlowButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-16">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <NeonCard borderColor="cyan">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary/80">
                  {copy.formatsTitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {copy.formatsText}
                </p>
              </NeonCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="space-y-10">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 60}>
                  <NeonCard borderColor={service.color} className="overflow-hidden">
                    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                      <div>
                        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
                          <service.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <h2 className="text-3xl">{service.title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>

                        <div className="mt-6 space-y-3">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {service.packages.map((pkg, packageIndex) => (
                          <div
                            key={pkg.name}
                            className={`rounded-2xl border p-5 ${
                              packageIndex === 2
                                ? "border-primary/30 bg-primary/8"
                                : "border-white/10 bg-white/5"
                            }`}
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary/80">
                              {pkg.scopeLabel}
                            </p>
                            <h3 className="mt-3 text-xl font-bold">{pkg.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {pkg.details}
                            </p>
                            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/90">
                              {pkg.scopeNote}
                            </p>
                            <button
                              type="button"
                              onClick={() => requestQuote(service.title, pkg.name)}
                              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                            >
                              {copy.serviceButton}
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NeonCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-3xl">
              <NeonCard borderColor="green" className="text-center">
                <h2 className="text-3xl">{copy.customTitle}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {copy.customText}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <GlowButton
                    size="lg"
                    glowColor="green"
                    onClick={() => requestQuote(isEnglish ? "custom project" : "projeto personalizado")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {copy.customButton}
                  </GlowButton>
                  <a
                    href="mailto:jacobjonson32@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-secondary"
                  >
                    jacobjonson32@gmail.com
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </NeonCard>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
