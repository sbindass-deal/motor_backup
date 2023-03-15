import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";

const Charity = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  const fetchNoreserveData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicles_all/charity`
      );
      if (res.data.status === 200) {
        setData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNoreserveData();
  }, []);

  // const getEndDate = (cal) => {
  //   let data = cal.split("T");
  //   let endDate = moment().format("YYYY-MM-DD");
  //   let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

  //   return startDate.toString();
  // };
  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(clearData());
          window.location.reload(false);
        }
      });
  };

  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  return (
    <div>
      <section className="heroSection charity d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText">
                <h1>Charity Auctions</h1>
                <h5>
                  Are you interested in benefitting a charity by offering a
                  vehicle on Gas Guzzlrs Auctions? We can do that!
                </h5>
                {/* <a href="#" className="btn">
                  Notify me when one is listed
                </a>
                <a href="#" className="btn bg-dark">
                  Have one? Sell yours here
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    value={searchValue}
                    onChange={(e) =>
                      setSearchValue(e.target.value.toLowerCase())
                    }
                    placeholder="Filter auctions for make, model, category…"
                  />
                </li>
                <li className="">
                  <button
                    onClick={() => setHighlightWatch(!highlightWatch)}
                    type="button"
                    className={`gry_btn ${highlightWatch && "active"}`}
                  >
                    <i class="fa-solid fa-star mr-2"></i>Watch
                  </button>
                </li>
                <li className="d-flex">
                  <button
                    onClick={() => setViewListActive(false)}
                    type="button"
                    className={`gry_btn gridView ${
                      !viewListActive ? "active" : ""
                    }`}
                  >
                    <img src={icGrid} loading="lazy" />
                  </button>
                  <button
                    onClick={() => setViewListActive(true)}
                    type="button"
                    className={`gry_btn listView ${
                      viewListActive ? "active" : ""
                    }`}
                  >
                    <i className="fa-sharp fa-solid fa-list"></i>
                  </button>
                </li>
                {/* <li className="">
                  <select className="post_select">
                    <option>Ending Soonest</option>
                    <option>Bid: Low to High</option>
                    <option>Bid: High to Low</option>
                    <option>Ending Latest</option>
                    <option>Closest to postal code...</option>
                  </select>
                </li> */}
              </ul>
            </div>
          </div>

          <div
            className={`row pt-4 row_gridList ${
              viewListActive && "activeListView"
            }`}
          >
            {data.length > 0 &&
              data.map((curElem) => {
                return (
                  <Data
                    key={curElem.id}
                    curElem={curElem}
                    addFabrity={addFabrity}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Charity;
