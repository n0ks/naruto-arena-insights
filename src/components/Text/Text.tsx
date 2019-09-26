import React from "react";
import { Text, colors } from "react-native-elements";
import { StyleProp, TextStyle } from "react-native";
interface Props {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  type?: "light" | "bold";
}
export const DText: React.SFC<Props> = ({
  children,
  style,
  type = "light"
}) => {
  return (
    <Text
      style={[
        {
          color: colors.grey2,
          fontFamily: type === "light" ? "Coves-Light" : "Coves-Bold",
          fontSize: 20
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};
