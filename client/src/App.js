
import React, { Component } from 'react';
import LotteryContract from "./contracts/Lottery.json";
import './App.css';
import getWeb3 from "./getWeb3";

class App extends Component {
  state={
    web3: null, 
    accounts: null, 
    contract: null, 
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // const web3 = new Web3(window.web3.currentProvider);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LotteryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LotteryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const {contract,web3 } = this.state;

    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
    
    const manager = await contract.methods.manager().call();
    const players = await contract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(contract.options.address);
    console.log(balance);
    this.setState({manager,players,balance});
  };

  onSubmit=async (event)=>{
    event.preventDefault();
    const { accounts, contract,web3 } = this.state;
    this.setState({message:'Waiting on transaction success...'});
    await contract.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value,'ether')
    })
  }
  onClick=async ()=>{
    const { accounts, contract } = this.state;

    this.setState({message:'Waiting on transaction success'});
    await contract.methods.pickWinner().send({
      from:accounts[0]
    });
    this.setState({message:'A winner has been picked!'})
  }
  render() {

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>The contract is managed by {this.state.manager}
        There are currently {this.state.players.length} people entered ,
        competing to win {(this.state.web3 != null ? this.state.web3.utils.fromWei(this.state.balance,'ether'): 0)}</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input value={this.state.value} onChange={event => this.setState({value:event.target.value})}/>
          </div>
          <button>Enter</button>
        </form>
     
      <h4>
        Ready to pick a winner?
      </h4>
      <button onClick={this.onClick}>Pick a winner</button>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
