import React,{useContext} from 'react'
import AyarUser from './AyarUser'
import AyarMod from './AyarMod';
import AyarAdmin from './AyarAdmin';
import { AppContext } from '../context'
function Ayar() {
       const { user } = useContext(AppContext)
    return (
        <div>
            <AyarUser />
            {user[0].yetki > 1 ? <AyarMod /> : null}
            {user[0].yetki>1?<AyarAdmin/>:null}
        </div>
    )
}
export default Ayar;