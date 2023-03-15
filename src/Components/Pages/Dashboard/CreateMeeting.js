import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "./AdminLeftNav";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";


const CreateMeeting = () => {
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getAllEvent`
        );
        console.log(7676, res.data.data.allevent)
        setMeetingData(res.data.data.allevent);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeetingDetail();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}deleteEvent/${id}`
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
                  className="d-flex"
                  id="widthChnge"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Create Events</h3>

                  <Link to="/admin-add-meeting/add-meeting" className="orange_btn">
                    Add Create Event
                  </Link>
                </div>

                <hr id="hr" />
                <div
                  class="card_Gray table-responsive vehicleSub"
                  id="scrollable"
                >
                  {
                    loading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div> : <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No</th>
                          <th scope="col">image</th>
                          {/* <th scope="col">Image</th> */}
                          <th scope="col">Title</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date </th>
                          <th scope="col">Website Link</th>
                          <th scope="col">Facebook Link</th>
                          <th scope="col">Twitter Link</th>
                          <th scope="col">Email</th>
                          <th scope="col">Description</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>



                      <tbody>
                        {
                          meetingData.map((curVal, index) => {
                            console.log(989, curVal, index)
                            return <tr>
                              <td>{index + 1}</td>
                              <td>
                                <img src={`https://api.gasguzzlrs.com/upload/event/${curVal.image}`} alt="" />
                              </td>
                              <td>{curVal.title}</td>
                              <td>{curVal.start_date}</td>
                              <td>{curVal.end_date}</td>
                              <td>{curVal.url}</td>
                              <td>{curVal.facebook}</td>
                              <td>{curVal.twitter}</td>
                              <td>{curVal.email}</td>
                              {/* <td>{curVal.description.substr(0,100)}</td> */}
                              <td>{parse(
                                curVal?.description.substr(0, 100),
                                strToHtml
                              )}</td>
                              <td>

                                <Link to={`/edit-meeting/${curVal.id}`}>
                                  <button>
                                    <i class="fa-solid fa-pencil"></i>{" "}
                                    Edit
                                  </button>
                                </Link>
                                <button onClick={() => handleDelete(curVal.id)}>Delete</button>
                              </td>
                            </tr>
                          })
                        }




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

export default CreateMeeting;













































































// import axios from "axios";
// import React, { useEffect, useRef } from "react";
// import { useState } from "react";
// import AdminLeftNav from "./AdminLeftNav";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";

// const CreateMeeting = () => {
//   const [description, setDescription] = useState(EditorState.createEmpty());
//   const [file, setFile] = useState([]);

//   const handleContent = (e) => {
//     setDescription(e);
//     console.log(111, e);
//   };

//   const [meetingDetail, setMeetingDetail] = useState({
//     title: "",
//     startdate: "",
//     enddate: "",
//     websitelink: "",
//     facebooklink: "",
//     twitterlink: "",
//     emailid:""
//   })


 
//   const handleChange = (e) => {
//     const name = e.target.name
//     const value = e.target.value
    
//     setMeetingDetail({...meetingDetail,[name]:value})

//   }

  


//   const inputRef = useRef();

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setFile((prevState) => [...event.dataTransfer.files[0]]);
//   };

//   console.log(889,file[0])

//   const handleSubmit = async(e) => {
//     e.preventDefault()
//     const url = `${process.env.REACT_APP_URL}AddEvent`;


//     const formData=new FormData()
//     formData.append('title', meetingDetail.title)
//     formData.append('url', meetingDetail.websitelink)
//     formData.append('start_date', meetingDetail.startdate)
//     formData.append('end_date', meetingDetail.enddate)
//     formData.append('facebook', meetingDetail.facebooklink)
//     formData.append('twitter', meetingDetail.twitterlink)
//     formData.append('email', meetingDetail.emailid)
//     formData.append(
//       "description",
//       draftToHtml(convertToRaw(description.getCurrentContent()))
//     );

//     formData.append("image", file[0]);


//     const config = {
//       headers: {
//         Authorization: "eyJpdiI6IngrZ1AreGVkSFRlUHJjQTc2WjM4U2c9PSIsInZhbHVlIjoiS0lQa2g3UnY4UzJDZU5IN3VlYi9tZ00rNDFXY05oM01mMnMzbmZqVGthMD0iLCJtYWMiOiIzZDgyNjI4MmI5NDJkZjE2YzYxYjcxMjcyOTgxZGZlZWNjODBjYjFlYWY1NjA3YWNmNjE0MGIwMTY3MDc3MThmIiwidGFnIjoiIn0=",
//       },
//     };
  
//     await axios.post(url, formData, config)
//       .then(function (response) {
//         console.log(109,response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     setMeetingDetail({
//       title: "",
//       startdate: "",
//       enddate: "",
//       websitelink: "",
//       facebooklink: "",
//       twitterlink: "",
//       emailid: "",
      
//     });


//   }
   
//   return (
//     <>
//       <section className="ptb_80 pt_sm_50">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-md-4 col-lg-3">
//               <div className="card_Gray mb-5 mb-md-0 divSticky">
//                 <AdminLeftNav />
//               </div>
//             </div>

//             <div className="col-12 col-md-8 col-lg-9">
//               <h3>Create Events</h3>

//               <hr id="hr" />
//               <form onSubmit={handleSubmit}>
//                 <div class="row">
//                   <div class="col-md-6">
//                     <label htmlFor="">Title</label>
//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Title"
//                       name="title"
//                       onChange={handleChange}
//                       value={meetingDetail.title}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">Start Date</label>
//                     <input
//                       type="date"
//                       class="form-control"
//                       placeholder="First name"
//                       name="startdate"
//                       onChange={handleChange}
//                       value={meetingDetail.startdate}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">End Date</label>
//                     <input
//                       type="date"
//                       class="form-control"
//                       placeholder="First name"
//                       name="enddate"
//                       onChange={handleChange}
//                       value={meetingDetail.enddate}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">Website Link</label>
//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Website Link"
//                       name="websitelink"
//                       onChange={handleChange}
//                       value={meetingDetail.websitelink}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">Facebook Link</label>

//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Facebook link"
//                       name="facebooklink"
//                       onChange={handleChange}
//                       value={meetingDetail.facebooklink}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">Twitter Link</label>

//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Twitter link"
//                       name="twitterlink"
//                       onChange={handleChange}
//                       value={meetingDetail.twitterlink}
//                     />
//                   </div>
//                   <div class="col-md-6">
//                     <label htmlFor="">Email Id</label>
//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Support email id"
//                       name="emailid"
//                       onChange={handleChange}
//                       value={meetingDetail.emailid}
//                     />
//                   </div>

//                   <div className="col-12 mb-3">
//                     <label>Description</label>
//                     <div className="border border-2 border-dark">
//                       <Editor
//                         editorStyle={{
//                           background: "white",
//                           padding: "15px",
//                           minHeight: "30vh",
//                           color: "black",
//                         }}
//                         editorState={description}
//                         toolbarClassName="toolbarClassName"
//                         wrapperClassName="wrapperClassName"
//                         editorClassName="editorClassName"
//                         onEditorStateChange={handleContent}
//                         placeholder="Please enter description"
//                         name="description"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-12 col-md-12">
//                     <label>Upload Photos</label>
//                     <div className="row">
//                       {Array.from(file).map((items) => {
//                         return (
//                           <span>
//                             <img
//                               src={items ? URL.createObjectURL(items) : null}
//                               style={{
//                                 width: "100px",
//                                 height: "100px",
//                                 objectFit: "cover",
//                                 padding: "15px",
//                               }}
//                             />
//                           </span>
//                         );
//                       })}
//                     </div>
//                     <div
//                       className="dropzone"
//                       onDragOver={handleDragOver}
//                       onDrop={handleDrop}
//                     >
//                       <h3>Drag and Drop Files to Upload</h3>
//                       <h3>Or</h3>
//                       <input
//                         onChange={(e) => {
//                           return setFile((prevState) => [...e.target.files]);
//                         }}
//                         name="file"
//                         type="file"
//                         accept="image/gif, image/jpeg, image/png, image/jpg"
//                         ref={inputRef}
//                         multiple
//                         hidden
                        
//                       />
//                       <button
//                         className="orange_btn"
//                         type="button"
//                         onClick={() => inputRef.current.click()}
//                       >
//                         Select Files
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-center my-4">
//                   <button className="buttonStyleMeeting" type="submit">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CreateMeeting;







