import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Colors } from "../../utils";

export const FeedDemo = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Text
        h1
        h1Style={{
          color: Colors.orange,
          zIndex: 99,
          textAlign: "center",
          textShadowColor: "#fff",
          textShadowOffset: { height: 1, width: 1 },
          textShadowRadius: 1
        }}
      >
        Work in progress
      </Text>
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignSelf: "center", justifyContent: "center" }
        ]}
      >
        <Image
          source={require("../../../assets/images/naruto_gif.gif")}
          resizeMode="contain"
          style={{
            alignSelf: "center",
            justifyContent: "center"
          }}
        />
      </View>
    </View>
  );
};
