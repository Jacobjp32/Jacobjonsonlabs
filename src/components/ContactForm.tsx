import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import NeonCard from "./NeonCard"
import { useI18n } from "@/i18n"

export default function ContactForm() {
  const { t, lang } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(lang === 'en' ? "Message sent successfully! I'll get back to you soon." : "Mensagem enviada com sucesso! Retornarei em breve.")
        setFormData({ name: "", email: "", service: "", message: "" })
      } else {
        toast.error(lang === 'en' ? "Error sending message. Please try again." : "Erro ao enviar mensagem. Tente novamente.")
      }
    } catch {
      toast.error(lang === 'en' ? "Error sending message. Please try again." : "Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <NeonCard borderColor="pink">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            {t('form.name')} *
          </label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background/50 border-[rgba(255,0,110,0.3)] focus:border-[rgb(255,0,110)]"
            placeholder={t('form.name.placeholder')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            {t('form.email')} *
          </label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-background/50 border-[rgba(255,0,110,0.3)] focus:border-[rgb(255,0,110)]"
            placeholder={t('form.email.placeholder')}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-semibold mb-2">
            {lang === 'en' ? 'Service of Interest' : 'Serviço de Interesse'}
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-background/50 border-2 border-[rgba(255,0,110,0.3)] focus:border-[rgb(255,0,110)] focus:outline-none text-foreground"
          >
            <option value="">{lang === 'en' ? 'Select a service' : 'Selecione um serviço'}</option>
            <option value="drone">{lang === 'en' ? 'Aerial Drone Filming' : 'Filmagem Aérea com Drone'}</option>
            <option value="motion">{lang === 'en' ? 'Motion Design & 3D Animation' : 'Motion Design & Animação 3D'}</option>
            <option value="producao">{lang === 'en' ? 'Full Audiovisual Production' : 'Produção Audiovisual Completa'}</option>
            <option value="edicao">{lang === 'en' ? 'Professional Video Editing' : 'Edição de Vídeo Profissional'}</option>
            <option value="clipe">{lang === 'en' ? 'Music Video' : 'Clipe Musical'}</option>
            <option value="ia">{lang === 'en' ? 'Artificial Intelligence' : 'Inteligência Artificial'}</option>
            <option value="outro">{lang === 'en' ? 'Other' : 'Outro'}</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            {t('form.message')} *
          </label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-background/50 border-[rgba(255,0,110,0.3)] focus:border-[rgb(255,0,110)] min-h-[120px]"
            placeholder={t('form.message.placeholder')}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[rgb(255,0,110)] hover:bg-[rgb(255,0,110)]/80 text-white font-semibold py-6 text-lg"
        >
          {isSubmitting ? t('form.sending') : t('form.send')}
        </Button>
      </form>
    </NeonCard>
  )
}
