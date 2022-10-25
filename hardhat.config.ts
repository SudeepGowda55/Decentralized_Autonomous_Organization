import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: {version: "0.8.17", settings: {optimizer: { enabled: true, runs: 200}}},
  // networks: {
  //   hardhat : {
  //     chainId: 31337,
  //   },
  //   localhost: {
  //     chainId : 31337,
  //   },
  // },
  namedAccounts : {
    deployer : {
      default : 0,
    },
  }
};

export default config;
