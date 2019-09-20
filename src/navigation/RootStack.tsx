import React from "react";
import { Characters, FeedDemo } from "src/screens";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Screens, Colors } from "utils";
import { CharacterDetail } from "src/screens/Characters/Details/CharacterDetail";
import { Image, colors } from "react-native-elements";

export const RootStack = createStackNavigator({
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
    navigationOptions: () => {
      return {
        title: "Details",
        headerStyle: {
          backgroundColor: Colors.purple
        },
        headerTintColor: "#f1f1f1"
      };
    }
  },
  [Screens.Feed]: {
    screen: FeedDemo,
    navigationOptions: {
      title: "FEED"
    }
  }
});

export const Drawer = createAppContainer(
  createDrawerNavigator(
    {
      Characters: {
        screen: RootStack,
        navigationOptions: {
          drawerIcon: (
            <Image
              source={require("../../assets/images/sasuke_sprite.png")}
              width={75}
              height={75}
              borderRadius={15}
              resizeMode="cover"
              style={{ width: 32, height: 32 }}
            />
          )
        }
      },
      News: {
        screen: FeedDemo,
        navigationOptions: {
          drawerIcon: (
            <Image
              source={require("../../assets/images/kisame_sprite.png")}
              borderRadius={32}
              resizeMode="cover"
              style={{ width: 32, height: 32 }}
            />
          )
        }
      }
    },
    {
      drawerWidth: 300,
      edgeWidth: 300,
      drawerPosition: 'left',
      drawerLockMode: 'unlocked',
        
      contentOptions: {
        activeTintColor: Colors.orange,
        // inactiveTintColor: Colors.purpleDark,
        activeBackgroundColor: colors.searchBg,
      }
      // drawerType: "back"
      // navigationOptions: ({ navigation }) => {
      //   console.log("navigation", navigation);
      // }
    }
  )
);
