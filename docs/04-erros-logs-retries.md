# 04 - Erros, logs e retries

Todo Custom Code Action deve ter uma estratégia explícita de erro.

## Dois tipos de erro

Erro recuperável:

- rate limit;
- timeout temporário;
- erro 5xx;
- indisponibilidade de sistema externo.

Erro de negócio:

- input obrigatório ausente;
- formato inválido;
- regra não atendida;
- objeto associado não encontrado.

## Quando usar throw

Use `throw err` quando a execução deve ser repetida pelo HubSpot. Isso é apropriado para `429` e `5xx` quando a chamada é idempotente.

Não use `throw` para erro de negócio esperado. Nesse caso, retorne outputs de diagnóstico e deixe o workflow seguir para um ramo de tratamento.

## Output de diagnóstico

Padronize estes outputs:

```text
success
error_code
error_message
error_step
correlation_id
retryable
processed_at
```

## Logs

Use `console.log` para contexto mínimo e `console.error` para falhas. Nunca logue tokens, secrets, payloads sensíveis ou dados pessoais desnecessários.

Bom log:

```js
console.log("starting_action", {
  objectId: event.object.objectId,
  callbackId: event.callbackId
});
```

Log ruim:

```js
console.log(process.env.HUBSPOT_PRIVATE_APP_TOKEN);
```

## Correlation ID

Use `event.callbackId` como correlation ID quando possível. Isso ajuda a conectar:

- execução da ação;
- logs do workflow;
- outputs;
- eventuais logs externos.

