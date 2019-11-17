/** @format */

import { View } from 'react-native';

import React from 'react';

import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';

export const BannerAdsSmart = () => {
  return (
    <View style={{ paddingVertical: 16 }}>
      <BannerAd
        unitId={'ca-app-pub-0398075440946116/2807593568'}
        size={BannerAdSize.SMART_BANNER}
      />
    </View>
  );
};

export const BannerAdsLarge = () => {
  return (
    <View style={{ paddingVertical: 16 }}>
      <BannerAd
        unitId={'ca-app-pub-0398075440946116/2807593568'}
        size={BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
};
