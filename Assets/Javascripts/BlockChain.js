//BlockChain Implementation

const EC = require("elliptic").ec;
const ec=new EC("secp256k1");

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
    //calculates the hash of transaction
    calculateHash()
    {
        return SHA256(this.fromaddress+this.toaddress+this.amount).toString();
    }
    //signs the transaction with key 
    signTransaction(signKey)
    {
        if(signKey.getPublic("hex")!=this.fromaddress)
        {
            throw new Error("Cannot sign Transaction for other wallet");
        }
        var hashTx=this.calculateHash();
        const sig = signKey.sign(hashTx,"base64");
        this.signature=sig.toDER("hex");
    }
    //Whether the transaction is true or not
    isValid()
    {
        if(this.fromaddress==null)
        {
            return true;        
        }
        if(!this.signature||this.signature.length==0)
        {
          throw new Error("No signature is assigned");
        }
        const publickey=ec.keyFromPublic(this.fromaddress,"hex");
        return publickey.verify(this.calculateHash(),this.signature);
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
    //checks whether transaction is valid or not
    isValidTransaction()
    {
        for(const tx of this.Transaction)
        {
            if(!tx.isValid())
            {
                return false;
            }
        }
        return true;
    }
}

//Chain Class
class Blockchain{
constructor()
{
     this.chain=[this.createGenesisBlock()]; //Array where chain Data is Stored
     this.pendingTransaction=[]; //Array which holds the pending transaction
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

//Mine the pending transaction
minependingTransaction(miningRewardAddress)
{
let block=new Block(Date.now(),this.pendingTransaction);
block.mineBlock(this.difficulty);

console.log("Block mined Successful");
this.chain.push(block);
this.pendingTransaction=[new Transaction(null,miningRewardAddress,this.miningReward)];
}

//Function which Adds the new transaction
addTransaction(transaction)
{
    if(!transaction.toaddress||!transaction.fromaddress)
    {
        throw new Error("transaction must have to and from address");
    }
    if(!transaction.isValid())
    {
        throw new Error("transaction is not Valid");
    }

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
    if(!currentBlock.isValidTransaction())
    {
        return false;
    }
    else{
        true;
    }
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

module.exports.Blockchain=Blockchain;
module.exports.Transaction=Transaction;
