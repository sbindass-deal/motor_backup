import { AutoComplete } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const [options, setOptions] = useState([]);
  const searchResult = (query) =>
    vehicleData
      .filter(
        (item) =>
          (item.make && item.make.toLowerCase().includes(query)) ||
          (item.year && item.year.toLowerCase().includes(query)) ||
          (item.model && item.model.toLowerCase().includes(query))
      )
      .map((curElem, idx) => {
        return {
          // value: query,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <Link to="/showroom">
                  {curElem.make} {curElem.model} {curElem.year}
                </Link>
              </span>
            </div>
          ),
        };
      });
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  return (
    <div className="searchX">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 300,
        }}
        placeholder="Search.."
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        className="searchSec"
      ></AutoComplete>
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};
export default Searchbar;
