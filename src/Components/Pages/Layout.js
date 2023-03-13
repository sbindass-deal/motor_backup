import React from "react";
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
import ClassifiedAddList from "./showroom/ClassifiedAddList";
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
              <Route path="detailNew" element={<DetailNew />} />
              <Route path="listing" element={<MyListings />} />
              <Route path="bidswins" element={<MyBidsWins />} />
              <Route path="myshipments" element={<MyShipments />} />
              <Route path="orders-cart" element={<OrderCart />} />
              <Route path="orders-cart/:id" element={<OrderCartDetails />} />
              <Route path="place-order" element={<CheckoutDetails />} />
              <Route path="vehicle/:id" element={<VehicleRegistered />} />
              <Route path="user-blog" element={<UserBlog />} />
              <Route path="add-user-blog" element={<AdUserBlog />} />
              <Route path="edit-user-blog/:id" element={<EditUserBlog />} />

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
                  <Route
                    path="gear-product/:id"
                    element={<EditGearProduct />}
                  />
                  <Route path="editBlog/:id" element={<EditBlog />} />

                  <Route path="add/gear-product" element={<AddGearProduct />} />
                  <Route path="Orders" element={<Orders />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="admin/add-blog" element={<AddBlog />} />
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
                  <Route path="admin-meeting" element={<CreateMeeting />} />
                </>
              )}
            </>
          )}
          {/* Admin login end */}
          {/* After user login end */}
          <Route path="cart" element={<Cart />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="biding" element={<MyBidsWins />} />
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
          <Route path="dealerProfile/:id" element={<DealerProfile />} />
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
          <Route path="editmyaccount" element={<EditMyAccount />} />
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
          <Route path="eventdetail" element={<EventDetailPage/>} />
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
