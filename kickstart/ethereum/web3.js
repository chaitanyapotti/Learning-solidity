import Web3 from "web3";

// eslint-disable-next-line import/no-mutable-exports
let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698");
  web3 = new Web3(provider);
}

export default web3;
