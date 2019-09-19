import React from "react";
import { View, Text } from "react-native";
import { chakraMap } from "src/screens/Characters/CharacterDetail";
import { colors } from "react-native-elements";

export const Chakra = ({ chakra }) => {
  return (
    <View
      style={{
        width: 14,
        height: 14,
        backgroundColor: chakraMap[chakra],
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.grey1,
        elevation: 8
      }}
    />
  );
};
