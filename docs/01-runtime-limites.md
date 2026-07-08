# 01 - Runtime e limites

Custom Code Actions rodam em ambiente serverless gerenciado pelo HubSpot/AWS Lambda. Isso muda o desenho do código: ele precisa ser curto, previsível e barato.

## Limites que devem guiar o desenho

- Tempo máximo de execução: 20 segundos.
- Memória máxima: 128 MB.
- Até 50 propriedades como input direto da ação.
- Output string: até 65.000 caracteres.
- Segredos: uma ação pode usar mais de um secret, mas a soma dos valores de todos eles não deve passar de 1.000 caracteres. Use nomes descritivos por finalidade e escopo, não nomes genéricos como `HUBSPOT_TOKEN`. Exemplo: prefira `NEGOCIOS_ESTAGIO_TOKEN` ou `CRM_DEALS_READ_TOKEN` quando o token existe para ler/alterar negócios e estágios.

## Implicações práticas

- Não faça paginação extensa dentro de uma ação.
- Não processe vários registros dentro de uma única execução.
- Não carregue bibliotecas grandes que não estejam suportadas pelo runtime.
- Não dependa de estado global mutável.
- Não use `Math.random()` para identificadores únicos.

## Variáveis globais

Variáveis declaradas fora de `exports.main` podem ser reutilizadas em execuções futuras. Isso pode ajudar em conexões externas, mas é perigoso para dados de negócio.

Regra do curso:

- Configurações imutáveis podem ficar fora.
- Qualquer dado específico do registro atual deve ficar dentro de `exports.main`.

## Testes no HubSpot

O teste da ação executa mudanças no registro selecionado. Use registros de teste ou ramificações protegidas antes de publicar um workflow em produção.

## Nomeando secrets

Um bom nome de secret deve ajudar quem lê o código a entender:

- qual sistema ele acessa;
- qual objeto ou processo ele atende;
- se é leitura, escrita ou ambos;
- se é produção, sandbox ou teste.

Evite:

```text
HUBSPOT_TOKEN
TOKEN
API_KEY
SECRET
```

Prefira:

```text
HUBSPOT_NEGOCIOS_ESTAGIO_READ
HUBSPOT_CONTATOS_DEDUP_WRITE
ZEROBOUNCE_EMAIL_VALIDATION_PROD
INTERNAL_QUEUE_WEBHOOK_TOKEN
```

Isso também permite usar mais de um secret no mesmo código sem misturar permissões. Por exemplo, um secret pode ler negócios e outro pode chamar uma API externa. O código fica mais claro e o acesso fica mais fácil de revisar.
