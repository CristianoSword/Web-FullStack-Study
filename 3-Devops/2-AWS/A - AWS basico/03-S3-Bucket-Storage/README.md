# 03-S3-Bucket-Storage Laboratory

Este laboratório faz parte dos estudos fullstack voltados para **AWS**.

## 📋 Descrição do Projeto
03 s3 bucket storage focado em implementar práticas recomendadas de DevOps, otimização e arquiteturas escaláveis.

## 🏗️ Estrutura do Código
- **src/models/schema.js** / **k8s/** / **terraform/**: Definições de estruturas, manifestos e variáveis.
- **src/services/core-engine.js**: Lógica principal simulando operações DevOps ou infraestrutura.
- **src/main.js** / **scripts/**: Endpoints de validação, execução e roteamento.
- **src/test.js** / **validation.sh**: Testes automatizados e verificações de integridade.

## 🚀 Como Executar e Validar

### Pré-requisitos
- Node.js (v18 ou superior) ou ferramentas IaC instaladas de acordo com a stack.

### Execução Local
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor / scripts:
   ```bash
   npm start
   ```
3. Execute a bateria de testes de validação:
   ```bash
   npm test
   ```

## 🛠️ Detalhes de DevOps & Melhores Práticas
- **Segurança**: Variáveis sensíveis gerenciadas via arquivos de ambiente.
- **Resiliência**: Tratamento detalhado de erros com relatórios de status.
- **Logs**: Rastreamento estruturado de atividades.
