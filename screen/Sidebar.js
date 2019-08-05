import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import { Avatar } from 'react-native-elements';
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,List,ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

class SideBar extends React.Component {

    state = {
      email: "",
      username: ""
    };

    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };

    async componentWillMount(){
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      this.setState({email:email,username:username});
    }
  render() {
    return (
    <Content style={styles.headerbg}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
          <Avatar
            size="small"
            rounded
            title={this.state.username.substring(0,1)}
            activeOpacity={0.7}
          />
          <Text style={styles.drawerEmail}>djordi@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
      <List>
          <ListItem noBorder noBorder icon button onPress={() => this.props.navigation.navigate('Friends')}>
          <Left>
              <Icon active name="md-contacts" size={20}/>
          </Left>
          <Body>
            <Text>Friends</Text>
          </Body>
          </ListItem>
          <ListItem noBorder icon button onPress={() => this._signOutAsync()}>
          <Left>
              <Icon active name="md-power" size={20}/>
          </Left>
          <Body>
          <Text> Log Out</Text>
          </Body>
          </ListItem>
      </List>
    </Content>
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

export default SideBar;
