<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tipos</title>
</head>
<body>
    <h1>Tipos primitivos 🖖</h1>
    &#128512;
    <br>
    <?php
        $num = 341;
        echo "o valor de num é $num";
        echo "<br>";       

        $num2 = (int)3.14;
        var_dump($num2);
        echo "<br>";

        $casado = false;
        print "a var casado tem o valor de $casado"; //false emecho/print sao apresentados como nulo ou vazio

        //sintaxe Heredoc
        $curso = "PHP";
        $ano = date('Y');
        echo "<br>";

        echo<<< FRASE
                Estou estudando
                    $curso em $ano
        FRASE;
    ?>
</body>
</html>