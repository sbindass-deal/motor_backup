import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from "ms";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import SmallSpinner from "../../UI/SmallSpinner";

const AddRaffle = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false)
  const [raffle, setRaffle] = useState({
    name: "",
    price: "",
    stock: "",
    dedline: "",
    luckyDrawDate: "",
  });
  const [minDate, setMinDate] = useState(null);
  const [htmlDescription, setHtmlDescription] = useState(
    EditorState.createEmpty()
  );
  const [fileVideo, setFileVideo] = useState([]);
  // image upload
  const [file, setFile] = useState([]);
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

  const handleChange = (e) => {
    setRaffle({ ...raffle, [e.target.name]: e.target.value });
  };
  // image upload
  const uploadImg = (lottery_id) => {
    (async () => {
      for await (const item of file) {
        const url = `${process.env.REACT_APP_URL}addlotteryvehicleimg`;
        const formData = new FormData();
        formData.append("image[]", item);
        formData.append("id", lottery_id);
        formData.append("category", "lottery_img");
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(url, newImagedata, config);
      }
    })();
  };
  // ============ video upload

  const uploadVideo = (lottery_id) => {
    (async () => {
      for await (const item of fileVideo) {
        const url = `${process.env.REACT_APP_URL}addlotteryvehicleimg`;
        const formData = new FormData();
        formData.append("image[]", item);
        formData.append("id", lottery_id);
        formData.append("category", "lottery_video");
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(url, newImagedata, config);
      }
    })();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)
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
    axios
      .post(`${process.env.REACT_APP_URL}addlotteryvehicle`, formData)
      .then(async (response) => {
        if (response.status === 200) {
          uploadImg(response.data.data.id);
          uploadVideo(response.data.data.id);
          setLoading(false)
          notify("Added successfully !");
          navigate("/raffleadmin");
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className="p-md-5">
          <Link to={"/raffleadmin"}>
            <button className="p-1 bkBtn"><i class="bi bi-arrow-left"></i> Back To List</button>
          </Link>

          <h3 className="p-4 text-center">Giveaways Details</h3>
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
                  pattern="^[A-Za-z ]{3,30}$"
                  errorMessage="Name should be 3-30 characters and shouldn't include any special character or number!"
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
                  required={true}
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
              <div className="desCrtpion">
                <Editor

                  editorState={htmlDescription}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(e) => setHtmlDescription(e)}
                  onPaste={handlePaste}
                  placeholder="Please enter description"
                  required={true}
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

            {/* ============================= upload end */}

            {/* ============================= upload video start */}
            <div className="col-12 col-md-12">
              <label>Upload Video</label>
              <div className="row">
                {Array.from(fileVideo).map((items) => {
                  return (
                    <span>
                      <video
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          padding: "15px",
                        }}
                        muted="false"
                        id="myVideo"
                        controls
                      >
                        <source
                          src={items ? URL.createObjectURL(items) : null}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
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
                  // accept="image/gif, image/jpeg, image/png, image/jpg"
                  accept="video/mp4,video/x-m4v,video/*"
                  ref={inputRefVideo}
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
            {
              isLoading ? (
                <SmallSpinner />
              ) : <button type="submit" className="btn mt-2">
                Submit
              </button>
            }

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRaffle;
