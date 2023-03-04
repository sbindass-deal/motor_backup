import FormInput from "../../../UI/FormInput";
import React, { useState, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const AddDealer = () => {
  const navigate = useNavigate();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showCPassword, setShowCPassWord] = useState(false);
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);
  const [bannerImg, setBannerImg] = useState([]);
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
  // Logo image
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files]);
  };

  // Banner image

  const inputRefBanner = useRef();

  const handleDragOverBanner = (event) => {
    event.preventDefault();
  };

  const handleDropBanner = (event) => {
    event.preventDefault();
    setBannerImg((prevState) => [...event.dataTransfer.files]);
  };

  const handleContent = (e) => {
    setBlogContent(e);
    console.log(111, e);
  };

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

  const uploadLogeImg = (dealer_id) => {
    (async () => {
      for await (const item of file) {
        const url = process.env.REACT_APP_URL + "dealer_img";
        const formData = new FormData();
        formData.append("dealer_id", dealer_id);
        formData.append("category", "logo");
        formData.append(item);
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(url, newImagedata, config);
      }
    })();
  };

  const uploadCoverImg = (dealer_id) => {
    (async () => {
      for await (const item of bannerImg) {
        const url = process.env.REACT_APP_URL + "dealer_img";
        const formData = new FormData();
        formData.append("dealer_id", dealer_id);
        formData.append("category", "banner");
        formData.append(item);
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(url, newImagedata, config);
      }
    })();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}usersDealer`;
    let formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("mobile", userInput.phone);
    formData.append("username", userInput.userName);
    formData.append("dealerDescription", blogContent);
    formData.append("password", userInput.password);
    formData.append("title", userInput.name);
    formData.append("bid", 0);
    formData.append("description", null);
    // formData.append("logo", file[0]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formData, config)
      .then((response) => {
        if (response.data.status === 200) {
          uploadLogeImg(response.data.dealer_id);
          uploadCoverImg(response.data.dealer_id);
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
        <form className="container px-5">
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
                type="email"
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
                {/* <textarea
                  value={userInput.dealerDescription}
                  onChange={handleUserInput}
                  name="dealerDescription"
                  placeholder="Enter Description"
                  className="field"
                  maxLength={200}
                  required
                ></textarea> */}
                <div className="border border-2 border-dark">
                  <Editor
                    editorStyle={{
                      background: "white",
                      padding: "15px",
                      minHeight: "30vh",
                      color: "black",
                    }}
                    editorState={blogContent}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleContent}
                    placeholder="Please enter description"
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <div className="drag-area">
                  <div className="row">
                    {Array.from(file).map((items, i) => {
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
                      setFile(e.target.files);
                    }}
                    name="files"
                    type="file"
                    required
                  />
                </div>
              </div>
            </div> */}
            <div className="col-12 col-md-12">
              <label>Upload Logo</label>
              <div className="row">
                {Array.from(file).map((items) => {
                  return (
                    <span>
                      <img
                        src={items ? URL.createObjectURL(items) : null}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          padding: "15px",
                        }}
                      />
                    </span>
                  );
                })}
              </div>
              <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3>Drag and Drop Files to Upload</h3>
                <h3>Or</h3>
                <input
                  onChange={(e) => {
                    return setFile((prevState) => [...e.target.files]);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRef}
                  multiple
                  required
                  hidden
                />
                <button
                  className="orange_btn"
                  type="button"
                  onClick={() => inputRef.current.click()}
                >
                  Select Files
                </button>
              </div>
            </div>

            <div className="col-12 col-md-12 mt-4">
              <label>Banner Photos</label>
              <div className="row">
                {Array.from(bannerImg).map((items) => {
                  return (
                    <span>
                      <img
                        src={items ? URL.createObjectURL(items) : null}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          padding: "15px",
                        }}
                      />
                    </span>
                  );
                })}
              </div>
              <div
                className="dropzone"
                onDragOver={handleDragOverBanner}
                onDrop={handleDropBanner}
              >
                <h3>Drag and Drop Files to Upload</h3>
                <h3>Or</h3>
                <input
                  onChange={(e) => {
                    return setBannerImg((prevState) => [...e.target.files]);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRefBanner}
                  required
                  multiple
                  hidden
                />
                <button
                  className="orange_btn"
                  type="button"
                  onClick={() => inputRefBanner.current.click()}
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>
          <div className="form-group text-center pt-4">
            <button onClick={handleSubmit} type="button" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealer;
