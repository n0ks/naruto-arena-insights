/** @format */

import { View } from 'react-native';

import React from 'react';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

export const BannerAdsSmart = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BannerAd
        unitId={
          __DEV__ ? TestIds.BANNER : 'ca-app-pub-0398075440946116/2807593568'
        }
        size={BannerAdSize.SMART_BANNER}
      />
    </View>
  );
};

export const BannerAdsLarge = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BannerAd
        unitId={
          __DEV__ ? TestIds.BANNER : 'ca-app-pub-0398075440946116/2807593568'
        }
        size={BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
};
