import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { I18nProvider } from './i18n'
import Home from './pages/Home'

// Services e NotFound carregam sob demanda — ambas são páginas secundárias
// sem bibliotecas únicas, resultando em chunks de ~4–8KB cada.
// Home permanece como import estático para não interferir no Preloader interno.
const Services = lazy(() => import('./pages/Services'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
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
        {/* Fallback neutro que evita flash branco durante carregamento do chunk.
            Usa a cor de fundo do tema para que a transição seja imperceptível. */}
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
