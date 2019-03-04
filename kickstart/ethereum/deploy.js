const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
// FYI.. No real ether in these accounts.! :P
const provider = new HDWalletProvider(
  "blue inherit drum enroll amused please camp false estate flash sell right",
  "https://rinkeby.infura.io/dc22c9c6245742069d5fe663bfa8a698"
);

const deploy = async web3 => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("preparing to deploy from : ", accounts[0]);

    const campaignFactory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({
        data: `0x${compiledFactory.bytecode}`
      })
      .send({
        from: accounts[0],
        gas: 4000000
      })
      .catch(err => console.log(err));
    console.log("Contract deployed at ", campaignFactory.options.address);
  } catch (error) {
    console.log(error);
  }
};

try {
  const web3 = new Web3(provider);
  deploy(web3);
} catch (error) {
  console.log(error);
}
