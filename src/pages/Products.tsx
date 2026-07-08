import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clapperboard,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  DIGITAL_PRODUCTS,
  getLocalizedValue,
  type DigitalProduct,
} from "@/data/products";
import { useI18n } from "@/i18n";
import { applyPageSeo, getHomePath } from "@/lib/seo";

const productIcons = {
  prompts: MessagesSquare,
  video: Clapperboard,
  planner: LayoutDashboard,
  course: GraduationCap,
} as const;

export default function Products() {
  const { lang } = useI18n();
  const isEnglish = lang === "en";
  const homePath = getHomePath(lang);

  const pageMeta = isEnglish
    ? {
        title: "Digital Products in Progress | Jacob Jonson Labs",
        description:
          "Kits, templates and digital resources in development for communication, video, AI and creative operations.",
        pathname: "/products",
      }
    : {
        title: "Produtos Digitais em Preparação | Jacob Jonson Labs",
        description:
          "Kits, templates e materiais digitais em desenvolvimento para comunicação, vídeo, IA e operação criativa.",
        pathname: "/produtos",
      };

  useEffect(() => {
    applyPageSeo({
      lang,
      title: pageMeta.title,
      description: pageMeta.description,
      pathname: pageMeta.pathname,
    });
  }, [lang, pageMeta.description, pageMeta.pathname, pageMeta.title]);

  const copy = isEnglish
    ? {
        eyebrow: "Digital products",
        title: "Digital products in progress for communication, video and AI.",
        description:
          "Digital products in development to support communication, video, AI and creative operations. This showcase gathers upcoming resources and beta materials that may be released through early access.",
        primaryCta: "Preview products",
        secondaryCta: "Ask about a custom product",
        highlights: [
          "No in-site payment flow",
          "Early-access and interest CTAs only",
          "Products are still being prepared",
        ],
        trustTitle: "Built as a transparent product preview",
        trustText:
          "This page presents the product direction before final release. Interest links open a direct conversation instead of sending visitors to a payment flow.",
        trustBullets: [
          "No payment flow on the site",
          "No promise of immediate delivery",
          "Easy to update when each product becomes real",
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Is payment processed on this site?",
            answer:
              "No. These products are still in preparation, so the calls to action only open a direct contact path for interest or early access.",
          },
          {
            question: "Can these become paid products later?",
            answer:
              "Yes. The page is structured so final product links can be connected later, but no payment flow or purchase promise is active now.",
          },
          {
            question: "Who are these products for?",
            answer:
              "Communication teams, institutional content operations, creators, agencies and professionals who need more consistency and speed in daily delivery.",
          },
          {
            question: "Can you create a custom internal version for a team?",
            answer:
              "Yes. The storefront can lead to custom packs, internal templates, training materials or guided implementation based on the team's workflow.",
          },
        ],
        ctaTitle: "Need a custom pack, internal kit or team version?",
        ctaText:
          "If the operation needs something more specific than the products in preparation, I can structure a tailored material for communication, content or institutional production.",
        ctaButton: "Discuss a custom product",
        statusContext: "Product in progress",
        priceLabel: "Expected price",
        formatLabel: "Expected format",
        audienceLabel: "Best fit for",
        benefitsLabel: "Benefits",
        backLabel: "Back to portfolio",
      }
    : {
        eyebrow: "Produtos digitais",
        title: "Produtos digitais em preparação para comunicação, vídeo e IA.",
        description:
          "Produtos digitais em desenvolvimento para acelerar comunicação, vídeo, IA e operação criativa. Esta vitrine reúne materiais em preparação e versões beta que poderão ser liberadas por acesso antecipado.",
        primaryCta: "Ver prévia dos produtos",
        secondaryCta: "Falar sobre produto customizado",
        highlights: [
          "Sem fluxo de pagamento no site",
          "CTAs apenas para interesse e acesso antecipado",
          "Produtos ainda em preparação",
        ],
        trustTitle: "Estruturado como prévia transparente",
        trustText:
          "A página apresenta a direção dos produtos antes do lançamento final. Os links de interesse abrem contato direto, sem promessa de compra imediata.",
        trustBullets: [
          "Sem fluxo de pagamento no site",
          "Sem promessa de entrega imediata",
          "Fácil de atualizar quando cada produto ficar pronto",
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "O pagamento acontece dentro do site?",
            answer:
              "Não. Os produtos ainda estão em preparação, então os CTAs apenas abrem um caminho direto de contato para interesse ou acesso antecipado.",
          },
          {
            question: "Esses materiais podem virar produtos pagos depois?",
            answer:
              "Sim. A página está estruturada para receber links finais no futuro, mas nenhum fluxo de pagamento ou promessa de compra está ativo agora.",
          },
          {
            question: "Para quem esses produtos foram pensados?",
            answer:
              "Para equipes de comunicação, operações de conteúdo, assessorias, criadores, agências e profissionais institucionais que precisam de mais consistência e agilidade.",
          },
          {
            question: "Dá para criar uma versão customizada para equipe?",
            answer:
              "Sim. A vitrine pode levar para packs internos, templates próprios, materiais de capacitação ou implementação guiada conforme o fluxo da equipe.",
          },
        ],
        ctaTitle: "Precisa de um pack customizado, kit interno ou versão para equipe?",
        ctaText:
          "Se a sua operação precisa de algo mais específico do que os produtos em preparação, posso estruturar um material sob medida para comunicação, conteúdo ou produção institucional.",
        ctaButton: "Conversar sobre produto customizado",
        statusContext: "Produto em preparação",
        priceLabel: "Preço previsto",
        formatLabel: "Formato previsto",
        audienceLabel: "Mais indicado para",
        benefitsLabel: "Benefícios",
        backLabel: "Voltar ao portfólio",
      };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />

      <main className="relative overflow-x-clip pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-0 top-[26rem] h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute right-0 top-[48rem] h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <section className="pt-28 pb-16">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <Link
                to={homePath}
                className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {copy.backLabel}
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                <ShoppingBag className="h-3.5 w-3.5" />
                {copy.eyebrow}
              </div>

              <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[0.95] sm:text-5xl lg:text-[4rem]">
                {copy.title}
              </h1>
              <p className="mx-auto mt-5 max-w-[52rem] text-lg leading-relaxed text-muted-foreground">
                {copy.description}
              </p>

              <div className="mt-10 grid gap-3 lg:grid-cols-3">
                {copy.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-background/45 px-4 py-4 text-sm text-muted-foreground"
                  >
                    <div className="flex items-start justify-center gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span className="max-w-[22rem] text-balance font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GlowButton
                  size="lg"
                  glowColor="pink"
                  onClick={() =>
                    document.getElementById("catalogo-produtos")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {copy.primaryCta}
                </GlowButton>
                <a
                  href={`https://wa.me/5542988283963?text=${encodeURIComponent(
                    isEnglish
                      ? "Hello! I need a custom digital product for my team."
                      : "Olá! Preciso de um produto digital customizado para a minha equipe."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-base font-semibold text-foreground/86 transition hover:border-white/30 hover:bg-white/5"
                >
                  {copy.secondaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="catalogo-produtos" className="pb-20">
          <div className="container">
            <div className="grid gap-6 xl:grid-cols-2">
              {DIGITAL_PRODUCTS.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 80}>
                  <ProductCard product={product} lang={lang} copy={copy} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <ScrollReveal>
                <NeonCard borderColor="cyan" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/80">
                    {copy.trustTitle}
                  </p>
                  <h2 className="mt-4 text-3xl">
                    {isEnglish
                      ? "A preview now, final products later."
                      : "Prévia agora, produtos finais depois."}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {copy.trustText}
                  </p>
                </NeonCard>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <NeonCard borderColor="green" className="h-full">
                  <div className="grid gap-4 md:grid-cols-3">
                    {copy.trustBullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <ShieldCheck className="h-4 w-4 text-accent" />
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                {copy.faqTitle}
              </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                  {isEnglish
                  ? "A clean setup for release later."
                  : "Estrutura limpa para lançamento depois."}
                </h2>
            </ScrollReveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {copy.faqItems.map((item, index) => (
                <ScrollReveal key={item.question} delay={index * 70}>
                  <NeonCard borderColor={index % 2 === 0 ? "pink" : "cyan"} className="h-full">
                    <h3 className="text-xl">{item.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </NeonCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-3xl">
              <NeonCard borderColor="pink" className="text-center">
                <BookOpenText className="mx-auto h-8 w-8 text-primary" />
                <h2 className="mt-5 text-3xl">{copy.ctaTitle}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {copy.ctaText}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <GlowButton
                    size="lg"
                    glowColor="pink"
                    onClick={() =>
                      window.open(
                        `https://wa.me/5542988283963?text=${encodeURIComponent(
                          isEnglish
                            ? "Hello! I want to discuss a custom digital product."
                            : "Olá! Quero conversar sobre um produto digital customizado."
                        )}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
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

function ProductCard({
  product,
  lang,
  copy,
}: {
  product: DigitalProduct;
  lang: "pt" | "en";
  copy: {
    statusContext: string;
    priceLabel: string;
    formatLabel: string;
    audienceLabel: string;
    benefitsLabel: string;
  };
}) {
  const Icon = productIcons[product.icon];
  const title = getLocalizedValue(product.title, lang);
  const category = getLocalizedValue(product.category, lang);
  const shortDescription = getLocalizedValue(product.shortDescription, lang);
  const longDescription = getLocalizedValue(product.longDescription, lang);
  const price = getLocalizedValue(product.price, lang);
  const statusLabel = getLocalizedValue(product.statusLabel, lang);
  const ctaLabel = getLocalizedValue(product.ctaLabel, lang);
  const format = getLocalizedValue(product.format, lang);
  const audience = getLocalizedValue(product.audience, lang);
  const benefits = getLocalizedValue(product.benefits, lang) as string[];
  const borderColor = product.accent;
  const interestUrl = `https://wa.me/5542988283963?text=${encodeURIComponent(
    lang === "en"
      ? `Hello! I would like to register interest in "${title}".`
      : `Olá! Quero registrar interesse em "${title}".`
  )}`;

  return (
    <NeonCard borderColor={borderColor} className="flex h-full flex-col overflow-hidden p-0">
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5 text-foreground" />
          </div>

          <div className="flex max-w-[13rem] flex-col items-end gap-2 text-right">
            <span className="text-clamp-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {category}
            </span>
            <span
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              {statusLabel}
            </span>
          </div>
        </div>

        <h2 className="text-2xl leading-tight md:text-[1.9rem]">{title}</h2>
        <p className="text-clamp-3 mt-3 text-sm leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>
        <p className="text-clamp-3 mt-4 text-sm leading-relaxed text-muted-foreground">
          {longDescription}
        </p>

        <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {copy.priceLabel}
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">{price}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {copy.formatLabel}
            </p>
            <p className="text-clamp-2 mt-2 leading-relaxed text-muted-foreground">{format}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {copy.audienceLabel}
            </p>
            <p className="text-clamp-2 mt-2 leading-relaxed text-muted-foreground">{audience}</p>
          </div>
        </div>

        <div className="mt-5 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {copy.benefitsLabel}
          </p>
          <div className="mt-3 space-y-2.5">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="mb-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
            <span>{copy.statusContext}</span>
          </div>
          <a
            href={interestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/15"
          >
            <MessageCircle className="h-4 w-4" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </NeonCard>
  );
}
