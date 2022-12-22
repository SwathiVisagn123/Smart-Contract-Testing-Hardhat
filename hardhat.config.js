require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const INFURA_API_KEY = "bc2fe4e63bbb48dbbc3ba153e9664328";
const PRIVATE_KEY =
  "79adccc4ed9c0137bbf2137d81960630bb1094f3a451cc80289626412a1e89bb";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
