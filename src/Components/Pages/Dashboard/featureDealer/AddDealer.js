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
import CloseIcon from "@mui/icons-material/Close";
const inputArr = [
  {
    type: "url",
    id: 1,
    value: "",
  },
];

const AddDealer = () => {
  const navigate = useNavigate();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showCPassword, setShowCPassWord] = useState(false);
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);
  const [bannerImg, setBannerImg] = useState([]);
  const [arr, setArr] = useState(inputArr);
  const [logoImg, setLogoImg] = useState([]);
  const [aboutUs, setAboutUs] = useState(EditorState.createEmpty());
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    userName: "",
    dealer: "",
    dealerDescription: "",
    password: "",
    cPassword: "",
    title: "",
  });
  // Logo image
  const inputRefLogo = useRef();

  const handleDragOverLogo = (event) => {
    event.preventDefault();
  };

  const handleDropLogo = (event) => {
    event.preventDefault();
    setLogoImg(event.dataTransfer.files);
  };

  // gallery image
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files);
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
  };

  const handleAboutUs = (e) => {
    setAboutUs(e);
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
  // ============================= logo
  const uploadLogeImg = (dealer_id) => {
    (async () => {
      for await (const item of logoImg) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", item);
        formData.append("dealerId", dealer_id);
        formData.append("category", "logo");
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
  // =============================

  // const uploadLogeImg = async (dealer_id) => {
  //   const url = `${process.env.REACT_APP_URL}dealer_img`;
  //   let formData = new FormData();
  //   (() => {
  //     for (const item of logoImg) {
  //       formData.append("logo[]", item);
  //       formData.append("dealerId", dealer_id);
  //       formData.append("category", "logo");
  //     }
  //   })();
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   await axios.post(url, formData, config);
  // };

  // ================================= banner
  const uploadCoverImg = (dealer_id) => {
    (async () => {
      for await (const item of bannerImg) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", item);
        formData.append("dealerId", dealer_id);
        formData.append("category", "banner");
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

  // =================================

  // const uploadCoverImg = async (dealer_id) => {
  //   const url = `${process.env.REACT_APP_URL}dealer_img`;
  //   let formData = new FormData();

  //   (() => {
  //     for (const item of bannerImg) {
  //       formData.append("logo[]", item);
  //       formData.append("dealerId", dealer_id);
  //       formData.append("category", "banner");
  //     }
  //   })();
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   await axios.post(url, formData, config);
  // };

  // =========================== Gallery
  const uploadGallery = (dealer_id) => {
    (async () => {
      for await (const item of file) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", item);
        formData.append("dealerId", dealer_id);
        formData.append("category", "gallery");
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

  // ===========================

  // const uploadGallery = async (dealer_id) => {
  //   const url = `${process.env.REACT_APP_URL}dealer_img`;
  //   let formData = new FormData();
  //   (() => {
  //     for (const item of file) {
  //       formData.append("logo[]", item);
  //       formData.append("dealerId", dealer_id);
  //       formData.append("category", "gallery");
  //     }
  //   })();
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   await axios.post(url, formData, config);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}usersDealer`;
    let formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("mobile", userInput.phone);
    formData.append("username", userInput.userName);
    formData.append("dealer_title", userInput.title);
    formData.append(
      "video_link",
      `${[...arr.map((curElem) => curElem.value)]}`
    );

    formData.append(
      "dealerDescription",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    formData.append("password", userInput.password);
    // formData.append("title", userInput.name);
    formData.append(
      "about_us",
      draftToHtml(convertToRaw(aboutUs.getCurrentContent()))
    );
    // formData.append("bid", 0);
    formData.append(
      "description",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
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
          uploadGallery(response.data.dealer_id);
          notify("Added successfully !");
          navigate("/admin-dealer");
        } else {
          notify(response.data.message);
        }
      })
      .catch((error) => {
        notify(error);
      });
  };

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "url",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  function removeArrItem(index) {
    // create a new array with the item at the specified index removed
    const newItems = [...arr.slice(0, index), ...arr.slice(index + 1)];
    // setItems(newItems);
    // set the state with the new array
    setArr(newItems);
  }

  return (
    <div
      className="container py-5 px-md-5"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <div className="row">
        <div className="col-12 text-center pb-5">
          <h2>Add Dealer</h2>
        </div>
        <form onSubmit={handleSubmit} className="container px-5">
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

            <div className="col-md-12 col-lg-12 col-sm-12">
              {" "}
              <FormInput
                value={userInput.title}
                onChange={handleUserInput}
                name="title"
                placeholder="Enter Title"
                errorMessage="Name should be 2-30 characters and shouldn't include any special character or number!"
                label="Title"
                pattern="^[A-Za-z ]{2,30}$"
                required={true}
              />
            </div>

            {/* About us */}

            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>About us</label>
                <div className="border border-2 border-dark">
                  <Editor
                    editorStyle={{
                      background: "white",
                      padding: "15px",
                      minHeight: "30vh",
                      color: "black",
                    }}
                    editorState={aboutUs}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleAboutUs}
                    placeholder="Please enter about us"
                  />
                </div>
              </div>
            </div>

            {/* Description */}

            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>Description</label>
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
            {/* video link start */}

            <div className="col-12 col-sm-12 col-md-12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label htmlFor="video-link">
                  Please provide any links to videos (Youtube or Video) here:
                </label>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={addInput}
                  className="link"
                >
                  Add more link
                </a>
              </div>
              {arr.map((item, i) => {
                return (
                  <div className="form-group">
                    <div style={{ position: "relative" }}>
                      <input
                        onChange={handleChange}
                        value={item.value}
                        id={i}
                        className="field"
                        placeholder="Enter video link"
                        type={item.type}
                      />
                      {i > 0 && (
                        <div
                          className=""
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "10px",
                            textAlign: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => removeArrItem(i)}
                        >
                          <CloseIcon style={{ fill: "#000" }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* video link end */}

            <div className="col-12 col-md-12 mt-4">
              <label>Logo</label>
              <div className="row">
                {Array.from(logoImg).map((items) => {
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
                onDragOver={handleDragOverLogo}
                onDrop={handleDropLogo}
              >
                <h3>Drag and Drop Files to Upload</h3>
                <h3>Or</h3>
                <input
                  onChange={(e) => {
                    setLogoImg(e.target.files);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRefLogo}
                  hidden
                />
                <div
                  className="orange_btn"
                  onClick={() => inputRefLogo.current.click()}
                >
                  Select Files
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 mt-4">
              <label>Banner</label>
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
                  multiple
                  hidden
                />
                <div
                  className="orange_btn"
                  onClick={() => inputRefBanner.current.click()}
                >
                  Select Files
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12">
              <label>Gallery</label>
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
                    setFile(e.target.files);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRef}
                  multiple
                  hidden
                />
                <div
                  className="orange_btn"
                  onClick={() => inputRef.current.click()}
                >
                  Select Files
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
