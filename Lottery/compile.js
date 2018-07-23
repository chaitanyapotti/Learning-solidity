const solc = require("solc");
const fs = require("fs");
const path = require("path");

const lotteryPath = path.resolve(__dirname, "contracts","Lottery.sol");
const lotteryFileStream = fs.readFileSync(lotteryPath, "utf8");

module.exports = solc.compile(lotteryFileStream, 1).contracts[":Lottery"];