import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationType, Screens, Colors } from "../../utils";
import { Text, colors } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Rankings.styles";
// interface Props {}

const LinearButton = (from, to, text, onPress) => (
  <TouchableOpacity onPress={onPress} style={{ elevation: 8 }}>
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0.0, y: 0 }}
      end={{ x:2, y: 1 }}
      style={styles.linearBtn}
      pointerEvents="none"
    >
      <Text
        style={{ color: '#eeeeee', fontFamily: "Coves-Bold", fontSize: 28 }}
      >
        {text.toUpperCase()}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export const Rankings: React.SFC<NavigationType> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {LinearButton("#BF2F0C", "#EB5D13", "Ninja Ladder", () =>
        navigation.navigate(Screens.NinjaLadder)
      )}
      {LinearButton("#EB5D13", "#BF2F0C", "Clan Ladder", () =>
        navigation.navigate(Screens.ClanLadder)
      )}
      {LinearButton("#BF2F0C", "#EB5D13", "Top Winstreak", () =>
        navigation.navigate(Screens.TopsLadder, { ladderType: "streakladder" })
      )}
      {LinearButton("#EB5D13", "#BF2F0C", "Top Wins ", () =>
        navigation.navigate(Screens.TopsLadder, { ladderType: "winladder" })
      )}
    </View>
  );
};
