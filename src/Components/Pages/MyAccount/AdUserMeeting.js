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
import FormInput from "../../UI/FormInput";

function AdUserMeeting() {
  const navigate = useNavigate()
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);
  const [fileError, setFileError] = useState(false)

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

    if (!file[0]) {
      setFileError(true)
    } else {


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
        status: 0

      });

    }
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
              <h3>Add Event</h3>
              <hr />
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-md-6">
                    <label htmlFor="">Title</label>
                    <FormInput
                      type="text"
                      class="field"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      value={meetingDetail.title}
                      errorMessage="Name should be 3-30 characters and shouldn't include any special character or number!"
                      required={true}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Start Date</label>
                    <FormInput
                      type="datetime-local"
                      class="field"
                      placeholder="First name"
                      name="startdate"
                      onChange={handleChange}
                      value={meetingDetail.startdate}
                      errorMessage="Please enter start date"
                      required={true}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">End Date</label>
                    <FormInput
                      type="datetime-local"
                      class="field"
                      placeholder="First name"
                      name="enddate"
                      onChange={handleChange}
                      value={meetingDetail.enddate}
                      errorMessage="Please enter end date"
                      required={true}
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Website Link</label>
                    <FormInput
                      type="text"
                      class="field"
                      placeholder="Website Link"
                      name="websitelink"
                      onChange={handleChange}
                      value={meetingDetail.websitelink}
                      pattern="^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                      errorMessage="Please enter valid Website link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Facebook Link</label>

                    <FormInput
                      type="text"
                      class="field"
                      placeholder="Facebook link"
                      name="facebooklink"
                      onChange={handleChange}
                      value={meetingDetail.facebooklink}
                      pattern="^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                      errorMessage="Please enter valid Facebook link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Twitter Link</label>

                    <FormInput
                      type="text"
                      class="field"
                      placeholder="Twitter link"
                      name="twitterlink"
                      onChange={handleChange}
                      value={meetingDetail.twitterlink}
                      pattern="^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                      errorMessage="Please enter valid Twitter link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Email Id</label>
                    <FormInput
                      type="text"
                      class="field"
                      placeholder="Support email id"
                      name="emailid"
                      onChange={handleChange}
                      value={meetingDetail.emailid}
                      errorMessage="Please enter valid email address"
                      required={true}
                      pattern="[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,5}$"
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
                    {fileError && <span className="text-danger">Please Upload Photos</span>}
                  </div>
                </div>

                <div className="text-center my-4">
                  <button className="btn" type="submit">
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
