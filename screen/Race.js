import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import { SearchBar,Avatar,List } from "react-native-elements";
import { Container,Content,Header,Drawer,Left,Right,Body,Button,Title,ListItem,CardItem,Fab } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import Block from "../components/Block";
import Badge from "../components/Badge";
import Card from "../components/Card";
import Text from "../components/Text";
import { theme, mocks } from '../constants';
import rgba from 'hex-to-rgba';
import moment from "moment";
import Sidebar from './Sidebar';
import axios from 'axios';
import qs from 'qs';
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get('window');

class Race extends Component {

    state = {
      races: [],
      racesbackup: [],
      searchkey: "",
      isFetching: false
    };
  
    closeDrawer = () => {
      this.drawer._root.close()
    };
  
    openDrawer = () => {
      this.drawer._root.open()
    };

    updateSearch = search => {
      this.setState({ searchkey:search });
      let text = search.toLowerCase()
      let racelist = this.state.racesbackup
      let filterRaces = racelist.filter(item => {
        if(item.Nama_Race.toLowerCase().match(text)) {
          return item
        }
      })
      this.setState({ races: filterRaces })
    };

    componentDidMount() {
      // Instead of navigator.geolocation, just use Geolocation.
              //this.requestCameraPermission();
      this.focusListener = this.props.navigation.addListener("didFocus", () => {
        // The screen is focused
        // Call any action
      this.getRaces(this); 
      });
    }

    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }

    _onRefresh(){
      console.log("jalan")
      this.setState({isFetching: true});
      this.getRaces(this);
    }

    getRaces = (ev) =>{
      const headers_conf = {
        'Content-Type': 'application/json',
      }
      axios.get(
        'http://103.253.25.177/rest_server/api/race',headers_conf).then(function (response) {
            const races = response.data.data;
            console.log(races);
            ev.setState({ "races":races }); 
            ev.setState({"racesbackup":races });
            console.log(response);
            console.log("done");
            ev.setState({isFetching: false});
        })
        .catch(function(error) {
          console.log(error);
          console.log("gagal");
        });
    }

    onRefresh() {
      this.setState({ isFetching: true }, function() { this.getRaces() });
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
            <Content 
            refreshControl={
            <RefreshControl
            refreshing = {this.state.isFetching}
            onRefresh={this._onRefresh.bind(this)}/>
            }>
                <SearchBar
                lightTheme
                platform='android'
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.searchkey}
            />
            <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
            <FlatList
            data={this.state.races}
            keyExtractor={(item, index) => item.Id_Race}
            renderItem={({ item }) => (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('friends',{itemId: item.Id_Race})}
            >
              <Card shadow>
                <Block row space="between" style={{marginBottom:10}}>
                        <Text spacing={0.5} caption></Text>
                        <Text spacing={0.5} caption>{item.Nama_Race}</Text>
                        <Text spacing={0.5} caption></Text>
                </Block>
                <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
                <Text spacing={0.5} caption>Target Run</Text>
                <Text spacing={0.5} caption medium primary>{item.Target_Race} KM</Text>
                <Text spacing={0.5} caption>{item.Tipe_Race}</Text>
                </Block>
                <Block row center>
                <Badge color={rgba(theme.colors.accent, '0.2')} size={14} style={{ marginRight: 8 }}>
                    <Badge color={theme.colors.accent} size={8} />  
                </Badge>
                <Text spacing={0.5} color="gray">Start {moment(item.Start_Race).format("MMM DD,YYYY")}</Text>
                
                </Block>

                <Block row center style={{ paddingVertical: 4 }}>
                <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
                </Block>
                {item.Tipe_Race == "Real Time" ? (
                <Block row center>
                <Badge color={rgba(theme.colors.primary, '0.2')} size={14} style={{ marginRight: 8 }}>
                    <Badge color={theme.colors.primary} size={8} />  
                </Badge>
                <Text spacing={0.5} color="gray">End  {moment(item.End_Race).format("MMM DD,YYYY")}</Text>
                </Block>
                ): ( <Block row center>
                    <Badge color={rgba(theme.colors.primary, '0.2')} size={14} style={{ marginRight: 8 }}>
                      <Badge color={theme.colors.primary} size={8} />  
                    </Badge>
                    <Text spacing={0.5} color="gray">End  {moment(item.Start_Race).format("MMM DD,YYYY")} - {item.End_Time}</Text>
                     </Block>)}
              </Card>
            </TouchableOpacity>
            )}/>
            </ScrollView>
            </Content>
            <Fab
                active="true"
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.props.navigation.navigate('CreateSelect')}>
                <Icon name="md-add" />
            </Fab>
            </Container>
            </Drawer>
        );
    }
}
export default withNavigation(Race);
const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  }
});