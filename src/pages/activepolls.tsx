import React from 'react'
import LoadBets from '../../components/GlobalComponents/betloader'
import App from '../../components/GlobalComponents/loadbettest'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'


const ActivePolls = (): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    

    React.useEffect(() => {
        rootContext.setActivePage("activepolls")
    }, [])



    const Result = () => {
        return (
        <div>  
            <br />
            Create a bet!
            <div>
                <App/>
            </div>
        </div>
        
        )
    }

    return Result()
}

export default ActivePolls