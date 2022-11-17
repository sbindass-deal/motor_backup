import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import counryData from "../countryList";

const MakeAndModal = () => {
  const [nameFieldValid, setNameFieldValid] = useState(false);
  const [basicFactValid, setBasicFactValid] = useState(false);
  const [detailsTabValid, setDetailsTabValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(true);
  const [userPassWordValid, setUserPassWordValid] = useState(true);
  const [userPhone, setUserPhone] = useState(true);
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();

  const [errorCont, setErrorCont] = useState(false);
  const [signinAggri, setSigninAggri] = useState();
  const [signinAggriSubmit, setSigninAggriSubmit] = useState(true);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [acceptDetails, setAcceptDetails] = useState();
  const [understandCondition, setUnderstandCondition] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const userDataLogin = useSelector((state) => state);
  const [pickOne, setPickOne] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const notify = (val) => toast(val);
  const acceptDteailsPageOnChange = (e) => {
    const { checked } = e.target;
    setAcceptDetails(checked);
  };
  console.log(understandCondition, acceptTerms);
  const handleAccessoriesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessories([...accessories, value]);
    } else {
      setAccessories(accessories.filter((e) => e !== value));
    }
  };

  console.log(accessories);
  const handleDetailsInfoOnChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDetailsInfo([...detailsInfo, value]);
    } else {
      setDetailsInfo(detailsInfo.filter((e) => e !== value));
    }
  };
  const signInChange = (e) => {
    const { checked } = e.target;
    setSigninAggri(checked);
  };

  console.log(errorCont);
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const reduxValue = useSelector((data) => data);

  useEffect(() => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  }, []);

  const uploadFileOne = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "vehicle-image";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

  const uploadFileTwo = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "vehicle-image";
    const formData = new FormData();
    formData.append("image", file1);
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

  const [namefield, setNamefield] = useState({
    name: "",
    email: "",
    year: "",
    make: "",
    model: "",
    vechilelocation: "",
    city: "",
    sale: "",
    link: "",
    vehiclepast: "",
    providelink: "",
    changedvechiles: "",
    dealer: "",
    dealership: "",
    soldvechiles: "",
    videolink: "",
    file: "",
  });
  const handleNameField = (e) => {
    const {
      name,
      email,
      year,
      make,
      model,
      vechilelocation,
      city,
      sale,
      link,
      vehiclepast,
      providelink,
      changedvechiles,
      dealer,
      dealership,
      soldvechiles,
      videolink,
      file,
    } = namefield;
    const Value = e.target.value;
    const Name = e.target.name;
    setNamefield({ ...namefield, [Name]: Value });
    if (
      name.trim().length !== 0 &&
      // email.trim().length !== 0 &&
      year.trim().length !== 0 &&
      make.trim().length !== 0 &&
      model.trim().length !== 0 &&
      city.trim().length !== 0 &&
      sale.trim().length !== 0 &&
      vechilelocation.trim().length !== 0 &&
      // link.trim().length !== 0 &&
      vehiclepast.trim().length !== 0 &&
      providelink.trim().length !== 0 &&
      changedvechiles.trim().length !== 0 &&
      dealer.trim().length !== 0 &&
      // dealership.trim().length !== 0 &&
      soldvechiles.trim().length !== 0 &&
      videolink.trim().length !== 0
      // file.trim().length !== 0
    ) {
      setNameFieldValid(true);
    } else {
      setNameFieldValid(false);
    }
  };
  const handleNextSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h3>Make & Model</h3>
        <hr />
        <h6>
          Think your vehicle should be sold via Gas guzzlrs Auctions? Please
          fill out the form below.
        </h6>

        <p className="small">
          Have an engine, wheels, seats, literature or any other non-vehicle
          item?{" "}
          <a href="#" className="link">
            Click here
          </a>{" "}
          to submit it.
        </p>
        <form className="" onSubmit={handleNextSubmit}>
          <div className="row">
            <div className="col-12 pb-3">
              <h5>What vehicle would you like to sell?</h5>
            </div>
          </div>
          <div className="row row_gap_5">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What is your name?</label>
                <input
                  value={namefield.name}
                  onChange={handleNameField}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="field"
                  required
                />
              </div>
            </div>
            {/* <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What is your email?</label>
                            <input
                              value={namefield.email}
                              onChange={handleNameField}
                              type="email"
                              name="email"
                              placeholder="Your email"
                              className="field"
                              required
                            />
                          </div>
                        </div> */}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What year is your vehicle?</label>
                <select
                  value={namefield.year}
                  onChange={handleNameField}
                  name="year"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2019">2014</option>
                  <option value="2018">2013</option>
                  <option value="2017">2012</option>
                  <option value="2016">2011</option>
                  <option value="2015">2010</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What make is this vehicle?</label>
                <input
                  value={namefield.make}
                  onChange={handleNameField}
                  name="make"
                  type="text"
                  className="field"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What model is this vehicle?</label>
                <input
                  value={namefield.model}
                  onChange={handleNameField}
                  name="model"
                  type="text"
                  className="field"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What country is the vehicle currently located in?</label>
                <select
                  value={namefield.vechilelocation}
                  onChange={handleNameField}
                  name="vechilelocation"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>

                  {counryData.map((curElem, i) => {
                    return (
                      <option key={i} value="United States">
                        {curElem.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What city is the vehicle located in?</label>
                <input
                  value={namefield.city}
                  onChange={handleNameField}
                  type="text"
                  name="city"
                  placeholder="Enter"
                  className="field"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>
                  Has it been listed for sale anywhere else since you have owned
                  it?
                </label>
                <select
                  value={namefield.sale}
                  onChange={handleNameField}
                  name="sale"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            {namefield.sale === "Yes" && (
              <div className="col-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <label>Where and when? Please include links.</label>
                  <textarea
                    value={namefield.link}
                    onChange={handleNameField}
                    name="link"
                    className="field"
                  ></textarea>
                </div>
              </div>
            )}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>
                  Has this vehicle been listed on Gas guzzlrs in the past?
                </label>
                <select
                  value={namefield.vehiclepast}
                  onChange={handleNameField}
                  name="vehiclepast"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Please provide a link to the listing:</label>
                <input
                  value={namefield.providelink}
                  onChange={handleNameField}
                  type="url"
                  name="providelink"
                  placeholder="Enter"
                  className="field"
                  required
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>
                  What has changed on this vehicle since it was last listed on
                  Gas guzzlrs?
                </label>
                <textarea
                  value={namefield.changedvechiles}
                  onChange={handleNameField}
                  name="changedvechiles"
                  className="field"
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Are you a dealer?</label>
                <select
                  value={namefield.dealer}
                  onChange={handleNameField}
                  name="dealer"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            {namefield.dealer === "Yes" ? (
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <label>
                    What is the name of your dealership? Please include a link
                    to your website.
                  </label>
                  <input
                    value={namefield.dealership}
                    onChange={handleNameField}
                    type="text"
                    name="dealership"
                    placeholder="Enter"
                    className="field"
                    required
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Is the vehicle being sold on consignment?</label>
                <select
                  value={namefield.soldvechiles}
                  onChange={handleNameField}
                  name="soldvechiles"
                  className="field"
                  required
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>
                  Please provide any links to videos (Youtube or Vimeo) here:
                </label>
                <textarea
                  value={namefield.videolink}
                  onChange={handleNameField}
                  name="videolink"
                  className="field"
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <p>
                  Please upload photos of your vehicle using the box below —
                  pick ones that offer a good sense of the vehicle. The more,
                  and the higher the quality, the better.{" "}
                  <a href="#" className="link">
                    Click here to review our photo guide.
                  </a>
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <div className="drag-area">
                  {/* <div className="icon">
                                <i className="fas fa-cloud-upload-alt"></i>
                              </div> */}
                  {/* <header>Drag & Drop to Upload File</header>
                              <span>OR</span> */}
                  {/* <button>Browse File</button> */}
                  <input
                    style={{
                      backgroundColor: "#EF6031",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    value={namefield.file}
                    onChange={(e) => {
                      handleNameField(e);
                      setFile(e.target.files[0]);
                    }}
                    name="file"
                    type="file"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="small">
                Accepted file types: jpg, jpeg, png, Max. file size: 10 MB, Max.
                files: 200.
              </p>
            </div>
            <div className="col-12"></div>
            <div className="col-12 col-sm-12 col-md-12">
              {/* <button type="submit" className="gry_btn"> */}
              {/* <button type="button" onClick={handleNextSubmit} > */}
              {nameFieldValid && namefield.file.trim().length !== 0 ? (
                <a
                  className="nav-link gry_btn"
                  data-toggle="pill"
                  href="#BasicFacts_Pill"
                  onClick={() => {
                    dispatch(step_one(true));
                    // handleNextSubmit();
                  }}
                >
                  NEXT
                </a>
              ) : (
                <button type="submit" className="gry_btn">
                  NEXT
                </button>
              )}
              {/* <a
                            className="nav-link gry_btn"
                            data-toggle="pill"
                            href="#BasicFacts_Pill"
                            onClick={() => {
                              dispatch(step_one(true));
                              handleNextSubmit();
                            }}
                          >
                            NEXT
                          </a> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MakeAndModal;
