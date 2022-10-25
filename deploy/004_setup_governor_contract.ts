import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { log } from 'console';

const setupGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {getNamedAccounts, deployments} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy, get} = deployments;
  const TimeLock = await ethers.getContract("TimeLock", deployer)
  const GovernorContract = await ethers.getContract("DarkGuildGovernor", deployer);

  log("Assigning Roles");
  const proposerRole = await TimeLock.PROPOSER_ROLE();
  const executorRole = await TimeLock.EXECUTOR_ROLE();
  const timeLockAdminRole = await TimeLock.TIMELOCK_ADMIN_ROLE();
  const nullAddress : string = "0x0000000000000000000000000000000000000000";

  const proposerRoleAssign = await TimeLock.grantRole(proposerRole, GovernorContract.address) ;
  await proposerRoleAssign.wait();
  const executorRoleAssign = await TimeLock.grantRole(executorRole, nullAddress);
  await executorRoleAssign.wait();
  const revokingRole = await TimeLock.revokeRole(timeLockAdminRole, deployer);
  await revokingRole.wait();

};
export default setupGovernorContract;