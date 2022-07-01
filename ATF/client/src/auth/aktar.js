import axios from 'axios'
import config from '../config.json'
const aktar = async (talep)=> {
    axios.post(config.serverPath+"aktar",talep).then(response => console.log()).catch(err=> console.log(err));
}




export default aktar;
