# 09 - Checklists

## Checklist antes de publicar

- [ ] A ação usa inputs em vez de buscar o próprio registro via API.
- [ ] Objetos associados foram avaliados como data sources.
- [ ] Outputs estão definidos no action setup.
- [ ] Existe output de diagnóstico.
- [ ] Erros recuperáveis usam `throw`.
- [ ] Erros de negócio retornam `success=false`.
- [ ] Nenhum secret aparece em log.
- [ ] A ação é idempotente.
- [ ] Não há busca global.
- [ ] O volume inicial foi estimado.
- [ ] Rate limit foi configurado quando necessário.
- [ ] O workflow foi testado com registro de teste.

## Checklist de revisão de código

- [ ] O código cabe em uma responsabilidade clara.
- [ ] Inputs obrigatórios são validados no início.
- [ ] Mensagens de erro são úteis e sanitizadas.
- [ ] `event.callbackId` é usado como correlation ID.
- [ ] Chamadas externas têm tratamento de erro.
- [ ] O código não depende de estado global mutável.
- [ ] Datas estão no formato esperado pelo HubSpot.

