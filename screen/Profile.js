import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    PermissionsAndroid
} from "react-native";
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,List,ListItem } from "native-base";
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from "../components/Block";
import Badge from "../components/Badge";
import Card from "../components/Card";
import Text from "../components/Text";
import { Avatar } from 'react-native-elements';
import { theme, mocks } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import Sidebar from './Sidebar';
import axios from 'axios';

const { width } = Dimensions.get('window').width;


class Profile extends Component {

    state = {
      latitude: 0,
      longitude: 0,
      address: {kota:'aa',negara:''}
    };

    async requestLocationPermission()
    {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };

    closeDrawer = () => {
      this.drawer._root.close()
    };

    openDrawer = () => {
      this.drawer._root.open()
    };

    async componentDidMount(){
      await this.requestLocationPermission();
      //Geolocation.getCurrentPosition(info => console.log(info));
      Geolocation.getCurrentPosition(
          (position) => {
              console.log(position);
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
              console.log(this.state.latitude);
              setTimeout(() => {
                this.getAddress(this);
              }, 100);
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          }
      );
    }

    getAddress = (ev) =>{
      const headers_conf = {
        'Content-Type': 'application/json',
      }
      const url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+this.state.latitude+'&lon='+this.state.longitude+'&accept-language=id'
      axios.get(url,headers_conf).then(function (response) {
          const place = response.data.address;
          ev.setState({address:{kota:place.city,negara:place.country}})
          console.log(place);
      })
      .catch(function(error) {
        console.log(error);
        console.log("gagal");
      });
    }

    render() {
        return (

          <Drawer ref={(ref) => { this.drawer = ref }} 
          content={<Sidebar navigation={this.props.navigation} />} 
          onClose={() => this.closeDrawer()} > 
            
            <Header style={{backgroundColor:'black'}}>
              <Left>
                <Button transparent>
                  <Icon name='md-menu' color="white" size={20} onPress={() => this.openDrawer()}/>
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
            <Container>
            <Content>
                <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Card shadow style={{ paddingVertical: theme.sizes.padding}}>
                    <Block>
                        <Block center>
                        <Avatar size="large" rounded 
                        source={{
                            uri:
                            'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                        }}
                        showEditButton
                        />
                        <Text body size={18} spacing={0.6} style={{ marginTop: 5 }}>Setiawan Djordi</Text>
                        <Text body spacing={0.6} style={{ marginTop: 5 }}>{this.state.address.kota}, {this.state.address.negara}</Text>
                        </Block>
                        <Block color="gray" style={styles.hLine} />
                        <Block row>
                        <Block center>
                            <Text size={18} spacing={0.6} primary style={{ marginBottom: 6 }}>10 km</Text>
                            <Text body spacing={0.7}>All Distance</Text>
                        </Block>

                        <Block flex={false} color="gray" style={styles.vLine} />

                        <Block center>
                            <Text size={18} spacing={0.6} primary style={{ marginBottom: 6 }}>1 km</Text>
                            <Text body spacing={0.7}>This Month</Text>
                        </Block>
                        </Block>

                        <Block color="gray" style={styles.hLine} />
                        <Block center>
                                <Text size={25} spacing={0.6} style={{ marginBottom: 6,color: 'grey' }}>Activites and Stats</Text>
                        </Block>
                        <Block color="gray" style={styles.hLine} />
                        <Block row>
                        <Block center>
                            <Text size={18} spacing={0.6} primary style={{ marginBottom: 6 }}>STATISTICS</Text>
                            <Text body spacing={0.7}>10:20/km</Text>
                            <Text body spacing={0.7}>average pace</Text>
                        </Block>

                        <Block flex={false} color="gray" style={styles.vLine} />
                        <Block center>
                            <Text size={18} spacing={0.6} primary style={{ marginBottom: 6 }}>ACTIVITIES</Text>
                            <Text body spacing={0.7}>1</Text>
                            <Text body spacing={0.7}>total runs</Text>
                        </Block>
                        </Block>
                    </Block>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
              
            </Content>
            </Container>
          </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    welcome: {
      paddingVertical: theme.sizes.padding,
      paddingHorizontal: theme.sizes.padding,
      backgroundColor: 'white',
    },
    // horizontal line
    hLine: {
      marginVertical: theme.sizes.base * 2,
      width:width,
      height: 1,
    },
    // vertical line
    vLine: {
      marginVertical: theme.sizes.base / 2,
      width: 1,
    },
    awards: {
      padding: theme.sizes.base,
      marginBottom: theme.sizes.padding,
    },
    moreIcon: {
      width: 16,
      height: 17,
      position: 'absolute',
      right: theme.sizes.base,
      top: theme.sizes.base,
    },
    startTrip: {
      position: 'absolute',
      left: (width - 144) / 2,
      bottom: 0,
    },
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
export default Profile;