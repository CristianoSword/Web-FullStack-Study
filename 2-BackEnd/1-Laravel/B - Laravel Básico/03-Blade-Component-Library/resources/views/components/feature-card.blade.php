<article class="feature-card">
    <p class="feature-highlight">{{ $service->highlight }}</p>
    <h3>{{ $service->title }}</h3>
    <p>{{ $service->description }}</p>

    <ul class="feature-list">
        @foreach ($service->bullets as $bullet)
            <li>{{ $bullet }}</li>
        @endforeach
    </ul>
</article>
