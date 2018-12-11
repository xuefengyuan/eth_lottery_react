import React from 'react'
import {Card, Icon, Image, Statistic,Button} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg'/>
        <Card.Content>
            <Card.Header>区块链彩票（深圳站）</Card.Header>
            <Card.Meta>
                <p>管理员地址：{props.manager}</p>
                <p>当前地址：{props.currentAccount}</p>
                <p>上期中奖地址：{props.winner}</p>
            </Card.Meta>
            <Card.Description>每周五八点准时开奖，敬请期待！</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playerCounts} 人参与
            </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance} ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>

        </Card.Content>
        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <p></p>
                <a href='#'>点击查看历史</a>
            </Statistic>
        </Card.Content>
        <p></p>
        <Button animated='fade' color='orange' onClick={props.play} disabled={props.isClicked}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>
        <p></p>
        <Button inverted color='red' onClick={props.draw} disabled={props.isClicked} style={{display:props.isShowBtn}}>
            开奖
        </Button>
        <p></p>
        <Button inverted color='orange' onClick={props.drawback} disabled={props.isClicked} style={{display:props.isShowBtn}}>
            退奖
        </Button>

    </Card>
)

export default CardExampleCard