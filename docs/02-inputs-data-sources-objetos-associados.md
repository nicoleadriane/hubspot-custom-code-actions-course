# 02 - Inputs, data sources e objetos associados

Um erro comum é usar Custom Code Action para buscar dados que o próprio workflow já consegue entregar como input.

Antes de escrever uma chamada para a API, pergunte:

- Este valor está no registro inscrito?
- Este valor está em um objeto associado?
- Este valor foi produzido por uma ação anterior?
- Este valor pode ser adicionado como data source no workflow?

## Inputs do registro inscrito

No setup da ação, adicione as propriedades necessárias em "Properties to include in code". No código:

```js
const email = event.inputFields.email;
const dealAmount = Number(event.inputFields.deal_amount || 0);
```

## Objetos associados

O data panel do workflow permite adicionar fontes de dados além do objeto inscrito, incluindo objetos associados. Isso pode evitar chamadas como:

- buscar empresa associada ao contato;
- buscar deal associado à empresa;
- buscar ticket associado ao deal;
- buscar dados de um objeto customizado relacionado.

Use filtros para escolher a fonte correta:

- association label, quando houver mais de uma relação;
- propriedade com identificador único;
- registro mais recente, mais antigo ou mais recentemente atualizado.

## Quando ainda usar API

Use API quando:

- a relação não está disponível no data panel;
- há múltiplos registros e você precisa aplicar regra customizada;
- precisa criar, atualizar, associar ou deletar registros;
- precisa consultar sistema externo.

Mesmo nesses casos, passe como input tudo que puder. O código deve chamar API para completar a lacuna, não para reconstruir todo o contexto.

