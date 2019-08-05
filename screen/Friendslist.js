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
import { theme, mocks } from '../constants';
import axios from 'axios';

export default class Friendslist extends Component {
    state = {
        searchkey: "",
        id: "",
        friend: [],
        friend_pending: []
    };

    componentWillMount(){
        this.getFriend(this)
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
              console.log(friend);
              ev.setState({ "friend":friend }); 
              console.log(response);
              console.log("done");
          })
          .catch(function(error) {
            console.log(error);
            console.log("gagal");
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
                <Header>
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
                        title="List Runners"
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
        backgroundColor: theme.colors.gray4,
    }
    });