import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { I18nProvider } from './i18n'
import Home from './pages/Home'
import Services from './pages/Services'
import NotFound from './pages/NotFound'

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
