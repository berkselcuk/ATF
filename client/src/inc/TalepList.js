import React, { useContext } from 'react'
import '../css/Form.css'
import TalepListRow from './TalepListRow'
import { AppContext } from '../context';
function TalepList() {
    const { dispatchTalepler } = useContext(AppContext)
    const aktarTalep = () => {
        dispatchTalepler('AKTAR_TALEP', {id:2})
    }

    const { talepSayi } = useContext(AppContext)
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr className='tr'>
                    <th scope="col">Talep Eden</th>
                    <th scope="col">Proje Adı</th>
                    <th scope="col">Proje Sorumlusu</th>
                    <th scope="col">Ürün İsmi</th>
                    <th scope="col">Ürün Açıklaması/Firma Bilgisi</th>
                    <th scope="col">Birim Fiyat</th>
                    <th scope="col">Adet</th>
                    <th scope="col">Toplam Fiyat</th>
                    <th scope="col">Teslim Tarihi</th>
                    <th scope="col">Ürün Linki</th>
                    <th scope="col">Sil</th>
                        
                    </tr>
                </thead>
                    <TalepListRow/>
            </table>
            {talepSayi>0 ? <button onClick={aktarTalep} type='submit' className='btn-aktar btn btn-success'>Aktar</button> : null}
        </div>
    )
}
export default TalepList;