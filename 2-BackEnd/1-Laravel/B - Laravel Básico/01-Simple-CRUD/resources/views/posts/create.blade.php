@extends('layout')

@section('title', 'Novo Post')

@section('content')
    <a href="{{ route('posts.index') }}" class="btn btn-primary">Voltar</a>
    
    <form action="{{ route('posts.store') }}" method="POST">
        @csrf
        
        <label>Título:</label>
        <input type="text" name="title" required>
        
        <label>Autor:</label>
        <input type="text" name="author" required>
        
        <label>Conteúdo:</label>
        <textarea name="content" required></textarea>
        
        <button type="submit" class="btn btn-success">Salvar</button>
    </form>
@endsection
