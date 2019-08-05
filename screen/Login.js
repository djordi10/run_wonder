import React, { Component } from "react";
import {
    Image,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from './config/colors';
import logo from './img/logo.png';
import axios from 'axios';
import qs from 'qs';


class Login extends React.Component {

      state = {
        username: "",
        password: "",
        spinner: false
    };

      login = (ev) =>{ 
        const headers_conf = {
          'Content-Type': 'application/json',
        }
        const params = {
          'username': this.state.username,
          'password':this.state.password,
        };
        console.log(this.state.username);
        console.log(this.state.password);
        this.setState({
          spinner: !this.state.spinner
        });
        axios.post(
          'http://103.253.25.177/rest_server/api/login', params,headers_conf).then(function (response) {
            setTimeout(() => {
              ev.setState({
                spinner: !ev.state.spinner
              });
              const user_data = response.data.data[0];
              AsyncStorage.setItem('username', user_data.username);
              AsyncStorage.setItem('id', user_data.id_user);
              console.log(user_data);
              AsyncStorage.setItem('email', user_data.email);
              ev.props.navigation.navigate('App');
            }, 2000);
            console.log(response);
            console.log("done");
          })
          .catch(function(error) {
            Alert.alert(
              'Login Failed',
              'Wrong Username/Password',
              [
                {text: 'OK', onPress: () =>
                  ev.setState({
                    spinner: !ev.state.spinner
                  })},
              ],
              {cancelable: false},
            );
            console.log(error);
            console.log("gagal");
          });

      }

    render() {
        return (
            <View style={styles.container}>
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
              <Image source={logo} style={styles.logo} />
              <View style={styles.form}>
                <TextInput
                  placeholder="EMAIL"
                  selectionColor={colors.DODGER_BLUE}
                  style={styles.textInput}
                  onChangeText={(value) => this.setState({username: value})}
                  value={this.state.username}
                />
                <TextInput
                  placeholder="PASSWORD"
                  selectionColor={colors.DODGER_BLUE}
                  style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={(value) => this.setState({password: value})}
                  value={this.state.password}
                />
                <Button label="LOGIN" title="LOGIN"
                    onPress={() => this.login(this)}
                    />
              </View>
            </View>
          );
        }
}
export default Login;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      flex: 1,
      width: "100%",
      resizeMode: "contain",
      alignSelf: "center"
    },
    form: {
      flex: 1,
      justifyContent: "center",
      width: "80%"
    },
    textInput: {
      height: 40,
      borderColor: colors.SILVER,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20
    },
    spinnerTextStyle: {
      color: '#FFF'
    }
  });