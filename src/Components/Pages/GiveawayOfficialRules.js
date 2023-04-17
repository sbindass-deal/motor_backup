import axios from 'axios';
import React, { useEffect, useState } from 'react'
import parse from "html-react-parser";
import { strToHtml } from '../UI/globaleVar';

function GiveawayOfficialRules() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}getPrivacyPolicy`)
      .then(response => {
        console.log(898000099, response.data.data)
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    
    <div>
      {
        data?.map((curVal, i) => {
          console.log(197989,curVal)
          return <>
            <p>{
              parse(curVal?.description, strToHtml)
            }</p>
          </>
        })
}

    </div>
  )
}

export default GiveawayOfficialRules