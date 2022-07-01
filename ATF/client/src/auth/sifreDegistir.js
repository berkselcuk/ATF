import axios from 'axios'
import config from '../config.json'

function sifreDegistir(id, password,newPassword) {
  axios.post(config.serverPath+'sifredegistir', {
        id:id,
        password: password,
        newpassword: newPassword
  }, {
    withCredentials: true,
  }).then((response) => {
            const data = response.data;
            if(data.error === 0){
            }
            else if (data.error === 1) {
              alert('Şifre yanlış!')
            }
        }).catch(err => {
          console.log(err)
        })
}




export default sifreDegistir;




