import React, { Component } from 'react';
import Web3 from 'web3';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


class Main2 extends Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  outcomeswitch(param) {
    switch(param) {
      case 0:
        return 'No';
      case 1:
        return 'Yes';
      case 2:
        return 'Push';
      case 3:
        return 'TBD';
    }
  }

  render () {    
    //const web3 = new window.web3
    //const accounts = web3.eth.getAccounts()
    var i = 0;
    let adminaddress;
    adminaddress = '0x496764D595FBFC752FB73416759406e296b68851'; // revise to actual admin!
    let adminform;
        adminform =  
        <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={(event) => {
          event.preventDefault()
          const proposition = this.betproposition.value
          const odds = this.betodds.value
          const gasfees = this.gasfees.value
          const adminfees = this.adminfees.value
          const genesiscostY = this.genesiscostX.value * 10**18
          const genesiscost = genesiscostY.toString()
          this.props.createyesnobet(proposition, odds, gasfees, adminfees, genesiscost)
        }}>
        <div className="form-group mr-sm-2">
          <TextInput
            id="betproposition"
            label="Proposition"
            ref={(input) => { this.betproposition = input }}
            // className="form-control"
            placeholder="Yes / no proposition..."
            required />
        </div>
        <div className="form-group mr-sm-2">
          <TextInput
            id="betodds"
            label="Odds"
            ref={(input) => { this.betodds = input }}
            // className="form-control"
            placeholder= "Odds..."
            required />
        </div>
        <div className="form-group mr-sm-2">
          <TextInput
            id="gasfees"
            label="Gas Fee"
            ref={(input) => { this.gasfees = input }}
            // className="form-control"
            placeholder="Gas fees..."
            defaultValue={250}
            required />
        </div>
        <div className="form-group mr-sm-2">
          <TextInput
            id="adminfees"
            label="Admin Fees"
            ref={(input) => { this.adminfees = input }}
            // className="form-control"
            placeholder="Admin fees..."
            defaultValue={250}
            required />
        </div>
        <div className="form-group mr-sm-2">
          <TextInput
            id="genesiscost"
            label="Genesis Cost"
            ref={(input) => { this.genesiscostX = input }}
            // className="form-control"
            placeholder={0.02}
            required />
        </div>
        <Group position="right" mt="md">
          <Button 
            type="submit" 
            //className="btn btn-primary btn-block"
          >Create</Button>
        </Group>
      </form>
      </Box>;
    
    let resolvebutton;
      resolvebutton =
      <button
      type="submit" 
      id="resolver" 
      className="btn btn-primary"
      > Resolve
    </button>
  
  return (
      <div className="container-fluid mt-5">
        <div className="row" id="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="proposition mr-auto ml-auto">
              <p>&nbsp;</p>
                {adminform}
              <p>&nbsp;</p>
              { this.props.bets.map((bet, key) => {
                let thisbalance
                let yesshare
                let noshare
                thisbalance = this.props.stats[bet._id]._betbalance / 10**18
                yesshare = (bet._yesvotes - bet._genesisvotes) / ((bet._yesvotes - bet._genesisvotes) + (bet._novotes - (100 - bet._genesisvotes)))
                noshare = (bet._novotes - (100 - bet._genesisvotes)) / ((bet._yesvotes - bet._genesisvotes) + (bet._novotes - (100 - bet._genesisvotes)))
                if(bet._resolver == false) {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        
                      />
                      <small className="text-muted">{web3.utils.toChecksumAddress(bet._betaddress)}</small>
                    </div>
                    <ul id="betList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p id="pbold">{bet._proposition}</p>
                      </li>
                      <li className="list-group-item">
                        <p id="psub"> Balance on Yes: {(bet._yeswagers / 10 ** 18).toFixed(4)} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._yesodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Balance on No: {(bet._nowagers / 10 ** 18).toString()} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._noodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Implied odds on Yes: {(this.props.stats[bet._id]._yesodds / 100).toFixed(2) + "%"} </p>
                        <p id="psub"> Implied odds on No: {(this.props.stats[bet._id]._noodds / 100).toFixed(2) + "%"} </p>                        
                      </li>
                      {this.props.tests.map((test,key) => {
                        if(Number(test._betindex) == Number(bet._id)
                        && test._isyes == true)  {
                        return (
                        <div className="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardyesheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          <small className="text-muted">{test._player.toString()}</small>
                          </div>
                          <ul className="list-group list-group-flush"> 
                              <li className="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playeryesvotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playeryesbalance / test._playeryesvotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Potential ROI:{" "}
                                    {(((test._playeryesvotes / (bet._yesvotes - (bet._genesisvotes)) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18) / (test._playeryesbalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Time:{" "}
                                    {test._time.toString()}
                                  </small>
                              </p>
                               {/* Revert buttons */}
                              <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                                event.preventDefault()
                                const betID = bet._id
                                const player = test._specificindex
                                this.props.revertyes(betID, player)
                                }}>
                                <button
                                type="submit" 
                                id="yesreverter" 
                                className="btn btn-primary"
                                > Revert </button>
                              </form>
                              </li>
                          </ul>
                        </div>
                        ) 
                      }
                    })
                    }
                    {this.props.tests.map((test,key) => {  
                      if(Number(test._betindex) == Number(bet._id)
                      && test._isno == true) {
                        return (
                          <div className="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardnoheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          <small className="text-muted">{test._player.toString()}</small>
                          </div>
                          <ul className="list-group list-group-flush"> 
                              <li className="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playernovotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playernobalance / test._playernovotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential ROI:{" "}
                                    {(((test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18) / (test._playernobalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Time:{" "}
                                    {test._time.toString()}
                                  </small>
                              </p>
                              {/* Revert buttons */}
                              <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                                event.preventDefault()
                                const betID = bet._id
                                const player = test._specificindex
                                this.props.revertno(betID, player)
                                }}>
                                <button
                                type="submit" 
                                id="noreverter" 
                                className="btn btn-primary"
                                > Revert </button>
                              </form>
                              </li>
                          </ul>
                        </div>
                          )
                      }
                    })
                    }
                      <li key={key} className="list-group-item" id="betinputform">
                        <form className="form-inline float-right text-muted" id="betinputform" onSubmit={(event) => {
                          event.preventDefault()
                          const betyesAmountY = bet.betyesAmountX.value * 10**18
                          const betyesAmount = betyesAmountY
                          const betIndex = bet._id
                          this.props.betyes(betIndex, betyesAmount)
                        }}>
                        <div id="betinputs">
                          Yes Votes: {(bet._yesvotes - bet._genesisvotes).toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betyesAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                            type="submit" 
                            id="submit" 
                            className="btn btn-primary"
                        > Bet yes </button>
                        </form>
                        <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betnoAmountY = bet.betnoAmountX.value * 10**18
                          const betnoAmount = betnoAmountY
                          const betIndex = bet._id
                          this.props.betno(betIndex, betnoAmount)
                        }}>
                        <div id="betinputs">
                          No Votes: {(bet._novotes - (100 - bet._genesisvotes)).toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betnoAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                              type="submit" 
                              id="submit" 
                              className="btn btn-primary"
                          > Bet no</button>
                        </form>
                      </li>
                      <li key={key} className="list-group-item" id="betinputform">
                      <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betoutcome = bet.outcome.value
                          const betIndex = bet._id
                          this.props.setoracle(betIndex, betoutcome)
                        }}>
                        <div id="betinputs">
                          Outcome: {this.outcomeswitch(Number(bet._outcome))}
                        </div>
                        <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="number"
                              ref={(input) => { bet.outcome = input }}
                              className="form-control"
                              placeholder="Outcome..."
                              required />
                        </div>
                        <button 
                              type="submit" 
                              id="submit" 
                              className="btn btn-primary"
                          > Oracle </button>
                        </form>
                        <div>
                        <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betoutcome = bet.outcome.value
                          const betIndex = bet._id
                          this.props.resolve(betIndex)
                        }}>
                          {resolvebutton}
                        </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              })}
              
            </div>
          </main>
        </div>
      </div>
    ); //admin
}
}

export default Main2;
