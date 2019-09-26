import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationType, Screens } from "../../utils";
import { Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Rankings.styles";
// interface Props {}

const LinearButton = (from, to, text, onPress) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0.0, y: 0 }}
      end={{ x: 1.5, y: 1 }}
      style={styles.linearBtn}
      pointerEvents="none"
    >
      <Text style={{ color: "#f5f5f5", fontFamily: "CovesBold", fontSize: 32 }}>
        {text}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export const Rankings: React.SFC<NavigationType> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {LinearButton("#f2a30b", "#ffe182", "Ninja Ladder", () =>
        navigation.navigate(Screens.NinjaLadder)
      )}
      {LinearButton("#551892", "#8240C4", "Clan Ladder", () =>
        navigation.navigate(Screens.ClanLadder)
      )}
    </View>
  );
};
