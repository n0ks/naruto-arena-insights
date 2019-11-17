/** @format */
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import chance from 'chance';

export const loadIntersitialAd = () => {
  const intersitial = InterstitialAd.createForAdRequest(
    'ca-app-pub-0398075440946116/9116661677',
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['anime', 'manga', 'games'],
    }
  );

  if (chance().bool({ likelihood: 33 })) {
    intersitial.load();
    intersitial.onAdEvent((type, _, __) => {
      if (type === AdEventType.LOADED) {
        intersitial.show();
      }
    });
  }
};
