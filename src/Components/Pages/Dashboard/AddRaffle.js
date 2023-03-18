import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from "ms";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const AddRaffle = () => {
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState(null);
  // const [videoFile, setVideoFile] = useState([]);
  const [htmlDescription, setHtmlDescription] = useState(
    EditorState.createEmpty()
  );

  const [file, setFile] = useState([]);
  const [fileVideo, setFileVideo] = useState([]);

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files]);
  };

  const inputRefVideo = useRef();

  const handleDragOverVideo = (event) => {
    event.preventDefault();
  };

  const handleDropVideo = (event) => {
    event.preventDefault();
    setFileVideo((prevState) => [...event.dataTransfer.files]);
  };

  useEffect(() => {
    const minsec = ms("0d");
    console.log("minsec", minsec);
    const min_date = new Date(+new Date() - minsec);
    setMinDate(moment(min_date).format("YYYY-MM-DD"));
  }, []);
  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text/plain");
    if (text.length > 100) {
      e.preventDefault();
    }
  };

  const [raffle, setRaffle] = useState({
    name: "",
    price: "",
    stock: "",
    dedline: "",
    luckyDrawDate: "",
    desc: "",
  });
  const handleChange = (e) => {
    setRaffle({ ...raffle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", raffle.name);
    formData.append("dealEndDate", raffle.dedline);
    formData.append("price", raffle.price);
    formData.append(
      "description",
      draftToHtml(convertToRaw(htmlDescription.getCurrentContent()))
    );
    formData.append("stock", raffle.stock);
    formData.append("drawdate", raffle.dedline);
    formData.append("image[]", [image]);
    // formData.append('lottery_id',)
    // formData.append('id', vehicleId)

    axios
      .post(
        `${process.env.REACT_APP_URL}addlotteryvehicle`,
        formData

        //   {

        //   name: raffle.name,
        //   dealEndDate: raffle.dedline,
        //   price: raffle.price,
        //   description: raffle.desc,
        //   stock: raffle.stock,
        //   drawdate: raffle.dedline,
        // }
      )
      .then(async (response) => {
        if (response.status === 200) {
          console.log("@@@@@@@@@@@", response.data);
          uploadImage(response.data.vehicleId);
          await uploadFileVideo(response.data.vehicleId);
          navigate("/raffleadmin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [image, setImage] = useState([]);

  const uploadImage = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();
    [...image]?.forEach((img) => formData.append("image", img));
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios.post(url, formData, config);
  };

  const maxAllowedSize = 3 * 1024 * 1024;
  const [videoSource, setVideoSource] = React.useState([]);
  const [videoBlob, setVideoBlob] = React.useState("");

  const uploadFileVideo = async (vehicleId) => {
    console.log("###############", videoSource, vehicleId);

    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();
    formData.append("video", videoSource);
    formData.append("id", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios.post(url, formData, config);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > maxAllowedSize) {
      alert("Video size must be less than 3 mb");
      return;
    }
    setVideoSource(file);
    const url = URL.createObjectURL(file);
    setVideoBlob(url);
  };

  console.log(8989, image);

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className="p-md-5">
          <h3 className="p-4 text-center">Give Away Details</h3>

          <div className="row row_gap_5">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.name}
                  onChange={handleChange}
                  name="name"
                  className="field"
                  placeholder="Name of the Lottery"
                  label="Name"
                  errorMessage="no special character only use alphabet"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={raffle.price}
                  onChange={handleChange}
                  name="price"
                  className="field"
                  placeholder="2023"
                  label="Price of one ticket"
                  pattern="^[0-9]{1,10}$"
                  errorMessage="only number"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <FormInput
                value={raffle.stock}
                onChange={handleChange}
                name="stock"
                className="field"
                placeholder="mention available ticket stock"
                label="Total ticket stock"
                pattern="^[0-9]{1,9}$"
                errorMessage="This filed only contain number"
                required={true}
              />
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="date"
                  min={minDate}
                  value={raffle.dedline}
                  onChange={handleChange}
                  name="dedline"
                  className="field"
                  label="Deadline to purchase date"
                  placeholder="Enter dedline"
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <div className="form-group">
                <FormInput
                  type="date"
                  min={minDate}
                  value={raffle.luckyDrawDate}
                  onChange={handleChange}
                  name="luckyDrawDate"
                  className="field"
                  label="Lucky draw date"
                  placeholder="2023"
                  errorMessage="take only lucky draw date"
                  required={true}
                />
              </div>
            </div>
            {/* ============================== description start */}
            <div className="col-md-12">
              <label htmlFor="description">Description</label>
              <div className="border border-2 border-dark">
                <Editor
                  editorStyle={{
                    background: "white",
                    padding: "15px",
                    minHeight: "30vh",
                    color: "black",
                  }}
                  editorState={htmlDescription}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(e) => setHtmlDescription(e)}
                  onPaste={handlePaste}
                  placeholder="Please enter description"
                />
              </div>
            </div>
            {/* ============================== description end */}
            {/* ============================== image upload start */}
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
                  required
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

            {/* ============================= upload end */}

            {/* ============================= upload video start */}
            <div className="col-12 col-md-12">
              <label>Upload Video</label>
              <div className="row">
                {Array.from(fileVideo).map((items) => {
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
                onDragOver={handleDragOverVideo}
                onDrop={handleDropVideo}
              >
                <h3>Drag and Drop Files to Upload</h3>
                <h3>Or</h3>
                <input
                  onChange={(e) => {
                    return setFileVideo((prevState) => [...e.target.files]);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRefVideo}
                  required
                  hidden
                />
                <button
                  className="orange_btn"
                  type="button"
                  onClick={() => inputRefVideo.current.click()}
                >
                  Select Files
                </button>
              </div>
            </div>

            {/* ============================= upload video end */}
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn my-5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRaffle;
