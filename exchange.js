const ContractKit = require('@celo/contractkit');
const Web3 = require('Web3'); 

require('dotenv').config(); 

const main = async () => {
	const web3 = new Web3(process.env.REST_URL); 
	const client = ContractKit.newKitFromWeb3(web3); 

	const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY); 

	client.addAccount(account.privateKey); 

	const stableToken = await client.contracts.getStableToken(); 
	const exchange = await client.contracts.getExchange(); 

	const cUsdBalance = await stableToken.balanceOf(account.address);

	const approveTx = await stableToken.approve(exchange.address, cUsdBalance).send({ from: account.address })    
		.catch((err) => { throw new Error(`Could not send approve transaction: ${err}`) });

	const approveReceipt = await approveTx.waitReceipt(); 

	const goldAmount = await exchange.quoteUsdSell(cUsdBalance); 

	const sellTx = await exchange.sellDollar(cUsdBalance, goldAmount).send({ from: account.address});

	const sellReceipt = await sellTx.waitReceipt(); 

	console.log("approve transaction receipt: ", approveReceipt); 
	console.log('Sell transaction receipt: ', sellReceipt); 
}

main(); 