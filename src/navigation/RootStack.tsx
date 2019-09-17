import React from "react";
import { Characters } from "src/screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SearchableBar } from "src/components";

export const RootStack = createAppContainer(
  createStackNavigator({
    CharactersScreen: {
      screen: Characters,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
        };
      }
    }
  })
);
