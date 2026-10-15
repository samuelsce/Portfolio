# Samuel Santos

[![Build](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml)

Portfólio profissional com foco em **Segurança da Informação**, apoiado pela minha experiência em desenvolvimento web. Busco a primeira oportunidade de estágio em segurança. O site apresenta trabalho em produção, projetos pessoais, laboratório técnico e formação em andamento, com escopos e contribuições explícitos.

**[samuelsce.dev](https://samuelsce.dev)** · [LinkedIn](https://www.linkedin.com/in/samuelsce/) · [GitHub](https://github.com/samuelsce)

## Conteúdo

- **BarberAg:** frontend e integração com APIs de um SaaS em produção, em colaboração com backend.
- **Recette:** plataforma de receitas desenvolvida em equipe no curso técnico.
- **RoomLab e LinkWatch:** projetos adicionais, com detalhes de implementação e limites.
- **Sentinel:** laboratório local de eventos de autenticação/autorização, detecção e triagem com evidências. Links para código e documentação de avaliação.
- **Formação:** UNIVESP, técnico em Desenvolvimento de Sistemas, Hackers do Bem e TryHackMe. Cursos em andamento são identificados como tal.
- **Contato e currículo:** e-mail, perfis profissionais e PDF voltado para Segurança da Informação.

Não são apresentados cargos de segurança, certificações ou resultados de produção que não tenham sido conquistados. Sentinel e LinkWatch estão identificados como projetos avaliados localmente.

## Interface e implementação

React, TypeScript e Vite, com CSS e SVG nativos. A identidade usa Silkscreen local, verde e carvão, personagem central em pixel art e uma cena com atalhos para projetos e estudos. Sem dependência de biblioteca de animação.

- Layout responsivo, navegação por teclado e links com destinos normais.
- Detalhes dos projetos em diálogo nativo, com Escape, rolagem própria e restauração de foco.
- Português e inglês, com preferência persistida quando possível.
- Controle de movimento, preferência inicial do sistema e pausa do movimento ambiente fora da tela ou em aba oculta.
- Imagens menores no mobile, imagens dos projetos com carregamento adiado e dimensões explícitas.
- Fontes locais e um contexto de idioma específico da versão atual; traduções e minigames antigos não fazem parte da entrada ativa.
- Revelação com IntersectionObserver, sem atualização React por frame ou listener de scroll contínuo.

## Executar

Node.js 24 e npm.

```sh
npm ci
npm run dev
```

`npm run check` verifica TypeScript; `npm run build` gera `dist/`; `npm run preview` serve o build local.

## Manutenção

| Arquivo | Responsabilidade |
| --- | --- |
| `src/components/pixel/content.ts` | Conteúdo PT/EN, detalhes e links dos projetos |
| `src/components/pixel/` | Hero, navegação, projetos, formação e diálogos |
| `src/i18n/PixelLanguageProvider.tsx` | Idioma, persistência e metadados |
| `src/pixel.css` | Identidade, responsividade, estados e movimento |
| `public/pixel/` | Artes aprovadas e variantes mobile |
| `public/samuel-santos-curriculo.pdf` | Currículo disponibilizado no site |
| `docs/redesign-pixel-security.md` | Decisões, fontes e validações do redesign |

O código anterior permanece arquivado no repositório, sem ser importado pela página atual. O histórico das versões anteriores continua no Git e no changelog.

## Publicação

A integração existente da **Cloudflare Workers**, serviço `samuelstudio`, publica a branch `main`. O GitHub Actions valida instalação e build. A configuração está em `wrangler.jsonc`, com assets de `dist/`. O site é estático, sem backend, formulário ou credenciais necessárias para renderizar o portfólio.

## Referências e créditos

Amostras visuais aprovadas pelo proprietário e [Samuel Rizzon](https://www.samuelrizzon.dev/) orientaram a coerência entre pixel art, tipografia e interação. Não foram copiados o personagem ou os assets desse site. As artes deste portfólio foram geradas e refinadas com o proprietário; a procedência está documentada em `docs/redesign-pixel-security.md`.

Silkscreen é distribuída sob a licença [SIL Open Font License](public/fonts/Silkscreen-OFL.txt). A revisão de interface usa as [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Fontes da pesquisa de posicionamento e evidências dos projetos estão no registro do redesign.
