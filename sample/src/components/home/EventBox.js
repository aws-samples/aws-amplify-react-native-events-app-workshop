import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text } from "native-base";

export default class EventBox extends Component {
    render() {
        return (
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#DDDDDD' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{ uri: this.props.imageUri }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                <View style={{ flex: 1, padding: 5, justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>{this.props.name}</Text>
                    <Text style={{ fontSize: 12 }}>{this.props.body}, {this.props.time}</Text>
                </View>
            </View>
        )
    }
}
