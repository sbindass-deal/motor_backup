import React from "react";
import { Accordion } from "react-bootstrap";
import faq from "../UI/faq";

const Faq = () => {
  return (
    <div className="container px-md-5 py-4 ">
      <h3 className="text-center" style={{ color: "#FBA027" }}>
        Frequently Asked Questions
      </h3>
      <div className="row">
        <p className="text-center py-3 px-md-5">
          <span style={{ color: "#FBA027" }}>
            Gas Guzzlrs makes it easy to register and bid.
          </span>
          <br /> We conduct our registration and bidding online through our GG
          Software, an in house appl that manages a platform for auctions and
          payment processing. Learn more about how to create an account and
          register for our auctions.
        </p>

        {/* <h4>Common Bidder Questions</h4> */}
        <div className="col-12 px-md-5 text-light">
          <Accordion>
            {faq.map((curElem, i) => {
              return (
                <Accordion.Item
                  key={curElem.id}
                  eventKey={`${curElem.id}`}
                  className="accordion-Faq"
                >
                  <Accordion.Header>
                    {i + 1} &nbsp; &nbsp; {curElem.que}
                  </Accordion.Header>
                  <Accordion.Body className="pb-4">
                    {curElem.ans}

                    {curElem.note && (
                      <p>
                        {" "}
                        <br /> note:- {curElem.note}
                      </p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
