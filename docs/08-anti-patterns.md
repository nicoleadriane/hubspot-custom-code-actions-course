# 08 - Anti-patterns

## Buscar todos os registros do portal

Problema: consome API, estoura tempo e falha em escala.

Alternativa: input direto, data source, filtro seletivo ou registro mãe.

## Um código fazendo tudo

Problema: difícil rastrear erro e mais chance de passar de 20 segundos.

Alternativa: vários códigos pequenos com outputs.

## Retry infinito manual

Problema: consome limite de API e pode duplicar efeitos.

Alternativa: `throw` apenas para erro recuperável e idempotente; outputs para erro de negócio.

## Segredos genéricos

Problema: ninguém sabe onde token é usado.

Alternativa: nomes descritivos por sistema, objeto, finalidade e ambiente. Em vez de `HUBSPOT_TOKEN`, use algo como `HUBSPOT_NEGOCIOS_ESTAGIO_READ`, `HUBSPOT_CONTATOS_DEDUP_WRITE` ou `ZEROBOUNCE_EMAIL_VALIDATION_PROD`.

Também é válido usar mais de um secret no mesmo código quando isso deixa os acessos mais claros. Só lembre que a soma dos valores dos secrets usados por uma ação não deve passar de 1.000 caracteres.

## Usar Math.random para código único

Problema: execuções simultâneas podem repetir seed.

Alternativa: biblioteca segura, chave externa, UUID ou registro mãe.

## Logar payload inteiro

Problema: risco de expor dado sensível.

Alternativa: logar IDs, etapa, status e correlation ID.
