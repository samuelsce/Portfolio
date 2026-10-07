# Changelog

## [1.0.2] - 2026-10-07

### Desempenho

- Geometria fixa do header e dos controles reutilizada durante a rolagem, com invalidação por resize e mudanças de layout.
- Olhar usa a posição conhecida do personagem quando não há viagem WAAPI. Valores repetidos deixam de ser escritos; variáveis de olhar e caminhada ficam nos grupos SVG que as utilizam.
- Animações da cópia escondida e do card fora da tela pausadas. A aba oculta pausa as animações e renova a geometria ao retomar.
- Desenhos do mascote e do RoomLab, bancada e projetos memoizados, preservando suas atualizações de estado.
- Pintura do mascote delimitada com margem para os objetos e membros, mantendo a posição do SVG e a área de toque original. Cores, gestos e durações preservados.

### Validação

- TypeScript e build aprovados. Sequência instrumentada de rolagem passou de 4.296 para 1.074 leituras de posição; escritas repetidas do olhar passaram de 1.611 para zero nessa sequência.
- Testes de retorno, resize, menu, pausa, visibilidade, arrasto por toque, caminhada, lupa, planetinha, cancelamento de travessuras e header aprovados no Edge.
- Nenhum corte detectado nos grupos gráficos monitorados; larguras de 320 a 1600 px sem rolagem horizontal. Sem teste em iPhone físico/Safari ou promessa de ganho específico de FPS.

## [1.0.1] - 2026-10-07

### Correções

- Retorno do mascote ao card mantém uma única trajetória durante a rolagem, atualizando o destino sem cancelar e reiniciar a animação.
- Removidas as leituras repetidas da posição do mascote durante o retorno; cancelamento preservado para mudança de direção, menu, resize e pausa.
- Ícones de controles em SVG substituem os símbolos Unicode que apareciam como emojis coloridos no iOS. A estética é compartilhada entre celular e desktop.

### Validação

- TypeScript e build aprovados. Retorno, mudança de direção, alteração de altura da viewport, menu mobile, pausa e puxada/fechamento no desktop verificados no Edge.
- Na sequência de subida reproduzida, a criação de viagens de retorno caiu de 136 para zero. Isso mede reinícios da animação, sem representar um teste de FPS no iPhone.
- Limites e detalhes em `VALIDATION.md`.

## [1.0.0] - 2026-10-07

Primeira versão do portfólio de Samuel Santos Cerqueira.

### Funcionalidades

- Identidade rosa, fonte local e composição responsiva.
- Bancada com formato, tema, título, arredondamento e comemoração.
- BarberAg, RoomLab e LinkWatch com ilustrações, capturas e detalhes; Recette como TCC em bloco compacto.
- Mascote interativo com arrasto, alternativa por teclado, expressões, caminhada, lupa, órbita e travessuras temporárias.
- Puxada e fechamento do header sincronizados com a seção rosa em telas largas.
- Navegação móvel, contatos reais, cópia de e-mail, foco visível e movimento reduzido.
- Guia de publicação e verificação automática de build no GitHub Actions.

### Validação

- Build e TypeScript aprovados localmente.
- Revisão no Chromium em larguras de 320 a 1920 px, sem rolagem horizontal nas larguras verificadas.
- Limites e evidências da revisão registrados em `VALIDATION.md`.

O histórico inicial agrupa a implementação local por responsabilidade. Não representa uma sequência de releases anteriores.

[1.0.2]: https://github.com/samuelsce/Portfolio/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/samuelsce/Portfolio/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/samuelsce/Portfolio/tree/v1.0.0
