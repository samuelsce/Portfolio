# Samuel Santos: plano de design

## Refinamento das cenas e Sentinel, 9 de outubro de 2026

Preservar o sistema visual existente: papel #fff7fa, rosa #ef75a3, amora #691b3e, tinta #291b24 e Space Grotesk. As decisões desta revisão substituem os planos antigos de fantasmas e baú, mantidos abaixo como histórico.

- Michael: apresentação solo, sem fantasmas; conservar moonwalk, fedora, luva e luz. Com movimento desativado, mostrar o mesmo desenho em pose estática, com sua cor definida no contêiner.
- Going Merry: retirar baú e suas animações. Ampliar a vela principal e o emblema, ligar cordame e verga ao mastro, aumentar cabine e carneiro da proa. Preservar o apoio do personagem no convés e o balanço compartilhado.
- Toddy: manter as patas de dois segmentos. Usar cor sólida nos traços verticais, cujo bounding box sem largura tornava o gradiente invisível; retirar rotações CSS de patas inteiras que se somavam ao rig durante frenagem e captura.
- Mira: progresso, tempo, instrução e iniciar/treino livre, seguidos de três alvos sequenciais. Doze segundos somente após iniciar; vitória com três acertos, falha ao expirar e nova tentativa explícita. Prazo monotônico, validado também no clique; teclado e alternativa sem tempo.
- Sentinel: mostrar o fluxo SDK → API → PostgreSQL e Worker → Alertas → Dashboard, com texto atual até M6 em PT/EN. Ajustar as setas para a tela estreita; contato em inglês também recebe tipografia menor em até 360 px.

Referência efetivamente observada nesta revisão: [elevação lateral do Going Merry, Catherine Gaum / Richard Bridgland](https://www.richardbridgland.com/case-studies/blog-post-title-three-t2x6k-njdgr), aberta e inspecionada no navegador para vela, cabine, guarda-corpo e carneiro. Reutilizar a pesquisa anterior do Bencho e do 60fps para atenção e descoberta. Nenhum asset, áudio ou código dessas referências foi incorporado.

## Articulação e profundidade, 9 de outubro de 2026

Preservar a composição, Space Grotesk e os tokens papel #fff7fa, rosa #ef75a3, amora #691b3e e tinta #291b24. O problema principal é continuidade física: pernas inteiras traduzidas, sapatos girando sem o tornozelo e relógios diferentes para deslize e passos. Refazer a dança com quadril, joelho e tornozelo ligados; preparar keyframes finitos de dois segmentos, sincronizados com a trajetória no mesmo relógio do navegador. Sustentar uma ponta enquanto a outra sola desliza, trocar o peso e acomodar os pés antes do giro. Não adicionar um motor 3D ou loop de física.

Chapéus ficam no rig da cabeça, com sombra de contato, aba posterior e aba frontal; luva fica na mão. Modelar volume por gradientes, luz lateral e oclusão discreta, sem blur animado. A virada deve sugerir uma esfera e ocultar o rosto ao passar por trás, em vez de achatar todo o personagem como papel. Melhorar a continuidade da corrida, frenagem, salto e virada do Toddy e o balanço compartilhado de barco, mascote e baú. Preservar as regras e dificuldade dos jogos; o desenho compartilhado melhora também seus personagens.

Referência nova: [Melius, 60fps](https://60fps.design/appsites/melius-hero-3d-assets-explode-animation), exemplo aberto no navegador e frame renderizado observado. Adaptar apenas a noção de volume e profundidade ordenada; não reproduzir a entrada explosiva nem seu layout. Reutilizar o olhar do [Bencho](https://bencho.dev/blocks/eye-tracker), a [instrução de moonwalk](https://howcast.com/videos/499387-how-to-dance-like-michael-jackson-hip-hop-how-to/) e o desenho de elevação de Going Merry já consultados na revisão anterior.

Validar reprodução natural, além de poses pausadas: continuidade tornozelo/sapato, ponta apoiada, ritmo e acessórios durante preparação, dança, virada e reverência. Conferir desktop, toque, 320–1440 px, preferência de movimento reduzido e ativação manual, cancelamento, pequenos scrolls, retorno do ator e custo dos pacotes carregados sob demanda. Nenhuma promessa de FPS ou validação em aparelhos Apple físicos sem medi-los.

## Apoios, mordida e coreografia, 8 de outubro de 2026

Preservar papel #fff7fa, rosa #ef75a3, amora #691b3e, tinta #291b24 e Space Grotesk. Refinar apenas as descobertas e os jogos: formas claras mesmo em tamanho pequeno e gestos com apoio, antecipação e continuação. Sem áudio, biografia, texto decorativo ou mídia externa.

- Going Merry: casco mais alto e claro com faixas de madeira, cabine, guarda-corpo, velas, ninho e cabeça de carneiro com chifres espirais. Separar tecido, bandeira e espuma do balanço do casco. Escala maior, pés no convés e baú preso ao mesmo barco.
- Toddy: `cavidade da boca → mandíbula inferior → osso → focinho superior → dentes`. O osso passa entre os lábios em vez de cobrir o focinho. Ponto de mordida único para a trajetória; abertura e fechamento acompanham a captura. Pelagem e patas mais orgânicos, sem filtro pesado.
- Moonwalk: três quartos voltado para a direita enquanto desliza para a esquerda. Meias claras, sapatos alongados e alternância entre um apoio na ponta e um pé plano que desliza. Pouco sobe/desce: o tronco deve parecer flutuar. Preparação, quatro ciclos contínuos, giro, pose na ponta e reverência; braços e cabeça não caminham como na navegação normal.
- Minecraft: manter o jogo aprovado, melhorar a mira com cor de confirmação, margem de apoio na ilha, acomodação de aterrissagem e retorno da câmera após a queda. Sem tornar o jogo mais difícil ou introduzir loop de física.
- Basquete: bola presa à mão em repouso, preparação e liberação no mesmo gesto do braço; trajetória e retorno da bola separados, sombra no chão e feedback finito. Preservar pontuação, recorde e alternativa sem movimento.

Referências: proporções, carneiro e guarda-corpo da [elevação do Going Merry, Catherine Gaum / Richard Bridgland](https://www.richardbridgland.com/case-studies/blog-post-title-three-t2x6k-njdgr), desenho observado no navegador; princípios de apoio e deslizamento na [instrução de moonwalk do Howcast](https://howcast.com/videos/499387-how-to-dance-like-michael-jackson-hip-hop-how-to/), texto consultado, sem alegar observação do vídeo. Reutilizar [atenção do Bencho](https://bencho.dev/blocks/eye-tracker) e [descoberta do 60fps](https://60fps.design/shots/claude-ultracode-effort-selection-easter-egg-tap-interaction) verificadas nas iterações anteriores. SVGs e coreografias autorais, adaptados ao mascote e à estética do portfólio.

## Acabamento das descobertas e novo jogo, 8 de outubro de 2026

Manter papel #fff7fa, rosa #ef75a3, amora #691b3e, texto #291b24 e Space Grotesk. A página principal não muda: o acabamento acontece nos segredos já distribuídos. Formas com volume por faces, luz e sobreposição, sem filtros pesados. Movimento com preparação, ação e acomodação; sombras separadas do corpo e objetos presos ao rig.

- Viagem: pequeno veleiro de madeira, vela com tecido e cordame, água, casco em camadas e baú com tampa articulada. O mascote embarca, acompanha o balanço do convés e saúda antes de sair.
- Ghosts: fantasmas com silhueta flexível, volume e braços; surgem da janela, acompanham o moonwalk, reagem ao giro e à reverência. Articular sapatos, braços, cabeça e chapéu, com mudança de peso.
- Toddy: pelagem em camadas, focinho, orelhas, coleira e patinhas. Corrida, frenagem, prontidão, lançamento, captura no alto, aterrissagem e saída com o osso. Evitar cortar o salto ao trocar de estado.
- Minecraft: substituir completamente o encaixe de peças por saltos entre ilhas voxel até uma cama. Segurar carrega o salto; soltar escolhe a distância pela sombra de pouso. Câmera acompanha a aterrissagem, três tentativas e recorde local. Versão tranquila com saltos assistidos e sem movimento. Uma animação nativa enquanto carrega e trajetórias finitas; sem simulação por frame.
- Mira e basquete: melhorar a construção de materiais, confirmação dos acertos e a sequência de preparação/lançamento, mantendo os controles simples.

Composição do jogo: `[progresso / tentativas] [ilhas e personagem com câmera] [segurar e soltar / modo tranquilo]`. A estética voxel fica restrita ao pequeno mundo do jogo; controles continuam no sistema visual do portfólio. Nenhum menu novo de histórias, legenda decorativa ou reprodução de áudio.

Referências reutilizadas e adaptadas: [Eye Tracker do Bencho](https://bencho.dev/blocks/eye-tracker), preview observado anteriormente, para atenção e reação; [descoberta do 60fps](https://60fps.design/shots/claude-ultracode-effort-selection-easter-egg-tap-interaction), descrição consultada anteriormente, para entradas discretas. Arte, coreografias e jogo próprios.

## Descobertas espalhadas pela página, 8 de outubro de 2026

Preservar a página profissional, a bancada reta, o personagem silencioso e os tokens existentes: papel #fff7fa, rosa #ef75a3, blush #f8dbe7, amora #691b3e, texto #291b24. Space Grotesk permanece em todos os controles e textos. Remover a coleção com sete histórias, o reconhecimento de hobbies no campo da ideia e o segredo de comidas. Os interesses do Samuel aparecem como referências visuais, em acontecimentos curtos no local onde são descobertos.

Direção: três toques nos pontinhos da bancada iniciam uma viagem de barco com chapéu de palha e tesouro; tocar na janela do RoomLab abre a noite e, com ela acesa, revela fantasmas e moonwalk. Dois toques na assinatura trazem o Toddy correndo para brincar de buscar com o mascote. A estrela do contato esconde um treino de mira; o nome abre os cinco arremessos; Git e a sequência 189 abrem a ponte. Cenas originais em SVG, sem fala, áudio, letras de músicas, emojis ou mídia de terceiros.

O personagem das cenas é o mesmo elemento que acompanha a navegação. Uma reserva temporária coordena o movimento com seu controlador; chapéus e luva pertencem aos grupos da cabeça e da mão. Ossinho lançado começa na posição real da mão e termina no focinho; patas, corpo, cauda e sombra do cachorro são separados. A bancada cede temporariamente o espaço da ideia ao barco, sem alterar as escolhas do visitante. O Toddy corre no espaço da assinatura, preservando a leitura da apresentação.

Rolagem pequena acompanha o local de origem sem reiniciar a coreografia. Saída da tela, menu, redimensionamento, aba oculta e Escape cancelam a cena e devolvem o mascote a partir da posição atual. Cenas e jogos têm módulos independentes e carregamento sob demanda; animações finitas em transform/opacity, sem simulação ou loop de frame ocioso. Alternativas estáticas e jogos operáveis com movimento reduzido. Cada jogo tem sua própria janela acessível. Toque encaixa os blocos diretamente; basquete já começa com a mira ativa e aceita toque na bola.

Referências reutilizadas: [descoberta por toques do 60fps](https://60fps.design/shots/claude-ultracode-effort-selection-easter-egg-tap-interaction), descrição reconsultada, para a abertura escondida; [Eye Tracker do Bencho](https://bencho.dev/blocks/eye-tracker), preview e tema observados na pesquisa anterior, para atenção e reação do personagem. A nova tentativa de acesso ao Bencho retornou erro; não atribuir observação nova. Jogos, cenas e lógica próprios, sem código dessas referências.

## Descobertas e movimento automático, 8 de outubro de 2026

Revisão após o usuário rejeitar a gravidade zero. Preservar os três toques na estrela, a identidade existente e as referências de descoberta por toques do 60fps já consultadas. Substituir a flutuação de quadros por uma constelação própria em SVG, com um S desenhado e o planeta do mascote, delimitada à bancada e encerrada automaticamente. Segundo segredo: escrever café/coffee no campo da ideia faz o personagem tomar café, sem fala ou emoji.

Projetos passam a iniciar e repetir suas sequências enquanto estiverem na área de leitura, sem botões de reprodução. Um timeout por quadro visível, com intervalo de descanso e cancelamento completo ao sair da tela, ocultar a aba, abrir o puzzle ou desativar movimento. Reentrada e retomada devem funcionar sem acumular relógios. Reutilizar os pontos do gráfico, os dez sinais de partículas e o desenho do mascote. Não animar o texto das descrições, a posição dos quadros ou a largura do layout.

## Interações e descoberta, 8 de outubro de 2026

Preservar rosa, papel e amora, Space Grotesk, composição, janela reta e conteúdo profissional. A ousadia fica nas peças que respondem ao visitante, sem reintroduzir legendas, cursor decorativo ou textos removidos.

- Nome: letras respondem em uma onda curta ao toque, teclado ou entrada do ponteiro. O texto permanece legível e selecionável, sem mudar o layout.
- Projetos: demonstrações finitas próprias, acionadas na entrada e por um controle discreto de reprodução. Agenda com seleção de dia, gráfico que desenha uma leitura, quarto com resposta do monitor e planta, Sentinel com percurso SDK → API → banco, sem simular funcionalidades planejadas.
- Mascote: reação de descoberta com cambalhota e gesto de atenção enquanto a ideia é editada. Coordenar com o controlador existente, sem interromper trajetórias, arrasto ou travessuras.
- Segredo: três toques na estrela da janela revelam gravidade zero por alguns segundos. Objetos das ilustrações sobem e voltam, letras ondulam e pequenos sinais orbitais aparecem; sem girar ou inclinar a janela do hero.
- Implementação: CSS/WAAPI em transform e opacity, pool limitado de partículas e IntersectionObserver compartilhado. Sem dependências, varredura por frame, parallax global ou eventos de movimento no toque. Cancelar ao sair da tela, fechar a aba, abrir um jogo ou desativar movimento.

Referências consultadas: [Heat Map do Bencho](https://bencho.dev/blocks/heat-word), com preview e troca de forma por toque observados, para resposta tátil e progressiva; [Eye Tracker do Bencho](https://bencho.dev/blocks/eye-tracker), preview e controle de tema inspecionados, para atenção do personagem; [Claude Ultracode do 60fps](https://60fps.design/shots/claude-ultracode-effort-selection-easter-egg-tap-interaction), descrição consultada para descoberta por toques repetidos (vídeo não observado). Sem copiar código, filtros ou assets.

## Refinamento de toque, idioma e movimento independente

Revisão de 7 de outubro de 2026, conforme os testes do usuário em iPad. Preservar a paleta, tipografia, composição e funções existentes. Nova leitura da skill frontend-design-references e de sua referência complementar frontend-design.

- Idioma: inclinação de cabeça, piscadinha e aceno de 1,1 s. Reagir apenas a uma mudança efetiva; aguardar menu e trajetórias sem interrompê-los. No card, animar o rosto, sem fala ou ícones de bandeira.
- Tablet: aumentar o pouso para 96 px quando houver espaço no header; usar 104 px logo abaixo quando o intervalo entre a marca e os controles for estreito. Aplicar também a telas de toque em paisagem, sem mudar o tamanho do celular.
- Bancada: endireitar por estado explícito, preservando a resposta ao foco e garantindo a mesma interação quando o Safari não foca o botão por toque. Manter a posição reta até uma ação externa, Escape ou reset.
- Movimento independente: um traço de desenho sob o título dos projetos, terminado por uma estrela. Executar só uma vez ao entrar em vista, mantendo os textos estáticos e legíveis. Sem revelações repetidas de todas as seções, parallax, filtros ou dependências novas.
- Desempenho: reações CSS curtas, observador de visibilidade desconectado após a entrada, geometria reutilizada e interrupção com movimento reduzido ou aba oculta. Nenhum novo loop de rolagem.

Referências efetivamente consultadas: [descrição das microexpressões do Grok Bot no 60fps](https://60fps.design/shots/grok-bot-splash-mascot-expression-animation) para gestos breves de rosto; [catálogo do Annnimate](https://annnimate.com/animations), que apresenta o Scribble Highlighter, como ponto de partida para um traço editorial original. A página individual e os previews não puderam ser observados visualmente; não houve reprodução de movimento, assets ou código dessas referências. O traço, os gestos e os tempos foram desenhados para este portfólio.

Planejamento registrado antes da implementação, em 6 de outubro de 2026.

## Objetivo

Portfólio pessoal de Samuel Santos Cerqueira, com foco em front-end e espaço para projetos fullstack. Mostrar projetos reais e demonstrar cuidado de interface em uma experiência pequena, acessível e memorável. Conteúdo em português.

## Conceito

Um estúdio pessoal de interfaces. A peça central é uma bancada interativa: um pequeno navegador com um componente que o visitante pode personalizar. O projeto demonstra React, estados e sensibilidade visual sem bloquear o acesso aos trabalhos.

## Tokens

| Token      | Valor   | Uso                         |
| ---------- | ------- | --------------------------- |
| Papel      | #fff7fa | Fundo principal             |
| Rosa       | #ef75a3 | Blocos de identidade        |
| Rosa claro | #f8dbe7 | Superfícies secundárias     |
| Tinta      | #291b24 | Texto principal             |
| Amora      | #691b3e | Links e ações com contraste |
| Linha      | #e7cdd8 | Divisões e limites          |

Tipografia: Space Grotesk para títulos e texto, com pesos e tamanhos distintos; Georgia apenas na assinatura editorial secundária. Fontes locais, com fallback de sistema. Layout amplo, alinhado à esquerda; seções de projetos com imagens e texto, sem grade de cards idênticos.

```text
desktop
[assinatura       projetos / sobre / contato       GitHub]
[nome grande + apresentação       bancada interativa   ]
[introdução de projetos                                 ]
[RoomLab: visual amplo                 descrição / links]
[LinkWatch: descrição / links          visual amplo     ]
[sobre / formação                     tecnologias       ]
[contato com tipografia ampla + links                   ]

mobile
[assinatura                        menu]
[nome + apresentação + ação            ]
[bancada e controles                   ]
[projetos com visual antes do texto     ]
[sobre / tecnologias                   ]
[contato                               ]
```

## Referências efetivamente consultadas

- https://www.samuelrizzon.dev/ — incentivo à exploração; não reutilizar linguagem pixel, blocos, terminal, assets ou código.
- https://www.navbar.gallery/navbar/supaste — navegação compacta, acesso direto e ação distinguível; adaptar ao português e à identidade rosa.
- https://www.footer.design/sites/yash-fataniya — encerramento com presença visual e personalidade; não repetir quadriculado, ilustrações ou assinatura.
- https://rauno.me/craft — experimentos de interface apresentados como trabalho; criar uma bancada original, sem reproduzir componentes.
- https://bruno-simon.com/ — conceito de experiência que demonstra habilidade; conteúdo textual consultado, sem alegar observação da interação 3D.

Fontes consultadas pela skill frontend-design-references e sua skill complementar frontend-design. As páginas Supaste, Yash, Rauno e Samuel Rizzon foram também inspecionadas renderizadas.

## Revisão do briefing

Rosa é a cor favorita do usuário e será a identidade principal. Rejeitar um hero genérico com glow, métricas inventadas ou cartões repetidos. Concentrar a ousadia na bancada de interface; tipografia e respiro dão suporte. Não inventar experiência, disponibilidade, resultados de projetos, clientes ou contatos.

## Conteúdo e implementação

- Dados públicos verificados no GitHub: Samuel Santos Cerqueira, São Paulo, técnico em Desenvolvimento de Sistemas, bacharelado em TI na UNIVESP, React, TypeScript, Tailwind CSS e Git.
- Projetos principais: BarberAg, RoomLab e LinkWatch. BarberAg conforme README local do perfil, com link real e atuação em equipe distinguida. Links de demo apenas quando existentes.
- React, TypeScript, Vite e CSS próprio. Sem necessidade de backend para a primeira versão.
- Dados em src/data/portfolio.ts. Ilustrações próprias marcadas como conceituais; RoomLab e LinkWatch também têm capturas reais dos projetos locais, com toggle. LinkWatch identifica os dados como dados de teste.
- Menu mobile, foco visível, landmarks, link para pular conteúdo, reduced motion e contraste.
- Verificar TypeScript, build, desktop, mobile, teclado, controles e links.

## Limites da primeira versão

Nome confirmado pelo usuário: Samuel Santos. E-mail: samuelsantosmft7@gmail.com. LinkedIn: https://www.linkedin.com/in/samuelsce/. Next.js incluído conforme declaração do usuário. BarberAg confirmado pelo usuário como projeto privado de gestão e agendamento de barbearias, em https://barberag.com.br/. Não criar formulário sem envio funcional. Publicação e envio ao GitHub não fazem parte desta primeira entrega local.

## Personalidade da bancada e contexto do TCC

Revisão em 7 de outubro de 2026, após nova leitura das duas skills. Preservar os tokens, tipografia e composição aprovados. Concentrar a nova interação no mascote existente da bancada: olhar em direção ao mouse e uma piscadinha com sorriso ao acionar o botão. Sem animações repetidas nas seções, cursor que substitui o cursor nativo ou dependências novas.

Referência nova: [Eye tracker do Bencho](https://bencho.dev/blocks/eye-tracker), inspecionado na página individual renderizada e na demonstração interativa. Aproveitar o princípio de um personagem que responde ao ponteiro, com desenho e implementação próprios. A pesquisa anterior continua válida para a composição da página.

Recette foi confirmado pelo usuário para inclusão em um bloco compacto de TCC abaixo dos trabalhos principais. Seu [repositório público](https://github.com/Gab-sousa/recette-web) documenta receitas com IA, compartilhamento, favoritos e avaliações. A participação do autor está descrita no README do perfil. Apresentar o contexto acadêmico e a atuação no front-end, com contribuições pontuais em Django, sem reestilizar nem simular uma interface nova do projeto antigo.

## O mascote estica o cabeçalho

Ideia solicitada pelo usuário: o rostinho da bancada ajuda o cabeçalho a cobrir as laterais quando encontra a seção rosa. Preservar a largura de 1440 px da navegação e animar apenas a superfície por trás. O personagem aparece, puxa a borda e desaparece em 1,25 s; a ação reinicia a cada nova entrada na região, sem loop contínuo. Em telas de até 1500 px, a superfície já ocupa a largura útil e o personagem fica oculto.

Reutilizar o princípio de personagem responsivo do [Eye tracker do Bencho](https://bencho.dev/blocks/eye-tracker), já observado na revisão anterior. A coreografia de puxar, o SVG e a lógica são próprios. O catálogo Annnimate foi consultado por pesquisa, mas sua página renderizada falhou no navegador; nenhum movimento não observado dessa fonte foi atribuído ou reproduzido.

Iniciar a expansão antes da chegada do rosa, cobrir imediatamente em rolagens rápidas e navegação por âncoras, e manter a cobertura com movimento desativado. Não deslocar links, alterar textos ou acrescentar dependências.

## Mascote que acompanha a página

Evolução solicitada pelo usuário: o personagem deixa de aparecer apenas na puxada. O mesmo rostinho sai do card, observa a navegação, sobe para ajudar o cabeçalho e volta ao card quando o hero reaparece. Substitui a coreografia curta descrita acima, mantendo a identidade aprovada.

Plano de estados: `card → salto → observação → subida → puxada → pouso → observação`; o retorno ao hero faz `observação → retorno → card`. Salto de 820 ms com arco e abertura dos braços; subida de 520 ms; puxada de 780 ms sincronizada com a superfície; pouso de 600 ms; retorno de 650 ms com recolhimento dos membros. Expressão de esforço, sobrancelhas, gotinhas e uma pequena dobra na pegada explicam a puxada. Piscar é o único movimento periódico no repouso. Olhar e inclinação acompanham o ponteiro ou o foco; clicar em controles produz uma reação breve, e acionar o próprio personagem faz acenar e piscar.

Preservar papel `#fff7fa`, rosa `#ef75a3`, berry `#691b3e` e tinta `#291b24`, a tipografia e toda a composição. Reutilizar a referência Eye tracker do Bencho, já inspecionada, para o olhar; trajetórias, expressões e desenho próprios, sem código ou assets de terceiros. A ideia do usuário fornece a direção para a coreografia nova.

Critérios de contenção: um único personagem visível; original do card oculto apenas enquanto está fora; margem de leitura preservada; em telas de até 1100 px, pouso no espaço entre marca e controles do cabeçalho. Menu aberto oculta o personagem temporariamente. Sem falas persistentes, animações adicionais nas seções ou dependências novas. Movimento desativado mantém o personagem no card e a correção funcional do header. Interrupções capturam a posição atual antes de recalcular a viagem; mudanças de largura recalculam o pouso seguro.

## Personalidade sem fala e interação física

Revisão solicitada pelo usuário: retirar toda fala do mascote e aprofundar suas animações. Reutilizar a pesquisa da skill e o olhar responsivo do Eye tracker do Bencho; desenho, reações e coreografia continuam próprios. Preservar a estética e os locais de repouso aprovados.

Novos estados `held` e `released`, com prioridade sobre deslocamentos automáticos. A pegada começa com surpresa; após 320 ms, sobrancelhas em V e boca fechada; após 1,25 s, cor mais quente, bochechas coradas, esperneio, pequenas marcas de irritação e vapor desenhado. O arrasto transfere peso pela inclinação e alongamento proporcionais à velocidade. A soltura usa arco, contração, rebote e acomodação de 720 ms, seguida de uma birra curta que se dissolve em sorriso. O personagem volta à margem para liberar o conteúdo; não fica abandonado sobre um controle.

Gestos contextuais: lupa nas capturas; olhos sonolentos, mão no rosto e lua ao escurecer; proteção contra a luz ao clarear; saltos e pequenos corações na comemoração; susto na rolagem rápida; espreguiçada depois de repouso prolongado. Props são formas SVG, nunca balões ou textos. O personagem original do card também pode ser pego. A bancada mantém suas interações existentes.

Garantir alternativa por teclado (Enter, Espaço, setas, Escape), captura de ponteiro para mouse/toque, cancelamento em perda de foco, menu e resize, restauração do foco ao card, ausência de rolagem horizontal e interrupção completa com movimento desativado. Piscar continua discreto; espreguiçadas ocorrem após 14 s de repouso. Sem bibliotecas novas, timers de polling ou animações adicionais nas seções.

## Caminhada, planetinha e empurrão de volta

Evolução pedida pelo usuário: o retorno depois da soltura deixa de usar um arco de voo. Pousar no local em 360 ms e caminhar até o card ou o pouso de observação, com aceleração e freio discretos, passos alternados de 340 ms, braços em oposição, inclinação e sombra acompanhando o peso. Durante o planetinha, o passo fica mais rápido. O destino é atualizado se a página se mover durante a caminhada.

Acumular irritação por tempo de pegada e arrasto; uma pegada de 2,8 s também ativa o modo diretamente. Recuperar os três anéis finos do card, com rotações em direções e velocidades distintas, sem mudar a identidade do personagem. Após voltar ao pouso, preparação de 1,2 s, deslocamento ao botão, toque com o braço e sorriso assimétrico. Fazer duas pequenas travessuras: uma troca temporária em controles visuais visíveis e uma cutucada com balanço em uma ilustração. Restaurar o estado anterior, limpar classes e voltar a pé. Não fazer loops de travessuras independentes da provocação. A intervenção humana tem prioridade, e movimento desativado interrompe toda a sequência.

No desktop com largura útil acima de 1500 px: subida de 580 ms, pegada preparada durante 220 ms, dois esforços em 1000 ms sincronizados com a expansão. Desenhar a mão e a dobra na frente do corpo para que a pegada fique visível. Ao deixar a região rosa: ir até a borda em 520 ms, firmar durante 180 ms e empurrar de volta em 900 ms. Preservar posição e largura dos links. Em celular/tablet e larguras sem espaço lateral suficiente, não acionar subida, pegada, puxada ou empurrão; manter somente a cobertura funcional do fundo.

Reutilizar a referência de olhar [Bencho](https://bencho.dev/blocks/eye-tracker), já inspecionada, e a própria aura do card como referência explícita do usuário. Caminhada, travessuras, expressões e coordenação do header são implementações próprias. Preservar cores, conteúdo, composição e ausência de falas.

## Volume, rig e continuidade do mascote

Refinar o personagem aprovado com corpo levemente orgânico, luz localizada e sombreado suave, braços e pernas encorpados, pequenas mãos e sapatos. Um único `MascotArtwork` desenha tanto o rosto do card quanto o personagem fora dele. Preservar cores, expressão simples e composição da página. Reutilizar a skill e a referência de olhar do Bencho; a escultura SVG, a mecânica dos membros e a órbita são próprias.

A lupa passa a compartilhar um rig com ombro, cotovelo, cabo e dedos, sem trajetória independente. A aura vira uma faixa orbital inclinada, com metades atrás e à frente do corpo, acompanhando sua inclinação e flutuação. Satélites se deslocam pela órbita; não girar os anéis inteiros em torno do SVG. Sombra difusa com contato sutil e origem explícita sob os pés. Respiração discreta no repouso, birra menos exagerada e início/fim suaves nas viagens.

A caminhada segue o destino atual a partir da posição atual, com aceleração e frenagem. A distância efetivamente percorrida controla passada, elevação dos pés, oposição dos braços e transferência de peso. Recalcular o destino durante a rolagem, sem retornar primeiro ao ponto antigo. O retorno ao card só troca o desenho quando as posições e os tamanhos convergem. Reações com objetos completam a retirada antes de encerrar.

Menu móvel: abaixar, retirar-se em 380 ms, aguardar e reaparecer em 520 ms. Cancelar pegadas, travessuras e callbacks antigos ao abrir; manter a navegação livre. Alterações rápidas de direção ou viewport preservam a posição visível. O indicador de foco do teclado é uma pequena linha abaixo dos pés, separado da órbita. Verificar arrasto com retorno rápido, menu aberto/fechado, lupa, planetinha, header reversível e movimento desativado.

Usar um cabeçalho fixo com reserva equivalente no início do conteúdo (96 px no desktop e 84 px no celular). Isso mantém a camada da navegação estável durante a rolagem e permite abrir o menu sem empurrar a página. Preservar a largura dos links e a superfície animada existente.

## Planetinha mais decidido e travessuras com intenção

Reutilizar a skill e a referência de olhar [Bencho](https://bencho.dev/blocks/eye-tracker). Preservar o desenho e a composição aprovados. No planetinha, fechar as sobrancelhas, comprimir os olhos, mostrar dentes cerrados e pequenas rugas de expressão, aquecer o rosa e acelerar discretamente os satélites. A expressão continua durante a aproximação e o toque; depois aparece um sorriso de provocação. Sem falas.

Separar a postura da flutuação em um grupo interno do SVG para que trocar de gesto não reinicie o movimento do corpo. Inclinação, compressão e braços mudam com transições suaves. Voos usam uma trajetória parabólica contínua, com aceleração e freio; o olhar acompanha o alvo durante a viagem e a observação do resultado.

Coreografar uma sequência finita: avaliar um controle visual próximo, aproximar-se, preparar a mão, tocar, observar, provocar, desfazer a troca e cutucar uma ilustração visível. Sincronizar a resposta dos elementos com o contato da mão. Encerrar com uma breve acomodação antes de voltar andando. Revalidar os alvos em cada etapa; botão precisa estar completamente visível, ilustração pode estar parcialmente visível. Interação humana, menu e pausa cancelam os callbacks e restauram efeitos temporários.

## Sincronização do header com a borda rosa

Correção de lógica solicitada pelo usuário, preservando a coreografia e o visual aprovados. Iniciar puxada e fechamento quando a seção rosa cruza o meio do header, em vez de antecipar a chegada em centenas de pixels. Usar tolerância de 6 px na entrada/saída. No desktop com animações habilitadas, a largura é controlada pela coreografia: a cobertura automática não pode preencher o fundo antes do gesto. Manter cobertura imediata em telas estreitas e com movimento desativado. Sem pesquisa visual nova para esta correção mecânica.

## Revisão final da experiência

Reutilizar a pesquisa da skill e o olhar do Bencho. Manter papel, rosa, berry, Space Grotesk e toda a composição aprovada. Concentrar a personalidade no mascote, sem adicionar efeitos decorativos às seções.

Revisar hero/bancada, os três projetos, Recette, sobre, contato e rodapé entre 320 px e desktop. Aumentar os alvos de toque para 44 px e o campo móvel para 16 px, mantendo as miniaturas na escala atual. Ajustar o espaço entre o controle de iluminação e a ilustração. O menu deve fechar ao sair do breakpoint móvel e ao tocar fora; Escape continua recuperando foco.

Interromper gestos ao ocultar a aba: cancelar callbacks, restaurar controles, capturar posição e suspender atualizações de geometria/olhar. Ao retornar, medir antes de retomar o pouso. Preservar a lupa integrada ao braço, a órbita no corpo, a sombra sob os pés e o retorno contínuo. Não adicionar mais travessuras sem uma necessidade demonstrada na revisão.

## Calendário de contribuições e segredo do planetinha

Reutilizar a skill `frontend-design-references` e a identidade aprovada. A referência efetivamente inspecionada nesta etapa é o [calendário anual de Samuel Rizzon](https://www.samuelrizzon.dev/#graph): faixa horizontal com semanas em colunas e resumo anual. Adaptar essa leitura para Space Grotesk, papel e cinco intensidades de rosa/berry, sem reproduzir sua tipografia, cores ou outros elementos.

Posicionar o calendário depois de sobre e antes do contato. Usar dados públicos reais, detalhes por dia, teclado e faixa com rolagem interna no celular. Denominar os dados “contribuições”, pois o GitHub inclui outras ações além de commits. Mostrar a data da última atualização; preservar uma captura real datada quando o serviço falhar.

O segredo reutiliza o rosto do mascote como um botão discreto ao lado do título. Três ativações revelam um puzzle de luzes 4×4, conectado visualmente aos quadradinhos do calendário. Acender o quadro completo faz aparecer a órbita do planetinha, com uma comemoração breve, sem fala. Janela de papel, quadrados de rosa e controles coerentes com a bancada; recorde local, reinício e novos desafios solucionáveis.

Carregar o calendário só perto da tela e o jogo apenas ao descobri-lo. Não adicionar dependências nem loop de simulação; pausar a página durante o jogo e usar efeitos finitos em CSS/SVG. Respeitar movimento reduzido, foco por teclado, Escape e alvos de toque de 44 px.
