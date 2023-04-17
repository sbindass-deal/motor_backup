import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import CardDetails from "../../Popups/CardDetails";
import FormInput from "../../UI/FormInput";
import SmallSpinner from "../../UI/SmallSpinner";
import MyAccountLeftNav from "./MyAccountLeftNav";
import parse from "html-react-parser";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { noImage } from "../../UI/globaleVar";
import { Link, useNavigate } from "react-router-dom";

function EditMyAccount() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [blogContentdesc, setBlogContentDesc] = useState(
    EditorState.createEmpty()
  );
  const [galleryFile, setGalleryFile] = useState([]);
  const [bannerImage, setLogo] = useState([]);
  const [galleryImage, setGallery] = useState([]);
  const [documentImage, setBanner] = useState([]);
  const [file, setFile] = useState([]);
  const [file1, setFile1] = useState([]);
  const [file2, setFile2] = useState([]);
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
    title: "",
    desc: "",
    aboutus: "",
  });

  const handleContent = (e) => {
    setBlogContent(e);
  };
  const handleContent1 = (e) => {
    setBlogContentDesc(e);
    console.log(111, e);
  };

  const [addUserInBid, setAddUserInBid] = useState(false);
  const handleEditOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    setEditUser({ ...editUser, [Name]: Value.trimStart() });
  };
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${url}user_detail`);
      console.log(68709, res);
      const userLoginData = res.data.data;
      setAddUserInBid(userLoginData.bid);
      setUserData(userLoginData);
      console.log(111, userLoginData);
      setLogo(userLoginData.logo);
      setGallery(userLoginData.gallery);
      setBanner(userLoginData.banner);
      setEditUser({
        name: userLoginData.name,
        userName: userLoginData.username,
        email: userLoginData.email,
        phone: userLoginData.mobile,
        title: userLoginData.dealer_title,
        desc: userLoginData.dealerDescription,
        aboutus: userLoginData.about_us,
      });

      setBlogContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(res.data.data.about_us)
          )
        )
      );

      setBlogContentDesc(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(res.data.data.dealerDescription)
          )
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const inputRefBanner = useRef();

  const handleDragOverBanner = (event) => {
    event.preventDefault();
  };

  const handleDropBanner = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files);
  };

  const inputRefBannerG = useRef();
  const handleDragOverBannerG = (event) => {
    event.preventDefault();
  };

  const handleDropBannerG = (event) => {
    event.preventDefault();
    setGalleryFile(event.dataTransfer.files);
  };

  const inputRefBannerD = useRef();
  const handleDragOverBannerD = (event) => {
    event.preventDefault();
  };

  const handleDropBannerD = (event) => {
    event.preventDefault();
    setFile1(event.dataTransfer.files);
  };

  // =================================== Gallery image upload start
  const uploadFileGallery = async (vehicleId) => {
    (async () => {
      for await (const item of galleryFile) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", item);
        formData.append("category", "gallery");
        formData.append("dealerId", vehicleId);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const data = await axios.post(url, formData, config);
      }
    })();
  };
  // =========================================== banner image upload
  const uploadFileOne = (vehicleId) => {
    (async () => {
      for await (const file1 of file) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", file1);
        formData.append("category", "logo");
        formData.append("dealerId", vehicleId);
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
  // ========================================= logo image upload
  const uploadFileTwo = async (vehicleId) => {
    (async () => {
      for await (const file11 of file1) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", file11);
        formData.append("category", "banner");
        formData.append("dealerId", vehicleId);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const data = await axios.post(url, formData, config);
      }
    })();
  };

  const handleApi = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { name, userName, phone, email, aboutus, desc, title } = editUser;

    await axios
      .post(`${url}userUpdate`, {
        name: name,
        email: email,
        mobile: phone,
        username: userName,
        // about_us: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
        // dealerDescription: draftToHtml(
        //   convertToRaw(blogContentdesc.getCurrentContent())
        // ),
        // dealer_title: title,
      })
      .then((result) => {
        if (result.data.status === 200 && true) {
          // uploadLogo(userData.id);
          // uploadFileGallery(userData.id);
          // uploadFileOne(userData.id);
          // uploadFileTwo(userData.id);
          navigate("/accountinfo");
          notify(result.data.message);
          setLoading(false);
        } else if (result.data.status === 200 && userData.dealer === "No") {
          notify(result.data.message);
          setLoading(false);
          window.location.reload(false);
        } else {
          notify(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notify("Edit fail something wrong please try again !");
      });
  };

  const handleDeleteImage = (id) => {
    axios
      .post(`${process.env.REACT_APP_URL}deleteImgDealer`, {
        id: id,
      })
      .then(function (response) {
        if (response.status === 200) {
          fetchUserDetails();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBannerImage = (i) => {
    const newData = [];
    setFile(newData);
  };

  const handleGalleryImage = (i) => {
    const newData = [...galleryFile.slice(0, i), ...galleryFile.slice(i + 1)];
    setGalleryFile(newData);
  };
  const handleDocumentImage = (i) => {
    const newData = [...file1.slice(0, i), ...file1.slice(i + 1)];
    setFile1(newData);
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
              <div className="header_style">
               
                <h3>Edit Account Info</h3>
                <Link to={'/accountinfo'}>
                  <button className="p-1 bkBtn"><i class="bi bi-arrow-left"></i> Back To List</button>
                </Link>
             </div>
              <hr />
              <form onSubmit={handleApi}>
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <FormInput
                      value={editUser.name}
                      onChange={handleEditOnChange}
                      name="name"
                      placeholder="Enter Name"
                      errorMessage="Name should be 3-31 characters and shouldn't include any special character or number!"
                      label="Name"
                      pattern="^[A-Za-z ]{3,31}$"
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
                      name="userName"
                      placeholder="Enter Username"
                      errorMessage="Username should be 3-20 characters and shouldn't include any special character!"
                      label="Username"
                      pattern="^[A-Za-z0-9@! ]{3,20}$"
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
                      label="Phone number"
                      pattern="^[0-9]{10,12}$"
                      required={true}
                    />
                  </div>
                  {false && (
                    <div className="col-12">
                      <FormInput
                        value={editUser.title}
                        onChange={handleEditOnChange}
                        name="title"
                        errorMessage="Title should be 2-60 characters and shouldn't include any special character or number!"
                        pattern="^[A-Za-z-,@! ]{2,100}$"
                        placeholder="Enter title"
                        label="Title"
                        required={true}
                      />
                    </div>
                  )}
                  {false && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>About us</label>
                        <div className="border desCrtpion border-2 border-dark">
                          <Editor
                            editorState={blogContent}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleContent}
                            placeholder="Please enter About us"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {false && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        <div className="border desCrtpion border-2 border-dark">
                          <Editor
                            editorState={blogContentdesc}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleContent1}
                            placeholder="Please enter description"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {false && (
                    <>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="bannerImage">Logo Image</label>
                          <div className="imgCross">
                            {Array.from(bannerImage).map((curElem, i) => {
                              return (
                                <span key={i}>
                                  <img
                                    style={{
                                      maxWidth: "16%",
                                      padding: "10px",
                                    }}
                                    loading="lazy"
                                    src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onError = null;
                                      currentTarget.src = noImage;
                                    }}
                                    alt="Maskgroup1"
                                  />
                                  <button
                                    onClick={() =>
                                      handleDeleteImage(curElem.id)
                                    }
                                    type="button"
                                    className="close"
                                  >
                                    x
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="row">
                          <div className="imgCross">
                            {Array.from(file).map((items, i) => {
                              return (
                                <span>
                                  <img
                                    src={
                                      items ? URL.createObjectURL(items) : null
                                    }
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      padding: "15px",
                                    }}
                                  />
                                  <button
                                    onClick={() => handleBannerImage(i)}
                                    type="button"
                                    className="close"
                                  >
                                    X
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="form-group">
                          <div
                            className="dropzone"
                            onDragOver={handleDragOverBanner}
                            onDrop={handleDropBanner}
                          >
                            <h3>Drag and Drop Files to Upload</h3>
                            <h3>Or</h3>
                            <input
                              onChange={(e) => {
                                return setFile(e.target.files);
                              }}
                              name="file"
                              type="file"
                              accept="image/gif, image/jpeg, image/png, image/jpg"
                              ref={inputRefBanner}
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
                    </>
                  )}

                  {false && (
                    <>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="bannerImage">Banner Image</label>
                          <div className="imgCross">
                            {Array.from(galleryImage).map((curElem) => {
                              return (
                                <span>
                                  <img
                                    style={{
                                      maxWidth: "16%",
                                      padding: "10px",
                                    }}
                                    loading="lazy"
                                    src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onError = null;
                                      currentTarget.src = noImage;
                                    }}
                                    alt="banner"
                                  />
                                  <button
                                    onClick={() =>
                                      handleDeleteImage(curElem.id)
                                    }
                                    type="button"
                                    className="close"
                                  >
                                    x
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="imgCross">
                              {Array.from(galleryFile).map((items, i) => {
                                return (
                                  <span key={i}>
                                    <img
                                      src={
                                        items
                                          ? URL.createObjectURL(items)
                                          : null
                                      }
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        padding: "15px",
                                      }}
                                    />
                                    <button
                                      className="close"
                                      type="button"
                                      onClick={() => handleGalleryImage(i)}
                                    >
                                      X
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div
                            className="dropzone"
                            onDragOver={handleDragOverBannerG}
                            onDrop={handleDropBannerG}
                          >
                            <h3>Drag and Drop Files to Upload</h3>
                            <h3>Or</h3>
                            <input
                              onChange={(e) => {
                                setGalleryFile((prevState) => [
                                  ...prevState,
                                  ...e.target.files,
                                ]);
                              }}
                              name="file"
                              type="file"
                              accept="image/gif, image/jpeg, image/png, image/jpg"
                              ref={inputRefBannerG}
                              multiple
                              hidden
                            />
                            <button
                              className="orange_btn"
                              type="button"
                              onClick={() => inputRefBannerG.current.click()}
                            >
                              Select Files
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {false && (
                    <>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="documentImae">Gallery Image</label>
                          <div className="imgCross">
                            {Array.from(documentImage).map((curElem) => {
                              return (
                                <span>
                                  <img
                                    style={{
                                      maxWidth: "16%",
                                      padding: "10px",
                                    }}
                                    loading="lazy"
                                    src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onError = null;
                                      currentTarget.src = noImage;
                                    }}
                                    alt="gallery"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDeleteImage(curElem.id);
                                    }}
                                    className="close"
                                  >
                                    X
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="imgCross">
                              {Array.from(file1).map((items, i) => {
                                return (
                                  <span key={i} className="px-1">
                                    <img
                                      src={
                                        items
                                          ? URL.createObjectURL(items)
                                          : null
                                      }
                                      style={{
                                        width: "70px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleDocumentImage(i)}
                                      className="close"
                                    >
                                      x
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div
                            className="dropzone"
                            onDragOver={handleDragOverBannerD}
                            onDrop={handleDropBannerD}
                          >
                            <h3>Drag and Drop Files to Upload</h3>
                            <h3>Or</h3>
                            <input
                              onChange={(e) => {
                                setFile1((prevState) => [
                                  ...prevState,
                                  ...e.target.files,
                                ]);
                              }}
                              name="files"
                              type="file"
                              multiple
                              ref={inputRefBannerD}
                              hidden
                            />
                            <button
                              className="orange_btn"
                              type="button"
                              onClick={() => inputRefBannerD.current.click()}
                            >
                              Select Files
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-12 col-md-12">
                    {/* <div className="form-group form-check">
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
                    </div> */}
                    {/* {addUserInBid && (
                      <CardDetails
                        inputValue={inputValue}
                        getInputField={getInputField}
                      />
                    )} */}
                    <div className="form-group">
                      {loading ? (
                        <button type="button" className="gry_btn mt-3">
                          Loading...
                        </button>
                      ) : (
                        <button type="submit" className="gry_btn mt-3">
                          Save Changes
                        </button>
                      )}
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
