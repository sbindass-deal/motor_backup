import React, { useEffect, useState } from "react";
import "./Shopdetail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "./SliderProduct";
import axios from "axios";
import { useParams } from "react-router";
import SmallSpinner from "../../UI/SmallSpinner";
import NotAvailable from "../../UI/NotAvailable";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/reducers/cartSlice";
import { toast } from "react-toastify";
const ShopDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}allproduct/${id}`
        );
        if (res.status === 200) {
          setProduct(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleProduct = () => {
    dispatch(addProduct({ ...product, quantity: 1 }));
    notify("Item Added Successfully");
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <SmallSpinner spin={true} />
        ) : !product ? (
          <NotAvailable text="Product is not available" />
        ) : (
          <div className="row">
            <div className="col-md-6 sliderSec ">
              <img
                src={`${process.env.REACT_APP_URL}upload/products/${product.image}`}
                alt={product.title}
              />
            </div>
            <div className="col-md-6 rightSec">
              <h5 className="catagories">{product.category}</h5>
              <h2>{product.title}</h2>
              <p className="price__">${product.price}</p>
              <p className="product_dec">
                <b>Product ID: {product.id}</b>
                <br />
                {product.description}
              </p>

              <div className="sizeColor">
                <div className="sizeColor">Category: {product.category}</div>
                <div className="size">Size: {product.size}</div>
              </div>
              <p className="product_dec">Stock: {product.stocks}</p>
              <button onClick={handleProduct} type="button" className="btn">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <SliderProduct />
      {/* <AddtocarPopup /> */}
    </>
  );
};

export default ShopDetails;
