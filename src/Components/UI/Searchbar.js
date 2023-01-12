import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = vehicleData
        .filter((item) => item.make && item.make.toLowerCase().includes(value))
        .map((curElem) => ({
          value,
          label: `${curElem.make} ${curElem.model} ${curElem.year}`,
        }));
    }
    setOptions(res);
  };
  const onSelect = (data) => {
    navigate("/showroom");
    console.log(data);
  };
  return (
    <div className="searchX">
      <AutoComplete
        className="searchSec"
        onSearch={handleSearch}
        onSelect={onSelect}
        placeholder="Search.."
        options={options}
      />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default Searchbar;
