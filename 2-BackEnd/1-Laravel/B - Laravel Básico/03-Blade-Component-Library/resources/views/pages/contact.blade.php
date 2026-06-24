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

        <form class="contact-form">
            <label>
                Nome
                <input type="text" name="name" placeholder="Seu nome">
            </label>

            <label>
                Email
                <input type="email" name="email" placeholder="voce@empresa.com">
            </label>

            <label>
                Objetivo
                <select name="goal">
                    <option>Landing page</option>
                    <option>Site institucional</option>
                    <option>Biblioteca de componentes</option>
                </select>
            </label>

            <label>
                Desafio atual
                <textarea name="message" rows="5" placeholder="Conte o que precisa evoluir"></textarea>
            </label>

            <button type="submit" class="button button-primary">Enviar interesse</button>
        </form>
    </section>
@endsection
