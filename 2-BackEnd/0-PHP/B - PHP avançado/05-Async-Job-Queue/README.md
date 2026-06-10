# Async Job Queue

Fila de processamento de tarefas em background assíncrona baseada em CLI.

## 🚀 Funcionalidades

- Sistema de fila de jobs baseado em arquivos JSON
- Worker assíncrono para processamento de jobs
- Jobs customizáveis através de herança
- CLI para adicionar e processar jobs
- Suporte a múltiplos tipos de jobs

## 📦 Instalação

```bash
composer install
```

## 💻 Uso

### Adicionar Jobs à Fila

```bash
php queue.php
```

### Processar Jobs (Worker)

```bash
php worker.php
```

## 📁 Estrutura do Projeto

```
05-Async-Job-Queue/
├── src/
│   ├── Job.php          # Classe abstrata base para jobs
│   ├── Queue.php        # Gerenciador de fila
│   └── Worker.php       # Worker assíncrono
├── jobs/
│   ├── SendEmailJob.php # Exemplo de job de email
│   └── ProcessImageJob.php # Exemplo de job de imagem
├── storage/            # Armazenamento dos jobs (JSON)
├── queue.php           # Script para adicionar jobs
├── worker.php          # Script para processar jobs
└── composer.json
```

## 📝 Criar Jobs Customizados

```php
<?php
namespace App\Jobs;

use App\Job;

class MyCustomJob extends Job
{
    public function handle(): void
    {
        $data = $this->getPayloadValue('data');
        // Sua lógica aqui
        echo "Processing: {$data}\n";
    }
}
```

## 🔧 Adicionar Job à Fila

```php
use App\Queue;
use App\Jobs\MyCustomJob;

$queue = new Queue(__DIR__ . '/storage');
$queue->push(new MyCustomJob(['data' => 'valor']));
```
