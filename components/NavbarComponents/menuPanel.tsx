import React from "react"
import Link from "next/link"
import styles from "../../styles/ComponentsStyles/GlobalComponentsStyles/screenerLayout.module.scss"
import { RootContext, IRootContextType } from '../GlobalComponents/screenerLayoutWrapper'
import metaData from '../../public/etc/metaData.json'
import { useMediaQuery } from 'react-responsive'
import AccountButton from "./accountButton"
import ScreenMouseLock from "../GlobalComponents/screenMouseLock"

interface IMenuPanelProps {
    menuDisplayed: boolean
    closeMenuCallback: () => void
}

const MenuPanel = (props: IMenuPanelProps): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    const isMobile = useMediaQuery({ maxWidth: 1200})

    const Result = () => {
        return (
            props.menuDisplayed ?
                <>
                    <div id={styles.menuPanel} style={{'right' : '10px'}}>
                        <MenuPanelElements />
                    </div>
    
                    <ScreenMouseLock 
                        backgroundShadowed={false}
                        removeDisplayedElement={props.closeMenuCallback}
                    />
                </>
            :
                <div id={styles.menuPanel}>
                    <MenuPanelElements />
                </div>
        )
    }

    const MenuPanelElements = () => {
        return isMobile ?
            <MenuPanelElementsMobile />
            :
            <MenuPanelElementsDesktop />
    }

    const MenuPanelElementsMobile = () => {
        return (
            <>
                <div id={styles.menuElementAccountButton}>
                    <AccountButton />
                </div>

                <SeparationBar />

                {/* <div id={styles.pageElementsMobile}>
                    <PageElement page="bets" textContent="Bets" />
                </div>

                <SeparationBar /> */}

                <div style={{height: '20px'}}></div>

                <MenuAcionsElements />
            </>
        )
    }

    const MenuPanelElementsDesktop = (): React.ReactElement => {
        return <MenuAcionsElements />
    }

    const SeparationBar = () => {
        return <div id={styles.menuPanelSeparateBar}></div>
    }

    const PageElement = (props: {page: string, textContent: string}) => {
        return (
            <Link href={`/${props.page}`}>
                {
                    rootContext.activePage == props.page ?
                        <div className={styles.pageElement} style={{fontWeight: 'bold'}}>
                            {props.textContent}
                        </div>
                        :
                        <div className={styles.pageElement}>
                        {props.textContent}
                    </div>
                }
            </Link>
        )
    }

    const MenuAcionsElements = () => {
        return (
            <>
                <div className={styles.menuElement}>Sing Up as a receiver</div>

                <div className={styles.menuElement}>User guide</div>

                <div 
                    className={styles.menuElement}
                    onClick={() => window.open(metaData.githubUrl, "_blank")}
                >Explore our source code</div>
            </>
        )
    }

    return Result()
}

export default MenuPanel