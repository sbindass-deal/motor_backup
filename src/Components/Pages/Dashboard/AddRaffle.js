import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from "ms";

const AddRaffle = () => {
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState(null);
  // const [videoFile, setVideoFile] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    const minsec = ms("0d");
    console.log("minsec", minsec);
    const min_date = new Date(+new Date() - minsec);
    setMinDate(moment(min_date).format("YYYY-MM-DD"));
  }, []);

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

    axios
      .post(`${process.env.REACT_APP_URL}addlotteryvehicle`, {
        name: raffle.name,
        dealEndDate: raffle.dedline,
        price: raffle.price,
        description: raffle.desc,
        stock: raffle.stock,
        drawdate: raffle.dedline,
      })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("@@@@@@@@@@@", response.data)
          uploadImage(response.data.vehicleId);
          await uploadFileVideo(response.data.vehicleId);
          navigate("/raffleadmin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const [image, setImage] = useState([])

  const uploadImage = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();              
    [...image]?.forEach((img) => formData.append("image", img))
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    const data = await axios.post(url, formData, config);
  }

  const maxAllowedSize = 3 * 1024 * 1024;
  const [videoSource, setVideoSource] = React.useState([])
  const [videoBlob, setVideoBlob] = React.useState("");

  const uploadFileVideo = async (vehicleId) => {

    console.log("###############", videoSource, vehicleId);

    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();
    formData.append("video", videoSource);
    formData.append("id", vehicleId)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    const data = await axios.post(url, formData, config)
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file.size > maxAllowedSize){
      alert("Video size must be less than 3 mb")
      return 
    }
    setVideoSource(file);
    const url = URL.createObjectURL(file);
    setVideoBlob(url)
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className="p-md-5">
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
                  label="Raffle Name"
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
                  label="Price od 1 ticket"
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
            {/* ---------------------img upload--keshav------------- */}
            <div className="col-12 col-md-6">
              <label>Upload Photos</label>
              <div className="form-group">

                {Array.from(image).map((items) => {
                  return (
                    <span>
                      <img src={items ? URL.createObjectURL(items) : null} style={{ padding: "15px", objectFit: "cover", width: "90px" }} />
                    </span>
                  )
                })}

                <input type="file"
                  // controls
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
                  multiple
                />


              </div>
            </div>
            {/* ---------------------video upload--keshav------------ */}
            <div className="col-12 col-md-6">
              <label>Upload Videos</label>
              <div className="form-group">

                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".mov,.mp4"
                />

                {videoBlob && (
                  <video
                    width="80%"
                    height={100}
                    controls
                    src={videoBlob}
                  />
                )}
              

              
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <small>
                (Accepted file types: jpg, jpeg, png, Max. file size: 10 MB,
                Max. files: 200.)
              </small>
            </div>
            <div className="col-12 col-md-12">
              <label>Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  value={raffle.desc}
                  onChange={handleChange}
                  name="desc"
                  placeholder="Description here"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRaffle;
