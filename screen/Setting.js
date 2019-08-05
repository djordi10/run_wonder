import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,List,ListItem,Text } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { theme, mocks } from '../constants';

export default class Setting extends Component {
    render() {
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='md-arrow-back' color="white" size={20} onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Friends</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                </Header>
                <Content>
                <Text>{itemId}</Text>
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
    }
    });