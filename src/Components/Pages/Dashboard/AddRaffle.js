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
  const [videoFile, setVideoFile] = useState([]);
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
  const uploadFileOne = async (vehicleId) => {
    for (let i = 0; i < file.length; i++) {
      const url = process.env.REACT_APP_URL + "lottery-image";
      const formData = new FormData();
      formData.append("image", file[i]);
      formData.append("lottery_id", vehicleId);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
    }
  };
  const uploadFileVideo = async (vehicleId) => {
    for (let i = 0; i < videoFile.length; i++) {
      const url = process.env.REACT_APP_URL + "lottery-image";
      const formData = new FormData();
      formData.append("image", videoFile[i]);
      formData.append("lottery_id", vehicleId);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
    }
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
      .then((response) => {
        if (response.status === 200) {
          uploadFileOne();
          uploadFileVideo();
          navigate("/raffleadmin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="col-12 col-md-6">
              <label>Upload Photos</label>
              <div className="form-group">
                <input
                  style={{
                    fontSize: "1.2rem",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                  name="file"
                  type="file"
                  multiple
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Upload Videos</label>
              <div className="form-group">
                <input
                  style={{
                    fontSize: "1.2rem",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onChange={(e) => {
                    setVideoFile(e.target.files);
                  }}
                  name="file"
                  type="file"
                  multiple
                />
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
};

export default AddRaffle;
