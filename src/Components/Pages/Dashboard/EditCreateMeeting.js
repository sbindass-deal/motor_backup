import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { ContentState, convertFromHTML } from "draft-js";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";
import SmallSpinner from "../../UI/SmallSpinner";

const EditCreateMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false)
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);
  const [file1, setFile1] = useState([]);
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
    emailid: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMeetingDetail({ ...meetingDetail, [name]: value });
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getEventBYId/${id}`
        );

        console.log(989, res.data.data);
        if (res.data.status === 200 && res.data.data) {
          setMeetingDetail({
            title: res.data.data.title,
            startdate: res.data.data.start_date,
            enddate: res.data.data.end_date,
            websitelink: res.data.data.url,
            facebooklink: res.data.data.facebook,
            twitterlink: res.data.data.twitter,
            emailid: res.data.data.email,
          });
          setFile1(res.data.data.image);
          // setBlogDataById(res.data.data);
          setDescription(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(res.data.data.description)
              )
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeeting();
  }, []);

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
    const url = `${process.env.REACT_APP_URL}UpdateEvent`;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", meetingDetail.title);
    formData.append("url", meetingDetail.websitelink);
    formData.append("start_date", meetingDetail.startdate);
    formData.append("end_date", meetingDetail.enddate);
    formData.append("facebook", meetingDetail.facebooklink);
    formData.append("twitter", meetingDetail.twitterlink);
    formData.append("email", meetingDetail.emailid);
    formData.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );

    formData.append("image", file[0]);

    await axios
      .post(url, formData)
      .then(function (response) {
        setIsLoading(false)
        notify("Save successfully !");
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
    });
  };

  console.log(8989, meetingDetail.startdate);

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
              <h3>Edit Event</h3>

              <hr id="hr" />
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Title</label>
                    <FormInput
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      value={meetingDetail.title}
                      required
                      errorMessage="Title is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Start Date</label>
                    <FormInput
                      type="datetime-local"
                      className="form-control"
                      placeholder="First name"
                      name="startdate"
                      onChange={handleChange}
                      value={meetingDetail.startdate}
                      required
                      errorMessage="Start Date is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">End Date</label>
                    <FormInput
                      type="datetime-local"
                      className="form-control"
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
                      className="form-control"
                      placeholder="Website Link"
                      name="websitelink"
                      onChange={handleChange}
                      value={meetingDetail.websitelink}
                      required
                      errorMessage="Website Link is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Facebook Link</label>

                    <FormInput
                      type="text"
                      className="form-control"
                      placeholder="Facebook link"
                      name="facebooklink"
                      onChange={handleChange}
                      value={meetingDetail.facebooklink}
                      required
                      errorMessage="Facebook is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Twitter Link</label>

                    <FormInput
                      type="text"
                      className="form-control"
                      placeholder="Twitter link"
                      name="twitterlink"
                      onChange={handleChange}
                      value={meetingDetail.twitterlink}
                      required
                      errorMessage="Twitter is Required"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Email Id</label>
                    <FormInput
                      type="text"
                      className="form-control"
                      placeholder="Support email id"
                      name="emailid"
                      onChange={handleChange}
                      value={meetingDetail.emailid}
                      pattern="[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,5}$"

                      errorMessage="It should be a valid email address!"
                      
                    />
                  </div>

                  <div className="col-12 mb-3">
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
                      {file && file.length <= 0 && (
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            padding: "15px",
                          }}
                          src={`https://api.gasguzzlrs.com/upload/event/${file1}`}
                          alt=""
                        />
                      )}

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
                        hidden
                        // required
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
                    ) : <button type="submit" className="btn mt-2">
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

export default EditCreateMeeting;
