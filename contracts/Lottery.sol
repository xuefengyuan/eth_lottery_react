pragma solidity ^0.4.24;


contract Lottery{
    
    // 1. 管路员：负责开奖和退奖
    // 2. 彩民池：address[] players
    // 3. 当前期数：round，每期结束后加一
    //在前端，可以通过访问函数得到manager，round，winner的信息
    
    address public manager;   // 管理员地址
    address[] public players; // 购买地址集合
    uint256 public round;     // 当前期数
    address public winner;    // 中奖人地址
    
     // 构造函数
    constructor() public{
        manager = msg.sender;
    }
    
    //1. 每个人可以投多次，但是每次只能投1 ether
    function play() payable public{
        require(msg.value == 1 ether);
        //2. 把参与者加入到彩民池中
        players.push(msg.sender);
    }
    
    // 开奖函数：
    // 目标：从彩民池（数组）中找到一个随机彩民（找一个随机数）
    // 找到一个特别大的数（随机）， 对我们的彩民数组长度求余数。
    // 用哈数值来实现大的随机数。 v3
    // 哈希内容的随机：当前时间，区块的挖矿难度，彩民数量，作为输入
    
    function kaiJiang() onlyManager public{
        
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 v2 = keccak256(v1);
        uint256 v3 = uint256(v2);
        
        uint256 index = v3 % players.length;
        // 得到中奖者
        winner = players[index];        
        // 中奖的奖金
        uint256 money = address(this).balance * 90 / 100;
        // 手续费
        uint256 money1 = address(this).balance - money;
        
        winner.transfer(money);
        manager.transfer(money1);
        
        round ++;
        delete players;
    }
    
    // 退奖逻辑：
    // 1. 遍历palyers数组，逐一退款1ether
    // 2. 期数加一
    // 3. 彩民池清零
    
    // 调用者花费手续费（管理员）
    function tuiJiang() onlyManager public {
        for (uint256 i = 0; i < players.length;i++){
            players[i].transfer(1 ether);
        }
        round ++;
        delete players;
    }
    
    // 判断管理员权限
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    
     // 获取彩民人数 
    function getPlayersCount() public view returns(uint256){
        return players.length;
    }

    // 获取余额
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    // 获取彩民数组
    function getPlayers() public view returns(address[]){
        return players;
    }
}