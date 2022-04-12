import React from "react"
import Web3 from "web3"
import contractsMetaData from '../../public/etc/contractsMetadata.json'
import Head from "next/head"
import Navbar from "../NavbarComponents/screenerNavbar"
import styles from "../../styles/ComponentsStyles/GlobalComponentsStyles/screenerLayout.module.scss"
import { AbiItem } from 'web3-utils'
import MetaData from '../../public/etc/metaData.json'
import { Contract } from "web3-eth-contract"

declare let window: any

interface IScreenerLayoutWrapperProps {
    children: React.ReactElement
}

interface IWeb3ConnectionData {
    provider: any | null
    web3: Web3 | null
    account: string | null
    createBetInstance: Contract | null
}

interface IRootContextType {
    web3ConnectionData: IWeb3ConnectionData
    activePage: String | null
    setActivePage: (activePage: string) => void
    setWeb3AndAccountsInstance: (provider: any) => Promise<void>
}

let RootContext = React.createContext<IRootContextType>({} as IRootContextType)

const ScreenerLayoutWrapper = (props: IScreenerLayoutWrapperProps): React.ReactElement => {
    const [activePage, setActivePage] = React.useState<String | null>(null)

    const initialState: IWeb3ConnectionData = {
        provider: null,
        web3: null,
        account: null,
        createBetInstance: null
    }
    const [web3ConnectionData, setWeb3ConnectionData] = React.useState<IWeb3ConnectionData>(initialState)

    React.useEffect(() => {
        if (window.ethereum) {
            setWeb3AndAccountsInstances(window.ethereum)
        }
    }, [])

    const setWeb3AndAccountsInstances = async (provider: any): Promise<void> => {
        let web3 = new Web3(provider)
        let accounts = await web3.eth.getAccounts()
        let createBetInstance: Contract = null

        if (accounts.length > 0) {
            if (provider.chainId == MetaData.netWorkId) {
                createBetInstance = new web3.eth.Contract(contractsMetaData.createBetABI as AbiItem[], contractsMetaData.createBetAddress)
                console.log(createBetInstance)
            }

            provider.on('chainChanged', reloadSite)
            provider.on('accountsChanged', handleAccountChanged)

            if (provider.isWalletConnect) {
                provider.on('disconnect', resetWeb3ConnectionData)
            }

            setWeb3ConnectionData(prevState => ({
                ...prevState,
                provider: provider,
                web3: web3,
                account: accounts[0],
                createBetInstance: createBetInstance as unknown as Contract,
            }))
        }
    }

    const handleAccountChanged = async (accounts: Array<string>): Promise<void> => {
        if (accounts.length > 0) {
            setWeb3ConnectionData(prevState => ({
                ...prevState,
                account: accounts[0]
            }))
        }

        else {
            resetWeb3ConnectionData()
        }
    }

    const reloadSite = () => window.location.reload()
    const resetWeb3ConnectionData = () => setWeb3ConnectionData({ ...initialState })

    const rootContext: IRootContextType = {
        web3ConnectionData: web3ConnectionData,
        activePage: activePage,
        setActivePage: setActivePage,
        setWeb3AndAccountsInstance: setWeb3AndAccountsInstances
    }

    return (
        <RootContext.Provider value={rootContext}>
            <Head>
                <link rel="icon" type="image/x-icon" href="/images/appIcon.svg"></link>
            </Head>

            <main id={styles.body}>
                <Navbar />
                
                <div id={styles.main}>
                    {props.children}
                </div>
            </main>
        </RootContext.Provider>
    )
}

export default ScreenerLayoutWrapper

export {
    RootContext
}

export type {
    IRootContextType
}
