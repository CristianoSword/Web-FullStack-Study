@extends('layouts.app')

@section('content')
    <section class="page-intro">
        <span class="section-kicker">Contato</span>
        <h1>Converse com a equipe e traga o contexto do seu projeto</h1>
        <p>Um formulario simples pode virar a base para um fluxo de qualificacao mais rico nas proximas iteracoes.</p>
    </section>

    <section class="contact-layout">
        <div class="contact-card-stack">
            @foreach ($contactChannels as $channel)
                <article class="contact-card">
                    <span>{{ $channel->label }}</span>
                    <strong>{{ $channel->value }}</strong>
                    <p>{{ $channel->availability }}</p>
                </article>
            @endforeach
        </div>

        <form class="contact-form" method="POST" action="{{ route('site.contact.submit') }}">
            @csrf

            <label>
                Nome
                <input type="text" name="name" value="{{ old('name') }}" placeholder="Seu nome">
                @error('name')
                    <small class="field-error">{{ $message }}</small>
                @enderror
            </label>

            <label>
                Email
                <input type="email" name="email" value="{{ old('email') }}" placeholder="voce@empresa.com">
                @error('email')
                    <small class="field-error">{{ $message }}</small>
                @enderror
            </label>

            <label>
                Objetivo
                <select name="goal">
                    @foreach (['Landing page', 'Site institucional', 'Biblioteca de componentes'] as $goal)
                        <option value="{{ $goal }}" @selected(old('goal') === $goal)>{{ $goal }}</option>
                    @endforeach
                </select>
                @error('goal')
                    <small class="field-error">{{ $message }}</small>
                @enderror
            </label>

            <label>
                Desafio atual
                <textarea name="message" rows="5" placeholder="Conte o que precisa evoluir">{{ old('message') }}</textarea>
                @error('message')
                    <small class="field-error">{{ $message }}</small>
                @enderror
            </label>

            <button type="submit" class="button button-primary">Enviar interesse</button>
        </form>
    </section>
@endsection
