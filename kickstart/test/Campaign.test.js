import assert from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";

const web3 = new Web3(ganache.provider());
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let acccounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  acccounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({
      from: acccounts[0],
      gas: "1000000"
    });

  //await factory.methods.
});
