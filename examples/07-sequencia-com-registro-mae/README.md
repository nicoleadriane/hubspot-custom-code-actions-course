# 07 - Sequência com registro mãe

Este exemplo mostra o padrão conceitual para gerar sequência sem pesquisar a base inteira.

## Ideia

Criar um registro de controle com:

- nome da sequência;
- próximo número;
- prefixo;
- último uso.

A ação lê esse registro, calcula o próximo valor e atualiza o contador.

## Atenção

Em cenários com concorrência alta, use um serviço externo transacional ou uma estratégia de lock. Este exemplo é didático e precisa ser adaptado para produção.

