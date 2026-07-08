# 07 - Padrões de arquitetura

## Código pequeno em cadeia

Use várias ações pequenas quando a lógica tem etapas distintas. O output de uma ação vira input da próxima.

Bom para:

- normalização;
- validação;
- classificação;
- enriquecimento;
- decisão de branch.

## Registro mãe

Use um registro de controle para guardar contador, próximo número ou estado global. Isso evita procurar a base inteira para descobrir o próximo código.

Exemplos:

- próximo número de contrato;
- próxima sequência comercial;
- contador por unidade de negócio;
- último lote processado.

## Fila externa

Use quando:

- o processamento passa de 20 segundos;
- há muitos registros;
- há rate limit externo rígido;
- o resultado não precisa retornar imediatamente ao workflow.

## Idempotência

Uma ação idempotente pode rodar mais de uma vez sem duplicar efeito.

Técnicas:

- checar se o resultado já existe antes de criar;
- usar chave externa única;
- gravar `processed_at`;
- usar `correlation_id`;
- separar erro recuperável de erro permanente.

