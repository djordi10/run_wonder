import React from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer, createDrawerNavigator } from 'react-navigation';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './Login';
import Home from './Home';
import Inbox from './Inbox'; 
import Setting from './Setting'; 
import Friends from './Friends';
import Friendslist from './Friendslist'; 
import Friendsrequest from './Friendsrequest'; 
import Createracetype from './Createracetype';
import CreateRaceDate from './CreateRaceDate';
import CreateRaceDetail from './CreateRaceDetail';
import CreateRaceDateEnd from './CreateRaceDateEnd';

const AppStack = createStackNavigator({
  Home: { screen: Home},
  detailrace: { screen:Setting},
  CreateSelect: {screen:Createracetype},
  CreateDetail: {screen:CreateRaceDetail},
  CreateDate: {screen:CreateRaceDate},
  CreateDateEnd: {screen:CreateRaceDateEnd},
  Friendsrequest: {screen:Friendsrequest},
  Friendslist: {screen:Friendslist},
  Friends: {screen:Friends},
    },{
      initialRouteName: 'Home',
      headerMode: 'none'
});


const LoginStack = createStackNavigator({
    Login: { screen:Login},
    },{initialRouteName: 'Login',
    headerMode: 'none'
});


class AuthLoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
          const username = await AsyncStorage.getItem('username'); 
          this.props.navigation.navigate(username ? 'App' : 'Auth');
          console.log(username);
        } catch (e) {
          // saving error
          console.log(e);
        }
      }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        </View>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(32, 53, 70)',
      flexDirection: 'column',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    title: {
      color: '#f7c744',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 5,
      opacity: 0.9
    }
})

export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: LoginStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));