# Samuel Studio

[![Build](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/samuelsce/Portfolio/actions/workflows/ci.yml)

Portfólio de **Samuel Santos Cerqueira**, desenvolvedor front-end. React, TypeScript e Vite, com identidade rosa, bancada interativa, projetos BarberAg, RoomLab e LinkWatch e um bloco de TCC para o Recette.

## Executar

Requisitos: Node.js 22.12+ ou 24 e npm.

```sh
npm ci
npm run dev
```

Abra o endereço mostrado no terminal, normalmente http://127.0.0.1:5173.

```sh
npm run check
npm run build
npm run preview
```

O build estático é gerado em `dist/`. `base: './'` permite servir a pasta em um subdiretório sem fixar o nome do repositório. Nenhum banco, segredo ou serviço externo é necessário.

## Editar conteúdo

- `src/data/portfolio.ts`: nome, contatos, tecnologias, links e descrições dos projetos.
- `src/App.tsx`: componentes e estrutura da página.
- `src/styles.css`: tokens, composição e layouts responsivos.
- `src/refinements.css`: transições, navegação fixa e acabamento visual.
- `src/components/RoomIllustration.tsx`: quarto isométrico com iluminação interativa.
- `src/components/PageMascot.tsx` e `src/mascot.css`: personagem, trajetórias, expressões e posições responsivas.
- `src/mascot-adventures.css`: caminhada, anéis do planetinha, travessuras e esforço no cabeçalho.
- `src/components/HeaderStretch.tsx`: superfície do cabeçalho coordenada pelo mascote.
- `public/projects/`: capturas reais de projetos.
- `index.html`: título e metadados para buscadores e compartilhamento.

## Experiência

A bancada permite alternar card/cartaz, tema claro/escuro, arredondamento e título. O botão dá um retorno visual e acessível; Recomeçar restaura os controles. Nada é enviado ou armazenado.

Com movimento ativado, o mascote olha para o mouse na bancada, pisca e responde ao botão. Ao deixar o hero, salta do card para a margem da página e acompanha o ponteiro ou o foco do teclado. Ao chegar perto da seção rosa, sobe, segura o cabeçalho e estica seu fundo até as bordas, depois volta a observar. Retornar ao hero faz entrar no card novamente, recolhendo braços e pés e recuperando a cor do formato escolhido.

O personagem não fala, não tem balões ou áudio. Suas interações são gestos e expressões:

- Clique curto no mascote fora do card: aceno e piscada.
- Segurar no card ou na margem: surpresa inicial, irritação após 320 ms e birra após 1,25 s, com sobrancelhas inclinadas, bochechas coradas, braços e pernas tentando escapar e pequenos sinais de esforço.
- Arrastar: acompanha mouse ou toque com inclinação e alongamento proporcionais ao movimento, limitado à área visível. Soltar: pousa onde foi largado e volta caminhando, com passos alternados, balanço dos braços, peso e sombra. Depois se acomoda e relaxa. Soltá-lo sobre um projeto também identifica o contexto do quadro.
- Captura real: examina com uma lupa. Tema escuro: olhos sonolentos, esfregada no rosto, lua e estrela. Tema claro: protege os olhos da luz. Copiar contato: pequenos saltos e comemoração. Controles restantes: inclina a cabeça e observa.
- Rolagem rápida: susto breve. Repouso prolongado: espreguiçada ou inclinação curiosa, espaçadas por 14 segundos; sem animação contínua da página.
- Teclado: Enter alterna pegar/soltar; setas movem; Escape devolve sem birra. Também é possível segurar Espaço. Os controles têm descrição acessível, sem falas atribuídas ao personagem.

Abertura do menu, mudança de largura, perda de foco da janela e desativação do movimento interrompem pegadas com segurança. Ao voltar ao card, o foco do teclado retorna ao controle original quando estava no personagem flutuante.

Pegadas prolongadas e arrastos acumulam irritação. Segurar por aproximadamente 2,8 s, ou provocar repetidamente, ativa o planetinha com uma faixa orbital inspirada nos anéis do card inicial, desenhada em duas metades para passar atrás e à frente do corpo. Ele caminha ao seu lugar, se prepara, visita um controle visual visível, troca temporariamente um tema ou captura e cutuca uma ilustração. Depois restaura o controle, apaga os efeitos e volta caminhando. A irritação diminui com o repouso. Interação do usuário interrompe a brincadeira e preserva a escolha feita. Os alvos automáticos são apenas temas e capturas da bancada/projetos; a seleção está explicitamente definida no componente.

A coreografia do header acontece apenas quando a largura útil supera 1500 px. A borda da seção rosa precisa cruzar o meio do cabeçalho para iniciar o gesto, com tolerância de 6 px na entrada/saída. Há subida, preparação da pegada, dois esforços para puxar e liberação. Ao sair da seção rosa, o personagem vai até a borda, empurra o fundo para recolhê-lo e retorna. Em telas menores, permanece observando; a superfície conserva a cobertura imediata sem essa coreografia. No desktop, a largura é controlada pelo gesto para não esconder a puxada.

O personagem pousa no espaço livre do cabeçalho em telas de até 1100 px, e se abaixa para sair quando o menu mobile abre, reaparecendo ao fechar. A forma original no card mantém seu espaço, mas fica invisível durante a viagem: não há dois personagens visíveis ao mesmo tempo. Desativar as animações cancela viagens em andamento e mantém o personagem no card; a cobertura do header continua funcionando. Trajetórias usam Web Animations API e as expressões usam CSS. Atualizações do olhar e da geometria usam `requestAnimationFrame`, sem renderizar toda a página por movimento do mouse ou por cada evento de rolagem. O bloco do Recette mostra o contexto acadêmico, a participação do autor e o repositório.

Os projetos têm detalhes expansíveis e troca entre ilustração e captura real com transição de opacidade e deslocamento suave, mantendo o tamanho do quadro. RoomLab apresenta um quarto isométrico original com iluminação natural ou noturna. As ilustrações do BarberAg e LinkWatch oferecem modos claro e escuro. A captura do LinkWatch mostra a página inicial com exemplos ilustrativos, conforme a imagem fornecida pelo autor. A captura do BarberAg foi feita na página inicial pública em 7 de outubro de 2026; a agenda exibida nela é demonstrativa. BarberAg é um trabalho de front-end em equipe; não é apresentado como autoria individual do produto. Seu código não é público, por isso só há link para o site.

Contato por e-mail (`mailto:`), LinkedIn e GitHub. Copiar e-mail escreve no clipboard após clique e informa falha caso o navegador bloqueie a operação. Não há formulário que simule envio.

## Design e referências

O planejamento foi registrado antes da implementação em `DESIGN-PLAN.md`. Referências efetivamente utilizadas: [Supaste / Navbar Gallery](https://www.navbar.gallery/navbar/supaste) para navegação compacta; [Yash Fataniya / Footer Design](https://www.footer.design/sites/yash-fataniya) para encerramento com personalidade; [Rauno / Craft](https://rauno.me/craft) para apresentação de experimentos; [Bruno Simon](https://bruno-simon.com/) para a ideia de uma experiência que demonstra habilidade. [Samuel Rizzon](https://www.samuelrizzon.dev/) foi a referência inicial do usuário. Nenhum texto, asset ou código desses portfólios foi reutilizado.

Space Grotesk é servida localmente pelo Fontsource; a licença OFL acompanha o pacote em `node_modules/@fontsource/space-grotesk/LICENSE`. As ilustrações da bancada e dos projetos foram criadas para este portfólio. As capturas são dos projetos do próprio autor.

Na revisão de personalidade, o [Eye tracker do Bencho](https://bencho.dev/blocks/eye-tracker) inspirou o olhar reativo do mascote existente. A implementação é própria; nenhum código ou asset da referência foi copiado.

## Acessibilidade e limites

Conteúdo sem introdução bloqueante. Link para pular conteúdo, navegação semântica, foco visível, controles nativos, estados acessíveis e respeito inicial a `prefers-reduced-motion`. O controle Ativar/Desativar animações permite escolher o movimento apenas nesta página, sem alterar o sistema ou gravar preferências. A bancada tem entrada suave, transições entre formatos sem mudar a altura do palco e feedback que reinicia em cada clique. Detalhes dos projetos e iluminação do quarto também têm transições. Desligar o movimento suspende animações e transições. Texto principal em 17 px, com rótulos e links maiores. A bancada demonstra estados de UI; não é um editor persistente. A validação de navegador cobre Chromium em viewports simuladas, não dispositivos físicos ou todos os navegadores.

Código em [samuelsce/Portfolio](https://github.com/samuelsce/Portfolio). A hospedagem do site, domínio, analytics e imagem social de compartilhamento podem ser configurados depois.

As opções e configurações de publicação estão em [PUBLICAR.md](PUBLICAR.md). O projeto gera arquivos estáticos e pode ser hospedado na Vercel, Cloudflare Pages ou GitHub Pages.

## Refinamento do personagem

O rosto do card e o mascote flutuante compartilham `MascotArtwork.tsx`: silhueta orgânica, luz e sombra suaves, membros encorpados, mãos e sapatos. A lupa é parte do rig do braço; corpo e órbita compartilham a mesma transformação. A caminhada usa velocidade suavizada e um destino atualizado durante a rolagem; a distância percorrida determina os passos, evitando passos parados e mudanças abruptas de destino. O retorno ao card confirma posição e tamanho antes de ocultar o personagem flutuante. Os ajustes de material e rig estão em `src/mascot-finish.css`. Sem bibliotecas adicionais ou falas. O cabeçalho fixo mantém a navegação estável; abrir o menu não desloca o conteúdo nem muda a rolagem.

O planetinha usa um rig interno de postura, separado da flutuação, com preparação, toque, observação, provocação, desfazer e cutucada. Sair da aba cancela a travessura, restaura os controles e captura a posição atual; voltar atualiza a geometria antes de retomar o pouso. No celular/tablet, os controles têm alvos de toque de 44 px e o campo de texto usa 16 px. O menu fecha ao sair da largura móvel e por toque fora da navegação, além de Escape.

## Versionamento

A primeira entrega é marcada pela tag `v1.0.0` e descrita no [CHANGELOG.md](CHANGELOG.md). O histórico inicial foi organizado por responsabilidade a partir da implementação local existente, sem datas retroativas. Os commits seguem os prefixos `feat`, `chore`, `docs` e `ci`; mudanças futuras devem registrar uma intenção por commit e atualizar o changelog nas releases.

GitHub Actions executa `npm ci` e `npm run build` em pushes para `main` e pull requests. O build também verifica os tipos do TypeScript. O workflow não publica o site.
