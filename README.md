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

# Rotas indexáveis (sai 1 enquanto o fallback /* → index.html 200 existir)
npm run verify:indexable-routes
```

## Verificação das rotas indexáveis

`npm run verify:indexable-routes` confere se uma resposta HTML 200 no host estático é só uma página de `src/lib/routes.ts`, com canonical e hreflang no par PT/EN. O comando sai com código 1 enquanto `public/_redirects` e `netlify.toml` reescrevem `/*` para `/index.html` com status 200: URL desconhecida ou antiga responde a home. O procedimento para o próximo agente está em `.cursor/skills/verify-indexable-routes/SKILL.md`.

## ✏️ Configurações Importantes

### 1. Formulário de contato (Netlify Forms)
O formulário `contact` é detectado pelo Netlify a partir do HTML estático e do formulário React. As notificações por e-mail são configuradas no painel do site, não no repositório.

### 2. URL do site
Após o deploy, atualize a URL em `index.html`:
```html
<meta property="og:url" content="https://jacobjonsonlabs.com/" />
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
