import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function GearProducts() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}allproduct`);
      if (res.status === 200 && res.data.data) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteproduct/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <ul className="postTopOption">
                <li className="post_search">
                  <input type="search" name="search" placeholder="Search…" />
                </li>
              </ul>
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
                    {products.map((curElem, i) => {
                      return (
                        <tr key={curElem.id}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            <div className="cartImg">
                              <img src={img_01} />
                            </div>
                          </td>
                          <td>{curElem.title}</td>
                          <td>${curElem.price}</td>
                          <td>{curElem.color}</td>
                          <td>{curElem.size}</td>
                          <td>{curElem.category}</td>
                          <td className="actionBtn">
                            <button
                              data-toggle="modal"
                              data-target="#MerchandiseEdit"
                            >
                              <i class="fa-solid fa-pencil"></i>
                            </button>
                            {/* <button><i class="fa-sharp fa-solid fa-plus"></i></button> */}
                            <button onClick={() => handleDelete(curElem.id)}>
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

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
