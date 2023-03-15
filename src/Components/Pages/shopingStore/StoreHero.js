import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  clearShowroomFilter,
  filterShowroomData,
} from "../../../redux/reducers/vehicleReducer";

const StoreHero = ({ setSearchValue }) => {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.showroomData;
  const category = logingUser.vehicleReducer.filterCategory;
  const [filteredModal, setFilteredModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterInput, setFilterInput] = useState({
    year: "",
    make: "",
    model: "",
    state: "",
    city: "",
  });
  const handleFilterInput = (e) => {
    setFilterInput({
      ...filterInput,
      [e.target.name]: e.target.value,
    });
  };
  const clearFilter = () => {
    setFilterInput({
      year: "",
      make: "",
      model: "",
      state: "",
      city: "",
    });
    handleFilteredModalClose();

    dispatch(clearShowroomFilter());
  };
  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };
  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    handleFilteredModalClose();
    console.log(1111, filterInput);
    dispatch(filterShowroomData(filterInput));
  };

  useEffect(() => {
    dispatch(clearShowroomFilter());
  }, []);

  return (
    <>
      <section class="pt_80 pt_sm_50">
        <div class="auction_container">
          <div class="row">
            <div class="col-12">
              <ul class="postTopOption">
                <li class="post_search">
                  <input
                    onChange={(e) =>
                      setSearchValue(e.target.value.toLowerCase())
                    }
                    type="text"
                    name="search"
                    placeholder="Search Product by name..."
                  />
                </li>
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
                {/* <li class="">
                  <button
                    type="button"
                    class="gry_btn"
                    data-toggle="modal"
                    data-target="#FiltersModal"
                  >
                    <i class="fa-solid fa-filter mr-2"></i> Filters
                  </button>
                </li> */}
                {/* <li class="">
                  <select class="post_select">
                    <option>Recently Closed</option>
                    <option>Popular</option>
                    <option>Highest Bid</option>
                    <option>Oldest</option>
                  </select>
                </li> */}
              </ul>
            </div>
          </div>

          {/* <!-- The FiltersModal --> */}

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
                  <form onSubmit={handleFilterFormSubmit}>
                    <div className="row row_gap_5">
                      <div className="col-12 col-md-6">
                        <label>Year</label>
                        <div className="form-group">
                          <select
                            name="year"
                            value={filterInput.year}
                            onChange={handleFilterInput}
                            className="field"
                          >
                            <option selected disabled value="">
                              Select
                            </option>
                            {category.year &&
                              category.year.map((curElem) => {
                                return (
                                  <option value={curElem}>{curElem}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>Make</label>
                        <div className="form-group">
                          <select
                            name="make"
                            value={filterInput.make}
                            onChange={handleFilterInput}
                            className="field"
                          >
                            <option selected disabled value="">
                              Select
                            </option>
                            {category.make &&
                              category.make.map((curElem, i) => {
                                return (
                                  <option key={i} value={curElem}>
                                    {curElem}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>Model</label>
                        <div className="form-group">
                          <select
                            name="model"
                            value={filterInput.model}
                            onChange={handleFilterInput}
                            className="field"
                          >
                            <option selected disabled value="">
                              Select
                            </option>
                            {category.model &&
                              category.model.map((curElem) => {
                                return (
                                  <option value={curElem}>{curElem}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>State</label>
                        <div className="form-group">
                          <select
                            name="state"
                            value={filterInput.state}
                            onChange={handleFilterInput}
                            className="field"
                          >
                            <option selected disabled value="">
                              Select
                            </option>
                            {category.state &&
                              category.state.map((curElem) => {
                                return (
                                  <option value={curElem}>{curElem}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>City</label>
                        <div className="form-group">
                          <select
                            name="city"
                            value={filterInput.city}
                            onChange={handleFilterInput}
                            className="field"
                          >
                            <option selected disabled value="">
                              Select
                            </option>
                            {category.city &&
                              category.city.map((curElem) => {
                                return (
                                  <option value={curElem}>{curElem}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-between ">
                      <button type="submit" className="btn">
                        Filters
                      </button>
                      <button
                        onClick={clearFilter}
                        type="button"
                        className="btn"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default StoreHero;

{
  /* <div class="modal fade" id="FiltersModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                {/* <!-- Modal Header --> */
}
// <div class="modal-header border-0">
//   <h4 class="modal-title forg">Filters</h4>
//   <button type="button" class="close" data-dismiss="modal">
//     <i class="fa-solid fa-xmark"></i>
//   </button>
// </div>

{
  /* <!-- Modal body --> */
}
// <div class="modal-body">
//   <form>
//     <div class="row row_gap_5">
//       <div class="col-12 col-md-6">
//         <label>Vehicle Year</label>
//         <div class="form-group">
//           <input
//             type="text"
//             name=""
//             class="field"
//             placeholder="1900"
//           />
//         </div>
//       </div>
//       <div class="col-12 col-md-6">
//         <label>To</label>
//         <div class="form-group">
//           <input
//             type="text"
//             name=""
//             class="field"
//             placeholder="2023"
//           />
//         </div>
//       </div>
//       <div class="col-12 col-md-6">
//         <label>List Date</label>
//         <div class="form-group">
//           <select class="field">
//             <option>All Time</option>
//             <option>7 Days</option>
//             <option>Last Month</option>
//             <option>Last Year</option>
//             <option>Last 2 Year</option>
//             <option>Last 5 Year</option>
//           </select>
//         </div>
//       </div>
//       <div class="col-12 col-md-6">
//         <label>Result</label>
//         <div class="form-group">
//           <select class="field">
//             <option>All</option>
//             <option>Sold Only</option>
//             <option>Reserve Not Met</option>
//           </select>
//         </div>
//       </div>
//       <div class="col-12 col-md-6">
//         <label>High Bid</label>
//         <div class="form-group">
//           <select class="field">
//             <option>No Min</option>
//             <option>$5k</option>
//             <option>#10k</option>
//             <option>#15k</option>
//             <option>#20k</option>
//             <option>#25k</option>
//             <option>#30k</option>
//           </select>
//         </div>
//       </div>
//       <div class="col-12 col-md-6">
//         <label>To</label>
//         <div class="form-group">
//           <select class="field">
//             <option>No Max</option>
//             <option>$5k</option>
//             <option>#10k</option>
//             <option>#15k</option>
//             <option>#20k</option>
//             <option>#25k</option>
//             <option>#30k</option>
//           </select>
//         </div>
//       </div>
//       <div class="col-12 col-md-12">
//         <label>Exclude Words / Models / Tags</label>
//         <div class="form-group">
//           <input
//             type="text"
//             name=""
//             class="field"
//             placeholder="Enter"
//           />
//         </div>
//       </div>
//     </div>
//     <div class="form-group">
//       <button type="button" class="btn">
//         Filters
//       </button>
//     </div>
//   </form>
// </div>
//   </div>
// </div>
// </div> */}
