import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../../redux/reducers/cartSlice";

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
  const [size , setSize] = useState();
  const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="

  // const [addButton , setAddButton] = useState(false)

useEffect(() => {

  axios({
    method: "get",
    url: `${process.env.REACT_APP_URL}getAllSize`,
    "Authorization": TOKEN
  }).then((d) => { setSize(d.data.data); });

}, [])

  
  return (
    <>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card_post box_shadow_common">
          <div className="d-flex border">
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
          </div>
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
                    {multiplier+"X"}
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
              <li class="add">+</li>
              <li class="">
              <Link to={`/shop/${id}`}><button
                  // onClick={() => {
                  //   dispatch(addProduct({ ...curElem, quantity: 1 }));
                  //   notify("Added to cart.");
                  //   setAddButton(true)
                  // }}
                  className="orange_btn"
                  // disabled ={addButton}
                >
                  Add To Cart <span>2</span>
                </button></Link>
              </li>
              <li class="add">-</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
