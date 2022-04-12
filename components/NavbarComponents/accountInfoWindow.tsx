import React from "react"
import styles from "../../styles/ComponentsStyles/NavbarComponentsStyles/accountInfoWindow.module.scss"
import RedirectIcon from "../../public/images/redirect.svg"
import CopyIcon from "../../public/images/copy.svg"
import CrossIcon from "../../public/images/crossIcon.svg"
import { RootContext, IRootContextType } from '../GlobalComponents/screenerLayoutWrapper'
import ScreenMouseLock from "../GlobalComponents/screenMouseLock"

interface IAccountInfoWindowProps {
    windowDisplayed: boolean
    closeWindowListener: () => void
}

interface IAccountInfoWindowState {
    receiverId: string | null,
    oracleId: string | null
}

const AccountInfoWindow = (props: IAccountInfoWindowProps): React.ReactElement => {

    const rootContext: IRootContextType = React.useContext(RootContext)

    const Result = () => {
        return props.windowDisplayed ?
            <>
                <AccountInfoPannel />
    
                <ScreenMouseLock 
                    backgroundShadowed={true} 
                    removeDisplayedElement={props.closeWindowListener} 
                />
            </>
            :
            null
    }

    const AccountInfoPannel = (): React.ReactElement => {
        return (
            <div id={styles.accountInfoWindow}>
                <div id={styles.form}>
                    <div id={styles.titleAndClose}>
                        <h1 id={styles.title}>Account</h1>
                        <CrossIcon 
                            onClick={props.closeWindowListener} 
                            id={styles.closeAccountInfo}
                        />
                    </div>
        
                    <div id={styles.accountNumberTitle}>Connected with account:</div>
        
                    <div id={styles.account}>{`${rootContext.web3ConnectionData.account.substring(0, 12)}...${rootContext.web3ConnectionData.account.substring(rootContext.web3ConnectionData.account.length - 12, rootContext.web3ConnectionData.account.length)}`}</div>
        
                    <div id={styles.addressActions}>
                        <a id={styles.viewOnExplorer} className={styles.link} target="_blank">
                            <RedirectIcon />
                            <div>View on explorer</div>
                        </a>    
        
                        <a id={styles.copyAddress} className={styles.link}>
                            <div>Copy address</div>
                            <CopyIcon />
                        </a>
                    </div>   

                    <DisconnectButton />
                </div>
            </div>
        )
    }

    const DisconnectButton = () => {
        return rootContext.web3ConnectionData.provider && rootContext.web3ConnectionData.provider.isWalletConnect ?
            <div id={styles.disconnectButton} onClick={() => {
                rootContext.web3ConnectionData.provider.disconnect()
                props.closeWindowListener()
            }}>Disconnect</div> 
            :
            null
    }

    return Result()
}

export default AccountInfoWindow