import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,Input,Item } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from "../components/Text";
import Block from "../components/Block";
import { NavigationActions } from 'react-navigation'
import axios from 'axios';
import qs from 'qs';


export default class CreateRaceDateEnd extends Component {

    state = {
        input1: true,
        input2: false,
        input3: false,
        input4: true,
        input5: false,
        input1color: 'red',
        input2color: 'black',
        input3color: 'black',
        input4color: 'red',
        input5color: 'white',
        month: 1,
        date: 1,
        year: 1997,
        hour: 0,
        minute: 0
    };

    componentDidMount(){
        const year = new Date().getFullYear(); //Current Year
        this.setState({year: year});
    }

    handleFocus1 = () => this.setState({input1: true,input2:false,input3:false,input1color: 'red',input2color: 'black',input3color: 'black'})
    handleFocus2 = () => this.setState({input1: false,input2:true,input3:false,input1color: 'black',input2color: 'red',input3color: 'black'})
    handleFocus3 = () => this.setState({input1: false,input2:false,input3:true,input1color: 'black',input2color: 'black',input3color: 'red'})
    
    handleFocus4 = () => this.setState({input4: true,input5:false,input4color: 'red',input5color: 'white'})
    handleFocus5 = () => this.setState({input4: false,input5:true,input4color: 'white',input5color: 'red'})

    DateUp = () => {
        if(this.state.input1){
            this.setState({month: this.state.month+1})
            if(this.state.month > 12){
                this.setState({month: 1})
            }
        }else if(this.state.input2){
            this.setState({date: this.state.date+1})
            if(this.state.date > 31){
                this.setState({date: 1})
            }
        }
    }

    DateDown = () => {
        if(this.state.input1){
            this.setState({month: this.state.month-1})
            if(this.state.month < 2){
                this.setState({month: 12})
            }
        }else if(this.state.input2){
            this.setState({date: this.state.date-1})
            if(this.state.date < 2){
                this.setState({date: 31})
            }
        }else {
            console.log(this.state.year-1);
        }
    }

    TimeUp = () => {
        if(this.state.input4){
            this.setState({hour: this.state.hour+1})
            if(this.state.hour > 24){
                this.setState({hour: 1})
            }
        }else if(this.state.input5){
            this.setState({minute: this.state.minute+1})
            if(this.state.minute > 59){
                this.setState({date: 1})
            }
        }
    }

    TimeDown = () => {
        if(this.state.input4){
            this.setState({hour: this.state.hour-1})
            if(this.state.hour < 2){
                this.setState({hour: 23})
            }
        }else if(this.state.input5){
            this.setState({minute: this.state.minute-1})
            if(this.state.minute < 2){
                this.setState({minute: 59})
            }
        }
    }

    navigateControl = (ev) => {
        const { params } = this.props.navigation.state;//getting parameter from page before
        const racetype = params ? params.race : null;
        const title = params ? params.title : null;
        const distance = params ? params.distance : null;
        const end_date = this.state.year+ "-" + (this.state.month> 9 ? this.state.month : '0'+this.state.month) + "-" +(this.state.date> 9 ? this.state.date : '0'+this.state.date);
        const end_time = (this.state.hour> 9 ? this.state.hour : '0'+this.state.hour)+ ":" + (this.state.minute> 9 ? this.state.minute : '0'+this.state.minute);
        const start_date = params ? params.startdate : null;
        const start_time = params ? params.starttime : null;
        const headers_conf = {
            'Content-Type': 'application/json'
        }
        const parameter = {
            'nama': title,
            'tipe':"Real Time",
            'start_race':start_date,
            'start_time':start_time,
            'end_race':end_date,
            'end_time':end_time,
            'target_race':distance
          };
        console.log(params);
          axios.post(
            'http://103.253.25.177/rest_server/api/Race', parameter,headers_conf).then(function (response) {   
              console.log(response);
              console.log("done");
              ev.props.navigation.popToTop()
            }).catch((error) => {
                console.log(error.response);
            });
    }
    
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='md-arrow-back' color="white" size={20} onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Race</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.welcome}>
                <View
                    style={{
                    alignItems: 'center',
                    height: Dimensions.get('window').height / 2,
                    paddingTop:50
                    }}>
                    <Text style={{color:'black'}}>Set End Date</Text>
                    <View style={{flexDirection:'row',paddingTop:20}}>
                        <Left style={{paddingLeft:10}}>
                        <TouchableOpacity onPress={this.DateDown}>
                            <Icon name="md-arrow-dropdown-circle" size={50} color="#414a4c"></Icon>
                        </TouchableOpacity>
                        <Text></Text>
                        </Left>
                        <Body >
                        <TouchableOpacity onPress={this.handleFocus1}>
                        <Text style={{color:this.state.input1color,fontSize:30}}>{this.state.month < 10 ? '0':''}{this.state.month}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black',fontSize:10}}>Month</Text>
                        </Body>
                        <Body >
                        <TouchableOpacity onPress={this.handleFocus2}>
                        <Text style={{color:this.state.input2color,fontSize:30}}>{this.state.date < 10 ? '0':''}{this.state.date}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black',fontSize:10}}>Date</Text>
                        </Body>
                        <Body >
                        <TouchableOpacity onPress={this.handleFocus3}>
                        <Text style={{color:this.state.input3color,fontSize:30}}>{this.state.year}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black',fontSize:10}}>Year</Text>
                        </Body>
                        <Right style={{paddingRight:10}}>
                        <TouchableOpacity onPress={this.DateUp}>
                        <Icon name="md-arrow-dropup-circle" size={50} color="#414a4c"></Icon>
                        </TouchableOpacity>
                        <Text></Text>
                        </Right>
                    </View>
                </View>
                <View
                    style={{
                    alignItems: 'center',
                    backgroundColor: '#232b2b',
                    height: Dimensions.get('window').height / 2,
                    paddingTop:20
                    }}>
                    <Text style={{color:'white'}}>Set Race End Time</Text>
                    <View style={{flexDirection:'row',paddingTop:20,paddingHorizontal:50}}>
                        <Left>
                        <TouchableOpacity onPress={this.TimeDown}>
                            <Icon name="md-arrow-dropdown-circle" size={50} color="#414a4c"></Icon>
                        </TouchableOpacity>
                        <Text></Text>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={this.handleFocus4}>
                        <Text style={{color:this.state.input4color,fontSize:30}}>{this.state.hour < 10 ? '0':''}{this.state.hour}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'white',fontSize:10}}>Hours</Text>
                        </Body>
                        <Body>
                        <TouchableOpacity onPress={this.handleFocus5}>
                        <Text style={{color:this.state.input5color,fontSize:30}}>{this.state.minute < 10 ? '0':''}{this.state.minute}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'white',fontSize:10}}>Minutes</Text>
                        </Body>
                        <Right>
                        <TouchableOpacity onPress={this.TimeUp}>
                        <Icon name="md-arrow-dropup-circle" size={50} color="#414a4c"></Icon>
                        </TouchableOpacity>
                        <Text></Text>
                        </Right>
                    </View>
                    <Button 
                    style={{
                        alignSelf:'center',
                        textAlign:'center',
                        alignItems: 'center',
                        marginTop:10,
                        paddingLeft:100,
                        paddingRight:100,
                        height:40,
                        borderRadius:20
                    }}
                    onPress={() => this.navigateControl(this)}
                    danger
                    title="NEXT"
                    >
                    <Text>NEXT</Text>
                    </Button>
                </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    logo: {
        width: "100%",
        resizeMode: "contain",
        alignSelf: "center",
        height:100
    },
    });
