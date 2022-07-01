import React, { useState,useEffect,  useContext } from 'react'
import '../css/Form.css'
import { AppContext } from '../context';
import yetkiDegistir from '../auth/yetkiDegistir'
import sifreSifirla from '../auth/sifreSifirla'
function AyarAdminInfo(props) {
    const [yetki, setYetki] = useState();
    const { user } = useContext(AppContext)
    const [editingUser, setEditingUser] = useState(props.editingUser);
    useEffect(() => setEditingUser(props.editingUser), [props.editingUser])
    const yetkiDegistirr = (username) => {
        if (user[0].yetki>=editingUser.yetki ) {
                    if (yetki) {
                            yetkiDegistir(username,yetki)
                        }
                        else {
                            alert('Yetki seçin!')
                        }
        }
        else {
            alert('Admin yetkisi değiştiremezsiniz!')
        }

    }

    const sifreSifirlaa = (username) => {
        if (user[0].yetki>=editingUser.yetki ) {
                sifreSifirla(username)
        }
        else {
            alert('Admin şifresi değiştiremezsiniz!')
        }
        
    }
    return (
        <div className='user-info'>
            <h1>Kullanıcı Adı  : {editingUser.username}</h1>
            <h1>İsim : {editingUser.name}</h1>
            <h1>Yetki {editingUser.yetki > 1 ? editingUser.yetki > 2 ? <h1 style={{ color: 'blue' }}>Admin</h1> : <h1 style={{ color: 'orange' }}>Moderatör</h1> : <h1 style={{ color: 'green' }}>Kullanıcı</h1>}</h1>
            <form>
                <select onChange={(e)=>{setYetki(e.target.value)}} class="custom-select my-1 mr-sm-2">
                    <option value='1'>Kullanıcı</option>
                    <option value='2'>Moderatör</option>
                    { user[0].yetki>2?<option value='3'>Admin</option>:null}
                </select>
                <button onClick={()=>yetkiDegistirr(editingUser.username)} className='btn btn-success'>Yetki Değiştir</button>
                <button onClick={()=>sifreSifirlaa(editingUser.username)} className='btn btn-danger'>Şifre Sıfırla (1234)</button>
            </form>
        </div>
    )
}
export default AyarAdminInfo;