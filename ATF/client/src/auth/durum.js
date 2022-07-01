import axios from 'axios'
import config from '../config.json'

const durum = async (idd,durumm)=> {
    axios.post(config.serverPath+"durum", { id: idd , durum : durumm}).then(response => console.log()).catch(err=> console.log(err));
}




export default durum;
