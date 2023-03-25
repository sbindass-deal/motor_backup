import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { toast } from "react-toastify";

function AdUserMeeting() {
  const navigate = useNavigate()
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);

  const handleContent = (e) => {
    setDescription(e);
    console.log(111, e);
  };

  const [meetingDetail, setMeetingDetail] = useState({
    title: "",
    startdate: "",
    enddate: "",
    websitelink: "",
    facebooklink: "",
    twitterlink: "",
    emailid: ""
  })



  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setMeetingDetail({ ...meetingDetail, [name]: value })

  }




  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files[0]]);
  };

  console.log(889, file[0])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_URL}AddEvent`;


    const formData = new FormData()
    formData.append('title', meetingDetail.title)
    formData.append('url', meetingDetail.websitelink)
    formData.append('start_date', meetingDetail.startdate)
    formData.append('end_date', meetingDetail.enddate)
    formData.append('facebook', meetingDetail.facebooklink)
    formData.append('twitter', meetingDetail.twitterlink)
    formData.append('email', meetingDetail.emailid)
    formData.append('status', 0)
    formData.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );

    formData.append("image", file[0]);


    

    await axios.post(url, formData)
      .then(function (response) {
        notify("Added Event successfully !");
        navigate('/user-meeting')
        console.log(109, response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setMeetingDetail({
      title: "",
      startdate: "",
      enddate: "",
      websitelink: "",
      facebooklink: "",
      twitterlink: "",
      emailid: "",
      status:0

    });


  }

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3>Events</h3>
              <hr />
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-md-6">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      value={meetingDetail.title}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Start Date</label>
                    <input
                      type="datetime-local"
                      class="field"
                      placeholder="First name"
                      name="startdate"
                      onChange={handleChange}
                      value={meetingDetail.startdate}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">End Date</label>
                    <input
                      type="datetime-local"
                      class="field"
                      placeholder="First name"
                      name="enddate"
                      onChange={handleChange}
                      value={meetingDetail.enddate}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Website Link</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Website Link"
                      name="websitelink"
                      onChange={handleChange}
                      value={meetingDetail.websitelink}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Facebook Link</label>

                    <input
                      type="text"
                      class="field"
                      placeholder="Facebook link"
                      name="facebooklink"
                      onChange={handleChange}
                      value={meetingDetail.facebooklink}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Twitter Link</label>

                    <input
                      type="text"
                      class="field"
                      placeholder="Twitter link"
                      name="twitterlink"
                      onChange={handleChange}
                      value={meetingDetail.twitterlink}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Email Id</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Support email id"
                      name="emailid"
                      onChange={handleChange}
                      value={meetingDetail.emailid}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Description</label>
                    <div className="border border-2 border-dark">
                      <Editor
                        editorStyle={{
                          background: "white",
                          padding: "15px",
                          minHeight: "30vh",
                          color: "black",
                        }}
                        editorState={description}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleContent}
                        placeholder="Please enter description"
                        name="description"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <label>Upload Photos</label>
                    <div className="row">
                      {Array.from(file).map((items) => {
                        return (
                          <span>
                            <img
                              src={items ? URL.createObjectURL(items) : null}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                padding: "15px",
                              }}
                            />
                          </span>
                        );
                      })}
                    </div>
                    <div
                      className="dropzone"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <h3>Drag and Drop Files to Upload</h3>
                      <h3>Or</h3>
                      <input
                        onChange={(e) => {
                          return setFile((prevState) => [...e.target.files]);
                        }}
                        name="file"
                        type="file"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        ref={inputRef}
                        multiple
                        hidden

                      />
                      <button
                        className="orange_btn"
                        type="button"
                        onClick={() => inputRef.current.click()}
                      >
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center my-4">
                  <button className="buttonStyleMeeting" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdUserMeeting;
