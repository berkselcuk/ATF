import React, { useContext} from 'react'
import { AppContext } from '../context'
function RaporTRow() {
    const { dispatchTalepler } = useContext(AppContext)
    const { user } = useContext(AppContext)
    const {raporTaleplerFiltered} = useContext(AppContext)
    const onayla = (id,name,durum) => {
        if (durum > 0)
        {
            dispatchTalepler('ONAYLA_TALEP',id,name)
        }
        else {
            alert('Talep aktif değil!')
        }
    }

    const tamamla = (id, durum) => {
        if (durum > 0)
        {
            dispatchTalepler('TAMAMLA_TALEP',id)
        }
        else {
            alert('Talep aktif değil!')
        }
    }

    const toggleDurum = (id, durum)=>{
        dispatchTalepler('DURUM_TALEP',id+'/'+durum)
    }
    return (
        <tbody>
            {raporTaleplerFiltered.reverse().map(talep => {
                const kayitTar = talep.kayitTarihi.split('T')
                const teslimTar=talep.teslimTarihi.split('T')
                return (
                    <tr className='tr' key={talep.id}>
                        <th  scope="row">{talep.id}</th>
                        <td >{talep.talepEden}</td>
                        <td >{talep.projeAdi}</td>
                        <td >{talep.projeSorumlusu}</td>
                        <td >{talep.urunAdi}</td>
                        <td >{talep.urunAciklama}</td>
                        <td >{talep.birimFiyat}₺</td>
                        <td >{talep.adet}</td>
                        <td >{talep.toplamFiyat}₺</td>
                        <td >{kayitTar[0]}</td>
                        <td >{teslimTar[0]}</td>
                        <td ><a href={talep.link} target='_blank'>LINK</a></td>
                        <td >
                            {
                                talep.durum > 0 ?talep.durum>1?<p style={{color:'green'}}>Tamamlandı</p>:
                                    <p style={{ color: 'green' }}>AKTIF <br/>  {user[0].yetki>2?<button className='btn btn-danger' onClick={()=>toggleDurum(talep.id,0)}>PASIF</button>:null}</p> :
                                    <p style={{ color: 'red' }}>PASIF <br/> {user[0].yetki>2?<button className='btn btn-success' onClick={()=>toggleDurum(talep.id,1)}>AKTIF</button>:null} </p>
                            }
                        </td>
                        <td >
                            {
                                talep.onay > 0?
                                    <details style={{ color: 'green' }}><summary>Onaylandı</summary><p style={{ color: 'black' }}>{talep.onaylayan}</p>{user[0].yetki > 2 && talep.durum<2 ? <button onClick={() => tamamla(talep.id, talep.durum)} className='btn btn-success'>TAMAMLA</button>:null }</details> :
                                    <p style={{ color: 'orange' }}>Bekliyor <br /> {user[0].yetki>1?<button onClick={()=>onayla(talep.id,user[0].name,talep.durum)} className='btn btn-success'>ONAYLA</button>:null}</p>
                                
                            }

                        </td>
                    </tr>
                       
                )
                
                
            })}
                
            </tbody>

    )
}
export default RaporTRow;