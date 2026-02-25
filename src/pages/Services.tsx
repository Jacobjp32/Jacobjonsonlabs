import { Camera, Plane as Drone, Sparkles, Play, Check, Brain, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import GlowButton from "@/components/GlowButton";
import NeonCard from "@/components/NeonCard";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n";

export default function Services() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const svcKeys = ['drone', 'motion', 'production', 'editing', 'music', 'ai'] as const;
  const svcIcons = [Drone, Sparkles, Camera, Play, Mic, Brain];
  const svcColors = ['cyan', 'pink', 'green', 'yellow', 'pink', 'cyan'] as const;
  const svcPrices = [
    ['R$ 500', 'R$ 900', 'R$ 1.500'],
    ['R$ 400', 'R$ 800', 'R$ 2.000'],
    ['R$ 2.500', 'R$ 4.500', 'R$ 8.000'],
    ['R$ 300', 'R$ 800', 'R$ 2.000'],
    ['R$ 3.500', 'R$ 6.000', 'R$ 12.000'],
    ['R$ 300', 'R$ 800', 'R$ 2.500'],
  ];

  const services = svcKeys.map((key, i) => ({
    title: t(`svc.${key}`),
    icon: svcIcons[i],
    color: svcColors[i],
    description: t(`svc.${key}.desc`),
    features: [1,2,3,4,5].map(n => t(`svc.${key}.f${n}`)),
    packages: [1,2,3].map(n => ({
      name: t(`svc.${key}.p${n}`),
      price: svcPrices[i][n-1],
      details: t(`svc.${key}.p${n}d`),
    })),
  }));

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <WhatsAppButton phoneNumber="5542988283963" />
      <ParticleBackground />

      <section className="relative pt-28 pb-24">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('services.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('services.subtitle')}
            </p>
            <GlowButton
              glowColor="cyan"
              onClick={() => navigate('/')}
            >
              {t('services.back')}
            </GlowButton>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <NeonCard key={index} borderColor={service.color} className="overflow-hidden">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                  <div>
                    <service.icon className="h-16 w-16 mb-4 text-primary" />
                    <h2 className="text-3xl font-bold mb-3">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary">{t('services.features')}</h4>
                      {service.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.packages.map((pkg, pi) => (
                      <div
                        key={pi}
                        className={`rounded-lg p-6 border transition-all hover:scale-105 ${
                          pi === 2
                            ? 'border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(255,0,110,0.1)]'
                            : 'border-border/50 bg-background/30'
                        }`}
                      >
                        <h4 className="font-bold text-lg mb-2">{pkg.name}</h4>
                        <div className="text-3xl font-bold text-primary mb-3">{pkg.price}</div>
                        <p className="text-sm text-muted-foreground mb-4">{pkg.details}</p>
                        <GlowButton
                          size="sm"
                          glowColor={pi === 2 ? 'pink' : 'cyan'}
                          onClick={() => {
                            const msg = encodeURIComponent(`Olá! Tenho interesse no pacote ${pkg.name} de ${service.title} (${pkg.price}).`);
                            window.open(`https://wa.me/5542988283963?text=${msg}`, '_blank');
                          }}
                          className="w-full"
                        >
                          {t('services.budget')}
                        </GlowButton>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>

          <div className="text-center mt-16">
            <NeonCard borderColor="green" className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">{t('services.custom.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('services.custom.desc')}</p>
              <GlowButton
                size="lg"
                glowColor="green"
                onClick={() => {
                  const msg = encodeURIComponent('Olá! Gostaria de discutir um projeto personalizado.');
                  window.open(`https://wa.me/5542988283963?text=${msg}`, '_blank');
                }}
              >
                {t('services.custom.cta')}
              </GlowButton>
            </NeonCard>
          </div>
        </div>
      </section>
    </div>
  );
}
