import React from "react";
import { SearchBar, Text } from "react-native-elements";

interface Props {
  updateQuery: (text) => void;
  queryText: string;
}

export const SearchableBar: React.SFC<Props> = ({updateQuery,queryText}) => {

  return (
    <SearchBar
      placeholder="Search for ninja name..."
      onChangeText={updateQuery}
      value={queryText}
      platform="android"
    />
  );
};
