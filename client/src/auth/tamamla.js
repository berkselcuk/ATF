import axios from 'axios'
import config from '../config.json'

const onayla = async (idd)=> {
    axios.post(config.serverPath+"tamamla", { id: idd }).then(response => console.log()).catch(err=> console.log(err));
}




export default onayla;
