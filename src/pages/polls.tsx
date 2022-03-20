import React, {useState} from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'
import LoadBets from '../../components/GlobalComponents/betloader'

interface IPollsState {
    idSearched: string
    createPollWindowDisplayed: boolean
}

export default function Polls(): React.ReactElement {

    let rootContext: IRootContextType = React.useContext(RootContext)

    React.useEffect(() => {
        rootContext.setActivePage("polls")
    }, [])

    return (
        <div>
            Bets here
            <LoadBets/>
        </div>
    )
}

export type {
    IPollsState
}

