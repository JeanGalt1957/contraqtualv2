import { Contract } from "web3-eth-contract"
import Web3 from "web3"
import { IBet } from "./types"
import MetaData from "../public/etc/metaData.json"
import BN from "bn.js"

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
            params: [{ chainId: MetaData.netWorkId}]
        })
    }

    catch(error) {
        throw error
    }
}

const createBet = async(
    createBetInstance: Contract,
    address: string,
    proposition: string,
    genesisOdds: number,
    gasFee: number,
    adminFee: number,
    genesisCost: number
): Promise<boolean> => {
    let genesisCostWei = Web3.utils.toWei(new BN(genesisCost))

    return await createBetInstance.methods.createyesnobet(proposition, genesisOdds, gasFee, adminFee, genesisCostWei).send({from: address})
}

const getBets = async(
    createBetInstance: Contract
): Promise<any> => {
    let numberBets: Number = await createBetInstance.methods.index().call()
    let bets: IBet[] = new Array<IBet>()

    for (let i = 0; i < numberBets; i++) {
        let bet = await createBetInstance.methods.bets(i).call()
        bets.push({
            id: bet._id, 
            proposition:bet._proposition, 
            yesVotes: bet._yesvotes, 
            noVotes: bet._novotes
        })
    }

    return bets
}

const betYes = async(
    createBetInstance: Contract,
    address: string,
    index: number,
    value: string
): Promise<boolean> => {
    return await createBetInstance.methods.betyes(index).send({from: address, value: Web3.utils.toWei(value, 'ether')})
}

const betNo = async(
    createBetInstance: Contract,
    address: string,
    index: number,
    value: string
): Promise<boolean> => {
    return await createBetInstance.methods.betno(index).send({from: address, value: Web3.utils.toWei(value, 'ether')})
}

export {
    switchToAvalanche,
    getGasPrice,
    getAddressBalance,
    getAddressFromENS,
    createBet,
    getBets,
    betYes,
    betNo
}

