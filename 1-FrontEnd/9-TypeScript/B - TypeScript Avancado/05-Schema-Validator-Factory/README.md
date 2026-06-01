# 🔍 05 – Schema Validator Factory

Gerador de validadores de runtime baseados em tipos **TypeScript** estáticos. Valida dados contra schemas definidos com tipos discriminados, com rastreamento de path para erros precisos.

## 🚀 Como executar

```bash
npm install
npm run dev     # executa com ts-node (sem compilar)
npm run build   # compila TypeScript para dist/
npm run start   # executa o JS compilado
```

## 🎨 Recursos

- **Validação recursiva**: Suporta objetos aninhados e arrays de qualquer profundidade
- **Tipos suportados**: `string`, `number`, `boolean`, `object`, `array`
- **Restrições por tipo**: `minLength`/`maxLength`/`pattern` (string), `min`/`max` (number)
- **Path de erro**: `ValidationError` inclui o caminho completo do campo inválido (ex: `user.address.zip`)
- **Campos opcionais**: Campos sem `required: true` são ignorados se ausentes

## 📚 Conceitos TypeScript Avançados

- **Discriminated Unions**: `type Schema = StringSchema | NumberSchema | ...` com narrowing via `schema.type`
- **Generics**: `validate<T>(schema, data): T` para tipagem do retorno
- **Exhaustiveness check**: `const _exhaustive: never = schema` garante cobertura total do switch
- **Recursive types**: `ObjectSchema.properties: Record<string, Schema>` e `ArraySchema.items: Schema`
- **Custom Error class**: `ValidationError extends Error` com propriedade `path: string[]`
- **Type narrowing**: TypeScript infere o subtipo correto dentro de cada `case` do switch

## 📁 Estrutura

```
05-Schema-Validator-Factory/
├── src/
│   ├── schema/
│   │   ├── types.ts      # Interfaces e union types do schema
│   │   └── validator.ts  # Lógica de validação recursiva
│   └── index.ts          # Demonstração de uso
├── dist/                 # JS compilado
├── tsconfig.json
└── package.json
```
