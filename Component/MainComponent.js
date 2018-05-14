import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container, Card, Content, Input, Item, Button, Icon} from 'native-base';
import SendSMS from './SmsAPI/SmsAPI.js';

const styles = StyleSheet.create({
    row: {
        margin: 5,
        height: 30
    },
    rowLeft:{
        flex: 1,
        color:'black',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowRight:{
        flex: 4
    }
});

export default class MainComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            Content: 'Hello! I am MTAZero!',
            Number: '0899836302',
            StatusSending: 'Waiting'
        };
    }

    Send = async(number, content) => {
        await SendSMS(number, content);
        this.setState({StatusSending: 'Sending'});  
    }

    render(){
        return(
            <Container>
                <View style={{height: 50,marginTop: 20}}>
                    <Text style={{textAlign:'center', fontSize: 30, fontWeight:'bold', color:'black'}}>
                            SMS AGENT
                    </Text>
                </View>
                <View style={[{flexDirection: 'row'}, styles.row]}>
                    <Text style={styles.rowLeft}>Number</Text> 
                    <Item regular style={styles.rowRight}>
                        <Input defaultValue={this.state.Number} keyboardType = 'numeric' value={this.state.Number} onChangeText={(z) => this.setState({Number: z}) }/>
                    </Item>
                </View>
                <View style={[{flexDirection: 'row'}, styles.row]}>
                    <Text style={styles.rowLeft}>Content</Text> 
                    <Item regular style={styles.rowRight}>
                        <Input value={this.state.Content} onChangeText={(z) => this.setState({Content: z}) }/>
                    </Item>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginTop: 10}}>
                    <Button iconLeft success onPress = {() => this.Send(this.state.Number, this.state.Content)}>
                        <Icon name='send' />
                        <Text style={{marginLeft: 10, marginRight: 20, color: 'white', fontSize: 14}}>Send Sms</Text>
                    </Button>
                </View>

                <Text>Status : {this.state.StatusSending}</Text>
            </Container>
        );
    }
}