const Web3 = require('web3');
const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');
const bluebird = require('bluebird');

async function getTokenInfo() {
    try {
      let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
      const bridgeContractAddress = "0x6f1D09Fed11115d65E1071CD2109eDb300D80A27";
      const abi = [{"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_tokenContract", "type": "address" }, { "indexed": false, "internalType": "string", "name": "_name", "type": "string" }, { "indexed": false, "internalType": "string", "name": "_symbol", "type": "string" }, { "indexed": false, "internalType": "uint8", "name": "_decimals", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "_eventNonce", "type": "uint256" }], "name": "FxOriginatedTokenEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_tokenContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_sender", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "_destination", "type": "bytes32" }, { "indexed": false, "internalType": "bytes32", "name": "_targetIBC", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_eventNonce", "type": "uint256" }], "name": "SendToFxEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_batchNonce", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "_token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_eventNonce", "type": "uint256" }], "name": "TransactionBatchExecutedEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "TransferOwnerEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_newValsetNonce", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_eventNonce", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "_validators", "type": "address[]" }, { "indexed": false, "internalType": "uint256[]", "name": "_powers", "type": "uint256[]" }], "name": "ValsetUpdatedEvent", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_tokenAddr", "type": "address" }], "name": "addBridgeToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "bridgeTokens", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenAddr", "type": "address" }], "name": "checkAssetStatus", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_currentValidators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_currentPowers", "type": "uint256[]" }, { "internalType": "uint8[]", "name": "_v", "type": "uint8[]" }, { "internalType": "bytes32[]", "name": "_r", "type": "bytes32[]" }, { "internalType": "bytes32[]", "name": "_s", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "_theHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_powerThreshold", "type": "uint256" }], "name": "checkValidatorSignatures", "outputs": [], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenAddr", "type": "address" }], "name": "delBridgeToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getBridgeTokenList", "outputs": [{ "components": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }], "internalType": "struct FxBridgeLogic.BridgeToken[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_fxBridgeId", "type": "bytes32" }, { "internalType": "uint256", "name": "_powerThreshold", "type": "uint256" }, { "internalType": "address[]", "name": "_validators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_powers", "type": "uint256[]" }], "name": "init", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_erc20Address", "type": "address" }], "name": "lastBatchNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_validators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_powers", "type": "uint256[]" }, { "internalType": "uint256", "name": "_valsetNonce", "type": "uint256" }, { "internalType": "bytes32", "name": "_fxBridgeId", "type": "bytes32" }], "name": "makeCheckpoint", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenContract", "type": "address" }, { "internalType": "bytes32", "name": "_destination", "type": "bytes32" }, { "internalType": "bytes32", "name": "_targetIBC", "type": "bytes32" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "sendToFx", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenAddr", "type": "address" }], "name": "setFxOriginatedToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "state_fxBridgeId", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state_fxOriginatedToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "state_lastBatchNonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state_lastEventNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state_lastValsetCheckpoint", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state_lastValsetNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state_powerThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_currentValidators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_currentPowers", "type": "uint256[]" }, { "internalType": "uint8[]", "name": "_v", "type": "uint8[]" }, { "internalType": "bytes32[]", "name": "_r", "type": "bytes32[]" }, { "internalType": "bytes32[]", "name": "_s", "type": "bytes32[]" }, { "internalType": "uint256[]", "name": "_amounts", "type": "uint256[]" }, { "internalType": "address[]", "name": "_destinations", "type": "address[]" }, { "internalType": "uint256[]", "name": "_fees", "type": "uint256[]" }, { "internalType": "uint256[2]", "name": "_nonceArray", "type": "uint256[2]" }, { "internalType": "address", "name": "_tokenContract", "type": "address" }, { "internalType": "uint256", "name": "_batchTimeout", "type": "uint256" }, { "internalType": "address", "name": "_feeReceive", "type": "address" }], "name": "submitBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_newValidators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_newPowers", "type": "uint256[]" }, { "internalType": "uint256", "name": "_newValsetNonce", "type": "uint256" }, { "internalType": "address[]", "name": "_currentValidators", "type": "address[]" }, { "internalType": "uint256[]", "name": "_currentPowers", "type": "uint256[]" }, { "internalType": "uint256", "name": "_currentValsetNonce", "type": "uint256" }, { "internalType": "uint8[]", "name": "_v", "type": "uint8[]" }, { "internalType": "bytes32[]", "name": "_r", "type": "bytes32[]" }, { "internalType": "bytes32[]", "name": "_s", "type": "bytes32[]" }], "name": "updateValset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
      const token_abi = [{"constant": true, "inputs": [{"name": "who", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}];

      const bridgeContract = await new web3.eth.Contract(abi, bridgeContractAddress);

      let addresses = [];      

      let i = 0;
      while (true) {
        try {          
          const tokenAddress = await bridgeContract.methods.bridgeTokens(i).call();          
          addresses.push(tokenAddress);
          i++;
        } catch (e) {
          break;
        }
      }      

      const blockNumber = await web3.eth.getBlockNumber();
      const current = new Date();
      const current_timestamp = current.toLocaleString();

      let dataArr = [];

      for (const token of addresses) {
        const tokenContract = await new web3.eth.Contract(token_abi, token);

        const lockedBalance = await tokenContract.methods.balanceOf(bridgeContractAddress).call();
        dataArr.push([current_timestamp, blockNumber, token, lockedBalance]);        
      }      

      const fileName = "fx-bridge token supply.csv";
      if (fs.existsSync(fileName)) {
          const val = convertArrayToCSV(dataArr, { separator: ','});
          fs.appendFile(fileName, val, function (err) {
            if (err) throw err;
            console.log(`Updated ${fileName}`);
          });
      }else{
         const header = ['TimeStamp', 'BlockHeight', 'Registered Token', 'TotalSupply'];
         const val = convertArrayToCSV(dataArr, {
          header,
          separator: ','
        });

        fs.writeFile(fileName, val, (err) => {
          if (err) throw err;
          console.log(`Created ${fileName}`);          
        });
      }
      
    } catch (e) {
      console.log(e)
    }
}

const main = async ()=>{
  let now_start = new Date();
  let counter = 0;
  while(true){
    console.log(`Getting Token Info... (${counter})`);
    await getTokenInfo();
    await bluebird.delay(5000);
    let now = new Date();
    if (now.getTime() - now_start > 60000) break;    
    counter ++;
  }
}

main().then(()=>{
  console.log("Finished successfully");
}).catch(e=>{
  console.log(e);
});