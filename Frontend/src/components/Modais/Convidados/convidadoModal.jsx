import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap"
import style from "./convidadoModal.module.css"

const ConvidadoModal = ({ dados, show, submit, handleClose }) => {
    const [formData, setFormData] = useState({
        nome: "", sobrenome: "", email: "", cpf: "", confirmacao: "", categoria: "", telefone: "", mesa_idmesa: ""
    })

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        if (dados) {
            setEditando(true)
            setFormData({ ...dados, confirmacao: "" })
        } else {
            setEditando(false)
            setFormData({
                nome: "", sobrenome: "", email: "", cpf: "", confirmacao: "", categoria: "", telefone: "", mesa_idmesa: ""
            })
        }
    }, [dados, show])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (!name) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        submit(formData)
    }

    return (

        <Modal show={show} onHide={handleClose}  >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Gerenciar convidado' : "Registrar novo convidado"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                placeholder="Nome do convidado"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control
                                placeholder="Sobrenome do convidado"
                                name="sobrenome"
                                value={formData.sobrenome}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                placeholder="Email do convidado"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cpf</Form.Label>
                            <Form.Control
                                placeholder="Cpf do convidado"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                placeholder="Categoria do convidado"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                required={!editando}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="familia">Familia</option>
                                <option value="noivos">Noivos</option>
                                <option value="amigos">Amigos</option>
                                <option value="equipe">Equipe</option>




                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                placeholder="Telefone do convidado"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nº da mesa</Form.Label>
                            <Form.Control
                                placeholder="Nº da mesa do convidado"
                                name="mesa_idmesa"
                                value={formData.mesa_idmesa}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction="horizontal" gap={4}>

                        <Button className={style.botaoCancelar} onClick={handleClose} type="button">Cancelar</Button>
                        <Button className={style.botaoSubmit} type="submit">{editando ? 'Salvar alterações' : 'Registrar'}</Button>
                    </Stack>
                </Modal.Footer>
            </Form>
        </Modal>
    )

}

export default ConvidadoModal;