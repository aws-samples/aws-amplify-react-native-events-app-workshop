import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import AccountScreen from '../screens/AccountScreen';
import EventScreen from '../screens/EventScreen';
import ChatScreen from '../screens/ChatScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Create: CreateScreen,
  Event: EventScreen,
  Chat: ChatScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle`
          : 'md-information-circle'
      }
    />
  )
};

HomeStack.path = '';

const AccountStack = createStackNavigator({
  Account: AccountScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

AccountStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AccountStack
});

tabNavigator.path = '';

export default tabNavigator;
