/** @format */

import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
interface Styles {
  container: ViewStyle;
  linearBtn: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  linearBtn: {
    height: Dimensions.get('window').height / 4,
    borderColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
