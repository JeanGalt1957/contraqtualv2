import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/dist/client/image'
import styles from '../../styles/PagesStyles/index.module.scss'
import metaData from '../../public/etc/metaData.json'
import React from 'react'

declare let window: any

const Welcome = (): React.ReactElement => {
    const Result = () => {
        return (
            <>
                <Head>
                    <title>Contraqtual</title>
                    <link rel="icon" type="image/x-icon" href="/images/appIcon.svg"></link>
                </Head>

                <MobileVersion />

                <DesktopVersion />
            </>
        )
    }

    const DesktopVersion = () => {
        return (
            <div className={`${styles.main} desktopView`}>

                <div id={styles.body}>
                    <div id={styles.firstView}>
                        <div id={styles.leftView}>
                            <div id={styles.leftViewHeader}>
                                <h1 id={styles.title}>Contraqtual</h1>
                                <p id={styles.subTitle}> Predict, hedge, win</p>
                                <div id={styles.firstViewButtons}>
                                    <Link href={"/polls"}>
                                        <input type={"button"} value={"Enter app"} id={styles.enterAppButton}></input>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    const MobileVersion = () => {
        return (
            <div className={`${styles.bodyMobile} mobileView`}>
                    <div id={styles.firstViewMobile}>
                        <h1 id={styles.titleMobile}>Contraqtual</h1>
                        <p id={styles.subTitleMobile}>Predict, hedge, win</p>
                        <div id={styles.firstViewButtonsMobile}>
                            <Link href={"/polls"}>
                                <input type={"button"} value={"Enter app"} id={styles.enterAppButton}></input>
                            </Link>             
                        </div>           
                    </div>
            </div>
        )
    }

    return Result()
}

export default Welcome

