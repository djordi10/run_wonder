import React, { Component } from "react";
import {
    StyleSheet
} from "react-native";
import { Avatar } from 'react-native-elements';
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,List,ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

class Headers extends React.Component {
      
      closeDrawer = () => {
        this.props.drawer._root.close();
      };
  
      openDrawer = () => {
        this.props.drawer._root.open()
      };
  render() {
    return (
        <Header>
            <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon name='md-menu' color="white" size={20} />
                </Button>
            </Left>
            <Body>
                <Title>Profile</Title>
            </Body>
            <Right>
                <Button transparent>
                </Button>
            </Right>
        </Header>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'column',
      paddingTop: 10, // 24dp (Space for the translucent StatusBar) plus 16dp Android Header paddingTop
      paddingLeft: 16,
      height: 100,
      backgroundColor: "#F5F5F5",
    },
    headerbg: {
      backgroundColor: '#ffffff'
    }
  });

export default Headers;


