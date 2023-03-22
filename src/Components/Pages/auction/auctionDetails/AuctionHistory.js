import React, { useEffect, useState } from "react";
import axios from "axios";
import EyeIcon from "../../../../Assets/images/eyeIcon.svg";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuctionHistory = ({ vId }) => {
  const navigate = useNavigate();
  const [showAuctionHistory, setShowAuctionHistory] = useState(false);
  const [auctionHistory, setAuctionHistory] = useState([]);

  const handleCloseAuctionHistory = () => {
    setShowAuctionHistory(false);
  };
  const handleShowAuctionHistory = () => {
    setShowAuctionHistory(true);
  };

  // Auction history

  useEffect(() => {
    const handleAuctionHistory = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getAuctionHistory/${vId}`
        );
        setAuctionHistory(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleAuctionHistory();
  }, [vId]);

  return (
    <>
      <div className="auctionHistory" style={{ cursor: "pointer" }}>
        <div
          onClick={() => {
            handleShowAuctionHistory();
          }}
          className="AuctionBtn"
        >
          <img src={EyeIcon} />
          Auction History <span className="numBr">{auctionHistory.length}</span>
        </div>
      </div>

      <Modal
        show={showAuctionHistory}
        onHide={handleCloseAuctionHistory}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title" style={{ border: "none" }}>
                Auction history
              </h4>

              <button
                onClick={handleCloseAuctionHistory}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body moAh">
              {auctionHistory &&
                auctionHistory.map((curElem, i) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/detail/${curElem.id}`);
                        handleCloseAuctionHistory();
                      }}
                      key={i}
                      style={{ cursor: "pointer" }}
                      className="dfr"
                    >
                      <div className="imgText">
                        <div className="sidebarPost_Img">
                          {/* <img src={carImg} /> */}
                          <img
                            loading="lazy"
                            src={
                              curElem?.image_banner &&
                              `${process.env.REACT_APP_URL}/${curElem?.image_banner?.imagePath}/${curElem?.image_banner?.imageName}`
                            }
                          />
                        </div>
                        <div className="Cont">
                          <p>
                            {curElem.make} {curElem.model} {curElem.year}
                          </p>
                          <div className="n">
                            Sold by <b>{curElem?.seller?.name}</b> to{" "}
                            <b>ToylorCar</b> for{" "}
                            <span>${curElem.documentFee}</span>
                          </div>
                          {/* <div className="t">
                            <i className="fa-solid fa-clock"></i>{" "}
                            {new Date(curElem.created_at).toLocaleDateString()}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuctionHistory;
