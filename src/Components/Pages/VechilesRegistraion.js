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
import { Modal } from "react-bootstrap";
import TermsOfUse from "./TermsOfUse";
import CookiesSetting from "./CookiesSetting";

import FormInput from "../UI/FormInput";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import CloseIcon from "@mui/icons-material/Close";
import {
  getPlanByDealerSelect,
  purchagedPlan,
} from "../../redux/reducers/planReducer";

// import UploadMImages from "./UploadMImages";
const inputArr = [
  {
    type: "url",
    id: 1,
    value: "",
  },
];

const VechilesRegistraion = () => {
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
  const [aggreePayment, setAggreePayment] = useState(false);
  const [arr, setArr] = useState(inputArr);

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
  const [mapLink, setMapLink] = useState("1");
  const [uploadmultipleImage, setuploadMulipleImage] = useState([]);
  const [mappedInputData, setMappedInputData] = useState([]);
  const [counryData, setCounryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [endDateAndTime, setEndDateAndTime] = useState(null);
  const [countryCode, setCountryCode] = useState(231);
  const [vehicleHistory, setVehicleHistory] = useState(
    EditorState.createEmpty()
  );
  const [serviceRecord, setServiceRecord] = useState(EditorState.createEmpty());
  const [issuesProblems, setIssuesProblems] = useState(
    EditorState.createEmpty()
  );
  const [charityEditor, setCharityEditor] = useState(EditorState.createEmpty());
  const inputRefBanner = useRef();
  useEffect(() => {
    const fetchCountryApi = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}countries`);
        setCounryData(res.data.data.countries);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCountryApi();
  }, []);

  useEffect(() => {
    const fetchPurchagePlan = async () => {
      axios
        .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {})
        .then(function (response) {
          if (
            response.data.purchasePlan != null ||
            response.data.purchasePlan != undefined
          ) {
            dispatch(purchagedPlan(true));
            // dispatch(
            //   getPlanByDealerSelect(response?.data?.purchasePlan[0]?.category)
            // );
          } else {
            dispatch(purchagedPlan(false));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchPurchagePlan();
  }, []);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}state/${countryCode}`
        );
        setStateData(res.data.data.states);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStateData();
  }, [countryCode]);

  const handleDragOverBanner = (event) => {
    event.preventDefault();
  };

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

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const fetchTransaction = () => {
    setSubmitLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}paymentUpdate`, {
        planId: logingUser.planReducer.plan.planId,
        plantype: logingUser.planReducer.plan.listingType,
        amount: logingUser.planReducer.plan.price,
        // transactionId: token.card.id,
        // mode: token.type,
        purchase_qty: logingUser.planReducer.plan.playQuantity,
      })
      .then(function (response) {
        // console.log(response);
        informationSubmitHandler();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleShowPayment = (e) => {
    e.preventDefault();
    if (errorMakeAndModal || errorBasicFact || errorDetais) {
      return setShowError(false);
    }
    if (logingUser.planReducer.planSubscribe === true) {
      return informationSubmitHandler();
    }
    fetchTransaction();
  };
  const onToken = (token, addresses) => {
    // console.log(111, token, addresses);
    if (token !== null) {
      setShowPayment(false);
      fetchTransaction(token);
      // notify("Form submit successfully!");
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
    // console.log("image", JSON.stringify(data));
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
  const informationSubmitHandler = async () => {
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

    // if (errorMakeAndModal || errorBasicFact || errorDetais) {
    //   return setShowError(false);
    // }
    axios
      .post(`${url}vehicles`, {
        // planId: logingUser.planReducer.plan.planId,
        // plantype: logingUser.planReducer.plan.listingType,
        name: iname,
        email: uemail,
        premium: reduxValue.submitvechilesReducer.submitPlan,
        userId: userDataLogin.login.user.id,
        year: year,
        make: make,
        description: `${[...arr.map((curElem) => curElem.value)]}`,
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
        displayInAuction: `${
          logingUser.planReducer.garage ? displayInAuction : "Garage"
        }`,
        auctionType: `${
          logingUser.planReducer.garage ? auctionType : "Garage"
        }`,
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
        // UltiumDriveeWDsystem: ultiumdrive,
        link: link,
        accessories: accessories.toString(),
        truckDetails: detailsInfo.toString(),
        moreDescription: draftToHtml(
          convertToRaw(serviceRecord.getCurrentContent())
        ),
        reserve: `${reserve === "Yes" ? reserve : "No"}`,
        reservAmount: reserveAmount,
        hereFrom: draftToHtml(convertToRaw(issuesProblems.getCurrentContent())),
        charityDescription: draftToHtml(
          convertToRaw(charityEditor.getCurrentContent())
        ),
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
        issuesorproblems: draftToHtml(
          convertToRaw(vehicleHistory.getCurrentContent())
        ),
        status, // db me check karni h
        otherTruckTitle,
        otherStatus,
        truckHistory,
        rustDetails,
        modificationOnTruck: modificationOnTrck,
        fuel,
        EndTime: endDateAndTime,
        phone,
        sold: 1,
      })
      .then((result) => {
        setSubmitLoading(false);
        uploadFileOne(result.data.id);
        uploadFileTwo(result.data.id);
        uploadFileGallery(result.data.id);
        notify(result.data.message);
        // handleShowPayment();
        if (result.data.status === 200) {
          navigate("/");
          // setNamefield({
          //   name: "",
          //   email: "",
          //   year: "",
          //   make: "",
          //   model: "",
          //   vechilelocation: "",
          //   city: "",
          //   sale: "",
          //   link: "",
          //   vehiclepast: "",
          //   providelink: "",
          //   changedvechiles: "",
          //   dealer: "",
          //   dealership: "",
          //   soldvechiles: "",
          //   videolink: "",
          //   file: "",
          // });
          // setbasicfact({
          //   vin: "",
          //   displayInAuction: "",
          //   auctionType: "",
          //   adWebsiteLink: "",
          //   vechilesrace: "",
          //   ultiumdrive: "",
          //   Interstellar: "",
          //   interior: "",
          //   brandandmodel: "",
          //   sizetires: "",
          //   trucktitled: "",
          //   other: "",
          //   status: "",
          //   km: "",
          //   kmacc: "",
          //   odometer: "",
          //   accurateField: "",
          //   files: "",
          // });
          // setDetailstab({
          //   detailvin: "",
          //   bodywork: "",
          //   rustpresent: "",
          //   modificationstock: "",
          //   truckfromnew: "",
          //   servicesperformed: "",
          //   issuesorproblems: "",
          //   moreDescription: "",
          //   reserve: "",
          //   reserveAmount: "",
          //   shibnobiabout: "",
          //   rtmember: "",
          //   shibnobi: "",
          //   documentFee: "",
          //   accept: "",
          //   understand: "",
          // });
          // setInformation({
          //   uemail: "",
          //   username: "",
          //   password: "",
          //   iname: "",
          //   phone: "",
          // });
          // dispatch(step_one(false));
          // dispatch(step_two(false));
          // dispatch(step_three(false));
        }
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

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "url",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  function removeArrItem(index) {
    // create a new array with the item at the specified index removed
    const newItems = [...arr.slice(0, index), ...arr.slice(index + 1)];
    // setItems(newItems);
    // set the state with the new array
    setArr(newItems);
  }

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row"></div>
          {
            <div className="row">
              {logingUser.planReducer.garage && (
                <div className="col-12 text-center pb-4">
                  <h2>Sell your vehicle with Gas Guzzlrs Auctions!</h2>
                </div>
              )}
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
                        Submit
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
                              value={basicfact.vin}
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
                                value={namefield.year}
                                onChange={handleNameField}
                                name="year"
                                className="field  bgChangeDark"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                {years(new Date().getFullYear() - 50)
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
                                value={namefield.make}
                                onChange={handleNameField}
                                name="make"
                                placeholder="Enter make vehicle"
                                errorMessage="This input field contain 3-16 characters and shouldn't include any special character"
                                label="What make is your vehicle?"
                                pattern="^[A-Za-z0-9 ]{3,16}$"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <FormInput
                                value={namefield.model}
                                onChange={handleNameField}
                                name="model"
                                placeholder="Enter vehicle model"
                                errorMessage="This input field contain 1-35 characters and shouldn't include any special character"
                                label="What model is this vehicle?"
                                pattern="^[A-Za-z0-9 ]{1,35}$"
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
                                value={namefield.vechilelocation}
                                onChange={(e) => {
                                  handleNameField(e);
                                  setCountryCode(e.target.value);
                                }}
                                name="vechilelocation"
                                className="field bgChangeDark"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>

                                {counryData.map((curElem, i) => {
                                  return (
                                    <option value={curElem.id} key={i}>
                                      {curElem.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          {/* <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <FormInput
                                value={namefield.city}
                                onChange={handleNameField}
                                name="city"
                                placeholder="Enter city"
                                errorMessage="This input field contain 3-35 characters and shouldn't include any special character or number"
                                label="What city is the vehicle located in?"
                                pattern="^[A-Za-z ]{3,35}$"
                                required={true}
                              />
                            </div>
                          </div> */}
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What state is the vehicle currently located in?
                              </label>

                              <select
                                value={namefield.city}
                                onChange={handleNameField}
                                name="city"
                                placeholder="Enter city"
                                className="field"
                                // required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>
                                {stateData.map((curElem, i) => {
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
                              <label>
                                Has it been listed for sale anywhere else since
                                you have owned it?
                              </label>
                              <select
                                value={namefield.sale}
                                onChange={handleNameField}
                                name="sale"
                                className="field bgChangeDark"
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
                                value={namefield.vehiclepast}
                                onChange={handleNameField}
                                name="vehiclepast"
                                className="field bgChangeDark"
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
                          {namefield.sale === "Yes" ? (
                            // ||
                            // namefield.vehiclepast === "Yes"
                            // (
                            <>
                              <div className="col-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                  <FormInput
                                    value={namefield.providelink}
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
                              {/* <div className="col-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                  <label>
                                    What has changed on this vehicle since it
                                    was last listed on GasGuzzlrs?
                                  </label>
                                  <textarea
                                    value={namefield.changedvechiles}
                                    onChange={handleNameField}
                                    name="changedvechiles"
                                    className="field"
                                    maxLength={200}
                                    required
                                  ></textarea>
                                </div>
                              </div> */}
                            </>
                          ) : // )
                          null}

                          {namefield.vehiclepast === "Yes" ? (
                            <>
                              <div className="col-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                  <label>
                                    What has changed on this vehicle since it
                                    was last listed on GasGuzzlrs?
                                  </label>
                                  <textarea
                                    value={namefield.changedvechiles}
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
                                value={namefield.soldvechiles}
                                onChange={handleNameField}
                                name="soldvechiles"
                                className="field bgChangeDark"
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <label htmlFor="video-link">
                                Please provide any links to videos (Youtube or
                                Video) here:
                              </label>
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={addInput}
                                className="link"
                              >
                                Add more link
                              </a>
                            </div>
                            {arr.map((item, i) => {
                              return (
                                <div className="form-group">
                                  <div style={{ position: "relative" }}>
                                    <input
                                      onChange={handleChange}
                                      value={item.value}
                                      id={i}
                                      className="field"
                                      placeholder="Enter video link"
                                      type={item.type}
                                    />
                                    {i > 0 && (
                                      <div
                                        className=""
                                        style={{
                                          position: "absolute",
                                          top: "8px",
                                          right: "10px",
                                          textAlign: "center",
                                          alignItems: "center",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => removeArrItem(i)}
                                      >
                                        <CloseIcon style={{ fill: "#000" }} />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {/* <div className="form-group">
                              <FormInput
                                value={namefield.videolink}
                                onChange={handleNameField}
                                name="videolink"
                                type="url"
                                placeholder="Enter link"
                                errorMessage="Please provide valid link"
                                label="Please provide any links to videos (Youtube or
                              Video) here:"
                                required={true}
                              />
                            </div> */}
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
                          {logingUser.planReducer.garage && (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <label>
                                  How would you want to list your vehicle?
                                </label>
                                <select
                                  value={basicfact.displayInAuction}
                                  onChange={basicFactOnChange}
                                  name="displayInAuction"
                                  className="field bgChangeDark"
                                  required
                                >
                                  <option selected disabled value="">
                                    Select
                                  </option>
                                  {logingUser.planReducer.planSelectByDealer ===
                                  "classified" ? (
                                    <option value="classified">
                                      Classified Ads
                                    </option>
                                  ) : (
                                    <option value="Yes">Auction</option>
                                  )}
                                </select>
                              </div>
                            </div>
                          )}
                          {logingUser.planReducer.garage && (
                            <>
                              {logingUser.planReducer.planSelectByDealer ===
                              "classified" ? (
                                <div className="col-12 col-sm-12 col-md-6">
                                  <div className="form-group">
                                    <FormInput
                                      value={basicfact.adWebsiteLink}
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
                                      value={basicfact.auctionType}
                                      onChange={basicFactOnChange}
                                      name="auctionType"
                                      className="field bgChangeDark"
                                      required
                                    >
                                      <option selected disabled value="">
                                        Select
                                      </option>
                                      <option value="General listing">
                                        General listing
                                      </option>
                                      <option value="charity">
                                        Charity listing
                                      </option>
                                      <option value="Premium listing">
                                        Featured listing
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {logingUser.planReducer.garage && (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <FormInput
                                  value={endDateAndTime}
                                  type="datetime-local"
                                  onChange={(e) => {
                                    setEndDateAndTime(e.target.value);
                                  }}
                                  placeholder="Enter link"
                                  label="Please Enter Auction End Date"
                                />
                              </div>
                            </div>
                          )}
                          {basicfact.auctionType === "charity" && (
                            <div className="col-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <p>Please add name of charity.</p>
                                <div className="desCrtpion">
                                  <Editor
                                    editorState={charityEditor}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={(e) =>
                                      setCharityEditor(e)
                                    }
                                    placeholder="Please enter here"
                                  />
                                </div>
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
                                value={basicfact.vechilesrace}
                                onChange={basicFactOnChange}
                                name="vechilesrace"
                                className="field bgChangeDark"
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
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Does the vehicle have an Ultium Drive e4WD
                                system?
                              </label>
                              <select
                                value={basicfact.ultiumdrive}
                                onChange={basicFactOnChange}
                                name="ultiumdrive"
                                className="field bgChangeDark"
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
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is the vehicle finished in Interstellar White?
                              </label>
                              <select
                                value={basicfact.Interstellar}
                                onChange={basicFactOnChange}
                                name="Interstellar"
                                className="field bgChangeDark"
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
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                Is the interior upholstered in Jet Black and
                                Light Gray leather?
                              </label>
                              <select
                                value={basicfact.interior}
                                onChange={basicFactOnChange}
                                name="interior"
                                className="field bgChangeDark"
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
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                              <label>
                                What brand and model of tyre are currently
                                mounted?
                              </label>
                              <input
                                value={basicfact.brandandmodel}
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
                              value={basicfact.wheels}
                              onChange={basicFactOnChange}
                              name="wheels"
                              type="text"
                              minLength={2}
                              maxLength={31}
                              placeholder="Enter wheels"
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
                                value={basicfact.sizetires}
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
                                value={basicfact.km}
                                onChange={basicFactOnChange}
                                name="km"
                                className="field bgChangeDark"
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
                                  value={basicfact.otherTruckTitle}
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
                                value={basicfact.status}
                                name="status"
                                onChange={basicFactOnChange}
                                className="field bgChangeDark"
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
                                  value={basicfact.otherStatus}
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
                                value={basicfact.odometer}
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
                                value={basicfact.accurateField}
                                onChange={basicFactOnChange}
                                name="accurateField"
                                className="field bgChangeDark"
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
                                value={detailstab.bodywork}
                                onChange={detailsOnChange}
                                name="bodywork"
                                className="field bgChangeDark"
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
                                  value={detailstab.truckHistory}
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
                                value={detailstab.rustpresent}
                                onChange={detailsOnChange}
                                name="rustpresent"
                                className="field bgChangeDark"
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
                                  value={detailstab.rustDetails}
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
                              value={detailstab.fuel}
                              onChange={detailsOnChange}
                              placeholder="Enter fuel type"
                              errorMessage="Fuel type should be 2 to 60 character!"
                              label="Fuel Type"
                              pattern="^[A-Za-z(),.-;@! ]{2,60}$"
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
                                value={detailstab.modificationstock}
                                onChange={detailsOnChange}
                                name="modificationstock"
                                className="field bgChangeDark"
                                required
                              >
                                <option selected disabled value="">
                                  Select
                                </option>

                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            {detailstab.modificationstock === "Yes" && (
                              <div className="form-group">
                                <label>Enter modifications details</label>
                                <input
                                  value={detailstab.modificationOnTrck}
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
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>
                                What do you know about the history of the
                                vehicle from new?
                              </label>
                              <div className="desCrtpion">
                                <Editor
                                  editorState={vehicleHistory}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={(e) =>
                                    setVehicleHistory(e)
                                  }
                                  placeholder="Please enter vehicle history"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <p>
                                Please list and describe services performed and
                                when they were performed. <br />
                                *Dates and timelines provide valuable
                                information for interested buyers. Don't forget
                                to upload images of redacted service records for
                                recent and/or notable services.
                              </p>
                              <div className="desCrtpion">
                                <Editor
                                  editorState={serviceRecord}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={(e) =>
                                    setServiceRecord(e)
                                  }
                                  placeholder="Please enter here"
                                />
                              </div>
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
                              <div className="desCrtpion">
                                <Editor
                                  editorState={issuesProblems}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={(e) =>
                                    setIssuesProblems(e)
                                  }
                                  placeholder="Please enter here"
                                />
                              </div>
                            </div>
                          </div>

                          {logingUser.planReducer.garage && (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <label>Do you want a reserve?</label>
                                <select
                                  value={detailstab.reserve}
                                  onChange={detailsOnChange}
                                  name="reserve"
                                  className="field bgChangeDark"
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
                          )}
                          {detailstab.reserve === "Yes" && (
                            <div className="col-12 col-sm-12 col-md-6">
                              <div className="form-group">
                                <FormInput
                                  value={detailsInfo.reserveAmount}
                                  onChange={detailsOnChange}
                                  name="reserveAmount"
                                  placeholder="Enter reserve amount"
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
                                value={detailstab.shibnobi}
                                onChange={detailsOnChange}
                                name="shibnobi"
                                className="field bgChangeDark"
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
                                value={detailstab.documentFee}
                                onChange={detailsOnChange}
                                name="documentFee"
                                type="text"
                                placeholder="Enter document fee"
                                errorMessage="Amount should be 1-9 characters and shouldn't include any special character, space and alphabet!"
                                label="What is the amount of the document fee that you
                              will charge buyers above and beyond sale price and
                              tax? (This will be printed in the listing.)"
                                pattern="^[0-9,]{1,9}$"
                                required={true}
                              />
                            </div>
                          </div>
                          {logingUser.planReducer.garage && (
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
                                  difference. In this case the vehicle will
                                  appear as sold at the below-reserve price and
                                  GasGuzzlrs will pay me the difference between
                                  the high bid and the reserve once the
                                  transaction is complete.
                                </label>
                              </div>
                            </div>
                          )}
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
                      <h3>Submit Details</h3>
                      <hr />

                      <form className="pt-3" onSubmit={handleShowPayment}>
                        {/* <div className="row">
                          <div className="col-12">
                            <h5>Complete Your Contact Info</h5>
                            <h6>Subscribe to our newsletter:</h6>
                          </div>
                        </div> */}
                        <div className="row row_gap_5">
                          {/* <div className="col-12 col-sm-12 col-md-6">
                            <FormInput
                              value={information.uemail}
                              onChange={informationOnChange}
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
                              value={information.iname}
                              onChange={informationOnChange}
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
                              onChange={informationOnChange}
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
                          </div> */}

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
                              <button
                                type="submit"
                                className="gry_btn"
                                required
                              >
                                Finish
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
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
            <h2> Name : {logingUser.login.user.name} </h2>
            <h3 className="price__">
              {" "}
              Type : {logingUser.planReducer.plan.name}
            </h3>
            <h3 className="price__">
              Price : ${logingUser.planReducer.plan.price}
            </h3>
            <p> Description : {logingUser.planReducer.plan.desc}</p>

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
                  name="GasGuzzlrs Subscribe"
                  email={logingUser.login.user.email}
                  currency="USD"
                  amount={logingUser.planReducer.plan.price * 100}
                  stripeKey={process.env.REACT_APP_STRIP_PUBLIC_KEY}
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

export default VechilesRegistraion;
