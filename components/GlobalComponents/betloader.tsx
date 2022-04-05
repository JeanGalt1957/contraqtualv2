import React from "react"
import CreateBet from '../../public/abis/CreateBet.json'



const LoadBets = (props) => {
    return (
        <div>
            Currently displaying bets filtered by: {props.filter}
            <br />
            Current category: {props.category}
        </div>
    )
}

export default LoadBets

// either export default at bottom and import as plaintext
// or export const () in function and import as {text}
// exported const MUST start with capital letter!