import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  container: ViewStyle;
  linearBtn: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  linearBtn: {
    height: 64,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 8
  }
});
