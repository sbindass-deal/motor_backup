import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
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
    tittle: "",
    category: "",
    price: "",
    stocks: "",
    size: [],
    color: [],
    desc: "",
    youtube_link: ""
  });
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...prevState, ...event.dataTransfer.files]);
  };

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
  // const updateImage = async (prodId) => {
  //   const url = `${process.env.REACT_APP_URL}updateproductImage`;

  //   let formdata = new FormData();
  //   formdata.append("image", file[0]);
  //   formdata.append("id", prodId);

  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   await axios
  //     .post(url, formdata, config)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         navigate("/gear-product");
  //         window.location.reload(false);
  //       }
  //     })
  //     .catch((error) => {
  //       navigate("/gear-product");
  //       window.location.reload(false);
  //     });
  // };

  const uploadFileOne = (vehicleId) => {
    return (async () => {
      for await (const file1 of file) {
        const url = process.env.REACT_APP_URL + "productImage";
        const formData = new FormData();
        formData.append("image[]", file1);
        formData.append("product_id", vehicleId);
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        let a = await axios.post(url, newImagedata, config);
        if(a.status==200){
          return true
        }
        else {
          return false}

      }
    })();
  };

  const handleApi = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}updateproduct/${id}`, {
        stocks: getInputData.stocks,
        color: getInputData.color,
        size: getInputData.size,
        price: getInputData.price,
        title: getInputData.tittle,
        description: getInputData.desc,
        category: getInputData.category,
        youtube_link: getInputData.youtube_link
      })
      .then(async function (response) {
        if (response.status == 200) {
          let a = await uploadFileOne(response.data.data.id);

          if (a) {
            navigate("/gear-product");
            window.location.reload(false);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleApi = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const url = `${process.env.REACT_APP_URL}updateproduct/${id}`;
  //   let formdata = new FormData();
  //   formdata.append("title", getInputData.name);
  //   formdata.append("price", getInputData.price);
  //   formdata.append("description", getInputData.desc);
  //   formdata.append("category", getInputData.category);
  //   formdata.append("stocks", getInputData.stock);
  //   formdata.append("color", getInputData.color);
  //   formdata.append("size", getInputData.size);
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   await axios
  //     .post(url, formdata, config)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         if (file.length > 0) {
  //           updateImage(id);
  //         } else {
  //           navigate("/gear-product");
  //           window.location.reload(false);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       if (file.length > 0) {
  //         updateImage(id);
  //       } else {
  //         navigate("/gear-product");
  //         window.location.reload(false);
  //       }
  //     });
  // };
  return (
    <>
      <div className="container">
        <div className="row m-md-5 my-4">
          <form>
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="tittle"
                  onChange={(e) => { setGetInputData({ ...getInputData, tittle: e.target.value }) }}
                  value={getInputData.tittle}
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
                  label="Price"
                  className="field"
                  autoComplete="off"
                  name="price"
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      setGetInputData({ ...getInputData, price: e.target.value })
                    }
                  }}
                  value={getInputData.price}
                  placeholder="$ Enter price"
                  type="number"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  label="Stock"
                  name="stocks"
                  className="field"
                  value={getInputData.stock}
                  placeholder="Enter stock"
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      setGetInputData({ ...getInputData, stocks: e.target.value });
                    }
                  }}
                  type="number"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="size"
                  onChange={(e) => { setGetInputData({ ...getInputData, size: [e.target.value] }) }}
                  value={getInputData.size}
                  placeholder="Enter size"
                  errorMessage="Size should be 1-80 characters and shouldn't include any number!"
                  label="Size"
                  pattern="^[A-Za-z0-9-:/ ]{1,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="color"
                  onChange={(e) => { setGetInputData({ ...getInputData, color: [e.target.value] }) }}
                  value={getInputData.color}
                  placeholder="Enter color"
                  errorMessage="Color should be 1-80 characters and shouldn't include any special character and numbers!"
                  label="Color"
                  pattern="^[A-Za-z ]{1,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="youtube_link"
                  onChange={(e) => { setGetInputData({ ...getInputData, youtube_link: e.target.value }) }}
                  value={getInputData.youtube_link}
                  placeholder="Enter Link"
                  // errorMessage="Color should be 1-80 characters and shouldn't include any special character and numbers!"
                  label="Video Link"
                  // pattern="^[A-Za-z ]{1,80}$"
                  required={true}
                />
              </div>
              <div className="col-md-12 col-sm-12 mb-3">
                <label htmlFor="exampleFormControlTextarea1" class="form-label">
                  Description
                </label>
                <textarea
                  className="field"
                  value={getInputData.desc}
                  name="desc"
                  onChange={handleOnChange}
                  id="descriptonArea"
                  minLength={1}
                  maxLength={2000}
                  rows="4"
                ></textarea>
                {getInputData.desc.trim().length > 500 && (
                  <span className="text-danger">
                    You Can entered maximum 500 characters!
                  </span>
                )}
              </div>
              {/* <div className="col-12 col-md-6">
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
              </div> */}
              <div className="col-12 col-md-12">
                <label>Upload Photos</label>
                <div className="row">
                  {file.length === 0 && (
                    <div class="position-relative py-4 py-md-1">
                      <img
                        src={`${process.env.REACT_APP_URL}upload/products/${showImage}`}
                        alt="Product image"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          padding: "15px",
                        }}
                      />
                    </div>
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
                  <input
                    onChange={(e) => {
                      return setFile((prevState) => [
                        ...prevState,
                        ...e.target.files,
                      ]);
                    }}
                    name="file"
                    type="file"
                    accept="image/gif, image/jpeg, image/png, image/jpg"
                    ref={inputRef}
                    required
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
            </div>
            {loading ? (
              <button type="button" className="btn btn-secondary " disabled>
                Loading...
              </button>
            ) : (
              <button type="button" onClick={handleApi} className="btn">
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
