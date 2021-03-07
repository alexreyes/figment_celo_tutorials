const ContractKit = require('@celo/contractkit'); 
const Web3 = require('web3'); 

require('dotenv').config(); 

const main = async () => {
	const web3 = new Web3(process.env.REST_URL); 
	const client = ContractKit.newKitFromWeb3(web3); 

	const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY); 

	const accountBalances = await client.getTotalBalance(account.address)
		.catch((err) => { throw new Error(`Could not fetch account: ${err}`); });

	console.log('CELO balance: ', accountBalances.CELO.toString(10));
	console.log('cUSD balance: ', accountBalances.cUSD.toString(10));
	console.log('Locked celo balance: ', accountBalances.lockedCELO.toString(10));
	console.log('Pending balance: ', accountBalances.pending.toString(10));

	const nodeInfo = await web3.eth.getNodeInfo()
		.catch((err) => { throw new Error(`Could not fetch node info: ${err}`); });
	
	console.log('Node info: ', nodeInfo); 

	const blocksLatest = await web3.eth.getBlock("latest")
		.catch((err) => { throw new Error(`Could not fetch latest block ${err}`); });
	console.log('latest block: ', blocksLatest); 

	const blocks = await web3.eth.getBlock(100); 
	console.log("Blocks: ", blocks); 

	const transactionCount = await web3.eth.getTransactionCount(account.address);

	console.log('Transaction count: ', transactionCount); 

	const gasEstimate = await web3.eth.estimateGas({
		to: account.address, 
		data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
	});

	console.log("Gas estimate: ", gasEstimate); 

	
}

main().catch((err) => {
	console.log(err);
});