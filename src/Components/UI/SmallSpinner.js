import React from "react";
import { Button, Spinner } from "react-bootstrap";

const SmallSpinner = ({ spin }) => {
  return (
    <>
      {spin ? (
        <div
          className="container"
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="row">
            <Spinner />
          </div>
        </div>
      ) : (
        <Button className="btn btn-secondary " variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="mr-3"
          />
          Loading...
        </Button>
      )}
    </>
  );
};

export default SmallSpinner;
