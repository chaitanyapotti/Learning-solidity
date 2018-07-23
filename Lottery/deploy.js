const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {
    interface,
    bytecode
} = require("./compile");

//FYI.. No real ether in these accounts.! :P
const provider = new HDWalletprovider(
    "blue inherit drum enroll amused please camp false estate flash sell right",
    "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("preparing to deploy from : ", accounts[0]);

    const lottery = await web3.eth.Contract(JSON.parse(interface)).deploy({
        data: "0x" + bytecode
    }).send({
        from: accounts[0],
        gas: 1000000
    });

    console.log("Contract deployed at ", lottery.options.address);
}

deploy();