import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";

const CreateMeeting = () => {
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: ""
  // });

  // const updateFormData = event =>
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value
  //   });

  // const { firstName, lastName, email, password } = formData;

  

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <AdminLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Create Meeting</h3>

              <hr id="hr"/>
              {/* <form>
                <input className="formMeeting"
                  value={firstName}
                  onChange={e => updateFormData(e)}
                  placeholder="Title"
                  type="text"
                  name="firstName"
                  required
                />
               

                <button className="buttonStyleMeeting" type="submit">Submit</button>
              </form> */}

              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Title"/>
                  </div>
                  <div class="col">
                    <input type="file" multiple />
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col justify-content-evenly">
                  
                    <label htmlFor="">Start Date</label>

                      <input type="date" class="form-control" placeholder="First name" />

                   
                  </div>
                  <div class="col-3 justify-content-evenly">
                  
                    <label htmlFor="">End Date</label>

                      <input type="date" class="form-control" placeholder="First name" />

                   
                  </div>
                  <div class="col-3 justify-content-evenly">
                  
                   <label htmlFor="">Website Link</label>
                      <input type="text" class="form-control" placeholder="Website Link" />

                   
                  </div>
                 
                </div>

                <div class="row mt-3">
                  <div class="col justify-content-evenly">

                    <label htmlFor="">Facebook Link</label>

                    <input type="text" class="form-control" placeholder="First name" />


                  </div>
                  <div class="col-3 justify-content-evenly">

                    <label htmlFor="">Twitter Link</label>

                    <input type="text" class="form-control" placeholder="First name" />


                  </div>
                  <div class="col-3 justify-content-evenly">

                    <label htmlFor="">Email Link</label>
                    <input type="text" class="form-control" placeholder="Website Link" />


                  </div>

                </div>
                <button className="buttonStyleMeeting" type="submit">Submit</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateMeeting;



// input {
//   display: block;
//   min - width: 90 %;
//   margin: 1em;
//   padding: 1em;
//   width: 35em;
//   border - radius: 8px;
//   border - style: none;
//   border: 1px solid #e4e6e8;
//   transition: 0.1s ease;
// }

// input:hover {
//   border - color: palevioletred;
// }

// button {
//   margin: 0.8em;
//   padding: 1em;
//   border: 1px solid #e4e6e8;
//   border - radius: 5px;
//   cursor: pointer;
//   transition: 0.1s ease -in;
// }

// button:hover {
//   background - color: palevioletred;
//   color: white;
// }