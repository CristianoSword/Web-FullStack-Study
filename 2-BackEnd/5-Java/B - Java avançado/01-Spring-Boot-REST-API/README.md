# 01-Spring-Boot-REST-API

API corporativa de suporte usando Spring Boot 2.7, Spring Web, JPA/Hibernate e banco H2 em memoria.

## O que foi implementado

- Cadastro de clientes com validacao de email unico.
- Registro e consulta de tickets de suporte por cliente.
- Alteracao de status de tickets com regra de negocio para itens resolvidos.
- Seed inicial com clientes e chamados reais de exemplo.
- Tratamento padronizado de erros HTTP e validacao de payload.
- Testes de integracao com `MockMvc`.

## Estrutura

- `src/main/java/study/java/spring/SupportDeskApplication.java`: bootstrap Spring Boot.
- `domain/`: entidades JPA e enums do dominio.
- `dto/`: requests e responses da API.
- `repository/`: repositórios JPA.
- `service/`: regras de negocio e mapeamento.
- `controller/`: endpoints REST.
- `bootstrap/DataSeeder.java`: carga inicial do H2.
- `exception/ApiExceptionHandler.java`: serializacao de erros e validacao.
- `src/test/java/.../CustomerControllerIntegrationTest.java`: smoke test HTTP da API.

## Endpoints

- `GET /api/customers`: lista clientes.
- `GET /api/customers/{customerId}`: detalha cliente.
- `POST /api/customers`: cria cliente.
- `GET /api/customers/{customerId}/tickets`: lista tickets do cliente.
- `POST /api/customers/{customerId}/tickets`: abre ticket.
- `GET /api/tickets`: lista todos os tickets.
- `GET /api/tickets/{ticketId}`: detalha ticket.
- `PATCH /api/tickets/{ticketId}/status`: altera status.

## Como rodar

```bash
mvn spring-boot:run
```

Console H2:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:supportdesk`
- User: `sa`
- Password: vazio

## Validacao local

- `mvn validate`: executado com sucesso neste ambiente.
- `mvn test`: bloqueado localmente porque a maquina esta com JRE sem `javac`; os testes e a estrutura Maven ficaram prontos para rodar assim que houver JDK.
