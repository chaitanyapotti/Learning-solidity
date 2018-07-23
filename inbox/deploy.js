const HDWalletprovider = require("truffle-hdwallet-provider");
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
    console.log("Attempting to deploy from account ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: "0x" + bytecode,
        arguments: ['Hello World!']
    }).send({
        gas: 4000000,
        from: accounts[0]
    });

    console.log("contract deployed at ", result.options.address);

};

deploy();