@extends('layout')

@section('title', 'Login')

@section('content')
    <div class="nav">
        <a href="{{ route('register') }}">Não tem conta? Registre-se</a>
    </div>

    <form action="{{ route('login.post') }}" method="POST">
        @csrf
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Senha:</label>
        <input type="password" name="password" required>
        
        <button type="submit">Entrar</button>
    </form>
@endsection
