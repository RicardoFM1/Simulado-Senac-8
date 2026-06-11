
import style from "./login.module.css"
import imagemCasamento from "../../assets/imagemCasamento.png"
import {Form} from "react-bootstrap"
const Login = () => {
    return (
        <div className={style.loginDiv}>
            <div className={style.divFoto}>
                <img className={style.foto} src={imagemCasamento} alt="Imagem casamento"/>
            </div>
            <div className={style.divForm}>
                <Form>

                </Form>
            </div>
        </div>
    )
}

export default Login;