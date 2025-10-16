<?php
    require_once("vendor/autoload.php");

    $client = new \WebSocket\Client("ws://100.93.139.18:3000");

    $client->text("test");
    $message = $client->receive();
    echo $message;
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<div>
<form action="index.php" method="post">
    <input type="submit" onclick="alert('Hello World')" value="Click me" >
</form>
</div>

</body>
</html>

