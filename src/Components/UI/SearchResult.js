import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { handleBail } from "../../redux/reducers/dayAndNightMode";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { showModalClose, showModalLogin } from "../../redux/reducers/login";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchData from "./SearchData";

const SearchResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const { searchResult: name, searchKey } =
    logingUser.dayAndNightMode.searchData;

  const [searchedData, setSearchedData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
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

  const searchNew = async () => {
    let data = {
      keyword: searchKey,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}globalSearch`,
        data
      );
      console.log(880, res);
      // setSearchedData(res.data.vehicles_result);
      const filterData = res.data.vehicles_result?.filter(
        (item) => item?.label == name
      );

      const filterDatas = res.data.vehicles_result?.filter((item) =>
        item?.label?.toLowerCase()?.includes(searchKey?.toLowerCase())
      );
      if (filterData?.length > 0) {
        setRelatedData(filterData);
      } else {
        setRelatedData(filterDatas);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchNew();
  }, [name, relatedData]);

  const handleClose = () => {
    dispatch(showModalClose());
  };
  const handleShow = () => {
    dispatch(showModalLogin());
  };

  return (
    <>
      <section className="storeHeroSection dealer align-items-center">
        {relatedData.length === 0 ? (
          <h3 className="text-center text-warning pt-5 mt-5">
            Result not found.
          </h3>
        ) : (
          <div className="container">
            <div className="row">
              <div className="topTile">
                <h1 style={{ textTransform: "capitalize" }}>{searchKey}</h1>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className="heroText">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      handleBail(!logingUser.dayAndNightMode.searchBail)
                    );
                    window.location.reload(false);
                  }}
                  className="btn btn_change"
                >
                  {logingUser.dayAndNightMode.searchBail === true ? (
                    <span className={`fa-solid fa-bell mr-2 text-warning`}>
                      <NotificationsIcon />
                    </span>
                  ) : (
                    <span className={`fa-solid fa-bell mr-2`}>
                      <NotificationsNoneIcon />
                    </span>
                  )}
                  Notify me when one is listed
                </button>

                {logingUser.login.token == null ? (
                  <Link onClick={handleShow} className="btn ml-2">
                    Have one? Sell yours here{" "}
                  </Link>
                ) : logingUser?.login?.user?.dealer == "No" ? (
                  <Link className="btn ml-2" to={"/submit"}>
                    Have one? Sell yours here{" "}
                  </Link>
                ) : (
                  <Link className="btn ml-2" to={"/dealer"}>
                    Have one? Sell yours here{" "}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="pt_40 searchResult">
        <div className="container">
          <div className="col-12 col-lg-12 py-2">
            <h4 className="text-center">
              <span className="text-warning">{relatedData.length}</span> &nbsp;
              Result found
            </h4>
          </div>
          <div className="row">
            {relatedData &&
              relatedData.map((curElem, i) => {
                return <SearchData key={i} curElem={curElem} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResult;
