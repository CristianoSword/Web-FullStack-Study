# 03-Lifecycle-Methods

Laboratório prático demonstrando o ciclo de vida e a ordem de execução dos testes com o JUnit 5.

## 📋 Descrição do Projeto
O gerenciamento correto do ciclo de vida dos testes evita o compartilhamento acidental de estado mutável entre métodos de teste, garantindo a idoneidade e reprodutibilidade de cada cenário isoladamente. Este projeto simula operações com banco de dados (`MockDatabase`) e um gerenciador de cache (`DataManager`) controlados via anotações de ciclo de vida.

## 🏗️ Estrutura do Código
- **src/main/java/.../model/MockDatabase.java**: Banco de dados mockado contendo conexões ativas, transações e contador de queries executadas.
- **src/main/java/.../service/DataManager.java**: Wrapper de serviço para salvar e recuperar chaves usando transações simples.
- **src/test/java/.../LifecycleTest.java**: Testes utilizando o padrão clássico (`@BeforeAll`, `@AfterAll` estáticos e `@BeforeEach`, `@AfterEach` de instância).
- **src/test/java/.../TestInstanceLifecycleTest.java**: Testes utilizando o ciclo de vida alternativo `@TestInstance(Lifecycle.PER_CLASS)`, permitindo métodos não-estáticos de configuração global e preservação de estado da classe entre testes.

## 🧪 Ganchos de Ciclo de Vida do JUnit 5
1. **`@BeforeAll`**: Executado uma única vez antes de todos os testes da classe. (Requer ser estático por padrão).
2. **`@BeforeEach`**: Executado antes de cada método de teste individual. Útil para redefinir dados e instanciar novos objetos limpos.
3. **`@AfterEach`**: Executado após cada teste. Útil para resetar mocks, limpar dados ou fazer rollback de transações.
4. **`@AfterAll`**: Executado uma vez após a conclusão de todos os testes da classe. Útil para fechar conexões de banco de dados ou destruir recursos pesados.

## 🚀 Como Executar e Validar
```bash
mvn test
```
