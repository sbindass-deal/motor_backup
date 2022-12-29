import React from "react";
import FormInput from "../../UI/FormInput";

const AddGearProduct = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <form className="p-md-5">
            <div className="row row_gap_5">
              <div className="col-12 col-md-6">
                <label>Raffle Name </label>
                <div className="form-group">
                  <FormInput
                    type="text"
                    name="name"
                    className="field"
                    placeholder="Name of the Lottery"
                    errorMessage="no special character only use alphabet"
                    required={true}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Price od 1 ticket</label>
                <div className="form-group">
                  <FormInput
                    type="text"
                    name="price"
                    className="field"
                    placeholder="2023"
                    errorMessage="only number"
                    required={true}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Total ticket stock </label>
                <div className="form-group">
                  <FormInput
                    type="text"
                    name="stock"
                    className="field"
                    placeholder="2023 enter"
                    pattern="^[0-9]{10,12}$"
                    errorMessage="only number"
                    required={true}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Deadline to purchase date</label>
                <div className="form-group">
                  <input
                    type="date"
                    name="dedline"
                    className="field"
                    placeholder="Enter dedline"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-12">
                <label>Lucky draw date</label>
                <div className="form-group">
                  <FormInput
                    type="date"
                    name="luckyDrawDate"
                    className="field"
                    placeholder="2023"
                    errorMessage="take only lucky draw date"
                    required={true}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label>Upload Photos</label>
                <div className="form-group">
                  <FormInput
                    type="file"
                    class="field"
                    id="formFileMultiple"
                    multiple
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Upload Videos </label>
                <div className="form-group">
                  <FormInput
                    type="file"
                    class="field"
                    id="formFileMultiple"
                    multiple
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <small>
                  (Accepted file types: jpg, jpeg, png, Max. file size: 10 MB,
                  Max. files: 200.)
                </small>
              </div>
              <div className="col-12 col-md-12">
                <label>Description</label>
                <div className="form-group">
                  <textarea
                    className="field"
                    name="desc"
                    placeholder="Description here"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGearProduct;
