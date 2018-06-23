import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DeviceScreen from '../screens/DeviceScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: DeviceScreen,
});

 const tabBarIcon = (imageUri, imageUriPress) => {
    return ({tintColor, focused}) => {
      return (
        <Image
          source={focused ? imageUriPress : imageUri}
          style={{
            alignSelf: 'center',
            width: 25,
            height: 25,
          }}
        />
      );
    };
  }

HomeStack.navigationOptions = {
  tabBarLabel: 'Device',
  tabBarIcon: ({ focused }) => (
        <Image
          source={require('../assets/images/bulb.png')}
          style={{
            alignSelf: 'center',
            width: 25,
            height: 25,
          }}
        />

    // <TabBarIcon
    //   focused={focused}
    //   name={
    //     Platform.OS === 'ios'
    //       ? `ios-information-circle${focused ? '' : '-outline'}`
    //       : 'md-information-circle'
    //   }
    // />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  // SettingsStack,
});
