import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotAvailable from "../../UI/NotAvailable";
import SmallSpinner from "../../UI/SmallSpinner";
// import img_01 from "../../../Assets/images/img-1.webp";
import Products from "./Products";
import StoreHero from "./StoreHero";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductApi = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://fakestoreapi.com/products`);
        if (res.status === 200) {
          setProducts(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProductApi();
  }, []);

  return (
    <>
      <section class="shopHeroSection d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-8 offset-lg-2">
              <div class="heroText shop">
                <h3>G3</h3>
                <h1>
                  Gas Guzzlrs <span>G a r e</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StoreHero setSearchValue={setSearchValue} />
      <section class="pt_40 shopPg">
        <div class="container">
          <div class="row">
            {loading ? (
              <SmallSpinner spin={true} />
            ) : products.length <= 0 ? (
              <NotAvailable text="Product is not available" />
            ) : (
              products
                .filter((item) =>
                  item.title.toLowerCase().includes(searchValue)
                )
                .map((curElem) => {
                  return (
                    <Products
                      key={curElem.id}
                      id={curElem.id}
                      price={curElem.price}
                      image={curElem.image}
                      title={curElem.title}
                    />
                  );
                })
            )}
            {products.length > 0 && (
              <div class="col-12 text-center">
                <Link href="/shop" class="btn mt-4">
                  View More
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
