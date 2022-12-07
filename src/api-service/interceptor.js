import axios from "axios";
import { authToken} from '../redux/reducers/login'

console.log(989,authToken)

axios.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {

        req.headers.Authorization = authToken ? `Bearer ${authToken}` : "";
    } else {
        
    }
    return req;
},
    (err) => {
        return Promise.reject(err)
    }
);