import React, { useContext, useCallback, useEffect } from "react";
import { SearchBar, Icon, colors } from "react-native-elements";
import { Platform, StyleProp, ViewStyle, Keyboard } from "react-native";
import { Animated } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";

const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
const SEARCH_HEIGHT = 60;
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
  return (
    <Animated.View
      style={{
        height: SEARCH_HEIGHT,
        transform: [{ translateY: searchY }]
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
