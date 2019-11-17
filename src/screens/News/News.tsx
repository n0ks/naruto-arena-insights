/** @format */

import React, { useEffect } from 'react';
import { ScrollView, Dimensions, Linking } from 'react-native';
import { NavigationType, Colors, trackEvent } from '@app/utils';
import HTML from 'react-native-render-html';
import chance from 'chance';

import { DText, BannerAdsLarge } from '@app/components';

interface Props extends NavigationType {
  html: any;
}

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;

const CUSTOM_STYLES = {
  tagsStyles: {
    p: { color: '#000', paddingBottom: 24 },
    span: { color: '#000' },
    br: { color: '#000' },
    rawtext: { color: '#000' },
  },
  imagesMaxWidth: Dimensions.get('window').width,
};

const CUSTOM_RENDERERS = {
  renderers: {
    rawtext: {
      renderer: (_, __, ___, passprops) => {
        return (
          <DText
            style={{ color: '#000', lineHeight: 30 }}
            key={chance().guid()}
          >
            {passprops.data}
          </DText>
        );
      },
    },
  },
};

const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  debug: false,
  textSelectable: true,
  onLinkPress: (_, link) => {
    Linking.openURL(link);
  },
  alterNode: node => {
    if (node.name === 'p' && node.children[0]?.name === 'br') {
      node = {};
      return node;
    }
  },
};

export const News: React.SFC<Props> = ({ navigation }) => {
  const html = navigation.getParam('item');

  useEffect(() => {
    trackEvent('reading_news', { title: html?.title });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
        padding: 24,
      }}
    >
      <HTML
        containerStyle={{ flex: 1 }}
        html={html.content}
        {...CUSTOM_STYLES}
        {...DEFAULT_PROPS}
        {...CUSTOM_RENDERERS}
      />
      <BannerAdsLarge />
    </ScrollView>
  );
};
