/** @format */

import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
interface Styles {
  container: ViewStyle;
  linearBtn: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  linearBtn: {
    height: Dimensions.get('window').height / 4 - 16,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
