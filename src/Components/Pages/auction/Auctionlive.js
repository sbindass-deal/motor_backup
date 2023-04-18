import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";
import Pagination from "../../Pagination";
import { Modal } from "react-bootstrap";

const Auctionlive = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredModal, setFilteredModal] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  const [getSelectData, setGetSelectData] = useState({
    year: "",
    make: "",
  });

  const handleChangeSelectData = (e) => {
    setGetSelectData({ ...getSelectData, [e.target.name]: e.target.value })
  }


  console.log(10009, getSelectData)


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const fetchAuctionLiveApi = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicles_all/auction`
      );

      console.log(9898, res)
      if (res.data.status === 200) {
        setData(res.data.data);
        setAllData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAuctionLiveApi();
  }, []);


  const fetchAuctionLiveApiSelect = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicles_all/auction`
      );

      console.log(98981010110, res)
      if (res.data.status === 200) {
        const dataFilter = res.data.data.filter((curVal, i) => {
          return curVal.year == getSelectData.year
          
        })

        console.log(98981010110,'fff',dataFilter)
        setData(dataFilter);
        setAllData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  // const getEndDate = (cal) => {
  //   let data = cal.split("T");
  //   let endDate = moment().format("YYYY-MM-DD");
  //   let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

  //   return startDate.toString();
  // };

  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };

  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  const filterData = (data) => {
    const dataFilter = allData.filter((curElem) => {
      return data == 1 ? curElem.like == data : curElem;
    });
    setData(dataFilter);
  };

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

  const handleSubmitModel = (e) => {
    e.preventDefault()
    fetchAuctionLiveApiSelect()
  }

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Current Auctions{" "}
                <span>{data?.length}&nbsp; AUCTIONS NOW LIVE</span>
              </h2>
            </div>
            <div className="col-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    type="text"
                    name=""
                    placeholder="Filter auctions for make, model, category…"
                  />
                </li>
                <li className="">
                  <button
                    onClick={() => {
                      setHighlightWatch(!highlightWatch);
                      if (highlightWatch) {
                        filterData(0);
                      } else {
                        filterData(1);
                      }
                    }}
                    type="button"
                    className={`gry_btn ${highlightWatch && "active"}`}
                  >
                    {/* <i className="fa-solid fa-heart "></i> */}
                    <i class="fa-solid fa-star mr-2"></i>watched
                  </button>
                </li>
                <li className="d-flex gv">
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

                <li className="">
                  <button
                    type="button"
                    className="gry_btn"
                    data-toggle="modal"
                    data-target="#FiltersModal"
                    onClick={handleFilteredModalShow}
                  >
                    <i className="fa-solid fa-filter mr-2"></i>
                    Filters
                  </button>
                </li>

              </ul>
            </div>
          </div>
          <div
            className={`row pt-4 row_gridList ${viewListActive && "activeListView"
              }`}
          >
            {currentPosts?.length > 0 &&
              currentPosts
                ?.filter((curElem) => {
                  if (searchValue == "") {
                    return curElem;
                  } else if (
                    curElem?.make?.toLowerCase()?.includes(searchValue.toLowerCase())
                  ) {
                    return curElem;
                  }
                })
                ?.map((curElem) => {
                  return (
                    <Data
                      key={curElem?.id}
                      curElem={curElem}
                      addFabrity={addFabrity}
                    />
                  );
                })}

            <Pagination
              totalPosts={data?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
      <Modal
        show={filteredModal}
        onHide={handleFilteredModalClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title forg">Filters</h4>
              <button
                onClick={handleFilteredModalClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitModel}>

                <div className="row row_gap_5">
                  <div className="col-12 col-md-6">
                    <label>Year</label>
                    <div className="form-group">
                      <select name='year' className="field" onChange={handleChangeSelectData}>
                        <option selected disabled value="">
                          Select
                        </option>
                        {
                          data?.map((curVal, i) => {

                            return <option value={curVal?.year}>{curVal?.year}</option>;
                          })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Make</label>
                    <div className="form-group">
                      <select name="make" className="field" onChange={handleChangeSelectData}>
                        <option selected disabled value="">
                          Select
                        </option>
                        {
                          data?.map((curVal, i) => {
                            console.log(787979, curVal)
                            return <option value={curVal?.make}>{curVal?.make}</option>;
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Model</label>
                    <div className="form-group">
                      <select name="model" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        {
                          data?.map((curVal, i) => {
                            console.log(787979, curVal)
                            return <option value={curVal?.model}>{curVal?.model}</option>;
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>State</label>
                    <div className="form-group">
                      <select name="state" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        {
                          data?.map((curVal, i) => {
                            return <option value={curVal?.state}>{curVal?.state}</option>;
                          })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>City</label>
                    <div className="form-group">
                      <select name="city" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        {
                          data?.map((curVal, i) => {
                            console.log(787979, curVal)
                            return <option value={curVal?.city}>{curVal?.city}</option>;
                          })
                        }

                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button type="submit" className="btn"
                  // onClick={handleFilteredModalClose}
                  >
                    Filters
                  </button>
                  <button type="submit" className="btn">
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Auctionlive;
