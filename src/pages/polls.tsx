import React from 'react'
import CreatePollWindow from "../../components/PollsComponents/createPollWindow"
import PollsList from '../../components/PollsComponents/pollsList'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'
import ScreenerSearchAndCreate from '../../components/GlobalComponents/screenerSearchAndCreate'

interface IPollsState {
    idSearched: string
    createPollWindowDisplayed: boolean
}

export default function Polls(): React.ReactElement {
    const [idSearched, setIdSearched] = React.useState<string>('')
    const [createPollWindowDisplayed, setCreatePollWindowDisplayed] = React.useState<boolean>(false)

    let rootContext: IRootContextType = React.useContext(RootContext)

    React.useEffect(() => {
        rootContext.setActivePage("polls")
    }, [])

    return (
        <div>
            To be populated
        </div>
    )
}

// async function getStaticProps() {
//     const client = useApolloClient()
//     let results = await client.query<IPoll[]>({query: first5PollsQuery})
// }

export type {
    IPollsState
}

