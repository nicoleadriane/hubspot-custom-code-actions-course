# 06 - Workflows em alta escala

Enrollment em massa é uma das maiores fontes de problemas com Custom Code Actions.
IMPORTANTE: NUNCA use workflows para fazer backfill histórico, rode seu script localmente nesses casos

## Antes de ligar o workflow

Responda:

- Quantos registros entram no primeiro dia?
- Quantas chamadas de API cada registro faz?
- O workflow tem rate limit?
- A ação é idempotente?
- O erro é rastreável?
- Existe plano de pausa?

## O que evitar

- Ativar workflow para todos os registros existentes sem janela de controle.
- Fazer múltiplas chamadas de API por registro sem necessidade.
- Depender de retry automático para resolver desenho de carga.
- Usar `setTimeout` dentro da ação para segurar execução. O limite de 20 segundos torna isso frágil.

## Estratégias

- Dividir enrollment por listas ou segmentos.
- Usar delays e branches para espalhar carga.
- Usar random split quando disponível.
- Usar rate limit da ação.
- Usar webhook e fila externa para processamento pesado.

## Monitoramento

Durante rollout:

- acompanhe action logs;
- acompanhe taxa de erro;
- acompanhe uso diário de API;
- confira amostras de registros processados;
- tenha um ramo para `success=false`.

