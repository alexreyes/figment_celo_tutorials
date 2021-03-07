const ContractKit = require('@celo/contractkit'); 
const Web3 = require('web3'); 

require('dotenv').config(); 

const main = async () => {
	const web3 = new Web3(process.env.REST_URL); 
	const client = ContractKit.newKitFromWeb3(web3); 

	const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY); 

	client.addAccount(account.privateKey); 

	const recepientAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'; 

	const amount = 100000;

	const goldToken = await client.contracts.getGoldToken(); 
	const stableToken = await client.contracts.getStableToken(); 

	const celotx = await goldToken.transfer(recepientAddress, amount).send({from: account.address});

	const cUSDtx = await stableToken.transfer(recepientAddress, amount).send({from: account.address, feeCurrency: stableToken.address});

	const celoReceipt = await celotx.waitReceipt(); 
	const cUSDReceipt = await cUSDtx.waitReceipt(); 

	console.log('CELO Transaction receipt:', celoReceipt);
  	console.log('cUSD Transaction receipt:', cUSDReceipt);
}

main(); 