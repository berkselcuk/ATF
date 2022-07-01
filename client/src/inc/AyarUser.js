import React, { useState,  useContext } from 'react'
import '../css/Form.css'
import { AppContext } from '../context';
import sifreDegistir from '../auth/sifreDegistir';
function AyarUser() {
    const [eskiSifre, setEskiSifre] = useState();
    const [yeniSifre, setYeniSifre] = useState();
    const [yeniSifreTekrar, setYeniSifreTekrar] = useState();
        const { user } = useContext(AppContext)
    const sifreDegistirr = (e) => {
        if (yeniSifre === yeniSifreTekrar) {
            sifreDegistir(user[0].id, eskiSifre, yeniSifre)
            alert('Şifre başarıyla değiştirildi!')
        }
        else {
            alert('Yeni şifreniz aynı değil!')
        }
    }
    return (
        <form className='form-ayar' onSubmit={sifreDegistirr}>
            <h1>Şifre Değiştir</h1>
                <input value={eskiSifre} onChange={(e)=>{setEskiSifre(e.target.value)}} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Eski Şifre" required/>
                <input value={yeniSifre} onChange={(e)=>{setYeniSifre(e.target.value)}} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Yeni Şifre" required />
                <input value={yeniSifreTekrar} onChange={(e)=>{setYeniSifreTekrar(e.target.value)}} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Yeni Şifre Tekrar" required/>
            <button type='submit' style={{marginLeft:'10%'}} className="btn btn-primary mb-2 fl-left" >Şifre Değiştir</button>
        </form>
    )
}
export default AyarUser;