const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
//FYI.. No real ether in these accounts.! :P
const provider = new HDWalletProvider(
    "blue inherit drum enroll amused please camp false estate flash sell right",
    "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("preparing to deploy from : ", accounts[0]);

    const campaignFactory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({
        data: "0x" + compiledFactory.bytecode
    }).send({
        from: accounts[0],
        gas: 2000000
    });
    console.log("Contract deployed at ", campaignFactory.options.address);
}

deploy();