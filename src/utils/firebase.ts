/** @format */

import messaging from '@react-native-firebase/messaging';

export const requestPermission = async () => {
  const enabled = await messaging().hasPermission();

  if (enabled) {
    await messaging().subscribeToTopic('news');
  } else {
    let res = await messaging().requestPermission();
    if (res) {
      await messaging().subscribeToTopic('news');
    }
  }

  return messaging().onMessage(async remoteMessage => {
    console.log('MESSAGE RECEIVED', remoteMessage);
  });
};
