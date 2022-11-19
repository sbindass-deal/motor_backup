import React from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ContactInfo = () => {
  const [signinAggri, setSigninAggri] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const signInChange = (e) => {
    const { checked } = e.target;
    setSigninAggri(checked);
  };

  const [information, setInformation] = useState({
    uemail: "",
    username: "",
    password: "",
    iname: "",
    phone: "",
  });
  const informationOnChange = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    setInformation({ ...information, [Name]: Value });
  };

  const informationSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="tab-pane active" id="ContactInfo_Pill">
        <h3>Contact Info</h3>
        <hr />

        <p className="small">
          Have an engine, wheels, seats, literature or any other non-vehicle
          item?
          <a href="#" className="link">
            Click here
          </a>
          to submit it.
        </p>

        <form className="pt-3" onSubmit={informationSubmitHandler}>
          <div className="row">
            <div className="col-12">
              <h5>Complete Your Contact Info</h5>
              {/* <p>
                Already have a username?{" "}
                <a
                  href="javascript:void(0)"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#RegisterModal"
                  className="link"
                  required
                >
                  Sign in
                </a>{" "}
                here.
              </p> */}
              <h6>Subscribe to our newsletter:</h6>
            </div>
          </div>
          <div className="row row_gap_5">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Name</label>
                <input
                  value={information.iname}
                  onChange={informationOnChange}
                  type="text"
                  name="iname"
                  placeholder="Name"
                  className="field"
                  required
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  value={information.uemail}
                  onChange={informationOnChange}
                  type="email"
                  name="uemail"
                  placeholder="Email"
                  className="field"
                  required
                />
              </div>
            </div>
            {/* <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Username</label>
                <input
                  value={information.username}
                  onChange={informationOnChange}
                  type="text"
                  name="username"
                  className="field"
                  autoComplete="off"
                  required
                />
              </div>
            </div> */}
            {/* <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  value={information.password}
                  onChange={informationOnChange}
                  type="password"
                  name="password"
                  className="field"
                  autoComplete="off"
                  required
                />
              </div>
            </div> */}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Phone</label>
                <input
                  value={information.phone}
                  onChange={informationOnChange}
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  className="field"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input
                    name="checkbox"
                    value="aggri"
                    onChange={signInChange}
                    className="form-check-input"
                    type="checkbox"
                  />
                  Sign me up for the Gas guzzlrs Daily Mail
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              {submitLoading ? (
                <button type="button disabled" className="gry_btn">
                  Loading...
                </button>
              ) : (
                <button type="submit" className="gry_btn">
                  Finish
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactInfo;
