import axios from "axios";
import React, { useEffect, useState } from "react";
import NotAvailable from "../../UI/NotAvailable";
import ResultNotFound from "../../UI/ResultNotFound";
import SmallSpinner from "../../UI/SmallSpinner";
import Products from "./Products";
import StoreHero from "./StoreHero";
import G3 from "../.././../Assets/images/G3.png";
import G3white from "../../../Assets/images/G3Logo-white.png";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductApi = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}allproduct`);
        console.log(889, res)
        if (res.status === 200) {
          setProducts(res.data.data.product);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProductApi();
  }, []);

  const filteredData =
    products.length > 0
      ? products.filter((item) =>
          item.title ? item.title.toLowerCase().includes(searchValue) : item
        )
      : [];

  if (loading) {
    return <SmallSpinner spin={true} />;
  }
  return (
    <>
      <section className="shopHeroSection d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText shop">
                <img className="g3Logo W" src={G3white} alt="G3" />
                <img className="g3Logo" src={G3} alt="G3" />
                {/* <h1>
                  Gas Guzzlrs <span>G e a r</span>
                </h1> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <StoreHero setSearchValue={setSearchValue} />
      <section className="pt_40 shopPg">
        <div className="auction_container">
          {products.length <= 0 ? (
            <NotAvailable text="Product is not available" />
          ) : (
            <div className="row">
              {filteredData.length <= 0 ? (
                <ResultNotFound text="Result not found! 🙄" />
              ) : (
                filteredData.map((curElem) => {
                  return (
                    <Products
                      key={curElem.id}
                      id={curElem.id}
                      price={curElem.price}
                      images={curElem.images}
                      title={curElem.title}
                      curElem={curElem}
                      coupon_code={curElem.coupon_code}
                      multiplier={curElem.multiplier}
                      
                    />
                  );
                })
              )}
              {/* {products.length > 0 && (
              <div className="col-12 text-center">
                <Link href="/shop" className="btn mt-4">
                  View More
                </Link>
              </div>
            )} */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
