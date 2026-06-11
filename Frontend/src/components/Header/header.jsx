import { Button, Dropdown, Navbar, Stack } from "react-bootstrap";
import logoCasamento from "../../assets/logoCasamento.png"
import style from "./header.module.css"
import { useNavigate } from "react-router";
import { IoMenuSharp } from "react-icons/io5";

const Header = ({ telaAtiva, setTelaAtiva }) => {
    const navigate = useNavigate();
    const handleSair = () => {
        localStorage.clear()
        navigate('/login')

    }
    return (
        <Navbar className={style.navbar}>


            <Navbar.Brand>

                <div className={style.divBrand}>


                    <img src={logoCasamento} className={style.logo} alt="Logo casamento" />
                    <h3 className="mx-4 py-0">Senac Wedding</h3>
                </div>
            </Navbar.Brand>

            <div className={style.botoesMeio}>
                <Button onClick={() => setTelaAtiva('dashboard')} className={telaAtiva === 'dashboard' ? style.botaoAtivo : ''}>Dashboard</Button>
                <Button onClick={() => setTelaAtiva('convidado')} className={telaAtiva === 'convidado' ? style.botaoAtivo : ''}>Convidados</Button>
                <Button onClick={() => setTelaAtiva('acompanhante')} className={telaAtiva === 'acompanhante' ? style.botaoAtivo : ''}>Acompanhantes</Button>
                <Button onClick={() => setTelaAtiva('mesa')} className={telaAtiva === 'mesa' ? style.botaoAtivo : ''}>Mesas</Button>

            </div>

            <div className={style.botoesFim}>
                <Button onClick={() => setTelaAtiva('checkin')} className={style.botaoCheckin}>Check-in</Button>
                <Button className={style.botaoSair} onClick={handleSair}>Sair</Button>

            </div>

            
                <Dropdown className="d-flex d-xl-none mx-0 my-0 px-0" drop="start">
                    <Dropdown.Toggle className={style.dropdownToggle}>
                        <IoMenuSharp size={25} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item >
                            <Stack gap={3} className={style.dropdownItens}>

                                <Button onClick={() => setTelaAtiva('dashboard')}>Dashboard</Button>
                                <Button onClick={() => setTelaAtiva('convidado')} >Convidados</Button>
                                <Button onClick={() => setTelaAtiva('acompanhante')}>Acompanhantes</Button>
                                <Button onClick={() => setTelaAtiva('mesa')} >Mesas</Button>
                                <Button onClick={() => setTelaAtiva('checkin')}>Check-in</Button>
                                <Button className="bg-transparent border text-danger" onClick={handleSair}>Sair</Button>

                            </Stack>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            
        </Navbar>
    )
}
export default Header;