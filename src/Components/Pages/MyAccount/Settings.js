import React, { useEffect, useState } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import axios from "axios";
import { noImage } from "../../UI/globaleVar";
import ClearIcon from "@mui/icons-material/Clear";
import SmallSpinner from "../../UI/SmallSpinner";
import { toast } from "react-toastify";
function Settings() {
  const [allData, setAllData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_URL}getWatchListByUserId`,
          {}
        );
        setAllData(res.data.data);
        setloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getSubscription();
  }, []);

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = (id) => {
    alert("Delete" + " " + id);

    axios
      .post(`${process.env.REACT_APP_URL}removeWatchList/${id}`)
      .then(function (response) {
        if (response.data.status === 200 && response)
          notify(response.data.message);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(10010, error);
      });
  };

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3>Settings</h3>
              <hr />
              <ul className="rowList_ mb-4">
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Garages</h6>
                    <p>By switching to 'Private', your Garage profile will be hidden on Garage page.</p>
                  </div>




                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb6"
                        type="checkbox"
                      // checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="Private"
                        data-tg-on="Public"
                        for="cb6"
                      ></label>
                    </div>
                  </div>
                </li>


                <li>
                  <div className="pr-3">
                    <h6>Gass Guzzlrs Giveaway News and Updates</h6>
                    <p>
                      We'll email you about site updates, pro tips and all
                      things Gas Guzzlrs Giveaway. We promise not to spam you.
                    </p>
                  </div>




                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb1"
                        type="checkbox"
                      // checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb1"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Giveaway Event Updates</h6>
                    <p>
                      We'll email you about upcoming Gas Guzzlrs Giveaway
                      events.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb2"
                        type="checkbox"
                      // checked

                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb2"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Giveaway Daily Mail</h6>
                    <p>
                      We'll email you at 5am PST every day with the latest
                      listings, posts and calendar events.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb3"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb3"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Giveaway Results Digest</h6>
                    <p>
                      We'll email you at 5am PT every day with the previous
                      day's auction results.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb4"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb4"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Giveaway Market Updates</h6>
                    <p>
                      We'll occasionally email you data and reports featuring
                      interesting Gas Guzzlrs Giveaway auction results.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb5"
                        type="checkbox"
                      // checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb5"
                      ></label>
                    </div>
                  </div>
                </li>
              </ul>

              <h3>Your Interests</h3>
              <hr />
              <h5>Watched listings</h5>
              <p>
                We'll email you about listings you're watching. Customize your
                options below.
              </p>
             
              <ul className="rowList_ mb-4">
                <li>
                  <div className="pr-3">
                    <h6>Additional content</h6>
                    <p>
                      We'll email you new photos and videos that are added to
                      the listing.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb01"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb01"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>1 hour reminder</h6>
                    <p>
                      We'll email you when the auction is scheduled to end in 1
                      hour.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb02"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb02"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Result summary</h6>
                    <p>
                      We'll email you the final result after the auction closes.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb03"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb03"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Gas Guzzlrs Giveaway History Updates</h6>
                    <p>
                      We'll email you when the vehicle is listed again on Gas
                      Guzzlrs Giveaway.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb04"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb04"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Text message notifications</h6>
                    <p>
                      We'll occasionally email you data and reports featuring
                      interesting Gas Guzzlrs Giveaway auction results.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb05"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb05"
                      ></label>
                    </div>
                  </div>
                </li>
              </ul>

              <hr />
              <h5>Watched listings</h5>
              <p>
                We'll email you about models you've signed up for via the Model
                Pages. Your subscribed pages are shown below.
              </p>
              <p>
                {loading ? (
                  <SmallSpinner />
                ) : (
                  allData?.map((curVal, i) => {
                    console.log(988, curVal.id)
                    return <p className="watchlistStyle">
                      <p > {`${curVal.make} ${curVal.model} ${curVal.year}`}</p>
                      <p><button className="ml-3 watchlistStyleBtn" onClick={() => handleDelete(curVal.id)}><ClearIcon /></button></p>
                    </p>
                  })
                )}
              </p>
              <hr />

              <h5>Category Subscriptions</h5>
              <p>
                We'll email you about Categories you're following. Some pages
                will email you once a day, others will email you when a new
                listing goes live. Your subscribed pages are shown below.
              </p>

              <hr />

              <h5>Partner Page Subscriptions</h5>
              <p>
                We'll email you about Gas Guzzlrs Giveaway Partners you're
                following. Your subscribed Partner pages are shown below.
              </p>

              <hr />
              <h5>Seller Subscriptions</h5>
              <p>
                We'll email you new listings from sellers you're following. Your
                subscribed sellers are shown below.
              </p>

              <hr />
              <h5>Era Subscriptions</h5>
              <p>
                We'll email you new listings each day from eras you're
                following. Your subscribed eras are shown below.
              </p>
              <ul className="rowList_">
                <li>
                  <div className="pr-3">
                    <h6>Premium Listings</h6>
                    <p>We'll email you when a new Premium Listing goes live.</p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb001"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb001"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>No Reserve Listings</h6>
                    <p>We'll email you new No Reserve listings once a day.</p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb002"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb002"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Comment mentions</h6>
                    <p>
                      We'll email you when your username is @Mentioned in the
                      comments.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb003"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb003"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Play Bid Sound</h6>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb004"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb004"
                      ></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pr-3">
                    <h6>Play Comment Sound</h6>
                  </div>
                  <div className="ml-auto">
                    <div className="tg-item">
                      <input
                        className="tgl tgl-skewed"
                        id="cb005"
                        type="checkbox"
                        checked
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="OFF"
                        data-tg-on="ON"
                        for="cb005"
                      ></label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Settings;
