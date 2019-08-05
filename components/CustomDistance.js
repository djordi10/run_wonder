import React, { Component } from "react";
import {
    View,
    TouchableOpacity
} from "react-native";
import {Left,Right,Body } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import Text from "../components/Text";
import PropTypes from 'prop-types';

export default class CustomDistance extends Component {
    state = {
        Distance: 1
    };
    componentDidMount(){
        this.setState({'Distance':this.props.value});
    }
    DistanceUp = () => {this.setState({Distance: this.state.Distance+1});
    setTimeout(()=>{this.props.onUpdate(this.state.Distance)}, 50)}
    DistanceDown = () => {
        if(this.state.Distance > 1){
        this.setState({Distance: this.state.Distance-1})
        setTimeout(()=>{this.props.onUpdate(this.state.Distance)}, 50)
        }
    }
    DistanceUpCountinous= () => {
        this.setState({Distance: this.state.Distance+1});
        setTimeout(()=>{this.props.onUpdate(this.state.Distance)}, 50)
        this.timer = setTimeout(this.DistanceUpCountinous, 200);
    }

    stopTimer = () => {
        clearTimeout(this.timer);
    }

    DistanceDownCountinous= () => {
        if(this.state.Distance > 1){
        this.setState({Distance: this.state.Distance-1});
        setTimeout(()=>{this.props.onUpdate(this.state.Distance)}, 50)
        }
        this.timerd = setTimeout(this.DistanceDownCountinous, 200);
    }

    stopTimerDown = () => {
        clearTimeout(this.timerd);
    }

    render() {
        return (
            <View style={{flexDirection:'row',paddingTop:20,paddingHorizontal:50}}>
                <Left>
                <TouchableOpacity onPress={this.DistanceDown} onLongPress={this.DistanceDownCountinous} onPressOut={this.stopTimerDown}>
                    <Icon name="md-arrow-dropdown-circle" size={50} color="#414a4c"></Icon>
                </TouchableOpacity>
                <Text></Text>
                </Left>
                <Body>
                <Text style={{color:'red',fontSize:30}}>{this.state.Distance < 10 ? '0':''}{this.state.Distance}</Text>
                <Text style={{color:'white',fontSize:10}}>km</Text>
                </Body>
                <Right>
                <TouchableOpacity onPress={this.DistanceUp} onLongPress={this.DistanceUpCountinous} onPressOut={this.stopTimer}>
                <Icon name="md-arrow-dropup-circle" size={50} color="#414a4c"></Icon>
                </TouchableOpacity>
                <Text></Text>
                </Right>
            </View>
        );
    }
}
