const ContractKit = require('@celo/contractkit'); 
const Web3 = require('web3'); 

require('dotenv').config(); 

const main = async () => {
	const web3 = new Web3(process.env.REST_URL);
	const client = ContractKit.newKitFromWeb3(web3); 

	const chainId = await web3.eth.getChainId()
		.catch((err) => { throw new Error(`could not get chain id: ${err}`); });

	const height = await web3.eth.getBlockNumber()
		.catch((err) => { throw new Error(`Could not get block height: ${err}`); });

	console.log("ChainId: ", chainId); 
	console.log("Block height: ", height); 

	console.log("Successfully connected!");
}

main().catch((err) => {
	console.log(err); 
});