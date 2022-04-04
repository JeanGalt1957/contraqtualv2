import React, {useState} from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'
import LoadBets from '../../components/GlobalComponents/betloader'
import { Chips, Chip, Select } from '@mantine/core';

interface IPollsState {
    idSearched: string
    createPollWindowDisplayed: boolean
}

export default function Polls(): React.ReactElement {

    let rootContext: IRootContextType = React.useContext(RootContext)

    React.useEffect(() => {
        rootContext.setActivePage("polls")
    }, [])

    const [filter, setFilter] = useState('newest');
    const [category, setCategory] = useState('');

    return (
        <div>
            <br />
            Filter to see current bets!
            <br />
            <Chips multiple={false} value={filter} onChange={setFilter}>
                <Chip value="newest">Newest</Chip>
                <Chip value="pool-price">Pool Price</Chip>
                <Chip value="pool-size">Pool Size</Chip>
                <Chip value="oldest">Oldest</Chip>
            </Chips>
            <br />
            <Select value={category} onChange={setCategory} data={[
                { value: 'sports', label: 'Sports' },
                { value: 'world-news', label: 'World News' },
                { value: 'crypto', label: 'Cryptocurrency Predictions' }
            ]} />
            <br />
            <LoadBets filter={filter} category={category} />
        </div>
    )
}

export type {
    IPollsState
}

