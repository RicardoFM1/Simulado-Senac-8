import { useEffect, useState } from "react";
import Api from "../../service/api";
import { Button, Form } from "react-bootstrap";
import style from "./convidados.module.css"
import Tabela from "../Tabela/tabela";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import ConvidadoModal from "../Modais/Convidados/convidadoModal";


const Convidados = () => {
    const [convidados, setConvidados] = useState([])
    const [show, setShow] = useState(false)
    const [convidadoSelecionado, setConvidadoSelecionado] = useState([])

    const buscarConvidados = async () => {
        try {
            const res = await Api.get('/convidado')

            if (res.status === 200) {
                setConvidados(res.data.dados)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        buscarConvidados()
    }, [])

    const columns = [
        { header: 'Nome', accessor: 'nome' },
        { header: 'Sobrenome', accessor: 'sobrenome' },
        { header: 'Email', accessor: 'email' },
        { header: 'Cpf', accessor: 'cpf' },
        { header: 'Confirmação', accessor: 'confirmacao' },
        { header: 'Categoria', accessor: 'categoria' },
        { header: 'Telefone', accessor: 'telefone' },
        { header: 'Nº Mesa', accessor: 'mesa_idmesa' },

        {
            header: "", accessor: "", render: (row) => (
                <IoIosArrowForward />
            )
        }
    ]

    const handleClick = (row) => {
        setConvidadoSelecionado(row)
        setShow(true)
    }

    const handleNovo = () => {
        setShow(true)
        setConvidadoSelecionado(null)
    }

    const handleFechar = () => {
        setShow(false)
        setConvidadoSelecionado(null)
        buscarConvidados()
    }

    const enviarDados = async (dados) => {
        try {
            let res;

            if (convidadoSelecionado) {
                res = await Api.put(`/convidado?email_convidado=${convidadoSelecionado.email}`, dados)

                if (res.status === 200) {
                    toast.success('Convidado atualizado com sucesso')
                    handleFechar()
                }
            } else {
                res = await Api.post(`/convidado`, dados)

                if (res.status === 201) {
                    toast.success('Convidado registrado com sucesso')
                    handleFechar()
                }
            }
        } catch (err) {
            const erros = err.response?.data?.erros

            if (erros) {
                Object.values(erros).forEach((msg) => (
                    toast.error(msg)
                ))
            } else {
                toast.error(err.response?.data?.mensagem || 'Erro ao enviar dados')
            }
        }
    }

    return (
        <>
            <div>

                <div className="mx-5 my-5">

                    <h1 >Listagem de convidados</h1>
                    <p className="fs-5">{convidados.length ?? 0} Convidados listados</p>
                    <p>Clique na linha da tabela para editar/ver detalhes</p>

                </div>
                <Button className={style.botaoAdicionar} onClick={handleNovo}>Adicionar novo registro</Button>
            </div>
            <Tabela columns={columns} rows={convidados} keyField={'id_convidado'} handleClick={handleClick} />
            <ConvidadoModal show={show} dados={convidadoSelecionado} submit={enviarDados} handleClose={handleFechar} />
        </>
    )
}

export default Convidados;