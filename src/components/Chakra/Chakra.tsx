import React from "react";
import { View, Text } from "react-native";
import { chakraMap } from "src/screens/Characters/Details/CharacterDetail";
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
        borderColor: "#f1f1f1",
        borderRadius: 2,
        elevation: 1
      }}
    />
  );
};
