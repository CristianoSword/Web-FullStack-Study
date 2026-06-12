@extends('layout')

@section('title', 'Registro')

@section('content')
    <div class="nav">
        <a href="{{ route('login') }}">Já tem conta? Faça login</a>
    </div>

    <form action="{{ route('register.post') }}" method="POST">
        @csrf
        
        <label>Nome:</label>
        <input type="text" name="name" required>
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Senha:</label>
        <input type="password" name="password" required>
        
        <label>Confirmar Senha:</label>
        <input type="password" name="password_confirmation" required>
        
        <button type="submit">Registrar</button>
    </form>
@endsection
