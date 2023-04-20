import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Home from "./Home";
import MyListings from "./MyAccount/MyListings";
import AccountInfo from "./MyAccount/AccountInfo";
import Notifications from "./MyAccount/Notifications";
import HowShibnobiMotorWorks from "./HowShibnobiMotorWorks";
import PhotoGallery from "./PhotoGallery";
import PrivateParty from "./plan/PrivateParty";
import MyShipments from "./MyAccount/MyShipments";
import Features from "./auction/Features";
import Detail from "./auction/auctionDetails/Detail";
import TermsOfUse from "./TermsOfUse";
import AboutShibanobi from "./AboutShibanobi";
import Shipping from "./Shipping";
import CookiesSetting from "./CookiesSetting";
import AuctionResults from "./AuctionResults";
import PrivacyPolicy from "./PrivacyNotice";
import CarRaffle from "./CarLottery";
import VechilesRegistraion from "./VechilesRegistraion";
import Auctionlive from "./auction/Auctionlive";
import AuctionPremium from "./AuctionPremium";
import GetAlerts from "./GetAlerts";
import Charity from "./auction/Charity";
import { ToastContainer } from "react-toastify";
import StoreDetails from "./StoreDetails";
import Faq from "./Faq";
import Shop from "./shopingStore/Shop";
import NotFoundPage from "./NotFoundPage";
import Paymentsuccess from "./Paymentsuccess";
import ReffarallinkFile from "./ReffarallinkFile";
import ShopDetails from "./shopingStore/ShopDetails";
import Blog from "./Dashboard/Blog";
import VehicleSubmission from "./Dashboard/VehicleSubmission";
import VehicleListing from "./Dashboard/VehicleListing";
import VehicleListingDetails from "./Dashboard/VehicleListingDetails";
import AddListing from "./Dashboard/AddListing";
import GearProduct from "./Dashboard/GearProducts";
import Cart from "./shopingStore/Cart";
import RaffleAdmin from "./Dashboard/RaffleAdmin";
import Orders from "./Dashboard/Orders";
import OrderCart from "./shopingStore/OrderCart";
import OrderCartDetails from "./shopingStore/OrderCartDetails";
import { useSelector } from "react-redux";
import ScrollTop from "../UI/ScrollTop";
import UserVehicleDetails from "./Dashboard/UserVehicleDetails";
import AddBlog from "./Dashboard/AddBlog";
import OrderDetail from "./Dashboard/OrderDetails";
import AddRaffle from "./Dashboard/AddRaffle";
import EditRaffle from "./Dashboard/EditRaffle";
import Enquiry from "./Dashboard/Enquiry";
import CheckoutDetails from "./shopingStore/CheckoutDetails";
import AddGearProduct from "./Dashboard/AddGearProduct";
import BlogDetail from "./BlogDetail";
import EditMyAccount from "./MyAccount/EditMyAccount";
import DealerProfile from "./showroom/DealerProfile";
import ClassifiedAddList from "./auction/ClassifiedAddList";
import SearchResult from "../UI/SearchResult";
import ComingSoon from "./ComingSoon";
import Blogs from "./Blogs";
import VehicleRegistered from "./MyAccount/VehicleRegistered";
import EditGearProduct from "./Dashboard/EditGearProduct";
import VehicleAdsList from "./Dashboard/featureDealer/VehicleAdsList";
import DealerListFeature from "./Dashboard/featureDealer/DealerListFeature";
import AddDealer from "./Dashboard/featureDealer/AddDealer";
import AddVehicleAds from "./Dashboard/featureDealer/AddVehicleAds";
import DetailNew from "./DetailNew";
import Event from "./event/Event";
import Auctionfeature from "./auction/Auctionfeature";
import AuctionNoReserve from "./auction/AuctionNoReserve";
import AuctionResult from "./auction/AuctionResult";
import EditBlog from "./Dashboard/EditBlog";
import DealerPlan from "./plan/DealerPlan";
import AuctionPlan from "./plan/AuctionPlan";
import ClassifiedPlan from "./plan/ClassifiedPlan";
import AdUserBlog from "./MyAccount/AdUserBlog";
import EditUserBlog from "./MyAccount/EditUserBlog";
import UserBlog from "./MyAccount/UserBlog";
import EventDetailPage from "./event/EventDetailPage";
import CreateMeeting from "./Dashboard/CreateMeeting";
import Store from "./showroom/Store";
import AddCreateMeeting from "./Dashboard/AddCreateMeeting";
import EditCreateMeeting from "./Dashboard/EditCreateMeeting";
import UserCreateMeeting from "./MyAccount/UserCreateMeeting";
import AdUserMeeting from "./MyAccount/AdUserMeeting";
import EditUserMeeting from "./MyAccount/EditUserMeeting";
import EventAdUserMeeting from "./MyAccount/EventAdUserMeeting";
import Subscription from "./MyAccount/Subscription";
import GearInventry from "./Dashboard/GearInventry.js";
import Wins from "./MyAccount/Wins";
import Bids from "./MyAccount/Bids";
import Transaction from "./MyAccount/Transaction";
import Garages from "./garages/Garages";
import GaragesListDetails from "./garages/GaragesListDetails";
import GaragesUserDetails from "./garages/GaragesUserDetails";
import UserGarage from "./MyAccount/garage/UserGarage";
import EditGarage from "./MyAccount/garage/EditGarage";
import AddGarage from "./MyAccount/garage/AddGarage";
import AddFaq from "./Dashboard/AddFaq";
import FaqAdmin from "./Dashboard/FaqAdmin";
import GaragesPost from "./garages/GaragesPost";
import GaragesBlogNew from "./garages/GaragesBlogNew";
import GaragesReplies from "./garages/GaragesReplies";
import GaragesSocialMedia from "./garages/GaragesSocialMedia";
import GiveawayOfficialRules from "./GiveawayOfficialRules";
import PrivacyPolicyAdmin from "./Dashboard/PrivacyPolicyAdmin";
import AddPrivacy from "./Dashboard/AddPrivacy";
import Editprivacy from "./Dashboard/Editprivacy";
import TermAndCondition from "./Dashboard/TermAndCondition";
import AmlPolicy from "./Dashboard/AmlPolicy";
import EditTermAndCondition from "./Dashboard/EditTermAndCondition";
import EditAmlPolicy from "./Dashboard/EditAmlPolicy";
import PrivacyPolicyFooter from "./Dashboard/PrivacyPolicyFooter";
import EditPrivactPolicyFooter from "./Dashboard/EditPrivactPolicyFooter";
import SocialMedia from "./garages/SocialMedia";
import Settings from "./MyAccount/Settings";

import AnalyticsTab from "./auction/AnalyticsTab";

const Layout = () => {
  const logingUser = useSelector((state) => state);
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Header />
        <Routes>
          <Route index element={<Home />} />
          {/* After user Login start */}
          {logingUser.login.token && (
            <>
              <Route path="accountinfo" element={<AccountInfo />} />
              <Route path="user-garage" element={<UserGarage />} />
              <Route path="add-garage" element={<AddGarage />} />
              <Route path="detailNew" element={<DetailNew />} />
              <Route path="listing" element={<MyListings />} />
              <Route path="bids" element={<Bids />} />
              <Route path="wins" element={<Wins />} />
              <Route path="myshipments" element={<MyShipments />} />
              <Route path="orders-cart" element={<OrderCart />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="transaction" element={<Transaction />} />
              <Route path="orders-cart/:id" element={<OrderCartDetails />} />
              <Route path="place-order" element={<CheckoutDetails />} />
              <Route path="vehicle/:id" element={<VehicleRegistered />} />
              <Route path="user-blog" element={<UserBlog />} />
              <Route path="add-user-blog" element={<AdUserBlog />} />
              <Route path="add-user-meeting" element={<AdUserMeeting />} />
              <Route
                path="add-user-meeting-event"
                element={<EventAdUserMeeting />}
              />
              <Route path="edit-user-blog/:id" element={<EditUserBlog />} />
              <Route path="user-meeting" element={<UserCreateMeeting />} />

              <Route
                path="vehicle-submission/:id"
                element={<UserVehicleDetails />}
              />
              {logingUser.login.admin && (
                <>
                  <Route
                    path="vehicle-submission"
                    element={<VehicleSubmission />}
                  />
                  <Route path="admin" element={<VehicleSubmission />} />
                  <Route
                    path="admin-privacy-policy"
                    element={<PrivacyPolicyAdmin />}
                  />
                  <Route
                    path="admin-termcondition"
                    element={<TermAndCondition />}
                  />
                  <Route path="admin-aml-policy" element={<AmlPolicy />} />
                  <Route path="admin-privacy" element={<PrivacyPolicyFooter />} />

                  <Route
                    path="admin/vehicle-listing"
                    element={<VehicleListing />}
                  />
                  <Route
                    path="admin/vehicle-listing-details/:id"
                    element={<VehicleListingDetails />}
                  />
                  <Route
                    path="admin/addVehicle-listing"
                    element={<AddListing />}
                  />
                  <Route path="raffleadmin" element={<RaffleAdmin />} />
                  <Route
                    path="raffleadmin/add-raffel"
                    element={<AddRaffle />}
                  />
                  <Route
                    path="raffleadmin/edit-raffel/:id"
                    element={<EditRaffle />}
                  />
                  <Route path="gear-product" element={<GearProduct />} />
                  <Route path="gear-inventry" element={<GearInventry />} />
                  <Route
                    path="gear-product/:id"
                    element={<EditGearProduct />}
                  />
                  <Route path="editBlog/:id" element={<EditBlog />} />
                  <Route path="admin/editBlog/:id" element={<Editprivacy/>} />
                  <Route path="admin/edit-term/:id" element={<EditTermAndCondition/>} />
                  <Route path="admin/edit-aml/:id" element={<EditAmlPolicy/>} />
                  <Route path="admin/edit-privacy-footer/:id" element={<EditPrivactPolicyFooter/>} />
                  <Route path="admin/editBlog/:id" element={<Editprivacy />} />
                  <Route
                    path="admin/edit-term/:id"
                    element={<EditTermAndCondition />}
                  />
                  <Route
                    path="admin/edit-aml/:id"
                    element={<EditAmlPolicy />}
                  />
                  <Route path="add/gear-product" element={<AddGearProduct />} />
                  <Route path="Orders" element={<Orders />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="admin/add-blog" element={<AddBlog />} />
                  <Route path="admin/addprivacy" element={<AddPrivacy />} />
                  <Route path="orders-details/:id" element={<OrderDetail />} />
                  <Route path="admin-dealer" element={<DealerListFeature />} />
                  <Route path="admin-vehicle-ad" element={<VehicleAdsList />} />
                  <Route
                    path="admin-dealer/add-dealer"
                    element={<AddDealer />}
                  />
                  <Route
                    path="admin-vehicle-ad/add-vehicle-ads"
                    element={<AddVehicleAds />}
                  />
                  <Route
                    path="admin-add-meeting/add-meeting"
                    element={<AddCreateMeeting />}
                  />
                  <Route
                    path="edit-meeting/:id"
                    element={<EditCreateMeeting />}
                  />

                  <Route path="admin-enquiry" element={<Enquiry />} />
                  <Route path="admin-faq" element={<FaqAdmin />} />
                  <Route path="admin-faq/add" element={<AddFaq />} />
                  <Route path="admin-faq/add/:id" element={<AddFaq />} />
                  <Route path="admin-meeting" element={<CreateMeeting />} />
                </>
              )}
            </>
          )}
          {/* Admin login end */}
          {/* After user login end */}
          <Route path="cart" element={<Cart />} />
          <Route path="notification" element={<Notifications />} />
          {/* <Route path="biding" element={<Bids />} /> */}
          <Route path="works" element={<HowShibnobiMotorWorks />} />
          <Route path="gallary" element={<PhotoGallery />} />
          <Route path="submit" element={<PrivateParty />} />
          <Route path="dealer" element={<DealerPlan />} />
          <Route path="auctions_dealer" element={<AuctionPlan />} />
          <Route path="classified" element={<ClassifiedPlan />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="successpayment" element={<Paymentsuccess />} />
          <Route
            path="carraffle/refferallink/:id"
            element={<ReffarallinkFile />}
          />
          <Route path="about" element={<AboutShibanobi />} />
          <Route path="termsandconditions" element={<TermsOfUse />} />
          <Route path="feautres" element={<Features />} />
          <Route path="showroom" element={<Store />} />
          <Route path="social-media" element={<SocialMedia />} />
          <Route path="garages" element={<Garages />} />
          <Route path="garages/:id" element={<GaragesListDetails />} />
          <Route
            path="garages-user-details/:id"
            element={<GaragesUserDetails />}
          />
          <Route path="dealerProfile/:id" element={<DealerProfile />} />
          <Route path="analyticstab" element={<AnalyticsTab />} />

          
          <Route path="/settings" element={<Settings />} />
          <Route path="classifiedaddlist" element={<ClassifiedAddList />} />
          <Route path="showroom/:id" element={<StoreDetails />} />
          <Route path="amlpolicy" element={<CookiesSetting />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="carraffle" element={<CarRaffle />} />
          <Route path="carraffle/:coupon" element={<CarRaffle />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="auctionresults" element={<AuctionResults />} />
          <Route path="auctionlive" element={<Auctionlive />} />
          <Route path="auctionresult" element={<AuctionResult />} />
          <Route path="auctionfeature" element={<Auctionfeature />} />
          <Route path="auctionnoreserve" element={<AuctionNoReserve />} />
          <Route path="auctionpremium" element={<AuctionPremium />} />

          <Route
            path="giveaway-official-rules"
            element={<GiveawayOfficialRules />}
          />
          <Route path="garagespost" element={<GaragesPost />} />
          <Route path="garagesblognew" element={<GaragesBlogNew />} />
          <Route path="garagesreplies" element={<GaragesReplies />} />
          <Route path="garagessocialmedia" element={<GaragesSocialMedia />} />

          <Route path="editmyaccount" element={<EditMyAccount />} />
          <Route path="editmyaccount-garages" element={<EditGarage />} />
          <Route path="edit-user-meeting/:id" element={<EditUserMeeting />} />
          <Route path="vechiles" element={<VechilesRegistraion />} />
          <Route path="getalerts" element={<GetAlerts />} />
          <Route path="faq" element={<Faq />} />
          <Route path="charity" element={<Charity />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ShopDetails />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogdetail/:id" element={<BlogDetail />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="comingsoon" element={<ComingSoon />} />
          <Route path="event" element={<Event />} />
          <Route path="eventdetail/:id" element={<EventDetailPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Layout;
