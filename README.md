# Simple web server with a GET endpoint

# Back-end
## Getting Started:
`Recommended using the operating system Windows.`
To get started with the Message App, follow these steps:
1. Clone the repository
2. In the terminal enter command `npm i`

## Create file `.env` with variables:

`PORT = 5000`

`ETH_NODE_URL=https://mainnet.infura.io/v3/512db91cbd224c23995ffc2481896889`

`URL_API_COINGECKO=https://api.coingecko.com/api/v3/`

`URL_ALLOW_CROSS=http://localhost:3000`

## Run
1. Run  by running `npm run dev` in the project directory 
2. Go to Front-end repo:  [front-end repo](https://github.com/Ihorhavryliak/web-3-web). (If you do not clone and install Front-end repo)
#
# Features
Simple web server with a GET endpoint

Fetches balances of all ERC20 tokens and the balance of Ethereum native tokens for a given address

Uses CoinGecko API to fetch token addresses

Writes fetched balances to a JSON file with the latest balance and the time it was fetched

Job works with a 1-minute interval

# Technologies Used:

Node.js

TypeScript

web3.js API (https://github.com/web3/web3.js)



