# Samuel Studio

[![Build](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml)

Portfólio de **Samuel Santos Cerqueira**, desenvolvedor front-end em São Paulo, Brasil. Um estúdio de interfaces com projetos reais, uma bancada interativa e um mascote que acompanha a navegação.

**[Visite samuelsce.dev](https://samuelsce.dev)** · [LinkedIn](https://www.linkedin.com/in/samuelsce/) · [E-mail](mailto:samuelsantosmft7@gmail.com)

## Sobre o projeto

Este portfólio reúne meu trabalho e funciona como uma demonstração prática de desenvolvimento de interfaces: composição responsiva, gerenciamento de estados, ilustrações em SVG e animações que respondem às ações do visitante.

A identidade combina rosa, tipografia Space Grotesk e ilustrações próprias. A experiência permite explorar os projetos, conhecer minha formação e entrar em contato, com interações de mouse, toque e teclado.

## O que explorar

- **Bancada interativa:** alternância entre card e cartaz, temas claro e escuro, edição de título e ajuste dos cantos. A ação principal endireita a bancada por mouse, toque ou teclado.
- **Projetos:** contexto, tecnologias, detalhes da implementação e comparação entre ilustrações e capturas reais.
- **Mascote:** olhar reativo, expressões, arrasto, caminhada, lupa e o modo planetinha, com intervenções temporárias nos controles visuais. As escolhas do visitante têm prioridade.
- **Navegação responsiva:** menu móvel e cabeçalho com coreografia própria em telas largas.
- **Português e inglês:** seleção PT/EN no menu, com preferência salva no navegador e tradução de conteúdo, controles e descrições de acessibilidade.
- **Detalhes de movimento:** reação do personagem ao trocar de idioma e um traço rosa desenhado quando o título dos projetos chega à área de leitura. O efeito repete após sair da tela e retornar.
- **Atividade no GitHub:** calendário de contribuições públicas do último ano em tons de rosa, com consulta por dia usando mouse, toque ou teclado.
- **Um segredo do planetinha:** pequeno puzzle escondido no calendário, com desafios solucionáveis e recorde salvo no navegador.
- **Controle de movimento:** preferência inicial de movimento reduzido e opção para ativar ou desativar as animações na página.

## Projetos apresentados

| Projeto | Contexto e participação |
| --- | --- |
| [BarberAg](https://barberag.com.br/) | Produto em produção para gestão e agendamento de barbearias. Atuo no front-end e na experiência de uso, em colaboração com a equipe de back-end. Código privado. |
| [RoomLab](https://github.com/samuelsce/RoomLab) | Editor de quartos e setups em 2D e 3D, com histórico de alterações, persistência local e compartilhamento por link. [Demonstração](https://samuelsce.github.io/RoomLab/). |
| [LinkWatch](https://github.com/samuelsce/LinkWatch) | Monitor de disponibilidade de sites e APIs, com latência, incidentes e página pública de status. Implementação com avaliação local; hospedagem e OAuth real ainda pendentes. |
| [Recette](https://github.com/Gab-sousa/recette-web) | Primeiro projeto e TCC desenvolvido em equipe. Atuei principalmente no front-end com HTML, CSS e JavaScript, com contribuições em Python e Django. |

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

O mascote usa o mesmo desenho no card e na página. Seu controlador coordena as fases de movimento, as reações e as interrupções, enquanto o CSS define os gestos. O deslocamento é separado da animação dos membros e objetos, mantendo a lupa e a órbita ligadas ao personagem.

### Calendário e puzzle

O calendário consulta os dados públicos de `samuelsce` pela [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api), sem token. Contribuições incluem outras atividades além de commits, por isso o site usa esse termo. A resposta é validada e guardada por uma hora no navegador. Uma captura real em `src/data/contributions-snapshot.json` mantém a seção disponível se o serviço falhar; a data de atualização e uma ação para tentar novamente ficam visíveis.

O componente do calendário é carregado quando a seção se aproxima da tela. O código e o CSS do jogo só são baixados quando o segredo é descoberto. O puzzle altera a célula escolhida e seus vizinhos ortogonais; cada desafio nasce de um quadro completo embaralhado por jogadas válidas, garantindo uma solução. Não há loop de animação ou simulação contínua no jogo.

<details>
<summary>Como descobrir o segredo</summary>

Clique ou toque três vezes no rostinho ao lado do título do calendário. Acenda todos os quadradinhos para ativar a órbita. Também funciona pelo teclado: Enter no rostinho; setas, Enter e Espaço no quadro; Escape para fechar. As animações da página e o controlador do mascote pausam enquanto o jogo está aberto.

</details>

### Desempenho

A geometria dos elementos fixos é reutilizada durante a rolagem e recalculada quando o layout muda. Atualizações do olhar e da caminhada são aplicadas aos grupos SVG que as utilizam, evitando escritas repetidas. Componentes visuais são memoizados para reduzir renderizações em mudanças de estado alheias.

Animações da cópia escondida e do card fora da tela pausam. Ao sair da aba, o controlador suspende as interações e restaura os controles alterados pelo mascote. A pintura do personagem tem uma área delimitada com espaço para membros e objetos.

Na sequência de rolagem instrumentada da versão 1.0.2, as leituras de posição passaram de **4.296 para 1.074**, cerca de **75% menos chamadas**. Esse resultado mede trabalho do código em uma sequência específica, não um ganho equivalente de FPS. Método, evidências e limites estão em [VALIDATION.md](VALIDATION.md).

### Acessibilidade

A interface inclui link para pular conteúdo, navegação semântica, foco visível, estados acessíveis nos controles e operação por teclado. O mascote também permite pegar, mover e soltar pelo teclado.

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
    HeaderStretch.tsx            Superfície do cabeçalho
    RoomIllustration.tsx         Quarto isométrico e iluminação
    Icon.tsx                     Ícones SVG consistentes entre dispositivos
    SectionStroke.tsx            Traço de entrada acionado por visibilidade
    DeferredContributions.tsx    Carregamento do calendário por proximidade
    ContributionGarden.tsx       Calendário e descoberta do segredo
    SecretGarden.tsx             Puzzle do planetinha e janela modal
  data/contributions.ts          Validação, consulta e cache dos dados públicos
  data/contributions-snapshot.json  Captura real de segurança
  styles.css                     Base visual e layouts
  refinements.css                Navegação, controles e transições
  mascot.css                     Estados e gestos do personagem
  mascot-adventures.css          Planetinha e interações com a página
  mascot-finish.css              Material, caminhada e acabamento do rig
  polish.css                     Reações de idioma e acabamento da bancada
  contributions.css              Calendário de atividade
  secret-garden.css              Estilo carregado junto ao jogo
public/projects/                Capturas reais dos projetos
index.html                      Título e metadados
.github/workflows/ci.yml         Verificação automática do build
```

Para atualizar a apresentação, comece por `src/data/portfolio.ts` e mantenha as traduções em `src/i18n/` correspondentes. As capturas ficam em `public/projects/`. Os metadados iniciais estão em `index.html`; ao carregar a aplicação, são atualizados pelo idioma escolhido.

## Publicação e documentação

O site está publicado em **[samuelsce.dev](https://samuelsce.dev)** na **Cloudflare Workers**, com atualização a partir do repositório. O GitHub Actions executa a instalação e o build em pushes para `main` e pull requests; a publicação é feita pela integração da Cloudflare.

- [DESIGN-PLAN.md](DESIGN-PLAN.md): conceito, planejamento visual e referências iniciais.
- [VALIDATION.md](VALIDATION.md): verificações, evidências e limites dos testes.
- [CHANGELOG.md](CHANGELOG.md): evolução e correções por versão.
- [PUBLICAR.md](PUBLICAR.md): guia de alternativas de hospedagem para o build estático.

As verificações de interação incluem Edge/Chromium com viewports simuladas e eventos de toque. A validação em aparelhos físicos e outros navegadores não é certificada por esses testes.

## Referências e créditos

A pesquisa visual incluiu [Supaste / Navbar Gallery](https://www.navbar.gallery/navbar/supaste), [Yash Fataniya / Footer Design](https://www.footer.design/sites/yash-fataniya), [Rauno / Craft](https://rauno.me/craft) e [Bruno Simon](https://bruno-simon.com/). O portfólio de [Samuel Rizzon](https://www.samuelrizzon.dev/) foi a inspiração inicial para criar uma experiência com personalidade; o [Eye tracker do Bencho](https://bencho.dev/blocks/eye-tracker) inspirou o olhar reativo.

O desenho e a implementação das interações são próprios deste portfólio. As capturas pertencem aos projetos apresentados. A fonte Space Grotesk é distribuída pelo Fontsource sob a licença SIL Open Font License 1.1 indicada no pacote.

A faixa anual de quadradinhos foi adaptada a partir do [calendário de Samuel Rizzon](https://www.samuelrizzon.dev/#graph), com cores, tipografia e interações deste projeto. Os dados vêm da API pública mencionada acima; o jogo usa uma implementação própria da mecânica Lights Out.

---

**Samuel Santos Cerqueira** · [samuelsce.dev](https://samuelsce.dev) · [LinkedIn](https://www.linkedin.com/in/samuelsce/)
