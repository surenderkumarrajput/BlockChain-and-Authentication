//BlockChain Implementation

//Bloack Class
const SHA256 = require("crypto-js/sha256");//Importing SHA256
class Block{
    constructor(index,time,data,previousHash) //Constructor taking Data for Blocks
    {
     this.index=index;
     this.time=time;
     this.data=data;
     this.previousHash=previousHash;
     this.hash=this.calculateHash();
    }
    calculateHash() //Calculation of Hash
    {
     return SHA256(this.index+this.time+JSON.stringify(this.data)).toString();
    }
}

//Chain Class
class Blockchain{
constructor()
{
     this.chain=[this.createGenesisBlock()]; //Array where chain Data is Stored
}

//Creation of Genesis block or first block of Chain
createGenesisBlock()
{
    return new Block(0,"0.5","500","01");
}

//Gets the latest block of chain
getLatestBlock()
{
    return this.chain[this.chain.length-1];
}

//Adds the new block in chain
addBlocks(newBlock)
{
newBlock.previousHash=this.getLatestBlock().hash;
newBlock.hash=newBlock.calculateHash();
this.chain.push(newBlock);
}

//Checks whether chain is valid
isChainValid()
{
for (let index = 1; index < this.chain.length; index++) {
    const currentBlock=this.chain[index];
    const previousBlock =this.chain[index-1];
    if(currentBlock.hash!=currentBlock.calculateHash())
    {
     return false;
    }
    if(currentBlock.previousHash!=previousBlock.hash)
    {
        return false;
    }
    return true;
}
}
}

//Testing
let temp=[];
let b=new Blockchain(temp);
let a=new Block(1,"2.2pm","4");
let c = new Block(5,"100pm","100");
b.addBlocks(a);
b.addBlocks(c);
for (let index = 0; index < b.chain.length; index++) {
    console.log(b.chain[index]);
}
console.log(b.isChainValid());