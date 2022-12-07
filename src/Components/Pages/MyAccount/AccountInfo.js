import React, { useEffect } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function AccountInfo() {
  const [userInfo, setUserinfo] = useState({
    username: "",
    email: " ",
  });
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data !== null || res.data.data !== undefined) {
        setUserinfo(res.data.data);
      }
    });
  }, []);

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Basic Info</h3>
              <hr />
              <ul className="labelList_">
                <li>
                  <div className="labelList_label">Email Address</div>
                  <div className="labelList_text">
                    {userInfo.email} <br />
                    <a href="#">Resend Verification Email</a>
                  </div>
                </li>
                <li>
                  <div className="labelList_label">Username</div>
                  <div className="labelList_text">{userInfo.username}</div>
                </li>
                <li>
                  <div className="labelList_label">Password</div>
                  <div className="labelList_text">****************</div>
                </li>
              </ul>
              <Link to="/editmyaccount" className="gry_btn mt-3">
                Edit My Account Info
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountInfo;
