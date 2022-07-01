import axios from 'axios'
import config from '../config.json'

function Loginf(username, password) {
  
  debugger;
  console.log(config.serverPath);
  axios.post(config.serverPath+'auth', {
        userName:username,
        password:password
  }, {
    withCredentials: true,
  }).then((response) => {
    
  debugger;
 
            const data = response.data;
            if(data.error === 0){
              localStorage.setItem('token', data.token)
              window.location = "/"
              console.log(data.user)
            }
            else if(data.error === 1){
                alert('Kullanıcı adı veya şifre yanlış!')
            }
            else if(data.error === 2){
                alert('Kullanıcı adı ve şifre girin!')
    }

  }).catch(err => {
  debugger;
          console.log(err)
        })
}




export default Loginf;




