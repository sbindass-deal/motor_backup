import React, { useEffect } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { noImage, notify, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import { Image } from "antd";
function UserGarage() {
  const userId = useSelector((state) => state);
  const [userInfo, setUserinfo] = useState({});
  const [isPrivateOrPublic, setIsPrivateOrPublic] = useState(false);

  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}user`);
      if (res.data.data) {
        setUserinfo(res.data.data);
        setIsPrivateOrPublic(res.data.data.published == 0 ? false : true);
      } else {
        setUserinfo(userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsrApi();
  }, []);

  const handlePrivateOrPublic = (e) => {
    setIsPrivateOrPublic(e.target.checked);
    axios
      .post(`${process.env.REACT_APP_URL}profile_public`, {
        publish: `${isPrivateOrPublic == true ? 0 : 1}`,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          fetchUsrApi();
          notify(response.data.message, response.data.status);
        } else {
          notify(response.data.message, response.data.status);
        }
      })
      .catch(function (error) {
        notify(error.message, error.status);
      });
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>Garage</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Garage</h3>
                <div className="d-flex align-items-center">
                  {userInfo.dealer == "No" && (
                    <div className="tg-item mx-4">
                      <input
                        className="tgl tgl-skewed"
                        name="news"
                        onChange={(e) => handlePrivateOrPublic(e)}
                        id="cb1"
                        type="checkbox"
                        checked={isPrivateOrPublic}
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="Private"
                        data-tg-on="Public"
                        for="cb1"
                      ></label>
                    </div>
                  )}
                  {/* to="/add-garage" */}
                  <Link to="" className="gry_btn px-3 mx-2">
                    + Add Garage
                  </Link>
                  <Link to="/editmyaccount-garages" className="gry_btn px-3">
                    Edit Garage
                  </Link>
                </div>
              </div>
              <hr />
              <ul className="labelList_">
                <li>
                  <div className="labelList_label">Title</div>
                  <div className="labelList_text">
                    {userInfo.dealer_title} <br />
                  </div>
                </li>
                <li>
                  <div className="labelList_label">About us</div>
                  <div className="labelList_text">
                    {userInfo.about_us && parse(userInfo.about_us, strToHtml)}
                  </div>
                </li>
                <li>
                  <div className="labelList_label">Description</div>
                  <div className="labelList_text">
                    {userInfo?.dealerDescription &&
                      parse(userInfo?.dealerDescription, strToHtml)}
                  </div>
                </li>

                {true && (
                  <>
                    <h6>Logo</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.logo?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="logo"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Banner</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.gallery?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="banner"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Gallery</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.banner?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="gallery"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserGarage;
