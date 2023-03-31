import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";
import Pagination from "../../Pagination";

const Charity = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const fetchNoreserveData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicles_all/charity`
      );
      if (res.data.status === 200) {
        setData(res.data.data);
        setAllData(res.data.data)
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


  const filterData = (data) => {
    const dataFilter = allData.filter((curElem) => {
      return (data == 1 ? curElem.like == data : curElem)
    })
    setData(dataFilter)
  }

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
                {/* <h1>Charity Auctions</h1> */}
                <h2>
                  Are you interested in benefitting a charity by offering a
                  vehicle on Gas Guzzlrs Auctions? We can do that!
                </h2>
                {/* <a href="#" className="btn">
                  Notify me when one is listed
                </a>
                <a href="#" className="btn bg-dark">
                  Have one? Sell yours here
                </a> */}
              </div>
              
            </div>
          </div>
          <a type="button" className="scrollDownIc bounce2" href="#second">
          <span className="outer_cover">
            <small className="upper">
              <i class="fa fa-angle-down"></i>
            </small>
            <small className="lower">
              <i class="fa fa-angle-down"></i>
            </small>
          </span>
        </a>
        </div>
      </section>
      <section className="ptb_30" id="second"></section>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
          <div class="col-12 text-center pb_30"><h2>Charity Auctions</h2></div>
            <div className="col-12">
            
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    value={searchValue}
                    onChange={(e) =>
                      setSearchValue(e.target.value)
                    }
                    placeholder="Filter auctions for make, model, category…"
                  />
                </li>
                <li className="">
                  <button
                    onClick={() => {
                      setHighlightWatch(!highlightWatch)
                      if (highlightWatch) {
                        filterData(0)
                      } else {
                        filterData(1)
                      }

                    

                    }}
                    type="button"
                    className={`gry_btn ${highlightWatch && "active"}`}
                  >
                    <i class="fa-solid fa-star mr-2"></i>watched
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
            {currentPosts.length > 0 &&
              currentPosts?.filter((curElem) => {
                if (searchValue == "") {
                  return curElem
                } else if (curElem?.make.toLowerCase().includes(searchValue.toLowerCase())) {
                  return curElem
                }
              })
                ?.map((curElem) => {
                return (
                  <Data
                    key={curElem.id}
                    curElem={curElem}
                    addFabrity={addFabrity}
                  />
                );
              })}

              <Pagination totalPosts={data.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Charity;
