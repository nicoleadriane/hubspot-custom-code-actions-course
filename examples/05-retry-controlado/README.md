# 05 - Retry controlado

Exemplo de como diferenciar erro recuperável de erro de negócio.

- `429` e `5xx`: relança erro com `throw`.
- `400` ou validação: retorna output de erro.

Use `throw` apenas quando a operação for idempotente.

