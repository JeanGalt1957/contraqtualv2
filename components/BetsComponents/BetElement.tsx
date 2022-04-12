import React from "react"
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap"
import { IBet } from "../../library/types"
import { betYes, betNo } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"
import { useMediaQuery } from "react-responsive"

interface IBetElementProps {
    bet: IBet
}



const BetElement = (props: IBetElementProps): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    const isMobile = useMediaQuery({ maxWidth: 1200})

    const Result = (): React.ReactElement => {
        return (
            <Card key={props.bet.id} style={{marginTop: '20px', maxWidth: isMobile ? '100%' : '550px'}}>
                <Card.Header as="h5">{props.bet.proposition}</Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col>Yes votes:</Col>
                            <YesInputVote />
                        </Row>
    
                        <Row style={{marginTop: '20px'}}>
                            <Col>No Votes</Col>
                            <NoInputVote />
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }

    const YesInputVote = (): React.ReactElement => {
        const [yesVotes, setYesVotes] = React.useState<string>(null)

        return (
            <>
                <Col>{props.bet.yesVotes} votes</Col>

                <Col>
                    <Form.Control type="number" onChange={ev => setYesVotes(ev.target.value)}></Form.Control>
                </Col>

                <Col>
                    <Button 
                        variant="primary"
                        onClick={ev => {
                            betYes(
                                rootContext.web3ConnectionData.createBetInstance, 
                                rootContext.web3ConnectionData.account, 
                                props.bet.id,
                                yesVotes
                            )
                        }}
                    >Vote</Button>
                </Col>
            </>
        )
    }

    const NoInputVote = () => {
        const [noVotes, setNoVotes] = React.useState<string>(null)

        return(
            <>
                <Col>{props.bet.noVotes} votes</Col>

                <Col>
                    <Form.Control 
                        type="number" 
                        onChange={ev => {
                            setNoVotes(ev.target.value)
                        }}></Form.Control>
                </Col>

                <Col>
                    <Button 
                        variant="primary" 
                        onClick={ev => {
                            betNo(
                                rootContext.web3ConnectionData.createBetInstance, 
                                rootContext.web3ConnectionData.account, 
                                props.bet.id, 
                                noVotes
                            )
                        }}>Vote</Button>
                </Col>
            </>
        )
    }

    return Result()
}

export default BetElement