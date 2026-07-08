# 04 - Error output e diagnóstico

Exemplo de ação que não usa `throw` para erro de negócio. Ela retorna `success=false` e campos de diagnóstico para o workflow poder ramificar.

Use este padrão quando o erro é esperado e não será resolvido por retry.

