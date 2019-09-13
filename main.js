const SHA256 = require("crypto-js/sha256"); 

class Block {
    constructor(index, timestamp, data, previousHash = '') { 
        this.index = index; 
        this.previousHash = previousHash; 
        this.timestamp = timestamp; 
        this.data = data; 
        this.hash = this.calculateHash(); 
    } 

    calculateHash() { 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); 
    } 
}

class Blockchain {

//Section 1 Genesis block creation

 constructor() { 
        this.chain = [this.createGenesisBlock()]; 
    } 

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0"); 
    } 

//section 2 adding new blocks

    getLatestBlock() { 
        return this.chain[this.chain.length - 1]; 
    } 

    addBlock(newBlock) { 
        newBlock.previousHash = this.getLatestBlock().hash; 
        newBlock.hash = newBlock.calculateHash();  
        this.chain.push(newBlock); 
    } 

    //section 3 validating the chain

    isChainValid() { 
        for (let i = 1; i < this.chain.length; i++) { 
            const currentBlock = this.chain[i]; 
            const previousBlock = this.chain[i - 1]; 
            if (currentBlock.hash !== currentBlock.calculateHash()) { 
                return false; 
            } 
            if (currentBlock.previousHash !== previousBlock.hash)  {
                    return false; 
                } 
        } 
        return true; 
    } 
}

console.log('Block');

var block = new Block(1,'02/01/2017', 'something');

var blockchain = new Blockchain();

// console.log(blockchain.chain, 'this');

blockchain.addBlock(block);

console.log(blockchain.chain, 'this');

if (blockchain.isChainValid()) {
    console.log('valid');
} else {
    console.log('invalid');
}
