import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { Container,Content,Header,Left,Right,Body,Button,Title } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import realtime_logo from "./img/realtime-logo.png";
import { CheckBox } from 'react-native-elements';
import { theme } from '../constants';
import Block from "../components/Block";
import Card from "../components/Card";
import Text from "../components/Text";

export default class Createracetype extends Component {

    state = {
        check_real: false,
        check_flex: false,
    };

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
                <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={0.8}
                onPress={() => this.setState({check_real: !this.state.check_real,check_flex: false})}>
                <Card shadow style={{borderWidth: 1,borderColor: 'red'}}>
                    <Block row space="between">
                        <Text spacing={0.5} caption></Text>
                        <Text spacing={0.5} caption medium primary></Text>
                        <CheckBox
                        onPress={() => this.setState({check_real: !this.state.check_real,check_flex: false})}
                        checked={this.state.check_real}
                        />
                    </Block>
                    <Block center>
                    <Image source={realtime_logo} style={styles.logo} /> 
                    </Block>
                    <Block row space="between" style={{marginBottom:10}}>
                        <Text spacing={0.5} caption></Text>
                        <Text accent spacing={0.5} caption size={20}>REAL TIME</Text>
                        <Text spacing={0.5} caption></Text>
                    </Block>
                    <Block row>
                        <Text accent spacing={0.5} size={12} style={{textAlign: 'center'}}>The race start sharp on time, all runner will compete in live</Text>
                    </Block>  
                </Card>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} 
                onPress={() => this.setState({check_flex: !this.state.check_flex,check_real: false})}>
                <Card shadow style={{borderWidth: 1,borderColor: 'black'}}>
                    <Block row space="between">
                        <Text spacing={0.5} caption></Text>
                        <Text spacing={0.5} caption medium primary></Text>
                        <CheckBox
                        onPress={() => this.setState({check_flex: !this.state.check_flex,check_real: false})}
                        checked={this.state.check_flex}
                        />
                    </Block>
                    <Block center>
                    <Image source={realtime_logo} style={styles.logo} /> 
                    </Block>
                    <Block row space="between" style={{marginBottom:10}}>
                        <Text spacing={0.5} caption></Text>
                        <Text spacing={0.5} caption size={20}>FLEX TIME</Text>
                        <Text spacing={0.5} caption></Text>
                    </Block>
                    <Block row>
                        <Text spacing={0.5} size={12} style={{textAlign: 'center'}}>Runner can run anytime within the given time period.</Text>
                    </Block>  
                </Card>
                </TouchableOpacity>
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
                onPress={() => this.props.navigation.navigate('CreateDetail',{race: this.state.check_flex})}
                danger
                title="NEXT"
                >
                <Text>NEXT</Text>
                </Button>
                </ScrollView>
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
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
},
logo: {
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    height:100
},
});