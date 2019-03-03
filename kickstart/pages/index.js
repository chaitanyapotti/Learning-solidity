import React from "react";

import web3 from "../ethereum/web3";

web3.eth.getAccounts().then(accounts => {
  console.log(accounts);
});

export default () => {
  return <h1>This is the campaign list page!!!</h1>;
};
