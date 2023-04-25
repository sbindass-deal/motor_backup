import React, { useState } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    subject: "",
    message: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

 const handleImageUpload = (event) => {
   const file = event.target.files[0];
   setFormState((prevState) => ({
     ...prevState,
     image: file,
   }));
 };

   const handleSubmit = async (event) => {
     event.preventDefault();
     const formData = new FormData();
     formData.append("fname", formState.firstName);
     formData.append("lname", formState.lastName);
     formData.append("phone", formState.phonenumber);
     formData.append("email", formState.email);
     formData.append("subject", formState.subject);
     formData.append("comments", formState.message);
     formData.append("image[]", formState.image);

     try {
       const response = await axios.post(
         `${process.env.REACT_APP_URL}/AddEnquiry`,
         formData
       );
        console.log(response.data);
       if (response.data.status == 200) {
          notify(response.data.message);
          setFormState({
            firstName: "",
            lastName: "",
            phonenumber: "",
            email: "",
            subject: "",
            message: "",
            image: null,
          });
       }
      
     } catch (error) {
       console.error(error);
     }
   };


  return (
    <>
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
              <div className="">
                <h3>Contact Us</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-md-6">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        class="field"
                        placeholder="Name"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        class="field"
                        placeholder="Last name"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        class="field"
                        placeholder="Phone Number"
                        name="phonenumber"
                        value={formState.phonenumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label htmlFor="">Email Address</label>
                      <input
                        type="email"
                        class="field"
                        placeholder="Email Address"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="">Subject</label>

                      <input
                        type="text"
                        class="field"
                        placeholder="Subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="">Message</label>

                      <textarea
                        type="text"
                        class="field"
                        placeholder="Type Message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-12 col-md-12">
                      <label>Upload screenshort</label>
                      <div className="row">
                        {/* return (
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
                        ); */}
                      </div>
                      <div
                        className="dropzone"
                        //   onDragOver={handleDragOver}
                        //   onDrop={handleDrop}
                      >
                        <h3>Drag and Drop Files to Upload</h3>
                        <h3>Or</h3>
                        <input
                          // onChange={(e) => {
                          //   return setFile((prevState) => [...e.target.files]);
                          // }}

                          type="file"
                          accept="image/gif, image/jpeg, image/png, image/jpg"
                          name="image"
                          onChange={handleImageUpload}
                        />
                        {/* <button
                        className="orange_btn"
                        type="button"
                        // onClick={() => inputRef.current.click()}
                      >
                        Select Files
                      </button> */}
                      </div>
                    </div>
                  </div>

                  <div className="text-center my-4">
                    <button className="btn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
