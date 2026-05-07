import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Download,
  ExternalLink,
  FileVideo,
  Lock,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/i18n";
import { applyPageSeo, getHomePath } from "@/lib/seo";

interface Product {
  id: string;
  tagKey: string;
  titleKey: string;
  descKey: string;
  featKeys: string[];
  priceKey: string;
  noteKey: string;
  icon: React.ElementType;
  accentHsl: string;
  buyUrl: string;
  previewUrl?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "ae-political",
    tagKey: "da.p1.tag",
    titleKey: "da.p1.title",
    descKey: "da.p1.desc",
    featKeys: ["da.p1.feat1", "da.p1.feat2", "da.p1.feat3", "da.p1.feat4"],
    priceKey: "da.p1.price",
    noteKey: "da.p1.note",
    icon: FileVideo,
    accentHsl: "330 100% 55%",
    buyUrl: "https://gumroad.com/l/YOUR_PRODUCT_1",
  },
  {
    id: "capcut-workflows",
    tagKey: "da.p2.tag",
    titleKey: "da.p2.title",
    descKey: "da.p2.desc",
    featKeys: ["da.p2.feat1", "da.p2.feat2", "da.p2.feat3", "da.p2.feat4"],
    priceKey: "da.p2.price",
    noteKey: "da.p2.note",
    icon: Scissors,
    accentHsl: "195 100% 55%",
    buyUrl: "https://gumroad.com/l/YOUR_PRODUCT_2",
    featured: true,
  },
  {
    id: "prompt-engineering",
    tagKey: "da.p3.tag",
    titleKey: "da.p3.title",
    descKey: "da.p3.desc",
    featKeys: ["da.p3.feat1", "da.p3.feat2", "da.p3.feat3", "da.p3.feat4"],
    priceKey: "da.p3.price",
    noteKey: "da.p3.note",
    icon: Brain,
    accentHsl: "122 76% 58%",
    buyUrl: "https://gumroad.com/l/YOUR_PRODUCT_3",
  },
];

export default function DigitalAssets() {
  const { t, lang } = useI18n();
  const isEnglish = lang === "en";
  const pageMeta = isEnglish
    ? {
        title: "Digital assets | Jacob Jonson",
        description:
          "Premium digital products, templates and ready-to-use assets for creators, editors, agencies and in-house teams that need speed without losing quality.",
      }
    : {
        title: "Ativos digitais | Jacob Jonson",
        description:
          "Produtos digitais premium, templates e ativos prontos para criadores, editores, agências e marcas que precisam de velocidade com qualidade no Brasil e no exterior.",
      };

  useEffect(() => {
    applyPageSeo({
      lang,
      title: pageMeta.title,
      description: pageMeta.description,
      pathname: isEnglish ? "/digital-assets" : "/ativos-digitais",
    });
  }, [isEnglish, lang, pageMeta.description, pageMeta.title]);

  const homePath = getHomePath(lang);

  const handleBuy = (url: string) => {
    if (!url || url.includes("YOUR_PRODUCT")) {
      const msg = encodeURIComponent(
        isEnglish
          ? "Hello! I'm interested in one of your digital assets."
          : "Olá! Tenho interesse em um dos seus ativos digitais."
      );
      window.open(`https://wa.me/5542988283963?text=${msg}`, "_blank", "noopener,noreferrer");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePreview = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const copy = isEnglish
    ? {
        eyebrow: "Digital products",
        title: "Templates, packs and digital assets for creators and teams that need speed without losing polish.",
        description:
          "Ready-to-use tools built from real production workflows, designed to speed up editing, organize delivery and keep quality consistent.",
        points: [
          "Built from real production experience",
          "Useful for creators, agencies and in-house teams",
          "Straightforward purchase flow and direct support",
        ],
        whyTitle: "Why these products matter",
        whyText:
          "Ideal for teams that need to move faster, keep a consistent visual standard and reduce repeat work without rebuilding the whole workflow from scratch.",
        whyBullets: [
          "Cuts down production time",
          "Keeps output more consistent",
          "Turns workflow know-how into a scalable asset",
        ],
        ctaTitle: "Need a custom pack or internal toolkit?",
        ctaText:
          "If your team needs a template, pack or workflow built around the way you actually operate, I can develop a tailored digital product.",
        ctaButton: "Discuss a custom asset",
        trust: [
          "Simple purchase flow",
          "Delivery ready to use",
          "Direct support when needed",
        ],
      }
    : {
        eyebrow: "Produtos digitais",
        title: "Templates, packs e ativos prontos para criadores e marcas que precisam de velocidade com qualidade.",
        description:
          "Produtos digitais criados para acelerar edição, organizar rotinas criativas e manter o padrão de entrega alto em trabalhos recorrentes.",
        points: [
          "Produtos construídos a partir de fluxo real de produção",
          "Úteis para editores, criadores, agências e times internos",
          "Entrega rápida com caminho comercial simples",
        ],
        whyTitle: "Onde esses ativos entram",
        whyText:
          "Ideais para criadores, agências e times internos que precisam de mais velocidade, consistência e acabamento sem reconstruir o fluxo do zero.",
        whyBullets: [
          "Encurtam tempo de produção",
          "Elevam consistência visual",
          "Transformam know-how em produto escalável",
        ],
        ctaTitle: "Precisa de algo customizado para a sua operação?",
        ctaText:
          "Se você precisa de um pack, template, workflow ou material de apoio pensado para a sua operação, posso desenvolver uma solução sob medida.",
        ctaButton: "Falar com Jacob",
        trust: [
          "Fluxo de compra seguro",
          "Entrega pronta para download",
          "Suporte direto quando necessário",
        ],
      };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />

      <main className="relative overflow-x-clip pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
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
                <Sparkles className="h-3.5 w-3.5" />
                {copy.eyebrow}
              </div>

              <h1 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {copy.description}
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {copy.points.map((item) => (
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

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                {copy.trust.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-3">
              {PRODUCTS.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 90}>
                  <ProductCard
                    product={product}
                    t={t}
                    onBuy={() => handleBuy(product.buyUrl)}
                    onPreview={() => handlePreview(product.previewUrl ?? "")}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <ScrollReveal>
                <NeonCard borderColor="cyan" className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/80">
                    {copy.whyTitle}
                  </p>
                  <h2 className="mt-4 text-3xl">
                    {isEnglish
                      ? "Less operational friction, more consistency."
                      : "Menos atrito operacional, mais consistência."}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {copy.whyText}
                  </p>
                </NeonCard>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <NeonCard borderColor="green" className="h-full">
                  <div className="grid gap-4 md:grid-cols-3">
                    {copy.whyBullets.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Star className="h-4 w-4 text-accent" fill="currentColor" />
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container">
            <ScrollReveal className="mx-auto max-w-3xl">
              <NeonCard borderColor="pink" className="text-center">
                <Lock className="mx-auto h-8 w-8 text-primary" />
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
                            ? "Hello! I need a custom digital product."
                            : "Olá! Preciso de um produto digital personalizado."
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

interface CardProps {
  product: Product;
  t: (key: string) => string;
  onBuy: () => void;
  onPreview: () => void;
}

function ProductCard({ product, t, onBuy, onPreview }: CardProps) {
  const Icon = product.icon;
  const h = product.accentHsl;
  const isFeatured = product.featured;

  return (
    <NeonCard
      borderColor={product.featured ? "pink" : h.includes("195") ? "cyan" : h.includes("122") ? "green" : "pink"}
      className="flex h-full flex-col overflow-hidden p-0"
    >
      <div className="relative flex h-full flex-col p-7">
        {isFeatured && (
          <div className="mb-5 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-black">
            <Star className="h-3 w-3" fill="currentColor" />
            Best seller
          </div>
        )}

        <div className="mb-6 flex items-start justify-between gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              background: `hsl(${h} / 0.12)`,
              borderColor: `hsl(${h} / 0.25)`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: `hsl(${h})` }} />
          </div>

          <span
            className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              color: `hsl(${h})`,
              background: `hsl(${h} / 0.08)`,
              borderColor: `hsl(${h} / 0.24)`,
            }}
          >
            {t(product.tagKey)}
          </span>
        </div>

        <h2 className="text-2xl">{t(product.titleKey)}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(product.descKey)}</p>

        <div className="mt-6 space-y-3 flex-1">
          {product.featKeys.map((key) => (
            <div key={key} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <span>{t(key)}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <span className="text-3xl font-black" style={{ color: `hsl(${h})` }}>
              {t(product.priceKey)}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Download className="h-3.5 w-3.5" />
              {t(product.noteKey)}
            </span>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={onBuy}
              disabled={product.comingSoon}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: isFeatured ? `hsl(${h})` : `hsl(${h} / 0.1)`,
                color: isFeatured ? "black" : `hsl(${h})`,
                border: isFeatured ? "none" : `1px solid hsl(${h} / 0.35)`,
                boxShadow: isFeatured ? `0 0 24px hsl(${h} / 0.2)` : "none",
              }}
            >
              <Sparkles className="h-4 w-4" />
              {product.comingSoon ? "Coming soon" : t("da.buy")}
            </button>

            {product.previewUrl && (
              <button
                type="button"
                onClick={onPreview}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-muted-foreground transition hover:border-white/20 hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("da.preview")}
              </button>
            )}
          </div>
        </div>
      </div>
    </NeonCard>
  );
}
