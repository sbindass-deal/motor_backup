import React from 'react'
import { useEffect } from 'react'
import CarRaffle from './CarLottery'
import axios from "axios";
import CryptoJS from "crypto-js";
import {useParams} from 'react-router-dom'
export default function ReffarallinkFile(props) {
  const { id } = useParams();

 useEffect(()=>{

 const updated_id=id.replaceAll("g_s","/");
  


 var bytes = CryptoJS.AES.decrypt(updated_id, 'my-gas-guzzelers@123');
 var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

//  alert(decryptedData.lottery_id)
  axios
      .post(process.env.REACT_APP_URL + "addrefers", {
        lottery_id: decryptedData.lottery_id,
        encryptedValue: updated_id,
      })
      .then((res) => {
        console.log("find data"+JSON.stringify(res))
      });
 },[id])
  return (
    <CarRaffle />
  )
}
