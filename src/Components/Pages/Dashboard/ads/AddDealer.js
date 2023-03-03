import FormInput from "../../../UI/FormInput";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddDealer = () => {
  const navigate = useNavigate();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showCPassword, setShowCPassWord] = useState(false);
  const [file1, setFile1] = useState([]);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    userName: "",
    dealer: "",
    dealerDescription: "",
    password: "",
    cPassword: "",
  });
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

  const handleUserInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}usersDealer`;
    let formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("phone", userInput.phone);
    formData.append("username", userInput.userName);
    formData.append("dealerDescription", userInput.dealerDescription);
    formData.append("password", userInput.password);
    formData.append("title", userInput.name);
    formData.append("bid", 0);
    formData.append("description", null);
    formData.append("logo", file1[0]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formData, config)
      .then((response) => {
        if (response.data.status === 200) {
          navigate("/admin-dealer");
          notify(response.data.message);
        } else {
          notify(response.data.message);
        }
        // console.log(1111, response.data.status, response.data.message);
      })
      .catch((error) => {
        notify(error);
      });
  };

  return (
    <div
      className="container py-5 px-md-5"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <div className="row">
        <div className="col-12 text-center pb-5">
          <h2>Add Dealers</h2>
        </div>
        <form className="container px-5" onSubmit={handleSubmit}>
          <div className="row row_gap_5">
            <div className="col-md-12 col-lg-6 col-sm-12">
              {" "}
              <FormInput
                value={userInput.name}
                onChange={handleUserInput}
                name="name"
                placeholder="Enter Name"
                errorMessage="Name should be 2-30 characters and shouldn't include any special character or number!"
                label="Name"
                pattern="^[A-Za-z ]{2,30}$"
                required={true}
              />
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12">
              <FormInput
                value={userInput.email}
                onChange={handleUserInput}
                name="email"
                placeholder="Enter Email address"
                errorMessage="It should be a valid email address!"
                label="Email address"
                required={true}
              />
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12">
              <FormInput
                value={userInput.userName}
                onChange={handleUserInput}
                name="userName"
                placeholder="Enter Username"
                errorMessage="Username should be 2-30 characters and shouldn't include any special character!"
                label="User name"
                pattern="^[A-Za-z0-9@ ]{2,30}$"
                required={true}
              />
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12">
              <FormInput
                value={userInput.phone}
                onChange={handleUserInput}
                name="phone"
                placeholder="Enter Phone Number"
                errorMessage="Phone number should be 10-20 characters and shouldn't include any special character and alphabet!"
                label="Phone Number"
                pattern="^[0-9]{10,20}$"
                required={true}
              />
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12 eye_arrange">
              <div className="aa">
                <FormInput
                  value={userInput.password}
                  onChange={handleUserInput}
                  name="password"
                  placeholder="Enter Password"
                  errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
                  label="Password"
                  type={showPassWord ? "text" : "password"}
                  pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                  required={true}
                />
                <div
                  className="eye_child eye_login"
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  {showPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12 eye_arrange">
              <FormInput
                value={userInput.cPassword}
                onChange={handleUserInput}
                name="cPassword"
                placeholder="Enter Confirm Password"
                errorMessage="Passwords don't match!"
                label="Confirm Password"
                type={showCPassword ? "text" : "password"}
                pattern={userInput.password}
                required={true}
              />
              <div
                className="eye_child eye_login"
                onClick={() => setShowCPassWord(!showCPassword)}
              >
                {showCPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={userInput.dealerDescription}
                  onChange={handleUserInput}
                  name="dealerDescription"
                  placeholder="Enter Description"
                  className="field"
                  maxLength={200}
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <div className="drag-area">
                  <div className="row">
                    {Array.from(file1).map((items, i) => {
                      return (
                        <span key={i} className="px-1">
                          <img
                            src={items ? URL.createObjectURL(items) : null}
                            style={{
                              width: "70px",
                              objectFit: "cover",
                            }}
                          />
                        </span>
                      );
                    })}
                  </div>

                  <input
                    style={{
                      border: "#EF6031",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onChange={(e) => {
                      setFile1(e.target.files);
                    }}
                    name="files"
                    type="file"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group text-center pt-4">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealer;
