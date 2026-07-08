# 00 - Visão geral

Custom Code Actions são úteis quando uma automação precisa fazer algo que uma ação nativa do HubSpot não faz bem: transformar dados, consultar um sistema externo, calcular uma regra complexa ou preparar outputs para ações seguintes.

Neste curso, a unidade principal não é "o código". A unidade principal é o workflow inteiro.

## Princípios

1. Faça cada ação resolver uma responsabilidade pequena.
2. Prefira inputs e data sources a chamadas de API.
3. Use outputs para passar resultado para a próxima ação.
4. Escreva logs e outputs de diagnóstico desde o primeiro dia.
5. Diferencie erro recuperável de erro de negócio.
6. Evite qualquer lógica que precise varrer a base inteira.
7. Planeje volume antes de ativar enrollment de registros existentes.

## O que um bom Custom Code Action deve responder

- Qual objeto disparou a execução?
- Quais inputs foram usados?
- Qual sistema externo foi chamado?
- O resultado é idempotente? (ou seja, uma ação que pode rodar mais de uma vez e ainda assim produzir o mesmo resultado final, sem duplicar efeito)
- Se falhar, o workflow deve tentar de novo?
- Se não tentar de novo, como alguém vai encontrar e corrigir o caso?

## Quando não usar Custom Code Action

Não use Custom Code Action para processar lotes grandes, sincronização pesada ou jobs longos.

