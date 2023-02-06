import React from "react";
import { Accordion } from "react-bootstrap";
import faq from "../UI/faq";

const Faq = () => {
  return (
    <div className="ptb_80 pt_sm_50 container ">
      <h2 class="title_combo title_Center">
        Frequently Asked Questions
        <span style={{ textAlign: "center" }}>
          {" "}
          Gas Guzzlrs makes it easy to register and bid.
        </span>
      </h2>
      <div className="row">
        <div className="col-12">
          <p className="text-center py-3 px-md-5">
            We handle registration and bidding online via our GG Software, an
            in-house application that manages an auction platform and payment
            processing. Learn more about how to create an account and register
            for our auctions.
          </p>
        </div>

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
                    <span>
                      <i class="fa fa-arrow-right"></i>
                    </span>{" "}
                    &nbsp; &nbsp; {curElem.que}
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
