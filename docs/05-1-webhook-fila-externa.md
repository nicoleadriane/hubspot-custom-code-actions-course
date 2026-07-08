# 05.1 - Webhook e fila externa

Webhook + fila externa é um padrão para tirar processamento pesado de dentro do workflow.

Em vez de a Custom Code Action tentar fazer tudo em até 20 segundos, ela só envia uma mensagem pequena para um endpoint controlado pelo time. Esse endpoint grava a mensagem em uma fila, e um worker processa aos poucos, respeitando limites de API, retries e logs.

## Fluxo

```text
Workflow HubSpot
  -> Custom Code Action
    -> POST para webhook externo
      -> webhook valida e grava mensagem na fila
        -> worker processa no ritmo seguro
          -> worker atualiza HubSpot ou sistema externo
            -> opcionalmente outro workflow continua o processo
```

## O que a Custom Code Action faz

A ação dentro do HubSpot deve ser curta:

1. monta um payload mínimo;
2. adiciona `correlationId`;
3. envia para o webhook;
4. recebe confirmação rápida;
5. retorna output indicando que o item foi enfileirado.

Exemplo de payload:

```json
{
  "action": "sync_to_external_system",
  "objectType": "CONTACT",
  "objectId": "123456",
  "correlationId": "ap-123-456-7-8",
  "requestedAt": "2026-07-08T12:00:00.000Z"
}
```

O webhook deve responder rápido, idealmente com `202 Accepted`, indicando que recebeu o pedido. Ele não precisa terminar o processamento antes de responder ao HubSpot.

## O que a fila resolve

A fila separa "receber pedidos" de "processar pedidos".

Isso permite:

- controlar quantos registros são processados por minuto;
- pausar processamento sem pausar o workflow;
- reprocessar itens que falharam;
- fazer retry com limite;
- manter histórico de status;
- proteger APIs externas com rate limit rígido.

Exemplos de fila:

```text
AWS SQS
Google Pub/Sub
RabbitMQ
Redis Queue
Supabase Queue
Tabela em banco com status pending/processing/done/error
```

Para um time que ainda não tem infraestrutura de fila, uma tabela de banco bem desenhada já pode resolver o primeiro caso de uso.

## O que o worker faz

O worker é um processo fora do HubSpot. Ele lê mensagens da fila e executa o trabalho pesado.

Responsabilidades:

- buscar mensagens pendentes;
- respeitar rate limit;
- chamar APIs externas;
- atualizar HubSpot quando necessário;
- gravar logs;
- marcar status final;
- fazer retry com limite;
- mandar casos sem solução para análise manual.

Exemplo de estados:

```text
pending
processing
done
retry_waiting
error
dead_letter
```

## Como continuar o workflow depois

Fila externa é assíncrona. Isso significa que o workflow original não recebe o resultado final imediatamente.

Existem três formas comuns de continuar:

### 1. Atualizar propriedade e disparar outro workflow

O worker atualiza propriedades no HubSpot:

```text
external_sync_status = done
external_sync_processed_at = 2026-07-08T12:05:00.000Z
external_sync_error = vazio
```

Outro workflow começa quando `external_sync_status` muda para `done`.

### 2. Atualizar o próprio registro e encerrar

Use quando não há próxima automação. O worker apenas grava o resultado final no CRM.

### 3. Chamar outro endpoint interno

Use quando o processo continua fora do HubSpot. O HubSpot registra status e auditoria, mas não orquestra o restante.

## Quando usar

Use webhook + fila externa quando:

- o processamento passa perto de 20 segundos;
- muitos registros entram ao mesmo tempo;
- a API externa tem limite rígido;
- você precisa de batches reais;
- precisa pausar e retomar processamento;
- precisa de logs mais completos;
- o resultado não precisa ser usado imediatamente no próximo branch do mesmo workflow.

## Quando não usar

Não use esse padrão se o workflow precisa do resultado imediatamente para decidir o próximo branch.

Nesse caso, prefira:

- inputs + outputs dentro da Custom Code Action;
- rate limit da própria ação;
- dividir a lógica em várias ações pequenas.

Se o processo puder virar assíncrono, mude o desenho:

```text
Workflow 1: marca status = pending e envia para fila
Worker: processa e marca status = done ou error
Workflow 2: começa quando status = done ou error
```

## Retry e idempotência

O worker deve ser idempotente. Se ele processar a mesma mensagem duas vezes, o resultado final não pode duplicar registros, cobranças, emails ou tarefas.

Boas práticas:

- use `correlationId` como chave de rastreio;
- grave uma chave única por operação;
- cheque se a ação já foi executada antes de criar algo;
- limite o número de tentativas;
- use `dead_letter` para casos que precisam de análise manual.

## Logs mínimos

Cada item processado deve registrar:

```text
correlation_id
object_type
object_id
status
attempt_count
last_error_code
last_error_message
created_at
updated_at
processed_at
```

O objetivo é conseguir responder rapidamente:

- o HubSpot enviou o pedido?
- o webhook recebeu?
- a fila guardou?
- o worker processou?
- a atualização final voltou para o HubSpot?

## Exemplo de output no HubSpot

A Custom Code Action pode retornar:

```js
callback({
  outputFields: {
    success: true,
    queued: true,
    queue_status: "accepted",
    correlation_id: event.callbackId,
    error_code: "",
    error_message: "",
    processed_at: new Date().toISOString()
  }
});
```

Se o webhook falhar com `429` ou `5xx`, a ação pode usar `throw` para permitir retry automático do HubSpot, desde que o envio seja idempotente no webhook.

