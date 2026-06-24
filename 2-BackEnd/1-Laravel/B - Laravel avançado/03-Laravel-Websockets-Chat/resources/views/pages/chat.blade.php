@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Private channels</span>
        <h1>Dashboard de chat com salas privadas e presenca simulada</h1>
        <p>Uma interface de estudo para organizar canais, participantes e historico de mensagens em uma base pronta para evoluir com Echo e broadcasting.</p>
    </section>

    <section class="chat-layout">
        <aside class="rooms-card">
            <h2>Salas</h2>

            <div class="room-list">
                @foreach ($rooms as $room)
                    <article class="room-item {{ $activeRoom?->id === $room->id ? 'room-item-active' : '' }}">
                        <strong>{{ $room->name }}</strong>
                        <span>{{ strtoupper($room->visibility) }}</span>
                    </article>
                @endforeach
            </div>
        </aside>

        <section class="timeline-card">
            <div class="timeline-header">
                <div>
                    <span class="eyebrow">Canal ativo</span>
                    <h2>{{ $activeRoom?->name }}</h2>
                </div>
                <span class="presence-pill">{{ strtoupper($activeRoom?->visibility ?? 'private') }}</span>
            </div>

            <div class="message-list">
                @forelse ($messages as $message)
                    <article class="message-item">
                        <div>
                            <strong>{{ $message->author }}</strong>
                            <span>{{ $message->sentAt }}</span>
                        </div>
                        <p>{{ $message->body }}</p>
                    </article>
                @empty
                    <p class="empty-state">Nenhuma mensagem ainda para esta sala.</p>
                @endforelse
            </div>
        </section>

        <aside class="members-card">
            <h2>Participantes</h2>

            <div class="member-list">
                @foreach ($participants as $participant)
                    <article class="member-item">
                        <strong>{{ $participant->name }}</strong>
                        <span>{{ $participant->role }} · {{ $participant->presence }}</span>
                    </article>
                @endforeach
            </div>
        </aside>
    </section>
@endsection
