import React, { useState } from "react";
import { AutoComplete } from "antd";

const Searchbar = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "163.com", "qq.com"].map((domain) => ({
        value,
        label: `${value}@${domain}`,
      }));
    }
    setOptions(res);
  };
  return (
    <div className="searchX">
        <AutoComplete
          className="searchSec"
          onSearch={handleSearch}
          placeholder="Search.."
          options={options}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default Searchbar;
