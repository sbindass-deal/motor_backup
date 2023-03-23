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
              <span>{curElem.model}</span>
            </Link>
          ),
        };
      });
  const handleSearch = (value) => {
    const values = value.toLowerCase();
    setOptions(value ? searchResult(values) : []);
  };

  const onSelect = (value) => {
    setSearchText(value);
    dispatch(showResult({ searchResult: value, searchKey: searchText }));
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

// import { AutoComplete, Input } from "antd";
// import { useState } from "react";
// const data = [
//   { id: 1, name: "mohan" },
//   { id: 2, name: "sohan" },
//   { id: 3, name: "ram" },
//   { id: 4, name: "shyam" },
//   { id: 5, name: "bablu" },
// ];
// const getRandomInt = (max, min = 0) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;
// const searchResult = (query) =>

//    data.filter((item) => item.name && item.name.toLowerCase().includes(query)).map((curElem, idx) => {
//       return {
//         label: (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <span>
//               Found {query} on{" "}
//               <a
//                 href={`https://s.taobao.com/search?q=${query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {curElem.name}
//               </a>
//             </span>
//             <span>{getRandomInt(200, 100)} results</span>
//           </div>
//         ),
//       };
//     });
// const Searchbar = () => {
//   const [options, setOptions] = useState([]);
//   const handleSearch = (value) => {
//     setOptions(value ? searchResult(value) : []);
//   };
//   const onSelect = (value) => {
//     console.log("onSelect", value);
//   };
//   return (
//     <div className="searchX" style={{zIndex:9999}} >
//       <AutoComplete
//         dropdownMatchSelectWidth={252}
//         options={options}
//         onSelect={onSelect}
//         onSearch={handleSearch}
//         className="searchSec"
//       ></AutoComplete>
//     </div>
//   );
// };
// export default Searchbar;
