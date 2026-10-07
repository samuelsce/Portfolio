# Changelog

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

[1.0.1]: https://github.com/samuelsce/Portfolio/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/samuelsce/Portfolio/tree/v1.0.0
