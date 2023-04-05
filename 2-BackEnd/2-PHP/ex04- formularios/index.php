<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
    <link rel="stylesheet" href="styles.css">

    <title>Form</title>
</head>
<body>
    <h1 color="white">Form</h1>
    <p color="white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi similique, nihil sit facilis tempore aperiam tenetur, veritatis voluptas, facere quis. Quibusdam, tenetur molestias? Quidem ab ad rem nobis quam.</p>
    <p >Data: <input type="text" id="calendario" /></p>

<div
>
    <input type="date">

    <section>
         <label for="hora-cons">Escolha o horário da consulta: </label>
         <input id="hora-cons" type="time" name="hora-cons" value="13:30">   
    </section>

</div>
    <header>
        <h1>Formulario</h1>
    </header>

    <section>
        <form action="cad.php" method="get">
            <label for="nome">Nome </label>
            <input type="text" name="nome" id="idnome">
            <label for="sobrenome">Sobrenome</label>
            <input type="text" name="sobrenome" id="idsobrenome">
            <input type="submit" value="Enviar">
        </form>
    </section>

   
</body>
</html>

<script>
$(function() {
    $( "#calendario" ).datepicker();
});
</script>