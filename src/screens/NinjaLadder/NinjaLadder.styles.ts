/** @format */

import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { colors } from 'react-native-elements';

interface Styles {
  container: ViewStyle;
  linear: ViewStyle;
  imgBg: ViewStyle;
  imgBgImgStyle: ImageStyle;
  listItemContainer: ImageStyle;
  sub: TextStyle;
  title: TextStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  linear: {
    height: 220,
    width: 380,
    elevation: 8,
    borderRadius: 5,
    borderColor: 'transparent',
    marginVertical: 16,
    overflow: 'hidden',
  },
  imgBg: {
    width: 200,
    height: 300,
    top: -170,
    right: -200,
  },
  imgBgImgStyle: {
    resizeMode: 'cover',
    borderRadius: 70,
  },
  sub: {
    color: colors.grey5,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
  },
  listItemContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  title: { color: '#f5f5f5', fontFamily: 'Coves-Bold' },
});
