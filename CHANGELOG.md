# Changelog

## [1.2.2] - 2026-10-07

### Correções

- Traço de “Código com propósito” começa quando o título está totalmente visível nos 65% superiores da viewport, após uma pausa de 220 ms para leitura. A margem usa a altura da tela e acompanha suas mudanças.
- Desenho principal em 1600 ms, com curva menos antecipada. Acabamento e estrela entram em sequência; o desenho final mantém a mesma geometria, cores e composição.
- Efeito repete após o título sair da área visível e voltar, sem reiniciar por pequenas rolagens. Passar rapidamente pela seção cancela a espera.
- Movimento reduzido conserva o desenho estático. Observadores e timer são limpos ao desativar o efeito; nenhuma dependência ou atualização contínua de rolagem adicionada.

## [1.2.1] - 2026-10-07

### Correções

- Travessuras continuam durante a rolagem enquanto o alvo permanece visível, incluindo quando o card inicial reaparece. O personagem acompanha o elemento durante a aproximação e os gestos.
- Alvo fora da área visível encerra a sequência, restaura os controles e limpa os efeitos temporários. Menu, interações humanas, pausa e mudança de largura conservam prioridade.
- Início de um gesto de toque deixa de interromper a travessura, permitindo rolar a página. Cliques e foco nos controles continuam sendo respeitados.
- Olhar nas travessuras reutiliza a geometria medida na rolagem e nos gestos, evitando consultar a posição do alvo em cada frame quando o personagem está parado.

## [1.2.0] - 2026-10-07

### Interações e acabamento

- Mascote acena, inclina a cabeça e pisca ao trocar de idioma. No card, a reação usa o rosto; durante deslocamentos e com o menu aberto, espera o momento adequado.
- Pouso do personagem maior em tablets, incluindo telas de toque em paisagem. Quando o espaço entre os links é estreito, o pouso passa para abaixo do header.
- Botão da bancada endireita o quadro no toque, mesmo quando o navegador não foca o botão. Permanece reto após a comemoração; tocar fora, Escape e reset encerram a interação.
- Traço rosa e estrela desenhados uma vez ao chegar aos projetos, com observador desconectado após a entrada e apresentação estática no modo de movimento reduzido.
- Frase sobre código, cuidado e rosa removida do rodapé nos dois idiomas.

## [1.1.0] - 2026-10-07

### Funcionalidades

- Seletor PT/EN no menu desktop e móvel, integrado à identidade visual existente.
- Tradução da apresentação, projetos, Recette, ilustrações, bancada, contatos e descrições de acessibilidade.
- Idioma persistido no navegador, com alternativa em memória quando o armazenamento está bloqueado.
- Título, descrição e idioma do documento atualizados conforme a seleção.
- Troca preserva os estados dos controles, o texto personalizado da bancada e o controlador do mascote, sem recarregar a página.

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

[1.2.2]: https://github.com/samuelsce/Portfolio/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/samuelsce/Portfolio/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/samuelsce/Portfolio/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/samuelsce/Portfolio/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/samuelsce/Portfolio/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/samuelsce/Portfolio/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/samuelsce/Portfolio/tree/v1.0.0
