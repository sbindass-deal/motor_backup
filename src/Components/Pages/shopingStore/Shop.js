import axios from "axios";
import React, { useEffect, useState } from "react";
import NotAvailable from "../../UI/NotAvailable";
import ResultNotFound from "../../UI/ResultNotFound";
import SmallSpinner from "../../UI/SmallSpinner";
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
        const res = await axios.get(`${process.env.REACT_APP_URL}allproduct`);
        if (res.status === 200) {
          setProducts(res.data.data);
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
                <h3>G3</h3>
                <h1>
                  Gas Guzzlrs <span>G e a r</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StoreHero setSearchValue={setSearchValue} />
      <section className="pt_40 shopPg">
        <div className="container">
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
                      image={curElem.image}
                      title={curElem.title}
                      curElem={curElem}
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
