<?php

use Dotenv\Dotenv;

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../Controllers/Usuario/usuarioController.php";
require_once __DIR__ . "/../Controllers/Mesa/mesaController.php";


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE');

$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'OPTIONS') {
    http_response_code(200);
    echo 'ok';
    exit;
}

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

if ($rota === '/usuario') {
    $controller = new UsuarioController();

    if ($metodo === 'GET') {
        $controller->listarUsuarios();
    }

    if ($metodo === 'POST') {
        $controller->criarUsuario();
    }

    if ($metodo === 'PUT') {
        $controller->atualizarUsuario();
    }

    if ($metodo === 'DELETE') {
        $controller->deletarUsuario();
    }
}

if ($rota === '/usuario/login') {
    $controller = new UsuarioController();


    if ($metodo === 'POST') {
        $controller->fazerLogin();
    }
}


if ($rota === '/mesa') {
    $controller = new MesaController();

    if ($metodo === 'GET') {
        $controller->listarMesas();
    }

    if ($metodo === 'POST') {
        $controller->criarMesa();
    }

    if ($metodo === 'PUT') {
        $controller->atualizarMesa();
    }

    if ($metodo === 'DELETE') {
        $controller->deletarMesa();
    }
}
