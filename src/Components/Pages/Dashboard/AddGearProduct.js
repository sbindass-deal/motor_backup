import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput";

const AddGearProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [getInputData, setGetInputData] = useState({ title: "", category: "", price: [], stock: [], sizeId: [], colorId: [], description: "", youtube_link: "", });
  const inputRef = useRef();
  const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="
  const [refresh , setRefresh] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...prevState, ...event.dataTransfer.files]);
  };

  const handleOnChange = (e) => {
    const Values = e.target.value;
    const NewValues = Values.charAt(0).toUpperCase() + Values.slice(1);
    setGetInputData({ ...getInputData, [e.target.name]: NewValues });
  };
  const uploadFileOne = async (vehicleId) => {
    const formData = new FormData();
    const url = process.env.REACT_APP_URL + "productImage";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    for (const file1 of file) {
      formData.append("image[]", file1);
      formData.append("product_id", vehicleId);
      const newImagedata = formData;
    }
    let a = await axios.post(url, formData, config);
    if (a.status == 200) {
      return true;
    } else {
      return false;
    }
  };

  const handleApi = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}addproduct`, {
        stock: getInputData.stock,
        colorId: getInputData.colorId,
        sizeId: getInputData.sizeId,
        price: getInputData.price,
        title: getInputData.title,
        description: getInputData.description,
        category: getInputData.category,
        youtube_link: getInputData.youtube_link,
      })
      .then(async function (response) {
        if (response.status === 200) {
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


  useEffect(() => {

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllColors`,
      "Authorization": TOKEN
    }).then((d) => { setColor(d.data.data); });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllSize`,
      "Authorization": TOKEN
    }).then((d) => { setSize(d.data.data); });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}getAllCategory`,
      "Authorization": TOKEN
    }).then((d) => { setCategory(d.data.data); });

  }, [refresh])




  // const handleApi = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const url = `${process.env.REACT_APP_URL}addproduct`;
  //   let formdata = new FormData();
  //   formdata.append("title", getInputData.name);
  //   formdata.append("price", getInputData.price);
  //   formdata.append("description", getInputData.desc);
  //   formdata.append("category", getInputData.category);
  //   formdata.append("stocks", getInputData.stock);
  //   formdata.append("color", getInputData.color);
  //   formdata.append("size", getInputData.size);
  //   formdata.append("image", file);
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
  //       console.log(error);
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
                  name="title"
                  onChange={(e) => {
                    setGetInputData({
                      ...getInputData,
                      title: e.target.value,
                    });
                  }}
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
                    onChange={(e) => { setGetInputData({ ...getInputData, category: e.target.value }) }}
                    value={getInputData.category}
                    className="field"
                    required
                  >
                    <option selected disabled value="">
                      Select
                    </option>
                    {
                      category?.map((d, i) => {
                        return (
                          <option key={i} value={`${d?.category}`} >{d?.category}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                {/* <FormInput
                  name="price"
                  onChange={handleOnChange}
                  value={getInputData.price}
                  placeholder="$ Enter price"
                  // errorMessage="Price should be 1-9 characters and shouldn't include any special character and alphabet!"
                  label="Price"
                  type="number"
                  // pattern="^[0-9.]{1,9}$"
                  required={true}
                /> */}
                <div className="form-group">
                  <div>
                    <label>Price</label>
                    <input
                      className="field"
                      autoComplete="off"
                      name="price"
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          setGetInputData({
                            ...getInputData,
                            price: [e.target.value],
                          });
                        }
                      }}
                      value={getInputData.price}
                      placeholder="$ Enter price"
                      type="number"
                      required={true}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                {/* <FormInput
                  name="stock"
                  onChange={handleOnChange}
                  value={getInputData.stock}
                  placeholder="Enter stock"
                  errorMessage="Stock should be 1-9 characters and shouldn't include any special character and alphabet!"
                  label="Stock"
                  pattern="^[0-9]{1,9}$"
                  required={true}
                /> */}
                <div className="form-group">
                  <div>
                    <label>Stock</label>
                    <input
                      name="stock"
                      className="field"
                      value={getInputData.stock}
                      placeholder="Enter stock"
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          setGetInputData({
                            ...getInputData,
                            stock: [e.target.value],
                          });
                        }
                      }}
                      type="number"
                      required={true}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="size"
                  onChange={(e) => {
                    setGetInputData({
                      ...getInputData,
                      size: [e.target.value],
                    });
                  }}
                  value={getInputData.size}
                  placeholder="Enter size"
                  errorMessage="Size should be 1-80 characters and shouldn't include any number!"
                  label="Size"
                  pattern="^[A-Za-z0-9-:/ ]{1,80}$"
                  required={true}
                />
              </div> */}
              <div className="col-md-12 col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="">Size</label>
                  <select
                    name="sizeId"
                    onChange={(e) => { setGetInputData({ ...getInputData, sizeId: [e.target.value] }) }}
                    value={getInputData.size}
                    className="field"
                    required
                  >
                    <option selected disabled value="">
                      Select
                    </option>
                    {
                      size?.map((d, i) => {
                        return (
                          <option key={i} value={`${d?.id}`}>{d?.size}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              {/* <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="color"
                  onChange={(e) => {
                    setGetInputData({
                      ...getInputData,
                      color: [e.target.value],
                    });
                  }}
                  value={getInputData.color}
                  placeholder="Enter color"
                  errorMessage="Color should be 1-80 characters and shouldn't include any special character and numbers!"
                  label="Color"
                  pattern="^[A-Za-z ]{1,80}$"
                  required={true}
                />
              </div> */}
              <div className="col-md-12 col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="">Color</label>
                  <select
                    name="colorId"
                    onChange={(e) => { setGetInputData({ ...getInputData, colorId: [e.target.value] }) }}
                    value={getInputData.color}
                    className="field"
                    required
                  >
                    <option selected disabled value="">
                      Select
                    </option>
                    {
                      color?.map((d, i) => {
                        return (
                          <option key={i} value={`${d?.id}`} >{d?.color}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12">
                <FormInput
                  name="youtube_link"
                  onChange={(e) => {
                    setGetInputData({
                      ...getInputData,
                      youtube_link: e.target.value,
                    });
                  }}
                  value={getInputData.youtube_link}
                  placeholder="Enter Link"
                  // errorMessage="Color should be 1-80 characters and shouldn't include any special character and numbers!"
                  label="Video Link"
                  // pattern="^[A-Za-z ]{1,80}$"
                  required={true}
                />
              </div>
              <div>
                <div><h6>Add New Color</h6></div>
                <div className="d-flex"><input type="text" /><button className="px-2">+</button></div>
                {
                  color?.map((d, i) => {
                    return (
                      <div key={i} className="d-flex">
                        <p>{d?.color}</p><a onClick={async() => {let a = await axios.delete(`https://api.gasguzzlrs.com/deleteColors/${d.id}`); if(a){window.location.reload()}}}><i class="fa fa-trash ml-3 mt-1" aria-hidden="true"></i></a>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-md-12 col-sm-12 mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="field"
                  value={getInputData.desc}
                  name="description"
                  onChange={handleOnChange}
                  id="descriptonArea"
                  minLength={1}
                  maxLength={2000}
                  rows="4"
                ></textarea>
                {getInputData?.desc?.trim().length > 500 && (
                  <span className="text-danger">
                    You Can entered maximum 500 characters!
                  </span>
                )}
              </div>
              <div className="col-12 col-md-12">
                <label>Upload Photos</label>
                <div className="row">
                  {Array.from(file).map((items, i) => {
                    return (
                      <span key={i}>
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
                {/* <div className="form-group">
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
                    required
                  />
                </div> */}
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
            <div className="text-center my-5">
              {loading ? (
                <button type="button" className="btn btn-secondary " disabled>
                  Loading...
                </button>
              ) : (
                <button onClick={handleApi} type="button" className="btn">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGearProduct;
