// 部署合约文件

let {bytecode, interface} = require('./01-compile')
//1. 引入web3
let Web3 = require('web3')

let HDWalletProvider = require('truffle-hdwallet-provider');

let web3 = new Web3();

// 助记词
let terms = '助记词'
// 连接网络地址

let netIp = 'http://127.0.0.1:8545'
let provider = new HDWalletProvider(terms,netIp);

// web3.setProvider('HTTP://127.0.0.1:7545')
web3.setProvider(provider)

//1. 拼接合约数据 interface
let contract = new web3.eth.Contract(JSON.parse(interface))

let deploy = async () =>{

    let accounts = await web3.eth.getAccounts();

    // 2.拼接bytecode
    let instance = await contract.deploy({
        data: bytecode,   // 合约的bytecode
        // arguments: ['Hello World']  // 给构造函数传递参数，使用数组
    }).send({  // 部署合约
        from: accounts[0],
        gas: '3000000' ,// 不要用默认值，一定要写大一些， 要使用单引号
        // gasPrice: '1',
    })

    // 打印合约部署的地址
    console.log('address: ', instance.options.address)
}

deploy();