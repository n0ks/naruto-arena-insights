import React, { useContext, useCallback, useEffect } from "react";
import {
  SearchBar,
  Text,
  Icon,
  colors,
  ThemeContext
} from "react-native-elements";
import { Platform, StyleProp, ViewStyle } from "react-native";
import { Animated } from "react-native";
import { theme } from "utils";

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
      <SearchBar
        placeholder="Search for ninja name..."
        onChangeText={updateQuery}
        containerStyle={{ backgroundColor: "#8240C4" }}
        placeholderTextColor="#F1F1F1"
        cancelButtonProps={{ color: "#f1f1f1" }}
        value={queryText}
        platform={Platform.select({ ios: "ios", android: "android" })}
        autoCorrect={false}
      />
    </Animated.View>
  );
};
