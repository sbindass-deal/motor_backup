import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/style.css";
import "./Assets/css/carousel.css";
import "./Assets/css/responsive.css";
import "./Assets/css/lightMode.css";
import Layout from "./Components/Pages/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DetailNew from "./Components/Pages/DetailNew";

import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  trustWallet,
  omniWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { useEffect } from "react";
import { getTotals } from "./redux/reducers/cartSlice";
import { storeAllVehicle } from "./redux/reducers/vehicleReducer";
import { storeGearData } from "./redux/reducers/gearReducer";
import { handleGarage } from "./redux/reducers/planReducer";

const bsc = {
  id: 56,
  name: "BSC",
  network: "BNB Smartchain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://bsc-dataseed2.defibit.io",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [bsc, chain.mainnet],
  [
    infuraProvider({ apiKey: "dab1364f1304408b9d44f36d0773cf0a" }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bsc.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      ledgerWallet({ chains }),
      argentWallet({ chains }),
      braveWallet({ chains }),
      coinbaseWallet({ chains }),
      imTokenWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const addBodyClass = (className) => document.body.classList.add(className);
const removeBodyClass = (className) =>
  document.body.classList.remove(className);

const App = () => {
  const logingUser = useSelector((state) => state);
  const accessToken = useSelector((state) => state.login.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [logingUser.cartSlice.products]);

  const className = logingUser.dayAndNightMode.mode ? "dark" : "light";

  useEffect(() => {
    // Set up
    className instanceof Array
      ? className.map(addBodyClass)
      : addBodyClass(className);

    // Clean up
    return () => {
      className instanceof Array
        ? className.map(removeBodyClass)
        : removeBodyClass(className);
    };
  }, [className]);
  // axios.interceptors.request.use(
  //   (req) => {
  //     req.headers.Authorization = `Bearer ${logingUser.login.token}`;
  //     return req;
  //   },

  axios.interceptors.request.use(
    (req) => {
      // console.log(111,req.url.includes("api.vehicledatabases.com"))
      req.headers.Authorization = logingUser.login.token;
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const fetchAllVehicleData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/unknowuser`
      );
      if (res.data.data) {
        dispatch(storeAllVehicle(res.data.data));
      } else {
        dispatch(storeAllVehicle([]));
      }
    } catch (err) {
      console.log("err");
    }
  };
  const fetchAllLoginVehicleData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}vehicles`);
      if (res.data.data) {
        dispatch(storeAllVehicle(res.data.data));
      } else {
        dispatch(storeAllVehicle([]));
      }
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    if (accessToken !== null) {
      fetchAllLoginVehicleData();
    } else {
      fetchAllVehicleData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}allproduct`);
      if (res.status === 200 && res.data.data) {
        dispatch(storeGearData(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    dispatch(handleGarage(true));
  }, []);

  return (
    <>
      <WagmiConfig client={client}>
        <RainbowKitProvider theme={darkTheme()} chains={chains}>
          <Layout />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
