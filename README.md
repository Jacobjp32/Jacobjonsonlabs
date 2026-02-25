# 🎬 Jacob Jonson Filmmaker - Portfólio

Portfólio profissional de filmmaker, motion designer e diretor criativo.

## 🚀 Deploy no Netlify

### Opção 1: Deploy direto pelo GitHub
1. Faça upload deste projeto para um repositório no GitHub
2. Acesse [netlify.com](https://netlify.com) e faça login
3. Clique em "Add new site" > "Import an existing project"
4. Conecte seu GitHub e selecione o repositório
5. O Netlify detectará automaticamente as configurações (já está no `netlify.toml`)
6. Clique em "Deploy site"

### Opção 2: Deploy manual (Drag & Drop)
1. Execute `npm install` e `npm run build` localmente
2. Acesse [netlify.com](https://netlify.com)
3. Arraste a pasta `dist` para a área de deploy

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## ✏️ Configurações Importantes

### 1. Formulário de Contato (Formspree)
Edite `src/components/ContactForm.tsx` e substitua `YOUR_FORM_ID`:
```javascript
await fetch("https://formspree.io/f/SEU_ID_AQUI", { ... })
```

### 2. WhatsApp
Edite os arquivos `src/pages/Home.tsx` e `src/pages/Services.tsx`:
```javascript
<WhatsAppButton phoneNumber="5542XXXXXXXXX" />
```

### 3. Vídeos do YouTube
Em `src/pages/Home.tsx`, substitua os `videoId: "dQw4w9WgXcQ"` pelos IDs reais dos seus vídeos.

### 4. URL do Site
Após o deploy, atualize a URL em `index.html`:
```html
<meta property="og:url" content="https://seu-site.netlify.app/" />
```

## 📁 Estrutura

```
├── public/           # Imagens e assets estáticos
├── src/
│   ├── components/   # Componentes React
│   ├── pages/        # Páginas (Home, Services, NotFound)
│   ├── lib/          # Utilitários
│   ├── App.tsx       # Componente principal
│   └── main.tsx      # Entry point
├── index.html        # HTML principal
├── netlify.toml      # Configuração do Netlify
└── package.json
```

## 🎨 Tecnologias

- React 18 + TypeScript
- Tailwind CSS
- Lucide Icons
- React Router DOM
- Sonner (toasts)
- Vite

## 📝 Licença

MIT © Jacob Jonson Portela
