import React, { useState } from 'react'
import '../css/Form.css'
import getir from '../auth/getir';
import AyarAdminInfo from './AyarAdminInfo';
function AyarAdmin() {
    const [userName, setUsername] = useState();
    const [dataGeldi, setDataGeldi] = useState(0);
    const [editingUser, setEditingUser] = useState();

    const getirr = async (e) => {
        e.preventDefault();
        const editingUser = await getir(userName);
        setEditingUser(editingUser)
        setDataGeldi(1)
    }
    
    return (
        <form className='form-ayar' onSubmit={getirr}>
            <div>
                <h1>Kullanıcı Düzenle</h1>
                <input value={userName} onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Kullanıcı Adı" required/>
                <button type='submit' style={{ marginLeft: '10%' }} className="btn btn-primary mb-2 fl-left" >Getir</button>
            </div>
            <div>
                {dataGeldi > 0 ? <AyarAdminInfo editingUser={editingUser}/>  : null}
            </div>
            
           
        </form>
    )
}
export default AyarAdmin;