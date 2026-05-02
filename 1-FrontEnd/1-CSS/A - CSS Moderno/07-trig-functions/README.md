# Estudo de CSS Moderno: Funções Trigonométricas

O CSS agora suporta funções matemáticas trigonométricas nativas, como `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()` e `atan2()`.

## O que este exemplo demonstra:

1.  **Distribuição Circular Perfeita**: Usamos o índice de cada item (`--index`) para calcular o ângulo correspondente em um círculo de 360 graus.
2.  **Cálculo de Coordenadas**:
    - `cos(ângulo) * raio` nos dá a posição horizontal (**X**).
    - `sin(ângulo) * raio` nos dá a posição vertical (**Y**).
3.  **Dinamismo**: Basta mudar a variável `--items` no CSS ou adicionar mais elementos no HTML para que o círculo se ajuste automaticamente.

## Por que usar?
- **Adeus JavaScript para Layouts**: Antigamente, layouts circulares exigiam cálculos complexos via JS ou o uso de posicionamento absoluto fixo para cada item.
- **Animações Fluidas**: Você pode animar o ângulo ou o raio usando variáveis CSS, criando efeitos de abertura e fechamento de menus circulares de forma muito performática.

## Como funciona (Resumo):
1.  Defina um ângulo em graus ou radianos.
2.  Use `calc()` combinando `sin()` ou `cos()` com uma unidade de distância (px, rem, etc.).
3.  Aplique o resultado no `transform: translate()`.
