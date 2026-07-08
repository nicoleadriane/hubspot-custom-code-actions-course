# Code review checklist

- [ ] O código usa inputs sempre que possível.
- [ ] Objetos associados foram considerados no data panel.
- [ ] A ação tem uma responsabilidade clara.
- [ ] Outputs foram configurados no HubSpot.
- [ ] Existe output de erro padronizado.
- [ ] Erros 429/5xx usam `throw` apenas quando a operação é idempotente.
- [ ] Erros de negócio retornam `success=false`.
- [ ] Secrets não aparecem em logs.
- [ ] Não existe busca global ou paginação extensa.
- [ ] Datas estão em Unix milliseconds quando usadas em propriedades de data.
- [ ] O fluxo foi testado com registro seguro.

