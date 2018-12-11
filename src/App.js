import React, {Component} from 'react';
import CardExampleCard from './display/ui'

let web3 = require('./utils/initWeb3')
let lotteryInstance = require('./eth/lotteryInstance')

class App extends Component {

    constructor() {
        super();
        this.state = {
            manager: '', // 管理员地址
            round: '',      // 开奖期数
            winner: '',   // 中奖人地址
            playerCounts: 0, // 参与人数
            balance: 0,  // 投注金额
            players: [], // 投注地址集合
            currentAccount: '', // 当前地址
            isShowBtn: '',
        }
    }


    // 内置钩子函数，在页面渲染之后自动调用(卸载钩子函数)
    componentDidMount() {

    }

    //内置钩子函数，在页面渲染之前调用
    async componentWillMount() {
        //获取当前的所有地址
        let accounts = await web3.eth.getAccounts()
        let manager = await lotteryInstance.methods.manager().call()
        console.log("hello test ", manager)
        let round = await lotteryInstance.methods.round().call()
        let winner = await lotteryInstance.methods.winner().call()
        console.log("hello winner ", winner)
        let playerCounts = await lotteryInstance.methods.getPlayersCount().call()

        //单位是wei，我们需要转换为ether单位
        let balanceWei = await lotteryInstance.methods.getBalance().call()
        //从wei单位转换为'ether'单位
        let balance = web3.utils.fromWei(balanceWei, 'ether')

        let players = await lotteryInstance.methods.getPlayers().call()

        // let isShowBtn : accounts[0] === manager ? 'inline':'none',

        this.setState({
            // manager: manager,
            manager,
            round,
            winner,
            playerCounts,
            balance,
            players,
            currentAccount: accounts[0],
            isClicked: false,
            isShowBtn: accounts[0] === manager ? 'inline' : 'none'
        })
    }

    // 投注
    play = async () => {
        console.log('投注了')
        this.setState({isClicked: true})
        try {
            let accounts = await web3.eth.getAccounts();

            await lotteryInstance.methods.play().send({
                from: accounts[0],
                // from: this.state.currentAccount,
                // value: 1 * 10 ** 18,
                value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            });
            // 让界面重新加载
            this.setState({isClicked: false})
            window.location.reload(true)
            alert('投注成功')
        } catch (e) {
            this.setState({isClicked: false})
            window.location.reload(true)
            alert('投注失败')
        }

    }

    // 开奖
    draw = async () => {
        console.log('开奖了')
        this.setState({isClicked: true})
        try {
            let accounts = await web3.eth.getAccounts();

            await lotteryInstance.methods.kaiJiang().send({
                from: accounts[0],
            });
            // 让界面重新加载
            this.setState({isClicked: false})
            window.location.reload(true)
            alert('开奖成功')
        } catch (e) {
            this.setState({isClicked: false})
            window.location.reload(true)
            alert('开奖失败')
        }
    }

    // 退奖
    drawback = async () => {
        console.log('退奖了')
        this.setState({isClicked: true})
        try {
            let accounts = await web3.eth.getAccounts();

            await lotteryInstance.methods.tuiJiang().send({
                from: accounts[0],
            });
            this.setState({isClicked: false})
            // 让界面重新加载
            window.location.reload(true)
            alert('退奖成功')
        } catch (e) {
            this.setState({isClicked: false})
            window.location.reload(true)
            alert('退奖失败')
        }

    }

    render() {
        return (
            <div>
                <CardExampleCard
                    manager={this.state.manager}
                    round={this.state.round}
                    winner={this.state.winner}
                    balance={this.state.balance}
                    players={this.state.players}
                    playerCounts={this.state.playerCounts}
                    currentAccount={this.state.currentAccount}
                    play={this.play}
                    isClicked={this.state.isClicked}
                    draw={this.draw}
                    drawback={this.drawback}
                    isShowBtn={this.state.isShowBtn}
                />
            </div>
        );
    }

}

export default App;
