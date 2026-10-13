# Primeira entrega local — carvão e vinho

13/10/2026 · branch `codex/redesign-carvao-vinho`

Prévia de desenvolvimento: http://127.0.0.1:5175/
Prévia compilada usada nos testes: http://127.0.0.1:5176/
Para reabrir após encerrar os servidores: `npm run dev -- --port 5175 --strictPort`.

## Escopo entregue

- Cabeçalho com o S do favicon integrado ao sobrenome, navegação direta, PT/EN e controle de animações.
- Primeira dobra com fotografia original, nome em duas linhas, atuação Full Stack, projetos, currículo e links profissionais.
- Destaque do BarberAg com captura real da demonstração da agenda em sua página pública. Os valores da imagem são exemplos do próprio produto; não são métricas de Samuel ou dados de clientes obtidos em ambiente autenticado.
- Participação individual explícita: desenvolvimento e manutenção do front-end em colaboração com a equipe de back-end.
- Resumo profissional, contato e rodapé para que a primeira entrega seja navegável.
- Estudo inicial de Toddy em SVG: corpo comprido, patas curtas, orelha caída, pelagem marrom e cauda curta. Cumprimento automático uma vez ao aparecer, reação ao mouse/clique/Enter e à mudança de idioma quando visível.

Os demais projetos, estudos de caso, calendário e jogos continuam na etapa seguinte do plano. Seus módulos antigos permanecem no repositório, mas não são montados neste novo shell. A composição anterior de `App.tsx` permanece recuperável no Git, na base `71542e3`. Não houve push, merge, deploy ou publicação externa.

## Decisões visuais e referências

Repertório e limites: [pesquisa consolidada](pesquisa-redesign-consolidada.md).

- [Pablo Míguez](https://www.pablomiguez.dev/): unidade entre retrato e nome. Aqui o retrato ocupa a esquerda, o nome a direita e os acessos profissionais são diretos, sem reproduzir sua composição central/marquee.
- [Alannn](https://www.alannn.com/): figura em 2D inserida na interface. Toddy é uma presença pequena nesta etapa, sem bloquear informações ou exigir exploração.
- [Gentle, no 60fps](https://60fps.design/shots/gentle-breathwork-selection-illustration-animation): movimento localizado e encerramento legível; adaptação em gestos finitos, sem copiar um loop.

Tokens aplicados: carvão `#242123`, vinho `#7D303C`, papel `#ECE8E5`, texto secundário `#BDB4B8`, vinho profundo da capa `#54232D`. Fontes Anybody (display, peso 700, largura 90%) e Instrument Sans (texto e controles, pesos 400–600). Arquivos locais WOFF2 e licenças OFL em `public/fonts`.

Desktop: figura e nome articulados por um plano vinho e um recorte vertical. Mobile: atuação e ações vêm antes da foto; tablet mantém composição intermediária. O destaque do produto usa uma superfície ampla, com descrição de autoria abaixo, em lugar de uma grade de caixas equivalentes.

## Estudo em imagem e fonte fotográfica

Antes da implementação foi gerado um estudo de UI, salvo em `artifacts/redesign/hero-reference.png` (artefato local ignorado pelo Git). A instrução de trabalho combinou: primeira dobra de portfólio Full Stack, carvão/vinho/papel, retrato monocromático amplo à esquerda, nome Samuel Santos com tipografia display à direita, atuação e descrição curtas, ações profissionais, navegação clara; composição gráfica em 2D, sem glow, glassmorphism ou cards SaaS decorativos.

Uma tentativa adicional de extração gerada alterou detalhes do rosto e foi descartada. A página usa a fotografia fornecida pelo usuário, comprimida/redimensionada em WebP, com máscara SVG e tratamento monocromático na interface. O rosto não foi reconstruído. O recorte é uma escolha gráfica desta primeira composição, não uma fotografia de estúdio inédita.

Currículo: cópia do PDF real localizado em `Curriculos/Full Stack/Samuel Santos Cerqueira.pdf`, disponibilizada como `public/samuel-santos-curriculo.pdf`.

## Implementação e desempenho

Mantida a stack existente: React, TypeScript e Vite. Nenhuma dependência nova. CSS novo isolado; estilos e controladores antigos não são importados pela entrada.

- Entradas finitas com transform/opacity; nenhuma atualização de estado React por frame.
- Toddy usa Web Animations API; ações anteriores são canceladas ao iniciar outra, ao sair da tela, ocultar a aba, desativar movimento ou desmontar.
- BarberAg usa uma entrada curta acionada por visibilidade. Sua mídia permanece disponível mesmo com animações desativadas.
- Preferência de movimento do dispositivo é acompanhada enquanto não houver escolha explícita do usuário. Controle e idioma funcionam também sem acesso ao armazenamento local.
- Retrato crítico com preload e variante pequena até 599 px; duas fontes locais; mídia inferior com dimensões reservadas e carregamento preguiçoso.

Build validado: `npm run build` (TypeScript e Vite).

| Medida | Entrega 01 |
| --- | --- |
| JS principal gzip | 80,34 kB |
| CSS principal gzip | 3,31 kB |
| Fontes efetivamente requisitadas | 63.024 bytes |
| Retrato mobile | 44.860 bytes |
| Retrato desktop | 175.908 bytes |
| Imagem BarberAg | 57.448 bytes |
| Recursos requisitados na captura mobile, incluindo mídia inferior | 249.241 bytes |
| Recursos requisitados na captura desktop, incluindo mídia inferior | 380.289 bytes |

A soma de recursos acima usa `encodedBodySize` de Resource Timing e não inclui o documento HTML nem cabeçalhos de transporte. A comparação com o baseline (JS 103,61 kB/CSS 18,65 kB gzip) ocorre com um escopo menor: os jogos e projetos ainda serão migrados. Não equivale a otimizar todas as funcionalidades antigas.

Na última execução local sem limitação de rede/CPU, CLS inicial foi 0, LCP observado foi aproximadamente 292 ms e não houve tarefas longas registradas. São diagnósticos desse computador, não métricas de campo, INP ou garantia em dispositivos móveis. Não foi testado Safari nem iPhone/iPad físico nesta entrega.

## Verificação de UI

Revisão com a skill `frontend-design-references` e suas Web Interface Guidelines, consultadas em [13/10/2026](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). Corrigidos no processo: dimensões da imagem, ordem de navegação desktop, foco inicial do menu móvel, recorte fotográfico marcado e aviso de cookies sobre a captura pública.

Testes em Edge/Chromium headless, versão compilada:

- 320, 390, 430, 768, 820, 1024, 1280 e 1440 px, em português e inglês: sem overflow horizontal, inclusive por limites dos elementos.
- Menu móvel: foco no primeiro link, Escape retorna ao acionador, âncoras fecham menu, resize para desktop fecha estado.
- Detalhes do projeto mantêm estado ao traduzir; currículo responde com PDF real.
- Toddy responde a Enter/clique, termina sua animação e cancela ao sair da tela; nenhum efeito contínuo depois de estabilizar.
- Movimento persiste ao recarregar; preferência reduzida impede animações por padrão e acompanha mudança do dispositivo.
- Contexto mobile novo requisita apenas o retrato pequeno, sem baixar também a foto grande.
- Idioma e controle de movimento operam com armazenamento bloqueado.
- Nenhum erro JavaScript ou resposta de recurso com erro registrado.
- Capturas desktop, mobile e tablet inspecionadas visualmente.

Registros locais ignorados pelo Git: `artifacts/redesign/verification.json`, `desktop-first.png`, `desktop-full.png`, `view-390.png` e `view-820.png`. Scripts de diagnóstico em `.publish-staging`.

## Próxima etapa

Avaliar a primeira dobra implementada e o destaque do produto. Depois dessa leitura, expandir a seleção de projetos e o caso piloto do BarberAg; desenvolver a presença recorrente do personagem e migrar descobertas/jogos com a mesma linguagem. A autorização para trabalhar localmente não autoriza atualizar produção.
