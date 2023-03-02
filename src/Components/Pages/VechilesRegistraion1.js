import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  step_one,
  step_three,
  step_two,
} from "../../redux/reducers/submitvechilesReducer";
import counryData from "../countryList";
import { Modal } from "react-bootstrap";
import TermsOfUse from "./TermsOfUse";
import CookiesSetting from "./CookiesSetting";

import { countryData } from "../../countryAndCity";
import FormInput from "../UI/FormInput";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate, useParams } from "react-router-dom";
// import UploadMImages from "./UploadMImages";

const VechilesRegistraion1 = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const [showVidnModal, setShowVidnModal] = useState(false);
  const handleVinClose = () => setShowVidnModal(false);
  const handleVinShow = () => setShowVidnModal(true);
  const [modalShow, setModalShow] = useState(false);
  const [amlPolicy, setAmlPolicy] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [getVinNumber, setGetVinNumber] = useState();
  const [file, setFile] = useState([]);
  const [file1, setFile1] = useState([]);
  const [galleryFile, setGalleryFile] = useState([]);
  const [signinAggri, setSigninAggri] = useState(true);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [understandCondition, setUnderstandCondition] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const userDataLogin = useSelector((state) => state);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMakeAndModal, setErrorMakeAndModal] = useState(true);
  const [errorBasicFact, setErrorBasicFact] = useState(true);
  const [errorDetais, setErrorDetais] = useState(true);
  const [showError, setShowError] = useState(true);
  const [vinDetails, setVinDetails] = useState({});
  const [uploadmultipleImage, setuploadMulipleImage] = useState([]);
  const [userInfo, setUserinfo] = useState({});
  const inputRefBanner = useRef();
  const handleDragOverBanner = (event) => {
    event.preventDefault();
  };
  const [vehicleImage, setVehicleImage] = useState([]);
  const [vehicle, setVehicle] = useState({});

  const [descValue, setDescValue] = useState({
    description1: "",
    description2: "",
  });

  const submitApprove = (data) => {
    axios
      .post(`${process.env.REACT_APP_URL}vehicleApprove`, {
        approve: data === "approve" ? 1 : 2,
        id,
        desc1: descValue.description1,
        desc2: descValue.description2,
      })
      .then(function (response) {
        if (response.status === 200) {
          navigate("/vehicle-submission");
          // window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  // ===========================
  const fetchVehicleApi = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL + "vehicleByID",
        { id: id }
      );
      console.log(98989, response)


      if (response.data.data) {
        setVehicle(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };


  
  const fetchVehicleImage = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setVehicleImage(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicleApi();
    fetchVehicleImage();
  }, [id]);
  // ========================


  const handleDropBanner = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files);
  };
  const inputRefBannerG = useRef();
  const handleDragOverBannerG = (event) => {
    event.preventDefault();
  };

  const handleDropBannerG = (event) => {
    event.preventDefault();
    setGalleryFile(event.dataTransfer.files);
  };

  const inputRefBannerD = useRef();
  const handleDragOverBannerD = (event) => {
    event.preventDefault();
  };

  const handleDropBannerD = (event) => {
    event.preventDefault();
    setFile1(event.dataTransfer.files);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userInfo);
      }
    });
  }, []);

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleShowPayment = (data) => {
    setShowPayment(true);
  };
  const onToken = (token, addresses) => {
    console.log(token, addresses);
    if (token !== null) {
      setShowPayment(false);
      notify("Form submit successfully!");
    }
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
  const closeMoal = () => {
    setModalShow(false);
  };
  const receiveMultipleImage = (data) => {
    console.log("image", JSON.stringify(data));
    setuploadMulipleImage(data);
  };
  const handleAccessoriesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessories([...accessories, value]);
    } else {
      setAccessories(accessories.filter((e) => e !== value));
    }
  };
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

  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const reduxValue = useSelector((data) => data);

  useEffect(() => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  }, []);

  //   const asyncUppercase = item =>
  //   new Promise(resolve =>
  //     setTimeout(
  //       () => resolve(item.toUpperCase()),
  //       Math.floor(Math.random() * 1000)
  //     )
  //   );

  // const uppercaseItems = async (vId) => {
  //   await file.forEach(async item => {
  //     const uppercaseItem = await asyncUppercase(item);
  //     console.log(uppercaseItem);
  //   });

  //   console.log('Items processed');
  // };

  // uppercaseItems("vId");

  const uploadFileOne = (vehicleId) => {
    (async () => {
      for await (const file1 of file) {
        const url = process.env.REACT_APP_URL + "vehicle-image";
        const formData = new FormData();
        formData.append("image[]", file1);
        formData.append("category", "Banner");
        formData.append("vehicleId", vehicleId);
        const newImagedata = formData;
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(url, newImagedata, config);
      }
    })();

    // for (let i = 0; i < file.length; i++) {
    //   const url = process.env.REACT_APP_URL + "vehicle-image";
    //   const formData = new FormData();
    //   formData.append("image", file[i]);
    //   formData.append("vehicleId", vehicleId);
    //   const config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };
    //   const data = await axios.post(url, formData, config);

    // }
  };

  //Get past 15 year get year till now year?
  const years = (startYear) => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  // const uploadFileTwo = (vehicleId) => {
  //   let formData = new FormData();
  //   formData.append("vehicleId", vehicleId);
  //   Array.from(file1).forEach((item) => {
  //     formData.append("image[]", item);
  //   });
  //   const url = `${process.env.REACT_APP_URL}vehicle-image`;
  //   axios
  //     .post(url, formData)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const uploadFileTwo = async (vehicleId) => {
    (async () => {
      for await (const file11 of file1) {
        const url = process.env.REACT_APP_URL + "vehicle-image";
        const formData = new FormData();
        formData.append("image[]", file11);
        formData.append("category", "Document");
        formData.append("vehicleId", vehicleId);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const data = await axios.post(url, formData, config);
      }
    })();
  };
  const uploadFileGallery = async (vehicleId) => {
    (async () => {
      for await (const item of galleryFile) {
        const url = process.env.REACT_APP_URL + "vehicle-image";
        const formData = new FormData();
        formData.append("image[]", item);
        formData.append("category", "Gallery");
        formData.append("vehicleId", vehicleId);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const data = await axios.post(url, formData, config);
      }
    })();
  };

  const [namefield, setNamefield] = useState({
    name: "",
    email: "",
    year: "",
    make: "",
    model: "",
    vechilelocation: "United State",
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
    file: uploadmultipleImage,
  });

  // basic facts

  const [basicfact, setbasicfact] = useState({
    vin: "",
    displayInAuction: "",
    auctionType: "",
    adWebsiteLink: "",
    vechilesrace: "",
    ultiumdrive: "",
    Interstellar: "",
    interior: "",
    brandandmodel: "",
    sizetires: "",
    trucktitled: "",
    other: "",
    status: "",
    km: "",
    wheels: "",
    kmacc: "",
    odometer: "",
    accurateField: "",
    files: "",
    otherTruckTitle: "",
    otherStatus: "",
  });

  const [detailstab, setDetailstab] = useState({
    detailvin: "",
    bodywork: "",
    rustpresent: "",
    modificationstock: "",
    truckfromnew: "",
    servicesperformed: "",
    issuesorproblems: "",
    moreDescription: "",
    reserve: "",
    reserveAmount: "",
    shibnobiabout: "",
    rtmember: "",
    shibnobi: "",
    documentFee: "",
    accept: "",
    understand: "",
    truckHistory: "",
    rustDetails: "",
    modificationOnTrck: "",
    fuel: "",
  });

  // contact info

  const [information, setInformation] = useState({
    uemail: "",
    username: "",
    password: "",
    iname: "",
    phone: "",
  });
  const handleNameField = (e) => {
    const Value = e.target.value;
    const Name = e.target.name;
    setNamefield({ ...namefield, [Name]: Value });
  };

  // User account information api
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        const data = res.data.data;
        setInformation({
          uemail: data.email,
          username: data.username,
          password: "",
          iname: data.name,
          phone: data.mobile,
        });
      }
    });
  }, []);

  const handleNextSubmit = (e) => {
    e.preventDefault();
    setErrorMakeAndModal(false);
    dispatch(step_one(true));
    dispatch(step_two(false));
    dispatch(step_three(false));
  };
  const basicFactOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;

    if (Name === "odometer") {
      Value = e.target.value.replace(/\D/g, "");
    }
    setbasicfact({ ...basicfact, [Name]: Value });
  };
  const basicFactSubmitHandler = (e) => {
    e.preventDefault();
    setErrorBasicFact(false);
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(false));
  };
  const detailsOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    setDetailstab({ ...detailstab, [Name]: Value });
  };
  const detailsSubmitHandler = (e) => {
    e.preventDefault();
    setErrorDetais(false);
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(true));
  };
  const informationOnChange = (e) => {
    let Value = e.target.value;
    const Name = e.target.name;
    if (Name === "phone") {
      Value = e.target.value.replace(/\D/g, "");
    }
    setInformation({ ...information, [Name]: Value });
  };

  const informationSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
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
    } = namefield;
    const {
      vin,
      displayInAuction,
      auctionType,
      adWebsiteLink,
      vechilesrace,
      ultiumdrive,
      Interstellar,
      interior,
      brandandmodel,
      sizetires,
      trucktitled,
      other,
      status,
      kmacc,
      odometer,
      accurateField,
      wheels,
      otherTruckTitle,
      otherStatus,
    } = basicfact;
    const {
      bodywork,
      rustpresent,
      modificationstock,
      servicesperformed,
      issuesorproblems,
      moreDescription,
      reserve,
      reserveAmount,
      shibnobiabout,
      documentFee,
      truckHistory,
      rustDetails,
      modificationOnTrck,
      fuel,
    } = detailstab;
    const { uemail, iname, phone } = information;
    // let d = new Date();
    // d.setHours(d.getHours() + 2);
    // d.setMinutes(d.getMinutes() + 20);
    // console.log("addEnd Time", d.toLocaleString());
    const handleDateTimeFormate = () => {
      let curDateAndTime = new Date();
      curDateAndTime.setDate(curDateAndTime.getDate() + 5);
      const formateDay = curDateAndTime.getDate();
      const formateMonth = curDateAndTime.getMonth() + 1;
      const formateYear = curDateAndTime.getFullYear();
      const formateHour = curDateAndTime.getHours();
      const formateMint = curDateAndTime.getMinutes();
      const formateSecond = curDateAndTime.getSeconds();
      return `${formateYear}/${formateMonth}/${formateDay}, ${formateHour}:${formateMint}:${formateSecond}`;
    };
    const EndDateTime = handleDateTimeFormate();

    if (errorMakeAndModal || errorBasicFact || errorDetais) {
      return setShowError(false);
    }

    axios
      .post(`${url}vehicles`, {
        name: iname,
        email: uemail,
        premium: reduxValue.submitvechilesReducer.submitPlan,
        userId: userDataLogin.login.user.id,
        year: year,
        make: make,
        description: videolink,
        model: model,
        owned: sale,
        country: vechilelocation,
        city: city,
        consignment: soldvechiles,
        dealerName: dealership,
        dealerId: dealer,
        dealerDescription: dealership,
        ownerDetail: `${vechilesrace === "Yes" ? "Race Car" : "No"} `,
        detailvin: vin,
        displayInAuction: displayInAuction,
        auctionType,
        externalLink: adWebsiteLink,
        km: odometer,
        kmacc: accurateField,
        odmeter: odometer,
        ogEngine: kmacc,
        transmission: providelink,
        title: trucktitled,
        other,
        titleStatus: changedvechiles,
        engineSize: vehiclepast,
        stepOneImage: "",
        stepTwoImage: "",
        ste: `${ultiumdrive === "Yes" ? "Drive e4WD system" : ""}`,
        link: link,
        accessories: accessories.toString(),
        truckDetails: detailsInfo.toString(),
        moreDescription: moreDescription,
        reserve: `${reserve === "Yes" ? reserve : "No"}`,
        reservAmount: reserveAmount,
        hereFrom: shibnobiabout,
        ammountOnDocument: servicesperformed,
        documentFee,
        Interstellar,
        pickOne: wheels,
        interior,
        brandandmodel,
        understandCondition,
        acceptTerms,
        sizetires,
        bodywork,
        rustpresent,
        modificationstock,
        issuesorproblems,
        status, // db me check karni h
        otherTruckTitle,
        otherStatus,
        truckHistory,
        rustDetails,
        modificationOnTruck: modificationOnTrck,
        fuel,
        EndTime: EndDateTime.toString(),
        phone,
        sold: 1,
      })
      .then((result) => {
        setSubmitLoading(false);
        uploadFileOne(result.data.id);
        uploadFileTwo(result.data.id);
        uploadFileGallery(result.data.id);
        handleShowPayment();
        setNamefield({
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
        setbasicfact({
          vin: "",
          displayInAuction: "",
          auctionType: "",
          adWebsiteLink: "",
          vechilesrace: "",
          ultiumdrive: "",
          Interstellar: "",
          interior: "",
          brandandmodel: "",
          sizetires: "",
          trucktitled: "",
          other: "",
          status: "",
          km: "",
          kmacc: "",
          odometer: "",
          accurateField: "",
          files: "",
        });
        setDetailstab({
          detailvin: "",
          bodywork: "",
          rustpresent: "",
          modificationstock: "",
          truckfromnew: "",
          servicesperformed: "",
          issuesorproblems: "",
          moreDescription: "",
          reserve: "",
          reserveAmount: "",
          shibnobiabout: "",
          rtmember: "",
          shibnobi: "",
          documentFee: "",
          accept: "",
          understand: "",
        });
        setInformation({
          uemail: "",
          username: "",
          password: "",
          iname: "",
          phone: "",
        });
        dispatch(step_one(false));
        dispatch(step_two(false));
        dispatch(step_three(false));
      })
      .catch((error) => {
        console.log(error);
        setSubmitLoading(false);
      });
  };

  const handleMakeAndModalTab = () => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
    setShowError(true);
  };
  const handleBasicFactTab = () => {
    dispatch(step_one(true));
    dispatch(step_two(false));
    dispatch(step_three(false));
    setShowError(true);
  };
  const handleDetailsTab = () => {
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(false));
    setShowError(true);
  };
  const handleContactTab = () => {
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(true));
  };
  const handleBackMakeAndModal = () => {
    dispatch(step_one(false));
    dispatch(step_two(false));
    dispatch(step_three(false));
  };
  const handleBackBasicFact = () => {
    dispatch(step_one(true));
    dispatch(step_two(false));
    dispatch(step_three(false));
  };
  const handleBackDetails = () => {
    dispatch(step_one(true));
    dispatch(step_two(true));
    dispatch(step_three(false));
  };

  // useEffect(() => {
  //   handleVinShow();
  // }, []);
  // get VIN details

  const validateVin = async (inputVin) => {
    // const options = {
    //   method: "GET",
    //   url: "https://api.vehicledatabases.com/vin-decode/SAJWJ0FF3F8321657",
    //   headers: {
    //     "x-AuthKey": "ff1003dcaed74750a5370070efb780be",
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    // const options = {
    //   method: 'GET',
    //   url: 'https://auto.dev/api/vin/ZPBUA1ZL9KLA00848',
    //   params: {apikey: 'ZrQEPSkKcm9zaGFubWlzaHJhNjEzNEBnbWFpbC5jb20='},
    //   headers: {
    //     Authorization: `Bearer`  }
    // };

    // axios.request(options).then(function (response) {
    // 	console.log(response.data);
    // }).catch(function (error) {
    // 	console.error(error);
    // });
    try {
      const req = await axios(
        `https://api.gasguzzlrs.com/test_vin/${inputVin}`
      );

      if (req.data.status) {
        notify(req.data.message);
      } else {
        setVinDetails(req.data);
        handleVinClose();
        console.log(1111, req.data);
      }
      setGetVinNumber(inputVin);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setNamefield({
      name: "",
      email: "",
      year: `${vinDetails.years && vinDetails?.years[0]?.year}`,
      make: vinDetails?.make?.name,
      model: vinDetails?.model?.name,
      vechilelocation: "United State",
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
      file: uploadmultipleImage,
    });
    setbasicfact({
      vin: getVinNumber,
      displayInAuction: "",
      auctionType: "",
      adWebsiteLink: "",
      vechilesrace: "",
      ultiumdrive: "",
      Interstellar: "",
      interior: "",
      brandandmodel: "",
      sizetires: "",
      trucktitled: "",
      other: "",
      status: "",
      km: "",
      wheels: "",
      kmacc: "",
      odometer: "",
      accurateField: "",
      files: "",
      otherTruckTitle: "",
      otherStatus: "",
    });
    setDetailstab({
      detailvin: "",
      bodywork: "",
      rustpresent: "",
      modificationstock: "",
      truckfromnew: "",
      servicesperformed: "",
      issuesorproblems: "",
      moreDescription: "",
      reserve: "",
      reserveAmount: "",
      shibnobiabout: "",
      rtmember: "",
      shibnobi: "",
      documentFee: "",
      accept: "",
      understand: "",
      truckHistory: "",
      rustDetails: "",
      modificationOnTrck: "",
      fuel: vinDetails?.engine?.fuelType,
    });
  }, [vinDetails]);

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row"></div>
          {
            <div className="row">
              <div className="col-12 text-center pb-4">
                <h2>Sell your vehicle with Gas Guzzlrs Auctions! </h2>
              </div>
              <div className="col-12 col-md-4 col-lg-3">
                <div className="card_Gray mb-5 mb-md-0 divSticky">
                  {/* <!-- Nav pills --> */}
                  <ul className="nav nav-pills sideBar__">
                    <li className="nav-item">
                      <a
                        className={
                          reduxValue.submitvechilesReducer.step_one === false
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={handleMakeAndModalTab}
                        style={{ cursor: "pointer" }}
                      >
                        Make & Model
                      </a>
                      {!showError && errorMakeAndModal ? (
                        <span className="text-danger">
                          Pleae file make & model input field proper
                        </span>
                      ) : null}
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          reduxValue.submitvechilesReducer.step_one === true &&
                            reduxValue.submitvechilesReducer.step_two === false
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={handleBasicFactTab}
                        style={{ cursor: "pointer" }}
                      >
                        Basic Facts
                      </a>
                      {!showError && errorBasicFact ? (
                        <span className="text-danger">
                          Pleae file Basic Facts input field proper
                        </span>
                      ) : null}
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          reduxValue.submitvechilesReducer.step_one === true &&
                            reduxValue.submitvechilesReducer.step_two === true &&
                            reduxValue.submitvechilesReducer.step_three === false
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={handleDetailsTab}
                        style={{ cursor: "pointer" }}
                      >
                        Details
                      </a>
                      {!showError && errorDetais ? (
                        <span className="text-danger">
                          Pleae file Details input field proper
                        </span>
                      ) : null}
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          reduxValue.submitvechilesReducer.step_one === true &&
                            reduxValue.submitvechilesReducer.step_two === true &&
                            reduxValue.submitvechilesReducer.step_three === true
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={handleContactTab}
                        style={{ cursor: "pointer" }}
                      >
                        Contact Info
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                {/* <!-- Tab panes --> */}
                <div className="tab-content">
                  {reduxValue.submitvechilesReducer.step_one === false ? (
                    <div className="tab-pane active">
                      <h3>Make & Model</h3>
                      <hr />
                      <h6>
                        Think your vehicle should be sold via GasGuzzlrs
                        Auctions? Please fill out the form below.
                      </h6>

                      <form className="" onSubmit={handleNextSubmit}>
                        <div className="row">
                          <div className="col-12 pb-3">
                            <h5>What vehicle would you like to sell?</h5>
                            {/* <UploadMImages multipleimage={receiveMultipleImage} /> */}
                          </div>
                        </div>
                        <div className="row row_gap_5">
                          {/* <div className="col-12 col-sm-12 col-md-6">
                          <FormInput
                            value={namefield.name}
                            onChange={handleNameField}
                            name="name"
                            placeholder="Enter Name"
                            errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
                            label="What is your name?"
                            pattern="^[A-Za-z ]{3,16}$"
                            required={true}
                          />
                        </div> */}
                          <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                              value={vehicle.detailvin}
                              onChange={(e) => {
                                if (e.target.value.trim().length === 17) {
                                  validateVin(e.target.value.trim());
                                }
                                basicFactOnChange(e);
                              }}
                              name="vin"
                              label="What is your vehicle VIN?"
                              placeholder="Enter VIN"
                              errorMessage="VIN should be 17 characters and shouldn't include any special character!"
                              pattern="^[A-Za-z0-9]{17}$"
                              required={true}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>What year is your vehicle?</label>
                              <select
                                value={vehicle.year}
                                onChange={handleNameField}
                                name="year"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                {years(new Date().getFullYear() - 15)
                                  .reverse()
                                  .map((curVal) => {
                                    return (
                                      <option value={curVal}>{curVal}</option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <FormInput
                                value={vehicle.make}
                                onChange={handleNameField}
                                name="make"
                                placeholder="Enter"
                                errorMessage="This input field contain 3-16 characters and shouldn't include any special character"
                                label="what make is your vehicle?"
                                pattern="^[A-Za-z0-9 ]{3,16}$"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <FormInput
                                value={vehicle.model}
                                onChange={handleNameField}
                                name="model"
                                placeholder="Enter"
                                // errorMessage="This input field contain 1-16 characters and shouldn't include any special character"
                                label="What model is this vehicle?"
                                // pattern="^[A-Za-z0-9 ]{1,16}$"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What country is the vehicle currently located
                                in?
                              </label>

                              <select
                                value={vehicle.country}
                                onChange={handleNameField}
                                name="vechilelocation"
                                className="field"
                                required
                              >
                                <option value="United State">
                                  United State
                                </option>

                                {counryData.map((curElem, i) => {
                                  return (
                                    <option value={curElem.name} key={i}>
                                      {curElem.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <FormInput
                                value={vehicle.city}
                                onChange={handleNameField}
                                name="city"
                                placeholder="Enter city"
                                errorMessage="This input field contain 3-16 characters and shouldn't include any special character or number"
                                label="What city is the vehicle located in?"
                                pattern="^[A-Za-z ]{3,16}$"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Has it been listed for sale anywhere else since
                                you have owned it?
                              </label>
                              <select
                                value={vehicle.owned}
                                onChange={handleNameField}
                                name="sale"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Has this vehicle been listed on GasGuzzlrs in
                                the past?
                              </label>
                              <select
                                value={vehicle.engineSize}
                                onChange={handleNameField}
                                name="vehiclepast"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </div>
                          </div>
                          {namefield.sale === "Yes" ||
                            namefield.vehiclepast === "Yes" ? (
                            <>
                              <div className="col-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                  <FormInput
                                      value={vehicle.transmission}
                                    onChange={handleNameField}
                                    name="providelink"
                                    type="url"
                                    placeholder="Enter link"
                                    errorMessage="Please provide valid link"
                                    label="Please providea link to the listing:"
                                    required={true}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                  <label>
                                    What has changed on this vehicle since it
                                    was last listed on GasGuzzlrs?
                                  </label>
                                  <textarea
                                      value={vehicle.titleStatus}
                                    onChange={handleNameField}
                                    name="changedvechiles"
                                    className="field"
                                    maxLength={200}
                                    required
                                  ></textarea>
                                </div>
                              </div>
                            </>
                          ) : null}
                          {/* <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>Are you a dealer?</label>
                            <select
                              value={namefield.dealer}
                              onChange={handleNameField}
                              name="dealer"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Select
                              </option>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>
                        {namefield.dealer === "Yes" ? (
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What is the name of your dealership? Please
                                include a link to your website.
                              </label>
                              <input
                                value={namefield.dealership}
                                onChange={handleNameField}
                                type="text"
                                minLength={2}
                                maxLength={50}
                                name="dealership"
                                placeholder="Enter"
                                className="field"
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )} */}
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>
                                Is the vehicle being sold on consignment?
                              </label>
                              <select
                                value={vehicle.consignment}
                                onChange={handleNameField}
                                name="soldvechiles"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <FormInput
                                value={vehicle.description}
                                onChange={handleNameField}
                                name="videolink"
                                type="url"
                                placeholder="Enter link"
                                errorMessage="Please provide valid link"
                                label="Please provide any links to videos (Youtube or
                              Video) here:"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <p>Please upload banner photo.</p>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="row">
                              {Array.from(file).map((items) => {
                                return (
                                  <span>
                                    <img
                                      src={
                                        items
                                          ? URL.createObjectURL(items)
                                          : null
                                      }
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

                            <div className="form-group">
                              <div
                                className="dropzone"
                                onDragOver={handleDragOverBanner}
                                onDrop={handleDropBanner}
                              >
                                <h3>Drag and Drop Files to Upload</h3>
                                <h3>Or</h3>
                                <input
                                  onChange={(e) => {
                                    return setFile(e.target.files);
                                  }}
                                  name="file"
                                  type="file"
                                  accept="image/gif, image/jpeg, image/png, image/jpg"
                                  ref={inputRefBanner}
                                  hidden
                                />
                                <button
                                  className="orange_btn"
                                  type="button"
                                  onClick={() => inputRefBanner.current.click()}
                                >
                                  Select Files
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <p className="small">
                              Accepted file types: jpg, jpeg, png, Max. file
                              size: 8 MB
                            </p>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <p>
                                Please upload photos of your vehicle using the
                                box below — pick ones that offer a good sense of
                                the vehicle. The more, and the higher the
                                quality, the better.{" "}
                                <a href="#" className="link">
                                  Click here to review our photo guide.
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <div className="row">
                                {Array.from(galleryFile).map((items) => {
                                  return (
                                    <span>
                                      <img
                                        src={
                                          items
                                            ? URL.createObjectURL(items)
                                            : null
                                        }
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
                                onDragOver={handleDragOverBannerG}
                                onDrop={handleDropBannerG}
                              >
                                <h3>Drag and Drop Files to Upload</h3>
                                <h3>Or</h3>
                                <input
                                  onChange={(e) => {
                                    setGalleryFile(e.target.files);
                                  }}
                                  name="file"
                                  type="file"
                                  accept="image/gif, image/jpeg, image/png, image/jpg"
                                  ref={inputRefBannerG}
                                  multiple
                                  hidden
                                />
                                <button
                                  className="orange_btn"
                                  type="button"
                                  onClick={() =>
                                    inputRefBannerG.current.click()
                                  }
                                >
                                  Select Files
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <p className="small">
                              Accepted file types: jpg, jpeg, png, Max. file
                              size: 8 MB
                            </p>
                          </div>
                          <div className="col-12"></div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <button type="submit" className="orange_btn">
                              NEXT
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {reduxValue.submitvechilesReducer.step_one === true &&
                    reduxValue.submitvechilesReducer.step_two === false ? (
                    <div className="tab-pane active">
                      <h3>Basic Facts</h3>
                      <hr />

                      <h5>Please provide some basic info on your vehicle:</h5>
                      <p>
                        {namefield.make &&
                          namefield.model &&
                          `We love ${namefield.make} ${namefield.model}s!`}
                      </p>
                      {/* <div className="mb-2">
                      <img src={img_001} />
                    </div> */}

                      <p>
                        Please provide some basic info to help us gather a
                        better sense of your vehicle. The more information you
                        can provide up front, the quicker we will be able to
                        write the auction listing.
                      </p>

                      <form onSubmit={basicFactSubmitHandler} className="pt-3">
                        <div className="row row_gap_5">
                          {false && (
                            <div className="col-12 col-sm-12 col-md-6">
                              {/* <div className="form-group">
                            <label>What is your vehicle VIN?</label>
                            <input
                              value={basicfact.vin}
                              onChange={basicFactOnChange}
                              type="text"
                              name="vin"
                              minLength={2}
                              maxLength={31}
                              placeholder="Enter"
                              className="field"
                              required
                            />
                            
                          </div> */}
                              {/* <FormInput
                              value={basicfact.vin}
                              onChange={basicFactOnChange}
                              name="vin"
                              label="What is your vehicle VIN?"
                              placeholder="Enter VIN"
                              errorMessage="VIN should be 17 characters and shouldn't include any special character!"
                              pattern="^[A-Za-z0-9]{17}$"
                              required={true}
                            /> */}
                            </div>
                          )}
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                How would you want to list your vehicle?
                              </label>
                              <select
                                  value={vehicle.displayInAuction}
                                onChange={basicFactOnChange}
                                name="displayInAuction"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option
                                  value="Yes"
                                  disabled={
                                    logingUser.planReducer.plan.listName ===
                                      "classified"
                                      ? true
                                      : false
                                  }
                                >
                                  Auction
                                </option>
                                <option
                                  value="No"
                                  disabled={
                                    logingUser.planReducer.plan.listName ===
                                      "classified"
                                      ? true
                                      : false
                                  }
                                >
                                  Showroom
                                </option>
                                <option
                                  value="classified"
                                  disabled={
                                    logingUser.planReducer.plan.listName ===
                                      "classified"
                                      ? false
                                      : true
                                  }
                                >
                                  Classified Ads
                                </option>
                              </select>
                            </div>
                          </div>

                          {logingUser.planReducer.plan.listName ===
                            "classified" ? (
                            <div className="col-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <FormInput
                                      value={vehicle.externalLink}
                                  onChange={basicFactOnChange}
                                  name="adWebsiteLink"
                                  type="url"
                                  placeholder="Enter link"
                                  errorMessage="Please provide valid link"
                                  label="Please provide your website link here"
                                  required={true}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <label>Auction type</label>
                                <select
                                  value={vehicle.auctionType}
                                  onChange={basicFactOnChange}
                                  name="auctionType"
                                  className="field"
                                  required
                                >
                                  <option selected disabled value="">
                                    Auction type
                                  </option>
                                  <option value="General listing">
                                    General listing
                                  </option>
                                  <option value="For charity">
                                    For charity
                                  </option>
                                  <option value="Premium listing">
                                    Premium listing
                                  </option>
                                </select>
                              </div>
                            </div>
                          )}

                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is this vehicle a race car or not otherwise
                                registered for street use?
                              </label>
                              <select
                                  value={vehicle.ownerDetail}
                                onChange={basicFactOnChange}
                                name="vechilesrace"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Does the vehicle have an Ultium Drive e4WD
                                system?
                              </label>
                              <select
                                  value={vehicle.ste}
                                onChange={basicFactOnChange}
                                name="ultiumdrive"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is the vehicle finished in Interstellar White?
                              </label>
                              <select
                                value={vehicle.Interstellar}
                                onChange={basicFactOnChange}
                                name="Interstellar"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is the interior upholstered in Jet Black and
                                Light Gray leather?
                              </label>
                              <select
                                value={vehicle.interior}
                                onChange={basicFactOnChange}
                                name="interior"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What brand and model of tyre are currently
                                mounted?
                              </label>
                              <input
                                value={vehicle.brandandmodel}
                                onChange={basicFactOnChange}
                                minLength={2}
                                maxLength={31}
                                name="brandandmodel"
                                type="text"
                                placeholder="Ex. Michelin Pilot Sport"
                                className="field"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <label>What wheels are on the vehicle?</label>
                            <input
                                value={vehicle.pickOne}
                              onChange={basicFactOnChange}
                              name="wheels"
                              type="text"
                              minLength={2}
                              maxLength={31}
                              placeholder="wheels"
                              className="field"
                              required
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What size of tyre are on the vehicle? *The size
                                can be found on the tire sidewall.
                              </label>
                              <input
                                value={vehicle.sizetires}
                                onChange={basicFactOnChange}
                                type="text"
                                name="sizetires"
                                minLength={2}
                                maxLength={31}
                                placeholder="Ex. 305/70R18"
                                className="field"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>How is the vehicle titled?</label>
                              <select
                                value={vehicle.km}
                                onChange={basicFactOnChange}
                                name="km"
                                className="field"
                                required
                              >
                                <option
                                  selected
                                  disabled
                                  value=""
                                  className="gf_placeholder"
                                >
                                  Select
                                </option>
                                <option value="the seller's name">
                                  Titled in my name
                                </option>
                                <option value="the former owner's name">
                                  Titled in former owner's name
                                </option>
                                <option value="the seller's name with a lien on the title">
                                  Lien on title
                                </option>
                                <option value="the owner's name and is being represented by the seller">
                                  Representing owner with title in their name
                                </option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            {basicfact.km === "other" ? (
                              <div className="form-group">
                                <label>Enter vehicle titled</label>
                                <input
                                  value={vehicle.otherTruckTitle}
                                  onChange={basicFactOnChange}
                                  type="text"
                                  minLength={2}
                                  maxLength={31}
                                  name="otherTruckTitle"
                                  placeholder="vehicle title"
                                  className="field"
                                  required
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>What is the status of the title?</label>
                              <select
                                value={vehicle.status}
                                name="status"
                                onChange={basicFactOnChange}
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="clean">Clean</option>
                                <option value="rebuilt">Rebuilt</option>
                                <option value="salvage">Salvage</option>
                                <option value="branded">Branded</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            {basicfact.status === "other" ? (
                              <div className="form-group">
                                <label>Enter status of the titled</label>
                                <input
                                  value={vehicle.otherStatus}
                                  onChange={basicFactOnChange}
                                  type="text"
                                  name="otherStatus"
                                  minLength={2}
                                  maxLength={31}
                                  placeholder="vehicle title"
                                  className="field"
                                  required
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What is the current odometer reading?
                              </label>
                              <input
                                value={vehicle.odometer}
                                onChange={basicFactOnChange}
                                type="text"
                                minLength={1}
                                maxLength={12}
                                name="odometer"
                                placeholder="Ex. 41,000 miles"
                                className="field"
                                required
                              />
                              {/* <p className="small">
                              *Don't forget to include a photo of the current
                              reading during the photo upload process
                            </p> */}
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                To the best of your knowledge, is this number
                                accurate?
                              </label>
                              <select
                                  value={vehicle.kmacc}
                                onChange={basicFactOnChange}
                                name="accurateField"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <p>
                                Please upload a photo of your title (or a photo
                                of your registration if the vehicle has a lien).
                                This will not be displayed publicly, but will
                                instead be used to verify ownership status.
                              </p>
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <div className="row">
                                {Array.from(file1).map((items, i) => {
                                  return (
                                    <span key={i} className="px-1">
                                      <img
                                        src={
                                          items
                                            ? URL.createObjectURL(items)
                                            : null
                                        }
                                        style={{
                                          width: "70px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </span>
                                  );
                                })}
                              </div>

                              <div
                                className="dropzone"
                                onDragOver={handleDragOverBannerD}
                                onDrop={handleDropBannerD}
                              >
                                <h3>Drag and Drop Files to Upload</h3>
                                <h3>Or</h3>
                                <input
                                  onChange={(e) => {
                                    setFile1((prevState) => [
                                      ...prevState,
                                      ...e.target.files,
                                    ]);
                                  }}
                                  name="files"
                                  type="file"
                                  multiple
                                  ref={inputRefBannerD}
                                  hidden
                                />
                                <button
                                  className="orange_btn"
                                  type="button"
                                  onClick={() =>
                                    inputRefBannerD.current.click()
                                  }
                                >
                                  Select Files
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <p className="small">
                              Accepted file types: jpg, jpeg, png, Max. file
                              size: 1 GB.
                            </p>
                          </div>
                          <div className="col-12"></div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <button
                              onClick={handleBackMakeAndModal}
                              type="button"
                              className="gry_btn"
                            >
                              BACK
                            </button>
                            <button type="submit" className="orange_btn">
                              NEXT
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {reduxValue.submitvechilesReducer.step_one === true &&
                    reduxValue.submitvechilesReducer.step_two === true &&
                    reduxValue.submitvechilesReducer.step_three === false ? (
                    <div className="tab-pane active">
                      <h3>Details</h3>
                      <hr />
                      <form className="pt-3" onSubmit={detailsSubmitHandler}>
                        <div className="row">
                          <div className="col-12">
                            <h5>Description and details</h5>
                          </div>
                        </div>
                        <div className="row row_gap_5">
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Does the vehicle have any history of paint or
                                bodywork?
                              </label>
                              <select
                                value={vehicle.bodywork}
                                onChange={detailsOnChange}
                                name="bodywork"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            {detailstab.bodywork === "Yes" && (
                              <div className="form-group">
                                <label>
                                  Enter vehicle history, paint or bodywork
                                </label>
                                <input
                                  value={vehicle.truckHistory}
                                  onChange={detailsOnChange}
                                  type="text"
                                  name="truckHistory"
                                  minLength={2}
                                  maxLength={100}
                                  placeholder="Enter vehicle history"
                                  className="field"
                                  required
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is there any rust present on the vehicle?
                              </label>
                              <select
                                value={vehicle.rustpresent}
                                onChange={detailsOnChange}
                                name="rustpresent"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            {detailstab.rustpresent === "Yes" && (
                              <div className="form-group">
                                <label>Enter rust details</label>
                                <input
                                  value={vehicle.rustDetails}
                                  onChange={detailsOnChange}
                                  type="text"
                                  name="rustDetails"
                                  minLength={2}
                                  maxLength={41}
                                  placeholder="Enter rust"
                                  className="field"
                                  required
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                              name="fuel"
                              value={vehicle.fuel}
                              onChange={detailsOnChange}
                              placeholder="Enter fuel type"
                              errorMessage="Fuel type should be 2 to 60 character!"
                              label="Fuel Type"
                              pattern="^[A-Za-z(),.;@! ]{2,60}$"
                              required={true}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Does the vehicle have any modifications from
                                stock?
                              </label>
                              <select
                                value={vehicle.modificationstock}
                                onChange={detailsOnChange}
                                name="modificationstock"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                            {detailstab.modificationstock === "Yes" && (
                              <div className="form-group">
                                <label>Enter modifications details</label>
                                <input
                                    value={vehicle.modificationOnTruck}
                                  onChange={detailsOnChange}
                                  minLength={2}
                                  maxLength={400}
                                  type="text"
                                  name="modificationOnTrck"
                                  placeholder="Enter modifications"
                                  className="field"
                                  required
                                />
                                {detailstab.modificationOnTrck.trim().length >
                                  400 && (
                                    <span className="text-danger">
                                      You Can entered maximum 1500 characters!
                                    </span>
                                  )}
                              </div>
                            )}
                          </div>
                          {/* <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Is the vehicle equipped with any of the following?
                              <br /> Please select all that apply:
                            </label>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Illumination"
                                      onChange={handleDetailsInfoOnChange}
                                      name="Illumination"
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Illumination Package
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Power-retractable tonneau cover"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      name="Power-retractable"
                                      type="checkbox"
                                    />{" "}
                                    Power-retractable tonneau cover
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Soft tonneau cover"
                                      name="soft"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Soft tonneau cover
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Kicker audio system with MultiPro tailgate"
                                      name="kicker"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Kicker audio system with MultiPro tailgate
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      value="Other"
                                      name="other"
                                      onChange={handleDetailsInfoOnChange}
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>
                                What do you know about the history of the
                                vehicle from new?
                              </label>
                              <textarea
                                value={vehicle.issuesorproblems}
                                onChange={detailsOnChange}
                                name="issuesorproblems"
                                minLength={1}
                                maxLength={2000}
                                className="field"
                                required
                              ></textarea>
                              {detailstab.issuesorproblems.trim().length >
                                1500 && (
                                  <span className="text-danger">
                                    You Can entered maximum 1500 characters!
                                  </span>
                                )}
                            </div>
                            <p>
                              Please list and describe services performed and
                              when they were performed. <br />
                              *Dates and timelines provide valuable information
                              for interested buyers. Don't forget to upload
                              images of redacted service records for recent
                              and/or notable services.
                            </p>
                            <div className="form-group">
                              <textarea
                                value={vehicle.moreDescription}
                                onChange={detailsOnChange}
                                name="moreDescription"
                                className="field"
                                minLength={1}
                                maxLength={2000}
                                placeholder="Ex. June 2017: clutch replaced, May 2018: tyre replaced and wheels refinished, September 2021: fluids and filters changed"
                                required
                              ></textarea>
                              {detailstab.moreDescription.trim().length >
                                1500 && (
                                  <span className="text-danger">
                                    You Can entered maximum 1500 characters!
                                  </span>
                                )}
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>
                                What accessories are included in the sale?{" "}
                                <br />
                                Please select all that apply:
                              </label>
                              <div className="row">
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="window sticky"
                                        onChange={handleAccessoriesChange}
                                        name="window"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Window Sticker
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="Owner's Manual"
                                        onChange={handleAccessoriesChange}
                                        name="owner"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Owner's Manual
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="Service Records"
                                        onChange={handleAccessoriesChange}
                                        name="Service"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Service Records
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="Spare Parts"
                                        onChange={handleAccessoriesChange}
                                        name="spare"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Spare Parts
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="car cover"
                                        onChange={handleAccessoriesChange}
                                        name="car-cover"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Car Cover
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        value="Other"
                                        onChange={handleAccessoriesChange}
                                        name="owner-other"
                                        className="form-check-input"
                                        type="checkbox"
                                      />{" "}
                                      Other
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>
                                What issues or problems does it currently have?
                                Is there anything that currently doesn't work or
                                doesn't operate correctly? Be thorough - you
                                don't want commenters to do this for you.
                                <br />
                                (e.g. engine problems, non-functional items,
                                dents, interior flaws, etc.)
                              </label>
                              <textarea
                                  value={vehicle.hereFrom}
                                onChange={detailsOnChange}
                                name="shibnobiabout"
                                minLength={2}
                                maxLength={2000}
                                className="field"
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>Do you want a reserve?</label>
                              <select
                                value={vehicle.reserve}
                                onChange={detailsOnChange}
                                name="reserve"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          {detailstab.reserve === "Yes" && (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <FormInput
                                  value={vehicle.reserveAmount}
                                  onChange={detailsOnChange}
                                  name="reserveAmount"
                                  placeholder="Enter"
                                  errorMessage="Reserve amount should be 1-9 characters and shouldn't include any special character and alphabet!"
                                  label="Please provide reserve amount:"
                                  pattern="^[0-9]{1,9}$"
                                  required={true}
                                />
                              </div>
                            </div>
                          )}
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Where did you hear about GasGuzzlrs?
                              </label>
                              <select
                                value={detailstab.shibnobi} //confussion
                                onChange={detailsOnChange}
                                name="shibnobi"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                <option value="referred">
                                  Referred by a GasGuzzlrs member
                                </option>
                                <option value="facebook">Facebook</option>
                                <option value="google">Google</option>
                                <option value="instagram">Instagram</option>
                                <option value="longtime">
                                  I'm a long time GasGuzzlrs Reader
                                </option>
                                <option value="repeat">Repeat seller</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <FormInput
                                value={vehicle.documentFee}
                                onChange={detailsOnChange}
                                name="documentFee"
                                type="text"
                                placeholder="USD $"
                                errorMessage="Amount should be 1-9 characters and shouldn't include any special character, space and alphabet!"
                                label="What is the amount of the document fee that you
                              will charge buyers above and beyond sale price and
                              tax? (This will be printed in the listing.)"
                                pattern="^[0-9,]{1,9}$"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group form-check">
                              <label className="form-check-label">
                                <input
                                  onChange={(e) =>
                                    setAcceptTerms(e.target.checked)
                                  }
                                  name="accept"
                                  value={acceptTerms}
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={acceptTerms}
                                  required
                                />{" "}
                                I accept the{" "}
                                <a
                                  onClick={() => {
                                    setAmlPolicy(false);
                                    setModalShow(true);
                                  }}
                                  className="link"
                                  style={{ cursor: "pointer" }}
                                >
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                  onClick={() => {
                                    setAmlPolicy(true);
                                    setModalShow(true);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className="link"
                                >
                                  AML Policy
                                </a>
                              </label>
                            </div>
                            <div className="form-group form-check">
                              <label className="form-check-label">
                                <input
                                  onChange={(e) =>
                                    setUnderstandCondition(e.target.checked)
                                  }
                                  name="understand"
                                  value={understandCondition}
                                  className="form-check-input"
                                  checked={understandCondition}
                                  type="checkbox"
                                  required
                                />{" "}
                                I understand that if the final bid for my
                                vehicle is below the reserve, GasGuzzlrs may
                                choose (at its sole discretion) to make up the
                                difference. In this case the vehicle will appear
                                as sold at the below-reserve price and
                                GasGuzzlrs will pay me the difference between
                                the high bid and the reserve once the
                                transaction is complete.
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <button
                              onClick={handleBackBasicFact}
                              type="button"
                              className="gry_btn"
                            >
                              BACK
                            </button>
                            <button type="submit" className="orange_btn">
                              NEXT
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : null}
                  {reduxValue.submitvechilesReducer.step_one === true &&
                    reduxValue.submitvechilesReducer.step_two === true &&
                    reduxValue.submitvechilesReducer.step_three === true ? (
                    <div className="tab-pane active">
                        {/* <h3>Contact Info</h3> */}
                        <div className="">
                          <button
                            onClick={() => submitApprove("approve")}
                            className="btn btn-warning m-3"
                            type="button"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => submitApprove("reject")}
                            className="btn btn-warning m-3"
                            type="button"
                          >
                            Reject
                          </button>
                        </div>
                      {/* <hr /> */}

                      {/* <form
                        className="pt-3"
                        onSubmit={informationSubmitHandler}
                      >
                        <div className="row">
                          <div className="col-12">
                            <h5>Complete Your Contact Info</h5>
                            <h6>Subscribe to our newsletter:</h6>
                          </div>
                        </div>
                        <div className="row row_gap_5">
                          <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                                value={vehicle.email}
                              // onChange={informationOnChange}
                              name="uemail"
                              type="email"
                              placeholder="Enter Email"
                              errorMessage="It should be a valid email address!"
                              label="Email"
                              required={true}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                                value={vehicle.name}
                              // onChange={informationOnChange}
                              name="iname"
                              placeholder="Enter Name"
                              errorMessage="Name should be 2-60 characters and shouldn't include any special character or number!"
                              label="Name"
                              pattern="^[A-Za-z ]{2,60}$"
                              required={true}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                              value={information.phone}
                              // onChange={informationOnChange}
                              name="phone"
                              placeholder="Enter Phone Number"
                              errorMessage="Phone number should be 10-20 characters and shouldn't include any special character and alphabet!"
                              label="Phone"
                              pattern="^[0-9]{10,20}$"
                              required={true}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group form-check">
                              <label className="form-check-label">
                                <input
                                  name="checkbox"
                                  value={signinAggri}
                                  onChange={signInChange}
                                  className="form-check-input"
                                  checked={signinAggri}
                                  type="checkbox"
                                />
                                Sign me up for the GasGuzzlrs Daily Mail
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <button
                              type="button"
                              onClick={handleBackDetails}
                              className="gry_btn"
                            >
                              BACK
                            </button>
                            {submitLoading ? (
                              <button type="button" className="gry_btn">
                                Loading...
                              </button>
                            ) : (
                              <button type="submit" className="gry_btn">
                                Finish
                              </button>
                            )}
                          </div>
                        </div>
                      </form> */}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      <Modal
        show={modalShow}
        onHide={closeMoal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {amlPolicy ? "AML Policy" : "Terms of Service"}
          </Modal.Title>
          <div onClick={closeMoal} style={{ cursor: "pointer" }}>
            X
          </div>
        </Modal.Header>
        <Modal.Body>
          {amlPolicy ? <CookiesSetting /> : <TermsOfUse />}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={showPayment} onHide={handleClosePayment} className="payTPop">
        <Modal.Header>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClosePayment}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2> Name : {userInfo.name} </h2>
            <h3 className="price__">
              {" "}
              Type :{" "}
              {logingUser.planReducer.plan &&
                logingUser.planReducer.plan.listName}
            </h3>
            <h3 className="price__">
              Price : $
              {logingUser.planReducer.plan &&
                logingUser.planReducer.plan.amount}
            </h3>

            {/* <small className="ticketCount">1 Ticket = $100</small> */}
            <br />
            <p>Choose Payment Option:</p>
            <div className="ress">
              <div className="ProcessPymt">
                <ConnectButton></ConnectButton>

                {/* <img src={Paypal} />
              <img src={Stipe} /> */}
              </div>
              <div>
                <StripeCheckout
                  className="Btn"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showVidnModal}
        onHide={handleVinClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                // onClick={handleVinClose}
                onClick={() => navigate(-1)}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={validateVin}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <FormInput
                        name="bid"
                        value={getVinNumber}
                        onChange={(e) => setGetVinNumber(e.target.value)}
                        label="What is your vehicle VIN?"
                        placeholder="Enter VIN"
                        errorMessage="VIN should be 17 characters and shouldn't include any special character!"
                        pattern="^[A-Za-z0-9]{17}$"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center pt-4 ">
                    <button className="btn" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VechilesRegistraion1;
