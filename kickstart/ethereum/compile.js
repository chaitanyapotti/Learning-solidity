import { resolve } from "path";
import { compile } from "solc";
import {
  removeSync,
  readFileSync,
  ensureDirSync,
  outputJsonSync
} from "fs-extra";

const buildPath = resolve(__dirname, "build");
removeSync(buildPath);

const campaignPath = resolve(__dirname, "contracts", "Campaign.sol");
const source = readFileSync(campaignPath, "utf8");

const output = compile(source, 1).contracts;

ensureDirSync(buildPath);

for (let contract in output) {
  outputJsonSync(
    resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
