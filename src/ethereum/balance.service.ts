import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Web3 from 'web3';

@Injectable()
export class BalanceService {
  private readonly web3: Web3;

  constructor() {
    this.web3 = new Web3(`${process.env.ETH_NODE_URL}`);
  }

  async getBalances(address: string) {
    console.log(this.web3.eth, 'this.web3.eth')
    const balance = await this.web3.eth.getBalance(address);
    console.log(balance, balance)
    const tokens = await this.getTokens(address);
    return {
      balance,
      tokens,
    };
  }

  async getTokens(address: string) {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const tokens = response.data.filter((coin: any) => coin.platforms?.ethereum);
    const contractAddresses = tokens.map((token: any) => token.platforms.ethereum);
    const tokenBalances = await Promise.all(contractAddresses.map(async (address: string) => {
      const contract = new this.web3.eth.Contract([{
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
    ], address);
      const balance = await contract.methods.balanceOf(address).call();
      return { address, balance };
    }));
    return tokenBalances.filter((token: any) => Number(token.balance) > 0);
  }
}