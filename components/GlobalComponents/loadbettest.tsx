import React, { Component } from 'react';
import Web3 from 'web3';
import CreateBet from '../../public/abis/CreateBet.json'
import Main from './Main';


declare let window: any

class App extends Component <any, any> {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  async loadWeb3() {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
    
      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(handleEthereum, 3000); // 3 seconds
    }
    
    function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        window.web3 = new Web3(ethereum)
        window.ethereum.enable();
        // Access the decentralized web!
      } else {
        console.log('Please install MetaMask!');
      }
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = CreateBet.networks[43114]
    if(networkData) {
      const createBet = new web3.eth.Contract(CreateBet.abi, networkData.address)
      this.setState({ createBet })
      const betCount = await createBet.methods.index().call()
      const bettorCount = await createBet.methods.bettorindex().call()
      this.setState({ betCount })
      // Load Bets and stats

      for (var i = 0; i <= betCount - 1; i++) {
        const bet = await createBet.methods.bets(i).call()
        const stat = await createBet.methods.stats(i).call()

        this.setState({
          bets: [...this.state.bets, bet],
          stats: [...this.state.stats, stat],
          
        })

      }

      for (var ii = bettorCount - 1; ii >= 0; ii--) {
        const test = await createBet.methods.tests(ii).call()

        this.setState({
          tests: [...this.state.tests, test],
          
        })

      }
      // Sort bets. Show highest voted bets first
      this.setState({
        bets: this.state.bets.sort((a,b) => (b._yesvotes + b._novotes) - (a._yesvotes + a._novotes)),
      })
      this.setState({ loading: false})
    } else {
      window.alert('CreateBet contract not deployed to detected network.')
    }
  }

  createyesnobet(proposition, odds, gasfees, adminfees, genesiscost) {
    this.setState({ loading: true })
    this.state.createBet.methods.createyesnobet(proposition, odds, gasfees, adminfees, genesiscost).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  betyes(id, betAmount) {
    this.setState({ loading: true })
    this.state.createBet.methods.betyes(id).send({ from: this.state.account, value: betAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  betno(id, betAmount) {
    this.setState({ loading: true })
    this.state.createBet.methods.betno(id).send({ from: this.state.account, value: betAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  revertyes(id, player) {
    this.setState({ loading: true })
    this.state.createBet.methods.revertyes(id, player).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  revertno(id, player) {
    this.setState({ loading: true })
    this.state.createBet.methods.revertno(id, player).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  setoracle(id, betoutcome) {
    this.setState({ loading: true })
    this.state.createBet.methods.setoracle(id, betoutcome).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  resolve(id) {
    this.setState({ loading: true })
    this.state.createBet.methods.resolve(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      createBet: null,
      betCount: 0,
      bets: [],
      stats: [],     
      tests: [],
      loading: true
    }

    this.createyesnobet = this.createyesnobet.bind(this)
    this.betyes = this.betyes.bind(this)
    this.betno = this.betno.bind(this)
    this.revertyes = this.revertyes.bind(this)
    this.revertno = this.revertno.bind(this)
    this.setoracle = this.setoracle.bind(this)
    this.resolve = this.resolve.bind(this)

  }

  render() {
    
    let adminaddress;
    adminaddress = '0x12984A0D426F61318c24b180CA37F902410BBB34'; // revise to actual admin!
    return (
      <div>
        <Main
                account={this.state.account}
                bets={this.state.bets}
                stats={this.state.stats}
                tests={this.state.tests}
                createyesnobet={this.createyesnobet}
                betyes={this.betyes}
                betno={this.betno}
                revertyes={this.revertyes}
                revertno={this.revertno}
                setoracle={this.setoracle}
                resolve={this.resolve}
        />
        </div>
          
    );
  }
}

export default App;

