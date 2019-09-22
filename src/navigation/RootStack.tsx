import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItemsProps
} from "react-navigation";
import { Image } from "react-native-elements";
import { CharacterDetail, FeedDemo, Characters, ClanLadder } from "../screens";

import { Screens, Colors } from "../utils";

const TAB_ICONS = {
  [Screens.Characters]: require("../../assets/images/sasuke_sprite.png"),
  [Screens.Feed]: require("../../assets/images/kisame_sprite.png"),
  [Screens.ClanLadder]: require("../../assets/images/kakashi_sprite.png")
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
    },
    [Screens.Feed]: {
      screen: FeedDemo,
      navigationOptions: {
        title: "FEED"
      }
    },
    [Screens.ClanLadder]: {
      screen: ClanLadder,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require("../../assets/images/itachi_sprite.png")}
            borderRadius={32}
            resizeMode="cover"
            placeholderStyle={{ borderRadius: 32 }}
            style={{ width: 32, height: 32 }}
          />
        ),
        title: "Clan Ladder"
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

const DrawerConfigs = createDrawerNavigator(
  {
    [Screens.Characters]: {
      screen: RootStack
      // navigationOptions: {
      //   drawerIcon: (
      //     <Image
      //       source={require("../../assets/images/sasuke_sprite.png")}
      //       width={75}
      //       height={75}
      //       borderRadius={15}
      //       resizeMode="cover"
      //       style={{ width: 32, height: 32 }}
      //     />
      //   )
      // }
    },
    [Screens.Feed]: {
      screen: FeedDemo
      // navigationOptions: {
      //   drawerIcon: (
      //     <Image
      //       source={require("../../assets/images/kisame_sprite.png")}
      //       borderRadius={32}
      //       resizeMode="cover"
      //       style={{ width: 32, height: 32 }}
      //     />
      //   )
      // }
    },
    [Screens.ClanLadder]: {
      screen: ClanLadder,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require("../../assets/images/itachi_sprite.png")}
            borderRadius={32}
            resizeMode="cover"
            placeholderStyle={{ borderRadius: 32 }}
            style={{ width: 32, height: 32 }}
          />
        )
      }
    }
  },
  {
    drawerWidth: 300,
    edgeWidth: 300,
    drawerPosition: "left",
    drawerLockMode: "unlocked",
    drawerType: "back",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        drawerIcon: (
          <Image
            source={TAB_ICONS[navigation.state.routeName]}
            borderRadius={32}
            resizeMode="cover"
            style={{ width: 32, height: 32 }}
          />
        )
      };
    },
    contentOptions: {
      // activeTintColor: Colors.orange,
      // activeBackgroundColor: colors.searchBg,
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {}
    } as DrawerItemsProps
    // navigationOptions: ({ navigation }) => {
    //   console.log("navigation", navigation);
    // }
  }
);

export const Drawer = createAppContainer(DrawerConfigs);
