@extends('layout')

@section('title', 'Posts')

@section('content')
    <a href="{{ route('posts.create') }}" class="btn btn-primary">Novo Post</a>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @foreach($posts as $post)
                <tr>
                    <td>{{ $post->id }}</td>
                    <td>{{ $post->title }}</td>
                    <td>{{ $post->author }}</td>
                    <td>{{ $post->created_at->format('d/m/Y') }}</td>
                    <td>
                        <a href="{{ route('posts.show', $post) }}" class="btn btn-primary">Ver</a>
                        <a href="{{ route('posts.edit', $post) }}" class="btn btn-success">Editar</a>
                        <form action="{{ route('posts.destroy', $post) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Deletar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
