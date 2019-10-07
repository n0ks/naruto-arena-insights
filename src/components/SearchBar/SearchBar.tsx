import React from "react";
import { SearchBar, colors } from "react-native-elements";
import { Platform, Animated } from "react-native";
interface Props {
  updateQuery: (text: string) => void;
  queryText: string;
  searchY: Animated.AnimatedInterpolation;
}

export const SearchableBar: React.SFC<Props> = ({
  updateQuery,
  queryText,
  searchY
}) => {
  let height = searchY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 120],
    extrapolate: "extend"
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: searchY }],
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {
        // @ts-ignore
        <SearchBar
          placeholder="Search for ninja name..."
          onChangeText={updateQuery}
          containerStyle={{ backgroundColor: "#8240C4" }}
          placeholderTextColor={colors.greyOutline}
          inputStyle={{ color: "white" }}
          clearIcon={{ color: "#fff" }}
          searchIcon={{ color: "#fff", backgroundColor: "transparent" }}
          cancelIcon={{ color: "#fff" }}
          cancelButtonProps={{
            style: { backgroundColor: "transparent", borderRadius: 20 }
          }}
          value={queryText}
          platform={Platform.select({ ios: "ios", android: "android" })}
          autoCorrect={false}
        />
      }
    </Animated.View>
  );
};
