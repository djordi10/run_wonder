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
import CustomDistance from "../components/CustomDistance";

export default class CreateRaceDetail extends Component {

    state = {
        input1style: 'black',
        input2style: 'black',
        Distance: 10,
        title:'',
        description:''
    };
    handleFocus1 = () => this.setState({input1style: 'red'})
    handleBlur1 = () => this.setState({input1style: 'black'})

    handleFocus2 = () => this.setState({input2style: 'red'})
    handleBlur2 = () => this.setState({input2style: 'black'})

    onUpdate = (value) => {console.log(value); this.setState({'Distance':value})}

    render() {
        const { params } = this.props.navigation.state;
        const racetype = params ? params.race : null;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent  onPress={() => this.props.navigation.goBack()}>
                            <Icon name='md-arrow-back' color="white" size={20}/>
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
                    height: Dimensions.get('window').height / 2,
                    paddingLeft:20,
                    paddingTop:50
                    }}>
                    <Text>Race Title:</Text>
                    <Item style={{marginBottom: 20}}>
                        <Input placeholder="Enter a name for race" 
                        onFocus={this.handleFocus1}
                        onBlur={this.handleBlur1} 
                        style={{fontSize: 15,borderBottomWidth:1,borderBottomColor:this.state.input1style}}
                        value={this.state.title}
                        onChangeText={(value) => this.setState({title: value})}
                        />
                    </Item>
                    <Text style={{}}>Race Description:</Text>
                    <Item style={{marginBottom: 20}}>
                        <Input placeholder="Enter a description for race" 
                        onFocus={this.handleFocus2}
                        onBlur={this.handleBlur2} 
                        style={{fontSize: 15,borderBottomWidth:1,borderBottomColor:this.state.input2style}}
                        value={this.state.description}
                        onChangeText={(value) => this.setState({description: value})}
                        />
                    </Item>
                </View>
                <View
                    style={{
                    alignItems: 'center',
                    backgroundColor: '#232b2b',
                    height: Dimensions.get('window').height / 2,
                    paddingTop:20
                    }}>
                    <Text style={{color:'white'}}>Set the Distance</Text>
                    <CustomDistance onUpdate={this.onUpdate} value={this.state.Distance}></CustomDistance>
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
                    onPress={() => this.props.navigation.navigate('CreateDate',{race: racetype,title: this.state.title,distance:this.state.Distance})}
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
