import React ,{useEffect,useState} from 'react'
import AdminLeftNav from './AdminLeftNav';
import axios from "axios";

function VehicleSubmission() {
  const [showvehicles, setShowvehicles] = useState([]);
  useEffect(()=>{
    fetchLotaryApi();
  },[])

  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "vehicles"
      );
      console.log("refral",response.data)
      if (response.data.data.length > 0) {
        
        setShowvehicles(response.data.data);
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
              <div className="card_Gray mb-5 mb-md-0">
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
                         { showvehicles.length > 0 ? showvehicles.map((data,index)=>(
                  
                    <tr>
                      <th scope="row">{index}</th>
                      <td>{data.userId}</td>
                      <td>{data.name}</td>
                      <td>12:12:54</td>
                      <td>{data.year}</td>
                      <td>{data.make}</td>
                      <td className='actionBtn'>
                        <button><i class="fa-solid fa-pencil"></i></button>
                        <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                        <button><i class="fa-solid fa-trash-can"></i></button>  
                      </td>
                    </tr>
                     )):null}
                   
                  
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
