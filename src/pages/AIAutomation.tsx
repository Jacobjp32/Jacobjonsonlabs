import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  Globe,
  Layers,
  MessageCircle,
  MessageSquare,
  Mic,
  Workflow,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/i18n";
import { applyPageSeo, getHomePath } from "@/lib/seo";

interface Service {
  tag: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  color: "pink" | "cyan" | "green" | "yellow";
}

export default function AIAutomation() {
  const { t, lang } = useI18n();
  const isEnglish = lang === "en";
  const pageMeta = isEnglish
    ? {
        title: "AI automation | Jacob Jonson",
        description:
          "AI automation and connected workflows for service, operations and internal processes, built with a practical business focus for teams in Brazil and internationally.",
      }
    : {
        title: "Automação com IA | Jacob Jonson",
        description:
          "Automação com IA e fluxos inteligentes para atendimento, operação, comunicação e processos internos com foco prático de negócio no Brasil e no exterior.",
      };
  const whatsapp = `https://wa.me/5542988283963?text=${encodeURIComponent(
    isEnglish
      ? "Hello! I want to understand your AI automation services."
      : "Olá! Quero entender melhor seus serviços de automação com IA."
  )}`;

  useEffect(() => {
    applyPageSeo({
      lang,
      title: pageMeta.title,
      description: pageMeta.description,
      pathname: isEnglish ? "/ai-automation" : "/automacao-ia",
    });
  }, [isEnglish, lang, pageMeta.description, pageMeta.title]);

  const homePath = getHomePath(lang);

  const services: Service[] = [
    {
      tag: t("aa.s1.tag"),
      title: t("aa.s1.title"),
      description: t("aa.s1.desc"),
      features: [t("aa.s1.f1"), t("aa.s1.f2"), t("aa.s1.f3")],
      icon: MessageSquare,
      color: "pink",
    },
    {
      tag: t("aa.s2.tag"),
      title: t("aa.s2.title"),
      description: t("aa.s2.desc"),
      features: [t("aa.s2.f1"), t("aa.s2.f2"), t("aa.s2.f3")],
      icon: Mic,
      color: "cyan",
    },
    {
      tag: t("aa.s3.tag"),
      title: t("aa.s3.title"),
      description: t("aa.s3.desc"),
      features: [t("aa.s3.f1"), t("aa.s3.f2"), t("aa.s3.f3")],
      icon: FileText,
      color: "yellow",
    },
    {
      tag: t("aa.s4.tag"),
      title: t("aa.s4.title"),
      description: t("aa.s4.desc"),
      features: [t("aa.s4.f1"), t("aa.s4.f2"), t("aa.s4.f3")],
      icon: BarChart3,
      color: "green",
    },
  ];

  const problems = [t("aa.p1"), t("aa.p2"), t("aa.p3"), t("aa.p4"), t("aa.p5")];

  const steps = [
    { number: "01", title: t("aa.h1.title"), description: t("aa.h1.desc") },
    { number: "02", title: t("aa.h2.title"), description: t("aa.h2.desc") },
    { number: "03", title: t("aa.h3.title"), description: t("aa.h3.desc") },
    { number: "04", title: t("aa.h4.title"), description: t("aa.h4.desc") },
  ];

  const stack = [
    { name: "Claude AI", icon: Bot, color: "text-primary" },
    { name: "OpenAI", icon: Cpu, color: "text-secondary" },
    { name: "n8n", icon: Workflow, color: "text-accent" },
    { name: "Make", icon: Layers, color: "text-[rgb(255,214,10)]" },
    { name: "WhatsApp API", icon: MessageCircle, color: "text-accent" },
    { name: "Google APIs", icon: Globe, color: "text-secondary" },
  ];

  const copy = isEnglish
    ? {
        eyebrow: "AI automation",
        title: "AI automation for service, operations and internal workflows.",
        description:
          "Connected workflows designed to reduce manual work, speed up response times and make day-to-day operations more reliable.",
        highlights: [
          "Useful for sales, service and internal operations",
          "Designed around real bottlenecks, not AI hype",
          "Built to save time without adding complexity",
        ],
        painTitle: "Common bottlenecks this can solve",
        servicesTitle: "Where automation can help",
        servicesText:
          "Automation works best when it removes repetitive steps, keeps information organized and frees the team for the work that actually needs judgment.",
        processTitle: "A clearer implementation path",
        stackTitle: "Typical tool stack",
        ctaTitle: "If repetitive work is slowing the team down, this is worth mapping.",
        ctaText:
          "We start by identifying bottlenecks, priorities and constraints so the automation is useful, safe and sustainable in day-to-day operations.",
        ctaButton: "Book a discovery call",
      }
    : {
        eyebrow: "Automação com IA",
        title: "Automação que tira peso operacional repetitivo e dá mais velocidade ao negócio.",
        description:
          "IA e fluxos conectados para atendimento, operação e comunicação, pensados para reduzir trabalho manual, acelerar respostas e melhorar a confiabilidade do processo.",
        highlights: [
          "Útil para atendimento, operação e comunicação",
          "Pensada em gargalos reais de fluxo",
          "Feita para reduzir esforço manual e aumentar velocidade de resposta",
        ],
        painTitle: "Gargalos comuns que isso pode resolver",
        servicesTitle: "Onde a automação pode ajudar",
        servicesText:
          "Automação funciona melhor quando simplifica a rotina, organiza melhor as informações e libera a equipe para o que realmente exige decisão humana.",
        processTitle: "Um caminho mais claro de implementação",
        stackTitle: "Stack de ferramentas mais comum",
        ctaTitle: "Se sua equipe perde tempo com processo repetitivo, isso vale diagnosticar.",
        ctaText:
          "Começamos identificando gargalos, prioridades e riscos para definir uma automação útil, segura e sustentável no dia a dia da operação.",
        ctaButton: "Agendar diagnóstico",
      };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />

      <main className="relative overflow-x-clip pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute left-0 top-[26rem] h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl" />
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

              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                <Bot className="h-3.5 w-3.5" />
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

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GlowButton
                  size="lg"
                  glowColor="pink"
                  onClick={() => window.open(whatsapp, "_blank", "noopener,noreferrer")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {copy.ctaButton}
                </GlowButton>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("automation-services")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-base font-semibold text-foreground/86 transition hover:border-white/30 hover:bg-white/5"
                >
                  {isEnglish ? "See automation options" : "Ver soluções"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <NeonCard borderColor="yellow">
                <div className="mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-[rgb(255,214,10)]" />
                  <h2 className="text-3xl">{copy.painTitle}</h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {problems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground"
                    >
                      <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[rgb(255,214,10)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </ScrollReveal>
          </div>
        </section>

        <section id="automation-services" className="pb-20">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/80">
                {copy.servicesTitle}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                {isEnglish
                  ? "Workflows for service, operations and scale."
                  : "Fluxos para atendimento, operação e escala."}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {copy.servicesText}
              </p>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 90}>
                  <AutomationCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <ScrollReveal>
                <NeonCard borderColor="cyan" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/80">
                    {copy.processTitle}
                  </p>
                  <h2 className="mt-4 text-3xl">
                    {isEnglish
                      ? "Map first, automate second."
                      : "Primeiro diagnosticar, depois automatizar."}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {isEnglish
                      ? "That avoids fragile solutions, unnecessary complexity and workflows nobody actually adopts."
                      : "Isso evita solução frágil, excesso técnico e fluxo que ninguém realmente usa no dia a dia."}
                  </p>
                </NeonCard>
              </ScrollReveal>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <ScrollReveal key={step.number} delay={index * 90}>
                    <NeonCard borderColor={index % 2 === 0 ? "pink" : "green"}>
                      <div className="flex gap-4">
                        <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-sm font-black text-primary">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="text-xl">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </NeonCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-4xl">
              <NeonCard borderColor="green">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                  {copy.stackTitle}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {stack.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-muted-foreground"
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-3xl">
              <NeonCard borderColor="pink" className="text-center">
                <Zap className="mx-auto h-8 w-8 text-primary" />
                <h2 className="mt-5 text-3xl">{copy.ctaTitle}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {copy.ctaText}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <GlowButton
                    size="lg"
                    glowColor="pink"
                    onClick={() => window.open(whatsapp, "_blank", "noopener,noreferrer")}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {copy.ctaButton}
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

function AutomationCard({ service }: { service: Service }) {
  return (
    <NeonCard borderColor={service.color} className="h-full">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
          <service.icon className="h-5 w-5 text-foreground" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {service.tag}
        </span>
      </div>
      <h3 className="text-2xl">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-5 space-y-3">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </NeonCard>
  );
}
