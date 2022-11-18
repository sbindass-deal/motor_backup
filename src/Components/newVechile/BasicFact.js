import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";

const BasicFact = () => {
  const [file1, setFile1] = useState();
  const [pickOne, setPickOne] = useState();
  const dispatch = useDispatch();

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

  const [basicfact, setbasicfact] = useState({
    vin: "",
    vechilesrace: "",
    ultiumdrive: "",
    Interstellar: "",
    interior: "",
    brandandmodel: "",
    sizetires: "",
    trucktitled: "",
    other: "",
    status: "",
    km: "",
    kmacc: "",
    odometer: "",
    accurateField: "",
    files: "",
  });

  const basicFactOnChange = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    setbasicfact({ ...basicfact, [Name]: Value });
  };
  const basicFactSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(false));
  };

  return (
    <>
      <div className="tab-pane active">
        <h3>Basic Facts</h3>
        <hr />

        <p className="small">
          Have an engine, wheels, seats, literature or any other non-vehicle
          item?{" "}
          <a href="#" className="link">
            Click here
          </a>{" "}
          to submit it.
        </p>

        <h5>Please provide some basic info on your vehicle:</h5>
        <p>{/* We love {namefield.make} {namefield.model}s!{" "} */}</p>
        {/* <div className="mb-2">
                      <img src={img_001} />
                    </div> */}

        <p>
          Please provide some basic info to help us gather a better sense of
          your truck. The more information you can provide up front, the quicker
          we will be able to write the auction listing.
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
                  *Please don't forget to include photos of the VIN during the
                  photo upload process.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>
                  Is this vehicle a race car or not otherwise registered for
                  street use?
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
                <label>Does the truck have an Ultium Drive e4WD system?</label>
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
                <label>Is the truck finished in Interstellar White?</label>
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
                  Is the interior upholstered in Jet Black and Light Gray
                  leather?
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
                  What brand and model of tires are currently mounted?
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
                <fieldset class="row mb-3 px-3">
                  <div class="col-sm-10">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        onChange={(e) => setPickOne(e.target.value)}
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="18 machine-finished alloy wheels"
                      />
                      <label class="form-check-label" for="gridRadios1">
                        18" machine-finished alloy wheels
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        onChange={(e) => setPickOne(e.target.value)}
                        type="radio"
                        name="gridRadios"
                        id="gridRadios2"
                        value="other"
                      />
                      <label class="form-check-label" for="gridRadios2">
                        Other
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>
                  What size of tires are on the truck? *The size can be found on
                  the tire sidewall.
                </label>
                <input
                  value={basicfact.sizetires}
                  onChange={basicFactOnChange}
                  type="text"
                  name="sizetires"
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
                  value={basicfact.km}
                  onChange={basicFactOnChange}
                  name="km"
                  className="field"
                  required
                >
                  <option selected disabled value="" className="gf_placeholder">
                    Choose...
                  </option>
                  <option value="the seller's name">Titled in my name</option>
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
                  type="number"
                  name="odometer"
                  placeholder="Ex. 41,000 miles"
                  className="field"
                  required
                />
                <p className="small">
                  *Don't forget to include a photo of the current reading during
                  the photo upload process
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>
                  To the best of your knowledge, is this number accurate?
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
                  Please upload a photo of your title (or a photo of your
                  registration if the vehicle has a lien). This will not be
                  displayed publicly, but will instead be used to verify
                  ownership status.
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
                    onChange={(e) => {
                      basicFactOnChange(e);
                      setFile1(e.target.files[0]);
                    }}
                    name="files"
                    type="file"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="small">
                Accepted file types: jpg, jpeg, png, Max. file size: 1 GB.
              </p>
            </div>
            <div className="col-12"></div>
            <div className="col-12 col-sm-12 col-md-12">
              <button type="submit" className="gry_btn">
                NEXT
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicFact;
