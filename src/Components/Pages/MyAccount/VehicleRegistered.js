import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  step_one,
  step_three,
  step_two,
} from "../../../redux/reducers/submitvechilesReducer";
import counryData from "../../countryList";
import FormInput from "../../UI/FormInput";

const VehicleRegistered = () => {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;
  const [file, setFile] = useState([]);
  const [file1, setFile1] = useState([]);
  const [signinAggri, setSigninAggri] = useState();
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [understandCondition, setUnderstandCondition] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const userDataLogin = useSelector((state) => state);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMakeAndModal, setErrorMakeAndModal] = useState(true);
  const [errorBasicFact, setErrorBasicFact] = useState(true);
  const [errorDetais, setErrorDetais] = useState(true);
  const [showError, setShowError] = useState(true);
  const [uploadmultipleImage, setuploadMulipleImage] = useState([]);

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
        const url = process.env.REACT_APP_URL + "updateVehicleImage";
        const formData = new FormData();
        formData.append("image", file1);
        formData.append("id", vehicleId);
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

  // console.log(years(new Date().getFullYear() - 15).reverse());

  const uploadFileTwo = async (vehicleId) => {
    (async () => {
      for await (const file11 of file1) {
        const url = process.env.REACT_APP_URL + "updateVehicleImage";
        const formData = new FormData();
        formData.append("image", file11);
        formData.append("id", vehicleId);
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
    setInformation({ ...information, [Name]: Value });
  };
  useEffect(() => {
    const filteredVehicleData = vehicleDatas.find((item) => item.id == id);
    console.log(11111, filteredVehicleData);
    setNamefield({
      name: filteredVehicleData.name,
      email: filteredVehicleData.email,
      year: filteredVehicleData.year,
      make: filteredVehicleData.make,
      model: filteredVehicleData.model,
      vechilelocation: filteredVehicleData.country,
      city: filteredVehicleData.city,
      sale: filteredVehicleData.owned,
      link: filteredVehicleData.link,
      vehiclepast: filteredVehicleData.engineSize,
      providelink: filteredVehicleData.transmission,
      changedvechiles: filteredVehicleData.titleStatus,
      dealer: filteredVehicleData.dealerId,
      dealership: filteredVehicleData.dealerName,
      soldvechiles: filteredVehicleData.consignment,
      videolink: filteredVehicleData.description,
    });
    setbasicfact({
      vin: filteredVehicleData.detailvin,
      displayInAuction: filteredVehicleData.displayInAuction,
      auctionType: filteredVehicleData.auctionType,
      adWebsiteLink: filteredVehicleData.externalLink,
      vechilesrace: filteredVehicleData.ownerDetail,
      ultiumdrive: filteredVehicleData.ste,
      Interstellar: filteredVehicleData.Interstellar,
      interior: filteredVehicleData.interior,
      brandandmodel: filteredVehicleData.brandandmodel,
      sizetires: filteredVehicleData.sizetires,
      trucktitled: filteredVehicleData.title,
      other: filteredVehicleData.other,
      status: filteredVehicleData.status,
      km: filteredVehicleData.km,
      wheels: filteredVehicleData.pickOne,
      kmacc: filteredVehicleData.ogEngine,
      odometer: filteredVehicleData.odmeter,
      accurateField: filteredVehicleData.kmacc,
      otherTruckTitle: filteredVehicleData.otherTruckTitle,
      otherStatus: filteredVehicleData.otherStatus,
    });
    setDetailstab({
      detailvin: filteredVehicleData.detailvin,
      bodywork: filteredVehicleData.bodywork,
      rustpresent: filteredVehicleData.rustpresent,
      modificationstock: filteredVehicleData.modificationstock,
      servicesperformed: filteredVehicleData.ammountOnDocument,
      issuesorproblems: filteredVehicleData.issuesorproblems,
      moreDescription: filteredVehicleData.moreDescription,
      reserve: filteredVehicleData.reserve,
      reserveAmount: filteredVehicleData.reservAmount,
      shibnobiabout: filteredVehicleData.hereFrom,
      shibnobi: filteredVehicleData.shibnobi,
      documentFee: filteredVehicleData.documentFee,
      truckHistory: filteredVehicleData.truckHistory,
      rustDetails: filteredVehicleData.rustDetails,
      modificationOnTrck: filteredVehicleData.modificationOnTruck,
      fuel: filteredVehicleData.fuel,
    });
    setInformation({
      uemail: filteredVehicleData.email,
      iname: filteredVehicleData.name,
      phone: filteredVehicleData.phone,
    });
  }, [id]);

  const informationSubmitHandler = async (e) => {
    e.preventDefault();

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
      .post(`${url}updateVehicles/${id}`, {
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
        // shibnobi we have to add on db
        otherTruckTitle,
        otherStatus,
        truckHistory,
        rustDetails,
        modificationOnTruck: modificationOnTrck,
        fuel,
        EndTime: EndDateTime.toString(),
        phone,
        approved: `${displayInAuction === "No" ? null : "11"}`,
        sold: 1,
      })
      .then((result) => {
        setSubmitLoading(false);
        if (file.length > 0) {
          uploadFileOne(result.data.id);
        }
        if (file1.length > 0) {
          uploadFileTwo(result.data.id);
        }

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

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb-4">
              <h2>Sell your vehicle with Gas Guzzlrs Auctions!</h2>
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
                      Edit your profile
                    </a>
                    {!showError && errorMakeAndModal ? (
                      <span className="text-danger">
                        Pleae file input fields proper
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
                      Think your vehicle should be sold via Gas Guzzlrs
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
                        <div className="col-12 col-sm-12 col-md-6">
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
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>What year is your vehicle?</label>
                            <select
                              value={namefield.year}
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
                              value={namefield.make}
                              onChange={handleNameField}
                              name="make"
                              placeholder="Enter"
                              errorMessage="This input field contain 3-16 characters and shouldn't include any special character"
                              label="what is your vehicle?"
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
                              placeholder="Enter"
                              errorMessage="This input field contain 3-16 characters and shouldn't include any special character"
                              label="What model is this vehicle?"
                              pattern="^[A-Za-z0-9 ]{3,16}$"
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              What country is the vehicle currently located in?
                            </label>

                            <select
                              value={namefield.vechilelocation}
                              onChange={handleNameField}
                              name="vechilelocation"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Select
                              </option>

                              {counryData.map((curElem, i) => {
                                return <option key={i}>{curElem.name}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <FormInput
                              value={namefield.city}
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
                              value={namefield.sale}
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
                              Has this vehicle been listed on Gas Guzzlrs in the
                              past?
                            </label>
                            <select
                              value={namefield.vehiclepast}
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
                            <div className="col-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <label>
                                  What has changed on this vehicle since it was
                                  last listed on Gas Guzzlrs?
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
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label style={{ textTransform: "uppercase" }}>
                              Are You A Dealer?
                            </label>
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
                        )}
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Is the vehicle being sold on consignment?
                            </label>
                            <select
                              value={namefield.soldvechiles}
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
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <p>
                              Please upload photos of your vehicle using the box
                              below — pick ones that offer a good sense of the
                              vehicle. The more, and the higher the quality, the
                              better.{" "}
                              <a href="#" className="link">
                                Click here to review our photo guide.
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="">
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
                                        objectFit: "cover",
                                        padding: "15px",
                                      }}
                                    />
                                  </span>
                                );
                              })}
                              <input
                                style={{
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                                onChange={(e) => {
                                  // handleNameField(e);
                                  setFile(e.target.files);
                                }}
                                name="file"
                                type="file"
                                accept="image/png, image/jpeg"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="small">
                            Accepted file types: jpg, jpeg, png, Max. file size:
                            10 MB, Max. files: 200.
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
                      We love {namefield.make} {namefield.model}s!{" "}
                    </p>
                    <p>
                      Please provide some basic info to help us gather a better
                      sense of your vehicle. The more information you can
                      provide up front, the quicker we will be able to write the
                      auction listing.
                    </p>

                    <form onSubmit={basicFactSubmitHandler} className="pt-3">
                      <div className="row row_gap_5">
                        <div className="col-12 col-sm-12 col-md-6">
                          <FormInput
                            value={basicfact.vin}
                            onChange={basicFactOnChange}
                            name="vin"
                            label="What is the VIN"
                            placeholder="Enter VIN"
                            errorMessage="VIN should be 17 characters and shouldn't include any special character!"
                            pattern="^[A-Za-z0-9]{17}$"
                            required={true}
                          />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                          <div className="form-group">
                            <label>
                              How would you want to list your vehicle?
                            </label>
                            <select
                              value={basicfact.displayInAuction}
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
                          <div className="col-12 col-sm-12 col-md-12">
                            <div className="form-group">
                              <label>Auction type</label>
                              <select
                                value={basicfact.auctionType}
                                onChange={basicFactOnChange}
                                name="auctionType"
                                className="field"
                                required
                              >
                                <option selected disabled value="">
                                  Auction type...
                                </option>
                                <option value="General listing">
                                  General listing
                                </option>
                                <option value="For charity">For charity</option>
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
                              value={basicfact.vechilesrace}
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
                              Does the vehicle have an Ultium Drive e4WD system?
                            </label>
                            <select
                              value={basicfact.ultiumdrive}
                              onChange={basicFactOnChange}
                              name="ultiumdrive"
                              className="field"
                              required={true}
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
                              value={basicfact.Interstellar}
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
                              Is the interior upholstered in Jet Black and Light
                              Gray leather?
                            </label>
                            <select
                              value={basicfact.interior}
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
                            <label>What is the current odometer reading?</label>
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
                              Please upload a photo of your title (or a photo of
                              your registration if the vehicle has a lien). This
                              will not be displayed publicly, but will instead
                              be used to verify ownership status.
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="drag-area">
                              {Array.from(file1).map((items, i) => {
                                return (
                                  <span key={i}>
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

                              <input
                                style={{
                                  border: "#EF6031",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                                onChange={(e) => {
                                  basicFactOnChange(e);
                                  setFile1(e.target.files);
                                }}
                                name="files"
                                type="file"
                                multiple
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="small">
                            Accepted file types: jpg, jpeg, png, Max. file size:
                            1 GB.
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
                          <div className="form-group">
                            <label>Fuel Type</label>
                            <select
                              name="fuel"
                              value={detailstab.fuel}
                              onChange={detailsOnChange}
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Select
                              </option>
                              <option value="Electric">Electric</option>
                              <option value="CNG">CNG</option>
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                            </select>
                          </div>
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
                              What do you know about the history of the vehicle
                              from new?
                            </label>
                            <textarea
                              value={detailstab.issuesorproblems}
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
                            Please list and describe services performed and when
                            they were performed. <br />
                            *Dates and timelines provide valuable information
                            for interested buyers. Don't forget to upload images
                            of redacted service records for recent and/or
                            notable services.
                          </p>
                          <div className="form-group">
                            <textarea
                              value={detailstab.moreDescription}
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
                              What accessories are included in the sale? <br />
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
                              What issues or problems does it currently have? Is
                              there anything that currently doesn't work or
                              doesn't operate correctly? Be thorough - you don't
                              want commenters to do this for you.
                              <br />
                              (e.g. engine problems, non-functional items,
                              dents, interior flaws, etc.)
                            </label>
                            <textarea
                              value={detailstab.shibnobiabout}
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
                              value={detailstab.reserve}
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
                                value={detailstab.reserveAmount}
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
                            <label>Where did you hear about Gas Guzzlrs?</label>
                            <select
                              value={detailstab.shibnobi}
                              onChange={detailsOnChange}
                              name="shibnobi"
                              className="field"
                              required
                            >
                              <option selected disabled value="">
                                Select
                              </option>
                              <option value="referred">
                                Referred by a Gas Guzzlrs member
                              </option>
                              <option value="facebook">Facebook</option>
                              <option value="google">Google</option>
                              <option value="instagram">Instagram</option>
                              <option value="longtime">
                                I'm a long time Gas Guzzlrs Reader
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
                              placeholder="USD $"
                              errorMessage="Amount should be 1-9 characters and shouldn't include any special character and alphabet!"
                              label="What is the amount of the document fee that you
                              will charge buyers above and beyond sale price and
                              tax? (This will be printed in the listing.)"
                              pattern="^[0-9]{1,9}$"
                              required={true}
                            />
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
                    <h3>Contact Info</h3>
                    <hr />

                    <form className="pt-3" onSubmit={informationSubmitHandler}>
                      <div className="row">
                        <div className="col-12">
                          <h5>Complete Your Contact Info</h5>
                          <h6>Subscribe to our newsletter:</h6>
                        </div>
                      </div>
                      <div className="row row_gap_5">
                        <div className="col-12 col-sm-12 col-md-6">
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
                            errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
                            label="Name"
                            pattern="^[A-Za-z ]{3,16}$"
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
                                value="aggri"
                                onChange={signInChange}
                                className="form-check-input"
                                type="checkbox"
                              />
                              Sign me up for the Gas Guzzlrs Daily Mail
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
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehicleRegistered;
