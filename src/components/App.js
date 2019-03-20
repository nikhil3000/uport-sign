import React from 'react';
import Web3 from 'web3';
import { Connect } from 'uport-connect';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.setNumber = this.setNumber.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.state = {
            numberContract: undefined,
            number: undefined,
            ethAddress: '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087' //it is not actually doing anything, just a workaround i found in uport-connect repo
        }
    }


    componentDidMount() {
        //some initial setup
        const connect = new Connect('Test Web3', { network: 'rinkeby' })
        const provider = connect.getProvider()
        const web3 = new Web3(provider)
        const abi = [{ "constant": false, "inputs": [{ "name": "_num", "type": "uint256" }], "name": "setNum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getNum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
        const address = "0x5573b56dd293552f449db7482833a68f7b5f9062";
        var numberContract = new web3.eth.Contract(abi, address);
        this.setState({ numberContract: numberContract });
    }


    setNumber(e) {
        e.preventDefault();
        var num = $('#number')[0].value;
        this.state.numberContract.methods.setNum(num).send({ from:this.state.ethAddress  }, (err, hash) => {
            if (err) { throw err };
            console.log(hash);
        })
    }

    getNumber(e) {
        e.preventDefault();
        this.state.numberContract.methods.getNum().call({from:this.state.ethAddress}, (err,num)=>{
            if(err) {throw err};
            this.setState({number:num});
        })
    }

    render() {
        return (
            //some ui for the demo
            <div>
                <div className="container">
                    <div className="card">
                        <h5 className="card-header">Signing transactions using uport</h5>
                        <div className="card-body">
                            <form>
                                <h5 className="card-title">Enter any integer</h5>
                                <input type="number" className="number" id="number" name="num"></input><br></br>
                                <button className="btn btn-primary" onClick={this.setNumber}>Set Number</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <h5 className="card-header">Calling methods</h5>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={this.getNumber}>Get Number</button>
                            {this.state.number ? <p>{this.state.number}</p> : <p>click to fetch</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}