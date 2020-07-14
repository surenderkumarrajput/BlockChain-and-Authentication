const {Blockchain,Transaction} = require("./BlockChain");

const EC = require("elliptic").ec;
const ec=new EC("secp256k1");


//Testing

const privateKey=ec.keyFromPrivate("64c7bd8104e3fc5a28512cffb31581069c9be2d4d351aa373134ae08f863fd4e");
const publicKey=privateKey.getPublic("hex");

let b=new Blockchain();
const tx1 = new Transaction(publicKey,"Monu",50);
tx1.signTransaction(privateKey);
b.addTransaction(tx1);

console.log("Mining");
b.minependingTransaction(publicKey);
b.minependingTransaction(publicKey);


console.log(b.getbalanceofAddress(publicKey));