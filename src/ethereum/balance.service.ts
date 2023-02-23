import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import Web3 from "web3";
import { writeFileSync } from "fs";
import fs from "fs";

@Injectable()
export class BalanceService {
  private readonly web3: Web3;

  constructor() {
    this.web3 = new Web3(`${process.env.ETH_NODE_URL}`);
  }

  async runIntervalBalance(addressWallet: string) {
    setInterval(async () => {
      this.getBalancesForInterval(addressWallet);
    }, 60 * 1000);
  }

  async getBalances(addressWallet: string) {
    const address = addressWallet.toLocaleLowerCase();
    try {
      //get Total
      const response = await axios.get(
        `${process.env.URL_API_COINGECKO}coins/ethereum`
      );

      // access the "total_supply" and "circulating_supply" fields
      const totalSupply = response.data.market_data.total_supply;

      //balance
      const balance = await this.web3.eth.getBalance(address);

      //get all tokens on wallet
      const allTokens = await this.getTransactionsByAccount(address);

      //count
      const tokenCount = await this.web3.eth.getTransactionCount(address);
      //create object for json file
      const allBalanceData = {
        address,
        tokenCount,
        balance: +balance / 1e18,
        allTokens,
      };

      // data json
      const now = new Date().toISOString();
      const data = { ...allBalanceData, createdAt: now };
      const jsonData = JSON.stringify(data /* , null, 2 */);

      //create directory
      if (!fs.existsSync(`${__dirname}/files`)) {
        fs.mkdirSync(`${__dirname}/files`, { recursive: true });
      }

      //save file
      writeFileSync(`${__dirname}/files/config.json`, jsonData);

      await this.runIntervalBalance(address);
      return {
        totalSupply,
        tokenCount,
        balance: +balance / 1e18,
        allTokens,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ error }, HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  async getTransactionsByAccount(
    myAccount: string,
    startBlockNumber = 0,
    endBlockNumber = null
  ) {
    try {
      /*  if (endBlockNumber === null) { */
      endBlockNumber = await this.web3.eth.getBlockNumber();
      /*    } */
      /*   if (startBlockNumber === null) {
      startBlockNumber = endBlockNumber - 1000;
    } */

      //console.log(myAccount);
      let number = 0;
      //console.log(number, "<--count", endBlockNumber);

      const tokens = [];
      //console.log(tokens, "!!tokens!!!");

      for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        let block = await this.web3.eth.getBlock(i, true);
        number = number + 1;
        console.log(number);
        if (block !== null && block.transactions !== null) {
          block.transactions.forEach((transaction) => {
            console.log(transaction, "<1<<<<");

            if (
              myAccount === "*" ||
              (transaction.from &&
                myAccount === transaction.from.toLowerCase()) ||
              (transaction.to && myAccount === transaction.to.toLowerCase())
            ) {
              console.log(transaction, "<1");
              tokens.push(transaction);
            }
          });
        }
      }
      return tokens;
    } catch (error) {
      console.log(error);
    }
  }

  async getBalancesForInterval(addressWallet: string) {
    const address = addressWallet.toLocaleLowerCase();
    try {
      //get Total
      const response = await axios.get(
        `${process.env.URL_API_COINGECKO}coins/ethereum`
      );

      // access the "total_supply" and "circulating_supply" fields
      const totalSupply = response.data.market_data.total_supply;

      //balance
      const balance = await this.web3.eth.getBalance(address);

      //get all tokens on wallet
      const allTokens = await this.getTransactionsByAccount(address);

      //count
      const tokenCount = await this.web3.eth.getTransactionCount(address);
      //create object for json file
      const allBalanceData = {
        address,
        tokenCount,
        balance: +balance / 1e18,
        allTokens,
      };

      // data json
      const now = new Date().toISOString();
      const data = { ...allBalanceData, createdAt: now };
      const jsonData = JSON.stringify(data /* , null, 2 */);

      //create directory
      if (!fs.existsSync(`${__dirname}/files`)) {
        fs.mkdirSync(`${__dirname}/files`, { recursive: true });
      }

      //save file
      writeFileSync(`${__dirname}/files/config.json`, jsonData);

      return {
        totalSupply,
        tokenCount,
        balance: +balance / 1e18,
        allTokens,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ error }, HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  //get main data
  async getTotal(addressWallet: string) {
    const address = addressWallet.toLocaleLowerCase();
    try {
      //get Total
      const response = await axios.get(
        `${process.env.URL_API_COINGECKO}coins/ethereum`
      );

      // access the "total_supply" and "circulating_supply" fields
      const totalSupply = response.data.market_data.total_supply;

      //balance
      const balance = await this.web3.eth.getBalance(address);

      //count
      const tokenCount = await this.web3.eth.getTransactionCount(address);
      //create object for json file

      return {
        totalSupply,
        tokenCount,
        balance: +balance / 1e18,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ error }, HttpStatus.TOO_MANY_REQUESTS);
    }
  }
}
