import React from "react";
import { View } from "react-native";
import { chakraMap } from "../../utils";
import { Icon } from "react-native-elements";

export const Chakra = ({ chakra }) => {
  return (
    <View>
      <Icon
        name="square"
        type="material-community"
        containerStyle={{ marginHorizontal: 4 }}
        size={14}
        color={chakraMap[chakra]}
      />
    </View>
  );
};
