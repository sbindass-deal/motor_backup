import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const data = [
  { id: 1, name: "Sohan", desc: "sohan is a good boy" },
  { id: 2, name: "Mohan", desc: "mohan is a good boy" },
  { id: 3, name: "Lalu", desc: "lalu is a good boy" },
  { id: 4, name: "Modi", desc: "modi is a good boy" },
  { id: 5, name: "Sohan", desc: "sohan is a good boy" },
  { id: 6, name: "Sohan", desc: "sohan is a good boy" },
  { id: 7, name: "Sohan", desc: "sohan is a good boy" },
  { id: 8, name: "Sohan", desc: "sohan is a good boy" },
];

function SearchModal({ handleCloseModal, showSearchModal }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState(data);
  const onChangeHandler = (e) => {
    if (e.target.value.length <= 0) {
      setSearchData(data);
    } else {
      setSearchValue(e.target.value);
    }
    setSearchValue(e.target.value);
  };
  const onSubmitHandlear = (e) => {
    e.preventDefault();
  };
  const featchSearchApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `globalSearch/${searchValue}`
      );
      if (searchValue.trim().length <= 0) {
        setSearchData(data);
      } else {
        setSearchData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchValue === "") {
      return;
    }
    featchSearchApi();
  }, [searchValue]);

  return (
    <Modal
      show={showSearchModal}
      className="modal fade searchModal"
      id="myModal"
    >
      <button onClick={handleCloseModal} type="button" className="close">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <form onSubmit={onSubmitHandlear} className="searchForm">
              <input
                value={searchValue}
                onChange={onChangeHandler}
                type="text"
                name="search"
                placeholder="Search..."
                required
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <div>
              {searchData.map((curElem, i) => {
                return <p key={i}>{curElem.name}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SearchModal;
