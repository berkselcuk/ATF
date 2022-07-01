import React from 'react'
import RaporTRow from './RaporTRow'
import RaporFilter from './RaporFilter'
function Rapor() {
    return (
        <div>
            <RaporFilter/>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Talep Eden</th>
                    <th scope="col">Proje Adı</th>
                    <th scope="col">Proje Sorumlusu</th>
                    <th scope="col">Ürün İsmi</th>
                    <th scope="col">Ürün Açıklaması/Firma Bilgisi</th>
                    <th scope="col">Birim Fiyat</th>
                    <th scope="col">Adet</th>
                    <th scope="col">Toplam Fiyat</th>
                    <th scope="col">Kayıt Tarihi</th>
                    <th scope="col">Teslim Tarihi</th>
                    <th scope="col">Ürün Linki</th>
                    <th scope="col">Durum</th>
                    <th scope="col">Onay</th>
                    </tr>
                </thead>
                <RaporTRow/>
            </table>
        </div>
    )
}
export default Rapor;