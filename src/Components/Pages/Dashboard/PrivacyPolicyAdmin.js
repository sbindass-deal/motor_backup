import React, { useEffect, useState } from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AdminLeftNav from './AdminLeftNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import { strToHtml } from '../../UI/globaleVar';
const PrivacyPolicyAdmin = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}getPrivacyPolicy`)
      .then(response => {
        console.log(89800,response)
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


 
  return (
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
                <h3>Giveaways Content</h3>
                {
                  data?.length < 0 ? <div>
                    <Link to="/admin/addprivacy" className="orange_btn">
                      + Add Privacy
                    </Link>
                  </div> : null
}
                
              </div>

              <hr id="hr" />
              <ul className="postTopOption" id="widthChnge">
              
              </ul>
              <div
                className="card_Gray table-responsive merchant vehicleSub"
                id="scrollable"
              >
                
                  <table className="table text-center ">
                    {/* <thead>
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Description </th>
                        
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead> */}
                  <tbody>
                    {
                      data?.map((curVal, i) => {
                        console.log(798989, curVal,i)
                        return <tr>
                          {/* <th >{1 + i}</th> */}
                          
                          <td>{ parse(
                            curVal?.description,
                                      strToHtml
                                    )}</td>
                          <td>
                            <Link to={`/admin/editBlog/${curVal.id}`}>
                              <button>
                                Edit
                              </button>
                            </Link>
                          </td>

                        </tr>
                      })
                    }
                   
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

export default PrivacyPolicyAdmin