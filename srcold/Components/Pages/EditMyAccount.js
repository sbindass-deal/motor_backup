import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EditMyAccount() {
  const url = process.env.REACT_APP_URL;
  const reduxValue = useSelector((data) => data.login.user);

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [editUser, setEditUser] = useState({
    name: reduxValue.name,
    userName: reduxValue.username,
    email: reduxValue.email,
    phone: reduxValue.phone,
  });
  const handleEditOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    if (Name === "phone") {
      Value = e.target.value.replace(/\D/g, "");
    }
    setEditUser({ ...editUser, [Name]: Value });
  };

  const handleApi = (e) => {
    e.preventDefault();
    const { name, userName, phone } = editUser;

    axios
      .post(`${url}users`, {
        user_id: reduxValue.id,
        id: reduxValue.id,
        email: reduxValue.email,
        username: userName,
        phone: phone,
        name: name,
      })
      .then((result) => {
        notify("Edit Successfully!");
      })
      .catch((error) => {
        console.log(error);
        notify("Edit fail somthing wrong please try again !");
      });
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <ul className="sideBar__">
                  <li>
                    <Link to="/accountinfo" className="active">
                      Account Info
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="notifications">Notifications</Link>
                  </li> */}
                  <li>
                    <Link to="/listings">My Listings</Link>
                  </li>
                  <li>
                    <Link to="/bidswins">My Bids & Wins</Link>
                  </li>
                  <li>
                    <Link to="/myshipments">My Shipments</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3>Enter Your Gas Guzzlrs User Info</h3>
              <hr />
              <form onSubmit={handleApi}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        name="name"
                        value={editUser.name}
                        onChange={handleEditOnChange}
                        onKeyPress={(event) => {
                          if (!/[a-zA-Z]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        minLength={2}
                        maxLength={31}
                        className="field"
                        placeholder="name"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={editUser.email}
                        onChange={handleEditOnChange}
                        minLength={5}
                        maxLength={31}
                        type="email"
                        name="email"
                        className="field"
                        placeholder="Email"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>User Name</label>
                      <input
                        value={editUser.userName}
                        onChange={handleEditOnChange}
                        type="text"
                        name="userName"
                        minLength={4}
                        maxLength={15}
                        className="field"
                        placeholder="Username"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={editUser.phone}
                        onChange={handleEditOnChange}
                        type="text"
                        minLength={10}
                        maxLength={12}
                        name="phone"
                        className="field"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <button type="submit" className="gry_btn mt-3">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditMyAccount;
