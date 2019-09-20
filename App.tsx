import React from "react";
import { Drawer } from "src/navigation";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "react-devtools agent got no connection",
  "is deprecated",
  "Warning: Failed prop type",
  "VirtualizedLists",
  "Warning: "
]);

export const App = () => {
  return <Drawer/>;
};
