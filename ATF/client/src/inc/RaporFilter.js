import React, { useState, useContext} from 'react'
import { AppContext } from '../context'
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import moment from 'moment';
function RaporTRow() {
    const _exporter = React.createRef();

    const exportExcel = () => {
    if (_exporter.current) {
        _exporter.current.save();
    }
  };
    const [talepEden, setTalepEden] = useState('');
    const [projeAdi, setProjeAdi] = useState('');
    const [durum, setDurum] = useState('');
    const [onay, setOnay] = useState('');
    const { dispatchTalepler } = useContext(AppContext)
    const {raporTaleplerFiltered} = useContext(AppContext)


    const filtrele = (e) =>{
        e.preventDefault()
        const filterConfig = [];
        if (talepEden.length > 0) {
            filterConfig.push({
                type: "/te",
                search: talepEden.toLocaleLowerCase()
            });
        }
        if (projeAdi.length > 0) {
            filterConfig.push({
                type: "/pa",
                search: projeAdi.toLocaleLowerCase()
            });
        }
        if (durum.length > 0 && durum >= 0) {
            filterConfig.push({
                type: "/d",
                search: durum+""
            });
        }
        if (onay.length > 0 && onay >= 0) {
            filterConfig.push({
                type: "/o",
                search: onay+""
            });
        }
        dispatchTalepler("FILTER_TALEP", filterConfig);
    }




    
    return (
        <div>
        <form className='form-filter' onSubmit={(e)=>filtrele(e)}>
            <input value={talepEden} onChange={(e)=>setTalepEden(e.target.value)} type='text' placeholder='Talep Eden'></input>
            <input value={projeAdi} onChange={(e)=>setProjeAdi(e.target.value)} type='text' placeholder='Proje Adı'></input>
            <select onChange={(e)=>setDurum(e.target.value)} class="custom-select my-1 mr-sm-2">
                <option value='-1'>DURUM</option>
                <option value='1'>AKTIF</option>
                <option value='0'>PASIF</option>
                <option value='2'>TAMAMLANDI</option>
            </select>
            <select onChange={(e)=>setOnay(e.target.value)} class="custom-select my-1 mr-sm-2">
                <option value='-1'>ONAY</option>
                <option value='0'>BEKLIYOR</option>
                <option value='1'>ONAYLANDI</option>
            </select>
            <button type='submit' className='btn btn-warning' style={{ color: 'white' }}>FILTRELE</button>
            <button type='button' onClick={()=>exportExcel()}  className='btn btn-success' style={{color:'white'}}>EXPORT</button>
            </form>
            <ExcelExport
        data={raporTaleplerFiltered.map(item => ({...item,kayitTarihi:moment(item.kayitTarihi).format("DD.MM.YYYY")}))}
        fileName={new Date().toUTCString()+'-RAPOR'+'.xlsx'}
        ref={_exporter}
      >
        <ExcelExportColumn
          field="ID"
          title="ID"
        />
        <ExcelExportColumn
          field="talepEden"
          title="Talep Eden"
                />
        <ExcelExportColumn
          field="projeAdi"
          title="Proje Adı"
        />
        <ExcelExportColumn
          field="projeSorumlusu"
          title="Proje Sorumlusu"
                />
        <ExcelExportColumn
          field="urunAdi"
          title="Ürün Adı"
        />
        <ExcelExportColumn
          field="urunAciklamasi"
          title="Ürün Açıklaması / Firma Bilgisi"
                />
        <ExcelExportColumn
          field="birimFiyat"
          title="Birim Fiyat"
        />
        <ExcelExportColumn
          field="adet"
          title="Adet"
                />
        <ExcelExportColumn
          field="toplamFiyat"
          title="Toplam Fiyat"
          locked={true}
        />
        <ExcelExportColumn
          field="kayitTarihi"
          title="Kayıt Tarihi"
                />
        <ExcelExportColumn
          field="teslimTarihi"
          title="Teslim Tarihi"
          locked={true}
        />
        <ExcelExportColumn
          field="link"
          title="link"
                />
      </ExcelExport>
    </div>
    )
}
export default RaporTRow;