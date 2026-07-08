import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://jacobjonsonfilmmaker.netlify.app";
const SOCIAL_IMAGE_URL = `${BASE_URL}/JACOBCYBER1.webp`;
const SOCIAL_IMAGE_ALT =
  "Jacob Jonson em estética cyberpunk cinematográfica para AI Creative Studio";
const distDir = path.resolve("dist");
const templatePath = path.join(distDir, "index.html");

const routes = [
  {
    route: "/",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Jacob Jonson | AI Creative Studio, Experiências Digitais e Audiovisual",
    description:
      "Direção criativa para audiovisual cinematográfico, IA generativa, design, web e automação. Experiências digitais e sistemas visuais para marcas com mais presença.",
    keywords:
      "AI Creative Studio, experiências digitais, audiovisual, IA generativa, design, automação, direção criativa, conteúdo cinematográfico, landing pages, sistemas visuais, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/en",
    lang: "en",
    ogLocale: "en_US",
    title: "Jacob Jonson | AI Creative Studio, Digital Experiences and Film",
    description:
      "Creative direction for cinematic video, generative AI, design, web and automation. Digital experiences and visual systems for brands that need sharper presence.",
    keywords:
      "AI Creative Studio, digital experiences, cinematic video, generative AI, design, automation, creative direction, landing pages, visual systems, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/servicos",
    canonicalRoute: "/",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Jacob Jonson | AI Creative Studio, Experiências Digitais e Audiovisual",
    description:
      "Direção criativa para audiovisual cinematográfico, IA generativa, design, web e automação. Experiências digitais e sistemas visuais para marcas com mais presença.",
    keywords:
      "AI Creative Studio, experiências digitais, audiovisual, IA generativa, design, automação, direção criativa, conteúdo cinematográfico, landing pages, sistemas visuais, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/services",
    canonicalRoute: "/en",
    lang: "en",
    ogLocale: "en_US",
    title: "Jacob Jonson | AI Creative Studio, Digital Experiences and Film",
    description:
      "Creative direction for cinematic video, generative AI, design, web and automation. Digital experiences and visual systems for brands that need sharper presence.",
    keywords:
      "AI Creative Studio, digital experiences, cinematic video, generative AI, design, automation, creative direction, landing pages, visual systems, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/en/services",
    canonicalRoute: "/en",
    lang: "en",
    ogLocale: "en_US",
    title: "Jacob Jonson | AI Creative Studio, Digital Experiences and Film",
    description:
      "Creative direction for cinematic video, generative AI, design, web and automation. Digital experiences and visual systems for brands that need sharper presence.",
    keywords:
      "AI Creative Studio, digital experiences, cinematic video, generative AI, design, automation, creative direction, landing pages, visual systems, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/produtos",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Produtos Digitais em Preparação | Jacob Jonson Labs",
    description:
      "Kits, templates e materiais digitais em desenvolvimento para comunicação, vídeo, IA e operação criativa.",
    keywords:
      "produtos digitais em preparação, prompts para comunicação, roteiro institucional, template editorial, IA, operação criativa, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/produtos`,
      en: `${BASE_URL}/en/products`,
    },
  },
  {
    route: "/loja",
    canonicalRoute: "/produtos",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Produtos Digitais em Preparação | Jacob Jonson Labs",
    description:
      "Kits, templates e materiais digitais em desenvolvimento para comunicação, vídeo, IA e operação criativa.",
    keywords:
      "produtos digitais em preparação, prompts para comunicação, roteiro institucional, template editorial, IA, operação criativa, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/produtos`,
      en: `${BASE_URL}/en/products`,
    },
  },
  {
    route: "/products",
    canonicalRoute: "/en/products",
    lang: "en",
    ogLocale: "en_US",
    title: "Digital Products in Progress | Jacob Jonson Labs",
    description:
      "Kits, templates and digital resources in development for communication, video, AI and creative operations.",
    keywords:
      "digital products in progress, prompt kits, institutional video scripts, editorial templates, AI, creative operations, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/produtos`,
      en: `${BASE_URL}/en/products`,
    },
  },
  {
    route: "/en/products",
    lang: "en",
    ogLocale: "en_US",
    title: "Digital Products in Progress | Jacob Jonson Labs",
    description:
      "Kits, templates and digital resources in development for communication, video, AI and creative operations.",
    keywords:
      "digital products in progress, prompt kits, institutional video scripts, editorial templates, AI, creative operations, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/produtos`,
      en: `${BASE_URL}/en/products`,
    },
  },
  {
    route: "/ativos-digitais",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Ativos digitais | Jacob Jonson",
    description:
      "Produtos digitais premium, templates e ativos prontos para criadores, editores, agências e marcas que precisam de velocidade com qualidade no Brasil e no exterior.",
    keywords:
      "ativos digitais, templates criativos, produtos digitais, edição, IA generativa, design, automação, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/ativos-digitais`,
      en: `${BASE_URL}/en/digital-assets`,
    },
  },
  {
    route: "/digital-assets",
    canonicalRoute: "/en/digital-assets",
    lang: "en",
    ogLocale: "en_US",
    title: "Digital assets | Jacob Jonson",
    description:
      "Premium digital products, templates and ready-to-use assets for creators, editors, agencies and brands that need speed with quality in Brazil and internationally.",
    keywords:
      "digital assets, creative templates, digital products, editing, generative AI, design, automation, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/ativos-digitais`,
      en: `${BASE_URL}/en/digital-assets`,
    },
  },
  {
    route: "/en/digital-assets",
    lang: "en",
    ogLocale: "en_US",
    title: "Digital assets | Jacob Jonson",
    description:
      "Premium digital products, templates and ready-to-use assets for creators, editors, agencies and brands that need speed with quality in Brazil and internationally.",
    keywords:
      "digital assets, creative templates, digital products, editing, generative AI, design, automation, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/ativos-digitais`,
      en: `${BASE_URL}/en/digital-assets`,
    },
  },
  {
    route: "/automacao-ia",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Automação com IA | Jacob Jonson",
    description:
      "Automação com IA e fluxos inteligentes para atendimento, operação, comunicação e processos internos com foco prático de negócio no Brasil e no exterior.",
    keywords:
      "automação com IA, fluxos inteligentes, atendimento automatizado, comunicação, operação, OpenAI, n8n, automação criativa, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/automacao-ia`,
      en: `${BASE_URL}/en/ai-automation`,
    },
  },
  {
    route: "/ai-automation",
    canonicalRoute: "/en/ai-automation",
    lang: "en",
    ogLocale: "en_US",
    title: "AI automation | Jacob Jonson",
    description:
      "AI automation and intelligent workflows for service, operations, communication and internal processes with practical business focus in Brazil and internationally.",
    keywords:
      "AI automation, intelligent workflows, service automation, operations, communication, OpenAI, n8n, creative automation, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/automacao-ia`,
      en: `${BASE_URL}/en/ai-automation`,
    },
  },
  {
    route: "/en/ai-automation",
    lang: "en",
    ogLocale: "en_US",
    title: "AI automation | Jacob Jonson",
    description:
      "AI automation and intelligent workflows for service, operations, communication and internal processes with practical business focus in Brazil and internationally.",
    keywords:
      "AI automation, intelligent workflows, service automation, operations, communication, OpenAI, n8n, creative automation, Jacob Jonson",
    alternates: {
      pt: `${BASE_URL}/automacao-ia`,
      en: `${BASE_URL}/en/ai-automation`,
    },
  },
  {
    route: "/cases/creativeos",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "CreativeOS — case study de produto digital | Jacob Jonson",
    description:
      "Case study do CreativeOS, MVP público para organizar briefings, prompts, templates e fluxos criativos em um só painel.",
    keywords:
      "CreativeOS, case study, produto digital, IA aplicada, sistema criativo, operação criativa, MVP, Jacob Jonson",
    image: `${BASE_URL}/JACOBBRAIN.webp`,
    imageAlt: "CreativeOS — Operação criativa em um painel só",
    staticContent: {
      title: "CreativeOS — Operação criativa em um painel só",
      description:
        "Um MVP autoral para organizar o caos antes da criação começar, conectando briefing, prompts, templates e fluxo criativo em um workspace beta.",
      sections: [
        {
          heading: "Desafio",
          body:
            "Nem toda demanda criativa começa com um briefing claro. O desafio foi transformar mensagens soltas, prints, referências e prompts incompletos em direção, roteiro, arte, post, vídeo, legenda, aprovação e entrega.",
        },
        {
          heading: "Solução / Entrega",
          body:
            "Workspace beta publicado para organizar briefings, prompts base, templates e fluxos criativos em um só painel. O projeto é apresentado como MVP e laboratório profissional de operação criativa.",
        },
        {
          heading: "Resultado",
          body:
            "MVP público publicado, com fluxo de organização de demandas, prompts, templates, workspace criativo e captação inicial de feedback.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/creativeos`,
      en: `${BASE_URL}/en/cases/creativeos`,
    },
  },
  {
    route: "/en/cases/creativeos",
    lang: "en",
    ogLocale: "en_US",
    title: "CreativeOS — digital product case study | Jacob Jonson",
    description:
      "Case study for CreativeOS, a public MVP built to organize briefs, prompt bases, templates and creative workflows in one workspace.",
    keywords:
      "CreativeOS, case study, digital product, applied AI, creative system, creative operations, MVP, Jacob Jonson",
    image: `${BASE_URL}/JACOBBRAIN.webp`,
    imageAlt: "CreativeOS — Creative operations in one workspace",
    staticContent: {
      title: "CreativeOS — Creative operations in one workspace",
      description:
        "A self-initiated MVP built to organize the mess before creation starts, connecting briefs, prompt bases, templates and creative workflow in a beta workspace.",
      sections: [
        {
          heading: "Challenge",
          body:
            "Creative requests do not always start with a clear brief. The challenge was to turn loose messages, screenshots, references and rough prompts into direction, script, art, post, video, caption, approval and delivery.",
        },
        {
          heading: "Solution / Delivery",
          body:
            "A published beta workspace for organizing briefs, prompt bases, templates and creative workflows in one panel. The project is presented as an MVP and professional creative-operations lab.",
        },
        {
          heading: "Result",
          body:
            "Public MVP published with a flow for organizing requests, prompts, templates, creative workspace and initial feedback capture.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/creativeos`,
      en: `${BASE_URL}/en/cases/creativeos`,
    },
  },
  {
    route: "/cases/turismo-sao-mateus-do-sul",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Turismo São Mateus do Sul — case study | Jacob Jonson",
    description:
      "Case study do portal oficial de turismo de São Mateus do Sul, com organização visual, conteúdo, rotas, eventos e experiência digital.",
    keywords:
      "Turismo São Mateus do Sul, case study, site institucional, turismo, comunicação pública, experiência digital, Jacob Jonson",
    image: `${BASE_URL}/portfolio/turismo-onde-fica.jpg`,
    imageAlt: "Turismo São Mateus do Sul",
    staticContent: {
      title: "Turismo São Mateus do Sul",
      description:
        "Portal oficial de turismo criado para organizar atrativos, eventos, rotas, empreendimentos e identidade turística do município.",
      sections: [
        {
          heading: "Desafio",
          body:
            "Organizar informações de turismo de forma acessível, atrativa e utilizável pela população, visitantes e comunicação institucional.",
        },
        {
          heading: "Solução / Entrega",
          body:
            "Site oficial de turismo com páginas, estrutura visual, conteúdo, rotas, informações de empreendimentos, eventos e identidade turística.",
        },
        {
          heading: "Resultado",
          body:
            "Portal oficial publicado para organizar atrativos, rotas, eventos, empreendimentos e a identidade turística de São Mateus do Sul.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/turismo-sao-mateus-do-sul`,
      en: `${BASE_URL}/en/cases/tourism-sao-mateus-do-sul`,
    },
  },
  {
    route: "/en/cases/tourism-sao-mateus-do-sul",
    lang: "en",
    ogLocale: "en_US",
    title: "Tourism São Mateus do Sul — case study | Jacob Jonson",
    description:
      "Case study for the official São Mateus do Sul tourism portal, covering visual organization, content, routes, events and digital experience.",
    keywords:
      "Tourism São Mateus do Sul, case study, institutional website, tourism, public communication, digital experience, Jacob Jonson",
    image: `${BASE_URL}/portfolio/turismo-onde-fica.jpg`,
    imageAlt: "Tourism São Mateus do Sul",
    staticContent: {
      title: "Tourism São Mateus do Sul",
      description:
        "Official tourism portal built to organize attractions, events, routes, local businesses and the city's tourism identity.",
      sections: [
        {
          heading: "Challenge",
          body:
            "Organize tourism information in a way that is accessible, attractive and useful for residents, visitors and institutional communication.",
        },
        {
          heading: "Solution / Delivery",
          body:
            "Official tourism website with pages, visual structure, content, routes, local business information, events and tourism identity.",
        },
        {
          heading: "Result",
          body:
            "Official portal published to organize attractions, routes, events, local businesses and the tourism identity of São Mateus do Sul.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/turismo-sao-mateus-do-sul`,
      en: `${BASE_URL}/en/cases/tourism-sao-mateus-do-sul`,
    },
  },
  {
    route: "/cases/minha-arte-e-minha-vida",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Minha Arte é Minha Vida — case study audiovisual | Jacob Jonson",
    description:
      "Case study do videoclipe Minha Arte é Minha Vida, de Alan Fuzer, com roteiro, captação, direção, edição, pós-produção e apoio criativo com IA.",
    keywords:
      "Minha Arte é Minha Vida, Alan Fuzer, case study, videoclipe, direção audiovisual, pós-produção, Jacob Jonson",
    image: `${BASE_URL}/portfolio/arte-e-vida.jpg`,
    imageAlt: "Videoclipe Minha Arte é Minha Vida — Alan Fuzer",
    staticContent: {
      title: "Videoclipe “Minha Arte é Minha Vida” — Alan Fuzer",
      description:
        "Nova versão visual do clipe, mantendo a essência da primeira versão e elevando a qualidade de captação, edição, curadoria e pós-produção.",
      sections: [
        {
          heading: "Desafio",
          body:
            "Recriar o clipe mantendo a essência e algumas características da primeira versão, mas com organização, qualidade visual e entrega final superiores.",
        },
        {
          heading: "Solução / Entrega",
          body:
            "Reuniões, briefing, agenda, captação em uma tarde de sábado, edição, curadoria de material antigo e integração de registros extras captados na RDXFM.",
        },
        {
          heading: "Resultado",
          body:
            "Entrega aprovada pelo artista, com nova versão visual do clipe e material complementar captado durante o lançamento na RDXFM.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/minha-arte-e-minha-vida`,
      en: `${BASE_URL}/en/cases/minha-arte-e-minha-vida`,
    },
  },
  {
    route: "/en/cases/minha-arte-e-minha-vida",
    lang: "en",
    ogLocale: "en_US",
    title: "Minha Arte é Minha Vida — music video case study | Jacob Jonson",
    description:
      "Case study for Alan Fuzer's Minha Arte é Minha Vida music video, covering script, camera, direction, editing, post-production and AI-assisted creative support.",
    keywords:
      "Minha Arte é Minha Vida, Alan Fuzer, case study, music video, audiovisual direction, post-production, Jacob Jonson",
    image: `${BASE_URL}/portfolio/arte-e-vida.jpg`,
    imageAlt: "Minha Arte é Minha Vida Music Video — Alan Fuzer",
    staticContent: {
      title: "“Minha Arte é Minha Vida” Music Video — Alan Fuzer",
      description:
        "A new visual version of the music video, preserving the essence of the first cut while improving capture, editing, curation and post-production quality.",
      sections: [
        {
          heading: "Challenge",
          body:
            "Recreate the music video while keeping the essence and some characteristics of the first version, with stronger organization, visual quality and final delivery.",
        },
        {
          heading: "Solution / Delivery",
          body:
            "Meetings, briefing, schedule organization, footage captured in one Saturday afternoon, editing, old-material curation and additional records captured at RDXFM.",
        },
        {
          heading: "Result",
          body:
            "Delivery approved by the artist, with a new visual version of the music video and complementary material captured during the RDXFM launch.",
        },
      ],
    },
    alternates: {
      pt: `${BASE_URL}/cases/minha-arte-e-minha-vida`,
      en: `${BASE_URL}/en/cases/minha-arte-e-minha-vida`,
    },
  },
];

const escapeAttr = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderStaticContent = (content) => {
  if (!content) return "";

  const sections = content.sections
    .map(
      (section) => `
          <section>
            <h2>${escapeHtml(section.heading)}</h2>
            <p>${escapeHtml(section.body)}</p>
          </section>`
    )
    .join("");

  return `<article style="max-width: 920px; margin: 0 auto; padding: 96px 24px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #f4f7fb; background: #0b0f1a;">
          <p style="text-transform: uppercase; letter-spacing: .22em; color: #00e5ff; font-size: 12px; font-weight: 700;">Case study</p>
          <h1>${escapeHtml(content.title)}</h1>
          <p>${escapeHtml(content.description)}</p>
          ${sections}
        </article>`;
};

const replaceMeta = (html, name, content) =>
  html.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*(")`, "i"),
    `$1${escapeAttr(content)}$2`
  );

const replaceLink = (html, rel, href, hreflang) => {
  const hreflangPart = hreflang ? `[^>]*hreflang="${hreflang}"[^>]*` : "";
  const pattern = new RegExp(
    `(<link\\s+rel="${rel}"${hreflangPart ? `\\s+${hreflangPart}` : ""}[^>]*href=")[^"]*(")`,
    "i"
  );

  return html.replace(pattern, `$1${escapeAttr(href)}$2`);
};

const replaceStructuredData = (html, currentUrl, description) =>
  html
    .replace(/"url"\s*:\s*"[^"]*"/, `"url": ${JSON.stringify(currentUrl)}`)
    .replace(/"description"\s*:\s*"[^"]*"/, `"description": ${JSON.stringify(description)}`);

const writeRouteHtml = async (template, config) => {
  const canonicalRoute = config.canonicalRoute ?? config.route;
  const currentUrl = `${BASE_URL}${canonicalRoute}`;
  const socialImage = config.image ?? SOCIAL_IMAGE_URL;
  const socialImageAlt = config.imageAlt ?? SOCIAL_IMAGE_ALT;
  let html = template;

  html = html.replace(/<html lang="[^"]*">/i, `<html lang="${config.lang}">`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
  html = replaceMeta(html, "description", config.description);
  if (config.keywords) {
    html = replaceMeta(html, "keywords", config.keywords);
  }
  html = replaceMeta(html, "language", config.lang);
  html = replaceMeta(html, "og:title", config.title);
  html = replaceMeta(html, "og:description", config.description);
  html = replaceMeta(html, "og:url", currentUrl);
  html = replaceMeta(html, "og:locale", config.ogLocale);
  html = replaceMeta(html, "og:image", socialImage);
  html = replaceMeta(html, "og:image:secure_url", socialImage);
  html = replaceMeta(html, "og:image:alt", socialImageAlt);
  html = replaceMeta(html, "twitter:title", config.title);
  html = replaceMeta(html, "twitter:description", config.description);
  html = replaceMeta(html, "twitter:image", socialImage);
  html = replaceMeta(html, "twitter:image:alt", socialImageAlt);
  html = replaceLink(html, "canonical", currentUrl);
  html = replaceLink(html, "alternate", config.alternates.pt, "pt-BR");
  html = replaceLink(html, "alternate", config.alternates.en, "en");
  html = replaceLink(html, "alternate", `${BASE_URL}/`, "x-default");
  html = replaceStructuredData(html, currentUrl, config.description);

  const initialLangValue = config.lang === "pt-BR" ? "pt" : "en";
  html = html.replace(
    /window\.__INITIAL_LANG__ = lang;/,
    `window.__INITIAL_LANG__ = "${initialLangValue}";`
  );

  if (config.staticContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderStaticContent(config.staticContent)}</div>`
    );
  }

  const filePath =
    config.route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, config.route.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");

  if (config.route !== "/") {
    const cleanUrlFilePath = path.join(
      distDir,
      `${config.route.replace(/^\//, "")}.html`
    );
    await mkdir(path.dirname(cleanUrlFilePath), { recursive: true });
    await writeFile(cleanUrlFilePath, html, "utf8");
  }
};

const template = await readFile(templatePath, "utf8");

for (const route of routes) {
  await writeRouteHtml(template, route);
}
