<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ ($title ?? 'Studio Aurora') . ' | ' . ($siteMeta['name'] ?? 'Studio Aurora') }}</title>
    <link rel="stylesheet" href="{{ asset('css/site.css') }}">
</head>
<body>
    <div class="page-shell">
        <header class="site-header">
            <div class="brand-block">
                <span class="brand-kicker">Laravel + Blade</span>
                <a href="{{ route('site.home') }}" class="brand-name">{{ $siteMeta['name'] ?? 'Studio Aurora' }}</a>
            </div>

            <nav class="site-nav" aria-label="Navegacao principal">
                @foreach ($navigation as $item)
                    <a
                        href="{{ route($item->routeName) }}"
                        class="nav-link {{ $item->primary ? 'nav-link-primary' : '' }}"
                    >
                        {{ $item->label }}
                    </a>
                @endforeach
            </nav>
        </header>

        <main class="site-main">
            @yield('content')
        </main>

        <footer class="site-footer">
            <div>
                <p class="footer-title">Contato direto</p>
                <p class="footer-copy">{{ $siteMeta['tagline'] ?? '' }}</p>
            </div>

            <div class="footer-channels">
                @foreach ($contactChannels as $channel)
                    <a href="{{ $channel->href }}" class="footer-channel">
                        <strong>{{ $channel->label }}</strong>
                        <span>{{ $channel->value }}</span>
                    </a>
                @endforeach
            </div>
        </footer>
    </div>
</body>
</html>
