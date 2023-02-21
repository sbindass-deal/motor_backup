import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState({});
  const [blogData, setBlogData] = useState({
    title: "",
    desc: "",
  });
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleApi = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}addblogs`;
    let formdata = new FormData();
    formdata.append("image", file);
    formdata.append("title", blogData.title);
    formdata.append("description", blogData.desc);
    formdata.append("likes", null);
    formdata.append("view", null);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        if (response.status === 200) {
          navigate("/blog");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setBlogData({ title: "", desc: "", img: "" });
  };

  return (
    <div className="container py-5 px-md-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <form onSubmit={handleApi}>
          <div className="row row_gap_5">
            <div className="col-12 ">
              <label>Blog Title</label>
              <div className="form-group">
                <input
                  type="text"
                  value={blogData.title}
                  name="title"
                  onChange={handleChange}
                  className="field"
                  placeholder="Product Name"
                  required
                />
              </div>
            </div>
            <div className="col-12 ">
              <label>Image</label>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className="field"
                  placeholder="Product imge"
                />
              </div>
            </div>
            <div className="col-12 ">
              <label>Blog Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  value={blogData.desc}
                  onChange={handleChange}
                  name="desc"
                  placeholder="Description here"
                  required
                  rows={11}
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

export default AddBlog;
