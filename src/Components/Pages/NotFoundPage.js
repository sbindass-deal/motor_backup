import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: "1",
          top: "0px",
          bottom: "0px",
          height: "100vh",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <div className="row">
          <div className="col-12">
            <h1 className="text-center" style={{ color: "#EF6031" }}>
              {" "}
              404
              <br /> Page Not Found
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
