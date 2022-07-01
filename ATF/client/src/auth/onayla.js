import axios from 'axios'
import config from '../config.json'

const onayla = async (idd,name)=> {
    axios.post(config.serverPath+"onayla", { id: idd, name : name}).then(response => console.log()).catch(err=> console.log(err));
}




export default onayla;
