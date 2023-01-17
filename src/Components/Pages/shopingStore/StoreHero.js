import React from "react";

const StoreHero = ({ setSearchValue }) => {
  return (
    <>
      <section class="pt_80 pt_sm_50">
        <div class="container">
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
          <div class="modal fade" id="FiltersModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div class="modal-header border-0">
                  <h4 class="modal-title forg">Filters</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">
                  <form>
                    <div class="row row_gap_5">
                      <div class="col-12 col-md-6">
                        <label>Vehicle Year</label>
                        <div class="form-group">
                          <input
                            type="text"
                            name=""
                            class="field"
                            placeholder="1900"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label>To</label>
                        <div class="form-group">
                          <input
                            type="text"
                            name=""
                            class="field"
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label>List Date</label>
                        <div class="form-group">
                          <select class="field">
                            <option>All Time</option>
                            <option>7 Days</option>
                            <option>Last Month</option>
                            <option>Last Year</option>
                            <option>Last 2 Year</option>
                            <option>Last 5 Year</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label>Result</label>
                        <div class="form-group">
                          <select class="field">
                            <option>All</option>
                            <option>Sold Only</option>
                            <option>Reserve Not Met</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label>High Bid</label>
                        <div class="form-group">
                          <select class="field">
                            <option>No Min</option>
                            <option>$5k</option>
                            <option>#10k</option>
                            <option>#15k</option>
                            <option>#20k</option>
                            <option>#25k</option>
                            <option>#30k</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label>To</label>
                        <div class="form-group">
                          <select class="field">
                            <option>No Max</option>
                            <option>$5k</option>
                            <option>#10k</option>
                            <option>#15k</option>
                            <option>#20k</option>
                            <option>#25k</option>
                            <option>#30k</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-12">
                        <label>Exclude Words / Models / Tags</label>
                        <div class="form-group">
                          <input
                            type="text"
                            name=""
                            class="field"
                            placeholder="Enter"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <button type="button" class="btn">
                        Filters
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreHero;
