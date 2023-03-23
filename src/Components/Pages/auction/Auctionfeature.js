import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";
import Pagination from "../../Pagination";

const Auctionfeature = () => {
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
        `${process.env.REACT_APP_URL}vehicles_all/premium_listing`
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
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div class="col-12 text-center pb_30">
              <h2>Featured Auctions</h2>
            </div>

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
            {currentPosts.length > 0 &&
              currentPosts?.filter((curElem) => {
                if (searchValue == "") {
                  return curElem
                } else if (curElem.make.toLowerCase().includes(searchValue.toLowerCase())) {
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
            {/* <div class="col-12">
              <ul class="pagination justify-content-center mt-4">
                <li class="page-item disabled">
                  <a class="page-link" href="#">
                    <i class="fa-solid fa-arrow-left"></i>
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    ...
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    10
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Auctionfeature;
