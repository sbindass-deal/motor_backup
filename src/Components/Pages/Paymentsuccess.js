import React from "react";
import { Button, Result } from "antd";
import "./PaymentrSuccess.css";
import { useNavigate } from "react-router-dom";
const Paymentsuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>Thank you !</h1>
            <p>Thanks for subscribing to our news letter. </p>
            <p>you should receive a confirmation email soon </p>
            <button onClick={navigate("/")} className="go-home">
              Go to home
            </button>
            <button onClick={navigate("/carraffle")} className="go-home">
              By more tickets
            </button>
          </div>
          {/* <div className="footer-like">
      <p>Email not received?
       <a href="#">Click here to send again</a>
      </p>
    </div> */}
        </div>
      </div>
    </>
  );
};

export default Paymentsuccess;
