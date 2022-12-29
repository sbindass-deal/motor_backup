import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import { Link } from "react-router-dom";

function GearProducts() {
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
              <h3>GearProducts</h3>
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
                    <Link to="/add/gear-product" className="btn mt-4">
                      <i class="fa-sharp fa-solid fa-plus"></i>
                    </Link>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GearProducts;
