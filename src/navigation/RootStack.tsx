import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { CharacterDetail, FeedDemo, Characters, ClanLadder } from "../screens";

import { Screens, Colors } from "../utils";
import { colors } from "react-native-elements";
import { Image, View } from "react-native";
import React from "react";

const TAB_ICONS = {
  [Screens.Characters]: require("../../assets/images/seal_icon.png"),
  [Screens.Feed]: require("../../assets/images/konoha_icon.png"),
  [Screens.ClanLadder]: require("../../assets/images/shisui_sharingan.png")
};

export const RootStack = createStackNavigator(
  {
    [Screens.Characters]: {
      screen: Characters,
      navigationOptions: () => {
        return {
          header: null
        };
      }
    },
    [Screens.CharactersDetails]: {
      screen: CharacterDetail,

      navigationOptions: {
        title: "Details"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.purple
      },
      headerTintColor: "#f1f1f1"
    }
  }
);

const TabNavigatior = createBottomTabNavigator(
  {
    [Screens.Characters]: {
      screen: RootStack,
      title: "Characters",
      navigationOptions: ({ navigation }) => {
        console.log(navigation);
        return {
          title: "Characters",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? Colors.orange : colors.grey5,
                borderRadius: 24
              }}
            >
              <Image
                source={TAB_ICONS[Screens.Characters]}
                style={{
                  width: 24,
                  height: 24
                }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          )
        };
      }
    },
    [Screens.Feed]: {
      screen: FeedDemo,
      title: "Feed",
      navigationOptions: ({ navigation }) => {
        console.log(navigation);
        return {
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? Colors.orange : colors.grey5,
                borderRadius: 24
              }}
            >
              <Image
                source={TAB_ICONS[Screens.Feed]}
                style={{
                  width: 24,
                  height: 24
                }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          )
        };
      }
    },
    [Screens.ClanLadder]: {
      screen: ClanLadder,
      navigationOptions: navigation => {
        console.log(navigation);
        return {
          title: "Ladders",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? Colors.orange : colors.grey5,
                borderRadius: 24
              }}
            >
              <Image
                source={TAB_ICONS[Screens.ClanLadder]}
                style={{
                  width: 24,
                  height: 24
                }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          )
        };
      }
    }
  },
  {
    swipeEnabled: true,
    initialRouteName: Screens.Characters,
    tabBarOptions: {
      // activeBackgroundColor: Colors.orange,
      activeTintColor: Colors.purple,
      inactiveTintColor: colors.grey3,

      indicatorStyle: {
        borderTopColor: Colors.purpleDark
      }
    }
  }
);

export const TabNav = createAppContainer(TabNavigatior);
