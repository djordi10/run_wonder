/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { createBottomTabNavigator,createAppContainer } from "react-navigation";
import Profile from './Profile';
import Race from './Race';
import Inbox from './Inbox';
import {PermissionsAndroid,ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import pick from 'lodash/pick';
import Block from "../components/Block";
import Badge from "../components/Badge";
import Card from "../components/Card";
import Text from "../components/Text";
import { theme } from '../constants';
import { Container,Content,Drawer,Header,Left,Body,Title,Right,Button } from 'native-base';
import { CircularProgress } from 'react-native-circular-progress';
import moment from 'moment';
import haversine from 'haversine';
import rgba from 'hex-to-rgba';
import Sidebar from './Sidebar';
const { width, height } = Dimensions.get('window')
const formatDuration = (seconds: number) => moment.utc(moment.duration(seconds, 's').asMilliseconds()).format('mm:ss');

class Home extends Component {

    state = {
        latitude: 0,
        longitude: 0,
        error:13,
        routeCoordinates: [],
        duration: 0,
        distance: 0,
        pace : 0,
        start : false,
        updated: 0,
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

    async startrun(){
        this.setState({
            start: true
        });
        this.interval = setInterval(() => this.setState({ duration: this.state.duration + 1 , pace: (this.state.duration/this.state.distance) }), 1000);
        await this.requestLocationPermission();
                Geolocation.watchPosition(
                    (position) => {
                        console.log(position);
                        const prevLatLngs = {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude
                          }
                        const { routeCoordinates } = this.state;
                        const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
                        console.log(positionLatLngs);
                        if(this.state.updated < 1){
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            error: null,
                            routeCoordinates: routeCoordinates.concat(positionLatLngs),
                            updated: this.state.updated + 1}
                        )}else{
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            error: null,
                            routeCoordinates: routeCoordinates.concat(positionLatLngs),
                            distance: this.state.distance + this.calcDistance(positionLatLngs,prevLatLngs)
                        })
                        }
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    {enableHighAccuracy: true, distanceFilter: 5,showLocationDialog: true,fastestInterval: 1000}
                );
    }

    async stoprun(){
        this.setState({
            start: false,
            duration: 0,
            distance: 0,
            pace: 0,
        });
        clearInterval(this.interval);
        Geolocation.stopObserving();
        console.log(this.state.routeCoordinates);
    }

    calcDistance(newLatLng,prevLatLng) {
        return (haversine(prevLatLng, newLatLng,{unit: 'meter'}) || 0)
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
                //this.requestCameraPermission();
            
    }
    closeDrawer = () => {
        this.drawer._root.close()
        };
    
    openDrawer = () => {
    this.drawer._root.open()
    };
  render() {
    return (
        <Drawer ref={(ref) => { this.drawer = ref }} 
          content={<Sidebar navigation={this.props.navigation} />} 
          onClose={() => this.closeDrawer()} > 
        <Container>
        <Header style={{backgroundColor:'black'}}>
              <Left>
                <Button transparent>
                  <Icon name='md-menu' color="white" size={20} onPress={() => this.openDrawer()}/>
                </Button>
              </Left>
              <Body>
                <Title>Run</Title>
              </Body>
              <Right>
                <Button transparent>
                </Button>
              </Right>
        </Header>
        <Content>
        <ScrollView style={styles.trip} showsVerticalScrollIndicator={false}>
        <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
        <Block center>
          <CircularProgress
            size={214} // can use  with * .5 => 50%
            fill={100} // percentage
            lineCap="round" // line ending style
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text h2 medium>{this.state.distance.toFixed(0)} M</Text>
              </Block>
            )}
          </CircularProgress>
        </Block>
        <Block row>   
        <Block center>
                <Text style={{marginTop: 5}}>Pace</Text>
                <Text primary>{formatDuration(this.state.pace)} </Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />
            <Block center>
                <Text style={{marginTop: 5}}>Duration</Text>
                <Text primary>{formatDuration(this.state.duration)} </Text>
            </Block>
        </Block>
      </Card>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
        <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01
            }}
            showsUserLocation={true}
            followUserLocation={true}>
            <MapView.Polyline
            coordinates={this.state.routeCoordinates}
            strokeWidth={7}
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            />
        </MapView>
        </Card>
        </ScrollView>
        <Block center middle style={styles.endTrip}>
            <Badge color={rgba(theme.colors.accent, '0.1')} size={144}>
            {!this.state.start ? (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.startrun()}>
                <Badge color={theme.colors.accent} size={62}>
                <Icon name="md-play" size={62 / 2.5} color="white" />
                </Badge>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.stoprun()}>
            <Badge color={theme.colors.accent} size={62}>
            <Icon name="md-close" size={62 / 2.5} color="white" />
            </Badge>
            </TouchableOpacity>
            )}
            </Badge>
        </Block>
        </Content>
        </Container>
        </Drawer>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
    Profile: { screen: Profile,
            navigationOptions:{
            tabBarLabel: "Profile",
            tabBarIcon: ({tintColor})=>(
                <Icon name="md-person" size={25} color={tintColor} />
            )
        }
    },
    Races: { screen: Race,
            navigationOptions:{
            tabBarLabel: "Races",
            tabBarIcon: ({tintColor})=>(
                <Icon name="md-trophy" size={25} color={tintColor} />
            )
        }
    },
    Run: { screen: Home,
            navigationOptions:{
            tabBarLabel: "Run",
            tabBarIcon: ({tintColor})=>(
                <Icon name="ios-timer" size={25} color={tintColor} />
            )
        }
    },
    Feed: { screen: Inbox,
            navigationOptions:{
            tabBarLabel: "Feed",
            tabBarIcon: ({tintColor})=>(
                <Icon name="md-home" size={25} color={tintColor} />
            )
        }
    },
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    trip: {
        paddingVertical: theme.sizes.padding / 2,
        padding: theme.sizes.padding,
        backgroundColor: theme.colors.gray4,
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        // flex: 1,
        // width: width,
        // height: height
        height: 352,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'red',
    },
    pinText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    navBar: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: 64,
        width: width,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      navBarText: {
        color: '#19B5FE',
        fontSize: 16,
        fontWeight: "700",
        textAlign: 'center',
        paddingTop: 30
      },
      endTrip: {
        position: 'absolute',
        left: (width - 144) / 2,
        bottom: 0,
      },
      vLine: {
        marginVertical: theme.sizes.base / 2,
        width: 1,
      }
});
