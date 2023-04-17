import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import SmallSpinner from "../../UI/SmallSpinner";

const AddPrivacy = () => {
  const navigate= useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
 
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };


 
  const handleContent = (e) => {
    setBlogContent(e);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text/plain");
    if (text.length > 100) {
      e.preventDefault();
    }
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
  
  const handleApi = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const url = `${process.env.REACT_APP_URL}addPrivacyPolicy`;
    let formdata = new FormData();
    formdata.append(
      "description",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    formdata.append(
      "privacy_policy",
      "privacy_policy"
    );
   
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
          notify("Added Blog successfully !");
          navigate("/admin-privacy-policy");
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error);
      });
    
  };

  
  return (
    <div className="container py-5 px-md-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <form onSubmit={handleApi}>
          <Link to={'/admin-privacy-policy'}>
            <button className="p-1"><i class="bi bi-arrow-left"></i> Back To List</button>
          </Link>
          <h3 className="text-center">Add Privacy</h3>
          <div className="row row_gap_5">


            <div className="col-12 mb-3">
              <label>Blog Description</label>
              <div className="desCrtpion">
                <Editor

                  editorState={blogContent}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleContent}
                  onPaste={handlePaste}
                  placeholder="Please enter description"
                  required
                />
              </div>
            </div>

          </div>
          <div className="form-group text-center my-4 mt-5">
            <button type="submit" className="btn mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default AddPrivacy