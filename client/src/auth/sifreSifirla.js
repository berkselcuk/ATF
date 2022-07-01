import axios from 'axios'
import config from '../config.json'

function sifreSifirla(username) {
  axios.post(config.serverPath+'sifresifirla', {
        username:username
  }, {
    withCredentials: true,
  }).then((response) => {
            const data = response.data;
            if(data.error === 0){
              console.log(data)
            }
            else if(data.error === 1){
                alert('Kullanıcı adı yanlış!')
            }
        }).catch(err => {
          console.log(err)
        })
}




export default sifreSifirla;




