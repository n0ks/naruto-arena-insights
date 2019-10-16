/** @format */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationType, Screens } from '../../utils';
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Rankings.styles';
// interface Props {}

const LinearButton = (from, to, text, onPress) => (
  <TouchableOpacity onPress={onPress} style={{ elevation: 8 }}>
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0.0, y: 0 }}
      end={{ x: 2, y: 1 }}
      style={styles.linearBtn}
      pointerEvents="none"
    >
      <Text
        style={{
          color: '#eeeeee',
          fontFamily: 'Coves-Bold',
          fontSize: 28,
        }}
      >
        {text.toUpperCase()}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export const Rankings: React.SFC<NavigationType> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {LinearButton('#8240C4', '#551892', 'Ninja Ladder', () =>
        navigation.navigate(Screens.NinjaLadder)
      )}
      {LinearButton('#551892', '#8240C4', 'Clan Ladder', () =>
        navigation.navigate(Screens.ClanLadder)
      )}
      {LinearButton('#8240C4', '#551892', 'Top Winstreak', () =>
        navigation.navigate(Screens.TopsLadder, {
          ladderType: 'streakladder',
        })
      )}
      {LinearButton('#551892', '#8240C4', 'Top Wins ', () =>
        navigation.navigate(Screens.TopsLadder, {
          ladderType: 'winladder',
        })
      )}
    </View>
  );
};
