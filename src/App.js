import logo from './logo.svg';
import './App.css';
import './Assets/css/bootstrap.min.css'
import './Assets/css/style.css'
import './Assets/css/responsive.css'
import Home from './Components/Pages/Home';
import MyListings from './Components/Pages/MyAccount/MyListings';
import Header from './Components/Header';
import Layout from './Components/Pages/Layout';
import ForgotPasswordModal from './Components/Popups/ForgotPasswordModal';

function App() {
  return (
    <>
    <Layout/>
    {/* <ForgotPasswordModal/> */}
    </>
  );
}

export default App;
