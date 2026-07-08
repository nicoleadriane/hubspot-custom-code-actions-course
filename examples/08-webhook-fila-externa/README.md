# 08 - Webhook e fila externa

Use este padrão quando:

- o volume é alto;
- a API externa tem limite rígido;
- o processamento pode acontecer depois;
- o workflow não precisa de retorno imediato.

O Custom Code Action envia uma mensagem pequena para um endpoint controlado pelo time. O serviço externo grava em fila e processa com rate limit próprio.

