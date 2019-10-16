/** @format */

import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { NavigationType, Colors } from '../../utils';
import HTML from 'react-native-render-html';

import { DText } from '@app/components';
interface Props extends NavigationType {
  html: any;
}

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;

const CUSTOM_STYLES = {
  tagsStyles: {
    p: { color: '#000' },
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
        // console.log(passprops);
        return (
          <DText style={{ color: '#000' }} key={Math.random.toString()}>
            {passprops.data}
          </DText>
        );
      },
    },
  },
};

const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  // renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  debug: false,
};

export const News: React.SFC<Props> = ({ navigation }) => {
  const html = navigation.getParam('item');

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
        padding: 24,
        flexGrow: 1,
      }}
    >
      <HTML
        html={html.content}
        {...CUSTOM_RENDERERS}
        {...CUSTOM_STYLES}
        {...DEFAULT_PROPS}
      />
    </ScrollView>
  );
};
