<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'File Harbor' }}</title>
    <link rel="stylesheet" href="{{ asset('css/site.css') }}">
</head>
<body>
    <main class="page-shell">
        @if (session('success'))
            <section class="flash-success">{{ session('success') }}</section>
        @endif

        @yield('content')
    </main>
</body>
</html>
