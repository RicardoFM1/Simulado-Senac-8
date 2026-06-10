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
        $query = $this->db->query('SELECT c.data_e_hora, c.status, u.nome as email_usuario, u.sobrenome as sobrenome_usuario, u.cpf as cpf_usuario,
        co.nome as nome_convidado, co.sobrenome as sobrenome_convidado, co.cpf as cpf_convidado, co.id_convidado
        FROM checkin c INNER JOIN usuario u ON c.usuario_idusuairo = u.id_usuario INNER JOIN convidado co ON c.convidado_idconvidado = co.id_convidado');

        $query->execute();
        $resultado = [];

        while($row = $query->fetch()){
            $data = new DateTime($row['data_e_hora']);
            $dataFormatada = $data->format('d/m/Y H:i:s');

            $resultado[] = [
                'id_convidado' => $row['id_convidado'],
                'data_e_hora' => $dataFormatada,
                'status' => $row['status'],
                'usuario' => [
                    'nome' => $row['nome_usuario'],
                    'sobrenome' => $row['sobrenome_usuario'],
                    'cpf' => $row['cpf_usuario']
                ],
                'convidado' => [
                    'nome' => $row['nome_convidado'],
                    'sobrenome' => $row['sobrenome_convidado'],
                    'cpf' => $row['cpf_convidado']
                ]
            ];
        }

        return [
            'sucesso' => true,
            'dados' => $resultado
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
