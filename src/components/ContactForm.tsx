import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NeonCard from "./NeonCard";
import { useI18n } from "@/i18n";

const initialFormData = {
  name: "",
  whatsapp: "",
  company: "",
  service: "",
  message: "",
  botField: "",
};

const encodeForm = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

export default function ContactForm() {
  const { lang } = useI18n();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy =
    lang === "en"
      ? {
          name: "Name",
          namePlaceholder: "Your name",
          whatsapp: "WhatsApp",
          whatsappPlaceholder: "Your phone or WhatsApp number",
          company: "Company",
          companyPlaceholder: "Your brand or company",
          service: "Project type",
          servicePlaceholder: "Select the main scope",
          message: "Briefing",
          messagePlaceholder:
            "Tell me the goal, channels, references and what needs to change in perception or operation.",
          submit: "Send briefing",
          sending: "Sending...",
          note: "Prefer the fastest route? Send your brief directly on WhatsApp.",
          whatsappCta: "Talk on WhatsApp",
          success: "Brief received successfully. I'll get back to you shortly.",
          error: "There was an issue sending your message. Please try again.",
          services: [
            "Brand film / cinematic content",
            "AI visuals / concept development",
            "Landing page / digital experience",
            "Brand assets / design system",
            "Automation / creative workflow",
            "Editing / motion / VFX",
            "Other project",
          ],
        }
      : {
          name: "Nome",
          namePlaceholder: "Seu nome",
          whatsapp: "WhatsApp",
          whatsappPlaceholder: "+55 (42) 98828-3963",
          company: "Empresa",
          companyPlaceholder: "Sua marca ou empresa",
          service: "Tipo de projeto",
          servicePlaceholder: "Selecione a principal demanda",
          message: "Briefing",
          messagePlaceholder:
            "Conte o objetivo, canais, referencias e o que precisa mudar na percepcao ou na operacao.",
          submit: "Enviar briefing",
          sending: "Enviando...",
          note: "Prefere um caminho mais rápido? Envie seu briefing direto no WhatsApp.",
          whatsappCta: "Falar no WhatsApp",
          success: "Briefing enviado com sucesso. Retornarei em breve.",
          error: "Houve um problema ao enviar sua mensagem. Tente novamente.",
          services: [
            "Brand film / conteudo cinematografico",
            "Visuais com IA / desenvolvimento de conceito",
            "Landing page / experiencia digital",
            "Ativos de marca / sistema visual",
            "Automacao / workflow criativo",
            "Edicao / motion / VFX",
            "Outro projeto",
          ],
        };

  const handleChange =
    (field: keyof typeof initialFormData) =>
    (value: string) => {
      setFormData((current) => ({ ...current, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.botField) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeForm({
          "form-name": "contact",
          name: formData.name,
          whatsapp: formData.whatsapp,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          "bot-field": formData.botField,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      toast.success(copy.success);
      setFormData(initialFormData);
    } catch {
      toast.error(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NeonCard borderColor="pink" className="border-white/10 bg-card/80 p-0">
      <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-7">
        <input type="hidden" name="form-name" value="contact" />
        <div className="hidden">
          <label htmlFor="bot-field">Bot field</label>
          <input
            id="bot-field"
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botField}
            onChange={(event) => handleChange("botField")(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            {copy.name} *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(event) => handleChange("name")(event.target.value)}
            className="h-11 border-white/12 bg-background/40 focus-visible:ring-primary"
            placeholder={copy.namePlaceholder}
            autoComplete="name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold">
              {copy.whatsapp} *
            </label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(event) => handleChange("whatsapp")(event.target.value)}
              className="h-11 border-white/12 bg-background/40 focus-visible:ring-primary"
              placeholder={copy.whatsappPlaceholder}
              autoComplete="tel"
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-semibold">
              {copy.company}
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={(event) => handleChange("company")(event.target.value)}
              className="h-11 border-white/12 bg-background/40 focus-visible:ring-primary"
              placeholder={copy.companyPlaceholder}
              autoComplete="organization"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-semibold">
            {copy.service} *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={(event) => handleChange("service")(event.target.value)}
            className="flex h-11 w-full rounded-md border border-white/12 bg-background/40 px-3 text-sm text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              {copy.servicePlaceholder}
            </option>
            {copy.services.map((service) => (
              <option key={service} value={service} className="bg-card text-foreground">
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold">
            {copy.message} *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={(event) => handleChange("message")(event.target.value)}
            className="min-h-[140px] border-white/12 bg-background/40 focus-visible:ring-primary"
            placeholder={copy.messagePlaceholder}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/30 p-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            <p>{copy.note}</p>
          </div>
          <a
            href={`https://wa.me/5542988283963?text=${encodeURIComponent(
              lang === "en"
                ? "Hello! I would like to brief a project involving film, AI, design or digital experience."
                : "Ola! Gostaria de iniciar um briefing para um projeto com audiovisual, IA, design ou experiencia digital."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-accent transition hover:text-accent/80"
          >
            <MessageCircle className="h-4 w-4" />
            {copy.whatsappCta}
          </a>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-primary via-[hsl(335_95%_62%)] to-secondary text-primary-foreground shadow-[0_18px_45px_rgba(255,0,110,0.18)] transition hover:opacity-95"
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? copy.sending : copy.submit}
        </Button>
      </form>
    </NeonCard>
  );
}
