import React from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'

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

