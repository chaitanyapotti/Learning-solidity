import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0x5bBF11612aaABE1A4E5C56d30f1847643665edE6";

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), address);

export default instance;
