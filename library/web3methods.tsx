import { getPollStatus } from "./utils"
import { Contract } from "web3-eth-contract"
import Web3 from "web3"







const contributorHasRequested = async(
    pollRewardsInstance: Contract, 
    account: string,
    pollId: string): Promise<boolean> => {
    return (await pollRewardsInstance.methods.pollsUsersContributions(pollId, account).call())[1]
}

const getGasPrice = async(web3: Web3): Promise<string> => {
    return Math.round(Number(await web3.eth.getGasPrice()) / (10 ** 9)).toString()
} 

const getAddressBalance = async(web3: Web3, address: string): Promise<string> => {
    return await web3.eth.getBalance(address)
}

const getAddressFromENS = async(web3: Web3, ensName: string): Promise<string> => {
    return await web3.eth.ens.getAddress(ensName)
}

const switchToAvalanche = async (provider: any) => {
    try {
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa86a'}]
        })
    }

    catch(error) {
        throw error
    }
}


export {
    getPollStatus,
    contributorHasRequested,
    switchToAvalanche,
    getGasPrice,
    getAddressBalance,
    getAddressFromENS
}

