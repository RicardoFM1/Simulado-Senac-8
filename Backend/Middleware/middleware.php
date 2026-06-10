<?php

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Middleware
{
    public static function validarMiddleware()
    {
        try {

            $token = [];

            if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
                $token = $_SERVER['HTTP_AUTHORIZATION'];
            }

            if (isset($_SERVER['AUTHORIZATION'])) {
                $token = $_SERVER['AUTHORIZATION'];
            }

            if (empty($token)) {
                http_response_code(401);
                echo json_encode([
                    'sucesso' => false,
                    'mensagem' => 'Usuário não autenticado'
                ]);
                exit;
            }

            $tokenPartes = explode(' ', $token);

            if (count($tokenPartes) !== 2) {
                http_response_code(401);
                echo json_encode([
                    'sucesso' => false,
                    'mensagem' => 'Token inválido'
                ]);
                exit;
            }

            $jwt = JWT::decode($tokenPartes[1], new Key($_ENV['CHAVE_SECRETA'], 'HS256'));

            return $jwt;

            
        } catch (ExpiredException $e) {
            http_response_code(401);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Token expirado'
            ]);
            exit;
        }
    }
}
