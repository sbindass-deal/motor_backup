import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "../AdminLeftNav";
import axios from "axios";

const DealerListFeature = () => {
  const [dealerData, setDealerData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}get_all_dealers`
        );
        setDealerData([...res.data.featured_dealer]);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealer();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}destroy_dealer_featured/${id}`
      );
      if (res.data.status === 200) {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
                <div
                  className="d-flex" id="widthChnge"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Dealer List </h3>
                 

                  <Link to="/admin-dealer/add-dealer" className="orange_btn" style={{
                    // padding: "6px",
                    // fontSize: "18px",
                    // fontWeight: "100"

                  }}>
                    Add Dealer
                  </Link>
                </div>

                <hr id="hr"/>
                <div class="card_Gray table-responsive vehicleSub" id="scrollable">
                  {
                    loading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div> : <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No</th>
                          <th scope="col">Image</th>

                          <th scope="col">Title</th>
                          <th scope="col">Description </th>
                          {/* <th scope="col">Price of single Listing</th>
                        <th scope="col">Price of 5 Listing</th> */}
                          <th scope="col"
                          // style={{ textAlign: "right" }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dealerData &&
                          dealerData.map((curElem, i) => {
                            return (
                              <tr key={curElem.id}>
                                <td>{i + 1}</td>
                                <td>
                                  {curElem.image && (
                                    <img
                                      loading="lazy"
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                      }}
                                      src={
                                        curElem.image[0] &&
                                        `${process.env.REACT_APP_URL}/${curElem.image[0]?.logo}`
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onError = null;
                                        currentTarget.src =
                                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                      }}
                                      alt={curElem.name}
                                    />
                                  )}
                                </td>
                                <td>
                                  {curElem.image && curElem.image[0]?.title}
                                </td>
                                <td>{curElem.dealerDescription}</td>
                                {/* <td>Amount</td>
                              <td>List</td> */}
                                {/* <td>
                                <div
                                  className="p-2"
                                  style={{ cursor: "pointer" }}
                                >
                                  <i class="fa-solid fa-pencil"></i>
                                </div>
                              </td> */}
                                <td className="" >
                                  <div
                                    onClick={() => handleDelete(curElem.id)}
                                    className="p-2"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fa-solid fa-trash-can"></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  }
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DealerListFeature;
