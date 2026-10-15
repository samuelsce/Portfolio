# Redesign pixel art — implementação local

Data: 14 de outubro de 2026. Branch: `codex/pixel-security-portfolio`.

## Direção aprovada

Implementação das amostras aprovadas `site-pixel-v1/hero-desktop.png` e `site-pixel-v1/projetos-desktop.png`, preservando o personagem casual aprovado. A cena tem personagem central, nome em duas partes e dois atalhos no cenário. Os textos, controles e links são HTML; a amostra inteira não é uma imagem de fundo.

- Paleta: fundo `#0C100D`, texto `#DEE5D8`, verde `#86B394`, cinza `#A5AFA1`, linhas `#343E35`, âmbar `#C7AB7A`.
- Tipografia: Silkscreen, hospedada localmente. Licença em `public/fonts/Silkscreen-OFL.txt`.
- Bordas com pequenos degraus, alinhamentos consistentes e uma cena principal. Demais seções contidas.
- Sem slogans, indicadores operacionais fictícios, métricas inventadas, grades de competências com percentuais ou títulos profissionais de segurança não conquistados.
- Toddy e o mascote anterior não aparecem nesta versão.

## Conteúdo e organização

1. Hero: Samuel Santos, Segurança da Informação, contexto de desenvolvimento e estudos, acesso a projetos, currículo e perfis.
2. Projetos: BarberAg em destaque, Recette como projeto em equipe; RoomLab e LinkWatch na expansão de outros projetos.
3. Estudos: Sentinel identificado como laboratório local; TryHackMe Pre Security e Hackers do Bem em andamento.
4. Sobre: transição profissional, busca por estágio, formação e experiência prática em desenvolvimento.
5. Contato: e-mail, cópia do endereço, GitHub e LinkedIn.

Os detalhes explicam contribuição, implementação e contexto. BarberAg é apresentado como trabalho de frontend em colaboração com backend; não há atribuição da autoria de todo o sistema. O currículo PDF existente foi preservado, sem alteração do documento.

Os detalhes têm endereços locais como `/#projeto-barberag` e `/#projeto-sentinel`, com suporte a voltar/avançar. Os textos PT/EN e metadados acompanham a escolha de idioma.

## Estrutura técnica

Mantidos React, TypeScript e Vite. Nenhuma dependência instalada. A entrada usa `src/pixel.css` e componentes em `src/components/pixel/`; os estilos anteriores não são importados. Código antigo preservado no histórico e nos arquivos que já estavam no projeto, sem carregamento de minigames ou bibliotecas 3D pela nova entrada.

- Arte e fontes locais, sem chamadas a provedores externos para renderizar a página.
- Avatar aprovado exportado para WebP lossless. Enquadramento por CSS remove apenas o espaço transparente da exibição.
- Cenário e avatar menores selecionados com `<picture>` em telas de até 599 px.
- Hero: cerca de 699 KB de artes em desktop; cerca de 190 KB no mobile. Isso descreve os arquivos, não um benchmark de rede ou aparelho.
- Imagem pública do BarberAg em WebP, aproximadamente 46 KB, com carregamento adiado e dimensões explícitas.
- Animações de entrada curtas em CSS; nenhum loop de renderização em JavaScript. Movimento reduzido desativa animações e rolagem suave.
- Diálogo nativo, Escape, foco restaurado e bloqueio de rolagem do fundo.
- Menu mobile como disclosure, navegação normal por links, foco visível e atalho para conteúdo.
- A área de currículo continua ligada ao PDF local existente. Sem formulário, CMS ou backend novo.
- Metadados atualizados para Segurança da Informação e Desenvolvimento. A aplicação continua sendo CSR; não foi feita migração para Next.js/SSG.

## Referências efetivamente utilizadas

- [Samuel Rizzon](https://www.samuelrizzon.dev/): coerência entre fonte, pixel art e elementos interativos. Sem reutilização do personagem ou da aparência do site.
- [How this site was built](https://www.samuelrizzon.dev/log/how-this-site-was-built): contexto e decisões da referência, consultados na pesquisa anterior.
- [Silkscreen — Google Fonts](https://github.com/google/fonts/tree/main/ofl/silkscreen): arquivos reais da família e licença.
- [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): revisão de navegação, foco, imagens, movimento e layout; consultadas em 14/10/2026.
- Skill `frontend-design-references` indicada no AGENTS.md, com pesquisa e princípios reaproveitados desta mesma investigação.

As informações de projetos partem do catálogo existente e do contexto fornecido pelo proprietário. O link do GitHub do Sentinel não pôde ser confirmado pela ferramenta de pesquisa nesta execução (cache miss); não foram acrescentados resultados ou métricas ao que estava documentado. Os links oficiais de Hackers do Bem e da trilha Pre Security responderam à pesquisa.

## Artes e procedência

Ferramenta: `image_gen` nativa, sem API/CLI alternativa. Personagem reutilizado da arte previamente aprovada; novos cenários derivados do mockup aprovado. Os originais gerados permanecem no diretório de imagens do Codex. Os arquivos usados pelo site estão no próprio repositório:

| Arquivo | Uso |
| --- | --- |
| `public/pixel/samuel.webp` | Personagem aprovado, 1024 × 1536, lossless |
| `public/pixel/samuel-small.webp` | Mesmo personagem, variante de resolução 512 × 768 |
| `public/pixel/scene.webp` | Cenário panorâmico transparente, 2172 × 724 |
| `public/pixel/scene-mobile.webp` | Cenário adaptado ao celular, exportado em 888 × 444 |
| `public/projects/barberag-public.webp` | Conversão da captura pública já existente no repositório |

A exportação WebP e as variantes de resolução preservam a direção visual; não foram redesenhados o rosto ou a roupa do personagem.

### Prompt final — cenário desktop

Use case: background-extraction / precise-object-edit. Asset type: production transparent pixel-art scenic strip for the approved portfolio hero. Reference image is the APPROVED website mockup; extract/recreate ONLY its bottom panoramic environmental stage as a standalone cutout asset. Wide landscape 3:1 composition. Keep the same carefully crafted COARSE low-resolution pixel-art style, dark stone/industrial platform with moss, muted green plants, restrained distant city silhouettes, two thin dark lamp posts with tiny warm amber lights at far left and far right, hanging pixel cables. Include the little green document folder around 27% of width and the compact charcoal CRT terminal around 73% of width, standing on the same ground baseline. The CRT may contain only a small green >_ prompt. Leave the central 42%-58% span entirely clear above the ground for the separately supplied character. Foreground platform runs across the full width with stepped pixel edges and a thin green top rim. All ground and scenery must be contained in the lower 60% of this wide asset; tallest lamp at left/right only reaches the top 20%, sparse center skyline below folder height. NO PEOPLE, no character, no avatar, no name, no headline, no footer content, no labels on plaques, no buttons, NO WORDS OR TEXT ANYWHERE. The folder and CRT sit on plain unlabelled platform plinths so live HTML labels can be placed later. Absolutely no entire website screenshot. Transparent background, real alpha, remove all black background/dotted grid from reference, keep all asset silhouettes legible on near-black #0C100D. No sky, no floor background behind the objects. Palette charcoal #202920, gray-green #475849, muted sage #86B394, limited cream paper #DEE5D8 and tiny amber #C7AB7A. No glow, gradients, blur, bloom, smooth vector curves, 3D, photorealism. Crisp square clusters, flat 2D side view, consistent pixel scale. The deliverable is a transparent environment-only horizontal sprite layer for implementation, not a new design concept.

### Prompt final — cenário mobile

Use case: precise-object-edit. Asset: responsive MOBILE version of this transparent pixel-art stage. Preserve the reference's exact coarse square pixel style, side-view platform, moss, industrial materials, dark green/charcoal/gray-green colors with tiny amber accents. Recompose the environment to a compact WIDE 2:1 canvas. Keep a broad short ground platform spanning the full width at about 85% canvas height. There is NO character, but leave a clean central gap (center 35%-65% width) for an externally overlaid avatar. Put the green folder with cream paper prominently at 18% of canvas width, the little CRT >_ at 82% of canvas width, both standing on the same short unlabelled plinths. Folder and monitor should each occupy 16%-19% of full canvas width and roughly 35% of canvas height: make them more readable in a 350px wide mobile webpage. Ground skyline must be subtle, low and sparse so objects stand out; a few plants and short cables only. Omit tall lampposts to suit the shorter canvas. No lettering, no labels or buttons, no name, no header, no site text, no PEOPLE, no avatar. No new objects. True transparent background and preserve alpha around all objects. No sky or opaque background. Crisp stepped clusters, consistent large pixel scale, no antialias curves, no painterly texture, no 3D, no glow. This is an implementation asset variant, not a new website design.

## Validação

Build e TypeScript validados. Revisão visual e funcional no navegador local: hero e projetos desktop, mobile de 320 e 390 px, tablet de 768 px, notebook de 1024 px e desktop de 1440 px. Sem imagens quebradas ou rolagem lateral nessas inspeções. Conferidos menu por Enter/Escape, atalho para conteúdo via Tab/Enter, abertura dos cinco projetos, restauração de foco, expansão de outros projetos, PT/EN e cópia de e-mail. Links diretos dos detalhes testados com recarregamento, voltar e avançar. Capturas em `artifacts/pixel-redesign/`, ignoradas pelo Git.

O suporte a movimento reduzido foi revisado no CSS; não houve emulação de sistema operacional ou benchmark em aparelhos físicos. Não há promessa de uma pontuação Lighthouse ou de resultados de contratação.

## Escopo de publicação

Trabalho local. Sem deploy, push, alteração de configuração de produção ou substituição do portfólio publicado. O arquivo preexistente `docs/planejamento-portfolio-2d.md` permanece fora desta entrega.

## Ajustes de estrutura e movimento — 15/10/2026

- Cabeçalho dos detalhes separado da área de rolagem. Apenas `.dialog-body` rola; a imagem permanece recortada dentro dessa área e nunca passa acima do cabeçalho. A posição do conteúdo volta ao início ao abrir outro projeto.
- Retirada a frase adicional sobre a demonstração da agenda, em português e inglês. Mantida somente a identificação da página pública do BarberAg.
- Altura mínima do cenário calculada a partir do personagem e do chão. Em 768, 960, 1440 e 1600 px, a distância entre o fim do header e o topo do personagem é de 48 px; 320 e 390 px mantêm o enquadramento mobile.
- Rótulos de Projetos e Estudos centralizados nas placas. A linha textual começa recolhida e aparece com transição na interação de mouse ou foco de teclado. A seta também acompanha a interação.
- Entradas contínuas no hero, seções reveladas uma vez por bloco, abertura suave dos detalhes, menu e projetos adicionais, e zoom discreto das imagens em dispositivos com ponteiro preciso. Sem alteração das artes aprovadas.
- Um único IntersectionObserver acompanha os blocos abaixo da dobra. Os elementos deixam de ser observados após aparecerem; não há atualização de estado React por frame ou durante a rolagem. Foco de teclado revela imediatamente o bloco correspondente.
- Controle de animações no header, com rótulo acessível e preferência persistida quando o armazenamento está disponível. O padrão acompanha `prefers-reduced-motion`; movimento completo sobre uma preferência reduzida exige escolha explícita pelo controle. O modo reduzido torna o conteúdo visível, remove efeitos e usa rolagem imediata.

Validação no navegador: ausência de controles do header cortados ou rolagem lateral em 320, 390, 768, 960, 1440 e 1600 px; cabeçalho dos detalhes preservado após End/rolagem em desktop e mobile; linha recolhida em repouso e expandida no foco; revelação das seções; controle de animações nos dois modos e após recarregar; legenda PT/EN. O navegador de teste informou preferência por movimento reduzido, permitindo conferir o padrão antes da ativação explícita. Build, TypeScript e revisão de whitespace aprovados. Nenhuma dependência adicionada. Capturas em `artifacts/pixel-motion-fixes/`.

Referências reaproveitadas: a amostra aprovada e Samuel Rizzon para a linguagem visual; Web Interface Guidelines para foco, controle de movimento, rolagem e eficiência. Não foram incorporados componentes de outra biblioteca.
