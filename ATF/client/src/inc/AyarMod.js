import React, { useState,  useContext } from 'react'
import '../css/Form.css'
import { AppContext } from '../context';
import kayit from '../auth/kayit'
function AyarMod() {
    const [userName, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [name, setName] = useState();
    const [yetki, setYetki] = useState();
    const { user } = useContext(AppContext)
    const kayitt = (e) => {
        if (yetki && yetki !== '0') {
            if (rePassword === password) {
                kayit(userName, password, name, yetki)
                window.location.href = '/';
            }
            else {
                e.preventDefault();
                alert('Girilen şifreler uyuşmuyor!')
            }
        }
        else {
            e.preventDefault();
            alert('Yetki seçin!')
        }
    }
    return (
        <form className='form-ayar'  onSubmit={kayitt}>
            <h1>KAYIT</h1>
                <input value={userName} onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Kullanıcı Adı" required/>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Şifre" required />
            <input value={rePassword} onChange={(e)=>{setRePassword(e.target.value)}} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Şifre Tekrar" required />
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="İsim" required />
            <select onChange={(e)=>{setYetki(e.target.value)}} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" placeholder='Yetki' required>
            <option value="0" >YETKI</option>
            <option value="1" >Kullanıcı</option>
            <option value="2">Moderatör</option>
            {user[0].yetki > 2 ? <option value="3">Admin</option> : null}
  </select>

            <button type='submit' style={{marginLeft:'10%'}} className="btn btn-primary mb-2 fl-left" >Kayıt</button>
        </form>
    )
}
export default AyarMod;