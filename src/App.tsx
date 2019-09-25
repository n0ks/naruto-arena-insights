import React from "react";
import { YellowBox } from "react-native";
import { TabNav } from "./navigation";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./utils";

YellowBox.ignoreWarnings([
  "react-devtools agent got no connection",
  "is deprecated",
  "Warning: Failed prop type",
  "VirtualizedLists",
  "Warning: "
]);

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TabNav />
    </ThemeProvider>
  );
};
