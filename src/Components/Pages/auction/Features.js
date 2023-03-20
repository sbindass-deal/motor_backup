import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";

const Features = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  console.log(99890, data)

  console.log(8787, highlightWatch)
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




  console.log(87878, new Date().toString())
  const data3 = new Date().toLocaleDateString()
  console.log(89, data3)

  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        vehicleId: id,
        // date: new Date().toString(),
      })
      .then((res) => {
        console.log(989, res)
        if (res.data.status === 200) {

          dispatch(clearData());
          window.location.reload(false);
        }
      });
  };

  if (loading) {
    return <SmallSpinner spin={true} />;
  }
  console.log(989898, allData)
  return (
    <div>
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
                      setSearchValue(e.target.value.toLowerCase())
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
                    {/* <i className="fa-solid fa-heart"></i> */}
                    <i class="fa-solid fa-star mr-2"></i>watched
                  </button>
                </li>
                <li className="d-flex">
                  <button
                    onClick={() => setViewListActive(false)}
                    type="button"
                    className={`gry_btn gridView ${!viewListActive ? "active" : ""
                      }`}
                  >
                    <img src={icGrid} loading="lazy" />
                  </button>
                  <button
                    onClick={() => setViewListActive(true)}
                    type="button"
                    className={`gry_btn listView ${viewListActive ? "active" : ""
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
            className={`row pt-4 row_gridList ${viewListActive && "activeListView"
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

            <div class="col-12">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
