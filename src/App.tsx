import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { I18nProvider, useI18n } from './i18n'
import { getHomePath, getLocalizedPath, getPathLang, isLegacyServicesPath } from './lib/seo'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'

const AIAutomation = lazy(() => import('./pages/AIAutomation'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const DigitalAssets = lazy(() => import('./pages/DigitalAssets'))
const Products = lazy(() => import('./pages/Products'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LocaleRouteSync() {
  const { lang, setLang } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLegacyServicesPath(location.pathname)) {
      const targetLang = getPathLang(location.pathname) ?? lang
      const targetPath = getHomePath(targetLang)

      if (targetLang !== lang) {
        setLang(targetLang)
      }

      if (location.pathname !== targetPath || location.hash !== '#services' || location.search) {
        navigate(
          {
            pathname: targetPath,
            search: '',
            hash: '#services',
          },
          { replace: true }
        )
      }

      return
    }

    const pathLang = getPathLang(location.pathname)

    if (pathLang && pathLang !== lang) {
      setLang(pathLang)
      return
    }

    const targetPath = getLocalizedPath(location.pathname, lang)

    if (location.pathname !== targetPath || location.search) {
      navigate(
        {
          pathname: targetPath,
          search: '',
          hash: location.hash,
        },
        { replace: true }
      )
    }
  }, [lang, location.hash, location.pathname, location.search, navigate, setLang])

  return null
}

function LegacyServicesRedirect() {
  const location = useLocation()
  const targetLang = getPathLang(location.pathname) ?? 'pt'

  return <Navigate to={`${getHomePath(targetLang)}#services`} replace />
}

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <LocaleRouteSync />
        <BackToTop />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'hsl(260 15% 10%)',
              border: '1px solid hsl(330 100% 50% / 0.3)',
              color: 'hsl(195 30% 90%)',
            },
          }}
        />
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
              <div className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Loading
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/en" element={<Home />} />
            <Route path="/cases/:caseSlug" element={<CaseStudy />} />
            <Route path="/en/cases/:caseSlug" element={<CaseStudy />} />
            <Route path="/servicos" element={<LegacyServicesRedirect />} />
            <Route path="/services" element={<LegacyServicesRedirect />} />
            <Route path="/en/services" element={<LegacyServicesRedirect />} />
            <Route path="/automacao-ia" element={<AIAutomation />} />
            <Route path="/ai-automation" element={<AIAutomation />} />
            <Route path="/en/ai-automation" element={<AIAutomation />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/loja" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/en/products" element={<Products />} />
            <Route path="/ativos-digitais" element={<DigitalAssets />} />
            <Route path="/digital-assets" element={<DigitalAssets />} />
            <Route path="/en/digital-assets" element={<DigitalAssets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
