|<?php
	$pdo = new PDO('mysql:host=localhost; dbname = dbax', 'root', 'senha');
	
	//Insert
	if(isset($_GET['delete'])){
		$id = (int)$_GET['delete'];
		$pdo->exec("DELTE FROM clientes WHERE id = $id");
		echo 'Deletado com sucesso o id: '.$id;
	}
	if(isset($_GET['nome'])){
		$sql = $pdo->prepare("INSERT INTO clientes VALUES (null,?,?)");
		$sql->execute(array($_POST['nome'],$_POST['email']));
		echo 'Inserido com sucesso!';
	}
	
	//Update
	$nome = 'Cristiano';
	$pdo->exec("update clientes set nome= $nome where id=10");
?>

<form method = "post">
	<input type="text" name="nome">
	<input type="text" name="email">
	<input type="submit" name="Enviar">
</form>

<?php 
	$sql = $pdo->prepare("SELECT * FROM clientes");
	$sql->execute();
	
	$fetchClientes = $sql->fetchAll();
	
	foreach($fetchClientes as $key => $value) {
		echo '<a href="?delete='.$value['id'].'"?>(X) </a>'.$value['nome'].' | '.$value['email'];
		echo '<hr>';
	}
?>