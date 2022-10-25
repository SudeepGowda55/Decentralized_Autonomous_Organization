import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { log } from 'console';

const darkGuildGovernorDeploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {getNamedAccounts, deployments} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy, get} =  deployments;
  const DarkGuildToken = await get("DarkGuildToken");
  log(DarkGuildToken.address);
  const TimeLock = await get("TimeLock");
  log(TimeLock.address)
  log("Deploying Governor contract");
  const GovernorContractDeploy = await deploy("DarkGuildGovernor", {
    from : deployer,
    log: true,
    args: [DarkGuildToken.address, TimeLock.address, 1, 1, 4]
  })

};
export default darkGuildGovernorDeploy;