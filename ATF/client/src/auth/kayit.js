import axios from 'axios'
import config from '../config.json'

function aktar(username,password,name,yetki) {
    axios.post(config.serverPath+"kayit", {
        username:username,
        password:password,
        name:name,
        yetki:yetki
    }, {
    withCredentials: true,
    }).then(response => {
      const data = response.data
      if (data.errNo === 1062) {
        alert('Kullanıcı adı mevcut!')
      }
      else if (data.errNo === 0) {
        alert('Kayıt başarılı!')
      }
      else {
         console.log(data)
      }

    }).catch(err => console.log(err));
  
}




export default aktar;
