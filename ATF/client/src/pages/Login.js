import React,{useState,useContext} from 'react'
import '../css/login.css'
import login from '../auth/login-auth'
import loginPng from '../img/login.png'
function Login() {
    const [userName,setUserName] = useState('')
   const [password, setPassword] = useState('');
    const log=(event)=>{
      event.preventDefault();
      login(userName,password)
    }
    return (
        <div id="log-bg" className="wrapper fadeInDown">
        <div id="formContent">
              
          <div className="fadeIn first">
            <img src={loginPng} className="md-5" id="icon" alt="User Icon" />
          </div>
          <form onSubmit={log}>
            <input type="text" id="login" className="fadeIn second" name="username" placeholder="Kullanıcı Adı" onChange={(e)=>{
                setUserName(e.target.value);
            }}></input>
            <input type="password" id="password" className="fadeIn third" name="password" placeholder="Şifre" onChange={(e)=>{
                setPassword(e.target.value);
            }}></input>
            <input type="submit" className="fadeIn fourth" value="Giriş"></input>
          </form>
          <div id="formFooter">
            <p className="underlineHover" onClick={() => {
              alert('Lütfen moderatörünüze başvurunuz!');
            }}>Şifremi unuttum!</p>
          </div>
        </div>
      </div>
    )
}

export default Login;