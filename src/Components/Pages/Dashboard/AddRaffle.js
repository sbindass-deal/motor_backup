import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";
import moment from "moment/moment";
import ms from 'ms';

const AddRaffle = () => {
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState(null)

  useEffect(()=>{
    const minsec = ms('0d')
    console.log('minsec',minsec);
    const min_date = new Date(+new Date()-minsec);
    setMinDate(moment(min_date).format('YYYY-MM-DD'));
  },[])

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
      .then((response) => {
        if (response.status === 200) {
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
              <label>Raffle Name </label>
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.name}
                  onChange={handleChange}
                  name="name"
                  className="field"
                  placeholder="Name of the Lottery"

                  errorMessage="no special character only use alphabet"
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
                  errorMessage="only number"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Total ticket stock </label>
              <div className="form-group">
                <FormInput
                  type="text"
                  value={raffle.stock}
                  onChange={handleChange}
                  name="stock"
                  className="field"
                  placeholder="2023"
                  pattern="^[0-9]{10,12}$"
                  errorMessage="only number"
                  required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Deadline to purchase date</label>
              <div className="form-group">
                <input
                  type="date"
                  min={minDate}
                  value={raffle.dedline}
                  onChange={handleChange}
                  name="dedline"
                  className="field"
                  placeholder="Enter dedline"
                  required
                  
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
                  errorMessage="take only lucky draw date"
                  required={true}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label>Upload Photos</label>
              <div className="form-group">
                <FormInput
                  type="file"
                  class="field"
                  id="formFileMultiple"
                  multiple
                 
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Upload Videos </label>
              <div className="form-group">
                <FormInput
                  type="file"
                  class="field"
                  id="formFileMultiple"
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
