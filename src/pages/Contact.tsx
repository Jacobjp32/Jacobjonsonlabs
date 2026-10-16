import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <Layout page="contact">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <SectionHeading
            level="h1"
            eyebrow={t("commercial.contact.eyebrow")}
            title={t("commercial.contact.title")}
            description={t("commercial.contact.description")}
          />
        </div>
      </section>
      <section id="brief" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("commercial.contact.direct.eyebrow")}</p>
            <h2 className="mt-4 text-2xl">{t("commercial.contact.direct.title")}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{t("commercial.contact.direct.description")}</p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
