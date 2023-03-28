import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "../AdminLeftNav";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../../UI/globaleVar";
import { toast } from "react-toastify";

const DealerListFeature = () => {
  const [dealerData, setDealerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}get_all_dealers`
        );
        setDealerData([...res.data.featured_dealer]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealer();
  }, []);

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


  const handleDelete = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}destroy_dealer_featured/${id}`
      );
      if (res.data.status === 200) {
        notify("Deleted successfully !");
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
                  className="d-flex"
                  id="widthChnge"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Dealer List</h3>

                  <Link to="/admin-dealer/add-dealer" className="orange_btn">
                   + Add Dealer
                  </Link>
                </div>

                <hr id="hr" />

                <ul className="postTopOption" id="widthChnge">
                  <li className="post_search">
                    <input
                      type="search"
                      name="search"
                      placeholder="Search…"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </li>
                </ul>

                <div
                  className="card_Gray table-responsive vehicleSub"
                  id="scrollable"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No</th>
                          <th scope="col">Image</th>

                          <th scope="col">Name</th>
                          <th scope="col">Description </th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dealerData &&
                            dealerData?.filter((curVal) => {
                              if (searchTerm == '') {
                                return curVal
                              } else if (curVal.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return curVal
                              }
                            })
                              
                            ?.map((curElem, i) => {
                            return (
                              <tr key={curElem.id}>
                                <td>{i + 1}</td>
                                <td>
                                  {curElem.image_logo && (
                                    <img
                                      loading="lazy"
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                      }}
                                      src={
                                        curElem.image_logo[0] &&
                                        `${process.env.REACT_APP_URL}/${curElem.image_logo[0]?.logo}`
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
                                <td>{curElem?.name}</td>
                                <td>
                                  {curElem?.dealerDescription &&
                                    parse(
                                      curElem?.dealerDescription?.substr(
                                        0,
                                        125
                                      ),
                                      strToHtml
                                    )}
                                </td>

                                <td className="">
                                  <div
                                    onClick={() => handleDelete(curElem.id)}
                                    className="p-2"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
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
