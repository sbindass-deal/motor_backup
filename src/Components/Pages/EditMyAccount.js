import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../UI/FormInput";

function EditMyAccount() {
  const url = process.env.REACT_APP_URL;
  const reduxValue = useSelector((data) => data.login);

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
    name: reduxValue.user.name,
    userName: reduxValue.user.username,
    email: reduxValue.user.email,
    phone: reduxValue.user.mobile,
  });
  const handleEditOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    setEditUser({ ...editUser, [Name]: Value });
  };
const fetchUserDetails = async() => {
  try{
    const res = await axios.get(`${url}user`)
    console.log(res.data.data)
  }catch(err){
    console.log(err)
  }
}
useEffect(() => {
  fetchUserDetails()
}, [])

  const handleApi = (e) => {
    e.preventDefault();
    const { name, userName, phone } = editUser;

    axios
      .post(`${url}users`, {
        user_id: reduxValue.user.id,
        id: reduxValue.user.id,
        email: reduxValue.user.email,
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
                  <FormInput
                    value={editUser.name}
                    onChange={handleEditOnChange}
                    name="name"
                    placeholder="Enter Name"
                    errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
                    label="Name"
                    pattern="^[A-Za-z ]{3,16}$"
                    required={true}
                  />
                  <FormInput
                    value={editUser.email}
                    onChange={handleEditOnChange}
                    name="email"
                    placeholder="Enter Email"
                    errorMessage="It should be a valid email address!"
                    label="Email"
                    disabled={true}
                  />
                  <FormInput
                    value={editUser.userName}
                    onChange={handleEditOnChange}
                    name="userName"
                    placeholder="Enter Username"
                    errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
                    label="Username"
                    pattern="^[A-Za-z0-9]{3,16}$"
                    required={true}
                  />
                  <FormInput
                    value={editUser.phone}
                    onChange={handleEditOnChange}
                    name="phone"
                    placeholder="Enter phone number"
                    errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
                    label="Phone"
                    pattern="^[0-9]{10,12}$"
                    required={true}
                  />
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
