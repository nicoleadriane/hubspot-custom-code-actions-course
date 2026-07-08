# 03 - Outputs e encadeamento

Outputs são a principal ferramenta para deixar workflows mais rápidos e mais observáveis.

Em vez de escrever uma ação grande que faz tudo, divida em etapas:

1. normalizar dados;
2. classificar ou decidir caminho;
3. atualizar registro;
4. chamar API externa;
5. gravar diagnóstico.

## Por que dividir

- Cada ação fica abaixo do limite de 20 segundos.
- O log do workflow mostra onde falhou.
- Outputs intermediários podem ser usados em branches.
- A manutenção fica mais simples.

## Exemplo de output

```js
callback({
  outputFields: {
    normalized_phone: normalizedPhone,
    phone_country: country,
    success: true,
    error_code: "",
    error_message: ""
  }
});
```

## Regra prática

Se o valor calculado será usado por outra ação, retorne como output. Não faça a próxima ação recalcular ou buscar novamente via API.

## Quando gravar propriedade

Não grave propriedade só para passar valor para a próxima ação. Use output. Grave propriedade quando:

- o valor precisa ficar no CRM;
- alguém precisa filtrar/reportar;
- o valor precisa ser auditável fora do histórico do workflow.

