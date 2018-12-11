//1. 引入web3
let Web3 = require('web3')

console.log('window web3 :', window.web3.version) //0.20版本
//2. new 一个web3实例
let web3 = new Web3();

//3. 设置网络
//使用用户自己的provider来填充web3
web3.setProvider(window.web3.currentProvider);

console.log('自己的 web3：',web3.version);

module.exports = web3;