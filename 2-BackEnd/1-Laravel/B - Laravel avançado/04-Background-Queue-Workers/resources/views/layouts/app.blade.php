<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Queue Dispatch Lab' }}</title>
    <link rel="stylesheet" href="{{ asset('css/site.css') }}">
</head>
<body>
    <main class="page-shell">
        @if (session('success'))
            <section class="flash-card flash-success">{{ session('success') }}</section>
        @endif

        @if ($errors->any())
            <section class="flash-card flash-error">
                <strong>Revise os dados do lote antes de enviar.</strong>
                <ul>
                    @foreach ($errors->all() as $message)
                        <li>{{ $message }}</li>
                    @endforeach
                </ul>
            </section>
        @endif

        @yield('content')
    </main>
</body>
</html>
