import { AutoComplete } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showResult } from "../../redux/reducers/dayAndNightMode";

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);

  const [searchText, setSearchText] = useState("");
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const [options, setOptions] = useState([]);
  const searchResult = (query) =>
    vehicleData
      .filter(
        (item) =>
          (item.make && item.make.toLowerCase().includes(query)) ||
          (item.year && item.year.toLowerCase().includes(query)) ||
          (item.model && item.model.toLowerCase().includes(query)) ||
          (item.moreDescription &&
            item.moreDescription.toLowerCase().includes(query))
      )
      .map((curElem, idx) => {
        return {
          value: `${curElem.make}`,
          label: (
            <Link
              to="/search"
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{curElem.make}</span>
            </Link>
          ),
        };
      });
  const handleSearch = (value) => {
    const values = value.toLowerCase();
    setOptions(value ? searchResult(values) : []);
  };
  const onSelect = (value) => {
    console.log(1111, value, searchText);
    setSearchText(value);
    dispatch(showResult({ searchResult: value, searchKey: searchText }));
  };

  return (
    <div className="searchX">
      <AutoComplete
        placeholder="Search"
        options={options}
        onSelect={onSelect}
        onChange={(e) => {
          setSearchText(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/search");
          }
        }}
        onSearch={handleSearch}
        className="searchSec"
      ></AutoComplete>
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
    </div>
  );
};
export default Searchbar;
