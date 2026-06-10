# PHP Util Package

Biblioteca utilitária PHP com funções comuns para manipulação de strings, arrays e datas.

## 🚀 Funcionalidades

### StringUtil
- `slugify()`: Converte strings em formato slug
- `truncate()`: Trunca strings com sufixo customizável
- `random()`: Gera strings aleatórias
- `maskEmail()`: Mascara emails para privacidade
- `contains()`: Verifica se uma string contém outra

### ArrayUtil
- `flatten()`: Achata arrays multidimensionais
- `pluck()`: Extrai valores de arrays por chave
- `where()`: Filtra arrays com callback
- `first()`: Retorna o primeiro elemento que satisfaz uma condição
- `groupBy()`: Agrupa arrays por chave
- `shuffle()`: Embaralha arrays

### DateUtil
- `ago()`: Retorna tempo relativo (ex: "2 hours ago")
- `isWeekend()`: Verifica se é fim de semana
- `isWeekday()`: Verifica se é dia de semana
- `startOfDay()`: Retorna início do dia
- `endOfDay()`: Retorna fim do dia
- `diffInDays()`: Calcula diferença em dias

## 📦 Instalação

```bash
composer require study/php-util-package
```

Ou localmente:

```bash
composer install
```

## 🧪 Executar Testes

```bash
vendor/bin/phpunit
```

## 💻 Exemplos de Uso

### StringUtil
```php
use Study\Util\StringUtil;

echo StringUtil::slugify('Hello World'); // hello-world
echo StringUtil::truncate('Long text here', 5); // Long...
echo StringUtil::random(16); // string aleatória de 16 chars
echo StringUtil::maskEmail('john@example.com'); // jo***@example.com
```

### ArrayUtil
```php
use Study\Util\ArrayUtil;

$array = [1, [2, [3, 4]], 5];
$flat = ArrayUtil::flatten($array); // [1, 2, 3, 4, 5]

$users = [['name' => 'John'], ['name' => 'Jane']];
$names = ArrayUtil::pluck($users, 'name'); // ['John', 'Jane']
```

### DateUtil
```php
use Study\Util\DateUtil;

$date = new \DateTime('-2 hours');
echo DateUtil::ago($date); // 2 hours ago

$today = new \DateTime();
echo DateUtil::isWeekend($today) ? 'Weekend' : 'Weekday';
```

## 📁 Estrutura do Projeto

```
04-PHP-Composer-Package/
├── src/
│   ├── StringUtil.php
│   ├── ArrayUtil.php
│   └── DateUtil.php
├── tests/
│   ├── StringUtilTest.php
│   ├── ArrayUtilTest.php
│   └── DateUtilTest.php
├── composer.json
├── phpunit.xml
└── README.md
```

## 📝 Licença

MIT
