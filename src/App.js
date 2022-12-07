import "./App.css";
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/style.css";
import "./Assets/css/responsive.css";
import Layout from "./Components/Pages/Layout";
import axios from "axios";
import { useSelector } from "react-redux";

function App() {
  const logingUser = useSelector((state) => state.login);
  axios.interceptors.request.use(
    (req) => {
      req.headers.Authorization = `Bearer ${logingUser.token}`;

      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
