# 02-Parameterized-Tests

Laboratório focado no desenvolvimento de testes unitários parametrizados com o JUnit 5.

## 📋 Descrição do Projeto
Os testes parametrizados eliminam a duplicação de métodos de teste executando a mesma verificação lógica múltiplas vezes com dados de entrada e saídas esperadas diferentes. Este projeto demonstra as anotações do JUnit 5 para parametrizar verificações em validadores de contas de usuários (`AccountValidator`).

## 🏗️ Estrutura do Código
- **src/main/java/.../model/UserAccount.java**: Modelo de conta de usuário com email, senha e idade.
- **src/main/java/.../validator/AccountValidator.java**: Validador de dados contendo validação de expressões regulares de email, força de senhas e maioridade.
- **src/test/java/.../ParameterizedValidatorTest.java**: Testes utilizando `@ValueSource`, `@CsvSource`, `@MethodSource` e `@NullAndEmptySource`.
- **src/test/java/.../EdgeCaseParameterizedTest.java**: Customização dos formatos de logs de teste parametrizados e delimitadores.

## 🧪 Principais Recursos Utilizados
- **`@ParameterizedTest`**: Substitui a anotação `@Test` básica para habilitar injeção de parâmetros.
- **`@ValueSource`**: Passagem de uma lista inline de valores primitivos (ex: strings de email).
- **`@NullAndEmptySource`**: Validação de cenários de borda nulos e strings vazias (`""`).
- **`@CsvSource`**: Tabela simples de chave/valor ou múltiplos parâmetros de entrada/saída.
- **`@MethodSource`**: Habilita a passagem de objetos Java ricos através de streams estáticos.
- **Formatação de Nome (`name = "..."`)**: Melhora a legibilidade do relatório de testes customizando a mensagem do console.

## 🚀 Como Executar e Validar
```bash
mvn test
```
