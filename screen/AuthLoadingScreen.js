import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log("jalan");
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const username = await AsyncStorage.getItem('username'); 
      //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      Console.log(username);
    } catch (e) {
      // saving error
      Console.log(e);
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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