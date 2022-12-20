import React, { useEffect,useState } from 'react'
import AdminLeftNav from './AdminLeftNav';
import img_01 from "../../../Assets/images/img_001.webp"
import axios from "axios";
function RaffleAdmin() {

  const [showLotary, setShowLotary] = useState([]);
  useEffect(()=>{
    fetchLotaryApi();
  },[])

  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "getLotteryDetail"
      );
      if (response.data.data.length > 0) {
        console.log("refral",showLotary)
        setShowLotary(response.data.data);
      } else {
        console.log("Data is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">     
                <AdminLeftNav/>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Raffle Admin</h3>
              
                
             
              <hr />
              <div class="card_Gray table-responsive vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description </th>
                      <th scope="col">Price of 1 ticket</th>
                      <th scope="col">Total ticket stock</th>
                      <th scope="col">Deadline to purchase ticket</th>
                      <th scope="col">Lucky draw date</th>
                      <th scope="col" style={{textAlign: "right"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
              
                  { showLotary.length > 0 ? showLotary.map((data,index)=>(
                    <tr>
                    <th scope="row">1</th>
                    <td> {data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                    <td>20</td>
                    <td>{data.dealEndDate}</td>
                    <td>15-01-2023</td>
                    <td className='actionBtn'>
                      {/* <button data-toggle="modal" data-target="#FiltersModal"><i class="fa-solid fa-pencil"></i></button>
                      <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                      <button><i class="fa-solid fa-trash-can"></i></button>   */}
                    </td>
                  </tr>
                  )
                 
                    
                    ) : null}
                    
                   
                  
                  
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
                            <button type="button" className="close" data-dismiss="modal">
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
                                    <label>Price od 1  ticket</label>
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
                                        <input type="file" class="field" id="formFileMultiple" multiple/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>Upload Videos</label>
                                    <div className="form-group">
                                        <input type="file" class="field" id="formFileMultiple" multiple/>
                                    </div>
                                </div>
                                <div className='col-md-12 mb-3'><small>(Accepted file types: jpg, jpeg, png, Max. file size: 10 MB, Max. files: 200.)

</small></div>
                                <div className="col-12 col-md-12">
                                    <label>Description</label>
                                    <div className="form-group">
                                    <textarea className="field" placeholder='Description here'></textarea>
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
  )
}

export default RaffleAdmin