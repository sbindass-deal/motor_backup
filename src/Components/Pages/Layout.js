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
import SubmitaVehicle from "./SubmitaVehicle";
import MyShipments from "./MyAccount/MyShipments";
import Store from "./Store";
import Features from "./Features";
import Detail from "./Detail";
import TermsOfUse from "./TermsOfUse";
import AboutShibanobi from "./AboutShibanobi";
import Shipping from "./Shipping";
import CookiesSetting from "./CookiesSetting";
import AuctionResults from "./AuctionResults";
import PrivacyPolicy from "./PrivacyNotice";
import CarRaffle from "./CarLottery";
import VechilesRegistraion from "./VechilesRegistraion";
import Auctionlive from "./Auctionlive";
import AuctionPremium from "./AuctionPremium";
import GetAlerts from "./GetAlerts";
import Charity from "./Charity";
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
import DealerProfile from "./dealer/DealerProfile";
import ClassifiedAddList from "./dealer/ClassifiedAddList";
import SearchResult from "../UI/SearchResult";
import ComingSoon from "./ComingSoon";
import Blogs from "./Blogs";
import VehicleRegistered from "./MyAccount/VehicleRegistered";
import EditGearProduct from "./Dashboard/EditGearProduct";

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
              <Route path="listing" element={<MyListings />} />
              <Route path="bidswins" element={<MyBidsWins />} />
              <Route path="myshipments" element={<MyShipments />} />
              <Route path="orders-cart" element={<OrderCart />} />
              <Route path="orders-cart/:id" element={<OrderCartDetails />} />
              <Route path="place-order" element={<CheckoutDetails />} />
              <Route path="vehicle/:id" element={<VehicleRegistered />} />
              <Route
                path="vehicle-submission/:id"
                element={<UserVehicleDetails />}
              />
              {/* Admin login start */}
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
                  <Route path="add/gear-product" element={<AddGearProduct />} />
                  <Route path="Orders" element={<Orders />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="admin/add-blog" element={<AddBlog />} />
                  <Route path="orders-details/:id" element={<OrderDetail />} />
                  <Route path="admin-enquiry" element={<Enquiry />} />
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
          <Route path="submit" element={<SubmitaVehicle />} />
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
