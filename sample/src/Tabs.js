import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

// screens
import HomeScreen from "./screens/home/index";
import AccountScreen from "./screens/account/index";

// Refer to https://reactnavigation.org/docs/en/tab-based-navigation.html for more information about the tab navigation options
// New tab navigation: https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html

export default createAppContainer(MainScreenNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        ),
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  }
));
