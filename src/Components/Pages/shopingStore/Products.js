import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../../redux/reducers/cartSlice";

const Products = ({ id, price, image, title, curElem }) => {
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
  return (
    <>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card_post">
          <Link to={`/shop/${id}`} class="card_postImg card_postImg_200">
            <img
              src={`${process.env.REACT_APP_URL}upload/products/${image}`}
              alt={title}
            />
          </Link>
          <div class="card_postInfo pt-3">
            <h6>
              <Link to={`/shop/${id}`}>{title}</Link>
            </h6>
            <p>{curElem.description.substr(0, 80)}...</p>
            <div className="sizeColor">
              <div className="sizeColor">Category: {curElem.category}</div>
              <div className="size">Size: {curElem.size}</div>
            </div>
            <ul
              class="priceDateList"
              style={{ justifyContent: "space-between" }}
            >
              <li class="price__">${price}</li>
              <li class="">
                <button
                  onClick={() => {
                    dispatch(addProduct({ ...curElem, quantity: 1 }));
                    notify("Item Added Successfully");
                  }}
                  className="removeBtn"
                >
                  Add
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
