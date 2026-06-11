import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header/header";
import Mesas from "../../components/Mesas/mesas";
import Dashboard from "../../components/Dashboard/dashboard";
import Convidados from "../../components/Convidados/convidados";
import Acompanhantes from "../../components/Acompanhantes/acompanhantes";
import Checkin from "../../components/Check-in/checkin";


const Home = () => {
    const [telaAtiva, setTelaAtiva] = useState('dashboard')
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    }, [])
    return (
        <>
        <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}/>
        <main>
            {telaAtiva === 'mesa' ? <Mesas/> : ''}
            {telaAtiva === 'dashboard' ? <Dashboard/> : ''}
            {telaAtiva === 'convidado' ? <Convidados/> : ''}
            {telaAtiva === 'acompanhante' ? <Acompanhantes/> : ''}
            {telaAtiva === 'checkin' ? <Checkin/> : ''}

        </main>
        </>
    )
}

export default Home;