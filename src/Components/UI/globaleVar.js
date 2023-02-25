import CryptoJS from "crypto-js";

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
