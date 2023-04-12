import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ms from "ms";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";
import SmallSpinner from "../../UI/SmallSpinner";

const AddCreateMeeting = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);
  const [minDate, setMinDate] = useState(null);

  const [isLoading, setIsLoading] = useState(false)

  const handleContent = (e) => {
    setDescription(e);
    console.log(111, e);
  };

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

  const [meetingDetail, setMeetingDetail] = useState({
    title: "",
    startdate: "",
    enddate: "",
    websitelink: "",
    facebooklink: "",
    twitterlink: "",
    emailid: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMeetingDetail({ ...meetingDetail, [name]: value });
  };

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files[0]]);
  };

  console.log(889, file[0]);

  const handleSubmit = async (e) => {


    e.preventDefault();
    setIsLoading(true)
    const url = `${process.env.REACT_APP_URL}AddEvent`;

    const formData = new FormData();
    formData.append("title", meetingDetail.title);
    formData.append("url", meetingDetail.websitelink);
    formData.append("start_date", meetingDetail.startdate);
    formData.append("end_date", meetingDetail.enddate);
    formData.append("facebook", meetingDetail.facebooklink);
    formData.append("twitter", meetingDetail.twitterlink);
    formData.append("email", meetingDetail.emailid);
    formData.append("status", 1);

    formData.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );

    formData.append("image", file[0]);

    await axios
      .post(url, formData)
      .then(function (response) {
        setIsLoading(false)
        notify("Added successfully !");
        navigate("/admin-meeting");
        console.log(109, response);
      })
      .catch(function (error) {
        setIsLoading(false)
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
      status: 1,
    });
  };

  useEffect(() => {
    const minsec = ms("0d");
    console.log("minsec", minsec);
    const min_date = new Date(+new Date() - minsec);
    setMinDate(moment(min_date).format("YYYY-MM-DD"));
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
              <h3>Create Events</h3>

              <hr id="hr" />
              <form onSubmit={handleSubmit} className="formD">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Title</label>
                    <FormInput
                      type="text"
                      className="field"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      value={meetingDetail.title}
                      required
                      errorMessage="Title is required"

                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Start Date</label>
                    <FormInput
                      min={minDate}
                      type="datetime-local"
                      className="field"
                      placeholder="First name"
                      name="startdate"
                      onChange={handleChange}
                      value={meetingDetail.startdate}
                      required
                      errorMessage="Start Date is required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">End Date</label>
                    <FormInput
                      min={minDate}
                      type="datetime-local"
                      className="field"
                      placeholder="First name"
                      name="enddate"
                      onChange={handleChange}
                      value={meetingDetail.enddate}
                      required
                      errorMessage="End Date is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Website Link</label>
                    <FormInput
                      type="text"
                      className="field"
                      placeholder="Website Link"
                      name="websitelink"
                      onChange={handleChange}
                      value={meetingDetail.websitelink}
                      required
                      errorMessage="Website link is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Facebook Link</label>

                    <FormInput
                      type="text"
                      className="field"
                      placeholder="Facebook link"
                      name="facebooklink"
                      onChange={handleChange}
                      value={meetingDetail.facebooklink}
                      required
                      errorMessage="Facebook link is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Twitter Link</label>

                    <FormInput
                      type="text"
                      className="field"
                      placeholder="Twitter link"
                      name="twitterlink"
                      onChange={handleChange}
                      value={meetingDetail.twitterlink}
                      required
                      errorMessage="Twitter link is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Email Id</label>
                    <FormInput
                      type="text"
                      className="field"
                      placeholder="Support email id"
                      name="emailid"
                      onChange={handleChange}
                      value={meetingDetail.emailid}
                      required
                      pattern="[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,5}$"

                      errorMessage="It should be a valid email address!"
                    />
                  </div>

                  <div className="col-12 mtb-3">
                    <label>Description</label>
                    <div className="desCrtpion">
                      <Editor

                        editorState={description}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleContent}
                        placeholder="Please enter description"
                        name="description"
                        required
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
                      <FormInput
                        onChange={(e) => {
                          return setFile((prevState) => [...e.target.files]);
                        }}
                        name="file"
                        type="file"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        ref={inputRef}
                        multiple
                        // hidden
                        required
                        errorMessage="Image is Required"

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
                  {
                    isLoading ? (
                      <SmallSpinner/>
                    ) : <button className="btn" type="submit">
                      Submit
                    </button>
}
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCreateMeeting;
