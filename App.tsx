import React from "react";
import { RootStack } from "src/navigation";
import { YellowBox } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { theme } from "src";

YellowBox.ignoreWarnings([
  "react-devtools agent got no connection",
  "is deprecated",
  "Warning: Failed prop type",
  "VirtualizedLists"
]);

export const App = () => {
  return <RootStack />;
};
