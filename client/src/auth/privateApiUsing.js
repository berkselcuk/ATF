import axios from "axios"
import config from '../config.json'

const privateApiUsing = async () => {
    const res = await axios.get(config.serverPath+"privateApi", {
        headers: {
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    });
    return res.data;
}
export default privateApiUsing;