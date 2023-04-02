import CryptoJS from "crypto-js";
import MicrosoftTeams from "../../../src/Assets/images/MicrosoftTeams-image.png";
import { toast } from "react-toastify";

export const noImage = MicrosoftTeams;

export const incVal = (val) => {
  const newVal = CryptoJS.AES.encrypt(val, process.env.REACT_APP_API_KEY);
  return newVal.toString();
};

export const strToHtml = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

export const toCommas = (value) => {
  if (value === null || value === undefined) {
    return value;
  } else {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const notify = (val, type = 200) => {
  if (type == 200) {
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
  } else {
    toast.warning(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
