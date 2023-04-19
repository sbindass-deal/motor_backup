import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { toast } from "react-toastify";
import SmallSpinner from "../../UI/SmallSpinner";
import FormInput from "../../UI/FormInput";
const EditTermAndCondition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDataById, setBlogDataById] = useState([]);
  const [file, setFile] = useState([]);
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [isLoading, setLoading] = useState(false)
  const [blogData, setBlogData] = useState({
    title: "",
    desc: "",
  });
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files]);
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

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleContent = (e) => {
    setBlogContent(e);
    // console.log(111, convertToRaw(blogContent.getCurrentContent()));
  };
  //   fetch blog api
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_URL}getPages`, {
            page: "terms_condtion"
          }
        );
        console.log(8798980, res?.data?.data?.description)
        if (res.data.status === 200 && res.data) {
          
          setBlogDataById(res.data);
          setBlogContent(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(res?.data?.data?.description)
              )
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, []);
  const handleApi = async (e) => {
    e.preventDefault();
    setLoading(true)
    const url = `${process.env.REACT_APP_URL}addPrivacyPolicy`;
    let formData = new FormData();
    formData.append(
      "description",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    
    formData.append(
      "page",
      "terms_condtion"
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formData, config)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false)
          notify("Save successfully !");
          navigate("/admin-termcondition");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };

  return (
    <div className="container py-5 px-md-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <form>
          <Link to={'/admin-termcondition'}>
            <button className="p-1"><i class="bi bi-arrow-left"></i> Back To List</button>
          </Link>
          <h3 className="text-center">Edit Content</h3>
          <div className="row row_gap_5">
           
           

            <div className="col-12 mb-3">
              <label>Blog Description</label>
              
              <div
                className="desCrtpion"

              >
                <Editor

                  editorState={blogContent}
                  value="dlsjfkljf"
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleContent}
                  placeholder="Please enter description"
                />
               
              </div>
            </div>
            
          </div>
          <div className="form-group text-center my-4 mt-5">
            {
              isLoading ? (
                <SmallSpinner />
              ) : <button onClick={handleApi} className="btn">
                Submit
              </button>
            }

          </div>
        </form>
      </div>
    </div>
  );
};
export default EditTermAndCondition
