import React from "react";
import { View, Image } from "react-native";
// @ts-ignore
import gif from "../../../assets/images/sharingan_loading.gif";

interface Props {}

export const Loading: React.SFC<Props> = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
    >
      <Image
        source={gif}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          alignSelf: "center"
        }}
      />
    </View>
  );
};
