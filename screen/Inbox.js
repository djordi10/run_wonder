import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Card,CardItem,Left,Right,Body,Thumbnail,Button,Text,Container,Content,Drawer,Header,Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Sidebar from './Sidebar';

class Inbox extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
      closeDrawer = () => {
        this.props.drawer._root.close();
      };
  
      openDrawer = () => {
        this.props.drawer._root.open()
      };

    render() {
        return ( 
            // <View style={styles.container}>
            //     <Text>Inbox</Text>
            //     <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            // </View>
            <Drawer ref={(ref) => { this.drawer = ref }} 
          content={<Sidebar navigation={this.props.navigation} />} 
          onClose={() => this.closeDrawer()} > 
            <Header>
              <Left>
                <Button transparent>
                  <Icon name='md-menu' color="white" size={20} onPress={() => this.openDrawer()}/>
                </Button>
              </Left>
              <Body>
                <Title>Feed</Title>
              </Body>
              <Right>
                <Button transparent>
                </Button>
              </Right>
            </Header>
            <Container>
            <Content>
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/atom_page_medium/public/thumbnails/image/placeholder-profile_2_0.png?itok=XYUnJJZZ'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://amp.businessinsider.com/images/5a1491edf914c346018b56a4-750-563.jpg'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="md-thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="md-chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          </Content>
          </Container>
          </Drawer>
        );
    }
}
export default Inbox;
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    });