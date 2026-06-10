<?php
date_default_timezone_set('America/Sao_Paulo');
use Firebase\JWT\JWT;

require_once __DIR__ . "/../../Connection/connection.php";


class CheckinService
{
    protected $db;

    public function __construct()
    {
        $this->db = db();
    }

   


    public function listarCheckins()
    {
        $query = $this->db->query('SELECT * FROM checkin');

        $query->execute();

        $checkins = $query->fetchAll();

        return [
            'sucesso' => true,
            'dados' => $checkins
        ];
    }

    public function criarCheckin($checkinDados, $jwt)
    {
        try {

            $buscar = $this->db->prepare("SELECT * FROM convidado WHERE id_convidado = :id_convidado");

            $buscar->execute([
                ':id_convidado' => $checkinDados['convidado_idconvidado']
            ]);

            $convidado = $buscar->fetch();

            if(empty($convidado)){
                throw new Exception('Convidado não encontrado', 404);
            }

            if($convidado['confirmacao'] === 'confirmado'){
                throw new Exception('Convidado já confirmado', 409);
            }

            $dataFormatada = date('Y-m-d H:i:s');

            $criar = $this->db->prepare('INSERT INTO checkin (usuario_idusuario, convidado_idconvidado, status, data_e_hora) 
            VALUES (:usuario_idusuario, :convidado_idconvidado, :status, :data_e_hora)');

            $criar->execute([
                ':usuario_idusuario' => $jwt->dados->id_usuario,
                ':convidado_idconvidado' => $checkinDados['convidado_idconvidado'],
                ':status' => 'realizado',
                ':data_e_hora' => $dataFormatada
            ]);

            $atualizarConvidado = $this->db->prepare('UPDATE convidado SET confirmacao = :confirmacao WHERE id_convidado = :id_convidado');

            $atualizarConvidado->execute([
                ':confirmacao' => 'confirmado',
                ':id_convidado' => $checkinDados['convidado_idconvidado']
            ]);

            return [
                'sucesso' => true,
                'mensagem' => 'Check-in criado com sucesso'
            ];
        } catch (PDOException $e) {
            if (str_contains($e->getMessage(), 'convidado_idconvidado')) {
                throw new Exception('Check-in já realizado', 409);
            }

            if (str_contains($e->getMessage(), 'fk_checkin_convidado')) {
                throw new Exception('Convidado referenciado não encontrado', 409);
            }

            if (str_contains($e->getMessage(), 'fk_checkin_usuario')) {
                throw new Exception('Usuário referenciado não encontrado', 409);
            }

            throw new Exception('Erro ao tentar criar check-in', 500);
        }
    }

 
}
