import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toCommas } from "../../../UI/globaleVar";

const ViewResult = ({ vehicle }) => {
  const [showResult, setShowResult] = useState(false);
  const handleCloseResult = () => {
    setShowResult(false);
  };
  const handleShowResult = () => {
    setShowResult(true);
  };
  return (
    <>
      <button
        onClick={handleShowResult}
        type="button"
        className="gry_btn active bg-dark"
        style={{
          border: "none",
          marginLeft: "40px",
          marginBottom: "20px",
        }}
      >
        View result
      </button>

      <Modal
        show={showResult}
        onHide={handleCloseResult}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title" style={{ border: "none" }}>
                Auction result
              </h4>

              <button
                onClick={handleCloseResult}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body moAh">
              <div className="card border p-md-4 text-light">
                <div className="row">
                  <div className="col-12 ">

                    <ul>
                      <li style={{ display: "flex" }}>
                        <p>High Bid</p>
                        <p style={{ marginLeft: "40px" }}>
                          USD ${" "}
                          {vehicle?.currentBid &&
                            toCommas(vehicle?.currentBid?.last_bid)}
                        </p>
                      </li>
                      <li style={{ display: "flex" }}>
                        <p>Auction Ended</p>
                        <p style={{ marginLeft: "40px" }}>
                          {vehicle?.EndTime &&
                            new Date(vehicle?.EndTime).toLocaleString()}
                        </p>
                      </li>

                      <li style={{ display: "flex" }}>
                        <p>Bids</p>
                        <p style={{ marginLeft: "87px" }}>
                          {vehicle?.currentBid?.total_bid}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewResult;
