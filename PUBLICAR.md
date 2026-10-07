# Publicar o portfólio

Recomendação: código público no GitHub e site na Vercel. O repositório mostra a implementação; a hospedagem entrega o endereço que pode ser usado no currículo, LinkedIn e perfil do GitHub.

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

Depois de definir o endereço definitivo, é possível completar os metadados com a URL canônica e uma imagem de compartilhamento. Os textos e projetos são editados em `src/data/portfolio.ts`.

Este guia não publica o site. O envio do código ao GitHub é independente da hospedagem.
