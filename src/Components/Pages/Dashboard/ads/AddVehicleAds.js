import { Description } from "@ethersproject/properties";
import { useState } from "react";
import FormInput from "../../../UI/FormInput";

const AddVehicleAds = () => {
  const [file, setFile] = useState([]);
  const [getInputFieldData, setGetInputFieldData] = useState({
    make: "",
    model: "",
    year: "",
    url: "",
    description: "",
  });
  const handleOnChange = (e) => {
    setGetInputFieldData({
      ...getInputFieldData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1111, getInputFieldData);
  };
  return (
    <div
      className="container py-5 px-md-5"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <div className="row">
        <div className="col-12 text-center pb-5">
          <h2>Classified ads</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row row_gap_5">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={getInputFieldData.make}
                  onChange={handleOnChange}
                  name="make"
                  placeholder="Enter make"
                  errorMessage="This input field contain 2-30 characters and shouldn't include any special character"
                  label="what is your vehicle make?"
                  pattern="^[A-Za-z0-9 ]{2,30}$"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={getInputFieldData.model}
                  onChange={handleOnChange}
                  name="model"
                  placeholder="Enter model"
                  errorMessage="This input field contain 2-30 characters and shouldn't include any special character"
                  label="what is your vehicle model?"
                  pattern="^[A-Za-z0-9 ]{2,30}$"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={getInputFieldData.year}
                  onChange={handleOnChange}
                  name="year"
                  placeholder="Enter year"
                  errorMessage="This input field contain 2-30 characters and shouldn't include any special character"
                  label="what is your vehicle year?"
                  pattern="^[A-Za-z0-9 ]{2,30}$"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={getInputFieldData.url}
                  onChange={handleOnChange}
                  name="url"
                  placeholder="Enter url"
                  errorMessage="Please enter valid url."
                  label="Ads url"
                  type="url"
                  required={true}
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={getInputFieldData.description}
                  onChange={handleOnChange}
                  name="description"
                  placeholder="Enter Description"
                  className="field"
                  maxLength={200}
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12">
              <div className="form-group">
                <div className="drag-area">
                  <div className="row">
                    {Array.from(file).map((items, i) => {
                      return (
                        <span key={i} className="px-1">
                          <img
                            src={items ? URL.createObjectURL(items) : null}
                            style={{
                              width: "70px",
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
                      setFile(e.target.files);
                    }}
                    name="files"
                    type="file"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group text-center pt-5">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleAds;
