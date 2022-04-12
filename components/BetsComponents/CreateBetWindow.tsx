import React from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { createBet } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"

interface ICreateBetWindowProps {
    createBetDisplayed: boolean
    setCreateBetDisplayed: (boolean) => void
}


const CreateBetWindow = (props: ICreateBetWindowProps): React.ReactElement => {
    const rootContext = React.useContext<IRootContextType>(RootContext)

    const [proposition, setProposition] = React.useState<string>(null)
    const [odds, setOdds] = React.useState<number>(null)
    const [gasFee, setGasFee] = React.useState<number>(null)
    const [adminFee, setAdminFee] = React.useState<number>(null)
    const [genesisCost, setGenesisCost] = React.useState<number>(null)

    const Result = (): React.ReactElement => {
        return (
            <Modal
                size="lg"
                show={props.createBetDisplayed}
                onHide={() => {
                    setProposition(null)
                    setOdds(null)
                    setAdminFee(null)
                    setGasFee(null)
                    setGenesisCost(null)
                    props.setCreateBetDisplayed(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create bet</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="betProposition">
                            <Form.Label>Yes/No proposition:</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Enter bet proposition..." onChange={ev => {
                                setProposition(ev.target.value)
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="betOdds">
                            <Form.Label>Odds:</Form.Label>
                            <Form.Control type="number" placeholder="Number between 0 and 100" onChange={ev => {
                                setOdds(Number(ev.target.value))
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="betGasfee">
                            <Form.Label>Gas fee:</Form.Label>
                            <Form.Control type="number" placeholder="" onChange={ev => {
                                setGasFee(Number(ev.target.value))
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="betAdminfee">
                            <Form.Label>Adminfee:</Form.Label>
                            <Form.Control type="number" placeholder="" onChange={ev => {
                                setAdminFee(Number(ev.target.value))
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="betGenesisCost">
                            <Form.Label>Genesis cost:</Form.Label>
                            <Form.Control type="number" placeholder="" onChange={ev => {
                                setGenesisCost(Number(ev.target.value))
                            }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setCreateBetDisplayed(false)}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={() => { createBetListener() }}>
                        Create bet
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const createBetListener = async () => {
        if (proposition && odds && gasFee && adminFee && genesisCost) {
            createBet(
                rootContext.web3ConnectionData.createBetInstance,
                rootContext.web3ConnectionData.account,
                proposition,
                odds,
                gasFee,
                adminFee,
                genesisCost
            )

            props.setCreateBetDisplayed(false)
        }

        else {
            alert('All values must be filled')
        }
    }

    return Result()
}

export default CreateBetWindow