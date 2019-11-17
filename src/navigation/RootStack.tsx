/** @format */

import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  CharacterDetail,
  Characters,
  ClanLadder,
  Rankings,
  NinjaLadder,
  TopLadder,
  NewsFeed,
  News,
} from '../screens';

import { Screens, Colors } from '../utils';
import { colors } from 'react-native-elements';
import { Image, View } from 'react-native';
import React from 'react';

const TAB_ICONS = {
  [Screens.Characters]: require('../../assets/images/seal_icon.png'),
  [Screens.Feed]: require('../../assets/images/konoha_icon.png'),
  [Screens.ClanLadder]: require('../../assets/images/shisui_sharingan.png'),
  [Screens.News]: require('../../assets/images/konoha_icon.png'),
};
const defaultTabIcon = (focused, screen) => (
  <View
    style={{
      backgroundColor: focused ? Colors.orangeLight : colors.grey5,
      borderRadius: 24,
    }}
  >
    <Image
      source={TAB_ICONS[screen]}
      style={{
        width: 24,
        height: 24,
      }}
      resizeMethod="resize"
      resizeMode="contain"
    />
  </View>
);

const defaultNavOpts = {
  headerStyle: {
    backgroundColor: Colors.purple,
  },
  headerTintColor: '#f1f1f1',
};

export const RootStack = createStackNavigator(
  {
    [Screens.Characters]: {
      screen: Characters,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    [Screens.CharactersDetails]: {
      screen: CharacterDetail,

      navigationOptions: {
        title: 'Details',
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOpts,
    },
  }
);

const NewsStack = createStackNavigator(
  {
    [Screens.NewsFeed]: {
      screen: NewsFeed,
      navigationOptions: { title: 'News Feed' },
    },
    [Screens.News]: {
      screen: News,
      navigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam('item').title,
        };
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOpts,
    initialRouteName: Screens.NewsFeed,
  }
);

const LadderStack = createStackNavigator(
  {
    [Screens.NinjaLadder]: {
      screen: NinjaLadder,

      navigationOptions: {
        title: 'Ninja Ladder',
      },
    },
    [Screens.ClanLadder]: {
      screen: ClanLadder,

      navigationOptions: {
        title: 'Clans',
      },
    },
    [Screens.TopsLadder]: {
      screen: TopLadder,

      navigationOptions: {
        title: 'Top Ladder',
      },
    },
    [Screens.Rankings]: {
      screen: Rankings,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: Screens.Rankings,
    defaultNavigationOptions: defaultNavOpts,
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    [Screens.Characters]: {
      screen: RootStack,
      title: 'Characters',
      navigationOptions: () => {
        return {
          title: 'Characters',
          tabBarIcon: ({ focused }) =>
            defaultTabIcon(focused, Screens.Characters),
        };
      },
    },
    // [Screens.Web]: {
    //   screen: WebViewDemo,

    //   navigationOptions: () => {
    //     return {
    //       title: "Web",

    //       tabBarIcon: ({ focused }) => defaultTabIcon(focused, Screens.Feed)
    //     };
    //   }
    // },
    [Screens.Ladder]: {
      screen: LadderStack,
      navigationOptions: () => {
        return {
          title: 'Ladders',
          tabBarIcon: ({ focused }) =>
            defaultTabIcon(focused, Screens.ClanLadder),
        };
      },
    },
    [Screens.NewsFeed]: {
      screen: NewsStack,
      navigationOptions: () => {
        return {
          title: 'News',
          tabBarIcon: ({ focused }) => defaultTabIcon(focused, Screens.News),
        };
      },
    },
  },
  {
    swipeEnabled: true,
    initialRouteName: Screens.Characters,

    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.purple,
      inactiveTintColor: colors.grey3,

      indicatorStyle: {
        borderTopColor: Colors.purpleDark,
      },
    },
  }
);

export const TabNav = createAppContainer(TabNavigator);
