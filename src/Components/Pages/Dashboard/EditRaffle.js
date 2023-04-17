import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from "ms";
import { toast } from "react-toastify";
import { strToHtml } from "../../UI/globaleVar";
import parse from 'html-react-parser'
import SmallSpinner from "../../UI/SmallSpinner";
const EditRaffle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const[isLoading, setLoading]=useState(false)
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

  // const uploadFileOne = async (vehicleId) => {
  //   for (let i = 0; i < file.length; i++) {
  //     const url = process.env.REACT_APP_URL + "lottery-image";
  //     const formData = new FormData();
  //     formData.append("image", file[i]);
  //     formData.append("lottery_id", vehicleId);
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     await axios.post(url, formData, config).then((response) => {
  //       console.log(response.data);
  //     });
  //   }
  // };
  // const uploadFileVideo = async (vehicleId) => {
  //   for (let i = 0; i < videoFile.length; i++) {
  //     const url = process.env.REACT_APP_URL + "lottery-image";
  //     const formData = new FormData();
  //     formData.append("image", videoFile[i]);
  //     formData.append("lottery_id", vehicleId);
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     await axios.post(url, formData, config).then((response) => {
  //       console.log(response.data);
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_URL}updatelotyeryvehicle/${id}`, {
        name: raffle.name,
        dealEndDate: raffle.dedline,
        price: raffle.price,
        description: raffle.desc,
        stock: raffle.stock,
        drawdate: raffle.dedline,
      })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("DATA", response.data)
          uploadEditImage(response.data.id);
          await videoUpload(response.data.id);
          setLoading(false)
          notify("Save successfully !");
          navigate("/raffleadmin");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };
  const [editRaffleImage, setEditRaffleImage] = useState([])

  const uploadEditImage = async (id) => {
    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();
    [...editRaffleImage]?.forEach((img) => formData.append("image", img))
    formData.append("id", id)
    await axios.post( url, formData)
  }

    
  const [editRaffleVideo, setEditRaffleVideo] = useState([])
  const [blobVideo, setBlobVideo] = useState("")
  console.log("$$$$$$$", editRaffleVideo)
  const videoUpload = async (id) => {
    const url = process.env.REACT_APP_URL + "lottery-image";
    const formData = new FormData();
    formData.append("video", editRaffleVideo)
    formData.append("id", id);
    
    await axios.post(url, formData)
  }

  const maxAllowedSize = 3 * 1024 * 1024;
  const handleVideo = (event) => {
    const file = event.target.files[0];
    if (file.size > maxAllowedSize) {
      alert("Video size must be less than 3 mb")
      return
    }

    setEditRaffleVideo(file)
    const url = URL.createObjectURL(file);
    setBlobVideo(url)
  }
  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className="p-md-5">
          <div>
            <Link to={"/raffleadmin"}>
              <button className="p-1 bkBtn"><i class="bi bi-arrow-left"></i> Back To List</button>
            </Link>
            <h3 className="ml-5 mt-4">Edit Giveways</h3>
          </div>
          <div className="row row_gap_5">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={raffle.name}
                  onChange={handleChange}
                  name="name"
                  className="field"
                  pattern="^[A-Za-z ]{3,30}$"
                  label="Name of the Lottery"
                  placeholder="Name of the Lottery"
                  errorMessage="Name should be 3-30 characters and shouldn't include any special character or number!"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.price}
                  onChange={handleChange}
                  name="price"
                  className="field"
                  placeholder="2023"
                  pattern="^[0-9]{1,9}$"
                  label="Price od 1 ticket"
                  errorMessage="use only numbers($)"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <FormInput
                value={raffle.stock}
                onChange={handleChange}
                name="stock"
                placeholder="mention available ticket stock"
                errorMessage="This filed only contain number "
                label="Total ticket stock"
                pattern="^[0-9]{1,10}$"
                required={true}
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="datetime-local"
                  min={minDate}
                  value={raffle.dedline}
                  onChange={handleChange}
                  name="dedline"
                  className="field"
                  label="Deadline to purchase date"
                  placeholder="Enter dedline"
                  errorMessage="Successor date of current date"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div className="form-group">
                <FormInput
                  type="datetime-local"
                  min={minDate}
                  value={raffle.luckyDrawDate}
                  onChange={handleChange}
                  name="luckyDrawDate"
                  className="field"
                  placeholder="2023"
                  label="Lucky draw date"
                  errorMessage="use only lucky draw date"
                  required={true}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label>Upload Photos</label>
              <div className="form-group">
                {
                  Array.from(editRaffleImage).map((item) => {
                    return (
                      <span>
                        <img src={item ? URL.createObjectURL(item) : null} style={{ objectFit: "cover", padding: "15px", width: "85px" }} />
                      </span>
                    )
                  })
                }
                <input

                  onChange={(e) => {
                    setEditRaffleImage(e.target.files);
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
                  type="file"
                  onChange={handleVideo}
                  accept=".mov,.mp4"

                  multiple
                />
                {blobVideo && <video
                  width="80%"
                  height={100}
                  controls
                  src={blobVideo}
                />
                }
              </div>
            </div>
            <div className="col-12 col-md-12">
              <label>Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  value={
                    
                    raffle?.desc
                    
                  }
                  onChange={handleChange}
                  name="desc"
                  placeholder="Description here"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group">
            {
              isLoading ? (
                <SmallSpinner/>
              ) : <button type="submit" className="btn">
                Submit
              </button>
            }
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRaffle;
