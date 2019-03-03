import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0x6c1f75450E2164095b61CC0A70b9b1154f814a07";

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), address);

export default instance;
