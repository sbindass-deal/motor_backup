import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import counryData from "../countryList";

const BasicFact = () => {
  const [nameFieldValid, setNameFieldValid] = useState(false);
  const [basicFactValid, setBasicFactValid] = useState(false);
  const [detailsTabValid, setDetailsTabValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(true);
  const [userPassWordValid, setUserPassWordValid] = useState(true);
  const [userPhone, setUserPhone] = useState(true);
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();

  const [errorCont, setErrorCont] = useState(false);
  const [signinAggri, setSigninAggri] = useState();
  const [signinAggriSubmit, setSigninAggriSubmit] = useState(true);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [acceptDetails, setAcceptDetails] = useState();
  const [understandCondition, setUnderstandCondition] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const userDataLogin = useSelector((state) => state);
  const [pickOne, setPickOne] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const notify = (val) => toast(val);
  const acceptDteailsPageOnChange = (e) => {
    const { checked } = e.target;
    setAcceptDetails(checked);
  };
  console.log(understandCondition, acceptTerms);
  const handleAccessoriesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessories([...accessories, value]);
    } else {
      setAccessories(accessories.filter((e) => e !== value));
    }
  };

  console.log(accessories);
  const handleDetailsInfoOnChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDetailsInfo([...detailsInfo, value]);
    } else {
      setDetailsInfo(detailsInfo.filter((e) => e !== value));
    }
  };
  const signInChange = (e) => {
    const { checked } = e.target;
    setSigninAggri(checked);
  };

  console.log(errorCont);
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const reduxValue = useSelector((data) => data);

  useEffect(() => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  }, []);

  const uploadFileOne = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "vehicle-image";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

  const uploadFileTwo = async (vehicleId) => {
    const url = process.env.REACT_APP_URL + "vehicle-image";
    const formData = new FormData();
    formData.append("image", file1);
    formData.append("vehicleId", vehicleId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

  const [namefield, setNamefield] = useState({
    name: "",
    email: "",
    year: "",
    make: "",
    model: "",
    vechilelocation: "",
    city: "",
    sale: "",
    link: "",
    vehiclepast: "",
    providelink: "",
    changedvechiles: "",
    dealer: "",
    dealership: "",
    soldvechiles: "",
    videolink: "",
    file: "",
  });
  const handleNameField = (e) => {
    const {
      name,
      email,
      year,
      make,
      model,
      vechilelocation,
      city,
      sale,
      link,
      vehiclepast,
      providelink,
      changedvechiles,
      dealer,
      dealership,
      soldvechiles,
      videolink,
      file,
    } = namefield;
    const Value = e.target.value;
    const Name = e.target.name;
    setNamefield({ ...namefield, [Name]: Value });
    if (
      name.trim().length !== 0 &&
      // email.trim().length !== 0 &&
      year.trim().length !== 0 &&
      make.trim().length !== 0 &&
      model.trim().length !== 0 &&
      city.trim().length !== 0 &&
      sale.trim().length !== 0 &&
      vechilelocation.trim().length !== 0 &&
      // link.trim().length !== 0 &&
      vehiclepast.trim().length !== 0 &&
      providelink.trim().length !== 0 &&
      changedvechiles.trim().length !== 0 &&
      dealer.trim().length !== 0 &&
      // dealership.trim().length !== 0 &&
      soldvechiles.trim().length !== 0 &&
      videolink.trim().length !== 0
      // file.trim().length !== 0
    ) {
      setNameFieldValid(true);
    } else {
      setNameFieldValid(false);
    }
  };
  const handleNextSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Hello basic</h1>
    </>
  );
};

export default BasicFact;
