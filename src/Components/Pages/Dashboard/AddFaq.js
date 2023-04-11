import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../../UI/globaleVar";

const AddFaq = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    que: "",
    ans: "",
  });
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}getFaqs`);
        const filteredData = res.data.data.filter((item) => item.id == id);
        if (filteredData.length > 0) {
          setInputData({
            que: filteredData[0].question,
            ans: filteredData[0].ans,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [id]);
  const onChangeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== undefined || id !== null) {
      axios
        .post(`${process.env.REACT_APP_URL}addFaqs`, {
          question: inputData.que,
          ans: inputData.ans,
        })
        .then(function (response) {
          notify(response.data.message, response.status);
        })
        .catch(function (error) {
          console.log(error);
          notify(error.data.message, error.status);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_URL}addFaqs`, {
          id: id,
          question: inputData.que,
          ans: inputData.ans,
        })
        .then(function (response) {
          notify(response.data.message, response.status);
        })
        .catch(function (error) {
          console.log(error);
          notify(error.message, error.status);
        });
    }
  };
  return (
    <>
    <section>
      <div className="container ptb_50" >
        <h3 className="text-center">Add New Faq</h3>
        
          <form onSubmit={handleSubmit}>
          <div className="row asadw ">
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="form-group">
                <label>Question</label>
                <textarea
                  name="que"
                  onChange={onChangeHandler}
                  value={inputData.que}
                  className="field"
                  maxLength={200}
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="form-group">
                <label>Answer</label>
                <textarea
                  name="ans"
                  onChange={onChangeHandler}
                  value={inputData.ans}
                  className="field"
                  maxLength={200}
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <button className="btn center" type="submit" >
                Submit
              </button>
            </div>
            
            </div>
           
            
          </form>
        
      </div>
      </section>
    </>
  );
};

export default AddFaq;
