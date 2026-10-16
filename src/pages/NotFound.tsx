import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

export default function NotFound() {
  const { lang } = useI18n();
  const english = lang === "en";
  return (
    <Layout page="home">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">404</p>
          <h1 className="mt-4 text-4xl sm:text-6xl">{english ? "Page not found" : "Página não encontrada"}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            {english
              ? "This address is not part of the site. Head back to the studio home."
              : "Esse endereço não faz parte do site. Volte para a página inicial do estúdio."}
          </p>
          <Link to={pages.home[lang]} className="mt-8 inline-flex min-h-12 items-center bg-primary px-6 font-semibold text-background">
            {english ? "Back home" : "Voltar ao início"}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
