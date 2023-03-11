import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const CreateMeeting = () => {
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [file, setFile] = useState([]);

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <AdminLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3>Create Events</h3>

              <hr id="hr" />
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-md-6">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Start Date</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Website Link</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Website Link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Facebook Link</label>

                    <input
                      type="text"
                      class="form-control"
                      placeholder="Facebook link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Twitter Link</label>

                    <input
                      type="text"
                      class="form-control"
                      placeholder="Twitter link"
                    />
                  </div>
                  <div class="col-md-6">
                    <label htmlFor="">Email Id</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Support email id"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Description</label>
                    <div className="border border-2 border-dark">
                      <Editor
                        editorStyle={{
                          background: "white",
                          padding: "15px",
                          minHeight: "30vh",
                          color: "black",
                        }}
                        editorState={description}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(e) => setDescription(e)}
                        placeholder="Please enter description"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <label>Upload Photos</label>
                    <div className="row">
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
                          return setFile((prevState) => [...e.target.files]);
                        }}
                        name="file"
                        type="file"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        ref={inputRef}
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

                <div className="text-center my-4">
                  <button className="buttonStyleMeeting" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateMeeting;
