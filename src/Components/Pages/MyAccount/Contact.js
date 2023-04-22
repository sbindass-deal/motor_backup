import React from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";

function Contact() {
    
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
              <form >
                <div class="row">
                  <div class="col-md-6">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Name"
                      
                     
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Last Name</label>
                    <input
                     type="text"
                      class="field"
                      placeholder="Last name"
                    
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Phone Number"
                    
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Email Address</label>
                    <input
                      type="email"
                      class="field"
                      placeholder="Email Address"
                     
                    />
                  </div>
                  <div class="col-md-12">
                    <label htmlFor="">Subject</label>

                    <input
                      type="text"
                      class="field"
                      placeholder="Subject"
                      
                    />
                  </div>
                  <div class="col-md-12">
                    <label htmlFor="">Message</label>

                    <textarea
                      type="text"
                      class="field"
                      placeholder="Type Message"
                      
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
                        name="file"
                        type="file"
                          accept="image/gif, image/jpeg, image/png, image/jpg"
                      
                       

                      />
                      <button
                        className="orange_btn"
                        type="button"
                        // onClick={() => inputRef.current.click()}
                      >
                        Select Files
                      </button>
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
