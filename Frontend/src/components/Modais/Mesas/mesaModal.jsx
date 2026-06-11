import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap"
import style from "./mesaModal.module.css"

const MesaModal = ({ dados, show, submit, handleClose }) => {
    const [formData, setFormData] = useState({
        capacidade: "", restricao: ""
    })

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        if (dados) {
            setEditando(true)
            setFormData(dados)
        } else {
            setEditando(false)
            setFormData({
                capacidade: "", restricao: ""
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
                    <Modal.Title>{editando ? 'Gerenciar mesa' : "Registrar nova mesa"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Label>Capacidade</Form.Label>
                            <Form.Control
                                placeholder="Capacidade da mesa"
                                name="capacidade"
                                value={formData.capacidade}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Restrição</Form.Label>
                            <Form.Control
                                placeholder="Restrição da mesa"
                                name="restricao"
                                value={formData.restricao}
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

export default MesaModal;