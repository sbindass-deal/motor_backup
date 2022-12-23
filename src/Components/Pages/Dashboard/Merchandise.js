import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";

function Merchandise() {
  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <AdminLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Merchandise</h3>
              <hr />
              <div class="card_Gray table-responsive merchant vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Image </th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Color</th>
                      <th scope="col">Size</th>
                      <th scope="col">category </th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        <div className="cartImg">
                          <img src={img_01} />
                        </div>
                      </td>
                      <td>Short Skirt </td>
                      <td>$200</td>
                      <td>Black</td>
                      <td>XS,S,M,XL</td>
                      <td>women's Cloth</td>
                      <td className="actionBtn">
                        <button
                          data-toggle="modal"
                          data-target="#MerchandiseEdit"
                        >
                          <i class="fa-solid fa-pencil"></i>
                        </button>
                        {/* <button><i class="fa-sharp fa-solid fa-plus"></i></button> */}
                        <button>
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                    <button className="btn mt-4">
                      <i class="fa-sharp fa-solid fa-plus"></i>
                    </button>
                  </tbody>
                </table>
              </div>

              {/* <!-- Edit PopUp--> */}

              <div class="card_Gray table-responsive vehicleSub">
                <div className="container">
                  <div className="modal fade" id="MerchandiseEdit">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header border-0">
                          <h4 className="modal-title">Edit Merchandise</h4>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form>
                            <div className="row row_gap_5">
                              <div className="col-12 col-md-6">
                                <label>Product Name</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="Product Name"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Price</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="$100"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Color</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="Red"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Size</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="XS,Xl,M,L,XL"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-12">
                                <label>Category</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="Category Name"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                                <label>Upload Photos</label>
                                <div className="form-group">
                                  <input
                                    type="file"
                                    class="field"
                                    id="formFileMultiple"
                                    multiple
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mb-3">
                                <small>
                                  (Accepted file types: jpg, jpeg, png, Max.
                                  file size: 10 MB, Max. files: 200.)
                                </small>
                              </div>
                            </div>
                            <div className="form-group">
                              <button type="button" className="btn">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Merchandise;
