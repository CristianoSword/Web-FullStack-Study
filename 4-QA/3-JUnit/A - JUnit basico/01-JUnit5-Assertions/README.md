# 01-JUnit5-Assertions

Laboratório prático focado nas asserções fundamentais da biblioteca JUnit 5 (Jupiter).

## 📋 Descrição do Projeto
Este projeto simula um sistema de compras simplificado com entidades de negócios (`Product`, `Order`) e um gerenciador de descontos/pagamentos (`OrderService`). Através desse cenário prático, demonstramos a aplicação de asserções essenciais para validação de fluxos em ambientes corporativos Java.

## 🏗️ Estrutura do Código
- **src/main/java/.../model/Product.java**: Entidade que representa itens de venda, com validações de consistência interna.
- **src/main/java/.../model/Order.java**: Representação de carrinho/pedido do cliente, permitindo cálculo de preços agregados.
- **src/main/java/.../service/OrderService.java**: Camada de serviço responsável por registrar vendas, processar pagamentos e aplicar cupons.
- **src/test/java/.../AssertionsTest.java**: Cobertura de asserções como `assertEquals`, `assertTrue`, `assertSame`, `assertAll`, `assertIterableEquals`, etc.
- **src/test/java/.../OrderValidationTest.java**: Testes focados em comportamento sob erro e limites (`assertThrows`).

## 🚀 Como Executar e Validar

### Pré-requisitos
- Java Development Kit (JDK) 17 ou superior.
- Apache Maven instalado e configurado no PATH.

### Execução Local
1. Para rodar toda a suíte de testes com o Maven Surefire Plugin, utilize o comando:
   ```bash
   mvn test
   ```

2. Para limpar as saídas anteriores e forçar uma nova compilação e teste:
   ```bash
   mvn clean test
   ```
