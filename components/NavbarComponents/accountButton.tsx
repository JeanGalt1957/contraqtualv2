import React from 'react'
import { RootContext, IRootContextType } from '../GlobalComponents/screenerLayoutWrapper'
import styles from "../../styles/ComponentsStyles/NavbarComponentsStyles/screenerNavbar.module.scss"
import { errorMessageWithClick } from './../../library/alertWindows'
import { switchToAvalanche } from './../../library/web3methods'
import WrongNetworkIcon from "../../public/images/wrongNetwork.svg"
import BigNumber from 'bignumber.js'
import AccountInfoWindow from './accountInfoWindow'
import SelectWalletWindow from './selectWalletWindow'
import { getAddressBalance } from './../../library/web3methods'

interface IAccountButtonProps {
}

declare let window: any

const AccountButton = (props: IAccountButtonProps): React.ReactElement => {
    const [accountInfoWindowDisplayed, setAccountInfoWindowDisplayed] = React.useState<boolean>(false)
    const [selectWalletWindowDisplayed, setSelectWalletWindowDisplayed] = React.useState<boolean>(false)
    const [balance, setBalance] = React.useState<string>("")

    const rootContext: IRootContextType = React.useContext(RootContext)

    React.useEffect(() => {
        if (rootContext.web3ConnectionData.web3 != null) {
            getAddressBalance(rootContext.web3ConnectionData.web3 ,rootContext.web3ConnectionData.account)
                .then(balance => {
                    setBalance(balance)
                })
        }
    }, [rootContext.web3ConnectionData])

    const Result = () => {
        return (
            <>
                <Content />
    
                <AccountInfoWindow 
                    windowDisplayed={accountInfoWindowDisplayed} 
                    closeWindowListener={() => {setAccountInfoWindowDisplayed(false)}} 
                />
                
                <SelectWalletWindow 
                    windowDisplayed={selectWalletWindowDisplayed} 
                    closeWindowListener={() => {setSelectWalletWindowDisplayed(false)}} 
                />
            </>
        )
    }

    const Content = (): React.ReactElement => {
        if (rootContext.web3ConnectionData.account != null) {
            if (isCurrentChainAVAX()) {
                return _AccountButton()
            }

            return WrongNetworkButton()
        }

        return ConnectWalletButton()
    }

    const isCurrentChainAVAX = () => rootContext.web3ConnectionData.createBetInstance != null

    const _AccountButton = () => {
        return (
            <div 
                onClick={() => {
                    setAccountInfoWindowDisplayed(true)
                }} 
                id={styles.connectWallet} 
                className={styles.connectWalletWhite}
            >
                <div id={styles.balanceDiv}>
                    {new BigNumber(balance).div(new BigNumber('1000000000000000000')).toFixed(9).toString()} AVAX
                </div>

                <div id={styles.addressDiv}>
                    {`${rootContext.web3ConnectionData.account.substring(0, 6)}...${rootContext.web3ConnectionData.account.substring(rootContext.web3ConnectionData.account.length - 4, rootContext.web3ConnectionData.account.length)}`}
                </div>
            </div>
        )
    }

    const WrongNetworkButton = () => {
        return (
            <div 
                id={styles.connectWallet} 
                className={styles.connectWalletWrongNetwork} 
                
                onClick={() => {
                    errorMessageWithClick(
                        <>You are using the wrong network, click <a onClick={
                            () => switchToAvalanche(window.ethereum)
                        } 
                        style={{color: 'lightBlue', cursor: 'pointer'}}>here</a> to change it</>
                    )
                }}
            >
                <WrongNetworkIcon />

                <div id={styles.wrongNetworkMessage}>Wrong network</div>
            </div>
        )
    }

    const ConnectWalletButton = () => {
        return (
            <div 
                onClick={() => {
                    setSelectWalletWindowDisplayed(true)
                }} 
                id={styles.connectWallet} 
                className={styles.connectWalletWhite}
            >Connect to a wallet</div>
        )
    }

    return Result()
}

export default AccountButton