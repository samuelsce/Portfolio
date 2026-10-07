# Validação do portfólio

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
