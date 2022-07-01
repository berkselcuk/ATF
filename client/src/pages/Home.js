import React, {  useState ,useContext,useEffect} from 'react'
import privateApiUsing from '../auth/privateApiUsing';
import Header from '../inc/Header'
import Rapor from '../inc/Rapor'
import Talep from '../inc/Talep'
import Ayar from '../inc/Ayar'
import '../css/Form.css'
import { MainContext } from '../store/Store'
import { AppContext } from '../context'
import aktar from '../auth/aktar'
import onayla from '../auth/onayla'
import durum from '../auth/durum'
import tamamla from '../auth/tamamla'
import jwt_decode from "jwt-decode";
import GetData from '../auth/getData';
const taleplerr = [
    {
        id:1,
        talepEden:'',
        projeAdi:'',
        projeSorumlusu:'',
        urunAdi:'',
        urunAciklamasi:'',
        birimFiyat:'',
        adet: '',
        toplamFiyat:'',
        teslimTarihi:'',
        link:''
    }
]

const raporTaleplerr = [{
        id:1,
        talepEden:'',
        projeAdi:'',
        projeSorumlusu:'',
        urunAdi:'',
        urunAciklamasi:'',
        birimFiyat:'',
        adet: '',
        toplamFiyat: '',
        kayitTarihi:'',
        teslimTarihi:'',
        link: '',
        durum: '',
        onay:''
}]


const userr = [
    {
        id: '',
        name: '',
        yetki: '',
        geldi: false
    }
]
function Home() {
    const [talepSayi,setTalepSayi] = useState(1)
    const [talepler, setTalepler] = useState(taleplerr);
    const [raporTalepler, setRaporTalepler] = useState(raporTaleplerr);
    const [raporTaleplerFiltered,setRaporTaleplerFiltered] = useState(raporTaleplerr)
    const [user,setUser]=useState(userr)
    const dispatchTalepler = async(actionType, payload,name) => {
        switch (actionType) {
            case 'ADD_TALEP':
                setTalepler([...talepler, payload.newTalep])
                setTalepSayi(talepSayi + 1)
                return;
            case 'REMOVE_TALEP':
                setTalepler(talepler.filter(talep => talep.id !== payload.id))
                setTalepSayi(talepSayi - 1)
                return;
            case 'FILTER_TALEP':
                let newRaporTalepler = raporTalepler.filter(item => {
                    let result = true;
                    if (payload.find(item => item.type === "/te")) {
                        const find = payload.find(item => item.type === "/te");
                        result = result && item.talepEden.toLowerCase().includes(find.search)
                    }
                    if (payload.find(item => item.type === "/pa")) {
                        const find = payload.find(item => item.type === "/pa");
                        result = result && item.projeAdi.toLowerCase().includes(find.search)
                    }
                    if (payload.find(item => item.type === "/o")) {
                        const find = payload.find(item => item.type === "/o");
                        result = result && item.onay.toString().includes(find.search)
                    }
                    if (payload.find(item => item.type === "/d")) {
                        const find = payload.find(item => item.type === "/d");
                        result = result && item.durum.toString().includes(find.search)
                    }
                    return result;
                });
                setRaporTaleplerFiltered(newRaporTalepler);
                break;
                return;
            case 'AKTAR_TALEP':
                talepler.map(talep => {
                    aktar(talep)
                    window.location.href='/'
                })
                return;
            case 'ONAYLA_TALEP':
                onayla(payload,name)
                window.location.href='/'
                return;
            case 'TAMAMLA_TALEP':
                tamamla(payload)
                window.location.href='/'
                return;
            case 'DURUM_TALEP':
                const id = payload.split('/')[0]
                const durumm = payload.split('/')[1]
                durum(id, durumm)
                window.location.href = '/'
                return;
            default:
                return;
        }
    }
    if (!userr.geldi) {
        const decoded = jwt_decode(localStorage.getItem('token'))
        userr[0].id = decoded.id
        userr[0].name = decoded.name
        userr[0].yetki=decoded.yetki
    }
    const { state } = useContext(MainContext)
    const [privateData, setPrivateData] = useState({});
        useEffect(() => {
            const fetchData = async () => {
                const data = await privateApiUsing();
                const talep = await GetData();
                setPrivateData(data);
                setRaporTalepler(talep)
                setRaporTaleplerFiltered(talep)
                console.log(talep)
                if (data.error === 1) {
                    window.location.href='/login'
                }
            };
            fetchData();
        }, []);

    return (
        <div id="home-container">
        
            <AppContext.Provider value={{ user, talepSayi, talepler,raporTalepler,raporTaleplerFiltered, dispatchTalepler }}>
                    <Header />
            <div id="container">
                {state[0].header === 'home' ? <Rapor /> : null}
                {state[0].header==='talep'?<Talep />:null}
                {state[0].header==='ayar'?<Ayar/>:null}
 
                </div>
            </AppContext.Provider>
            

        </div>
    )
}
export default Home;