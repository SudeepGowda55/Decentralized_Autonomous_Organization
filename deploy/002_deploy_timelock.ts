import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { log } from 'console';

const TimeLockDeploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {getNamedAccounts, deployments} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy} = deployments;
  log("Deploying Time Lock Contract");
  const TimeLockDeploying = await deploy("TimeLock", {from : deployer, log: true, args: [3600, [], []]});
  log("TimeLock Contract deployed and the transaction address is", TimeLockDeploying.address)
};
export default TimeLockDeploy;