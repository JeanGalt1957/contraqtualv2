import React from "react"
import { IBet } from "../../library/types"
import { getBets } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"
import BetElement from "./BetElement"
import BetLoader from "./BelLoader"

const BetsList = (): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    const [bets, setBets] = React.useState<IBet[]>(null)

    React.useEffect(() => {
        if (rootContext.web3ConnectionData.createBetInstance) {
            getBets(rootContext.web3ConnectionData.createBetInstance)
                .then(bets => {
                    setBets(bets)
                })
        }
    }, [rootContext.web3ConnectionData.createBetInstance])

    const Result = (): React.ReactElement => {
        return (
            <div style={listStyle}>
                <List />
            </div>
        )
    }

    const List = (): React.ReactElement => {
        if (rootContext.web3ConnectionData.createBetInstance) {
            if (bets) {
                const elements = bets.map((bet) => {
                    return (
                        <BetElement bet={bet} key={bet.id} />
                    )
                })

                return <>{elements}</>
            }

            return (
                <>
                    <BetLoader />
                    <BetLoader />
                </>
            )
        }

        return <div>Connect your wallet to see the bets</div>
    }

    return Result()
}

const listStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "20px",
    marginBottom: "40px"
}

export default BetsList