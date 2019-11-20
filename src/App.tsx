/** @format */

import React from 'react';
import { YellowBox } from 'react-native';
import { TabNav } from './navigation';
import { ThemeProvider } from 'react-native-elements';
import { theme, Screens } from './utils';
import Analytics from 'appcenter-analytics';
import Push from 'appcenter-push';
import { NavigationActions } from 'react-navigation';

YellowBox.ignoreWarnings([
  'react-devtools agent got no connection',
  'is deprecated',
  'Warning: Failed prop type',
  'VirtualizedLists',
  'Warning: ',
]);

(async () => {
  if (__DEV__) {
    await Analytics.setEnabled(false);
  }
})();

export const App = () => {
  Push.setListener({
    onPushNotificationReceived: ({ message, customProperties }) => {
      if (message === null && customProperties.type === 'news') {
        NavigationActions.navigate({ routeName: Screens.NewsFeed });
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TabNav />
    </ThemeProvider>
  );
};
