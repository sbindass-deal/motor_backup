import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [understandCondition, setUnderstandCondition] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleAccessoriesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessories([...accessories, value]);
    } else {
      setAccessories(accessories.filter((e) => e !== value));
    }
  };

  const handleDetailsInfoOnChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDetailsInfo([...detailsInfo, value]);
    } else {
      setDetailsInfo(detailsInfo.filter((e) => e !== value));
    }
  };

  const dispatch = useDispatch();

  const [detailstab, setDetailstab] = useState({
    detailvin: "",
    bodywork: "",
    rustpresent: "",
    modificationstock: "",
    truckfromnew: "",
    servicesperformed: "",
    issuesorproblems: "",
    moreDescription: "",
    reserve: "",
    reserveAmount: "",
    shibnobiabout: "",
    ammountOnDocument: "",
    rtmember: "",
    shibnobi: "",
    documentFee: "",
    memberShip: "",
    accept: "",
    understand: "",
  });

  const detailsOnChange = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    setDetailstab({ ...detailstab, [Name]: Value });
  };
  const detailsSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="tab-pane active">
        <h3>Details</h3>
        <hr />

        <p className="small">
          Have an engine, wheels, seats, literature or any other non-vehicle
          item?{" "}
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
                <label>
                  Does the truck have any history of paint or bodywork?
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
                <label>Is there any rust present on the truck?</label>
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
                <label>Does the truck have any modifications from stock?</label>
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
                  What do you know about the history of the truck from new?
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
                Please list and describe services performed and when they were
                performed. <br />
                *Dates and timelines provide valuable information for interested
                buyers. Don't forget to upload images of redacted service
                records for recent and/or notable services.
              </p>
              <div className="form-group">
                <textarea
                  value={detailstab.moreDescription}
                  onChange={detailsOnChange}
                  name="moreDescription"
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
                  What issues or problems does it currently have? Is there
                  anything that currently doesn't work or doesn't operate
                  correctly? Be thorough - you don't want commenters to do this
                  for you.
                  <br />
                  (e.g. engine problems, non-functional items, dents, interior
                  flaws, etc.)
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
                  value={detailstab.ammountOnDocument}
                  onChange={detailsOnChange}
                  name="ammountOnDocument"
                  className="field"
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Do you want a reserve?</label>
                <select
                  value={detailstab.reserve}
                  onChange={detailsOnChange}
                  name="reserve"
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
            {detailstab.reserve === "Yes" && (
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Please provide a link to the listing:</label>
                  <input
                    value={detailsInfo.reserveAmount}
                    onChange={detailsOnChange}
                    type="text"
                    name="reserveAmount"
                    placeholder="Enter"
                    className="field"
                    required
                  />
                </div>
              </div>
            )}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Where did you hear about Gas guzzlrs?</label>
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
                  What is the amount of the document fee that you will charge
                  buyers above and beyond sale price and tax? (This will be
                  printed in the listing.)
                </label>
                <input
                  value={detailstab.documentFee}
                  onChange={detailsOnChange}
                  type="number"
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
                  Are you an R&T member? Enter your membership number here (not
                  required)
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
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    name="accept"
                    className="form-check-input"
                    type="checkbox"
                    required
                  />{" "}
                  I accept the{" "}
                  <a href="/termsandconditions" className="link">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/amlpolicy" className="link">
                    AML Policy
                  </a>
                </label>
              </div>
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input
                    onChange={(e) => setUnderstandCondition(e.target.checked)}
                    name="understand"
                    className="form-check-input"
                    type="checkbox"
                    required
                  />{" "}
                  I understand that if the final bid for my vehicle is below the
                  reserve, Gas guzzlrs may choose (at its sole discretion) to
                  make up the difference. In this case the vehicle will appear
                  as sold at the below-reserve price and Gas guzzlrs will pay me
                  the difference between the high bid and the reserve once the
                  transaction is complete.
                </label>
              </div>
            </div>
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

export default Details;
