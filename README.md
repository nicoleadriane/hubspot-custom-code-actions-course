# Curso: Custom Code Actions no HubSpot

Material para um treinamento prático sobre Custom Code Actions em workflows do HubSpot, com foco em eficiência, rastreabilidade, limites de API e desenho seguro para escala.

## Para quem é este curso

Este curso assume que o time já criou Custom Code Actions antes. O objetivo não é explicar apenas "como escrever JavaScript no HubSpot", e sim melhorar a arquitetura dos workflows:

- usar inputs e data sources para reduzir chamadas de API;
- passar outputs entre ações para quebrar lógica grande em passos menores;
- tratar erros de forma rastreável;
- evitar loops, buscas globais e retries infinitos;
- desenhar workflows que suportem volume alto sem travar o portal.

## Ordem sugerida

1. [Visão geral](docs/00-visao-geral.md)
2. [Runtime e limites](docs/01-runtime-limites.md)
3. [Inputs, data sources e objetos associados](docs/02-inputs-data-sources-objetos-associados.md)
4. [Outputs e encadeamento](docs/03-outputs-e-encadeamento.md)
5. [Erros, logs e retries](docs/04-erros-logs-retries.md)
6. [Limites de API e rate limit](docs/05-limites-api-rate-limit.md)
7. [Webhook e fila externa](docs/05-1-webhook-fila-externa.md)
8. [Workflows em alta escala](docs/06-workflows-em-alta-escala.md)
9. [Padrões de arquitetura](docs/07-padroes-de-arquitetura.md)
10. [Anti-patterns](docs/08-anti-patterns.md)
11. [Checklists](docs/09-checklists.md)

## Exemplos

Os exemplos ficam em [examples](examples/) e são independentes. Cada pasta tem um `README.md` com o contexto do exercício e um ou mais arquivos `.js`.

## Templates

A pasta [templates](templates/) contém modelos para:

- nova Custom Code Action;
- output de erro padronizado;
- desenho de workflow antes de implementar;
- revisão de código antes de publicar.

## Referências

Veja [links oficiais](references/links-oficiais.md) e [glossário](references/glossary.md).
