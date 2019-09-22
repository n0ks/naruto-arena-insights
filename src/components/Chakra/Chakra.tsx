import React from "react";
import { View } from "react-native";
import { chakraMap } from "../../utils";

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
        borderRadius: 3,
        elevation: 1
      }}
    />
  );
};
