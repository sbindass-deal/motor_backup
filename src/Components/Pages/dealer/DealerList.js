import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import rrm_logo from "../../../Assets/images/rrm-logo.png";
import txautodealer from "../../../Assets/images/txautodealer.png";
import custombanner5 from "../../../Assets/images/custombanner5.webp";

const DealerList = () => {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}userdealer`);
        if (res.data.users && res.data.status) {
          setDealerData(res.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealer();
  }, []);

  return (
    <>
      <div className="col-12 ListDealer mt-50">
        <div className="row">
          <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.texascarsdirect.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                  <small>AD</small>
                  <img src={custombanner5} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5>Texas Cars Direct</h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.txautodealer.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                  <small>AD</small>
                  <img src={txautodealer} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5>Txauto Dealer</h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.ruizranchmotors.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                  <small>AD</small>
                  <img src={rrm_logo} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5>Ruiz Ranch Dealer</h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div>
          {dealerData.map((curElem) => {
            return (
              <div className="col-lg-4 col-sm-12 inner-slider">
                <Link to={`/dealerprofile/${curElem.id}`}>
                  <div className="card_post">
                    <div className="card_postImg dlr">
                      <img
                        src={
                          curElem.name === "Arizona"
                            ? "https://img.321ignition.io/321ignition-v4-prod-images/public/60cca018bb49fd0046032134/common/logo.svg"
                            : curElem.name === "USA AUTO INC"
                            ? "https://cdn07.carsforsale.com/dealerlogos/409625/Logo54641.cbfc901c.png"
                            : curElem.name === "Camelback"
                            ? "https://pictures.dealer.com/c/camelbacktoyotavtg/1040/4c37615117f663acda6453537ad699c6x.jpg?impolicy=downsize&h=240"
                            : curElem.image
                        }
                        alt="Logo is not available"
                      />
                    </div>
                    <div className="card_postInfo">
                      <h5>
                        {curElem.name === "Arizona"
                          ? "Arizona Car Sales"
                          : curElem.name === "USA AUTO INC"
                          ? "USA AUTO INC"
                          : curElem.name === "Camelback"
                          ? "Camelback Toyota"
                          : curElem.name}
                      </h5>
                      <p>
                        {curElem.name === "Arizona"
                          ? "With hundreds of vehicles from the top automakers globally, Arizona Car Sales is the place to go for great deals on used cars. Visit our location in Mesa, AZ, and be ready to drive home in your dream machine!"
                          : curElem.name === "USA AUTO INC"
                          ? "At USA Auto Inc, we are dedicated to providing customers with the best vehicle buying experience. We are your number one source for quality used vehicle shopping. USA Auto Inc has extensive relationships with the dealer community."
                          : curElem.name === "Camelback"
                          ? "Camelback Toyota offers competitive pricing and a wide selection of new Toyota and used vehicles throughout the Phoenix area. Come experience the Camelback Toyota difference"
                          : curElem.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* <nav aria-label="Page navigation example " className="pgNtion">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default DealerList;
