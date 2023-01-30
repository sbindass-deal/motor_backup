import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";

const AddGearProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState({});
  const [getInputData, setGetInputData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    size: "",
    color: "",
    desc: "",
  });
  const handleOnChange = (e) => {
    setGetInputData({ ...getInputData, [e.target.name]: e.target.value });
  };
  const uplodeProductImg = async (productId) => {
    const url = process.env.REACT_APP_URL + "product-image";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("lottery_id", productId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

  const handleApi = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}addproduct`, {
        title: getInputData.name,
        price: getInputData.price,
        description: getInputData.desc,
        category: getInputData.category,
        stocks: getInputData.stock,
        size: getInputData.size,
        color: getInputData.color,
      })
      .then((response) => {
        if (response.status === 200) {
          uplodeProductImg(response.data.id);
          navigate("/gear-product");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row m-md-5 my-4">
          <form onSubmit={handleApi}>
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="name"
                  onChange={handleOnChange}
                  value={getInputData.name}
                  placeholder="Enter Name"
                  errorMessage="Name should be 2-80 characters and shouldn't include any special character or number!"
                  label="Name"
                  pattern="^[A-Za-z ]{2,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="">Category</label>
                  <select
                    name="category"
                    onChange={handleOnChange}
                    value={getInputData.category}
                    className="field"
                    required
                  >
                    <option selected disabled value="">
                      Choose...
                    </option>
                    <option value="men">Car Accessories</option>
                    <option value="women">Home and Living</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="price"
                  onChange={handleOnChange}
                  value={getInputData.price}
                  placeholder="Enter price"
                  errorMessage="Price should be 1-9 characters and shouldn't include any special character and alphabet!"
                  label="Price"
                  pattern="^[0-9]{1,9}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="stock"
                  onChange={handleOnChange}
                  value={getInputData.stock}
                  placeholder="Enter stock"
                  errorMessage="Stock should be 1-9 characters and shouldn't include any special character and alphabet!"
                  label="Stock"
                  pattern="^[0-9]{1,9}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="size"
                  onChange={handleOnChange}
                  value={getInputData.size}
                  placeholder="Enter size"
                  errorMessage="Size should be 1-16 characters and shouldn't include any special character!"
                  label="Size"
                  pattern="^[A-Za-z0-9]{1,16}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="color"
                  onChange={handleOnChange}
                  value={getInputData.color}
                  placeholder="Enter color"
                  errorMessage="Color should be 1-16 characters and shouldn't include any special character and numbers!"
                  label="Color"
                  pattern="^[A-Za-z]{1,16}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  value={getInputData.desc}
                  name="desc"
                  onChange={handleOnChange}
                  id="descriptonArea"
                  rows="3"
                ></textarea>
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
                      setFile(e.target.files[0]);
                    }}
                    name="file"
                    type="file"
                  />
                </div>
              </div>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGearProduct;
