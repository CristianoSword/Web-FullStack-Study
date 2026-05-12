# 06 - EventBus (Notifier)

Um sistema de barramento de eventos (Event Bus) genrico e fortemente tipado, utilizando padres de projeto avançados.

## Conceitos Aplicados
- **Mapped Types**: Uso de `Record` e mapeamento de chaves para payloads específicos.
- **Generics**: Funes que inferem o tipo do payload com base na chave do evento.
- **Observer Pattern**: Implementao do padrão de observador para desacoplamento de componentes.
- **Higher-Order Types**: Tipagem complexa para garantir que eventos emitidos correspondam aos handlers registrados.

## Como Executar
1. Instale as dependncias:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```
