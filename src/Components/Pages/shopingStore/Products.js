import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../../redux/reducers/cartSlice";
import { Carousel } from "antd";
import { useSelector } from "react-redux";

const Products = ({ id, price, images, title, curElem, coupon_code, multiplier }) => {
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

  const dispatch = useDispatch();
  const [imageValue, setImageValsue] = useState(0);
  const [size, setSize] = useState();
  const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="
  const contentStyle = {
    maxHeight: "60vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    cursor: "pointer",
  };
  const logingUser = useSelector((state) => state);
  const navigate = useNavigate();

  // const [addButton , setAddButton] = useState(false)

  useEffect(() => {

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllSize`,
      "Authorization": TOKEN
    }).then((d) => { setSize(d.data.data); });

  }, [])

  console.log(curElem);

  const handleViewProduct = (id) => {
    navigate(`/shop/${id}`)
  }



  return (
    <>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card_post box_shadow_common">
          {/* <div className="d-flex border">
            <div className="w-25">
              {
                images?.map((d, i) => {
                  return (
                    <img
                      onClick={() => setImageValsue(i)}
                      src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                      alt={title}
                    />
                  )
                })
              }
            </div>
            <div className="w-100">
              <Link to={`/shop/${id}`} class="card_postImg card_postImg_200">
                <img
                  src={`${process.env.REACT_APP_URL}upload/products/${images[imageValue]?.image}`}
                  alt={title}
                />
              </Link>
            </div>
          </div> */}
          <Carousel autoplay>
            {

              images?.map((d, i) => {
                return (
                  <div className="carDesk">
                    <Link to={`/shop/${id}`} class="card_postImg card_postImg_200">
                      <img
                        src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                        // alt={product.title}
                        style={contentStyle}
                        className="img-fluid"
                      // onClick={() => { setVisible(true); setIndex(`${process.env.REACT_APP_URL}upload/products/${d?.image}`) }}
                      />
                    </Link>
                  </div>
                )
              })
            }
          </Carousel>
          <div class="card_postInfo pt-3">
            <div className="entries_count dewew">


              <div className="entries_count2 " >
                {/* <i class="fa-solid fa-ticket"></i>
                <p class="grid_entries_count">525</p>
                <p class="grid_label">Entries</p>
                <p class="multiplier-value blink-soft">15X</p> */}
                <div class="vs_grid_entries entries-default " >
                  <div class="entries-count">
                    <i class="fa-solid fa-ticket"></i>
                    <span class="grid_entries_count">{coupon_code}</span>
                    <span class="grid_label">Entries</span>
                  </div>
                  <div class="multiplier-value blink-soft ml-3">
                    {multiplier + "X"}
                  </div>
                </div>

              </div>

            </div>
            <div class="vs_grid_entries entries-default">
              <h5 className="edrfff"><Link to={`/shop/${id}`}>{title}</Link></h5>


            </div>
            <div class="vs_grid_entries entries-default">
              <p class="price__">${curElem?.product_inventry[0]?.price}</p>

            </div>
            <div class="vs_grid_entries entries-default">

            </div>
            {/* <div class="vs_grid_entries entries-default mb-3">
              <div class="entries-count">
                <i class="fa-solid fa-ticket"></i>
                <span class="grid_entries_count">525</span>
                <span class="grid_label">Entries</span>
              </div>
              <div class="multiplier-value blink-soft">
                15X
              </div>
            </div> */}

            {/* <p>{curElem.description.substr(0, 80)}...</p> */}
            {/* <div className="sizeColor">
              <div className="sizeColor">Category : {curElem.category}</div>
              <div className="size">Size : {
                size?.map((d , i) => {
                  if(d?.id == curElem?.product_inventry[0]?.size_id){
                    return d?.size
                  }
                })
              }</div>
            </div> */}
            <ul
              class="priceDateList"
              style={{ justifyContent: "space-between" }}
            >
              {/* <li class="add">+</li> */}
              <li class="">
                {/* <Link to={`/shop/${id}`}> */}
                {/* <button
                  onClick={() => {
                    dispatch(addProduct({ ...curElem, quantity: 1 , size_id: curElem.product_inventry[0]?.size_id , productId: curElem.product_inventry[0]?.product_id , color_id : curElem.product_inventry[0]?.color_id}));
                    notify("Added to cart.");
                    // setAddButton(true)
                  }}
                  className="orange_btn"
                  // disabled ={addButton}
                >
                  Add To Cart 
                </button> */}

                <button
                  onClick={() => {
                    if (logingUser.login.token) {
                      handleViewProduct(id)
                    }

                    else {
                      notify("Please login", 409);
                    }
                  }}

                  // dispatch(addProduct({...curElem, quantity: 1, size_id: curElem.product_inventry[0]?.size_id, productId: curElem.product_inventry[0]?.product_id, color_id: curElem.product_inventry[0]?.color_id }));
                  // notify("Added to cart.");

                  // disabled ={addButton}
                  className="orange_btn"
                >
                  View Product
                </button>

                {/* </Link> */}
              </li>
              {/* <li class="add">-</li> */}
            </ul>
          </div>
        </div>
      </div >
    </>
  );
};

export default Products;
