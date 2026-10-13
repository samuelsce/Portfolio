# Redesign local — carvão e vinho

Data: 13 de outubro de 2026. Base: commit `71542e3`, versão 1.11.1.
Branch de trabalho: `codex/redesign-carvao-vinho`.

Este documento consolida a direção do redesign e o plano de execução. As medidas são pontos de partida para validação visual, não um layout já aprovado. A pesquisa e suas limitações estão em [pesquisa consolidada](pesquisa-redesign-consolidada.md).

## 1. Escopo autorizado

- Trabalhar localmente, na branch separada da main.
- Manter a versão publicada em samuelsce.dev durante o desenvolvimento.
- Não fazer push, deploy, publicação de preview externo ou merge nesta etapa.
- Fazer commits locais pequenos e revisáveis. O merge depende da aprovação de Samuel; publicação exige uma decisão posterior explícita.
- Esta entrega contém pesquisa, planejamento e documentação. A implementação visual começa na próxima fase.
- Preservar `DESIGN-PLAN.md` e `docs/planejamento-portfolio-2d.md` como histórico. Suas direções antigas de rosa, mangá e violeta não orientam o novo visual.

## 2. Objetivo e critério profissional

Apresentar Samuel Santos como desenvolvedor Full Stack em início de carreira, com experiência em produtos reais, cuidado de interface e personalidade. A primeira visita deve permitir reconhecer nome, atuação, projetos e contato sem esperar animações ou descobrir comandos.

Três profundidades de leitura, na mesma experiência:

1. Apresentação breve: nome, atuação, trabalho selecionado, currículo e contato.
2. Avaliação de projetos: contribuição individual, situação do produto, decisões, evidências e limites.
3. Exploração: personagem, reações e segredos pessoais.

Ensaio de avaliação proposto: após 30 segundos na página, uma pessoa deve conseguir identificar a atuação de Samuel, apontar um projeto em produção, distinguir sua responsabilidade nele e encontrar currículo/contato. Os 30 segundos são um critério nosso de teste, não uma estatística sobre recrutadores.

## 3. Síntese das decisões e do diagnóstico

O histórico mostrou que trocar cores e acrescentar detalhes a uma composição genérica não resolve sua identidade. Os conceitos editoriais anteriores deram peso demais ao texto; o usuário os rejeitou como blog. A nova referência principal é Pablo Míguez, pela presença da fotografia, contraste, tipografia e integração do movimento.

As críticas consultadas e a análise de riscos de homogeneização sugerem decisões explícitas antes da geração e revisão em partes. Não existe um teste visual confiável para identificar autoria por IA, nem uma lista de fontes/cores proibidas. Aplicação ao projeto: cada escolha precisa responder ao conteúdo, ao público e ao gosto de Samuel.

| Padrão a evitar neste projeto | Substituição concreta |
| --- | --- |
| Hero com promessa vaga e objetos genéricos | Nome, atuação, retrato próprio e acesso ao trabalho |
| Mesma caixa arredondada para todo conteúdo | Imagens amplas, grupos por função e hierarquia de superfícies |
| Três cartões iguais em cada seção | Um destaque e uma seleção visual com densidade controlada |
| Tecnologia usada como decoração | Tecnologias relacionadas à decisão que sustentam em cada projeto |
| Identidade resumida ao acento colorido | Fotografia, lettering, recorte e movimento com regras comuns |
| Todas as seções entrando por fade-up | Uma entrada coordenada e revelações específicas nas mídias |
| Recrutador precisa explorar um jogo para encontrar informação | Conteúdo profissional sempre acessível; jogos são opcionais |
| Aparência sofisticada com métricas fictícias | Contexto, autoria e evidências reais, com limites visíveis |

## 4. Direção de arte: retrato gráfico em movimento

A imagem de abertura será um retrato fotográfico real de Samuel tratado em 2D, articulado com seu nome. O foco expressivo é essa relação entre fotografia e lettering. A interface ao redor será clara, com material gráfico suficiente para continuar reconhecível nos projetos e nos jogos.

O gesto visual recorrente será um recorte vertical deslocado: uma área da fotografia, uma faixa de cor ou um encontro entre duas superfícies. Usar no hero, nas capas de projeto e nas transições de mídia. O recorte não altera o alinhamento da navegação nem acrescenta molduras decorativas a todo componente.

Explorar o S de Santos dentro do lettering, relacionando-o ao favicon existente. Não adicionar um logotipo separado ao lado do nome. Estudar o desenho do nome com cuidado de espaçamento; preservar texto semanticamente legível mesmo que a assinatura tenha acabamento vetorial.

Fotografia: selecionar entre as referências fornecidas, avaliar recorte, resolução e iluminação. Nenhuma imagem de terceiros substitui Samuel e nenhum rosto artificial será produzido. Trama localizada preparada como asset; rosto legível e superfície principal limpa. Evitar filtro de distorção contínuo em tela inteira.

Screenshots de produto mantêm as cores originais e a leitura da interface. A identidade do portfólio entra no enquadramento e na composição, não em um filtro vinho sobre a aplicação.

## 5. Tokens iniciais de design

### Cor

| Token | HEX | Papel |
| --- | --- | --- |
| Carvão | `#242123` | Fundo principal e tinta das áreas claras |
| Grafite | `#302A2E` | Superfície secundária e áreas de leitura |
| Branco mineral | `#ECE8E5` | Texto principal e superfícies claras |
| Cinza de leitura | `#BDB4B8` | Texto secundário sobre fundos escuros |
| Vinho | `#7D303C` | Destaques, preenchimentos e texto sobre superfícies claras |
| Vinho profundo | `#54232D` | Apoio gráfico nas áreas de acento |

O vinho não será texto pequeno nem indicador de foco isolado sobre carvão. Nessas regiões, links usam texto mineral com sublinhado e foco claro. A ação principal pode usar fundo mineral e texto carvão. A cor de acento não precisa identificar todas as ações.

Contrastes calculados pela fórmula WCAG de luminância relativa, para cores sólidas sem transparência:

| Combinação | Contraste |
| --- | --- |
| Mineral / carvão | 13,09:1 |
| Cinza / carvão | 7,89:1 |
| Mineral / vinho | 7,31:1 |
| Mineral / grafite | 11,52:1 |
| Cinza / grafite | 6,94:1 |
| Vinho / carvão | 1,79:1 — inadequado para texto e foco |

Testar também bordas, controles, hover, foco e texto sobre imagens. Os valores acima não certificam a interface completa.

### Tipografia

- Anybody para a assinatura e poucos títulos de grande escala; testar largura intermediária/estreita e peso 650–750. Fonte de expressão gráfica, não corpo de texto.
- Instrument Sans para leitura e controles, pesos 400–600.
- Nome: ponto de partida de 96–144 px no desktop e 48–64 px no celular; ajustar pela altura útil e pelas quebras reais em PT/EN.
- Títulos de seção: 36–56 px no desktop e 28–36 px no celular.
- Corpo: 17–18 px, entrelinha 1,5–1,6. Metadados úteis: 14–15 px. Campos móveis: pelo menos 16 px.
- Textos de leitura com aproximadamente 55–70 caracteres por linha. Sentence case na interface; caixa alta somente se fizer parte do lettering aprovado.
- Não animar largura/peso da fonte continuamente. Servir WOFF2 localmente e somente variantes necessárias.

### Grid e controles

- Grade desktop de 12 colunas, largura útil máxima inicial de 1280 px; composição pode ocupar bordas no hero sem levar controles para fora da área segura.
- Margens: 20 px em telas pequenas, 32 px em tablet, 48–64 px em desktop.
- Espaçamento por relação: 8, 12, 16, 24, 32, 48, 64 e 96 px. Seções não recebem todas o mesmo intervalo.
- Botões com altura mínima de 44 px, área de toque confortável, raio inicial de 6 px; imagem de projeto com recorte reto ou raio de até 4 px, conforme a prancha.
- Bordas identificam interação ou agrupamento; evitar linhas finas formando uma página de jornal.
- Foco de 2 px com afastamento de 3 px, mineral no escuro e vinho no claro. Nenhum texto é coberto pelo header ou pelos personagens.

## 6. Estrutura da experiência

### Primeira dobra

Desktop: retrato ocupa aproximadamente a metade esquerda; nome encontra a imagem pelo lado direito e usa a região inferior como apoio. Nome, atuação e ação principal têm áreas sólidas de leitura. O rosto não fica sob textos. Evitar uma simetria de dois blocos genéricos e não repetir o retrato central com marquee de Pablo.

Conteúdo inicial:

- Samuel Santos.
- Desenvolvedor Full Stack.
- Descrição curta e concreta de aplicações, interfaces e APIs.
- Ver projetos, currículo e contato acessíveis.
- Um acesso compacto ao BarberAg em produção pode aparecer na passagem para a seção seguinte, sem acrescentar uma mini-dashboard dentro do hero.

No celular, compor nome, atuação e ação antes de uma fotografia que empurre todo o conteúdo para baixo. Nome em até duas linhas; retrato com recorte próprio e escala suficiente. A imagem não exige uma altura rígida de 100vh. Em tablet, usar uma composição intermediária: não apenas ampliar o layout móvel.

```text
Desktop
Samuel Santos                Projetos  Sobre  Contato  Currículo  PT/EN

 [ retrato gráfico amplo ]                 Samuel
 [ recorte e uma área vinho ]              Santos
                          Desenvolvedor Full Stack
                          descrição breve
                          Ver projetos

 transição curta para a imagem real do BarberAg

Mobile
Samuel Santos                                  Menu  PT/EN
Samuel Santos
Desenvolvedor Full Stack
descrição breve                    Ver projetos
[ retrato com recorte específico para esta largura ]
BarberAg / imagem / participação / abrir projeto
```

Este wireframe é funcional. A referência visual da próxima fase estabelecerá a composição real, incluindo os encontros entre texto e imagem.

### Trabalho selecionado

Ordem proposta: BarberAg, LinkWatch, RoomLab e Sentinel. BarberAg prova experiência com operação real; LinkWatch apresenta atuação Full Stack logo em seguida; RoomLab demonstra acabamento de interface; Sentinel aprofunda sistemas, investigação e dados. Recette permanece como registro compacto de colaboração e formação.

BarberAg recebe o primeiro destaque amplo. Os demais podem usar uma grade de dois projetos no desktop, com imagens permanentes e resumo curto; Sentinel pode ganhar largura própria se sua mídia exigir. Mobile apresenta todos em sequência. A ordem visual corresponde à ordem de leitura e de teclado.

Cada entrada informa nome, finalidade, situação atual, contribuição e links. A stack é curta e específica. Não apresentar filtros com quatro projetos, carrossel obrigatório ou previews que só aparecem no hover.

### Detalhes dos projetos

Planejar páginas de estudo de caso com URL própria. Primeiro implementar o shell e um caso do BarberAg; os demais usam a mesma estrutura de leitura, com mídia e decisões próprias.

Cada caso contém: resumo e situação; contribuição individual/equipe; um fluxo real de uso; duas ou três decisões com motivo e limite; evidências de validação; links e próximos passos. Imagens ocupam boa parte da apresentação; o texto aprofunda sem dominar a página inicial.

Rotas pretendidas: `/projetos/barberag/`, `/projetos/linkwatch/`, `/projetos/roomlab/` e `/projetos/sentinel/`. Durante a primeira dobra local, não criar rotas vazias. Na etapa de casos, definir geração de HTML estático por rota, carregamento direto e navegação de retorno. Não migrar de framework por causa da direção visual. Validar SEO e recarga real antes de fechar essa decisão técnica.

### Sobre, atividade e contato

Sobre compacto: trajetória, formação e forma de trabalhar. Relacionar React/TypeScript, APIs/dados e testes às evidências dos projetos. Descrever IA como apoio com revisão e validação; não inventar especialização em ML ou senioridade.

Calendário de contribuições preservado, visualmente integrado e carregado perto da tela. Não apresentar contribuições como produtividade ou qualidade de código. Data e alternativa para falhas continuam visíveis.

Contato alinhado à mesma grade, com e-mail, copiar e-mail, LinkedIn e GitHub. Rodapé pequeno. Sem frases de encerramento que o usuário já pediu para remover.

## 7. Conteúdo e assets necessários

| Projeto | Evidência central | Material a preparar |
| --- | --- | --- |
| BarberAg | Front-end de um SaaS real, colaboração e manutenção | Captura autorizada da agenda/fluxo com dados de demonstração; separar contribuição do back-end |
| LinkWatch | Worker, sessões, isolamento, transações, SSRF e testes | Captura do monitor/incident timeline local, uma decisão e demonstração reproduzível |
| RoomLab | Estados, documento 2D/3D, histórico, persistência e compartilhamento | Captura do editor e sequência curta de uma interação |
| Sentinel | API, worker, dashboard ao vivo e triagem auditada | Captura da demo local e evidência de um fluxo; conservar limites da validação |
| Recette | Projeto acadêmico em equipe | Registro compacto, repositório e participação real |

As imagens atuais de BarberAg e LinkWatch são descritas no conteúdo como páginas iniciais. Não chamá-las de captura do dashboard. Sentinel não possui imagem no catálogo atual. Resolver essas lacunas com imagens reais antes de concluir suas capas.

## 8. Personagem, movimento e descobertas

Toddy é a proposta inicial de personagem recorrente em 2D. Fotografias do cachorro orientam corpo comprido/baixo, patas curtas, pelagem marrom, focinho escuro, orelhas caídas e rabo curto. Estudar seis poses e verificar silhueta a 64, 96 e 160 px antes de animar. Personagem e fotografia de Samuel têm funções diferentes.

Não decidir automaticamente que o mascote antigo será substituído em todos os jogos. A direção do ator e sua adaptação aos jogos serão avaliadas após o estudo visual. Inventariar funcionalidades para que nenhuma desapareça silenciosamente; alterar desenho e composição sem perder controles, regras e descobertas úteis.

| Momento | Movimento proposto | Duração inicial / encerramento |
| --- | --- | --- |
| Chegada | Recorte gráfico acomoda fotografia e lettering | 600–900 ms; texto/links operáveis desde o início |
| Primeiro scroll | Duas camadas gráficas se afastam poucos pixels e entregam o primeiro projeto | 300–500 ms ou deslocamento limitado; sem pinning longo |
| Projeto entra na tela | Revelação da mídia e uma breve demonstração específica | 1,5–3 s, só visível; não reiniciar por scroll mínimo |
| Leitura | Um gesto ocasional do personagem | 0,5–1,2 s; pausa longa; um ator ativo |
| Troca PT/EN | Pequena reação do personagem | 250–450 ms; estado dos jogos preservado |
| Link/menu | Sublinhado, mudança de superfície e abertura coerente | 120–280 ms; teclado e toque equivalentes |
| Segredo | Antecipação, ação, contato, reação e saída | Sequência finita; Escape e fechar sempre disponíveis |

A sequência exata será ajustada observando o protótipo. Não utilizar fade-up em tudo, movimento permanente no rosto, cursor substituto ou scroll artificial. Movimento automático que continue por mais de cinco segundos precisa de controle adequado; a preferência de movimento permanece acessível no menu.

Mapa inicial de segredos a adaptar ao novo desenho:

- Toddy junto a uma pequena pista na seção Sobre: observa, procura e busca o osso.
- One Piece num detalhe de uma vinheta: descoberta opcional e barco no mesmo estilo gráfico.
- Michael num detalhe de iluminação/ambiente: coreografia curta com apoio de pé e chapéu realmente ligado ao ator.
- Basquete num detalhe da seção de projetos: conservar o jogo com controles revisados.
- Minecraft associado à atividade: conservar os saltos e sua interação de segurar/soltar.
- Mira num detalhe gráfico discreto do contato: três segundos, posições aleatórias e treino sem prazo.
- Puzzle ligado ao calendário; constelação e outras descobertas inventariadas antes da migração.

Acionadores descobríveis também funcionam por teclado. Segredos não substituem ações profissionais, não interrompem links e não exigem clicá-los repetidamente por acidente. Um único controlador resolve prioridade entre menu, cena, jogo, movimento reduzido e aba oculta. Scroll pequeno conserva ações; sair completamente da área usa uma política de pausa/encerramento explícita, sem deixar animações invisíveis gastando recursos.

## 9. Arquitetura de implementação local

Base atual: React 19, TypeScript, Vite e CSS/SVG; nenhuma biblioteca de motion instalada. Manter essa base inicialmente. CSS e Web Animations API cobrem transições e trajetórias finitas. Adotar outra biblioteca somente para uma necessidade demonstrada, com custo medido e uma única responsabilidade.

Observações concretas do código: `App.tsx` tem 987 linhas; `PageMascot.tsx`, 1794. `main.tsx` importa oito arquivos CSS globais. As descobertas já têm módulos lazy separados. Esses fatos indicam acoplamento e manutenção, não provam lentidão por si só.

Plano de separação:

- Conteúdo e traduções continuam fora da composição; acrescentar situação, contribuição e evidências estruturadas aos projetos.
- Separar header, hero, seleção de projetos, sobre e contato em componentes de seção.
- Tokens e estilos base únicos; estilos de seção com escopo próprio. Evitar novos arquivos de overrides sobre overrides.
- UI estática não depende do controlador do personagem. Um limite de falha deve permitir ler projetos/contatos mesmo se o módulo de uma cena falhar.
- Separar desenho do ator, máquina de estados e trajetória. Estado React somente quando a fase muda; geometria/movimento não remontam a página por frame.
- Adaptar o mecanismo existente de jogos/diálogos e funções puras úteis. Não carregar o controlador antigo completo como segundo sistema de animação invisível.
- Propriedade única do ator e registro de animações/timers/listeners com encerramento previsível.
- Módulos de jogos, cenas e calendário ficam fora da abertura. Não baixar tudo em prefetch indiscriminado.

O redesign se torna a composição local da branch; a versão anterior permanece no histórico/main. Evitar duas aplicações completas selecionadas por uma flag pública. Código antigo só é retirado conforme o inventário confirmar a migração correspondente.

## 10. Performance: base, metas e método

Compilação local da base em 13/10/2026: TypeScript e Vite passaram. Nenhum deploy foi executado.

| Medida de pacote atual | Valor |
| --- | --- |
| JS principal | 103,61 kB gzip |
| CSS principal | 18,65 kB gzip |
| Quatro arquivos WOFF2 emitidos | 52,82 kB somados |
| Cenas pessoais, sob demanda | 11,71 kB JS gzip |
| Calendário, sob demanda | 4,19 kB JS gzip |

Arquivos emitidos não provam o que o navegador baixa nem medem FPS. O baseline de rede/CPU/frames ainda precisa ser capturado no navegador local com cenários reproduzíveis.

Metas iniciais propostas, revisáveis apenas com motivo registrado:

- JS principal até 110 kB gzip e CSS inicial até 20 kB gzip.
- Fontes efetivamente baixadas até 80 kB WOFF2, sem duplicar famílias antigas no novo shell.
- Retrato mobile até 180 kB; desktop até 300 kB, em dimensões adequadas à renderização.
- Transferência crítica inicial até aproximadamente 450 kB no celular e 600 kB no desktop, incluindo mídia/fontes/scripts/estilos realmente requisitados.
- Nenhum módulo de jogo/cena pesada no primeiro carregamento, nenhum loop ocioso de JavaScript fora da tela/aba e nenhuma atualização React por frame na coreografia.
- Metas de experiência: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. O critério de campo usa o percentil 75; medições locais são diagnóstico, não equivalência aos dados reais.

Implementação: priorizar transform/opacity; reservar dimensões de imagens/fontes; evitar filtros grandes e animação de layout; carregar o retrato crítico cedo e imagens inferiores sob demanda; interromper trabalho invisível; agrupar medições e escritas; usar observadores compartilhados quando isso simplificar de fato.

Validar rolagem com cena visível, abertura/fechamento repetido, aba oculta, resize, troca de idioma, retorno ao hero e três minutos de uso. Inspecionar tarefas longas, frames perdidos e crescimento de recursos. Limitação de CPU não simula a GPU de iPhone/iPad. Teste em Safari e aparelho físico continua necessário para afirmar fluidez nesses dispositivos.

## 11. Responsividade, acessibilidade e SEO

- Verificar 320, 390, 430, 768, 820, 1024, 1280 e 1440 px; incluir tablet em retrato/paisagem e laptop de pouca altura.
- Respeitar áreas seguras e barras móveis; usar dimensões adaptativas em vez de assumir um viewport constante.
- Sem rolagem horizontal da página. Uma região intencional, como calendário, tem rolagem própria e indicação de uso.
- Testar toque, mouse, teclado, zoom 200%, foco visível, ordem de leitura, Escape e retorno ao acionador.
- Preferência de movimento reduzido entrega layout completo e alternativas operáveis dos jogos; não esconder todo o personagem/conteúdo como fallback.
- H1 com nome e atuação disponíveis como texto; imagens com descrição pertinente. Ícones decorativos não entram na leitura assistiva.
- PT/EN desde o primeiro componente. Testar palavras maiores, descrição de projetos, datas e controles; idioma não reinicia animações/jogos sem necessidade.
- Metadados, domínio canônico, favicon, imagem social e títulos dos casos devem corresponder ao conteúdo real. Não trocar o domínio pelo localhost.
- Quando existirem páginas individuais, validar HTML inicial, recarga direta, rota desconhecida e indexação antes de considerar a arquitetura concluída.

## 12. Etapas e entregas

| Etapa | Entrega concreta | Critério para avançar |
| --- | --- | --- |
| 1. Direção visual | Moodboard curto, lettering, tokens e referência grande de primeira dobra desktop/mobile | Retrato, nome e vinho formam identidade coerente; composição legível parada |
| 2. Primeiro protótipo local | Header, hero e destaque BarberAg com conteúdo real | Clareza profissional em 30 s, toque/teclado e ausência de overflow |
| 3. Primeiro movimento | Entrada e uma reação do personagem | Antecipação/apoio/encerramento legíveis; desempenho não regrede |
| 4. Projetos e caso piloto | Seleção completa e caso do BarberAg | Contribuição/situação claras, mídia real e retorno de navegação |
| 5. Conteúdo e acesso | Sobre, calendário, contato, PT/EN e movimento reduzido | Conteúdo completo e acessível mesmo sem efeitos |
| 6. Descobertas | Inventário migrado, cenas e jogos com novo desenho | Regras/controles preservados; recursos limpos ao fechar |
| 7. Revisão local | Comparações visuais, medições e cenários de uso | Leitura, identidade, performance e funcionamento aprováveis |
| 8. Entrega para decisão | Branch e diferenças revisáveis, registro dos limites | Samuel decide sobre merge; publicação segue decisão explícita posterior |

Commits locais por entrega. A aprovação da primeira composição pode ajustar detalhes antes de expandir para todas as seções; não redesenhar tudo por uma variação de cor. A primeira produção local terá hero + BarberAg + uma reação, e não o site inteiro com todas as cenas ao mesmo tempo.

## 13. Pendências que não bloqueiam a primeira dobra

- Escolher o recorte entre as fotos fornecidas e conferir qualidade real no tamanho de uso.
- Preparar as capturas do produto BarberAg e das demos locais sem expor dados de clientes.
- Confirmar o ator recorrente depois de estudos de silhueta; não adaptar todos os jogos antes disso.
- Decidir geração estática de casos na fase própria, com teste de acesso direto e metadados.
- Registrar baseline de rede/frames local e teste físico posterior.

## 14. Definição de conclusão local

Nome/atuação/projetos/contato imediatamente compreensíveis; identidade reconhecível sem movimento; vinho aplicado com contraste correto; fotografias e screenshots reais; contribuição e situação honestas; PT/EN e teclado/toque funcionais; jogos/cenas sem trabalho invisível; limites de teste documentados; revisão feita em telas pequenas, tablets e desktop. Produção permanece a versão atual durante todo esse trabalho.
