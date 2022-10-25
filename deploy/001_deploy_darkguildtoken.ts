import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { log } from 'console';

const deployDarkGuildToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {getNamedAccounts, deployments} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy} = deployments;
  log("Deploying DarkGuild Token");
  const governanceToken  = await deploy("DarkGuildToken", { from: deployer, log: true, args : []});
  log("Governance Token deployed and the public address is", governanceToken.address);
  await delegateTokens(governanceToken.address, deployer);
  log("Delegated the Tokens for the account address", deployer );
};

const delegateTokens = async (DarkGuildTokenAddress:string, delegatingAccount: string ) => {
    const governanceToken = await ethers.getContractAt("DarkGuildToken", DarkGuildTokenAddress );
    const delegation = await governanceToken.delegate(delegatingAccount);
    await delegation.wait(); 
    log(`Checkpoints ${await governanceToken.numCheckpoints(delegatingAccount)}`);
}

export default deployDarkGuildToken;