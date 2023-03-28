import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function GearProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state);
  // const products = data?.gearReducer?.gearData;
  const [products , setProducts] = useState();
  const [size , setSize] = useState();
  const [color , setColor] = useState();
  const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}allproduct`).then((d)=>{setProducts(d.data.data.product)});

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllColors`,
      "Authorization": TOKEN
    }).then((d) => { setColor( d.data.data );  });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllSize`,
      "Authorization": TOKEN
    }).then((d) => { setSize(d.data.data);});

  }, [])

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteproduct/${id}`)
      .then((response) => {
        if (response.status === 200) {
          notify("Deleted successfully !");
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
              {/* <h3>Gear Products</h3>
              <Link to="/add/gear-product" className="orange_btn">
                <i className="fa-sharp fa-solid fa-plus"></i>
              </Link> */}

              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
                id="widthChnge"
              >
                <h3>Gear Products</h3>
                <Link to="/add/gear-product" className="orange_btn">
                  + Add Products
                </Link>
              </div>

              <hr id="hr" />
              <ul className="postTopOption" id="widthChnge">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search…"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </li>
              </ul>
              <div
                className="card_Gray table-responsive merchant vehicleSub"
                id="scrollable"
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Image </th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Color</th>
                      <th scope="col">Size</th>
                      <th scope="col">Category </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      ?.filter((curElem, i) => {
                        if (searchTerm == "") {
                          return curElem;
                        } else if (
                          curElem.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                          // ||
                          // curElem.color
                          //   .toLowerCase()
                          //   .includes(searchTerm.toLowerCase()) ||
                          // curElem.size
                          //   .toLowerCase()
                          //   .includes(searchTerm.toLowerCase()) ||
                          // curElem.category
                          //   .toLowerCase()
                          //   .includes(searchTerm.toLowerCase())
                        ) {
                          return curElem;
                        }
                      }
                      )
                      ?.map((curElem, i) => {
                        
                        return (
                          <tr key={curElem?.id}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <div className="">
                                <img
                                  width={100}
                                  className="img-fluid"
                                  src={`${process.env.REACT_APP_URL}upload/products/${curElem?.images[0]?.image}`}
                                  alt={curElem.title}
                                />
                              </div>
                            </td>
                            <td>{curElem?.title}</td>
                            <td>{curElem?.product_inventry[0]?.price}</td>
                            <td>{
                            color?.map((d , i) => {
                              if(d?.id == curElem?.product_inventry[0]?.color_id){
                                return d?.color
                              }
                            })
                            }</td>
                            <td>{
                              size?.map((d , i) => {
                                if(d?.id == curElem?.product_inventry[0]?.size_id){
                                  return d?.size
                                }
                              })
                            }</td>
                            <td>{curElem?.category}</td>
                            <td className="actionBtn">
                              <Link to={`/gear-product/${curElem?.id}`}>
                                <button
                                  data-toggle="modal"
                                  data-target="#MerchandiseEdit"
                                >
                                  <i className="fa-solid fa-pencil"></i>
                                </button>
                              </Link>

                              {/* <button><i className="fa-sharp fa-solid fa-plus"></i></button> */}
                              <button onClick={() => handleDelete(curElem?.id)}>
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                    {/* <Link to="/add/gear-product" className="btn mt-4">
                      <i className="fa-sharp fa-solid fa-plus"></i>
                    </Link> */}
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
