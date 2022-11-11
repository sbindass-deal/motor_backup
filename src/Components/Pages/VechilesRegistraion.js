import { SingleBed } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import img_001 from "../../Assets/images/img_001.webp";
import {
  basicfactsave,
  contactinfosave,
  detailssave,
  makemodesave,
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";

const VechilesRegistraion = () => {
  const [nameFieldValid, setNameFieldValid] = useState(false);
  const [basicFactValid, setBasicFactValid] = useState(false);
  const [detailsTabValid, setDetailsTabValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(true);
  const [userPassWordValid, setUserPassWordValid] = useState(true);
  const [userPhone, setUserPhone] = useState(true);
  const [file, setFile] = useState()

  const [errorCont, setErrorCont] = useState(false);
  const [signinAggri, setSigninAggri] = useState();
  const [signinAggriSubmit, setSigninAggriSubmit] = useState(true);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [acceptDetails, setAcceptDetails] = useState();
  const acceptDteailsPageOnChange = (e) => {
    const { checked } = e.target;
    setAcceptDetails(checked);
  };
  console.log(acceptDetails);
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



  function uploadFileOne() {   
    const url = process.env.REACT_APP_URL + 'vehicle-image';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('vehicleId', 1);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }
  const [namefield, setNamefield] = useState({
    name: "",
    email: "",
    year: "",
    vechile: "",
    vechilemodel: "",
    vechilelocation: "",
    citylocation: "",
    sale: "",
    includelinks: "",
    vehiclepast: "",
    providelink: "",
    changedvechiles: "",
    dealer: "",
    dealership: "",
    soldvechiles: "",
    videolink: "",
    file: "",
  });

  // basic facts

  const [basicfact, setbasicfact] = useState({
    vin: "",
    vechilesrace: "",
    ultiumdrive: "",
    Interstellar: "",
    interior: "",
    brandandmodel: "",
    sizetires: "",
    trucktitled: "",
    status: "",
    currentodometer: "",
    numberaccurate: "",
    odometer: "",
    accurateField: "",
    files: "",
  });

  // details tabs

  const [detailstab, setDetailstab] = useState({
    detailvin: "",
    bodywork: "",
    rustpresent: "",
    modificationstock: "",
    truckfromnew: "",
    servicesperformed: "",
    issuesorproblems: "",
    anythingelse: "",
    reserve: "",
    shibnobiabout: "",
    amountdocument: "",
    rtmember: "",
    shibnobi: "",
    documentFee: "",
    memberShip: "",
    accept: "",
    understand: "",
  });

  // contact info

  const [information, setInformation] = useState({
    uemail: "",
    username: "",
    password: "",
    iname: "",
    phone: "",
  });
  const handleNameField = (e) => {
    const {
      name,
      email,
      year,
      vechile,
      vechilemodel,
      vechilelocation,
      citylocation,
      sale,
      includelinks,
      vehiclepast,
      providelink,
      changedvechiles,
      dealer,
      dealership,
      soldvechiles,
      videolink,
    } = namefield;
    const Value = e.target.value;
    const Name = e.target.name;
    setNamefield({ ...namefield, [Name]: Value });
    if (
      name.trim().length !== 0 &&
      email.trim().length !== 0 &&
      year.trim().length !== 0 &&
      vechile.trim().length !== 0 &&
      vechilemodel.trim().length !== 0 &&
      citylocation.trim().length !== 0 &&
      sale.trim().length !== 0 &&
      vechilelocation.trim().length !== 0 &&
      includelinks.trim().length !== 0 &&
      vehiclepast.trim().length !== 0 &&
      providelink.trim().length !== 0 &&
      changedvechiles.trim().length !== 0 &&
      dealer.trim().length !== 0 &&
      dealership.trim().length !== 0 &&
      soldvechiles.trim().length !== 0 &&
      videolink.trim().length !== 0
    ) {
      setNameFieldValid(true);
      
    } else {
      setNameFieldValid(false);
    }
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    alert("Form filled successfully");
  };
  const basicFactOnChange = (e) => {
    const {
      vin,
      vechilesrace,
      ultiumdrive,
      Interstellar,
      interior,
      brandandmodel,
      sizetires,
      trucktitled,
      status,
      currentodometer,
      numberaccurate,
      odometer,
      accurateField,
    } = basicfact;
    const Value = e.target.value;
    const Name = e.target.name;
    setbasicfact({ ...basicfact, [Name]: Value });
    if (
      vin.trim().length !== 0 &&
      vechilesrace.trim().length &&
      ultiumdrive.trim().length !== 0 &&
      Interstellar.trim().length !== 0 &&
      interior.trim().length !== 0 &&
      brandandmodel.trim().length &&
      // sizetires.trim().length !== 0 &&
      // trucktitled.trim().length !== 0 &&
      status.trim().length !== 0 &&
      currentodometer.trim().length &&
      // numberaccurate.trim().length !== 0 &&
      odometer.trim().length !== 0 &&
      accurateField.trim().length !== 0
    ) {
      setBasicFactValid(true);
    } else {
      setBasicFactValid(false);
    }
  };
  const basicFactSubmitHandler = (e) => {
    e.preventDefault();
    alert("Form filled successfully");
    //    dispatch(basicfactsave(basicfact))
  };
  const detailsOnChange = (e) => {
    const {
      detailvin,
      bodywork,
      rustpresent,
      modificationstock,
      truckfromnew,
      servicesperformed,
      issuesorproblems,
      anythingelse,
      reserve,
      shibnobiabout,
      amountdocument,
      rtmember,
      shibnobi,
      documentFee,
      memberShip,
      accept,
      understand,
    } = detailstab;
    const Value = e.target.value;
    const Name = e.target.name;
    setDetailstab({ ...detailstab, [Name]: Value });
    if (
      detailvin.trim().length !== 0 &&
      bodywork.trim().length &&
      rustpresent.trim().length !== 0 &&
      modificationstock.trim().length !== 0 &&
      // truckfromnew.trim().length !== 0 &&
      // servicesperformed.trim().length &&
      // issuesorproblems.trim().length !== 0 &&
      // anythingelse.trim().length !== 0 &&
      // reserve.trim().length !== 0 &&
      shibnobiabout.trim().length &&
      amountdocument.trim().length !== 0 &&
      rtmember.trim().length !== 0 &&
      shibnobi.trim().length !== 0 &&
      documentFee.trim().length &&
      memberShip.trim().length !== 0
      // accept.trim().length !== 0 &&
      // understand.trim().length !== 0
    ) {
      setDetailsTabValid(true);
    } else {
      setDetailsTabValid(false);
    }
  };
  if (
    information.username.trim().length < 5 &&
    information.username.trim().length > 10
  ) {
    setUserNameValid(false);
  }
  const detailsSubmitHandler = (e) => {
    e.preventDefault();
    alert("Form filled successfully");
    console.log(detailstab);
    // dispatch(detailssave(detailstab))
  };
  const informationOnChange = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    setInformation({ ...information, [Name]: Value });
  };
  //  const informationSubmitHandler = () => {
  // dispatch(contactinfosave({...namefield,...basicfact,...detailstab,...information, id:Math.random()}))
  //  }
  const informationSubmitHandler = (e) => {
    const {
      name,
      email,
      year,
      vechile,
      vechilemodel,
      vechilelocation,
      citylocation,
      sale,
      includelinks,
      vehiclepast,
      providelink,
      changedvechiles,
      dealer,
      dealership,
      soldvechiles,
      videolink,
      file,
    } = namefield;
    const {
      vin,
      vechilesrace,
      ultiumdrive,
      Interstellar,
      interior,
      brandandmodel,
      sizetires,
      trucktitled,
      status,
      currentodometer,
      numberaccurate,
      odometer,
      accurateField,
      files,
    } = basicfact;
    const {
      detailvin,
      bodywork,
      rustpresent,
      modificationstock,
      truckfromnew,
      servicesperformed,
      issuesorproblems,
      anythingelse,
      reserve,
      shibnobiabout,
      amountdocument,
      rtmember,
      shibnobi,
      documentFee,
      memberShip,
      accept,
      understand,
    } = detailstab;
    const { uemail, username, password, iname, phone } = information;
    e.preventDefault();
    // dispatch(
    //   contactinfosave({
    //     ...namefield,
    //     ...basicfact,
    //     ...detailstab,
    //     ...information,
    //     id: Math.random(),
    //   })
    // );
    axios
      .post(`${url}vehicles`, {
        ...namefield,
        ...basicfact,
        ...detailstab,
        ...information, 
      })
      .then((result) => { 
    // uploadFileOne(id)

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb-4">
              <h2>Sell your vehicle with Shibnobi Auctions!</h2>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                {/* <!-- Nav pills --> */}
                <ul className="nav nav-pills sideBar__">
                  <li className="nav-item">
                    <a
                      className={
                        reduxValue.submitvechilesReducer.step_one === false
                          ? "nav-link active"
                          : "nav-link"
                      }
                      // data-toggle="pill"
                      // href="#MakeModel_Pill"
                    >
                      Make & Model
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        reduxValue.submitvechilesReducer.step_one === true &&
                        reduxValue.submitvechilesReducer.step_two === false
                          ? "nav-link active"
                          : "nav-link"
                      }
                      // data-toggle="pill"
                      // href="#BasicFacts_Pill"
                    >
                      Basic Facts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        reduxValue.submitvechilesReducer.step_one === true &&
                        reduxValue.submitvechilesReducer.step_two === true &&
                        reduxValue.submitvechilesReducer.step_three === false
                          ? "nav-link active"
                          : "nav-link"
                      }
                      // data-toggle="pill"
                    >
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        reduxValue.submitvechilesReducer.step_one === true &&
                        reduxValue.submitvechilesReducer.step_two === true &&
                        reduxValue.submitvechilesReducer.step_three === true
                          ? "nav-link active"
                          : "nav-link"
                      }
                      // data-toggle="pill"
                    >
                      Contact Info
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              {/* <!-- Tab panes --> */}
              <div className="tab-content">
                {reduxValue.submitvechilesReducer.step_one === false ? (
                  <div className="tab-pane active" id="MakeModel_Pill">
                    <h3>Make & Model</h3>
                    <hr />
                    <h6>
                      Think your vehicle should be sold via Shibnobi Auctions?
                      Please fill out the form below.
                    </h6>

                    <p className="small">
                      Have an engine, wheels, seats, literature or any other
                      non-vehicle item?{" "}
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
                        <div className="col-12 col-sm-12 col-md-6">
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
                        </div>
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
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What make is this vehicle?</label>
                            <select
                              value={namefield.vechile}
                              onChange={handleNameField}
                              name="vechile"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Acura">Acura</option>
                              <option value="Aston Martin">Aston Martin</option>
                              <option value="Audi">Audi</option>
                              <option value="Bentley">Bentley</option>
                              <option value="BMW">BMW</option>
                              <option value="Bugatti">Bugatti</option>
                              <option value="Cadillac">Cadillac</option>
                              <option value="Chevrolet">Chevrolet</option>
                              <option value="Factory Five">Factory Five</option>
                              <option value="Ferrari">Ferrari</option>
                              <option value="Ford">Ford</option>
                              <option value="GMC">GMC</option>
                              <option value="Harley davidson">
                                Harley davidson
                              </option>
                              <option value="Jeep">Jeep</option>
                              <option value="Lamborghini">Lamborghini</option>
                              <option value="Land Rover">Land Rover</option>
                              <option value="Lincoln">Lincoln</option>
                              <option value="Lucid">Lucid</option>
                              <option value="Maserati">Maserati</option>
                              <option value="Mazda">Mazda</option>
                              <option value="Mercedes-AMG">Mercedes-AMG</option>
                              <option value="Mercedes-Benz">
                                Mercedes-Benz
                              </option>
                              <option value="Nissan">Nissan</option>
                              <option value="Pleasure-Way">Pleasure-Way</option>
                              <option value="Polaris">Polaris</option>
                              <option value="Porsche">Porsche</option>
                              <option value="Ram">Ram</option>
                              <option value="Rivian">Rivian</option>
                              <option value="Rolls-Royce">Rolls-Royce</option>
                              <option value="Subaru">Subaru</option>
                              <option value="Tesla">Tesla</option>
                              <option value="Toyota">Toyota</option>
                              <option value="Vanderhall">Vanderhall</option>
                              <option value="Volvo">Volvo</option>
                              <option value="!!!">Something else...</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What model is this vehicle?</label>
                            <select
                              value={namefield.vechilemodel}
                              onChange={handleNameField}
                              name="vechilemodel"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Hummer EV Pickup Edition 1">
                                Hummer EV Pickup Edition 1
                              </option>
                              <option value="!!!">Something else...</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              What country is the vehicle currently located in?
                            </label>
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
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                              <option value="France">France</option>
                              <option value="Germany">Germany</option>
                              <option value="Greece">Greece</option>
                              <option value="Italy">Italy</option>
                              <option value="Japan">Japan</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="------------------">
                                ------------------
                              </option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">
                                American Samoa
                              </option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Antigua and Barbuda">
                                Antigua and Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bosnia and Herzegovina">
                                Bosnia and Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">
                                Cayman Islands
                              </option>
                              <option value="Central African Republic">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo, Democratic Republic of the">
                                Congo, Democratic Republic of the
                              </option>
                              <option value="Congo, Republic of the">
                                Congo, Republic of the
                              </option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Côte d'Ivoire">
                                Côte d'Ivoire
                              </option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Curaçao">Curaçao</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">
                                Dominican Republic
                              </option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Faroe Islands">
                                Faroe Islands
                              </option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="French Polynesia">
                                French Polynesia
                              </option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">
                                Guinea-Bissau
                              </option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Israel">Israel</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="North Korea">North Korea</option>
                              <option value="South Korea">South Korea</option>
                              <option value="Kosovo">Kosovo</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">
                                Liechtenstein
                              </option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Micronesia">Micronesia</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Northern Mariana Islands">
                                Northern Mariana Islands
                              </option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Palestine, State of">
                                Palestine, State of
                              </option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Saint Kitts and Nevis">
                                Saint Kitts and Nevis
                              </option>
                              <option value="Saint Lucia">Saint Lucia</option>
                              <option value="Saint Vincent and the Grenadines">
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="Samoa">Samoa</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome and Principe">
                                Sao Tome and Principe
                              </option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Sint Maarten">Sint Maarten</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Sudan, South">Sudan, South</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Taiwan">Taiwan</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Togo">Togo</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad and Tobago">
                                Trinidad and Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">
                                United Arab Emirates
                              </option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Vatican City">Vatican City</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Virgin Islands, British">
                                Virgin Islands, British
                              </option>
                              <option value="Virgin Islands, U.S.">
                                Virgin Islands, U.S.
                              </option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What city is the vehicle located in?</label>
                            <input
                              value={namefield.citylocation}
                              onChange={handleNameField}
                              type="text"
                              name="citylocation"
                              placeholder="Enter"
                              className="field"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Has it been listed for sale anywhere else since
                              you have owned it?
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
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>Where and when? Please include links.</label>
                            <textarea
                              value={namefield.includelinks}
                              onChange={handleNameField}
                              name="includelinks"
                              className="field"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Has this vehicle been listed on Shibnobi in the
                              past?
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
                              type="text"
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
                              What has changed on this vehicle since it was last
                              listed on Shibnobi?
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
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              What is the name of your dealership? Please
                              include a link to your website.
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
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Is the vehicle being sold on consignment?
                            </label>
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
                              Please provide any links to videos (Youtube or
                              Vimeo) here:
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
                              Please upload photos of your vehicle using the box
                              below — pick ones that offer a good sense of the
                              vehicle. The more, and the higher the quality, the
                              better.{" "}
                              <a href="#" className="link">
                                Click here to review our photo guide.
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="drag-area">
                              <div className="icon">
                                <i className="fas fa-cloud-upload-alt"></i>
                              </div>
                              <header>Drag & Drop to Upload File</header>
                              <span>OR</span>
                              {/* <button>Browse File</button> */}
                              <input
                                style={{
                                  backgroundColor: "#EF6031",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                                value={namefield.file}
                                onChange={handleNameField}
                                name="file"
                                type="file"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="small">
                            Accepted file types: jpg, jpeg, png, Max. file size:
                            10 MB, Max. files: 200.
                          </p>
                        </div>
                        <div className="col-12"></div>
                        <div className="col-12 col-sm-12 col-md-12">
                          {/* <button type="submit" className="gry_btn"> */}
                          {/* <button type="button" onClick={handleNextSubmit} > */}
                          {nameFieldValid &&
                          namefield.file.trim().length !== 0 ? (
                            <a
                              className="nav-link gry_btn"
                              data-toggle="pill"
                              href="#BasicFacts_Pill"
                              onClick={() => {
                                dispatch(step_one(true));
                                handleNextSubmit();
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
                          {/* </button> */}
                          {/* </button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}

                {reduxValue.submitvechilesReducer.step_one === true &&
                reduxValue.submitvechilesReducer.step_two === false ? (
                  <div className="tab-pane fade" id="BasicFacts_Pill">
                    <h3>Basic Facts</h3>
                    <hr />

                    <p className="small">
                      Have an engine, wheels, seats, literature or any other
                      non-vehicle item?{" "}
                      <a href="#" className="link">
                        Click here
                      </a>{" "}
                      to submit it.
                    </p>

                    <h5>Please provide some basic info on your vehicle:</h5>
                    <p>We love Hummer EVs!</p>
                    <div className="mb-2">
                      <img src={img_001} />
                    </div>

                    <p>
                      Please provide some basic info to help us gather a better
                      sense of your truck. The more information you can provide
                      up front, the quicker we will be able to write the auction
                      listing.
                    </p>

                    <form onSubmit={basicFactSubmitHandler} className="pt-3">
                      <div className="row row_gap_5">
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What is the VIN?</label>
                            <input
                              value={basicfact.vin}
                              onChange={basicFactOnChange}
                              type="text"
                              name="vin"
                              placeholder="Enter"
                              className="field"
                              required
                            />
                            <p className="small">
                              *Please don't forget to include photos of the VIN
                              during the photo upload process.
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Is this vehicle a race car or not otherwise
                              registered for street use?
                            </label>
                            <select
                              value={basicfact.vechilesrace}
                              onChange={basicFactOnChange}
                              name="vechilesrace"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Does the truck have an Ultium Drive e4WD system?
                            </label>
                            <select
                              value={basicfact.ultiumdrive}
                              onChange={basicFactOnChange}
                              name="ultiumdrive"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Is the truck finished in Interstellar White?
                            </label>
                            <select
                              value={basicfact.Interstellar}
                              onChange={basicFactOnChange}
                              name="Interstellar"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Is the interior upholstered in Jet Black and Light
                              Gray leather?
                            </label>
                            <select
                              value={basicfact.interior}
                              onChange={basicFactOnChange}
                              name="interior"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              What brand and model of tires are currently
                              mounted?
                            </label>
                            <input
                              value={basicfact.brandandmodel}
                              onChange={basicFactOnChange}
                              name="brandandmodel"
                              type="text"
                              placeholder="Ex. Michelin Pilot Sport"
                              className="field"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <label>What wheels are on the truck?</label>
                          <p className="small">*Please pick only one:</p>

                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group form-check">
                                <label className="form-check-label">
                                  <input
                                    value={basicfact.sizetires}
                                    onChange={basicFactOnChange}
                                    name="sizetires"
                                    className="form-check-input"
                                    type="checkbox"
                                  />{" "}
                                  18" machine-finished alloy wheels
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group form-check">
                                <label className="form-check-label">
                                  <input
                                    value={basicfact.trucktitled}
                                    onChange={basicFactOnChange}
                                    name="trucktitled"
                                    className="form-check-input"
                                    type="checkbox"
                                  />{" "}
                                  Other
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              What size of tires are on the truck? *The size can
                              be found on the tire sidewall.
                            </label>
                            <input
                              value={basicfact.trucktitled}
                              onChange={basicFactOnChange}
                              type="text"
                              name="trucktitled"
                              placeholder="Ex. 305/70R18"
                              className="field"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>How is the truck titled?</label>
                            <select
                              value={basicfact.currentodometer}
                              onChange={basicFactOnChange}
                              name="currentodometer"
                              className="field"
                              required
                            >
                              <option
                                selected
                                disabled
                                value=""
                                className="gf_placeholder"
                              >
                                Choose...
                              </option>
                              <option value="the seller's name">
                                Titled in my name
                              </option>
                              <option value="the former owner's name">
                                Titled in former owner's name
                              </option>
                              <option value="the seller's name with a lien on the title">
                                Lien on title
                              </option>
                              <option value="the owner's name and is being represented by the seller">
                                Representing owner with title in their name
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What is the status of the title?</label>
                            <select
                              value={basicfact.status}
                              name="status"
                              onChange={basicFactOnChange}
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="clean">Clean</option>
                              <option value="rebuilt">Rebuilt</option>
                              <option value="salvage">Salvage</option>
                              <option value="branded">Branded</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What is the current odometer reading?</label>
                            <input
                              value={basicfact.odometer}
                              onChange={basicFactOnChange}
                              type="text"
                              name="odometer"
                              placeholder="Ex. 41,000 miles"
                              className="field"
                              required
                            />
                            <p className="small">
                              *Don't forget to include a photo of the current
                              reading during the photo upload process
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              To the best of your knowledge, is this number
                              accurate?
                            </label>
                            <select
                              value={basicfact.accurateField}
                              onChange={basicFactOnChange}
                              name="accurateField"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <p>
                              Please upload a photo of your title (or a photo of
                              your registration if the vehicle has a lien). This
                              will not be displayed publicly, but will instead
                              be used to verify ownership status.
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="drag-area">
                              <div className="icon">
                                <i className="fas fa-cloud-upload-alt"></i>
                              </div>
                              <header>Drag & Drop to Upload File</header>
                              <span>OR</span>
                              {/* <button>Browse File</button> */}
                              <input
                                style={{
                                  backgroundColor: "#EF6031",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                                value={basicfact.files}
                                onChange={basicFactOnChange}
                                name="files"
                                type="file"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="small">
                            Accepted file types: jpg, jpeg, png, Max. file size:
                            1 GB.
                          </p>
                        </div>
                        <div className="col-12"></div>
                        <div className="col-12 col-sm-12 col-md-12">
                          {/* <button type="button" className="gry_btn">
                          BACK
                        </button> */}
                          {/* <button type="submit" className="gry_btn">
                          NEXT
                        </button> */}
                          {basicFactValid &&
                          basicfact.files.trim().length !== 0 ? (
                            <a
                              className="nav-link gry_btn"
                              data-toggle="pill"
                              href="#Details_Pill"
                              onClick={() => dispatch(step_two(true))}
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
                            href="#Details_Pill"
                            onClick={() => dispatch(step_two(true))}
                          >
                            NEXT
                          </a> */}
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}

                {reduxValue.submitvechilesReducer.step_one === true &&
                reduxValue.submitvechilesReducer.step_two === true &&
                reduxValue.submitvechilesReducer.step_three === false ? (
                  <div className="tab-pane fade" id="Details_Pill">
                    <h3>Details</h3>
                    <hr />

                    <p className="small">
                      Have an engine, wheels, seats, literature or any other
                      non-vehicle item?{" "}
                      <a href="#" className="link">
                        Click here
                      </a>{" "}
                      to submit it.
                    </p>

                    <form className="pt-3" onSubmit={detailsSubmitHandler}>
                      <div className="row">
                        <div className="col-12">
                          <h5>Description and details</h5>
                        </div>
                      </div>
                      <div className="row row_gap_5">
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What is the VIN?</label>
                            <select
                              value={detailstab.detailvin}
                              onChange={detailsOnChange}
                              name="detailvin"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Does the truck have any history of paint or
                              bodywork?
                            </label>
                            <select
                              value={detailstab.bodywork}
                              onChange={detailsOnChange}
                              name="bodywork"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Is there any rust present on the truck?
                            </label>
                            <select
                              value={detailstab.rustpresent}
                              onChange={detailsOnChange}
                              name="rustpresent"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Does the truck have any modifications from stock?
                            </label>
                            <select
                              value={detailstab.modificationstock}
                              onChange={detailsOnChange}
                              name="modificationstock"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Is the truck equipped with any of the following?
                              <br /> Please select all that apply:
                            </label>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Illumination"
                                      onChange={handleDetailsInfoOnChange}
                                      name="Illumination"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Illumination Package
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Power-retractable tonneau cover"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      name="Power-retractable"
                                      type="checkbox"
                                    />{" "}
                                    Power-retractable tonneau cover
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Soft tonneau cover"
                                      name="soft"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Soft tonneau cover
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Kicker audio system with MultiPro tailgate"
                                      name="kicker"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Kicker audio system with MultiPro tailgate
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Other"
                                      name="other"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              What do you know about the history of the truck
                              from new?
                            </label>
                            <textarea
                              value={detailstab.issuesorproblems}
                              onChange={detailsOnChange}
                              name="issuesorproblems"
                              className="field"
                              required
                            ></textarea>
                          </div>
                          <p>
                            Please list and describe services performed and when
                            they were performed. <br />
                            *Dates and timelines provide valuable information
                            for interested buyers. Don't forget to upload images
                            of redacted service records for recent and/or
                            notable services.
                          </p>
                          <div className="form-group">
                            <textarea
                              value={detailstab.anythingelse}
                              onChange={detailsOnChange}
                              name="anythingelse"
                              className="field"
                              placeholder="Ex. June 2017: clutch replaced, May 2018: tires replaced and wheels refinished, September 2021: fluids and filters changed"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              What accessories are included in the sale? <br />
                              Please select all that apply:
                            </label>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="window sticky"
                                      onChange={handleAccessoriesChange}
                                      name="window"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Window Sticker
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Owner's Manual"
                                      onChange={handleAccessoriesChange}
                                      name="owner"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Owner's Manual
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Service Records"
                                      onChange={handleAccessoriesChange}
                                      name="Service"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Service Records
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Spare Parts"
                                      onChange={handleAccessoriesChange}
                                      name="spare"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Spare Parts
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="car cover"
                                      onChange={handleAccessoriesChange}
                                      name="car-cover"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Car Cover
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Other"
                                      onChange={handleAccessoriesChange}
                                      name="owner-other"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              What issues or problems does it currently have? Is
                              there anything that currently doesn't work or
                              doesn't operate correctly? Be thorough - you don't
                              want commenters to do this for you.
                              <br />
                              (e.g. engine problems, non-functional items,
                              dents, interior flaws, etc.)
                            </label>
                            <textarea
                              value={detailstab.shibnobiabout}
                              onChange={detailsOnChange}
                              name="shibnobiabout"
                              className="field"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>Anything else we should know?</label>
                            <textarea
                              value={detailstab.amountdocument}
                              onChange={detailsOnChange}
                              name="amountdocument"
                              className="field"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>Do you want a reserve?</label>
                            <select
                              value={detailstab.rtmember}
                              onChange={detailsOnChange}
                              name="rtmember"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>Where did you hear about shibnobi?</label>
                            <select
                              value={detailstab.shibnobi}
                              onChange={detailsOnChange}
                              name="shibnobi"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              <option value="referred">
                                Referred by a shibnobi member
                              </option>
                              <option value="facebook">Facebook</option>
                              <option value="google">Google</option>
                              <option value="instagram">Instagram</option>
                              <option value="longtime">
                                I'm a long time shibnobi Reader
                              </option>
                              <option value="repeat">Repeat seller</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              What is the amount of the document fee that you
                              will charge buyers above and beyond sale price and
                              tax? (This will be printed in the listing.)
                            </label>
                            <input
                              value={detailstab.documentFee}
                              onChange={detailsOnChange}
                              type="text"
                              name="documentFee"
                              placeholder="USD $"
                              className="field"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Are you an R&T member? Enter your membership
                              number here (not required)
                            </label>
                            <input
                              value={detailstab.memberShip}
                              onChange={detailsOnChange}
                              type="text"
                              name="memberShip"
                              placeholder="Enter"
                              className="field"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group form-check">
                            <label className="form-check-label">
                              <input
                                value="I accept"
                                onChange={acceptDteailsPageOnChange}
                                name="accept"
                                className="form-check-input"
                                type="checkbox"
                              />{" "}
                              I accept the{" "}
                              <a href="#" className="link">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="#" className="link">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          <div className="form-group form-check">
                            <label className="form-check-label">
                              <input
                                value={detailstab.understand}
                                onChange={detailsOnChange}
                                name="understand"
                                className="form-check-input"
                                type="checkbox"
                              />{" "}
                              I understand that if the final bid for my vehicle
                              is below the reserve, shibnobi may choose (at its
                              sole discretion) to make up the difference. In
                              this case the vehicle will appear as sold at the
                              below-reserve price and shibnobi will pay me the
                              difference between the high bid and the reserve
                              once the transaction is complete.
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          {/* <button type="button" className="gry_btn">
                          BACK
                        </button> */}
                          {/* <button type="submit" className="gry_btn">
                          NEXT
                        </button> */}
                          {detailsTabValid ? (
                            <a
                              className="nav-link gry_btn"
                              data-toggle="pill"
                              href="#ContactInfo_Pill"
                              onClick={() => dispatch(step_three(true))}
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
                            href="#ContactInfo_Pill"
                            onClick={() => dispatch(step_three(true))}
                          >
                            NEXT
                          </a> */}
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
                {reduxValue.submitvechilesReducer.step_one === true &&
                reduxValue.submitvechilesReducer.step_two === true &&
                reduxValue.submitvechilesReducer.step_three === true ? (
                  <div className="tab-pane fade" id="ContactInfo_Pill">
                    <h3>Contact Info</h3>
                    <hr />

                    <p className="small">
                      Have an engine, wheels, seats, literature or any other
                      non-vehicle item?{" "}
                      <a href="#" className="link">
                        Click here
                      </a>{" "}
                      to submit it.
                    </p>

                    <form className="pt-3" onSubmit={informationSubmitHandler}>
                      <div className="row">
                        <div className="col-12">
                          <h5>Complete Your Contact Info</h5>
                          <p>
                            Already have a username?{" "}
                            <a
                              href="javascript:void(0)"
                              data-dismiss="modal"
                              data-toggle="modal"
                              data-target="#RegisterModal"
                              className="link"
                            >
                              Sign in
                            </a>{" "}
                            here.
                          </p>
                          <h6>If you're new to shibnobi, register below:</h6>
                        </div>
                      </div>
                      <div className="row row_gap_5">
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
                            />
                            {errorCont && information.uemail.length <= 0 ? (
                              <p className="text-danger">Please enter email</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              value={information.username}
                              onChange={informationOnChange}
                              type="text"
                              name="username"
                              className="field"
                              autoComplete="off"
                            />
                            {errorCont && information.username.length <= 0 ? (
                              <p className="text-danger">
                                Please enter user name
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              value={information.password}
                              onChange={informationOnChange}
                              type="password"
                              name="password"
                              className="field"
                              autoComplete="off"
                            />
                            {errorCont && information.password.length <= 0 ? (
                              <p className="text-danger">
                                Please enter password
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
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
                            />
                            {errorCont && information.iname.length <= 0 ? (
                              <p className="text-danger">Please enter name</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
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
                            />
                            {errorCont && information.phone.length <= 0 ? (
                              <p className="text-danger">
                                Please enter phone number
                              </p>
                            ) : (
                              ""
                            )}
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
                              />{" "}
                              Sign me up for the shibnobi Daily Mail
                            </label>
                            {signinAggri || signinAggriSubmit ? (
                              ""
                            ) : (
                              <p className="text-danger">Please select</p>
                            )}
                            {/* {errorCont && information.username <= 0 ? <p>Please enter user name</p> : ""} */}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          {/* <button type="button" className="gry_btn">
                          BACK
                        </button> */}
                          <button type="submit" className="gry_btn">
                            Finish
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VechilesRegistraion;
