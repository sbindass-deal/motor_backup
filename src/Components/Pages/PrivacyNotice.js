import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import SmallSpinner from "../UI/SmallSpinner";
import axios from "axios";
import { strToHtml } from "../UI/globaleVar";
function PrivacyPolicy() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_URL}getPages`, {
      page: "privacy_policy"
    })
      .then(response => {
        console.log(898000099, response.data.data)
        setData(response.data.data);
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className='container'>
      <div className="row">
        <div className="col-12 mt-5">
          {isLoading ? <SmallSpinner spin={true} /> :

            <p>{
              parse(data?.description, strToHtml)
            }</p>


          }

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
