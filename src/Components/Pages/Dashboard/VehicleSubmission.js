import React from 'react'
import AdminLeftNav from './AdminLeftNav';

function VehicleSubmission() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <AdminLeftNav/>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Vehicle Submission</h3>
              <hr />
              <div class="card_Gray table-responsive vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">User Id</th>
                      <th scope="col">User Name</th>
                      <th  scope="col" colspan="3" style={{textAlign:"center"}}>Car Info</th>
                   
                      <th scope="col" style={{textAlign: "right"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>A41445566</td>
                      <td>Nikhil</td>
                      <td>12:12:54</td>
                      <td>2020</td>
                      <td>Honda</td>
                      <td className='actionBtn'>
                        <button><i class="fa-solid fa-pencil"></i></button>
                        <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                        <button><i class="fa-solid fa-trash-can"></i></button>  
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>A41445566</td>
                      <td>Nikhil</td>
                      <td>12:12:54</td>
                      <td>2020</td>
                      <td>Honda</td>
                      <td className='actionBtn'>
                        <button><i class="fa-solid fa-pencil"></i></button>
                        <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                        <button><i class="fa-solid fa-trash-can"></i></button>  
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>A41445566</td>
                      <td>Nikhil</td>
                      <td>12:12:54</td>
                      <td>2020</td>
                      <td>Honda</td>
                      <td className='actionBtn'>
                        <button><i class="fa-solid fa-pencil"></i></button>
                        <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                        <button><i class="fa-solid fa-trash-can"></i></button>  
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>




    
    </div>
  )
}

export default VehicleSubmission
