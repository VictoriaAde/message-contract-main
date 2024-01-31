require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.URL,
      accounts: [`0x${process.env.KEY}`],
    },
  },
};
// 0xD4fF8b838E0901614d3888daF4d8EeDCe6c12251
