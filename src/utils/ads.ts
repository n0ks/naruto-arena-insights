/** @format */
// tslint:disable:no-console
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import chance from 'chance';
import remoteConfig from '@react-native-firebase/remote-config';

export const loadIntersitialAd = async () => {
  const intersitial = InterstitialAd.createForAdRequest(
    __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-0398075440946116/9116661677',
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['anime', 'manga', 'games'],
    }
  );

  intersitial.load();

  try {
    await remoteConfig().fetchAndActivate();

    const { value } = await remoteConfig().getValue('intersitial_likelihood');

    intersitial.onAdEvent((type, _, __) => {
      if (chance().bool({ likelihood: value as number })) {
        if (type === AdEventType.LOADED) {
          intersitial.show();
        }
      }
    });
  } catch (err) {
    // @ts-ignore
    console.log('err', err);
  }
};
