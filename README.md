# etherlane_lottery_react
以太坊合约-彩票项目

#### Solidity在线IDE与本地映射

```shell
remixd -s <file directory > --remix-ide https://remix.ethereum.org
```



#### React与Web3交互

React 工具安装

```shell
npm install -g create-react-app
```

##### 创建React项目

```shell
create-react-app lottery-react
```

##### React组件库

```shell
npm install semantic-ui-react
```

##### React样式包

```shell
npm install semantic-ui-css
```

##### Solc安装

```shell
npm install solc@0.4.25
```

##### Web3安装

```shell
npm install web3
```

##### 命令行版的巧克力安装和启动

```shell
npm install ganache-cli
ganache-cli -p 8545
```

##### 以太坊服务商HDWalletProvider插件

```shell
npm install truffle-hdwallet-provider@0.0.3
```

项目直接复制到自己创建的工程就可以运行，记得替换助记词、请求地址、合约地址

上面的插件，也会把package.json上传，可以直接执行该文件添加依赖库

