import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from "ms";

const EditRaffle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const minDate = moment(new Date(new Date() - ms("0d"))).format("YYYY-MM-DD");
  const [file, setFile] = useState([]);
  const [videoFile, setVideoFile] = useState([]);
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

  function AddPicture(e) {
    const url = window.URL.createObjectURL(e?.target?.files[0]);
    console.log(window.URL);
    const img = document.querySelector("img");
    img.src = url;
  }

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getUserIdLotteryDetail/${id}`
        );
        const data = res.data.data;
        setRaffle({
          name: data.name,
          price: data.price,
          stock: data.stock,
          dedline: data.dealEndDate,
          luckyDrawDate: data.drawdate,
          desc: data.description,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchLottery();
  }, [id]);

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
      .post(`${process.env.REACT_APP_URL}updatelotyeryvehicle/${id}`, {
        name: raffle.name,
        dealEndDate: raffle.dedline,
        price: raffle.price,
        description: raffle.desc,
        stock: raffle.stock,
        drawdate: raffle.dedline,
      })
      .then((response) => {
        if (response.status === 200) {
          uploadFileOne(id);
          uploadFileVideo(id);
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
              <label>Raffle Name</label>
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.name}
                  onChange={handleChange}
                  name="name"
                  className="field"
                  placeholder="1900"
                  errorMessage="use only alphabet no special character"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Price od 1 ticket</label>
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.price}
                  onChange={handleChange}
                  name="price"
                  className="field"
                  placeholder="2023"
                  errorMessage="use only numbers($)"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Total ticket stock</label>
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.stock}
                  onChange={handleChange}
                  name="stock"
                  className="field"
                  placeholder="2023"
                  errorMessage="use only numbers"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Deadline to purchase date</label>
              <div className="form-group">
                <FormInput
                  type="date"
                  min={minDate}
                  value={raffle.dedline}
                  onChange={handleChange}
                  name="dedline"
                  className="field"
                  placeholder="Enter dedline"
                  errorMessage="successor date of current date"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-12">
              <label>Lucky draw date</label>
              <div className="form-group">
                <FormInput
                  type="date"
                  min={minDate}
                  value={raffle.luckyDrawDate}
                  onChange={handleChange}
                  name="luckyDrawDate"
                  className="field"
                  placeholder="2023"
                  errorMessage="use only lucky draw date"
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

export default EditRaffle;
