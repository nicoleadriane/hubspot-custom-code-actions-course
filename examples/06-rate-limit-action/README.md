# 06 - Rate limit da ação

Este exemplo é simples de propósito. O ponto principal é a configuração no HubSpot:

1. Abra a Custom Code Action.
2. Configure rate limit.
3. Defina execuções por período conforme o limite da API externa.

O código abaixo assume que o rate limit é controlado pela configuração da ação, não por `setTimeout`.

