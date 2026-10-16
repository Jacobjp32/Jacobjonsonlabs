import { FormEvent, useEffect, useId, useState } from "react";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";

const empty = {
  name: "",
  email: "",
  company: "",
  service: "",
  deadline: "",
  message: "",
  botField: "",
};

const services = ["newSite", "siteRescue", "maintenance", "automation", "video", "partner", "other"] as const;
const deadlines = ["urgent", "2to4weeks", "1to2months", "flexible"] as const;

const encode = (data: Record<string, string>) => new URLSearchParams(data).toString();

export default function ContactForm() {
  const { lang, t } = useI18n();
  const location = useLocation();
  const formId = useId().replace(/:/g, "");
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const service = new URLSearchParams(location.search).get("service");
    const mapped =
      service === "web-development" ? "newSite" : service === "automation" ? "automation" : service === "video-editing" ? "video" : null;
    if (!mapped) return;
    const label = t(`commercial.contact.service.${mapped}`);
    setForm((current) => (current.service === label ? current : { ...current, service: label }));
  }, [location.search, lang, t]);

  const fieldId = (name: string) => `${formId}-${name}`;
  const update = (name: keyof typeof empty, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (form.botField) return;
    setStatus("loading");
    try {
      if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
        throw new Error("Netlify Forms is unavailable on the local Vite server");
      }
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          deadline: form.deadline,
          message: form.message,
          "bot-field": form.botField,
        }),
      });
      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  const selectClass =
    "h-12 w-full border border-white/14 bg-background/75 px-3 text-sm text-foreground focus:ring-2 focus:ring-primary";

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="border border-white/12 bg-card/55 p-5 sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label htmlFor={fieldId("bot-field")}>Do not fill this field</label>
        <input
          id={fieldId("bot-field")}
          name="bot-field"
          tabIndex={-1}
          autoComplete="off"
          value={form.botField}
          onChange={(event) => update("botField", event.target.value)}
        />
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("commercial.contact.field.name")} required htmlFor={fieldId("name")}>
          <input
            id={fieldId("name")}
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="h-12 w-full border border-white/14 bg-background/75 px-3 text-sm"
          />
        </Field>
        <Field label={t("commercial.contact.field.email")} required htmlFor={fieldId("email")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="h-12 w-full border border-white/14 bg-background/75 px-3 text-sm"
          />
        </Field>
        <Field label={t("commercial.contact.field.company")} htmlFor={fieldId("company")}>
          <input
            id={fieldId("company")}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            className="h-12 w-full border border-white/14 bg-background/75 px-3 text-sm"
          />
        </Field>
        <Field label={t("commercial.contact.field.service")} required htmlFor={fieldId("service")}>
          <select
            id={fieldId("service")}
            name="service"
            required
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            className={selectClass}
          >
            <option value="">{t("commercial.contact.select")}</option>
            {services.map((service) => (
              <option key={service} value={t(`commercial.contact.service.${service}`)}>
                {t(`commercial.contact.service.${service}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("commercial.contact.field.deadline")} required htmlFor={fieldId("deadline")}>
          <select
            id={fieldId("deadline")}
            name="deadline"
            required
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
            className={selectClass}
          >
            <option value="">{t("commercial.contact.select")}</option>
            {deadlines.map((deadline) => (
              <option key={deadline} value={t(`commercial.contact.deadline.${deadline}`)}>
                {t(`commercial.contact.deadline.${deadline}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={t("commercial.contact.field.message")} required htmlFor={fieldId("message")} className="mt-5">
        <textarea
          id={fieldId("message")}
          name="message"
          required
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={t("commercial.contact.messagePlaceholder")}
          className="min-h-[160px] w-full border border-white/14 bg-background/75 px-3 py-2 text-sm"
        />
      </Field>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 font-semibold text-background transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {t(status === "loading" ? "commercial.contact.sending" : "commercial.contact.submit")}
      </button>
      <div className="mt-4 min-h-6 text-sm" aria-live="polite" role="status">
        {status === "success" ? (
          <p className="flex items-center gap-2 text-teal-300">
            <CircleCheck className="h-4 w-4" aria-hidden="true" />
            {t("commercial.contact.success")}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2 text-amber-200">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("commercial.contact.error")}
          </p>
        ) : null}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">{t("commercial.contact.privacy")}</p>
    </form>
  );
}

function Field({
  label,
  required,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
