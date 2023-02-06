import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../UI/FormInput";

const EditGearProduct = () => {
  const { id } = useParams();
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const products = data.gearReducer.gearData;

  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [showImage, setShowImage] = useState(null);
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

  useEffect(() => {
    const filteredData = products.find((item) => item.id == id);
    console.log(11111, filteredData);
    setGetInputData({
      name: filteredData.title,
      category: filteredData.category,
      price: filteredData.price,
      stock: filteredData.stocks,
      size: filteredData.size,
      color: filteredData.color,
      desc: filteredData.description,
    });
    setShowImage(filteredData.image);
  }, [id]);
  const updateImage = async (prodId) => {
    const url = `${process.env.REACT_APP_URL}updateproductImage`;

    let formdata = new FormData();
    formdata.append("image", file[0]);
    formdata.append("id", prodId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        if (response.status === 200) {
          navigate("/gear-product");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        navigate("/gear-product");
        window.location.reload(false);
      });
  };
  const handleApi = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `${process.env.REACT_APP_URL}updateproduct/${id}`;
    let formdata = new FormData();
    formdata.append("title", getInputData.name);
    formdata.append("price", getInputData.price);
    formdata.append("description", getInputData.desc);
    formdata.append("category", getInputData.category);
    formdata.append("stocks", getInputData.stock);
    formdata.append("color", getInputData.color);
    formdata.append("size", getInputData.size);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(url, formdata, config)
      .then((response) => {
        if (response.status === 200) {
          if (file.length > 0) {
            updateImage(id);
          } else {
            navigate("/gear-product");
            window.location.reload(false);
          }
        }
      })
      .catch((error) => {
        if (file.length > 0) {
          updateImage(id);
        } else {
          navigate("/gear-product");
          window.location.reload(false);
        }
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
                  errorMessage="Name should be 2-80 characters and shouldn't include any number!"
                  label="Name"
                  pattern="^[A-Za-z-.,: ]{2,80}$"
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
                      Select
                    </option>
                    <option value="Car Accessories">Car Accessories</option>
                    <option value="Home and Living">Home and Living</option>
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
                  pattern="^[0-9.]{1,9}$"
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
                  errorMessage="Size should be 2-80 characters and shouldn't include any number!"
                  label="Size"
                  pattern="^[A-Za-z0-9-:/ ]{1,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="color"
                  onChange={handleOnChange}
                  value={getInputData.color}
                  placeholder="Enter color"
                  errorMessage="Color should be 1-80 characters and shouldn't include any special character and numbers!"
                  label="Color"
                  pattern="^[A-Za-z]{1,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 mb-3">
                <label htmlFor="exampleFormControlTextarea1" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  value={getInputData.desc}
                  name="desc"
                  onChange={handleOnChange}
                  id="descriptonArea"
                  minLength={1}
                  maxLength={500}
                  rows="4"
                ></textarea>
                {getInputData.desc.trim().length > 500 && (
                  <span className="text-danger">
                    You Can entered maximum 500 characters!
                  </span>
                )}
              </div>
              <div className="col-12 col-md-6">
                <label>Update Photos</label>
                {file.length === 0 && (
                  <div class="position-relative py-4 py-md-1">
                    <img
                      src={`${process.env.REACT_APP_URL}upload/products/${showImage}`}
                      alt="Product image"
                    />
                  </div>
                )}
                <div className="form-group my-4">
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
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <button type="button" className="btn btn-secondary " disabled>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditGearProduct;
