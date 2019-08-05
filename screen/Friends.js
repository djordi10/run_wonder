import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
    ToastAndroid
} from "react-native";
import { Container,Content,Header,Drawer,Left,Right,Body,Title,Text } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar,Avatar,ListItem,Divider,Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { theme, mocks } from '../constants';
import axios from 'axios';

class Friends extends Component {
    state = {
        searchkey: "",
        id: "",
        friend: [],
        friend_pending: [],
        friend_request_count: 0
    };

    componentWillMount(){
        this.getFriend(this)
        this.getFriendPending(this)
        this.getFriendRequest(this)
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
                //this.requestCameraPermission();
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
          // The screen is focused
          // Call any action
          this.getFriend(this)
          this.getFriendPending(this)
          this.getFriendRequest(this)
          console.log(this.setState.friend_request_count)
        });
      }

      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    getFriend = async (ev) =>{
        const headers_conf = {
          'Content-Type': 'application/json',
        }
        const id = await AsyncStorage.getItem('id');
        this.setState({id:id});
        const url = 'http://103.253.25.177/rest_server/api/friend?id='+id;
        console.log(url);
        axios.get(url,headers_conf).then(function (response) {
              const friend = response.data.data;
              const newslice = friend.slice(0, 3);
              console.log(newslice);
              ev.setState({ "friend":newslice }); 
              console.log(response);
              console.log("done");
          })
          .catch(function(error) {
            console.log(error);
            console.log("gagal");
            ev.setState({ "friend":[] });
          });
      }

      getFriendPending = async (ev) =>{
        const headers_conf = {
          'Content-Type': 'application/json',
        }
        const id = await AsyncStorage.getItem('id');
        const url = 'http://103.253.25.177/rest_server/api/friend/pending?id='+id;
        console.log(url);
        axios.get(url,headers_conf).then(function (response) {
              const friend = response.data.data;
              console.log(friend);
              ev.setState({ "friend_pending":friend }); 
              console.log(response);
              console.log("done");
        })
        .catch(function(error) {
        console.log(error);
        console.log("gagal");
        ev.setState({ "friend_pending":[] });
        });
      }

      getFriendRequest = async (ev) =>{
        const headers_conf = {
          'Content-Type': 'application/json',
        }
        const id = await AsyncStorage.getItem('id');
        const url = 'http://103.253.25.177/rest_server/api/friend/request?id='+id;
        console.log(url);
        axios.get(url,headers_conf).then(function (response) {
              const friend = response.data.data;
              ev.setState({ "friend_request_count":friend.length}); 
              console.log(friend.length);
              console.log("done");
        })
        .catch(function(error) {
        console.log(error);
        console.log("gagal");
        ev.setState({ "friend_request_count":0}); 
        });
      }

      addFriend = (ev,id_friend) => {
        const headers_conf = {
            'Content-Type': 'application/json'
        }
        const parameter = {
            'id_user': this.state.id,
            'id_friend':id_friend,
          };
        console.log(parameter);
          axios.post(
            'http://103.253.25.177/rest_server/api/friend', parameter,headers_conf).then(function (response) {   
              console.log(response);
              console.log("done");
              ToastAndroid.showWithGravityAndOffset(
                'Friend Request Has been Sent',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              ev.getFriend(ev);
              ev.getFriendPending(ev);
            }).catch((error) => {
                console.log(error.response);
            });
    }
    
    render() {
        return (
            <Container>
                <Header style={{backgroundColor:'black'}}>
                    <Left>
                        <Button type="clear" icon={<Icon name='md-arrow-back' color="white" size={20} onPress={() => this.props.navigation.goBack()}/>}/>
                    </Left>
                    <Body>
                        <Title>Friends</Title>
                    </Body>
                    <Right>
                        <Button buttonStyle={{backgroundColor:'transparent'}}>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.welcome}>
                    <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.searchkey}
                    containerStyle={{
                        backgroundColor:'black'
                    }}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <ListItem
                        title="Suggested Runners"
                        containerStyle={{height:10,backgroundColor:'black'}}
                        titleStyle={{paddingTop:15,color:'white'}}
                    />
                        <FlatList
                            data={this.state.friend}
                            keyExtractor={(item, index) => item.id_user}
                            renderItem={({ item }) => (
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {}}
                            >
                                <ListItem
                                topDivider
                                bottomDivider
                                titleStyle={{fontSize:20}}
                                leftAvatar={<Avatar
                                            size="medium"
                                            rounded
                                            title={item.username.substring(0,1)}
                                            activeOpacity={0.7}
                                        />}
                                title={item.username}
                                subtitle="Surabaya,Indonesia"
                                rightElement={<Button title='Add Friend' buttonStyle={{borderRadius:100,backgroundColor:'transparent',borderWidth:1.5,borderColor:'red',paddingHorizontal:15,height:35}} titleStyle={{color:'red'}}
                                onPress={() => this.addFriend(this,item.id_user)} activeOpacity={0}></Button>}
                                containerStyle={{height:70}}
                                titleStyle={{fontWeight:'bold',fontSize:20}}
                                />
                            </TouchableOpacity>
                        )}/> 
                    </ScrollView>
                    <ListItem
                        title="See All"
                        rightIcon={<Icon name="md-arrow-forward" size={18}></Icon>}
                        onPress={() => this.props.navigation.navigate('Friendslist')}
                    />
                    <Divider style={{ backgroundColor: 'lightgrey',borderWidth: 1.5,borderColor:'lightgrey' }} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={this.state.friend_pending}
                            keyExtractor={(item, index) => item.id_user}
                            renderItem={({ item }) => (
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {}}
                            >
                                <ListItem
                                topDivider
                                bottomDivider
                                titleStyle={{fontSize:20}}
                                leftAvatar={<Avatar
                                            size="medium"
                                            rounded
                                            title={item.username.substring(0,1)}
                                            activeOpacity={0.7}
                                        />}
                                title={item.username}
                                subtitle="Surabaya,Indonesia"
                                rightElement={<Text style={{color:'red'}}>Pending...</Text>}
                                containerStyle={{height:70}}
                                titleStyle={{fontWeight:'bold',fontSize:20}}
                                />
                            </TouchableOpacity>
                        )}/> 
                    </ScrollView>
                    <ListItem
                        title="Friend Request"
                        badge={{ value: this.state.friend_request_count, textStyle: { color: 'white' }, badgeStyle:{backgroundColor:'red'} }}
                        rightIcon={<Icon name="md-arrow-forward" size={18}></Icon>}
                        onPress={() => this.props.navigation.navigate('Friendsrequest')}
                    />
                </Content>
            </Container>
        );
    }
}
export default withNavigation(Friends);
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {
        backgroundColor: 'white',
    }
    });