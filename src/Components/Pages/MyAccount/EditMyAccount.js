import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CardDetails from "../../Popups/CardDetails";
import FormInput from "../../UI/FormInput";
import MyAccountLeftNav from "./MyAccountLeftNav";

function EditMyAccount() {
  const url = process.env.REACT_APP_URL;

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

  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    address: "",
    zip: "",
    country: "",
    cardnumber: "",
    month: "",
    year: "",
    cvc: "",
    hearAbout: "",
  });
  const getInputField = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const [editUser, setEditUser] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
  });
  const [addUserInBid, setAddUserInBid] = useState(false);
  const handleEditOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    setEditUser({ ...editUser, [Name]: Value });
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${url}user`);
        const userLoginData = res.data.data;
        setEditUser({
          name: userLoginData.name,
          userName: userLoginData.username,
          email: userLoginData.email,
          phone: userLoginData.mobile,
        });
        // setAddUserInBid(userLoginData.bid);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
  }, []);

  const handleApi = (e) => {
    e.preventDefault();
    const { name, userName, phone, email } = editUser;

    axios
      .post(`${url}users`, {
        email: email,
        username: userName,
        phone: phone,
        name: name,
        addUserInBid,
        cardName: inputValue.name,
        cardPhone: inputValue.phone,
        cardAddress: inputValue.address,
        cardZip: inputValue.zip,
        cardCountry: inputValue.country,
        cardNumber: inputValue.cardnumber,
        cartMonth: inputValue.month,
        cartYear: inputValue.year,
        cartCvc: inputValue.cvc,
        cartHearAbout: inputValue.hearAbout,
      })
      .then((result) => {
        notify(result.data.message);
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
                <MyAccountLeftNav />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3>Enter Your Gas Guzzlrs User Info</h3>
              <hr />
              <form onSubmit={handleApi}>
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
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
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <FormInput
                      value={editUser.email}
                      onChange={handleEditOnChange}
                      name="email"
                      placeholder="Enter Email"
                      errorMessage="It should be a valid email address!"
                      label="Email"
                      disabled={true}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12">
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
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <FormInput
                      value={editUser.phone}
                      onChange={handleEditOnChange}
                      name="phone"
                      placeholder="Enter Phone Number"
                      errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
                      label="Phone"
                      pattern="^[0-9]{10,12}$"
                      required={true}
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="form-group form-check">
                      <label className="form-check-label">
                        <input
                          onChange={(e) => setAddUserInBid(e.target.checked)}
                          className="form-check-input"
                          checked={addUserInBid}
                          type="checkbox"
                          style={{ cursor: "pointer" }}
                        />
                        i want the ability to bid on action?(Optional)
                      </label>
                    </div>
                    {addUserInBid && (
                      <CardDetails
                        inputValue={inputValue}
                        getInputField={getInputField}
                      />
                    )}
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
