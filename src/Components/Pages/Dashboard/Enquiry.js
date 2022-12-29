import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";

const Enquiry = () => {
  const [enqData, setEnqData] = useState([]);
  const fetchApi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}getAllEnquiry`);
      setEnqData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <AdminLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Notifications</h3>
              <hr />
              <div class="card_Gray table-responsive merchant vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S no.</th>
                      <th scope="col">Name </th>
                      <th scope="col">Email</th>
                      <th scope="col">Number</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enqData.map((curElem, i) => {
                      return (
                        <tr key={curElem.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{curElem.name}</td>
                          <td> {curElem.email} </td>
                          <td>{curElem.phone}</td>

                          <td className="actionBtn">{curElem.comments}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
