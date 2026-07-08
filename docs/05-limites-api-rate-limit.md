# 05 - Limites de API e rate limit

Custom Code Action não isenta o time dos limites de API do HubSpot ou de APIs externas.

## Regras práticas

- Use inputs antes de chamar API.
- Use endpoints batch quando fizer sentido fora do workflow.
- Use cache para metadados como owners, pipelines e propriedades.
- Não faça buscas globais a cada execução.
- Trate `429` como desenho ruim ou carga alta, não como evento normal.

## Search API

Tenha cuidado com CRM Search API:

- limite específico de requests por segundo;
- limite de registros por página;
- limite de resultados por query;
- novos registros podem demorar a aparecer nos resultados.

Para workflows, Search API deve ser usado com filtros muito seletivos.

## Rate limit da ação

O HubSpot permite configurar rate limit na própria Custom Code Action. Isso afeta a ação e os passos seguintes do workflow.

Use quando:

- o sistema externo tem limite fixo;
- o workflow pode esperar;
- a ação precisa retornar output para passos seguintes.

Se o volume for grande e a resposta não precisa voltar para o workflow, prefira webhook + fila externa.

Veja o módulo [05.1 - Webhook e fila externa](05-1-webhook-fila-externa.md) para o desenho completo.

## Middleware externo

Para limites críticos, use um serviço intermediário:

- recebe chamada do workflow;
- aplica token bucket ou fila;
- chama a API externa;
- grava resultado em banco/log;
- opcionalmente atualiza o HubSpot depois.
