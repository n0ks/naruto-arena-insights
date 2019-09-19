import React from "react";
import { Characters, FeedDemo } from "src/screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Screens, Colors } from "utils";
import { CharacterDetail } from "src/screens/Characters/Details/CharacterDetail";

export const RootStack = createAppContainer(
  createStackNavigator({
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
  })
);
