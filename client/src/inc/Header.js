import React,{useContext,useState} from 'react'
import '../css/header.css'
import { MainContext } from '../store/Store'
import { updateHeader } from '../actions/updateHeader'
import { AppContext } from '../context'
import isbakLogo from '../img/isbak_logo.png'
const ft = false;
function Header() {
    const { dispatch } = useContext(MainContext)
    const { state } = useContext(MainContext)
    const { user } = useContext(AppContext)
    const { dispatchTalepler } = useContext(AppContext)
    const [ftt,setFtt] = useState(ft)
    if (!ftt) {
        dispatchTalepler('REMOVE_TALEP', { id: 1 })
        setFtt(true)
    }
    const Logout = ()=>{
        localStorage.clear();
    }
    return (
                        <div className="header">
                <a className="logo-a" href="#"><img className="logo" src={isbakLogo} alt="Logo" /></a>
            <h4 className='header-name'>{user[0].name}</h4>
            <h4 className='header-yetki'>{user[0].yetki>1?user[0].yetki>2?<p style={{color:'blue'}}>Admin</p>:<p style={{color:'orange'}}>Moderatör</p>:<p style={{color:'green'}}>Kullanıcı</p>}</h4>
            <div className="header-right">

                    <a onClick={()=>dispatch(updateHeader('home'))} className={state[0].header==='home'?'active':''} href="#">Rapor <i className="fa fa-file-alt" /></a>
                    <a onClick={()=>dispatch(updateHeader('talep'))} className={state[0].header==='talep'?'active':''} href="#">Talep <i className="fas fa-arrow-up"></i></a>
                    <a onClick={()=>dispatch(updateHeader('ayar'))} className={state[0].header==='ayar'?'active':''} href="#">Ayar <i className="fas fa-cog"></i></a>
                    <a href="#about" onClick={Logout}>Çıkış <i className="fa fa-sign-out-alt"/></a>
                </div>
        </div>)
}
export default Header;