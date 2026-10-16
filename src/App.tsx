import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { pages } from "./lib/routes";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const VideoEditing = lazy(() => import("./pages/VideoEditing"));
const Lab = lazy(() => import("./pages/Lab"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LegacyRedirect({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={{ pathname: to, hash: location.hash }} replace />;
}

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-background text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Loading
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/" element={<Work />} />
        <Route path="/en/work" element={<Work />} />
        <Route path="/en/work/" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/en/services" element={<Services />} />
        <Route path="/en/services/" element={<Services />} />
        <Route path="/services/web-development" element={<ServiceDetail service="web" />} />
        <Route path="/services/web-development/" element={<ServiceDetail service="web" />} />
        <Route path="/en/services/web-development" element={<ServiceDetail service="web" />} />
        <Route path="/en/services/web-development/" element={<ServiceDetail service="web" />} />
        <Route path="/services/automation" element={<ServiceDetail service="automation" />} />
        <Route path="/services/automation/" element={<ServiceDetail service="automation" />} />
        <Route path="/en/services/automation" element={<ServiceDetail service="automation" />} />
        <Route path="/en/services/automation/" element={<ServiceDetail service="automation" />} />
        <Route path="/services/video-editing" element={<VideoEditing />} />
        <Route path="/services/video-editing/" element={<VideoEditing />} />
        <Route path="/en/services/video-editing" element={<VideoEditing />} />
        <Route path="/en/services/video-editing/" element={<VideoEditing />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/lab/" element={<Lab />} />
        <Route path="/en/lab" element={<Lab />} />
        <Route path="/en/lab/" element={<Lab />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/" element={<About />} />
        <Route path="/en/about" element={<About />} />
        <Route path="/en/about/" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/en/contact" element={<Contact />} />
        <Route path="/en/contact/" element={<Contact />} />
        <Route path="/servicos" element={<LegacyRedirect to={pages.services.pt} />} />
        <Route path="/servicos/" element={<LegacyRedirect to={pages.services.pt} />} />
        <Route path="/automacao-ia" element={<Navigate to={`${pages.services.pt}#automation`} replace />} />
        <Route path="/automacao-ia/" element={<Navigate to={`${pages.services.pt}#automation`} replace />} />
        <Route path="/ai-automation" element={<Navigate to={`${pages.services.en}#automation`} replace />} />
        <Route path="/ai-automation/" element={<Navigate to={`${pages.services.en}#automation`} replace />} />
        <Route path="/en/ai-automation" element={<Navigate to={`${pages.services.en}#automation`} replace />} />
        <Route path="/en/ai-automation/" element={<Navigate to={`${pages.services.en}#automation`} replace />} />
        <Route path="/ativos-digitais" element={<LegacyRedirect to={pages.lab.pt} />} />
        <Route path="/ativos-digitais/" element={<LegacyRedirect to={pages.lab.pt} />} />
        <Route path="/digital-assets" element={<LegacyRedirect to={pages.lab.en} />} />
        <Route path="/digital-assets/" element={<LegacyRedirect to={pages.lab.en} />} />
        <Route path="/en/digital-assets" element={<LegacyRedirect to={pages.lab.en} />} />
        <Route path="/en/digital-assets/" element={<LegacyRedirect to={pages.lab.en} />} />
        <Route path="/produtos" element={<LegacyRedirect to={pages.lab.pt} />} />
        <Route path="/loja" element={<LegacyRedirect to={pages.lab.pt} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </I18nProvider>
  );
}
