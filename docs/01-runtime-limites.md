# 01 - Runtime e limites

Custom Code Actions rodam em ambiente serverless gerenciado pelo HubSpot/AWS Lambda. Isso muda o desenho do código: ele precisa ser curto, previsível e barato.

## Limites que devem guiar o desenho

- Tempo máximo de execução: 20 segundos.
- Memória máxima: 128 MB.
- Até 50 propriedades como input direto da ação.
- Output string: até 65.000 caracteres.
- Segredos: o total dos valores de secrets usados por uma ação não deve passar de 1.000 caracteres.

## Implicações práticas

- Não faça paginação extensa dentro de uma ação.
- Não processe vários registros dentro de uma única execução.
- Não carregue bibliotecas grandes que não estejam suportadas pelo runtime.
- Não dependa de estado global mutável.
- Não use `Math.random()` para identificadores únicos.

## Variáveis globais

Variáveis declaradas fora de `exports.main` podem ser reutilizadas em execuções futuras. Isso pode ajudar em conexões externas, mas é perigoso para dados de negócio.

Regra do curso:

- Configurações imutáveis podem ficar fora.
- Qualquer dado específico do registro atual deve ficar dentro de `exports.main`.

## Testes no HubSpot

O teste da ação executa mudanças no registro selecionado. Use registros de teste ou ramificações protegidas antes de publicar um workflow em produção.

