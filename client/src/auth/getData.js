import axios from 'axios'
import config from '../config.json'

const GetData = async ()=> {
  const res = await axios.get(config.serverPath+"data");
    return res.data;
}




export default GetData;




