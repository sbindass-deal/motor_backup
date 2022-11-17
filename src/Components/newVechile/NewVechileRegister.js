import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";
import BasicFact from "./BasicFact";
import ContactInfo from "./ContactInfo";
import Details from "./Details";
import MakeAndModal from "./MakeAndModal";

const NewVechileRegister = () => {
  const reduxValue = useSelector((data) => data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  }, []);
  const makeAndModalClick = () => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  };

  const basicFactClick = () => {
    dispatch(step_one(true));
    dispatch(step_two(false));
    dispatch(step_three(false));
  };
  const detailsClick = () => {
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(false));
  };
  const contactInfoClick = () => {
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(true));
  };
  return (
    <section className="ptb_80 pt_sm_50">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center pb-4">
            <h2>Sell your vehicle with Gas guzzlrs Auctions!</h2>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <div className="card_Gray mb-5 mb-md-0 divSticky">
              <ul className="nav nav-pills sideBar__">
                <li className="nav-item">
                  <a
                    onClick={makeAndModalClick}
                    className={
                      reduxValue.submitvechilesReducer.step_one === false
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Make & Model
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={basicFactClick}
                    className={
                      reduxValue.submitvechilesReducer.step_one === true &&
                      reduxValue.submitvechilesReducer.step_two === false
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Basic Facts
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={detailsClick}
                    className={
                      reduxValue.submitvechilesReducer.step_one === true &&
                      reduxValue.submitvechilesReducer.step_two === true &&
                      reduxValue.submitvechilesReducer.step_three === false
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={contactInfoClick}
                    className={
                      reduxValue.submitvechilesReducer.step_one === true &&
                      reduxValue.submitvechilesReducer.step_two === true &&
                      reduxValue.submitvechilesReducer.step_three === true
                        ? "nav-link active"
                        : "nav-link"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Contact Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <div className="tab-content">
              {reduxValue.submitvechilesReducer.step_one === false &&
              reduxValue.submitvechilesReducer.step_two === false &&
              reduxValue.submitvechilesReducer.step_three === false ? (
                <MakeAndModal />
              ) : null}
              {reduxValue.submitvechilesReducer.step_one === true &&
              reduxValue.submitvechilesReducer.step_two === false &&
              reduxValue.submitvechilesReducer.step_three === false ? (
                <BasicFact />
              ) : null}
              {reduxValue.submitvechilesReducer.step_one === true &&
              reduxValue.submitvechilesReducer.step_two === true &&
              reduxValue.submitvechilesReducer.step_three === false ? (
                <Details />
              ) : null}
              {reduxValue.submitvechilesReducer.step_one === true &&
              reduxValue.submitvechilesReducer.step_two === true &&
              reduxValue.submitvechilesReducer.step_three === true ? (
                <ContactInfo />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewVechileRegister;
