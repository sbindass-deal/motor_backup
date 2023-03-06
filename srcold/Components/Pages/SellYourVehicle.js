import React, { useState } from "react";
import img_001 from "../../Assets/images/img_001.webp";
import { useSelector, useDispatch } from "react-redux";

function SellYourVehicle() {
  // make and model
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
  });

  // contact info

  const [information, setInformation] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    phone: "",
  });
  const handleNameField = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    console.log(namefield, Value, Name);
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb-4">
              <h2>Sell your vehicle with Gas guzzlrs Auctions!</h2>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                {/* <!-- Nav pills --> */}
                <ul className="nav nav-pills sideBar__">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#MakeModel_Pill"
                    >
                      Make & Model
                    </a>
                  </li>
                  {/* href="#BasicFacts_Pill" */}
                  <li className="nav-item">
                    <p
                      className="nav-link"
                      data-toggle="pill"
                      onClick={() => alert("dasdasd")}
                    >
                      Basic Facts
                    </p>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#Details_Pill"
                    >
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#ContactInfo_Pill"
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
                <div className="tab-pane active" id="MakeModel_Pill">
                  <h3>Make & Model</h3>
                  <hr />
                  <h6>
                    Think your vehicle should be sold via Gas guzzlrs Auctions?
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

                  <form className="">
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
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>What is your email?</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Your email"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>What year is your vehicle?</label>
                          <select className="field">
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
                          <select className="field">
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
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
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
                          <select className="field">
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
                          <select className="field">
                            <option value="United States">United States</option>
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
                            <option value="Côte d'Ivoire">Côte d'Ivoire</option>
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
                            <option value="Faroe Islands">Faroe Islands</option>
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
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
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
                            <option value="Liechtenstein">Liechtenstein</option>
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
                            type="text"
                            name=""
                            placeholder="Enter"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Has it been listed for sale anywhere else since you
                            have owned it?
                          </label>
                          <select className="field">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>Where and when? Please include links.</label>
                          <textarea className="field"></textarea>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Has this vehicle been listed on Gas guzzlrs in the
                            past?
                          </label>
                          <select className="field">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Please provide a link to the listing:</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Enter"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>
                            What has changed on this vehicle since it was last
                            listed on Gas guzzlrs?
                          </label>
                          <textarea className="field"></textarea>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Are you a dealer?</label>
                          <select className="field">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>
                            What is the name of your dealership? Please include
                            a link to your website.
                          </label>
                          <input
                            type="text"
                            name=""
                            placeholder="Enter"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Is the vehicle being sold on consignment?
                          </label>
                          <select className="field">
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
                          <textarea className="field"></textarea>
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
                            <button>Browse File</button>
                            <input type="file" hidden />
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
                        <button type="button" className="gry_btn">
                          NEXT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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
                    sense of your truck. The more information you can provide up
                    front, the quicker we will be able to write the auction
                    listing.
                  </p>

                  <form className="pt-3">
                    <div className="row row_gap_5">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>What is the VIN?</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Enter"
                            className="field"
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
                            </option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>
                            What brand and model of tires are currently mounted?
                          </label>
                          <input
                            type="text"
                            name=""
                            placeholder="Ex. Michelin Pilot Sport"
                            className="field"
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
                            type="text"
                            name=""
                            placeholder="Ex. 305/70R18"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>How is the truck titled?</label>
                          <select className="field">
                            <option
                              value=""
                              selected="selected"
                              className="gf_placeholder"
                            >
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                            type="text"
                            name=""
                            placeholder="Ex. 41,000 miles"
                            className="field"
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                            will not be displayed publicly, but will instead be
                            used to verify ownership status.
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
                            <button>Browse File</button>
                            <input type="file" hidden />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="small">
                          Accepted file types: jpg, jpeg, png, Max. file size: 1
                          GB.
                        </p>
                      </div>
                      <div className="col-12"></div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <button type="button" className="gry_btn">
                          BACK
                        </button>
                        <button type="button" className="gry_btn">
                          NEXT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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

                  <form className="pt-3">
                    <div className="row">
                      <div className="col-12">
                        <h5>Description and details</h5>
                      </div>
                    </div>
                    <div className="row row_gap_5">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>What is the VIN?</label>
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Is there any rust present on the truck?</label>
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
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
                                    className="form-check-input"
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
                            What do you know about the history of the truck from
                            new?
                          </label>
                          <textarea className="field"></textarea>
                        </div>
                        <p>
                          Please list and describe services performed and when
                          they were performed. <br />
                          *Dates and timelines provide valuable information for
                          interested buyers. Don't forget to upload images of
                          redacted service records for recent and/or notable
                          services.
                        </p>
                        <div className="form-group">
                          <textarea
                            className="field"
                            placeholder="Ex. June 2017: clutch replaced, May 2018: tires replaced and wheels refinished, September 2021: fluids and filters changed"
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
                            (e.g. engine problems, non-functional items, dents,
                            interior flaws, etc.)
                          </label>
                          <textarea className="field"></textarea>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>Anything else we should know?</label>
                          <textarea className="field"></textarea>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Do you want a reserve?</label>
                          <select className="field">
                            <option value="" selected="selected">
                              Choose
                            </option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Where did you hear about Gas guzzlrs?</label>
                          <select className="field">
                            <option value="" selected="selected">
                              Select one...
                            </option>
                            <option value="referred">
                              Referred by a Gas guzzlrs member
                            </option>
                            <option value="facebook">Facebook</option>
                            <option value="google">Google</option>
                            <option value="instagram">Instagram</option>
                            <option value="longtime">
                              I'm a long time Gas guzzlrs Reader
                            </option>
                            <option value="repeat">Repeat seller</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>
                            What is the amount of the document fee that you will
                            charge buyers above and beyond sale price and tax?
                            (This will be printed in the listing.)
                          </label>
                          <input
                            type="text"
                            name=""
                            placeholder="USD $"
                            className="field"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>
                            Are you an R&T member? Enter your membership number
                            here (not required)
                          </label>
                          <input
                            type="text"
                            name=""
                            placeholder="Enter"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
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
                              className="form-check-input"
                              type="checkbox"
                            />{" "}
                            I understand that if the final bid for my vehicle is
                            below the reserve, Gas guzzlrs may choose (at its
                            sole discretion) to make up the difference. In this
                            case the vehicle will appear as sold at the
                            below-reserve price and Gas guzzlrs will pay me the
                            difference between the high bid and the reserve once
                            the transaction is complete.
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <button type="button" className="gry_btn">
                          BACK
                        </button>
                        <button type="button" className="gry_btn">
                          NEXT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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

                  <form className="pt-3">
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
                        <h6>If you're new to Gas guzzlrs, register below:</h6>
                      </div>
                    </div>
                    <div className="row row_gap_5">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Email"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Username"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Password"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Name"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="text"
                            name=""
                            placeholder="Phone"
                            className="field"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />{" "}
                            Sign me up for the Gas guzzlrs Daily Mail
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <button type="button" className="gry_btn">
                          BACK
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert("fsdfsd1111111");
                          }}
                          className="gry_btn"
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SellYourVehicle;
