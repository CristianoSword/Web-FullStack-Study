# 05-Custom-Annotation-Processor

Projeto multi-modulo para anotacoes customizadas Java, processador em tempo de compilacao e app demo com scanner runtime.

## O que foi implementado

- Modulo `annotations` com `@TrackedComponent` e `@TrackedOperation`.
- Modulo `processor` com `AbstractProcessor` que valida classes anotadas e gera `GeneratedTrackingIndex`.
- Service loader do processor em `META-INF/services/javax.annotation.processing.Processor`.
- Modulo `demo-app` com servicos anotados e leitura do indice gerado.
- Scanner runtime por reflexao para comparar metadados gerados e anotacoes em execucao.
- Teste do scanner no app demo.

## Estrutura

- `annotations/`: definicoes das anotacoes compartilhadas.
- `processor/`: validacao, geracao de codigo e processador de anotacoes.
- `demo-app/`: classes anotadas, scanner runtime, leitor do indice e `Main`.

## Como rodar

Quando houver JDK instalado:

```bash
mvn test
```

Depois da compilacao, o app demo pode imprimir o scan runtime e o indice gerado:

```bash
java -cp demo-app/target/classes study.java.annotation.demo.Main
```

## Validacao local

- `mvn validate`: executado com sucesso, incluindo a estrutura multi-modulo.
- Compilacao completa e geracao do codigo anotado exigem JDK com `javac`; o ambiente atual possui apenas JRE.
