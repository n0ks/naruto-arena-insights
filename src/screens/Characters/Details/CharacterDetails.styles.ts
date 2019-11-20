/** @format */

import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { Colors } from '../../../utils';

export default StyleSheet.create({
  charNameStyle: { fontSize: 28, color: Colors.purpleDark },
  charDescStyle: {
    textAlign: 'justify',
    padding: 16,
    borderBottomColor: colors.grey4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarContainer: { marginVertical: 24, borderWidth: 1 },
  tileImgContainer: {
    flex: 0,
    alignSelf: 'center',
    marginVertical: 16,
  },
  fastImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 16,
  },
  tileContainer: {
    marginBottom: 50,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    borderWidth: 2,
    borderRadius: 5,
  },
  skillClasses: {
    color: colors.grey1,
    marginVertical: 16,
    letterSpacing: 1,
  },
  chakraView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
    alignContent: 'center',
    alignItems: 'center',
  },
  skillDescription: { color: colors.grey1, textAlign: 'justify' },
  skillTitle: {
    color: colors.grey0,
    fontSize: 24,
    fontFamily: 'Coves-Bold',
    marginBottom: 16,
  },
});
