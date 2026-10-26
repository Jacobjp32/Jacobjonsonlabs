---
name: verify-indexable-routes
description: Use when a change touches routing, prerender, canonical, hreflang, the sitemap, Netlify redirects, or page identity on jacobjonsonlabs.com. Runs the real route and prerender code to check that an HTML 200 is only a page from src/lib/routes.ts, with that page's PT/EN canonical pair.
---

# Rotas indexáveis do jacobjonsonlabs.com

Uma resposta HTML com status 200 em `https://jacobjonsonlabs.com` só pode ser o caminho canônico de uma página de `pages` (`src/lib/routes.ts`), e o canonical e o hreflang desse HTML são o par PT/EN dessa página.

Se isso quebra, uma URL que não é página sai com status 200 e o HTML da home. O buscador indexa um endereço que não existe, ou a língua errada.

## Quando esta mudança entra aqui

A mudança entra se mexe em qualquer arquivo coberto, ou se cria outro caminho que o host possa responder com HTML:

- `src/lib/routes.ts` — `pages`, `stripSlash`, `langFromPath`, `pageFromPath`, `localizePath`
- `src/App.tsx` — a tabela `<Route>` de `AppRoutes`
- `scripts/prerender.mjs` — o laço que grava o HTML, o canonical e o sitemap
- `index.html` — o template cujo canonical e hreflang esse laço troca
- `src/lib/seo.ts` — `applyPageSeo`, `BASE_URL`
- `src/components/Layout.tsx` — os argumentos `path` e `alternate` de `applyPageSeo`
- `public/_redirects`
- `netlify.toml` — só os blocos `[[redirects]]`
- `public/sitemap.xml`
- `src/i18n/pt.json` e `src/i18n/en.json` — o laço de prerender lê esses dicionários; chave ausente faz o laço lançar

`src/pages/NotFound.tsx` entra na história do achado (`Layout page="home"`), mas o comando não exige que essa prop continue igual.

## Como rodar

Na raiz do repositório, depois de `npm install` (o `typescript` do `package-lock.json` é o 5.9.3; Node 18 ou mais novo):

```bash
npm run verify:indexable-routes
```

É `node scripts/verify-indexable-routes.mjs`. Não usa rede, não grava `dist/` e leva cerca de 2 segundos. Códigos:

- **0** — a propriedade passou no limite.
- **1** — a propriedade falhou. Leia cada `ACHADO`.
- **2** — linha `MODELO`. O verificador perdeu o código de vista. Não é um passe, e não é por si um bug do site.

## O que o comando faz

Executa o código real, não uma cópia da regra:

- transpila e importa `src/lib/routes.ts` e chama `pageFromPath`, `langFromPath` e `localizePath`;
- transpila e chama `applyPageSeo` de `src/lib/seo.ts`;
- executa o trecho de `scripts/prerender.mjs` que declara `BASE_URL` e grava o HTML e o sitemap, com `writeFile` capturado em memória;
- lê `public/_redirects` e os `[[redirects]]` de `netlify.toml` na ordem da Netlify (`_redirects` primeiro).

Para cada caminho do limite, compara esse resultado com `pages`. Inglês é o caminho cujo primeiro segmento é `en`. Isso é o contrato da URL (`/en/...`), não uma cópia da condição dentro de `langFromPath`.

## Limite e suposições

- Até 4 segmentos. O alfabeto são os slugs que já aparecem em `pages`, nas `Route` e no HTML prerenderizado, mais as iscas `enterprise`, `en-us`, `energy`, `no-such-page`, `contact-us`, `enx`. Hoje são 22 segmentos e 490821 caminhos.
- A forma com barra de uma página publicada é HTTP 200 desse arquivo. A forma sem barra é HTTP 301 para a forma com barra. Pretty URLs é o padrão da Netlify e **não está no repositório**. Em 26 out 2026 a produção respondeu `/work` → 301 `/work/` e `/contact` → 301 `/contact/`. O comando não consulta a produção.
- Arquivo existente ganha de reescrita 200 sem `force`. É o shadowing da Netlify.
- O host modelado é `jacobjonsonlabs.com`. A regra de `jacobjonsonlabs.netlify.app` não se aplica a ele.
- Query, hash, `%` e maiúsculas ficam de fora.

Um passe cobre esse limite e essas suposições, não o site inteiro.

## Baseline conhecido

No sync commit abaixo o comando sai **1**, com uma classe só:

`ACHADO soft-200 (490786)`

Passos, nos termos do código:

1. `GET /servicos`. `pages` não tem esse caminho e `scripts/prerender.mjs` não grava HTML para ele.
2. `public/_redirects` tem `/* /index.html 200` e `netlify.toml` repete a regra. `_redirects` vale primeiro. A resposta é 200 com `/index.html`, que o prerender gravou como a home PT (`/`).
3. `src/App.tsx` redireciona `/servicos` com `LegacyRedirect` só no cliente, depois do 200.
4. `GET /en/no-such-page` cai no mesmo fallback: 200 com a home PT, embora `langFromPath` classifique o caminho como inglês.
5. O desconhecido cai em `NotFound`, e `NotFound` usa `Layout page="home"`, então `applyPageSeo` grava o canonical da home. O status continua 200.

Os redirects só de cliente, já sem a barra final, são: `/servicos`, `/automacao-ia`, `/ai-automation`, `/en/ai-automation`, `/ativos-digitais`, `/digital-assets`, `/en/digital-assets`, `/produtos`, `/loja`.

Canonical, hreflang, sitemap, tabela do `App.tsx` e as 18 páginas de `pages` passam. Não afrouxe o comando para ele sair 0 enquanto essa reescrita existir. Apagar a regra em só um dos dois arquivos não corrige.

## Bug ou erro de modelo

Releia o contraexemplo no arquivo que o passo nomeia.

- Se algum passo não acontece no código, o modelo está errado. Corrija o verificador para apontar de novo para a função real e rode outra vez. Não alargue o limite nem apague o achado para o comando passar.
- Se todos os passos acontecem, é bug do site. Deixe o achado. Não mude o produto só para o comando ficar verde, a menos que a tarefa seja corrigir esse bug.
- Exit 2 (`MODELO`) significa que o texto do código mudou e o verificador não achou a âncora (`BASE_URL` e o laço em `prerender.mjs`, a chamada `applyPageSeo` em `Layout.tsx`, o formato de `Route` ou de redirect). Leia o código. Se a âncora só mudou de lugar, atualize o verificador e confirme que ele ainda executa o código novo. Se a âncora sumiu porque o canonical agora é outro, isso é bug: reporte, não engula o exit 2.

Uma falha cuja única classe é `soft-200`, com os passos acima, é o achado conhecido. Qualquer outra classe (`identidade`, `canonical-prerender`, `canonical-cliente`, `sitemap`, `rota-app`, `pagina-sem-html`, `arquivo-fora-de-pages`, `base-url`, `host-inesperado`) é falha nova.

## Quando a mudança é intencional

- Página nova: o caminho entra em `pages` (PT e EN), nas duas formas de barra em `App.tsx`, e no array `pages` de `prerender.mjs`. Rode o comando. A página nova tem de passar em canonical, sitemap e `Route`. O `soft-200` antigo pode continuar.
- A promessa só muda com evidência no commit, no comentário do código ou na issue: por exemplo, decidir de propósito que URL desconhecida responde 200. Aí atualize o texto da propriedade neste skill e a checagem, e registre a frase antiga, a frase nova e a evidência. Não faça isso para o comando sair 0.

## O que ficou de fora

- Bootstrap de idioma em `index.html` e `detectLang` em `src/i18n.tsx`.
- O destino de `localizePath` quando `pageFromPath` devolve null.
- Meta tags que não são canonical, hreflang ou `html lang`.
- `npm run dev` e o Vite. O modelo é o host da Netlify.
- Pretty URLs desligado no painel. Aí `/work` também cairia no fallback da home, e este comando continuaria tratando `/work` como 301.
- Caminho com mais de 4 segmentos, query, hash, codificação ou outra capitalização (`/Work`).
- O formulário `ContactForm`: `botField` volta antes do `fetch`, e `localhost` / `127.0.0.1` lançam antes do `fetch`. É o alvo seguinte, se for verificar de novo.
- Texto de presença local e link de WhatsApp. O schema diz `areaServed: "Worldwide"` e o checklist diz que não há WhatsApp; este comando não varre esse texto.

## Prova de que o comando falha

Com `langFromPath` alterado de `path === "/en" || path.startsWith("/en/")` para `path.startsWith("/en")`, o comando reportou a classe `identidade` em 89240 caminhos, entre eles `/enx`, `/en-us` e `/energy` (`langFromPath` devolveu `"en"` e o primeiro segmento não é `en`), e manteve `soft-200`. A edição foi desfeita. O comando voltou a `soft-200` apenas (490786 caminhos), exit 1.

Se você mudar o verificador, repita uma quebra desse tipo no código real, confirme que ela aparece, e desfaça a quebra antes de avançar o sync commit.

## Cobertura e sync commit

Sync commit: `57061768d35c422d8cbe0d01734f9c15eb9b8c5c`

Esse é o commit de produto em que o verificador foi conferido. Os arquivos cobertos estão listados em "Quando esta mudança entra aqui". Avance o hash só depois de reler o diff desses arquivos desde esse commit, atualizar o verificador se o código mudou de forma, rodar o comando e confirmar que ele ainda descreve o código. Não avance o hash num exit 2.

Depois de merges que mexeram nesse código sem rodar este skill, use `/maintain-formal-verification-skill`.
