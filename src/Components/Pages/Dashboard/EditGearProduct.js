import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";

const EditGearProduct = () => {
  const { id } = useParams();
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const products = data.gearReducer.gearData.product;
  const inventry = { price: [], stock: [], sizeId: [], colorId: [] };
  const [dataInventry, setDataInventry] = useState([inventry]);
  const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [updatedInventry, setUpdateInventry] = useState([{
    stock: [{ id: "NA", replace: "" }],
    price: [{ id: "NA", replace: "" }],
    sizeId: [{ id: "NA", replace: "" }],
    colorId: [{ id: "NA", replace: ""}]
  }]);
  const [stock, setStock] = useState([]);
  const [price, setPrice] = useState([]);
  const [sizeId, setSizeId] = useState([]);
  const [colorId, setColorId] = useState([]);
  const [stock2, setStock2] = useState([]);
  const [price2, setPrice2] = useState([]);
  const [sizeId2, setSizeId2] = useState([]);
  const [colorId2, setColorId2] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [showImage, setShowImage] = useState(null);
  const [getInputData, setGetInputData] = useState({
    tittle: "",
    category: "",
    desc: "",
    youtube_link: "",
  });
  const [refresh, setRefresh] = useState(false);
  const inputRef = useRef();


  // {
  //   stock: [{ id: "", replace: "" }],
  //   price: [{ id: "", replace: "" }],
  //   sizeId: [{ id: "", replace: "" }],
  //   colorId: [{ id: "", replace: "" }]
  // }

  const addInventry = (e, index) => {
    setDataInventry([...dataInventry, inventry]);
    // dataInventry?.map((d , i) => {
      // setUpdateInventry(
      //   [ {
      //     stock: [...updatedInventry?.stock , { id: "NA", replace: d?.stock }],
      //     price: [...updatedInventry?.price ,{ id: "NA", replace: d?.price }],
      //     sizeId: [...updatedInventry?.sizeId ,{ id: "NA", replace: d?.sizeId }],
      //     colorId: [...updatedInventry?.colorId ,{ id: "NA", replace: d?.colorId }]
      //   }]
      // )
      // setStock([...stock , { id: "NA", replace: d?.stock }]);
      // setPrice([...price , { id: "NA", replace: d?.stock }]);
      // setSizeId([...sizeId , { id: "NA", replace: d?.stock }]);
      // setColorId([...colorId , { id: "NA", replace: d?.stock }]);
    // })
  }


  const onchangeInventry = (e, index) => {
    const updatedInventry = dataInventry?.map((d, i) => index == i ?
      Object.assign(d, { [e.target.name]: e.target.value })
      : d
    )

    setDataInventry(updatedInventry);

  }

 

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
    const filteredData = products?.find((item) => item.id == id);
    // console.log("11111", filteredData);
    setGetInputData({
      title: filteredData.title,
      category: filteredData.category,
      product_inventry: filteredData.product_inventry,
      desc: filteredData.description,
      youtube_link: filteredData.youtube_link
    });
    setShowImage(filteredData.images);

    // filteredData.product_inventry?.map((d) => {
      // setUpdateInventry({...updatedInventry , sizeId : [{id : d.id , replace : d.size_id}] , colorId :[{id : d.id , replace : d.color_id}]});
    //   setStock(value => [...value, { id: d?.id, replace: d?.stock }]);
    //   setPrice(value => [...value, { id: d?.id, replace: d?.price }])
    //   setSizeId(value => [...value, { id: d?.id, replace: d?.size_id }])
    //   setColorId(value => [...value, { id: d?.id, replace: d?.color_id }])
    // })
  }, [id, refresh]);


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
      .post(`${process.env.REACT_APP_URL}updateproduct/${id}`, {
        title: getInputData.title,
        category: getInputData.category,
        description: getInputData.desc,
        youtube_link: getInputData.youtube_link,
        inventry: JSON.stringify(updatedInventry)
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

  const updateInventry = (e) => {
    setPrice2([...price2 , {id : price[0] , replace : price[1]}]);
    
  }


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

  }, [])

  const deleteInventry = async (id) => {
    console.log(id);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/deleteEnventryById/${id}`,
    }).then((d) => { setRefresh(!refresh); });
  }

  console.log(price2);
  // console.log(stock , price , sizeId , colorId);
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
                  value={getInputData?.title}
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
              {
                getInputData?.product_inventry?.map((d, i) => {
                  return (
                    <>
                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <div>
                            <label>Price</label>
                            <input
                              className="field"
                              autoComplete="off"
                              name="price"
                              value={price?.replace}
                              placeholder={d?.price}
                              onChange={(e) => { setPrice([ d?.id ,  e.target.value ]); }}
                              type="number"
                            // required={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <div>
                            <label>Stock</label>
                            <input
                              name="stock"
                              className="field"
                              value={updatedInventry[i]?.stock?.replace}
                              placeholder={d?.stock}
                              onChange={(e) => { setUpdateInventry({ ...updatedInventry, stock: [{ id: d?.id, replace: e.target.value }] }) }}
                              type="number"
                              required={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Size</label>
                          <select
                            name="sizeId"
                            onChange={(e) => { setUpdateInventry({ ...updatedInventry, sizeId: [{ id: d?.id, replace: e.target.value }] }) }}
                            value={d?.size_id}
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
                      <div className="col-md-12 col-lg-2 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Color</label>
                          <select
                            name="colorId"
                            onChange={(e) => { setUpdateInventry({ ...updatedInventry, colorId: [{ id: d?.id, replace: e.target.value }] }) }}
                            value={d?.color_id}
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
                      <div className="col-md-12 col-lg-1 col-sm-12 m-auto">
                        <div className="form-group d-flex">
                          <button onClick={() => { deleteInventry(d?.id) }} className="mt-4 border-0 p-1 bg-danger text-light">delete</button>
                          <button onClick={(e) => { updateInventry(e) }} className="mt-4 border-0 p-1 bg-success text-light">update</button>
                        </div>
                      </div>
                    </>
                  )
                })
              }
              {
                dataInventry?.map((dataInventry2, index) => {
                  return (
                    <>
                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <div>
                            <label>Price</label>
                            <input
                              className="field"
                              autoComplete="off"
                              name="price"
                              onChange={(e) => {
                                if (e.target.value.length <= 10 && e.target.value.length > 0) {
                                  onchangeInventry(e, index)
                                }
                              }}
                              placeholder="$ Enter price"
                              type="number"
                              required={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <div>
                            <label>Stock</label>
                            <input
                              name="stock"
                              className="field"
                              placeholder="Enter stock"
                              onChange={(e) => {
                                if (e.target.value.length <= 10 && e.target.value.length > 0) {
                                  onchangeInventry(e, index)
                                }
                              }}
                              type="number"
                              required={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-3 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Size</label>
                          <select
                            name="sizeId"
                            onChange={(e) => { onchangeInventry(e, index) }}
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
                      <div className="col-md-12 col-lg-2 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Color</label>
                          <select
                            name="colorId"
                            onChange={(e) => { onchangeInventry(e, index) }}
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
                    </>
                  )
                })
              }
              <div className="col-md-12 col-lg-1 col-sm-12 m-auto">
                <div className="form-group">
                  {/* <p className="border w-25 pl-1">+</p> */}
                  <button onClick={addInventry} className="mt-4 border-0 p-1 bg-success text-light">Add New</button>
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
                  name="desc"
                  onChange={handleOnChange}
                  id="descriptonArea"
                  minLength={1}
                  maxLength={2000}
                  rows="4"
                ></textarea>
                {getInputData?.desc?.trim()?.length > 500 && (
                  <span className="text-danger">
                    You Can entered maximum 500 characters!
                  </span>
                )}
              </div>
              <div className="col-12 col-md-12">
                <label>Upload Photos</label>
                <div className="row">
                  {file.length === 0 && (
                    <div className="position-relative py-4 py-md-1">
                      {
                        showImage?.map((d, i) => {
                          return (
                            <img
                              src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                              alt="Product image"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                padding: "15px",
                              }}
                            />
                          )
                        })
                      }
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
