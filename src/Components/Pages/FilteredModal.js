import React from "react";
import { Modal } from "react-bootstrap";

const FilteredModal = ({ showModal, handleClose }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="modal fade"
      centered
    >
      <div>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title forg">Filters</h4>
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row row_gap_5">
                  <div className="col-12 col-md-6">
                    <label>Vehicle Year</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="1900"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>To</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>List Date</label>
                    <div className="form-group">
                      <input
                        type="date"
                        class="form-control"
                        id="validationCustom01"
                        value="Mark"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Result</label>
                    <div className="form-group">
                      <select className="field">
                        <option>All</option>
                        <option>Sold Only</option>
                        <option>Reserve Not Met</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>High Price</label>
                    <div className="form-group">
                      <select className="field">
                        <option>No Min</option>
                        <option>$5k</option>
                        <option>#10k</option>
                        <option>#15k</option>
                        <option>#20k</option>
                        <option>#25k</option>
                        <option>#30k</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>To</label>
                    <div className="form-group">
                      <select className="field">
                        <option>No Max</option>
                        <option>$5k</option>
                        <option>#10k</option>
                        <option>#15k</option>
                        <option>#20k</option>
                        <option>#25k</option>
                        <option>#30k</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button type="button" className="btn">
                    Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilteredModal;
