import axios from "axios";
import { } from '../redux/reducers/login'


axios.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {

        req.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    }
})