import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { NavigationType, Colors } from "../../utils";
import styles from "./News.styles";
import firestore from "@react-native-firebase/firestore";
import HTML from "react-native-render-html";
import { Loading } from "@app/components";
import { colors } from "react-native-elements";

interface Props extends NavigationType {}

const IMAGES_MAX_WIDTH = Dimensions.get("window").width - 50;

const CUSTOM_STYLES = {
  tagsStyles: {
    p: { color: "#000" },
    span: { color: "#000" },
    br: { color: "#000" },
    text: { color: "#000" }
  },
  classesStyles: {
    "#text": { textAlign: "right", color: "#000", fontWeight: "800" }
  }
};
// const CUSTOM_RENDERERS = {};

const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  // renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt, href) => {
    console.log("link press", evt, href);
  },
  debug: false
};

export const News: React.SFC<Props> = ({ navigation }) => {
  const [html, setHtml] = useState([]);

  useEffect(() => {
    let content = [];

    console.log("useeffect");
    firestore()
      .collection("news")
      .orderBy("date")
      .get()
      .then(data => {
        data.forEach(doc => {
          content.push(doc.data());
        });
        console.log("content", content);
      });

    setHtml(content);
    console.log(html);
  }, []);
  if (!html) {
    return <Loading />;
  }
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        flex: 1
      }}
    >
      <HTML
        html={html && html[0] && html[0].content}
        imagesMaxWidth={Dimensions.get("window").width}
        {...CUSTOM_STYLES}
        {...DEFAULT_PROPS}
      />
    </ScrollView>
  );
};
