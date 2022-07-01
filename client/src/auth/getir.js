import axios from 'axios'
import config from '../config.json'

async function getir(username) {
  const response = await axios.get(config.serverPath+"getir/"+username, {
    withCredentials: true,
  });
  const data = response.data
  return data;
  
}


export default getir;