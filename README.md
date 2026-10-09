# Samuel Santos

[![Build](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml)

Portfólio de **Samuel Santos Cerqueira**, desenvolvedor full-stack júnior, em Mauá, São Paulo, Brasil. Apresenta projetos com interfaces, APIs, autenticação, bancos de dados e testes automatizados, além de uma bancada interativa e um mascote que acompanha a navegação. O perfil também descreve o uso de ChatGPT e Codex como apoio ao desenvolvimento, com revisão e validação das soluções.

**[Visite samuelsce.dev](https://samuelsce.dev)** · [LinkedIn](https://www.linkedin.com/in/samuelsce/) · [E-mail](mailto:samuelsantosmft7@gmail.com)

## Sobre o projeto

Este portfólio reúne meu trabalho e funciona como uma demonstração prática de desenvolvimento de interfaces: composição responsiva, gerenciamento de estados, ilustrações em SVG e animações que respondem às ações do visitante.

A identidade combina rosa, tipografia Space Grotesk e ilustrações próprias. A experiência permite explorar os projetos, conhecer minha formação e entrar em contato, com interações de mouse, toque e teclado.

## O que explorar

- **Bancada interativa:** alternância entre card e cartaz, temas claro e escuro, edição de título e ajuste dos cantos. A janela permanece reta; a ação principal anima a ideia por mouse, toque ou teclado.
- **Projetos:** contexto, tecnologias, detalhes da implementação e ilustrações com controles de tema. As demonstrações começam e se repetem automaticamente enquanto o quadro está na área de leitura, com intervalos de descanso. Na agenda do BarberAg, também é possível selecionar o dia.
- **Mascote:** desenho compartilhado com luz e volume em SVG, olhar reativo, expressões, arrasto, caminhada com joelhos articulados, lupa e o modo planetinha, com intervenções temporárias nos controles visuais. As escolhas do visitante têm prioridade.
- **Navegação responsiva:** menu móvel e cabeçalho com coreografia própria em telas largas.
- **Português e inglês:** seleção PT/EN no menu, com preferência salva no navegador e tradução de conteúdo, controles e descrições de acessibilidade.
- **Detalhes de movimento:** nome que reage em onda, personagem atento à edição da ideia, reações à troca de idioma e às demonstrações, partículas na ativação e traço desenhado quando Projetos chega à área de leitura.
- **Atividade no GitHub:** calendário de contribuições públicas do último ano em tons de rosa, com consulta por dia usando mouse, toque ou teclado.
- **Um segredo do planetinha:** pequeno puzzle escondido no calendário, com desafios solucionáveis e recorde salvo no navegador.
- **Constelação:** três toques na estrela revelam um céu com um S desenhado, estrelas e o planeta do mascote, dentro da bancada.
- **Pausa para café:** uma palavra no campo da ideia revela uma xícara e uma reação silenciosa do personagem.
- **Descobertas pela página:** veleiro com proa de carneiro e apoio no convés; moonwalk com pernas articuladas, passos e deslize sincronizados, chapéu e luva presos ao personagem; um tributo solo ao Michael na janela do RoomLab e Toddy correndo para buscar um ossinho com o mascote. Basquete, saltos entre ilhas e treino de mira têm entradas próprias, com desenhos originais e sem áudio.
- **Controle de movimento:** preferência inicial de movimento reduzido e opção para ativar ou desativar as animações na página.

## Projetos apresentados

| Projeto | Contexto e participação |
| --- | --- |
| [BarberAg](https://barberag.com.br/) | SaaS próprio em produção, com clientes e usuários reais. Desenvolvo e mantenho o front-end de gestão e agendamento de barbearias em colaboração com a equipe de back-end. Código privado. |
| [RoomLab](https://github.com/samuelsce/RoomLab) | Editor de quartos e setups em 2D e 3D, com histórico de alterações, persistência local e compartilhamento por link. [Demonstração](https://samuelsce.github.io/RoomLab/). |
| [LinkWatch](https://github.com/samuelsce/LinkWatch) | Monitor de sites e APIs com worker HTTP, isolamento entre contas, proteção SSRF e testes unitários, de integração e E2E. Avaliação local; hospedagem e OAuth real ainda pendentes. |
| [Sentinel](https://github.com/samuelsce/Sentinel) | Central full-stack de segurança até a M6: SDK Node.js, API Fastify, worker Python, três detecções explicáveis, dashboard Next.js ao vivo, triagem auditada e snapshots de evidências. Demo local reproduzível; resposta manual e hospedagem ainda planejadas. |
| [Recette](https://github.com/Gab-sousa/recette-web) | Primeiro projeto e TCC desenvolvido em equipe. Atuei principalmente no front-end com HTML, CSS e JavaScript, com contribuições em Python e Django. |

O conteúdo do Sentinel foi conferido no [README do projeto](https://github.com/samuelsce/Sentinel#readme) em 9 de outubro de 2026. A validação local registrou 30.050 eventos sem perda; a meta de latência de ingestão permanece não atendida. O card e seus detalhes em PT/EN distinguem essa implementação das próximas etapas.

As tecnologias dos projetos são apresentadas individualmente no site. A stack deste repositório está abaixo.

## Stack do portfólio

| Tecnologia | Uso |
| --- | --- |
| React 19 | Componentes, estados da interface e interações. |
| TypeScript | Tipagem do conteúdo, componentes e estados do mascote. |
| Vite 7 | Desenvolvimento local e geração do build estático. |
| CSS | Identidade visual, responsividade, transições e gestos do personagem. |
| SVG | Ilustrações, ícones e desenho compartilhado entre o mascote do card e o personagem flutuante. |
| Web Animations API e requestAnimationFrame | Trajetórias e acompanhamento de posição, olhar e caminhada. |
| Fontsource | Fonte Space Grotesk servida localmente. |

## Decisões de implementação

### Conteúdo e componentes

Dados pessoais, contatos e projetos ficam em `src/data/portfolio.ts`, separados da composição da página. Os componentes de projetos, bancada e ilustrações mantêm suas próprias responsabilidades e estados.

As traduções da interface ficam em `src/i18n/translations.ts`, e as versões em inglês dos projetos em `src/i18n/projects.ts`. O contexto de idioma atualiza textos e metadados sem remontar os componentes: temas, detalhes abertos e título personalizado da bancada são preservados. A persistência usa `localStorage`, com funcionamento em memória quando o navegador bloqueia o armazenamento.

O mascote usa o mesmo desenho no card e na página. Seu controlador coordena fases, reações e interrupções; CSS e animações nativas definem os gestos. A lupa, órbita, chapéus e luva pertencem aos grupos do personagem. Na dança, dois segmentos por perna ligam quadril, joelho e tornozelo ao sapato, com keyframes calculados antes da reprodução e sincronizados com o deslize. O mesmo princípio articula as patas do Toddy; o osso fica entre mandíbula e focinho. A preparação do arremesso acompanha a mão antes de liberar a bola. Não há leitura de posição por frame nas trajetórias dessas cenas.

### Calendário e puzzle

O calendário consulta os dados públicos de `samuelsce` pela [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api), sem token. Contribuições incluem outras atividades além de commits, por isso o site usa esse termo. A resposta é validada e guardada por uma hora no navegador. Uma captura real em `src/data/contributions-snapshot.json` mantém a seção disponível se o serviço falhar; a data de atualização e uma ação para tentar novamente ficam visíveis.

O componente do calendário é carregado quando a seção se aproxima da tela. O código e o CSS do jogo só são baixados quando o segredo é descoberto. O puzzle altera a célula escolhida e seus vizinhos ortogonais; cada desafio nasce de um quadro completo embaralhado por jogadas válidas, garantindo uma solução. Não há loop de animação ou simulação contínua no jogo.

Falhas no download desses módulos são isoladas por um limite de erro: os projetos e os contatos continuam disponíveis, com mensagem PT/EN e opção para recarregar. Essa recuperação é diferente da alternativa por captura real usada quando a API de contribuições falha.

<details>
<summary>Como descobrir os segredos</summary>

Clique ou toque três vezes no rostinho ao lado do título do calendário. Acenda todos os quadradinhos para ativar a órbita. Também funciona pelo teclado: Enter no rostinho; setas, Enter e Espaço no quadro; Escape para fechar. As animações da página e o controlador do mascote pausam enquanto o jogo está aberto.

Na bancada do hero, três toques rápidos na estrela da janela revelam uma constelação por oito segundos. Um novo toque na estrela ou Escape encerra a cena antes. O gesto também funciona com Enter ou Espaço. Escrever `café`, `cafe` ou `coffee` no campo da ideia revela a pausa para café do mascote por alguns segundos. Nenhuma descoberta altera a preferência de tema ou o título escolhido pelo visitante.

- Três toques rápidos nos pontinhos da bancada: viagem no Going Merry, com chapéu de palha, vela e proa de carneiro.
- Janela do RoomLab: o primeiro toque liga a noite; outro toque revela o tributo solo ao Michael, com moonwalk, chapéu e luva.
- Dois toques no `s.` circular de Sobre: Toddy entra correndo, busca o ossinho e vai embora.
- Três toques no nome do hero: série de cinco arremessos.
- Dois toques em Git, na lista de tecnologias: saltos entre ilhas até uma cama. No teclado, digitar `189` fora de campos de texto também abre o jogo.
- Dois toques na estrela do contato: treino de mira com três alvos e uma insígnia escondida. Ao selecionar Iniciar treino, começam os 6 segundos. O prazo esgotado encerra a tentativa e oferece Tentar novamente, que reinicia os três alvos. Há uma opção Sem limite de tempo, disponível antes de começar, para treino livre. Enter e Espaço acionam os botões; Escape fecha e devolve o foco.

No basquete, a mira começa ativa. Toque na bola ou no botão de arremesso para parar o marcador na faixa rosa e marcar três pontos. A opção sem movimento permite escolher a direção e está ativa por padrão quando as animações estão desativadas. Nos saltos, segure o botão para mover a sombra de pouso e solte quando ela alcançar a próxima ilha. Enter e Espaço têm o mesmo gesto. O marcador ganha uma confirmação verde na faixa de pouso, o personagem acomoda os pés na ilha e a câmera retorna suavemente após uma queda. São seis saltos, três vidas e uma cama na chegada, com referência a SkyWars e BedWars. O modo tranquilo oferece saltos assistidos e fica ativo com movimento reduzido. Os recordes dos dois jogos usam apenas o navegador, com alternativa em memória se o armazenamento estiver bloqueado.

O Going Merry tem vela principal ampliada, emblema, cordame, cabine, guarda-corpo e proa de carneiro refinados. O moonwalk coordena sapatos, braços e cabeça, seguido de giro e reverência. O Toddy freia antes de esperar o ossinho, captura no alto e termina a aterrissagem antes de comemorar. As quatro patas têm segmentos visíveis e um único conjunto de transformações articuladas. Com movimento desativado, o tributo ao Michael mantém uma pose estática com chapéu e luva. Sombras ficam fora dos corpos e objetos acompanham seus pontos de apoio.

Cenas e jogos têm módulos e CSS separados, baixados somente na descoberta correspondente. Nas cenas, o controlador empresta o próprio mascote da página e recebe sua posição atual ao terminar. Chapéu, luva e ossinho são ligados ao desenho existente. Rolagem pequena mantém a coreografia; sair da área de origem, abrir o menu, redimensionar ou ocultar a aba encerra e limpa a cena. Escape e um botão discreto também encerram. A mira do basquete usa uma única animação nativa durante a série; a bola usa trajetória finita em coordenadas SVG. Nos saltos, uma animação nativa move a sombra somente enquanto o botão é segurado; personagem e câmera percorrem trajetórias finitas. Os jogos pausam na aba oculta e cancelam ao fechar a janela. Não há loop de frame ocioso ou serviço externo adicional.

</details>

### Desempenho

A geometria dos elementos fixos é reutilizada durante a rolagem e recalculada quando o layout muda. Atualizações do olhar e da caminhada são aplicadas aos grupos SVG que as utilizam, evitando escritas repetidas. Componentes visuais são memoizados para reduzir renderizações em mudanças de estado alheias.

Animações da cópia escondida e do card fora da tela pausam. Ao sair da aba, o controlador suspende as interações e restaura os controles alterados pelo mascote. A pintura do personagem tem uma área delimitada com espaço para membros e objetos.

O controlador de movimento criativo usa um observador de visibilidade compartilhado, sequências WAAPI finitas e um pool de dez partículas. Cada quadro visível mantém no máximo um timeout para a próxima sequência, com cerca de cinco segundos de descanso entre reproduções. Não há loop de frame ocioso. Os 33 pontos do gráfico são calculados e reutilizados durante a vida do controlador. Animações e relógios cancelam fora da área de leitura, com a aba oculta, com o puzzle aberto ou com movimento desativado; retomam com apenas um relógio por quadro. Na preferência inicial de movimento reduzido, os segredos mantêm versões estáticas.

Na sequência de rolagem instrumentada da versão 1.0.2, as leituras de posição passaram de **4.296 para 1.074**, cerca de **75% menos chamadas**. Esse resultado mede trabalho do código em uma sequência específica, não um ganho equivalente de FPS. Método, evidências e limites estão em [VALIDATION.md](VALIDATION.md).

### Acessibilidade

A interface inclui link para pular conteúdo, navegação semântica, foco visível, estados acessíveis nos controles e operação por teclado. O mascote também permite pegar, mover e soltar pelo teclado.

O link para pular conteúdo transfere o foco ao elemento principal. Ao reduzir a janela, o foco de um controle da navegação que será ocultado passa ao botão do menu. No puzzle, vencer transfere o foco para uma ação habilitada, mantendo a navegação na janela modal.

A preferência `prefers-reduced-motion` é respeitada no carregamento. O controle da bancada permite escolher o movimento na página, e as mudanças de tema, formato e captura mantêm seus estados acessíveis. No celular, os controles principais têm alvos de toque de pelo menos 44 px.

## Executar localmente

Requisitos: **Node.js 24 e npm**, mesma versão de Node usada na integração contínua.

```sh
git clone https://github.com/samuelsce/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Abra o endereço exibido no terminal.

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run check` | Verifica os tipos com TypeScript. |
| `npm run build` | Verifica os tipos e gera o build em `dist/`. |
| `npm run preview` | Serve localmente o build gerado. |

O portfólio é uma aplicação estática, sem backend, banco de dados ou variáveis de ambiente obrigatórias. Os links levam aos projetos; o contato usa e-mail, LinkedIn e GitHub.

## Estrutura

```text
src/
  data/portfolio.ts              Conteúdo, projetos e contatos
  i18n/                          Idiomas, traduções e preferência do visitante
  App.tsx                        Composição da página e controles
  components/
    PageMascot.tsx               Estados, movimentos e interações do mascote
    MascotArtwork.tsx            Desenho compartilhado do personagem
    CreativeMotion.tsx           Sequências automáticas e descobertas da bancada
    ConstellationScene.tsx       Constelação em SVG revelada pela estrela
    HeaderStretch.tsx            Superfície do cabeçalho
    RoomIllustration.tsx         Quarto isométrico e iluminação
    Icon.tsx                     Ícones SVG consistentes entre dispositivos
    SectionStroke.tsx            Traço de entrada acionado por visibilidade
    DeferredContributions.tsx    Carregamento do calendário por proximidade
    ContributionGarden.tsx       Calendário e descoberta do segredo
    SecretGarden.tsx             Puzzle do planetinha e janela modal
    LazyLoadBoundary.tsx         Isolamento e recuperação de falhas dos módulos
  data/contributions.ts          Validação, consulta e cache dos dados públicos
  data/contributions-snapshot.json  Captura real de segurança
  styles.css                     Base visual e layouts
  refinements.css                Navegação, controles e transições
  mascot.css                     Estados e gestos do personagem
  mascot-adventures.css          Planetinha e interações com a página
  mascot-finish.css              Material, caminhada e acabamento do rig
  polish.css                     Reações de idioma e acabamento da bancada
  contributions.css              Calendário de atividade
  creative.css                   Respostas, constelação e pausa para café
  secret-garden.css              Estilo carregado junto ao jogo
public/projects/                Capturas de referência arquivadas
public/robots.txt               Orientação de rastreamento e endereço do sitemap
public/sitemap.xml              Endereço canônico do portfólio
index.html                      Título e metadados
.github/workflows/ci.yml         Verificação automática do build
```

Para atualizar a apresentação, comece por `src/data/portfolio.ts` e mantenha as traduções em `src/i18n/` correspondentes. Os quadros apresentam ilustrações interativas; as capturas de referência permanecem arquivadas em `public/projects/`. Os metadados iniciais estão em `index.html`; ao carregar a aplicação, são atualizados pelo idioma escolhido.

## Publicação e documentação

O site está publicado em **[samuelsce.dev](https://samuelsce.dev)** na **Cloudflare Workers**, com atualização a partir do repositório. O GitHub Actions executa a instalação e o build em pushes para `main` e pull requests; a publicação é feita pela integração da Cloudflare.

URL canônica, `og:url`, robots e sitemap usam esse domínio. Ao migrar o endereço do site, atualize esses arquivos junto aos links públicos da documentação.

- [DESIGN-PLAN.md](DESIGN-PLAN.md): conceito, planejamento visual e referências iniciais.
- [VALIDATION.md](VALIDATION.md): verificações, evidências e limites dos testes.
- [CHANGELOG.md](CHANGELOG.md): evolução e correções por versão.
- [PUBLICAR.md](PUBLICAR.md): guia de alternativas de hospedagem para o build estático.

As verificações de interação incluem Edge/Chromium com viewports simuladas e eventos de toque. A validação em aparelhos físicos e outros navegadores não é certificada por esses testes.

## Referências e créditos

A pesquisa visual incluiu [Supaste / Navbar Gallery](https://www.navbar.gallery/navbar/supaste), [Yash Fataniya / Footer Design](https://www.footer.design/sites/yash-fataniya), [Rauno / Craft](https://rauno.me/craft) e [Bruno Simon](https://bruno-simon.com/). O portfólio de [Samuel Rizzon](https://www.samuelrizzon.dev/) foi a inspiração inicial para criar uma experiência com personalidade; o [Eye tracker do Bencho](https://bencho.dev/blocks/eye-tracker) inspirou o olhar reativo.

O modelo do Going Merry adapta proporções da [elevação de Catherine Gaum, publicada por Richard Bridgland](https://www.richardbridgland.com/case-studies/blog-post-title-three-t2x6k-njdgr), observada no navegador. A arte continua sendo SVG autoral.

O desenho e a implementação das interações são próprios deste portfólio. As capturas pertencem aos projetos apresentados. A fonte Space Grotesk é distribuída pelo Fontsource sob a licença SIL Open Font License 1.1 indicada no pacote.

A faixa anual de quadradinhos foi adaptada a partir do [calendário de Samuel Rizzon](https://www.samuelrizzon.dev/#graph), com cores, tipografia e interações deste projeto. Os dados vêm da API pública mencionada acima; o jogo usa uma implementação própria da mecânica Lights Out.

O quadro do Sentinel aproveita a hierarquia de linhas e divisórias do [Stacked List do useLayouts](https://uselayouts.com/docs/components/stacked-list). A implementação em HTML/CSS e SVG é própria, com a paleta do portfólio e um diagrama do fluxo de ingestão implementado, sem copiar código ou assets do exemplo.

As respostas do nome e da bancada usam como referência a troca de formas por toque do [Heat Map do Bencho](https://bencho.dev/blocks/heat-word). A descoberta por toques repetidos foi informada pela descrição do [easter egg Ultracode no 60fps](https://60fps.design/shots/claude-ultracode-effort-selection-easter-egg-tap-interaction); o vídeo não foi observado. Sequências, ilustrações e lógica são próprias, sem reutilizar código, filtros ou assets desses exemplos.

---

**Samuel Santos Cerqueira** · [samuelsce.dev](https://samuelsce.dev) · [LinkedIn](https://www.linkedin.com/in/samuelsce/)
