import CryptoJS from "crypto-js";

export const incVal = (val) => {
   const newVal = CryptoJS.AES.encrypt(val, process.env.REACT_APP_API_KEY)
    return newVal.toString()
} 
