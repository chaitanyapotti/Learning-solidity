const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //constructor function - used to make multiple instances

const web3 = new Web3(ganache.provider()); //change provider to connect to a different network
const {
    interface,
    bytecode
} = require("../compile");

//every web3 function is async
let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of them to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: ['Hi there!']
    }).send({
        from: accounts[0],
        gas: '1000000'
    })
});


describe("Inbox", () => {
    it("deploys a contract", () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hi there!");
    });

    it("set message", async () => {
        const changedTx = await inbox.methods.setMessage("Hello World!").send({from: accounts[0]});
        console.log(changedTx);
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hello World!");
    });
});











// beforeEach(async () => {
//     //get a list of all accounts
//     let accounts = await web3.eth.getAccounts();
//     accounts.forEach(async (element) => {
//         let balance = await web3.eth.getBalance(element);
//         console.log(element, balance);
//     });
//     //use one of them to deploy
// })

// beforeEach(() => {
//     //get a list of all accounts
//     web3.eth.getAccounts()
//         .then(fetchedAccounts => {
//             fetchedAccounts.forEach(element => {
//                 web3.eth.getBalance(element).then(balance => {
//                     console.log(element, balance);
//                 });
//             });
//             // console.log(fetchedAccounts);

//     })
//     //use one of them to deploy
// })










// class Car {
//     park() {
//         return "stopped";
//     }

//     drive() {
//         return "vroom";
//     }
// }

// let car;

// beforeEach(() => {
//     // console.log('a');
//     car =  new Car();
// });


// describe("Car", () => {
//     it("can park", () => {
//         assert.equal(car.park(), "stopped");
//     });

//     it("can vroom", () => {
//         assert.equal(car.drive(), "vroom");
//     });
// });