# 03-Reactive-Java-Project

Pipeline de fulfillment assincrono e nao-bloqueante usando Project Reactor para validar pedidos, reservar estoque, aplicar precificacao e separar falhas em dead-letter.

## O que foi implementado

- Ingestao de lotes com `Sinks.Many` e `Flux`.
- Validacao reativa de comandos de pedido.
- Reserva de estoque e enriquecimento de preco com `Mono` assinado em paralelo.
- Dead-letter para pedidos invalidos ou sem pagamento confirmado.
- CLI para rodar um cenario de sucesso parcial e imprimir o relatorio.
- Testes com `StepVerifier` cobrindo batch invalido e reuso da pipeline.

## Estrutura

- `model/`: comandos, eventos, pedidos enriquecidos e relatorio final.
- `service/EventValidator.java`: validacao reativa de entrada.
- `service/InventoryGateway.java`: simulacao nao-bloqueante de reserva.
- `service/PricingGateway.java`: calculo reativo de subtotal, desconto e total.
- `service/ReactiveFulfillmentPipeline.java`: fluxo principal com `Flux`, `Mono` e dead-letter.
- `ReactiveScenarioConsole.java`: cenario de demonstracao e impressao do relatorio.
- `Main.java`: entrypoint do projeto.
- `src/test/.../ReactiveFulfillmentPipelineTest.java`: testes com Reactor Test.

## Como rodar

```bash
java -cp target/classes study.java.reactive.Main
```

Opcionalmente, o modo `--success-only` roda apenas os pedidos validos do cenario.

## Validacao local

- `mvn validate`: executado com sucesso neste ambiente.
- `mvn test`: requer JDK com compilador (`javac`); o ambiente atual possui apenas JRE, mas o projeto e os testes ja estao preparados.
