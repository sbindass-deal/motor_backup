import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Shopdetail.css";
import img_01 from "../../../Assets/images/img-1.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "./SliderProduct";
import axios from "axios";
import { useParams } from "react-router";
import SmallSpinner from "../../UI/SmallSpinner";
import NotAvailable from "../../UI/NotAvailable";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/reducers/cartSlice";
const ShopDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
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
              <Carousel slide={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img_01}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img_01}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img_01}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
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
                <select className="color">
                  <option>Select Color</option>
                  <option>Black</option>
                  <option>Red </option>
                </select>
                <select className="size">
                  <option>Select Size</option>
                  <option>2-3 Years </option>
                  <option>2-3 Years </option>
                </select>
              </div>
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
