import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { log } from 'console';
import { ethers } from 'hardhat';

const governanceDeploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy, get} = deployments;
  log("Deploying Governance Contract");
  const governanceContract = await deploy("Governance", { from: deployer, log: true, args: [] });
  const getTimeLock = await get("TimeLock");
  const timeLock = await ethers.getContractAt("TimeLock", getTimeLock.address);
  const governance = await ethers.getContractAt("Governance", governanceContract.address);
  const transferOwner = await governance.transferOwnership(timeLock.address);
  await transferOwner.wait();
  log("Governance Contract deloyed");
};
export default governanceDeploy;