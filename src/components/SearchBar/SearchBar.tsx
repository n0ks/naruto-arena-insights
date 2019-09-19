import React from "react";
import { SearchBar, Text } from "react-native-elements";
import { Platform } from "react-native";

interface Props {
  updateQuery: (text: string) => void;
  queryText: string;
}

export const SearchableBar: React.SFC<Props> = ({ updateQuery, queryText }) => {
  return (
    <SearchBar
      placeholder="Search for ninja name..."
      onChangeText={updateQuery}
      value={queryText}
      platform={Platform.select({ ios: "ios", android: "android" })}
      autoCorrect={false}
    />
  );
};
