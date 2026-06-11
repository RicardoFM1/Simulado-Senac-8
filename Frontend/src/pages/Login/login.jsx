
import style from "./login.module.css"
import imagemCasamento from "../../assets/imagemCasamento.png"
import logoCasamento from "../../assets/logoCasamento.png"

import {Button, Form, InputGroup, Stack} from "react-bootstrap"
import { useEffect, useState } from "react"
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Api from "../../service/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"


const Login = () => {
    const [formData, setFormData] = useState({
        email: "", senha: ""
    })
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target

        if(!name) return;

        setFormData((prev) => ({...prev, [name]: value}));
    }


    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/')
        }
    }, [])
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await Api.post('/usuario/login', formData)

            if(res.status === 200){
                toast.success('Usuário logado com sucesso')
                localStorage.clear()
                localStorage.setItem('token', res.data.token)
                navigate('/')
            }
        }catch(err){
            toast.error(err.response?.data?.mensagem || 'Erro ao enviar dados')
        }
    }

    return (
        <div className={style.loginDiv}>
            <div className={style.divFoto}>
                <img className={style.foto} src={imagemCasamento} alt="Imagem casamento"/>
            </div>
            <div className={style.divForm}>
                <div className={style.divHeaderForm}>

                <img src={logoCasamento} className={style.logo} alt="Logo casamento" />
                <h1>Senac Wedding</h1>
                <h5 className="py-2">Seu portal de casamentos</h5>
                </div>
                <hr className="w-75 mt-0 mb-4"/>

                <Form className="w-75" onSubmit={handleSubmit}>
                    <Stack gap={5}>

                <Stack gap={4}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                    <InputGroup.Text><MdEmail/></InputGroup.Text>
                    <Form.Control
                    value={formData.email}
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder="Seu melhor email"/>
                    </InputGroup>
                </Form.Group>

                 <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <InputGroup>
                    <InputGroup.Text><RiLockPasswordFill/></InputGroup.Text>
                    <Form.Control
                    value={formData.senha}
                    name="senha"
                    onChange={handleChange}
                    type={mostrarSenha ? 'text' : 'password'}
                    required
                    placeholder="Sua senha"/>
                    <Button className="bg-transparent border" type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>{mostrarSenha ? <FaEye color="black"/> : <FaEyeSlash color="black" />}</Button>
                    </InputGroup>
                </Form.Group>
                </Stack>
                <Stack>
                    
                <Button className={style.botaoSubmit} type="submit">Login</Button>
                </Stack>
                    </Stack>
                </Form>
            </div>
        </div>
    )
}

export default Login;