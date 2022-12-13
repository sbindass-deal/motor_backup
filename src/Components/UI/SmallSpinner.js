import React from "react";
import { Button, Spinner } from "react-bootstrap";

const SmallSpinner = () => {
  return (
    <>
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
    </>
  );
};

export default SmallSpinner;
