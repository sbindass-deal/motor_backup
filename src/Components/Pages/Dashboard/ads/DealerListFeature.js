import React from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "../AdminLeftNav";

const DealerListFeature = () => {
  return (
    <>
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
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Dealer List </h3>
                  <Link to="/admin-dealer/add-dealer" className="btn">
                    Add Dealer
                  </Link>
                </div>

                <hr />
                <div class="card_Gray table-responsive vehicleSub">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sn.n</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description </th>
                        <th scope="col">Price of single Listing</th>
                        <th scope="col">Price of 5 Listing</th>
                        <th scope="col" style={{ textAlign: "right" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>price</td>
                        <td>Amount</td>
                        <td>List</td>
                        <td>
                          <Link to={``} className="btn">
                            <i class="fa-solid fa-pencil"></i>
                          </Link>
                        </td>
                        <td>
                          <Link to={``} className="btn">
                            <i class="fa-solid fa-trash-can"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DealerListFeature;
