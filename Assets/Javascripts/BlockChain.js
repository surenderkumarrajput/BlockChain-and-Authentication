//BlockChain Implementation
const SHA256 = require("crypto-js/sha256");//Importing SHA256

//Transaction Class
class Transaction
{
    constructor(fromaddress,toaddress,amount)
    {
        this.fromaddress=fromaddress;
        this.toaddress=toaddress;
        this.amount=amount;
    }
}
//Block Class
class Block{
    constructor(time,Transaction,previousHash) //Constructor taking Data for Blocks
    {
     this.time=time;
     this.Transaction=Transaction;
     this.previousHash=previousHash;
     this.hash=this.calculateHash();
     this.nonce=0;
    }
    //Calculates a hash
    calculateHash() //Calculation of Hash
    {
     return SHA256(this.time+JSON.stringify(this.Transaction)+this.nonce).toString();
    }

    //Mine a block
    mineBlock(difficulty)
    {
        while(this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0"))
        {
            this.hash=this.calculateHash();
            this.nonce++;
        }
        console.log("Block mined "+this.hash);
    }
}

//Chain Class
class Blockchain{
constructor()
{
     this.chain=[this.createGenesisBlock()]; //Array where chain Data is Stored
     this.pendingTransaction=[];
     this.miningReward=100;
     this.difficulty=2;
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
minependingTransaction(miningRewardAddress)
{
let block=new Block(Date.now(),this.pendingTransaction);
block.mineBlock(this.difficulty);

console.log("Block mined Successful");
this.chain.push(block);
this.pendingTransaction=[new Transaction(null,miningRewardAddress,this.miningReward)];
}

//Function which creates the new transaction
createTransaction(transaction)
{
this.pendingTransaction.push(transaction);
}

//Get Balance of particular address
getbalanceofAddress(address)
{
let balance=0;
for(const block of this.chain)
{
    for(const trans of block.Transaction)
    {
        if(trans.fromaddress==address)
        {
            balance-=trans.amount;
        }
        if(trans.toaddress==address){
            balance+=trans.amount;
        }
    }
}
return balance;
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
let b=new Blockchain();
b.createTransaction(new Transaction("12","2",1));
console.log("Mining");
b.minependingTransaction("SonuMiner");
console.log("Mining");
b.minependingTransaction("SonuMiner");

console.log(b.getbalanceofAddress("SonuMiner"));