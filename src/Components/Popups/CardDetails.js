import React, { useState } from "react";
import FormInput from "../UI/FormInput";
const CardDetails = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    address: "",
    zip: "",
    country: "",
    cardnumber: "",
    month: "",
    year: "",
    cvc: "",
    bat: "",
  });

  const getInputField = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleFormInput = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };
  return (
    <div
      className="container col-md col-sm p-3"
      style={{ backgroundColor: "#000" }}
    >
      <form className="row g-3" onSubmit={handleFormInput}>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip01" className="form-label">
            name <samal>(as it appears on your card)</samal>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={inputValue.name}
            onChange={getInputField}
            required
          />
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip02" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={inputValue.phone}
            onChange={getInputField}
            required
          />
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltipUsername" className="form-label">
            Address
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              aria-describedby="validationTooltipUsernamePrepend"
              name="address"
              value={inputValue.address}
              onChange={getInputField}
              required
            />
          </div>
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip03" className="form-label">
            Zip / Postal Code
          </label>
          <input
            type="text"
            className="form-control"
            name="zip"
            value={inputValue.zip}
            onChange={getInputField}
            required
          />
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip03" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={inputValue.country}
            onChange={getInputField}
            required
          />
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip03" className="form-label">
            Credit Card Number
          </label>
          <input
            type="text"
            className="form-control"
            name="cardnumber"
            value={inputValue.cardnumber}
            onChange={getInputField}
            required
          />
        </div>
        <div className="col-md-6 position-relative">
          <label for="validationTooltip04" className="form-label">
            Expiration
          </label>{" "}
          <br />
          <select
            className="form-select"
            name="month"
            value={inputValue.month}
            onChange={getInputField}
            required
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            className="form-select"
            name="year"
            value={inputValue.year}
            onChange={getInputField}
            required
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
          </select>
        </div>
        <div className="col-md-12 position-relative">
          <label for="validationTooltip03" className="form-label">
            CVC (3 or 4 digit code)
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-control"
            name="cvc"
            value={inputValue.cvc}
            onChange={getInputField}
            required
          />
        </div>

        <div className="col-md-12 position-relative">
          <label for="validationTooltip05" className="form-label">
            Where did you hear about BaT?
          </label>
          <select
            type="text"
            className="form-control"
            name="bat"
            value={inputValue.bat}
            onChange={getInputField}
            required
          >
            <option value="facebook">facebook </option>
            <option value="instagram">instagram </option>
            <option value="Google">Google </option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary mt-4" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardDetails;
