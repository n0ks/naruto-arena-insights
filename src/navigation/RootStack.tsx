import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  CharacterDetail,
  Characters,
  ClanLadder,
  Rankings,
  NinjaLadder,
  TopLadder,
  WebViewDemo
} from "../screens";

import { Screens, Colors } from "../utils";
import { colors } from "react-native-elements";
import { Image, View } from "react-native";
import React from "react";

const TAB_ICONS = {
  [Screens.Characters]: require("../../assets/images/seal_icon.png"),
  [Screens.Feed]: require("../../assets/images/konoha_icon.png"),
  [Screens.ClanLadder]: require("../../assets/images/shisui_sharingan.png")
};

const defaultNavOpts = {
  headerStyle: {
    backgroundColor: Colors.purple
  },
  headerTintColor: "#f1f1f1"
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
      ...defaultNavOpts
    }
  }
);

const LadderStack = createStackNavigator(
  {
    [Screens.NinjaLadder]: {
      screen: NinjaLadder,

      navigationOptions: {
        title: "Ninja Ladder"
      }
    },
    [Screens.ClanLadder]: {
      screen: ClanLadder,

      navigationOptions: {
        title: "Clans"
      }
    },
    [Screens.TopsLadder]: {
      screen: TopLadder,

      navigationOptions: {
        title: "Top Ladder"
      }
    },
    [Screens.Rankings]: {
      screen: Rankings,
      navigationOptions: {
        // title: "Ladders",
        header: null
      }
    }
  },
  {
    initialRouteName: Screens.Rankings,
    defaultNavigationOptions: defaultNavOpts
  }
);

const TabNavigatior = createBottomTabNavigator(
  {
    [Screens.Characters]: {
      screen: RootStack,
      title: "Characters",
      navigationOptions: () => {
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
    [Screens.Web]: {
      screen: WebViewDemo,
      navigationOptions: () => {
        return {
          title: "Web",
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
    [Screens.Ladder]: {
      screen: LadderStack,
      navigationOptions: () => {
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

    tabBarPosition: "bottom",
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
