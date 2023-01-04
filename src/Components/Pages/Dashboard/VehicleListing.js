import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLeftNav from './AdminLeftNav'

const VehicleListing = () => {
const [getData,setGetData]=useState([])
    const addListingData=async()=>{
                    
              const res = await axios.get(`${process.env.REACT_APP_URL}getAllPlans`)
                
              .then((respone)=>{
                if(respone.status===200){
                 setGetData(respone.data.data)
                }
              })
              .catch((error)=>{
                console.log("####",error)
              })
              
          };
    

    useEffect(()=>{
        addListingData(); 
    },[])

  return (<>
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
                style={{ justifyContent: "space-between" }}
              >
                <h3>Vehicle Listing</h3>
                <Link to="/admin/addVehicle-listing" className="btn">
                Add Listing
                </Link>
              </div>

              <hr />
              <div class="card_Gray table-responsive vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Sn.n</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description </th>
                      <th scope="col">Price of single Listing</th>
                      <th scope="col">Price of 5 Listing</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                      View
                      </th>
                    </tr>
                  </thead>
                  <tbody> 
                    {getData && getData.map((v)=>{
                        const {id,list,maxprice,name,price}=v;
                        return <tr>
                       <td>{id}</td>
                        <td>{name}</td>
                        <td>{maxprice}</td>
                        <td>{price}</td>
                        <td>{list}</td>
                        <td><Link to="/admin/vehicle-listing-details" className='btn btn-warning'>Edit</Link></td>
                        </tr>
                    })}                        
                         
                  </tbody>
                </table>
              </div>

              {/* <!-- Edit PopUp--> */}

              <div class="card_Gray table-responsive vehicleSub">
                <div className="container">
                  <div className="modal fade" id="FiltersModal">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header border-0">
                          <h4 className="modal-title">Edit Raffle</h4>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form>
                            <div className="row row_gap_5">
                              <div className="col-12 col-md-6">
                                <label>Raffle Name</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="1900"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Price od 1 ticket</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="2023"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Total ticket stock</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="2023"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Deadline to purchase ticket</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="2023"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-12">
                                <label>Lucky draw date</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="2023"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                                <label>Upload Photos</label>
                                <div className="form-group">
                                  <input
                                    type="file"
                                    class="field"
                                    id="formFileMultiple"
                                    multiple
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label>Upload Videos</label>
                                <div className="form-group">
                                  <input
                                    type="file"
                                    class="field"
                                    id="formFileMultiple"
                                    multiple
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mb-3">
                                <small>
                                  (Accepted file types: jpg, jpeg, png, Max.
                                  file size: 10 MB, Max. files: 200.)
                                </small>
                              </div>
                              <div className="col-12 col-md-12">
                                <label>Description</label>
                                <div className="form-group">
                                  <textarea
                                    className="field"
                                    placeholder="Description here"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <button type="button" className="btn">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>)
}

export default VehicleListing