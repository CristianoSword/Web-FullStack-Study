<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Autenticação')</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; }
        .alert { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .alert-success { background: #d4edda; color: #155724; }
        .alert-error { background: #f8d7da; color: #721c24; }
        form { margin: 20px 0; }
        label { display: block; margin: 10px 0 5px; }
        input[type="text"], input[type="email"], input[type="password"] { 
            width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; 
        }
        button { 
            width: 100%; padding: 10px; background: #007bff; color: white; border: none; 
            border-radius: 4px; cursor: pointer; margin-top: 10px; 
        }
        button:hover { background: #0056b3; }
        .nav { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #ddd; }
        .nav a { margin-right: 10px; text-decoration: none; color: #007bff; }
        .nav a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>@yield('title', 'Autenticação')</h1>
    
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if($errors->any())
        <div class="alert alert-error">
            @foreach($errors->all() as $error)
                {{ $error }}<br>
            @endforeach
        </div>
    @endif

    @yield('content')
</body>
</html>
