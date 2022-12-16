import React from "react";
import { Link } from "react-router-dom";

const Products = ({ id, price, image, title }) => {
  return (
    <>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card_post">
          <Link to={`/shop/${id}`} class="card_postImg card_postImg_200">
            <img src={image} />
          </Link>
          <div class="card_postInfo pt-3">
            <h6>
              <Link to={`/shop/${id}`}>{title}</Link>
            </h6>
            <ul class="priceDateList">
              <li class="price__">${price}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
