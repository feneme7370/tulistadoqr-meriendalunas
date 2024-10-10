import axios from "axios";
import { urlBack } from "@/helpers/config";

// al llamar a api, tomara la url referenciada, sirve para services
const api = axios.create({
    baseURL : urlBack()+'api/',
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'origin': 'http://www.conxn.co.in',
        // 'Access-Control-Allow-Origin': '*'
    }
})

export default api