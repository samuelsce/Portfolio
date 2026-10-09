# Validação do portfólio

## Quadra, janela de mira e saltos, 9 de outubro de 2026

- TypeScript e build de produção aprovados. Quadra em perspectiva, tabela conectada ao suporte, rede e gomos da bola revisados. Piso, personagem e bola têm camadas próprias; distância entre bola e seu encaixe na mão igual a zero nas amostras.
- Edge/Chromium em 1440, 390 e 320 px. Mira centralizada e contida na tela, fechamento dentro da janela, foco inicial e retorno ao acionador conferidos. Prazo de 3 segundos, posições aleatórias, treino sem prazo, teclado e arremessos novamente aprovados. Abrir a mira não baixa o módulo das cenas do barco, Toddy e dança.
- Saltos: Espaço e Enter segurados/soltos, teclas simultâneas, repetição, reinício, modo tranquilo, queda e seis saltos conferidos. Perda de foco, aba oculta e cancelamento do ponteiro cancelam a carga sem salto indevido. Trajetórias em curso pausam na aba oculta. Escape fecha e limpa a janela. Frase extra do puzzle removida em PT/EN e fechamento alinhado à direita.
- Mira e janela compartilhada: 2,68 KB de JS gzip, antes 13,20 KB junto às cenas; traduções compartilhadas excluídas da comparação. Relógio agenda somente a próxima mudança de segundo, em vez de consultar dez vezes por segundo. Ilhas estáticas memoizadas; observador da mira do basquete evita reiniciar uma animação quando a largura não mudou. Sem novas dependências ou loops por quadro.
- JS principal: 103,61 KB gzip; CSS principal: 18,65 KB. Nenhum erro de JavaScript ou excesso horizontal nos cenários. Capturas e diagnósticos locais em .publish-staging/verify-current-games.cjs e verify-game-inputs.cjs, ignorados no Git. Tamanhos, toque e visibilidade simulados; sem teste em Safari/aparelho físico ou medição de FPS.

## Mira aleatória e controles dos jogos, 9 de outubro de 2026

- TypeScript e build de produção aprovados. Sorteio apenas ao iniciar ou acertar um alvo, com tentativas limitadas e coordenadas proporcionais; sem novos loops por quadro ou dependências. Alvo mantém o mesmo botão no DOM e anima somente o desenho interno ao trocar.
- Edge/Chromium em 1440, 390 e 320 px, com inglês em 320 px. Relógio inicial e instruções mostram 3 segundos; tentativa expira e reinicia. 27 posições observadas distintas, inteiramente dentro da área de jogo e abaixo do texto. Três acertos por mouse/toque simulado revelam a insígnia; treino sem prazo permanece jogável após 3 segundos.
- Mira por Espaço/Enter: foco preservado entre alvos, tecla repetida não conta outro acerto, sem rolagem da página. Basquete: foco inicial em Arremessar, cinco lances por teclado, reinício, lance por mouse/toque, manutenção de foco no voo e bloqueio de repetição mesmo depois da aterrissagem. Checkbox e escolhas de direção respondem a Espaço sem arremessar. Escape fecha e devolve foco ao acionador.
- Nenhum erro de JavaScript ou excesso horizontal nos cenários. Diagnóstico em .publish-staging/verify-game-inputs.cjs, ignorado no Git. Viewports e eventos de toque simulados, sem aparelho físico ou Safari.

## Modelo do Going Merry, 9 de outubro de 2026

- Build de produção e TypeScript aprovados. SVG autoral sem novas dependências, imagens externas ou loop de animação. Cenas sob demanda: JS 12,95 KB gzip (antes 12,29 KB), CSS 2,87 KB (antes 2,90 KB); JS principal 103,55 KB. Volume usa gradientes estáticos e contornos.
- Reprodução e revisão visual em Edge/Chromium com larguras de 320, 390, 768 e 1440 px. Figura de proa inteira dentro do viewBox; cabeça e pescoço compartilham um contorno. Chifre, casco e vela revisados também em captura ampliada.
- Distância entre pé do mascote e apoio no convés inferior a 0,002 px nas quatro amostras durante o balanço. Rolagem de 25 px preserva a cena; Escape remove barco e chapéu. Nenhum erro de JavaScript ou excesso horizontal nas verificações.
- Preferência de movimento reduzido: modelo estático visível e encerramento automático conferidos. Capturas e diagnóstico local em .publish-staging/, ignorada no Git. Sem medição de FPS ou teste em aparelho físico/Safari.

## Refinamento das cenas e Sentinel, 9 de outubro de 2026

- TypeScript e build de produção aprovados com npm run build. Sem novas dependências. JS principal: 103,56 KB gzip; CSS principal: 18,65 KB gzip. Cenas sob demanda: 12,29 KB JS / 2,90 KB CSS. Os jogos de basquete e saltos permanecem em seus módulos separados.
- Conferência interativa no navegador Chromium do Codex, em desktop e viewports de 390 × 844 e 320 × 740. São simulações de tamanho, sem certificação em aparelho físico, Safari ou eventos de toque nesta revisão. Os registros anteriores abaixo descrevem verificações de outras versões e não foram todos executados novamente.
- Mira: instrução e 12 segundos antes de iniciar; falha ao deixar o relógio expirar, tanto sem acertos quanto com dois de três; alvo removido e foco transferido à nova tentativa; reinício com 0/3; três acertos antes do prazo revelam a insígnia. Treino sem limite permanece ativo além dos 12 segundos. Operação completa por Enter e retorno do foco à estrela conferidos, incluindo Escape. Textos de instrução, falha e treino livre revisados em PT/EN.
- Going Merry em 390 px: vela, emblema, cabine e proa revisados durante a viagem com o mascote apoiado no convés; nenhum baú no DOM. Michael: moonwalk solo com fedora/luva e nenhum fantasma; alternativa estática com cor rosa corrigida e observada.
- Toddy em 390 px: chegada, patas conectadas e quatro traços visíveis conferidos; captura do ossinho e pose com osso na boca revisadas. Removidas as rotações adicionais dos contêineres das patas; a articulação nativa permanece responsável pelo gesto. Não foi repetido o diagnóstico numérico de geometria das versões anteriores.
- Sentinel: diagrama e apresentação em PT/EN correspondem ao README atual do projeto até M6, consultado no GitHub. O texto registra a demo local, 30.050 eventos sem perda e a meta de latência não atendida; resposta manual e hospedagem permanecem planejadas.
- Encontrado e corrigido excesso horizontal de 10 px no contato em inglês a 320 px. A nova conferência registrou scrollWidth === clientWidth === 305 (15 px reservados à barra de rolagem). O diagrama também recebe colunas e setas menores nessa faixa.
- CI do [PR #1](https://github.com/samuelsce/Portfolio/pull/1): build do GitHub aprovado. A primeira prévia da Cloudflare falhou na etapa de publicação, após build concluído. A simulação local com Wrangler 4.149.0 reproduziu Missing entry-point to Worker script or to assets directory; o projeto também inferia um nome diferente do Worker existente. Adicionado wrangler.jsonc com samuelstudio, assets em ./dist e previews vazio. A mesma simulação passou, leu 30 arquivos e encerrou sem upload; build do GitHub e prévia Workers Builds da Cloudflare aprovados no commit b94391b, com PR sem conflitos. A branch não foi mesclada e não houve publicação em produção.
- Limites: revisão visual e interação manual, sem medição de FPS, teste de leitor de tela ou nova execução de toda a bateria histórica. O tamanho dos pacotes não equivale a desempenho em GPU de celular.

## Articulação e profundidade, versão 1.11.1

- TypeScript e build de produção aprovados. JS principal: 103,25 KB gzip (mais 0,28 KB em relação a 1.10.0); CSS principal: 18,59 KB. Cenas sob demanda: 12,67 KB JS / 2,98 KB CSS. Basquete: 3,95 KB JS / 1,32 KB CSS; saltos: 3,58 KB JS / 0,92 KB CSS. Sem dependências ou mídia externas novas. Os módulos de descoberta permanecem ausentes no carregamento inicial.
- Moonwalk verificado em reprodução natural, sem pausar ou alinhar manualmente as animações, em 320, 390, 768 e 1440 px. Diagnóstico local `verify-moonwalk-rig.cjs`: amostras conferem joelho conectado, tornozelo coincidente com o encaixe do sapato, apoio na ponta durante o deslize, chapéu no grupo da cabeça e ocultação do rosto durante a virada. Desvios de ligação ficam abaixo de 0,25 px nas amostras; apoio varia menos de 0,35 px na horizontal. Rolagem de 9 px preserva a dança. Preparação, passo, virada, pose e reverência capturados e revisados.
- Preferência de movimento reduzido mantém a página inicialmente estática. Após ativação manual, a dança articulada funciona também em 320 e 1440 px. Removidas regras redundantes que paralisavam os gestos CSS mesmo depois de o visitante ligar o movimento. Desativar movimento encerra a cena e restaura o card.
- Revisão final adiciona oclusão do rosto pela silhueta da cabeça: bochechas e olhos não ultrapassam a superfície durante a virada. A máscara faz parte do desenho compartilhado e preserva os encaixes, pivôs e controles.
- Barco e Toddy conferidos em 390 e 1440 px pelo diagnóstico `verify-contact-scenes.cjs`. Pés acompanham o convés com diferença abaixo de 0,01 px; baú fica a menos de 1,1 px de seu apoio. Na corrida, patas e joelhos permanecem ligados (diferença abaixo de 0,5 px nas amostras); apoios alternam sem carregar a sombra com o corpo. Salto preserva sua altura próxima de 9 unidades SVG, captura e descida completas, mordida e saída contínua. Capturas de barco, salto e mordida revisadas.
- Seis descobertas e partidas completas em 390, 768 e 1440 px aprovadas: mesmo mascote emprestado, acessórios, pequenos scrolls, alvos, cinco arremessos para 15 pontos e seis saltos até a cama. Sem excesso horizontal ou erros de execução. Arrasto, passos opostos, joelhos novos, lupa, planetinha, travessuras, retorno ao card, olhar e ausência de corte conferidos de 320 a 1600 px.
- Encerramento e recuperação em 390 px, com CPU limitada em 4×: rolagem pequena e mudança de altura preservam a sequência; menu, aba oculta, saída da área, Escape, troca para inglês, teclado e entrega da posição atual aprovados. Armazenamento bloqueado, movimento reduzido, modo assistido e falha de download continuam operáveis. Acessórios, ações, estado de voo e transformações temporárias limpam ao terminar.
- Cálculos de articulação e trajetórias ocorrem antes da reprodução. Animações nativas compartilham o relógio da cena; não há atualização React, leitura de layout ou novo loop de frame durante a dança e a corrida. Caminhada usa o controlador existente com duas variáveis locais adicionais para os joelhos. Animações canceladas deixam o registro da cena; encerramento cancela tracks e timers restantes.
- Validação em Edge/Chromium com telas, toque e visibilidade simulados. CPU limitada não representa GPU de celular e tamanho do pacote não mede FPS. Sem medição de FPS no Safari ou teste em iPhone/iPad físico. Diagnósticos locais ficam na pasta ignorada `.publish-staging`.

## Apoios, mordida e coreografia, versão 1.10.0

- TypeScript e build de produção aprovados. JS principal permanece em 102,97 KB gzip e CSS principal em 18,54 KB. Novidades sob demanda: cenas 9,29 KB JS / 3,43 KB CSS, janela com basquete 3,95 KB JS / 1,34 KB CSS e saltos 3,58 KB JS / 0,92 KB CSS. Sem dependências, filtros pesados ou mídia externa novos. Arquivo menor não equivale a FPS maior.
- Cenas e dois jogos conferidos em 390, 768 e 1440 px: mesmo mascote reservado, chapéus/luva, rolagem pequena, baú, captura do osso, 15/15 no basquete e 6/6 nos saltos. Capturas revisadas do casco/proa, poses da dança, mordida e mão com bola, incluindo detalhes ampliados. Sem excesso horizontal ou erros de execução.
- Diagnóstico de coreografia em `.publish-staging/verify-choreography-v110.cjs`: sola do pé deslizante plana, calcanhar do apoio elevado e altura dos dedos constante. Após sincronizar a trajetória ao tamanho do personagem, o dedo do apoio permanece praticamente no mesmo ponto durante sua metade do ciclo (diferença menor que 0,01 px no exercício instrumentado de 768 px). Ordem mandíbula/osso/focinho conferida; bola na preparação coincide com o centro da mão, com diferença abaixo de 0,1 px nas amostras. São verificações de geometria, não medição de FPS.
- Saltos aprovados: segurar/soltar, salto cronometrado, quedas, três vidas, reinício, cancelamento de ponteiro, teclado, seis ilhas, recorde, modo tranquilo, pausa por visibilidade simulada e fechamento durante o salto. Marcador confirma a região válida, acomodação mantém os pés na ilha e recuperação retorna a câmera antes de reaparecer. Em 320 px, inglês, movimento reduzido, recorde e falha de download mantêm o jogo e a recuperação da página operáveis.
- Cenas em 390 px com CPU limitada em 4× no Chromium: rolagem e mudança de altura preservam sequência; menu, aba oculta, saída da área, Escape, entrega da posição atual e alvos pelo teclado aprovados. Movimento reduzido com armazenamento bloqueado mantém a cena estática e os saltos assistidos. Desligar/religar movimento, janela do RoomLab pelo teclado, sombra em voo, limpeza de acessórios/ações e retomada do olhar aprovados. A espera pela entrega do personagem cobre também registro do controlador, caminhada e acomodação, com limite de três segundos.
- Animações nativas finitas; trajetórias e amostras de coreografia calculadas antes de reproduzir. Uma leitura de matriz da mão por arremesso, nenhuma atualização React ou leitura de layout por frame nos novos movimentos. Relógios e animações limpam ao fechar; jogos pausam na aba oculta. Diagnósticos complementares: `verify-distributed-secrets.cjs`, `verify-sky-jumps.cjs`, `verify-sky-final.cjs`, `verify-secret-lifecycle.cjs` e `verify-secret-final.cjs`, na pasta local ignorada `.publish-staging`.
- Verificação em Edge/Chromium com telas e toque simulados. CPU limitada não representa GPU de celular. Sem teste em iPhone/iPad físico ou medição de FPS no Safari.

## Acabamento das cenas e saltos entre ilhas, versão 1.9.0

- TypeScript e build de produção aprovados. JS principal: 102,97 KB gzip; CSS principal: 18,54 KB gzip. O acabamento fica sob demanda: cenas 8,15 KB JS / 3,09 KB CSS, janela com basquete 3,37 KB JS / 1,27 KB CSS e saltos 3,32 KB JS / 0,86 KB CSS. Traduções compartilhadas: 1,26 KB gzip. Sem dependências, filtros pesados ou mídia externa novos. Tamanho de arquivo não mede FPS.
- Seis entradas conferidas em 390, 768 e 1440 px, com rolagem pequena e mesmo mascote reservado. Capturas de chegada/baú, moonwalk/giro/reverência, Toddy/captura/aterrissagem e insígnia revisadas. Chapéus e luva ligados ao rig, sombra do barco oculta, sombra do cachorro separada, ossinho capturado antes de mudar para comemoração, acessórios e estados removidos no fim. Sem excesso horizontal ou erros de execução.
- Novo jogo: salto cronometrado por segurar/soltar, acerto, queda, perda das três vidas, reinício, cancelamento de ponteiro, teclado, percurso de seis ilhas, recorde, modo tranquilo, pausa da carga na aba oculta simulada e fechamento durante o salto aprovados. O botão conserva o foco durante as trajetórias. Diagnóstico em `.publish-staging/verify-sky-jumps.cjs`. Basquete completa cinco acertos para 15 pontos; trajetória e stepback iniciam da posição de repouso.
- Em 390 px com CPU limitada em 4× no Chromium: cenas continuam em rolagem pequena e mudança de altura da janela; menu, aba oculta, saída da área, Escape, troca para inglês, descoberta durante navegação e entrega da posição atual do mascote aprovados. Alvos pelo teclado devolvem o foco. Em 320 px, movimento reduzido e armazenamento bloqueado mantêm Toddy estático e seis saltos assistidos operáveis. Módulos ausentes no carregamento inicial; falha de download de cena recuperável.
- Regressões aprovadas: PT/EN de 320 a 1600 px, metadados, persistência e estados dos projetos/bancada; tamanhos responsivos, arrasto, passos opostos, lupa, planetinha, travessuras, retorno ao card e olhar. Nenhum corte de acessórios nos grupos monitorados. Diagnósticos em `.publish-staging/verify-distributed-secrets.cjs`, `verify-secret-lifecycle.cjs`, `verify-secret-final.cjs`, `verify-animation-perf.cjs` e `verify-language.cjs`.
- O novo jogo não tem loop de simulação. Uma animação nativa existe só enquanto se segura o controle; saltos, câmera, queda e acomodação são finitos. Cenas têm prazo limitado e limpam animações/relógios ao sair. Verificação em Edge/Chromium com telas e toque simulados; sem validação em iPhone/iPad físico ou medição de FPS no Safari. A limitação de CPU não limita GPU.

## Descobertas espalhadas pela página, versão 1.8.0

- TypeScript e build de produção aprovados. JS principal: 102,98 KB gzip; CSS principal: 18,54 KB gzip. Cenas separadas: 6,31 KB JS e 2,02 KB CSS gzip; jogos separados: 4,12 KB JS e 1,64 KB CSS gzip; traduções compartilhadas: 1,21 KB JS gzip. Módulos ausentes no carregamento inicial e baixados somente na descoberta correspondente. Sem dependências, mídia ou serviços externos novos. Tamanho de arquivo não representa FPS.
- Diagnóstico de seis entradas em 390, 768 e 1440 px: viagem, noite/ghosts, Toddy/ossinho, alvos, basquete e ponte. O próprio mascote é reservado pelas três cenas; chapéu e luva ligados à cabeça/mão, ossinho entregue ao cachorro, encerramento e remoção dos acessórios conferidos. Rolagem pequena mantém a fase e a sequência. Capturas de cenas e jogos revisadas; sem excesso horizontal, menus de histórias, pratos ou erros de execução.
- Basquete começa ativo, aceita toque na bola, bloqueia novo tiro durante a trajetória e confere cinco bolas com 15 pontos na mira central. Ponte encaixa diretamente por toque, desfaz e completa as 18 casas com sete peças. Alvos conferem três acertos e devolvem o foco antes de remover o último botão.
- Em 390 px, CPU limitada em 4× no Chromium: continuidade da rolagem e da mudança de altura da janela, menu, aba oculta, saída da tela, Escape e entrega do mascote a partir da posição atual aprovados. Descoberta durante a navegação, troca para inglês e alvos pelo teclado conferidos. Simulação não representa um iPhone ou iPad físico, não limita GPU e não mede FPS no Safari.
- Em 320 px, preferência de movimento reduzido e armazenamento bloqueado: Toddy estático com ossinho, sem animações ativas, e ponte completa por toque. Falha de download da cena isolada, com retorno ao portfólio. Diagnósticos em `.publish-staging/verify-distributed-secrets.cjs` e `verify-secret-lifecycle.cjs`.
- Revisão final em `.publish-staging/verify-secret-final.cjs`: janela do RoomLab reconhecida como botão e operada pelo teclado; desativação do movimento restaura a bancada; sombra oculta durante voo/barco; acessórios, estado de voo e gestos removidos ao terminar; olhar volta a acompanhar as variáveis de seu controlador após a despedida do Toddy.
- Regressões existentes aprovadas: PT/EN de 320 a 1600 px, persistência/armazenamento bloqueado, estados dos projetos/bancada; arrasto por toque, passos opostos, lupa, planetinha, travessuras, menu, retorno e olhar; constelação, café, pausa por visibilidade simulada e puzzle. Nenhum corte nos grupos do mascote monitorados. Verificação em Edge/Chromium; sem validação em aparelho físico ou Safari.

## Segredos pessoais e minigames, versão 1.7.0

- TypeScript e build de produção aprovados. JS principal: 102,35 KB gzip, cerca de 0,81 KB acima da versão 1.6.1; CSS principal: 18,41 KB gzip. Coleção pessoal separada: 10,12 KB JS e 2,86 KB CSS gzip, baixados somente na descoberta. Sem dependências ou serviços externos novos. Tamanho de arquivo não representa FPS.
- Diagnóstico funcional em 320, 390, 768 e 1440 px: módulo ausente no carregamento inicial, palavras e cinco toques no nome, sete temas, jogos, recorde, encaixe inválido, solução da ponte, desfazer, alvos, pratos, Escape e retorno de foco. Sem excesso horizontal na janela ou erro de execução. Capturas revisadas para barco, chapéu, dança, ossinho, jogos e botão de fechar acessível durante rolagem interna.
- Basquete confere erro à esquerda, acerto no centro, cinco tentativas e bloqueio de novos tiros durante a trajetória. Ponte solucionada com sete peças e 18 casas; conclusão transfere foco para uma ação habilitada. Insígnia também transfere o foco após os três alvos.
- Em 390 px, CPU limitada em 4× no Chromium: mira real cronometrada, pontuação, pausa da dança e da trajetória por evento de visibilidade simulado, retomada, fechamento durante arremesso, limpeza ao trocar o tema e ponte pelo teclado aprovados. Essa simulação não reproduz o hardware de um iPhone, não limita GPU e não mede FPS no Safari.
- Inglês, preferência de movimento reduzido, partida completa sem animação e armazenamento bloqueado aprovados. Falha de download do módulo isolada com retorno ao portfólio e ao foco de origem. Os arquivos e desenhos têm acesso apenas às histórias autorizadas, sem token, áudio ou mídia de terceiros.
- Diagnósticos existentes de idiomas de 320 a 1600 px e de constelação/café/puzzle/retomada aprovados. Novas evidências em `.publish-staging/verify-personal-secrets.cjs` e `verify-personal-lifecycle.cjs`. Verificação em Edge/Chromium com viewport e toque simulados; sem validação em aparelho físico ou Safari.

## Pausa da cópia escondida, versão 1.6.1

- Build e TypeScript aprovados. JavaScript principal: 101,54 KB gzip; CSS: 18,29 KB gzip.
- Durante a constelação, todas as animações da cópia escondida do card pausam, o movimento do mouse não atualiza o olhar escondido e Escape restaura o card com os controles habilitados. Diagnóstico específico aprovado em `.publish-staging/verify-constellation-pause.cjs`.

## Reprodução automática e descobertas, versão 1.6.0

- TypeScript e build de produção aprovados. JavaScript principal: 101,53 KB gzip; CSS principal: 18,28 KB gzip. Aproximadamente 1 KB adicional de JavaScript comprimido em relação à versão 1.5.0, sem dependências ou consultas externas adicionais.
- Quatro quadros iniciam sem clique, repetem enquanto visíveis e reiniciam ao retornar à área de leitura. Fora da tela não mantêm reprodução nem relógio; pausa por evento de visibilidade simulado e desativação de movimento conferidas. Em cada controlador, as 33 leituras de pontos do LinkWatch acontecem somente na primeira reprodução, incluindo após a repetição automática.
- Verificações funcionais em 390, 768 e 1440 px. Em 390 px, CPU limitada em 4× no Chromium; o exercício não limita GPU, representa hardware específico ou mede FPS no Safari.
- Constelação: três acionamentos pelo teclado, fechamento por Escape e temporizador, restauração de foco/inert e preservação do título. Estrelas, face rosa e xícara contidas nas áreas gráficas em 320, 390, 768 e 1440 px, com capturas revisadas. Idioma não interrompe o segredo; jogo existente, tema escuro e retomada automática aprovados.
- Segredo do café reconhece café/cafe/coffee, termina e mantém uma versão estática com movimento reduzido. Sem emoji ou diálogo visual do personagem. Caminhada, arrasto por toque, lupa, planetinha, travessuras, menu, retorno e olhar aprovados, sem cortes nos grupos gráficos monitorados.
- Layout PT/EN aprovado de 320 a 1920 px, sem excesso horizontal ou erros de execução. Diagnósticos em `.publish-staging/verify-automatic-secrets.cjs`, `.publish-staging/review-new-secrets.cjs`, `review-content-layout.cjs`, `verify-animation-perf.cjs` e `verify-creative-lifecycle.cjs`. Testes em Edge/Chromium com viewport, toque e visibilidade simulados, sem validação em aparelhos físicos ou Safari.

## Movimento e descoberta, versão 1.5.0

- TypeScript e build de produção aprovados. Sem dependências ou consultas externas adicionais. JavaScript principal: 100,53 KB gzip, cerca de 3 KB acima da versão anterior; CSS principal: 18,06 KB gzip. Tamanho de bundle não equivale a FPS.
- Nome operável por teclado, reação à edição, descoberta por três toques, continuidade da gravidade durante a rolagem, seleção de dia e horários, dez partículas limitadas e quatro demonstrações conferidos em 390, 768 e 1440 px. Sequências terminam, cancelam fora da tela e são removidas ao desativar movimento. Sem corte no rosto durante a cambalhota do card, excesso horizontal ou erros de execução.
- Em 390 px, diagnóstico executado com limitação de CPU de 4× pelo protocolo do Chromium. Esse exercício confere respostas e término sob carga simulada; não representa um iPhone, não limita a GPU e não mede FPS no Safari.
- Pausa por evento de visibilidade simulada, troca de idioma durante a descoberta, reprodução com tema escuro e cancelamento ao abrir o puzzle real aprovados. Movimento reduzido mantém os controles de dia e a descoberta estática, desabilitando as reproduções.
- Diagnósticos anteriores de layout PT/EN aprovados em 320, 390, 768, 1024, 1440 e 1920 px; diagnóstico de idioma aprovado entre 320 e 1600 px, incluindo limites de menu, teclado e armazenamento bloqueado. Arrasto por toque, caminhada com passos opostos, lupa, órbita, travessuras, menu, retorno ao card e olhar aprovados, sem corte nos grupos gráficos monitorados.
- Capturas de hero, descoberta, quatro quadros e tema escuro revisadas em celular, tablet e desktop. Verificações em Edge/Chromium com viewports e toque simulados; sem teste em aparelhos físicos ou Safari.
- Novos diagnósticos em `.publish-staging/verify-creative-motion.cjs` e `.publish-staging/verify-creative-lifecycle.cjs`; resultados em `.publish-staging/creative-motion-results.json`. Demais evidências nos diagnósticos existentes `review-content-layout.cjs`, `verify-language.cjs` e `verify-animation-perf.cjs`.

## Duas iniciais do cabeçalho, versão 1.4.2

- TypeScript e build de produção aprovados. As duas iniciais reutilizam o traçado do favicon e compartilham tamanho e alinhamento.
- Diagnóstico PT/EN aprovado de 320 a 1600 px, incluindo os limites de menu e tablet. Sem sobreposição da marca com a navegação ou excesso horizontal; estados e navegação por teclado preservados.
- Captura de desktop revisada em Edge/Chromium simulado.

## Identificação do cabeçalho, versão 1.4.1

- TypeScript e build de produção aprovados. SVG reutiliza o traçado do favicon, sem dependências ou animações adicionais.
- Cabeçalho conferido em PT/EN nas larguras 320, 390, 650, 651, 768, 850, 851, 1024, 1440 e 1600 px. Marca contida e sem sobreposição com menu ou navegação; sem excesso horizontal.
- Capturas de desktop e menu móvel revisadas. Idiomas, estados dos controles, continuidade do mascote, teclado e armazenamento bloqueado aprovados pelo diagnóstico existente `verify-language.cjs`.
- Verificação em Edge/Chromium com viewports simulados; sem teste em aparelhos físicos ou Safari.

## Conteúdo do currículo e Sentinel, versão 1.4.0

- TypeScript e build de produção aprovados. Sem dependências, consultas externas ou loops de animação adicionais.
- Conteúdo profissional atualizado a partir do currículo fornecido. Escopo atual do Sentinel conferido no README público do projeto em 8 de outubro de 2026: API, ingestão e SDK implementados; processamento do worker, detecções e dashboard ainda planejados.
- Quatro projetos e Recette presentes. PT/EN conferidos em 320, 390, 768, 1024, 1440 e 1920 px, sem excesso horizontal ou erros de execução.
- Diagrama do Sentinel contido no quadro nas seis larguras, sem excesso interno de texto. Temas claro/escuro, detalhes expansíveis, descrição acessível e tradução aprovados. Capturas do novo quadro em 390 e 1440 px e da seção Sobre revisadas.
- Troca de idioma conserva os detalhes abertos e o tema do Sentinel, os estados dos demais projetos e a continuidade do mascote. Metadados, persistência, navegação por teclado e fallback com armazenamento bloqueado aprovados.
- Diagnósticos existentes atualizados em `.publish-staging/review-content-layout.cjs` e `.publish-staging/verify-language.cjs`. Edge/Chromium com viewports e toque simulados; sem teste em aparelhos físicos ou Safari.

## Painel e alinhamento de contato, versão 1.3.5

- TypeScript e build de produção aprovados. Sem dependências ou loops de animação adicionais.
- PT/EN conferidos em 320, 390, 768, 1024, 1440 e 1920 px, sem excesso horizontal ou erros de execução.
- Painel ampliado do BarberAg contido no quadro nas seis larguras, com 420 px de largura externa no desktop. Controle de tema escuro/claro aprovado nos dois idiomas.
- Tesoura e despedida do rodapé ausentes no DOM. Contato sem recuo lateral, com título e bloco de texto alinhados pelo topo em duas colunas; empilhamento móvel preservado.
- Capturas do BarberAg e do contato revisadas em 390 e 1440 px. Diagnóstico atualizado em `.publish-staging/review-content-layout.cjs`, em Edge/Chromium com viewports simulados; sem teste em aparelho físico ou Safari.

## Simplificação dos quadros, versão 1.3.4

- TypeScript e build de produção aprovados, sem dependências novas.
- PT/EN conferidos em 320, 390, 768, 1024, 1440 e 1920 px. Janela reta antes e depois da ativação e do reinício; card centralizado e sem excesso horizontal.
- Ausência da estrela pequena adicional, botões de captura, legendas conceituais e imagens de captura confirmada no DOM. Ilustrações revisadas visualmente em 390 e 1440 px; controles de tema e iluminação conservados.
- Traço com largura mínima de 240 px, limite responsivo e maior espessura. Em 390 px, disparo por visibilidade, duração perceptível, repetição ao retornar, pausa, tradução e movimento reduzido aprovados pelo diagnóstico existente.
- Idiomas, persistência, estados dos controles, teclado, armazenamento bloqueado e continuidade do mascote conferidos. Reação de inspeção agora acionada pela abertura dos detalhes do projeto.
- Diagnósticos em `.publish-staging/review-content-layout.cjs`, `.publish-staging/verify-language.cjs` e `.publish-staging/verify-section-stroke.cjs`. Edge/Chromium com viewports simulados; sem teste em aparelhos físicos ou Safari.

## Layout após remoção das legendas, versão 1.3.3

- Build de produção e TypeScript aprovados. PT/EN revisados em 320, 390, 768, 1024, 1440 e 1920 px, sem excesso horizontal ou erros de execução.
- Monograma com Space Grotesk e fonte de 48 px no celular e 57 px nas demais larguras; regra da antiga legenda não atinge mais o símbolo.
- Centro vertical do card alinhado ao centro da bancada, com diferença inferior a 1 px nas larguras medidas. Ausência de título da janela e cursor conferida.
- Interação de dar vida à ideia endireita a janela em todos os tamanhos. Controles, idiomas, persistência, teclado e continuidade do mascote aprovados pelo diagnóstico existente.
- Capturas das seções Projetos, Sobre, GitHub e Contato revisadas em 390 e 1440 px. Diagnósticos em `.publish-staging/review-content-layout.cjs` e `.publish-staging/verify-language.cjs`; verificação em Edge simulado.

## Revisão de conteúdo, versão 1.3.2

- TypeScript e build de produção aprovados. Sem dependências novas ou alteração no controlador do mascote.
- Layout, âncoras, capturas reais e controles conferidos em 320, 390, 768, 1024, 1440 e 1920 px, sem excesso horizontal, imagens ausentes ou erros de execução.
- Troca e persistência de idioma, estado da bancada/projetos, continuidade do mascote, navegação por teclado e armazenamento bloqueado aprovados. PT/EN conferidos de 320 a 1600 px.
- Capturas de desktop e celular revisadas após a retirada dos textos. Instruções do calendário preservadas com `sr-only` e `aria-describedby`.
- Diagnósticos existentes em `.publish-staging/audit-portfolio.cjs` e `.publish-staging/verify-language.cjs`, com expectativas de metadados atualizadas. Verificação em Edge/Chromium simulado, sem teste em aparelho físico.

## Revisão geral e recuperação, versão 1.3.1

Verificação em 7 de outubro de 2026, no Edge, no build de produção servido localmente. Referências e estética anteriores reutilizadas; correções de lógica e estados de falha.

- Revisão em 320, 390, 768, 1024, 1440 e 1920 px com projetos expandidos, capturas reais, inglês e título personalizado de 28 caracteres. Sem excesso horizontal, imagens indisponíveis, âncoras internas inexistentes ou erros de execução. Textos principais entre 17 e 23 px nos estados medidos.
- Caminhada, arrasto por toque, lupa, órbita, retorno e pausa da cópia escondida aprovados; nenhum corte nos grupos gráficos monitorados. Troca de idioma conservou estado, textos personalizados, controles e mascote, com armazenamento bloqueado também verificado.
- Falha simulada no download de cada chunk reproduziu o problema anterior: hero e contatos eram removidos, deixando a aplicação vazia. Após a correção, ambos permanecem presentes, com mensagem traduzida, fechamento do erro do jogo e recarregamento recuperando o calendário.
- Link de pular conteúdo passou a focar `main`; o Tab seguinte chega à ação do hero. Reduzir a janela com EN focado passou a levar o foco ao botão do menu. Vitória do puzzle conserva o foco em “Outro desafio”; Tab seguinte fecha o ciclo dentro da janela.
- Puzzle revalidado em 320, 390, 768, 1024 e 1600 px: solução, vitória, recorde, reinício, outro desafio, tradução, modal, pausa/retomada, falha de API e movimento reduzido aprovados.
- Em larguras de toque de 651, 768, 1024 e 1366 px, botões de idioma com pelo menos 44×44 px, sem sobreposição entre marca e navegação ou excesso horizontal.
- URL canônica e `og:url` conferidos no HTML; robots e sitemap servidos com HTTP 200 e endereço oficial correto. Nenhuma garantia de indexação ou posicionamento em buscadores decorre dessa verificação.
- Diagnósticos em `.publish-staging/audit-portfolio.cjs` e `.publish-staging/audit-edge-cases.cjs`, ignorados no Git. TypeScript e build aprovados; nenhuma dependência ou loop de animação novo.

Testes em viewports e toque simulados em Edge/Chromium. Sem medição de FPS ou teste em aparelhos físicos e Safari.

## Calendário e segredo do planetinha, versão 1.3.0

Verificação em 7 de outubro de 2026, no Edge, no build de produção servido localmente.

- TypeScript e build aprovados, sem dependências novas. Calendário e puzzle em chunks separados: cerca de 4,18 kB e 2,08 kB comprimidos, respectivamente; CSS do jogo cerca de 1,37 kB comprimido.
- Resposta real do serviço público consultada pelo navegador, sem interceptação: 368 dias, 525 contribuições no período, carregamento e jogo aprovados. Captura versionada contém esses dados reais; o calendário exibe semanas completas.
- Em 320, 390, 768, 1024 e 1600 px, testes com essa resposta como fixture verificaram detalhes por dia, setas/Home/End, um único destaque, tradução, ausência de excesso horizontal e uma única consulta por carregamento. A faixa móvel rola horizontalmente dentro do painel para preservar a leitura dos quadrados.
- Nenhum chunk do calendário ou jogo solicitado no hero. Aproximação da seção carrega o calendário; apenas a terceira ativação consecutiva do rostinho solicita o jogo.
- Puzzle solucionado pelas interações reais com os botões nas cinco larguras. Vitória, recorde local, reinício, novo quadro distinto e existência de solução conferidos. Alvos do quadro com pelo menos 44 px; foco por setas e Tab contido na janela.
- Escape e botão de fechamento restauram rolagem, animações, controlador do mascote e foco do botão de descoberta. Português e inglês aprovados; capturas do calendário e da vitória revisadas em 390 e 1600 px.
- Resposta malformada conservou a captura real e ofereceu nova tentativa; resposta válida na tentativa seguinte recuperou o estado. Movimento reduzido conservou o jogo funcional sem as animações curtas. Nenhum erro de execução nas verificações.
- Regressão do mascote aprovada para retorno, inversão, altura da viewport, menu, pausa, visibilidade, ícones e puxada/fechamento do header. Retorno instrumentado manteve zero viagens recriadas, cancelamentos e leituras da posição do personagem.
- Diagnóstico em `.publish-staging/verify-contribution-garden.cjs`, com testes por fixture e modo `--live-data` para consulta real. Ferramentas e capturas de revisão ignoradas no Git.

Viewports e toque simulados em Edge/Chromium, sem teste em iPhone/iPad físico ou Safari. O serviço de contribuições é externo; a captura local é uma alternativa datada, sem simular atividade nova. Não foi feita medição de FPS no dispositivo.

## Entrada perceptível do traço, versão 1.2.2

Verificação em 7 de outubro de 2026, no Edge, no build de produção servido localmente.

- TypeScript e build aprovados, sem dependências novas. Composição final do traço e da estrela preservada; os dois segmentos do caminho SVG foram separados para aparecerem em sequência.
- Em 390, 768, 1600 e 2560 px, título perto do fim da tela (88% da altura) permaneceu sem traço após 1050 ms. Ao entrar nos 60%, espera de leitura observada antes de iniciar o desenho.
- Aos 450 ms de desenho, aproximadamente 75% do caminho principal ainda estava por desenhar; numa amostra posterior, aproximadamente 14% a 18%. Caminho e estrela terminaram no estado completo. Capturas de início e fim revisadas em celular e desktop.
- Sair da faixa de disparo mantendo o título na tela não reiniciou o efeito. Sair completamente e retornar iniciou uma nova sequência; passagem rápida cancelou a espera, sem desenho fora da tela.
- Mudança da altura da viewport de 900 para 650 px conservou o gatilho proporcional à altura. Dois observadores ativos por efeito; zero ao desativar o movimento e dois novamente ao reativar, sem acúmulo.
- Inglês conservou o traço completo durante a troca de texto. Movimento reduzido apresentou traço e estrela estáticos, sem animação. Nenhum erro de execução ou excesso horizontal nas larguras verificadas.
- Diagnóstico em `.publish-staging/verify-section-stroke.cjs` e capturas `stroke-drawing-390.png`, `stroke-complete-390.png`, `stroke-drawing-1600.png` e `stroke-complete-1600.png`, ignorados no Git.

Viewports simulados em Edge/Chromium, sem teste em iPhone/iPad físico ou Safari. Correção de momento, progressão e repetição do efeito existente; pesquisa visual anterior reutilizada.

## Travessuras durante a rolagem, versão 1.2.1

Verificação em 7 de outubro de 2026, no Edge, em desenvolvimento e no build de produção servido localmente.

- TypeScript e build aprovados, sem dependências novas nem alterações em CSS ou desenhos SVG.
- Em 390, 768 e 1600 px, pequenas rolagens durante a aproximação e a observação preservaram o planetinha e a sequência. A aproximação usa um único relógio; os dois extremos da trajetória acompanham o deslocamento do alvo, sem recriar viagens WAAPI por scroll.
- Posição junto ao botão acompanhou uma rolagem de 24 px, com variação inferior a 2 px na distância relativa medida. O botão também tem sua própria animação de toque. Alvo parcialmente encoberto pelo header não encerrou a brincadeira; completamente fora da área visível encerrou e recuperou os controles, sem classes temporárias.
- Rolagem por eventos reais de toque do CDP em 390 px deslocou a página e manteve a travessura. Seleção humana por toque preservou o estado escolhido; abrir o menu interrompeu e restaurou os efeitos antes da espera.
- Sequência completa, do planejamento à cutucada e ao resfriamento, concluída nos três tamanhos sob rolagens alternadas de 7 px a cada 80 ms. Ao recuperar a observação, controles restaurados, planetinha desligado e nenhum efeito temporário.
- Reentrada do hero com o alvo da bancada ainda visível não antecipou a chegada ao card. Retorno e entrega ao personagem original concluíram após a travessura.
- Na amostra estacionária de 120 ms durante a observação do botão, zero leituras de posição do mascote ou dos alvos nos três tamanhos. O olhar agora reutiliza a geometria e atualiza durante deslocamentos e eventos, sem um loop permanente de consulta ao alvo.
- Regressões de retorno, inversão, altura da viewport, menu, pausa, visibilidade, ícones SVG e puxada/fechamento aprovadas. Retorno instrumentado manteve zero viagens recriadas, cancelamentos ou leituras da posição do mascote.
- Caminhada com passos em oposição, lupa, planetinha e restauração conferidos; nenhum corte dos grupos SVG monitorados ou erro de execução. Larguras de 320 a 1600 px sem excesso horizontal.
- Script de diagnóstico em `.publish-staging/verify-prank-scroll.cjs`, ignorado no Git junto às demais ferramentas locais de verificação.

Viewports e toque simulados em Edge/Chromium. Sem medição de FPS ou teste em iPhone/iPad físico ou Safari.

## Toque e acabamento, versão 1.2.0

Verificação em 7 de outubro de 2026, no Edge, em desenvolvimento e no build servido localmente.

- TypeScript e build aprovados. Nenhuma dependência nova; efeitos curtos em CSS e SVG, sem adicionar um loop de rolagem.
- Reação de idioma conferida no card, no personagem flutuante e durante a saída do card. Selecionar o idioma já ativo não inicia uma reação; com menu aberto, o personagem espera o fechamento.
- Toque na ação da bancada conferido com o foco retirado explicitamente do botão, reproduzindo a condição que impedia o alinhamento. Quadro reto após o fim da comemoração; toque externo restaura a inclinação. Escape e reset encerram o estado ativo.
- Mascote de 96 px em larguras de toque de 768, 1024, 1194 e 1366 px, sem colisão com marca ou navegação; tamanho de 60 px preservado no celular de 390 px. Pouso abaixo do header com 104 px aprovado em 651 px. Retorno ao card aprovado em todos esses tamanhos.
- Traço dos projetos conferido até o estado final; voltar ao topo e entrar novamente não alterou o atributo de entrada. O observador se desconecta após a primeira entrada.
- Movimento reduzido mantém controles funcionais e traço estático visível. Rodapé conferido sem a frase removida, em PT e EN.
- Tradução, persistência, preservação de estados, teclado e armazenamento bloqueado revalidados. Ambos os idiomas sem rolagem horizontal de 320 a 1600 px.
- Regressão de retorno, inversão, resize, menu, pausa, aba oculta e puxada/fechamento aprovada. Na sequência instrumentada do retorno, zero viagens WAAPI recriadas, zero cancelamentos e zero leituras da posição do mascote.
- Caminhada com pernas em oposição, lupa, planetinha, restauração das travessuras e limites dos grupos gráficos aprovados; zero cortes detectados nos grupos monitorados e zero erros de execução.
- Capturas em `.publish-staging/polish-tablet-768.png`, `polish-tablet-1024.png`, `polish-tablet-card.png`, `polish-language-reaction.png` e `polish-stroke.png`, ignoradas no Git.

Testes em viewports e toque simulados, sem acesso a um iPad/iPhone físico ou Safari. A área de pintura continua delimitada; o maior tamanho em tablet é intencional e não representa uma medição de FPS no dispositivo.

## Português e inglês, versão 1.1.0

Verificação em 7 de outubro de 2026, no Edge, em desenvolvimento e no build de produção servido localmente.

- `npm run check` e `npm run build` aprovados.
- PT/EN verificados na apresentação, projetos, Recette, ilustrações, bancada, rodapé e descrições de acessibilidade. Nome, tecnologias, URLs e capturas reais permanecem como nos projetos de origem.
- Preferência preservada após recarregar; seletor continua funcionando quando o navegador bloqueia leituras e escritas de `localStorage`.
- Idioma do documento, título, descrição e metadados Open Graph conferidos nos dois idiomas. O HTML estático inicial continua em português; a aplicação atualiza os metadados no navegador.
- Troca de idioma preservou tema, formato, arredondamento, título personalizado, iluminação, captura selecionada e detalhes abertos. Reset e título padrão usam o idioma ativo.
- Mascote e âncora mantiveram os mesmos nós DOM durante a troca, sem reiniciar a fase de observação. Regressão de retorno, inversão de direção, altura da viewport, menu, pausa, visibilidade e puxada/fechamento do header aprovada.
- Ambos os idiomas sem rolagem horizontal em 320, 390, 650, 651, 768, 1024, 1440 e 1600 px. Seletor disponível no menu móvel com alvos de toque de 44 px.
- Seleção por teclado e fechamento do menu com Escape e retorno de foco aprovados. Nenhum erro de execução nos testes.
- Capturas de revisão em `.publish-staging/language-desktop.png`, `language-mobile.png` e `language-mobile-menu.png` (arquivos locais ignorados no Git).

Os testes usam navegador desktop e viewports simulados; não representam validação em iPhone físico/Safari.

## Validação da primeira versão

Verificação local em 6 de outubro de 2026, após implementação e ajustes visuais.

- `npm run build`: TypeScript e build Vite aprovados.
- Instalação de dependências: auditoria npm com zero vulnerabilidades relatadas.
- Inspeção visual em Chromium: desktop 1280 × 720, tablet 768 × 1024 e mobile 390 × 844; limite adicional de 320 × 740.
- Largura do documento comparada ao `clientWidth`, sem rolagem horizontal nos tamanhos conferidos. Um excesso no título em 320 px foi corrigido e revalidado.
- Bancada: mudança card/cartaz, tema, título, slider via teclado, feedback, reset e ativação do botão com Enter verificados.
- Menu mobile: abertura, navegação por link, fechamento e Escape com retorno de foco verificados.
- Link de pular conteúdo: navegação para `#conteudo` via Enter verificada. Todas as âncoras internas correspondem a IDs existentes.
- Projetos: detalhes expansíveis e carregamento das duas capturas reais verificados.
- Contato: destino `mailto:` correto, LinkedIn e GitHub conferidos nos dados; copiar e-mail exibiu confirmação de sucesso.
- Contraste calculado para os textos de corpo, chrome e texto secundário principal. Cor de rodapé e valor do slider ajustadas.
- Versão compilada em http://127.0.0.1:4173: página, projetos, tema, reset e captura real verificados. A prévia de desenvolvimento emitiu posteriormente um erro de conexão HMR na sessão do navegador; esse recurso não está presente no build estático utilizado na entrega.

Capturas de revisão em `artifacts/portfolio-desktop.jpg`, `artifacts/portfolio-mobile.jpg` e `artifacts/portfolio-page.jpg` (arquivos locais ignorados no Git).

## Limites

Viewport simulado não certifica dispositivos físicos ou todos os navegadores. Movimento reduzido foi implementado em CSS, sem alterar preferências do sistema do usuário. Não foram enviados e-mails, feitas ações nos projetos, publicados arquivos ou enviados commits ao remoto. BarberAg tem repositório privado e não oferece um link de código no portfólio.

## Revisão de legibilidade e movimento

- Frase acima do nome removida; título e metadados agora usam separador `|`, sem travessões.
- Texto principal aumentado para 17 px, informações secundárias e links para 14 px ou mais. Layouts de tablet passaram a usar uma coluna onde a leitura ficaria apertada.
- Nesta revisão, a ilustração do RoomLab foi substituída pela captura real. A revisão seguinte restaura a ilustração corrigida conforme o pedido do usuário.
- BarberAg atualizado com tecnologias fornecidas pelo usuário. A lista principal destaca Next.js 16, React 19, TypeScript, Tailwind CSS 4 e Base UI; detalhes citam estado, integração e exportação de relatórios.
- Na investigação inicial, o navegador informou `prefers-reduced-motion: reduce`, explicando a ausência de animações. Em uma leitura após reload, a preferência estava desativada. O site usa a preferência detectada no carregamento e oferece escolha explícita para a página, sem mudar o sistema.
- Controle de animações verificado: entrada da bancada de 0,9 s, feedback de clique de 1 s e suspensão completa das animações/transições ao desligar.
- Revisão mobile em 320 e 390 px confirmou textos maiores, imagem carregada, menu funcional e ausência de rolagem horizontal.

## Refinamento de animações e restauração do quarto

Verificação em 7 de outubro de 2026, reutilizando a pesquisa visual do planejamento.

- `npm run check` e `npm run build` aprovados.
- RoomLab voltou a abrir com a ilustração. Mesa, teclado, monitor, cadeira e armário usam uma projeção isométrica comum; os objetos ocupam áreas separadas.
- Iluminação natural/noturna verificada visualmente. Controle com `role="switch"` e estado `aria-checked` correto.
- Alternância ilustração/captura real verificada; imagem carregada e link para ampliar presente somente na captura. Legenda e controles separados em 320 px.
- Feedback da bancada verificado com cliques consecutivos: `idea-bounce` de 650 ms e `spark-turn` de 750 ms. Desativar movimento resultou em `animation-name: none` e transições de 0 s.
- Detalhes do RoomLab abrem com `aria-hidden="false"` e sem `inert`; fechados têm altura zero e ficam fora da interação.
- Palco manteve 430 px entre formatos. Título longo no cartaz em 320 px permaneceu dentro do palco.
- Navegação fixa em 390 px: âncora Projetos posicionada abaixo do cabeçalho, menu fechado após seleção.
- Inspeção visual em 320 × 740, 390 × 844, 768 × 1024 e 1280 × 800, sem rolagem horizontal nas larguras verificadas.
- Evidência local: `artifacts/roomlab-ilustracao-corrigida.jpg`.

## Quadros, capturas e temas dos projetos

- Corrigida a ordem de desenho do SVG: o criado-mudo agora cobre a parte da perna da mesa que fica atrás dele.
- Removido o link Ampliar captura. Imagens usam `object-fit: cover` e preenchem toda a moldura, com recorte conforme a proporção disponível.
- Captura do LinkWatch substituída pela página inicial enviada pelo usuário. BarberAg recebeu captura da página inicial pública, sem o aviso de cookies e sem autenticação.
- Modos escuros independentes nas ilustrações BarberAg e LinkWatch, com estado acessível no switch. A escolha é mantida ao alternar para a captura e voltar.
- Camadas de ilustração/captura alternam com transições de 320 ms e 420 ms; a camada inativa usa `aria-hidden` e `inert`. O controle global de movimento suspende as transições.
- Build e TypeScript aprovados. Imagens carregadas e quadros revisados visualmente no desktop e em 320 px, sem rolagem horizontal. A agenda do BarberAg recebeu espaço adicional no mobile para separar o desenho dos controles.

## Ajustes pontuais da captura e da lua

- Captura do BarberAg refeita incluindo apenas a largura útil da página (1265 px), sem os 15 px ocupados pela barra de rolagem. Imagem carregada com a nova largura e conferida na prévia.
- Lua reposicionada dentro da janela do RoomLab e desenhada como crescente, sem tocar a moldura. Luz noturna conferida visualmente.
- Build e TypeScript aprovados. Evidências em `artifacts/barberag-sem-scroll.jpg` e `artifacts/roomlab-lua-corrigida.jpg`.

## Mascote reativo e Recette

- Nova leitura da skill frontend-design-references e da complementar frontend-design. Exemplo Eye tracker do Bencho inspecionado na página individual e na demonstração.
- `npm run check` e `npm run build` aprovados, sem dependências novas.
- Mouse em posições distintas na bancada alterou o olhar para direções opostas; os valores de deslocamento foram conferidos no navegador. A atualização usa CSS e `requestAnimationFrame`.
- Enter no botão acionou `mascot-wink` e `mascot-grin`, com duração de 800 ms. O retorno textual acessível continua disponível.
- Desativar movimento retornou o olhar a `0px 0px`, com `animation-name: none` e transições de 0 s. Recomeçar também restaura o olhar.
- Recette incluído como bloco compacto de TCC após os projetos principais, com link público, contexto de equipe e participação específica do autor.
- Inspeção visual em desktop 1280 × 900 e mobile 320 × 740; bloco do TCC legível e sem rolagem horizontal. Viewports simulados não certificam dispositivos físicos.

## Cabeçalho que se estica

- `npm run check` e `npm run build` aprovados, sem dependências novas.
- Verificado em 1920 × 935: superfície cobre a largura útil de 1905 px sobre o rosa, enquanto o conteúdo da navegação permanece com 1440 px. A borda direita dos links manteve 1616,5 px antes e depois da expansão.
- Rolagem manual: expansão inicia antes da seção; ao cruzar o cabeçalho, o recorte é zero e a cobertura é completa. O cabeçalho recebeu sua própria camada de composição para permanecer visível durante a rolagem.
- Retorno a Projetos remove o personagem; uma nova entrada em Sobre mim reinicia a puxada. Depois da ação o personagem tem opacidade zero. Navegação também acionada com Enter.
- Movimento desativado: personagem ausente, transições de 0 s, cobertura completa preservada.
- Mobile 320 × 740: sem rolagem horizontal, personagem oculto, menu funcional, Escape fecha o menu e devolve foco ao botão. Âncora Sobre mim posicionada a 100 px, abaixo do cabeçalho de 84 px.
- Evidências: `artifacts/header-puxadinha.jpg` e `artifacts/header-sem-laterais.jpg`. São quadros estáticos de uma interação verificada no navegador.

## Mascote da página

- Build com TypeScript aprovado, sem novas dependências. Personagem e coreografia próprios, com a pesquisa da skill reutilizada.
- Saída manual do hero verificada: `departing`, animação `mascot-takeoff`, original com opacidade zero; chegada em `observing`. Retorno ao início terminou em `docked`, original com opacidade um e camada flutuante oculta.
- Troca para Cartaz e celebração recriam o nó da ilustração. Nova saída e retorno funcionaram, recuperando a cor branca do personagem nesse formato.
- Reversão rápida entre início e projetos cancelou o retorno e terminou em observação, mantendo um único personagem visível.
- Clique no tema do BarberAg produziu `curious` e `mascot-nod`. Clique no personagem produziu `wave`, `mascot-wave` e `mascot-hello-wink`; Enter também aciona o controle. Olhar para um controle à esquerda resultou em deslocamento negativo dos olhos.
- Aproximação manual da seção rosa: `climbing` antes da expansão, depois `pulling`, pegada e esforço visíveis. Expansão de 780 ms coordenada com o personagem. Na largura útil de 1905 px, personagem permaneceu dentro da tela e `scrollWidth` permaneceu 1905 px.
- Pousos conferidos em 1920 × 935, 1280 × 800, 768 × 1024 e 320 × 740. Em 1280 px, camada do personagem iniciou em 1215 px, além da borda de conteúdo em 1209 px. Em 320 px, personagem ocupou 136,25–196,25 px; marca terminou em 122,47 px e menu começou em 210,03 px.
- Menu mobile aberto oculta o personagem; Escape restaura sua visibilidade e devolve foco ao menu. Seção rosa e navegação conferidas no celular, sem rolagem horizontal.
- Desativar movimento durante uma viagem cancelou a camada flutuante, recuperou a ilustração original e manteve cobertura total do header com transição de 0 s.
- Evidências estáticas da interação: `artifacts/mascote-acenando.jpg`, `artifacts/mascote-puxando-header.jpg` e `artifacts/mascote-mobile.jpg`. Viewports simuladas em Chromium, sem certificação de dispositivos físicos ou outros navegadores.

## Interações físicas e expressões sem fala

Esta revisão substitui o balão de aceno e o antigo comportamento de Enter. O mascote não tem textos visíveis, mensagens de fala ou áudio. Enter agora pega/solta; clique curto fora do card acena.

- TypeScript e build de produção aprovados. Sem dependências adicionais.
- Pegada no card por teclado: `held`, original com opacidade zero, foco no controle flutuante. Segurar produziu `furious`, marca de irritação com opacidade um e sobrancelha esquerda inclinada em 24 graus. Inspeção visual confirmou expressão, membros e ausência de balão.
- Setas alteraram a posição durante a pegada. Escape iniciou a devolução e terminou em `docked`, com original recuperado. Saída posterior do hero terminou em `observing` na margem.
- Arrasto real pelo navegador entre a margem e o quadro do BarberAg terminou em `released`, seguido de retorno ao pouso seguro. Clique curto produziu `wave` e `mascot-wave`. Soltar uma pegada prolongada produziu `grumpy` e `mascot-stomp`.
- BarberAg escuro: `night`; claro: `dazzled` e `mascot-squint`. Captura real: `inspect` e `mascot-lens`, com lupa visualmente conferida. RoomLab noturno: `night` e `mascot-night-orbit`.
- Navegação à seção rosa manteve `expanded=true` e `clip-path: inset(0px)`; largura útil e `scrollWidth` foram 1585 px. A lógica de puxada foi preservada.
- Em 320 × 740, personagem com largura 60 px no intervalo 136,25–196,25 px, entre marca e menu. Largura útil e `scrollWidth` de 305 px. Pegada prolongada funciona pela alternativa de teclado. Abrir o menu durante a pegada cancelou o gesto e ocultou a camada; Escape restaurou a observação.
- Desativar animações durante uma pegada brava terminou com movimento `off`, estado `docked`, temperamento limpo, camada oculta e original com opacidade um. Sem rolagem horizontal.
- Nenhum erro ou aviso registrado no console do navegador durante as interações verificadas.
- Evidências: `artifacts/mascote-bravo.jpg`, `artifacts/mascote-bravo-projetos.jpg`, `artifacts/mascote-examinando.jpg` e `artifacts/mascote-interativo-mobile.jpg`. São capturas estáticas. Gestos de mouse e alternativa por teclado verificados em Chromium; toque está implementado por Pointer Events, sem teste em aparelho físico.

## Caminhada, planetinha e header reversível

- Build de produção e TypeScript aprovados, sem bibliotecas novas. A soltura agora pousa em 360 ms e retorna andando; a versão anterior de retorno por arco foi substituída para esse gesto.
- Arrasto real da margem para o BarberAg: estado `walking`, `mascot-walk-leg` nas pernas e `mascot-walk-bob` no corpo. Posição intermediária e passos conferidos visualmente, seguidos do retorno ao pouso.
- Pegada prolongada: `planet=on`, expressão furiosa e animação `mascot-orbit`. Soltura passou por caminhada, `charging` e `pranking`.
- Travessura no BarberAg: tema claro foi trocado para escuro pelo personagem e voltou ao claro automaticamente. Após o fim, `planet=off`, observação e nenhuma classe temporária no documento.
- Cutucada conferida: `phase=pranking`, `action=poke`, quadro marcado temporariamente como `mascot-teased` e camada ativa com `mascot-element-wiggle`. Evidência adicional: `artifacts/planetinha-cutucando-projeto.jpg`.
- Intervenção por clique imediato no botão em movimento: atributo passou de `false` para `true` conforme a ação humana; sequência foi interrompida, personagem iniciou retorno andando, planetinha desligou e classes temporárias foram removidas. Cliques por automação que aguardam estabilidade podem ocorrer depois da restauração; o teste da interrupção utilizou entrada imediata no botão observado.
- Desktop 1600 × 900: entrada na seção produziu `pulling`, pegada visível, `mascot-two-tugs` e `header.action=pull`. Saída produziu `pushing`, `mascot-header-push`, `header.action=push`, expansão falsa e transição de 0,9 s. Ao terminar, recorte voltou a `max(0px, 50% - 720px)`; largura útil e `scrollWidth` permaneceram 1585 px.
- Mobile 320 × 740: navegação repetida entre Projetos e Sobre mim manteve observação e `header.action=idle`, sem puxada ou empurrão. Fundo com recorte zero e sem rolagem horizontal (largura útil e `scrollWidth` de 305 px).
- Desativar movimento durante o retorno: `docked`, `planet=off`, original com opacidade um, camada flutuante oculta e nenhuma classe temporária. Console sem erros ou avisos durante a verificação.
- Evidências estáticas: `artifacts/mascote-caminhando.jpg`, `artifacts/mascote-planetinha-travessura.jpg`, `artifacts/mascote-puxada-refinada.jpg`, `artifacts/mascote-empurrando-header.jpg` e `artifacts/mobile-sem-puxada.jpg`. Testes em Chromium com viewports simuladas, sem certificação de dispositivo físico.

## Volume e continuidade do personagem

Esta revisão substitui o desenho de palitos, a caminhada periódica e a aura de anéis giratórios descritos anteriormente.

- Build de produção aprovado com 42 módulos. Sem dependências novas. Card e mascote externo usam o mesmo SVG, com luz localizada, sombreado, membros espessos, mãos e sapatos.
- Arrasto real da margem para o conteúdo: `released → walking`. Passos derivados do deslocamento conferidos em oposição (10,225 e -10,225 graus); sombra sem animação periódica, origem `56px 113px` e escala próxima de um. A chegada desacelera e reduz a amplitude dos passos.
- Soltura seguida imediatamente de navegação ao início: caminho recalculado a partir da posição da soltura, `walking → returning → docked`, original recuperado apenas na chegada. Posição final do rosto coincide com o card. Não há troca prematura na acomodação.
- Lupa conferida visualmente: cabo e dedos no mesmo rig do braço, origem no ombro `88px 57px`. Retirada de 2000 ms completa antes de encerrar a reação.
- Pegada prolongada e soltura passaram por `held`, expressão furiosa, `planet=on`, `charging` e `pranking`. Faixa orbital dividida em metades atrás e à frente do corpo; foco por teclado aparece como linha sob os pés, separado da órbita. Ao terminar a sequência, `planet=off` e nenhuma classe temporária.
- Menu em 390 × 844: `yielding → waiting → reappearing → observing`. Scroll permaneceu em 1857 px ao abrir e fechar; largura útil e `scrollWidth` iguais a 375 px. Header fixo conserva a posição do conteúdo.
- Em 320 × 740: largura útil e `scrollWidth` iguais a 305 px. Abrir e fechar rapidamente o menu durante uma pegada cancelou o gesto, limpou temperamento e planetinha e voltou à observação. Coreografia do header inativa no celular.
- Em 1600 × 900: `pulling` com `action=pull`, depois retorno ao início com `pushing`, `action=push` e `expanded=false`; conclusão em `docked`. O recorte do cabeçalho voltou à largura original.
- Um erro encontrado no teste de movimento desativado foi corrigido: fora do hero, a regra de chegada não deve iniciar uma devolução invisível. Após a correção, movimento `off`, fase `docked`, camada oculta, original com opacidade um e `away=false`.
- Evidências finais: `artifacts/mascote-refinado-lupa.jpg`, `artifacts/mascote-refinado-planetinha.jpg`, `artifacts/mascote-refinado-mobile.jpg`. Capturas estáticas; movimentos verificados por interação no Chromium com viewports simuladas.
- Console sem erros ou avisos no build final durante a verificação.

## Expressão do planetinha e sequência de travessuras

- TypeScript e build de produção aprovados, com 42 módulos e nenhuma dependência nova. Verificação no build servido em `127.0.0.1:4173`.
- Desktop em 1920 × 895: pegada prolongada e soltura passaram por `charging → scheming → pranking`. O toque trocou o BarberAg para escuro, a observação manteve os dentes com opacidade um, o gesto de desfazer recuperou `aria-checked=false` e a cutucada marcou temporariamente a ilustração. Ao entrar em `cooling`, nenhuma classe temporária permaneceu.
- Corrigida uma interrupção encontrada no teste: o filtro de ilustrações exigia mais de 65 px visíveis e estava sendo aplicado também a botões de 34–36 px. A aproximação agora usa a checagem específica de botão inteiramente visível.
- Clique direto no botão observado, sem rolagem automática da ferramenta: captura real passou de `aria-pressed=false` para `true` conforme a escolha humana. Sequência cancelada, planetinha desligado, retorno andando e nenhuma classe temporária. A entrada humana preservou o estado escolhido.
- Em 390 × 844, mesma sequência até a observação da troca de tema. Abrir o menu restaurou o tema claro, limpou as classes, desligou o planetinha e produziu `waiting`. Fechar terminou em `observing`. Largura útil e `scrollWidth` iguais a 375 px. Viewport temporária restaurada após a verificação.
- Desativar animações terminou em `motion=off`, `docked`, `planet=off` e zero efeitos temporários. Console sem erros ou avisos.
- Evidências: `artifacts/planetinha-bolado.png`, `artifacts/planetinha-cutucada-fluida.png` e `artifacts/planetinha-mobile.png`. São capturas estáticas; movimentos e mudanças de estado verificados por interação em Chromium. Sem teste em aparelho físico.

## Momento da puxada e do fechamento

- TypeScript e build de produção aprovados. No desktop, o gatilho usa o cruzamento da seção rosa pelo meio do header, com tolerância de 6 px para evitar oscilações na borda. Substitui a antecipação de 460–580 px.
- A cobertura automática deixa de controlar a largura no desktop com animações habilitadas: assim ela não preenche o header antes da puxada nem anula o fechamento. A cobertura imediata permanece nas telas estreitas e no movimento reduzido.
- Chromium em 1920 × 895: seção rosa a 112,27 px, header com altura de 96 px, estado `idle`, expansão falsa e recorte original. Nenhuma puxada antecipada no branco.
- Após rolar até a seção rosa em -1,73 px: `pulling`, `action=pull`, expansão verdadeira e transição de 1 s. Ao concluir, recorte zero.
- Ao subir até a borda rosa em 55,27 px: `pushing`, `action=push`, expansão falsa e transição de 0,9 s. A borda rosa continuou atrás da parte inferior do header durante o gesto; ao concluir, recorte original recuperado.
- Evidências: `artifacts/header-puxada-no-rosa.png` e `artifacts/header-fechando-no-rosa.png`.

## Revisão final do portfólio inteiro

- Revisados hero e bancada, BarberAg, RoomLab, LinkWatch, bloco acadêmico do Recette, sobre, contato e rodapé. Pesquisa visual reutilizada, sem alteração da identidade aprovada.
- TypeScript e build final aprovados: 42 módulos; JavaScript 282,23 kB (87,85 kB gzip), CSS 76,63 kB (15,30 kB gzip). Sem dependências novas. Console do Chromium sem erros ou avisos durante a revisão.
- Matriz de largura: 320, 390, 650, 768, 1024 e 1440 px, mais desktop nativo em 1920 px. Nas seis larguras simuladas, `scrollWidth` igual à largura útil: 305, 375, 635, 753, 1009 e 1425 px. Nenhum dos shells, quadros de projeto, blocos de texto, bancada ou navegação ultrapassou a largura útil. Texto principal dos projetos em 17 px em todas as larguras.
- Mobile: controles de formato, tema, captura, detalhes, reset e movimento com altura de 44 px. Campo da bancada em 16 px. Header fechado com altura de 84 px, correspondente à reserva do layout. Bancada com cartaz e texto longo permaneceu dentro do palco e sem overflow horizontal.
- Menu: Escape fechou e devolveu o foco a `.menu-toggle`; clique fora fechou. Ao passar pela largura de 1024 px e voltar a 390 px, menu permaneceu fechado. A checagem utiliza o valor do evento de mudança do breakpoint.
- Projetos: detalhes dos três expandiram; capturas reais carregadas com largura natural não nula e `object-fit: cover`; legenda uniforme `Interface real do projeto`. Temas escuros e RoomLab noturno ativaram seus respectivos estados. Ilustrações restauradas após a conferência.
- Copiar e-mail produziu `Copiado!` e o status `Contato copiado para a área de transferência.`. Links e contatos conferidos no DOM, sem acessar contas, enviar mensagens ou publicar.
- Lupa revisada visualmente no celular e desktop: rig com origem no ombro `88px 57px`, objeto e dedos no mesmo grupo, braço convencional oculto durante a reação. Órbita e postura continuam no grupo do corpo. Não foi necessário adicionar mais objetos ou travessuras.
- Arrasto real seguido de retorno rápido ao início terminou em `docked`, original com opacidade um e `away=false`. Sombra com origem `56px 113px` e sem animação periódica independente. Planetinha chegou a `pranking/watch` com dentes de opacidade um e controle temporariamente trocado; interrupção recuperou a caminhada e limpou os efeitos.
- Puxada e fechamento reconferidos no build final: rosa em -1,73 px durante `pulling`, pegada com opacidade um; rosa em 55,27 px durante `pushing`. Expansão verdadeira/falsa acompanhou o gesto.
- Pausar terminou em movimento `off`, `docked`, `planet=off`, original com opacidade um, `away=false` e zero classes temporárias. Suspensão por visibilidade implementada e revisada no controlador: cancela callbacks e viagens, restaura controles e mede novamente antes de retomar a posição.
- Contraste calculado para os textos principais: `#796471` sobre papel, 5,15:1; sobre a seção rosa, 4,53:1; tinta sobre papel, 15,62:1; berry sobre papel, 10,91:1. Não substitui auditoria automática de todos os estados.
- Evidências: `artifacts/revisao-final-desktop.png`, `artifacts/revisao-final-lupa-mobile.png`, `artifacts/revisao-final-desktop-lupa.png`, `artifacts/revisao-final-planetinha.png` e `artifacts/revisao-final-mobile-contato.png`. Capturas estáticas e testes em Chromium com viewports simuladas; sem certificação de aparelho físico, Safari ou Firefox.
- Guia de hospedagem em `PUBLICAR.md`, com fontes oficiais de Vercel, Cloudflare Pages e Vite/GitHub Pages. Nenhum envio ao remoto ou deploy realizado nesta revisão.

## Correção de retorno e ícones no celular (1.0.1)

Verificação em 7 de outubro de 2026, após relato de travamento no iPhone 13. A identidade visual aprovada foi preservada.

- Instrumentação da sequência de subida em Edge com viewport 390 × 844: antes da correção, 136 viagens criadas, 136 cancelamentos e 135 leituras da posição do mascote durante o retorno. Depois, zero nos três contadores. O retorno agora usa um único relógio, seguindo a posição atualizada do card e entregando o personagem original apenas na chegada.
- Regressões verificadas: inverter a direção durante o retorno, alterar apenas a altura da viewport, abrir e fechar o menu no meio da viagem, desativar animações durante a viagem e reativá-las. Todos terminaram no estado esperado, sem erros de JavaScript. Alterar a altura da viewport simula uma mudança geométrica; não reproduz a interface nativa do Safari.
- Desktop 1600 × 900: puxada e fechamento do header atravessaram `pulling` e `pushing`, com retorno final ao card.
- Símbolos decorativos dos controles substituídos por SVGs com `currentColor` e `aria-hidden`. Tema da bancada alterou o switch corretamente. Ícones da bancada conferidos visualmente nas capturas mobile e desktop.
- `npm run check` e `npm run build` aprovados. Evidências e script de diagnóstico ficam em `.publish-staging/`, ignorada no Git.
- Teste em Edge/Chromium com viewport mobile simulada. Sem medição de FPS ou validação em iPhone físico/Safari. Os contadores demonstram a remoção dos reinícios, sem certificar desempenho em todos os dispositivos.

## Custo de animação e rolagem (1.0.2)

- Cache da geometria fixa invalidado por `ResizeObserver` nos elementos pertinentes e por resize da janela. Card e seção rosa continuam medidos para acompanhar a rolagem, os gatilhos e a chegada ao card.
- Sequência instrumentada de rolagem de 2,4 s no Edge, viewport 390 × 844 e CPU limitada a 4×: 4.296 → 1.074 chamadas de `getBoundingClientRect`, 537 → 0 leituras do mascote e 1.611 → 0 escritas de olhar durante observação sem novo alvo. Valores representam a sequência testada; cache não suprime atualizações necessárias em viagens, foco ou interações.
- Animações ativas observadas nessa sequência: cinco → três. Os dois piscares da cópia escondida pausam; respiração e olhos do personagem visível continuam ativos. O SVG do card também pausa fora da viewport, com margem de antecipação de 80 px.
- Variáveis de membros e olhar movidas para os grupos que as consomem, com prevenção de valores repetidos. Memoização evita refazer os SVGs e os projetos em mudanças de estado alheias; seus próprios controles continuam atualizando normalmente.
- Pintura delimitada em área local de 176 × 190 px para o SVG de 112 × 126 px. Margem de 32 px mantém braços, lupa, vapor e órbita. ViewBox, material, gestos, durações e área de toque preservados. Posição e largura do SVG conferidas contra o elemento flutuante.
- Arrasto por eventos de toque do CDP verificou caminhada com rotações opostas (-7,69° e +7,69° na amostra), planetinha e travessura. Menu interrompeu a sequência e recuperou a observação; retorno ao início terminou em `docked`. Olhar do card respondeu para lados opostos com mouse.
- Grupos SVG visíveis monitorados a cada 80 ms durante lupa, arrasto, caminhada, planetinha, travessura e menu: zero extrapolações da área de pintura. Evidências em `.publish-staging/perf-lupa-mobile.png`, `perf-caminhada-mobile.png` e `perf-planetinha-mobile.png` (ignoradas no Git).
- Larguras de 320, 390, 650, 768, 1024 e 1600 px sem excesso horizontal. Retorno, inversão de direção, mudança de altura, menu, pausa, retomada de visibilidade e puxada/fechamento do header reconferidos. Visibilidade foi exercitada pelo evento com leitura de `document.hidden` controlada; não representa troca real de apps no iOS.
- TypeScript e build aprovados, sem dependências novas. Capturas e gestos verificados em Edge/Chromium; sem aparelho físico ou Safari. Tempos totais do profiler variaram entre execuções e não demonstram um ganho confiável de FPS; a evidência principal é a redução das leituras, escritas e animações ocultas.
- Referência técnica para delimitação da pintura: [CSS contain, MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain). Pesquisa visual anterior reutilizada; não houve decisão de nova estética.
