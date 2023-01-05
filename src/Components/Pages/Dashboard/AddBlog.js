import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const navigate = useNavigate()
    const [file,setFile]=useState({})
  const [blogData, setBlogData] = useState({
    title: "",
    desc: "",
    img:""
  });
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleApi = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_URL;
    let formdata=new FormData();
    formdata.append("image",file);
    

    axios
      .post(`${url}addblogs `, {
        title: blogData.title,
        description: blogData.desc,
        likes: "",
        view: "",
        image:blogData.img
      })
      .then((result) => {
        console.log("####",result)
        if(result.status === 200){
            navigate("/blog")
        }
      })
      .catch((error) => {});
    setBlogData({ title: "", desc: "" ,img:""});
    
  };

  return (
    <div className="container py-5 px-md-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <form onSubmit={handleApi}>
          <div className="row row_gap_5">
            <div className="col-12 ">
              <label>Blog title</label>
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
              <label>image</label>
              <div className="form-group">
                <input
                  type="file"
                  name="img"
                  // value={blogData.img}
                  onChange={(e)=>{
                    setFile(e.target.files)
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
