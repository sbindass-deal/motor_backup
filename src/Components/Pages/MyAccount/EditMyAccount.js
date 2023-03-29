import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CardDetails from "../../Popups/CardDetails";
import FormInput from "../../UI/FormInput";
import SmallSpinner from "../../UI/SmallSpinner";
import MyAccountLeftNav from "./MyAccountLeftNav";
import parse from "html-react-parser";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";


function EditMyAccount() {
  const url = process.env.REACT_APP_URL;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [blogContentdesc, setBlogContentDesc] = useState(EditorState.createEmpty());


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
    console.log(111, e);
  };
  const handleContent1 = (e) => {
    setBlogContentDesc(e)
    console.log(111, e);
  };

  const [addUserInBid, setAddUserInBid] = useState(false);
  const handleEditOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    setEditUser({ ...editUser, [Name]: Value });
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${url}user_detail`);
        console.log(68709, res)
        const userLoginData = res.data.data;
        setAddUserInBid(userLoginData.bid);
        setUserData(userLoginData);
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
    fetchUserDetails();
  }, []);

  // const uploadLogo = async (uId) => {
  //   const url = `${process.env.REACT_APP_URL}dealer_img`;
  //   let formData = new FormData();
  //   formData.append("title", editUser.title);
  //   formData.append("description", editUser.desc);
  //   formData.append("dealerId", uId);
  //   formData.append("logo[]", file[0]);
  //   formData.append("category", file1[0]);
  //   formData.append("logo[]", file2[0]);
    
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   await axios
  //     .post(url, formData, config)
  //     .then((response) => {
  //       console.log(response);
  //       notify(response.data.message);
  //       window.location.reload(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

// ==========================

  // =========================== Gallery
  const uploadGallery = (id) => {
    (async () => {
      for await (const item of file) {
        const url = `${process.env.REACT_APP_URL}dealer_img`;
        const formData = new FormData();
        formData.append("logo[]", item);
        formData.append("dealerId", id);
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



  // =========================



  const uploadLogeImg = (dealer_id) => {
    (async () => {
      for await (const item of file) {
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


  const uploadCoverImg = (dealer_id) => {
    (async () => {
      for await (const item of file1) {
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
        about_us: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
        dealerDescription: draftToHtml(convertToRaw(blogContentdesc.getCurrentContent())),
        dealer_title: title,
      })
      .then((result) => {
        if (result.data.status === 200 && userData.dealer === "Yes") {
          // uploadLogo(userData.id);
          uploadLogeImg(userData.id);
          uploadCoverImg(userData.id);
          uploadGallery(userData.id);
          // notify(result.data.message);
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
              <h3>Account Info</h3>
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
                      // onChange={handleEditOnChange}
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

                  {console.log(111, userData)}

                  {userData.dealer === "Yes" && (
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
                  {userData.dealer === "Yes" && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>About us</label>
                        {/* <textarea
                          value={editUser.aboutus}
                          onChange={handleEditOnChange}
                          name="aboutus"
                          placeholder="Enter About us"
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
                            }}
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
                  {userData.dealer === "Yes" && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        {/* <textarea
                          value={editUser.desc}
                          onChange={handleEditOnChange}
                          name="desc"
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
                            }}
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
                  {userData.dealer === "Yes" && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Dealer logo</label>
                        <br />
                        {file.length > 0 && Array.from(file).map((items, i) => {
                          return (
                            <span key={i} className="px-1">
                              <img
                                src={
                                  items ? URL.createObjectURL(items) : null
                                }
                                style={{
                                  width: "120px",
                                  objectFit: "cover",
                                }}
                              />
                            </span>
                          );
                        })}
                        <div className="drag-area">
                          <div className="row">
                            
                            {userData.logo && file.length <= 0 && (
                              <img
                                loading="lazy"
                                style={{
                                  width: "120px",
                                  objectFit: "cover",
                                }}
                                src={
                                  userData?.logo &&
                                  `${process.env.REACT_APP_URL}/${userData?.logo}`
                                }
                              />
                            )}
                            
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
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {userData.dealer === "Yes" && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Dealer banner</label>
                        <div className="drag-area">
                          <div className="row">
                            {userData.logo && file.length <= 0 && (
                              <img
                                loading="lazy"
                                style={{
                                  width: "120px",
                                  objectFit: "cover",
                                }}
                                src={
                                  userData?.logo &&
                                  `${process.env.REACT_APP_URL}/${userData?.logo}`
                                }
                                
                              />
                            )}
                            {Array.from(file1).map((items, i) => {
                              return (
                                <span key={i} className="px-1">
                                  <img
                                    src={
                                      items ? URL.createObjectURL(items) : null
                                    }
                                    style={{
                                      width: "120px",
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
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {userData.dealer === "Yes" && (
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Dealer gallery</label>
                        <div className="drag-area">
                          <div className="row">
                            {userData.logo && file.length <= 0 && (
                              <img
                                loading="lazy"
                                style={{
                                  width: "120px",
                                  objectFit: "cover",
                                }}
                                src={
                                  userData?.logo &&
                                  `${process.env.REACT_APP_URL}/${userData?.logo}`
                                }
                               
                              />
                            )}
                            {Array.from(file2).map((items, i) => {
                              return (
                                <span key={i} className="px-1">
                                  <img
                                    src={
                                      items ? URL.createObjectURL(items) : null
                                    }
                                    style={{
                                      width: "120px",
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
                              setFile2(e.target.files);
                            }}
                            name="files"
                            type="file"
                            multiple
                          />
                        </div>
                      </div>
                    </div>
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
