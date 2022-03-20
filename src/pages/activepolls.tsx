import React from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'


const ActivePolls = (): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    

    React.useEffect(() => {
        rootContext.setActivePage("activepolls")
    }, [])



    const Result = () => {
        return (
        <div> Test page be populated </div>
        )
    }

    return Result()
}

export default ActivePolls