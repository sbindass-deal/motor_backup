import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Home from "./Home";
import MyListings from "./MyAccount/MyListings";
import AccountInfo from "./MyAccount/AccountInfo";
import Notifications from "./MyAccount/Notifications";
import MyBidsWins from "./MyAccount/MyBidsWins";
import HowShibnobiMotorWorks from "./HowShibnobiMotorWorks";
import PhotoGallery from "./PhotoGallery";
import SubmitaVehicle from "./SubmitaVehicle";
import MyShipments from "./MyAccount/MyShipments";
import MakeAnModel from "./MakeAnModel";
import Store from "./Store";
import Features from "./Features";
import Detail from "./Detail";
import TermsOfUse from "./TermsOfUse";
import PrivacyNotice from "./PrivacyNotice";
import AboutShibanobi from "./AboutShibanobi";
import Shipping from "./Shipping";
import CookiesSetting from "./CookiesSetting";
import SellYourVehicle from "./SellYourVehicle";
import AuctionResults from "./AuctionResults";
import CarLotry from "./CarLotry";
import PrivacyPolicy from "./PrivacyNotice";
import CarRaffle from "./CarLotry";
import EditMyAccount from "./EditMyAccount";
import VechilesRegistraion from "./VechilesRegistraion";
import Auctionlive from "./Auctionlive";
import AuctionPremium from "./AuctionPremium";
import GetAlerts from "./GetAlerts";
import Charity from "./Charity";
import { ToastContainer } from "react-toastify";
import NewVechileRegister from "../newVechile/NewVechileRegister";

function Layout() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="listing" element={<MyListings />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="biding" element={<MyBidsWins />} />
          <Route path="works" element={<HowShibnobiMotorWorks />} />
          <Route path="account" element={<AccountInfo />} />
          <Route path="gallary" element={<PhotoGallery />} />
          <Route path="submit" element={<SubmitaVehicle />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="makeamodel" element={<MakeAnModel />} />
          <Route path="aboutshibnobi" element={<AboutShibanobi />} />
          <Route path="termsandconditions" element={<TermsOfUse />} />
          <Route path="feautres" element={<Features />} />
          <Route path="showroom" element={<PhotoGallery />} />
          <Route path="amlpolicy" element={<CookiesSetting />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="accountinfo" element={<AccountInfo />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="bidswins" element={<MyBidsWins />} />
          <Route path="myshipments" element={<MyShipments />} />
          <Route path="carraffle" element={<CarRaffle />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="auctionresults" element={<AuctionResults />} />
          <Route path="auctionlive" element={<Auctionlive />} />
          <Route path="auctionpremium" element={<AuctionPremium />} />
          <Route path="editmyaccount" element={<EditMyAccount />} />
          <Route path="vechiles" element={<VechilesRegistraion />} />
          {/* <Route path="vechiles" element={<NewVechileRegister />} /> */}
          <Route path="getalerts" element={<GetAlerts />} />
          <Route path="charity" element={<Charity />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      {/* <AccountInfo/> */}
      {/* <Notifications/> */}
      {/* <MyListings/> */}
      {/* <MyBidsWins/> */}
      {/* <HowShibnobiMotorWorks/> */}
      {/* <PhotoGallery/> */}
      {/* <Home/> */}
      {/* <SubmitaVehicle/> */}
      {/* <MyShipments/> */}
      {/* <MakeAnModel/> */}
      {/* <Store/> */}
      {/* <Features/> */}
      {/* <Detail/> */}
      {/* <TermsOfUse/> */}
      {/* <PrivacyNotice/> */}
      {/* <AboutShibanobi/> */}
      {/* <Shipping/> */}
      {/* <CookiesSetting/> */}
      {/* <SellYourVehicle/> */}
      {/* <AuctionResults/> */}
      {/* <CarLotry/> */}
      <Footer />
    </>

    // <div>
    //     <Header/>
    //     <Home/>
    //     <Footer/>
    // </div>
  );
}

export default Layout;
