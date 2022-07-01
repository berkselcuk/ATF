import React, {  useContext } from 'react'
import { AppContext } from '../context';
function TalepListRow() {
    const { talepler } = useContext(AppContext)
    const { dispatchTalepler } = useContext(AppContext)
    const handleRemoveTalep = (talepId) => {
        dispatchTalepler('REMOVE_TALEP',{id : talepId})
    }
    return (
        <tbody>
            {talepler.map(talep => {
                return (
                    <tr key={talep.id} className='tr'> 
                        <td>{talep.talepEden}</td>
                        <td >{talep.projeAdi}</td>
                        <td >{talep.projeSorumlusu}</td>
                        <td >{talep.urunAdi}</td>
                        <td >{talep.urunAciklamasi}</td>
                        <td >{talep.birimFiyat}</td>
                        <td >{talep.adet}</td>
                        <td>{talep.toplamFiyat}</td>
                        <td >{talep.teslimTarihi}</td>
                        <td >{talep.link? <a href={talep.link} rel="noreferrer" target='_blank'>LINK</a> : 'YOK'}</td>
                        <td ><button onClick={()=>handleRemoveTalep(talep.id)} className='btn btn-danger'>Sil</button></td>
                    </tr>
                )
            })}
        
            </tbody>

    )
}
export default TalepListRow;