import React from "react";
import { Characters } from "src/screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SearchableBar } from "src/components";
import { Screens } from "utils";
import { CharacterDetail } from "src/screens/Characters/CharacterDetail";

export const RootStack = createAppContainer(
  createStackNavigator({
    [Screens.Characters]: {
      screen: Characters,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
        };
      }
    },
    [Screens.CharactersDetails]: {
      screen: CharacterDetail
    }
  })
);
