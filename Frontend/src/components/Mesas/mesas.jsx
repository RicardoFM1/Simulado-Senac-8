import { useEffect, useState } from "react";
import Api from "../../service/api";
import { Button, Form } from "react-bootstrap";
import style from "./mesas.module.css"
import Tabela from "../Tabela/tabela";
import { IoIosArrowForward } from "react-icons/io";
import MesaModal from "../Modais/Mesas/mesaModal";
import { toast } from "react-toastify";


const Mesas = () => {
    const [mesas, setMesas] = useState([])
    const [show, setShow] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState([])

    const buscarMesas = async () => {
        try {
            const res = await Api.get('/mesa')

            if (res.status === 200) {
                setMesas(res.data.dados)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        buscarMesas()
    }, [])

    const columns = [
        { header: 'Nº', accessor: 'id_mesa' },
        { header: 'Capacidade', accessor: 'capacidade' },
        { header: 'Restrição', accessor: 'restricao' },
        {
            header: "", accessor: "", render: (row) => (
                <IoIosArrowForward />
            )
        }
    ]

    const handleClick = (row) => {
        setMesaSelecionada(row)
        setShow(true)
    }

    const handleNovo = () => {
        setShow(true)
        setMesaSelecionada(null)
    }

    const handleFechar = () => {
        setShow(false)
        setMesaSelecionada(null)
        buscarMesas()
    }

    const enviarDados = async (dados) => {
        try {
            let res;

            if (mesaSelecionada) {
                res = await Api.put(`/mesa?id_mesa=${mesaSelecionada.id_mesa}`, dados)

                if (res.status === 200) {
                    toast.success('Mesa atualizada com sucesso')
                    handleFechar()
                }
            } else {
                res = await Api.post(`/mesa`, dados)

                if (res.status === 201) {
                    toast.success('Mesa registrada com sucesso')
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

                    <h1 >Mesas</h1>
                    <p className="fs-5">{mesas.length ?? 0} Mesas listadas</p>
                    <p>Clique na linha da tabela para editar/ver detalhes</p>

                </div>
                <Button className={style.botaoAdicionar} onClick={handleNovo}>Adicionar novo registro</Button>
            </div>
            <Tabela columns={columns} rows={mesas} keyField={'id_mesa'} handleClick={handleClick} />
            <MesaModal show={show} dados={mesaSelecionada} submit={enviarDados} handleClose={handleFechar} />
        </>
    )
}

export default Mesas;