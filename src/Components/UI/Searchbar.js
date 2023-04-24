import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showResult } from "../../redux/reducers/dayAndNightMode";
import axios from "axios";
import { TextField } from "@mui/material";

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);

  const [searchText, setSearchText] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState([]);
  const vehicleData = logingUser.vehicleReducer.vehicleData;
  const [options, setOptions] = useState([]);
  // const searchResult = (query) =>
  //   vehicleData
  //     .filter(
  //       (item) =>
  //         (item.make && item.make.toLowerCase().includes(query)) ||
  //         (item.year && item.year.toLowerCase().includes(query)) ||
  //         (item.model && item.model.toLowerCase().includes(query)) ||
  //         (item.moreDescription &&
  //           item.moreDescription.toLowerCase().includes(query))
  //     )
  //     .map((curElem, idx) => {
  //       return {
  //         value: `${curElem.model}`,
  //         label: (
  //           <Link
  //             to="/search"
  //             key={idx}
  //             style={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             <span>{curElem.model}</span>
  //           </Link>
  //         ),
  //       };
  //     });
  // ||
  //       (item.year && item.year.toLowerCase().includes(query)) ||
  //       (item.model && item.model.toLowerCase().includes(query))
  const searchResults = (query) =>
    vehicleBrand
      .filter((item) => item.label && item.label.toLowerCase().includes(query))
      .map((curElem, idx) => {
        return (
          curElem && {
            value: `${curElem.label}`,
            label: (
              <Link
                to="/search"
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{curElem.label}</span>
              </Link>
            ),
          }
        );
      });
  const handleSearch = (value) => {
    const values = value.toLowerCase();
    setOptions(value ? searchResults(values) : []);
  };

  const onSelect = (value) => {
    setSearchText(value);
    dispatch(showResult({ searchResult: value, searchKey: searchText }));
  };

  useEffect(() => {
    searchNew();
  }, []);
  const searchNew = async () => {
    let data = {
      keyword: "",
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}globalSearch`,
        data
      );
      setVehicleBrand(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="searchX">
      <AutoComplete
        id="text1"
        placeholder="Search"
        options={options}
        onSelect={onSelect}
        onChange={(e) => {
          setSearchText(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              showResult({ searchResult: searchText, searchKey: searchText })
            );
            navigate("/search");
          }
        }}
        onSearch={handleSearch}
        className="searchSec"
      />
      <Link
        onClick={() => {
          dispatch(
            showResult({ searchResult: searchText, searchKey: searchText })
          );
        }}
        to="/search"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </Link>
      {/* <form>
        <TextField label='Search' variant="standard" className="searchSec" />
      </form> */}
    </div>
  );
};
export default Searchbar;
