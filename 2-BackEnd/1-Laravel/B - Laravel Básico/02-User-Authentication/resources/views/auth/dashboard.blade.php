@extends('layout')

@section('title', 'Dashboard')

@section('content')
    <div class="nav">
        <form action="{{ route('logout') }}" method="POST" style="display: inline;">
            @csrf
            <button type="submit" style="width: auto; padding: 5px 15px;">Sair</button>
        </form>
    </div>

    <h2>Bem-vindo, {{ $user->name }}!</h2>
    <p><strong>Email:</strong> {{ $user->email }}</p>
    <p><strong>Conta criada em:</strong> {{ $user->created_at->format('d/m/Y H:i') }}</p>

    <div style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 4px;">
        <h3>Status da Autenticação</h3>
        <p>✓ Você está autenticado com sucesso!</p>
        <p>✓ Sessão ativa e segura.</p>
    </div>
@endsection
