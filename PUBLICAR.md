# Publicar o portfólio

O site atual está em [samuelsce.dev](https://samuelsce.dev), na Cloudflare Workers, com integração ao repositório [Portfolio](https://github.com/samuelsce/Portfolio). O GitHub valida instalação e build em pull requests; a publicação é controlada pela integração da Cloudflare. Faça alterações em uma branch, confira os checks e proponha o merge para main antes da publicação em produção.

As opções abaixo são alternativas de hospedagem para uma eventual migração. Não representam a configuração atual da conta Cloudflare.

## Vercel

1. Use o repositório `https://github.com/samuelsce/Portfolio`.
2. Na Vercel, importe esse repositório e selecione a branch `main`.
3. Confira as configurações abaixo e publique.

| Configuração | Valor |
| --- | --- |
| Framework | Vite |
| Diretório raiz | Raiz do repositório |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Diretório de saída | `dist` |
| Node.js | 22.12+ ou 24 |
| Variáveis de ambiente | Nenhuma necessária |

O projeto usa âncoras na mesma página, portanto não precisa de regras extras de roteamento. A integração com Git permite publicar atualizações a partir dos próximos commits e gerar prévias para pull requests. Um domínio próprio pode ser conectado depois.

Documentação: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [integração Git](https://vercel.com/docs/git).

## Alternativas

- **Cloudflare Pages:** importar o repositório, usar `npm run build` e saída `dist`. [Guia oficial](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/).
- **GitHub Pages:** publicar o build por GitHub Actions. O `base: './'` atual e os caminhos relativos dos assets permitem hospedar em um subdiretório do repositório. [Guia oficial do Vite](https://vite.dev/guide/static-deploy.html#github-pages).

## Apresentação no GitHub

Mantenha o código público para que recrutadores possam examinar React, TypeScript e as interações. Use o README, adicione o endereço publicado ao campo Website/About do repositório e fixe o portfólio no perfil. `node_modules`, `dist`, arquivos `.env` e capturas de validação já estão ignorados.

O domínio atual já consta nos metadados, robots e sitemap. Ao migrar a hospedagem ou o endereço, atualize esses arquivos junto ao README. Os textos e projetos são editados em `src/data/portfolio.ts`.

Este guia não publica o site. O envio do código ao GitHub é independente da hospedagem.
