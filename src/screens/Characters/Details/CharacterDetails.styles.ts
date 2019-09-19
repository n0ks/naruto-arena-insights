import { StyleSheet } from "react-native";
import { Colors } from "utils";
import { colors } from "react-native-elements";

export default StyleSheet.create({
  charNameStyle: { fontSize: 28, color: Colors.purpleDark },
  charDescStyle: {
    textAlign: "justify",
    padding: 16,
    borderBottomColor: colors.grey4,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  avatarContainer: { marginVertical: 24, borderWidth: 1 },
  tileImgContainer: {
    flex: 0,
    alignSelf: "center",
    marginVertical: 16,
    elevation: 4
  },
  tileContainer: {
    // marginBottom: 100,
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    position: "relative",
    height: "100%",
    borderRadius: 5
  },
  tileTitle: {
    textTransform: "uppercase",
    color: colors.grey1,
    fontSize: 6,
    fontFamily: "CovesBold"
  },
  skillClasses: {
    color: colors.grey0,
    marginVertical: 16,
    letterSpacing: 1
  },
  chakraView: {
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "relative",
    alignContent: "center",
    alignItems: "center"
  },
  skillDescription: { color: colors.grey1, textAlign: "justify" },
  skillTitle: {
    color: colors.grey0,
    fontSize: 24,
    fontFamily: "CovesBold",
    marginBottom: 16
  }
});
