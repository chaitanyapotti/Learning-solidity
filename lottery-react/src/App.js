import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import lottery from "./lottery";

//contract deployed from : 0x43CE12056AA1E8372ab4aBF0C0cC658D2d41077f
//contract deployed at : 0x9C8720E6Cdc068601Df831bC5a6F3a52a846513c
//interface : [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = { manager: '' };
  // balance is an object ..number wrapped in library big js
  //balance is in wei.convert it into ether

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address)
    this.setState({ manager, players, balance });

  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: "waiting on transaction success..."});
    await lottery.methods.enter().send({from: accounts[0], value: 
      web3.utils.toWei(this.state.value,'ether')});

    this.setState({message: "You have been entered"});
  };

  onClick = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({message: "waiting on transaction success..."});
    await lottery.methods.pickWinner().send({from: accounts[0]});

    const winner = await lottery.methods.lastWinner().call();
    this.setState({message: `A Winner has been picked! ,${winner}`});
  };

  render() {
    // web3.eth.getAccounts().then((result) => {
    //   console.log(result);
    // }).catch((err) => {
    //   console.log(err);
    // });
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered competing to
          win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck ?</h4>
          <div>
            <label> Amount Of Ether To Enter </label>
            <input value={this.state.value} onChange={event => { this.setState({ value: event.target.value }) }} />
          </div>
          <button> Enter </button>
        </form>
        <hr/>
        <h4> Ready to pick a winner ?</h4>
        <button onClick={this.onClick}>Pick a winner! </button>
        <hr/>
        <h1>{this.state.message} </h1>
      </div>
    );
  }
}

export default App;
