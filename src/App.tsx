import React from "react";
import { YellowBox } from "react-native";
import { Drawer } from "./navigation";
import { ThemeProvider } from "react-native-elements";

YellowBox.ignoreWarnings([
  "react-devtools agent got no connection",
  "is deprecated",
  "Warning: Failed prop type",
  "VirtualizedLists",
  "Warning: "
]);

export const App = () => {
  return (
    <ThemeProvider>
      <Drawer />
    </ThemeProvider>
  );
};
