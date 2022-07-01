import React, { useState,  useContext } from 'react'
import { AppContext } from '../context'
import '../css/Form.css'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
function TalepForm() {
    const [talepEden, setTalepEden] = useState('')
    const [projeAdi, setProjeAdi] = useState('')
    const [projeSorumlusu, setProjeSorumlusu] = useState('')
    const [urunAdi, setUrunAdi] = useState('')
    const [urunAciklamasi, setUrunAciklamasi] = useState('')
    const [birimFiyat, setBirimFiyat] = useState('')
    const [adet, setAdet] = useState('')
    const [toplamFiyat,setToplamFiyat] = useState('')
    const [teslimTarihi, setTeslimTarihi] = useState()
    const [link, setLink] = useState('')
    const [teslimTarihii, setTeslimTarihii] = useState(null)
    const [fiyatHesaplandi, setFiyatHesaplandi] = useState(false)
    const { dispatchTalepler } = useContext(AppContext)
    const { user } = useContext(AppContext)
    const [userGeldi,setUserGeldi] = useState(0)
    const handleAddTalep = (e) => {
        e.preventDefault();
        toplamFiyatHesapla()
        
    }
    if (userGeldi < 1) {
        setTalepEden(user[0].name)
        setUserGeldi(userGeldi+1)
    }
    const toplamFiyatHesapla = (e) => {
        setToplamFiyat(birimFiyat * adet)
        setFiyatHesaplandi(true)
    }
    if (fiyatHesaplandi) {
        const talep ={id:Math.random(),talepEden,projeAdi,projeSorumlusu,urunAdi,urunAciklamasi,birimFiyat,adet,toplamFiyat,teslimTarihi,link}
        dispatchTalepler('ADD_TALEP', { newTalep: talep })
        setFiyatHesaplandi(false)
    }
    return (
        <form onSubmit={handleAddTalep}>
            <div className='leftForm'>
                <input value={urunAdi} onChange={(e)=>{setUrunAdi(e.target.value)}} type="text" className="form-control"   placeholder="Ürün Adı" required/>
                <textarea value={urunAciklamasi} onChange={(e)=>{setUrunAciklamasi(e.target.value)}} className="form-control" maxLength='200' rows="2" placeholder="Ürün Açıklaması/Firma Bilgisi"></textarea>
                <input value={birimFiyat} onChange={(e) => {setBirimFiyat(e.target.value)}} type="number" min="0.00" max="10000.00" step="0.05" placeholder='Birim Fiyat' />
                <input value={adet} onChange={(e) => {setAdet(e.target.value)}} type="number" min="1" max="10000" step="1" placeholder='Adet' required />
            </div>
            <div className='rightForm'>
                <input value={projeAdi} onChange={(e)=>{setProjeAdi(e.target.value)}} type="text" className="form-control"  placeholder="Proje Adı" required/>
                <input value={projeSorumlusu} onChange={(e)=>{setProjeSorumlusu(e.target.value)}} type="text" class="form-control" placeholder="Proje Sorumlusu" required/>
                <input value={link} onChange={(e)=>{setLink(e.target.value)}} type="text" className="form-control" placeholder="Ürün Linki" />
                <DatePicker selected={teslimTarihii} withPortal minDate={new Date()}  showDisabledMonthNavigation dateFormat='dd.MM.yyyy' placeholderText='Teslim Tarihi' onChange={(date) => {
                    setTeslimTarihi(Moment(date).format('DD.MM.yyyy'))
                    setTeslimTarihii(date)
 
                }} />
                <button type='submit' className="btn btn-primary mb-2 fl-left" >Ekle</button>
                
            </div>
        </form>
    )
}
export default TalepForm;