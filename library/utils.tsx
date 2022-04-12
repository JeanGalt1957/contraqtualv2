import BigNumber from "bignumber.js"
import React from "react"
import bets from "../src/pages/bets"
import welcome from "../src/pages/index"

const converGWeiToEth = (wei: string) => {
    return (new BigNumber(wei).div('1000000000')).toString()
}

const getReadableDate = (unixDate: string) => {
    let date = new Date(Number(unixDate) * 1000)
    
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const convertDateToUnix = (date: string): string => {
    return (Math.floor(Number(new Date(date)) / 1000)).toString()
}

const getDaysAndHoursFromUnix = (unixTime: string) => {
    const numberDays = Math.floor((Number(unixTime) / 3600) / 24)
    const numberHours = (Number(unixTime) / 3600) % 24

    if (numberDays == 1) {
        return `${numberDays} day and ${numberHours} hours`
    }

    else {
        return `${numberDays} days and ${numberHours} hours`
    }
}

const getTwoDecimalPercent = (cuantity: number, total: string) => {
    if (Number(total) > 0) {
        return Math.round((cuantity / Number(total)) * 10000) / 100
    }

    else {
        return 'N/A'
    }
}

const getCurrentTimeUnix = () => {
    return Math.floor(Date.now() / 1000)
}

export {
    converGWeiToEth,
    convertDateToUnix,
    getCurrentTimeUnix,
    getReadableDate,
    getDaysAndHoursFromUnix,
    getTwoDecimalPercent
}