import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors,Icon } from "react-native-elements";
import WebView from "react-native-webview";
import { DText } from "@app/components";
import { Colors } from "@app/utils";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  }
});

export const WebViewDemo = () => {
  const webref = useRef();
  const run = `
      // document.body.style.backgroundColor = 'blue';
      var ads = document.querySelectorAll('#advertisement');
      var banner = document.querySelectorAll('#banner');
      var iframe = document.querySelectorAll('iframe');

      ads.parentNode.removeChild(ads)
      iframe.remove()
      banner.parentNode.removeChild(banner)

      true;
    `;

  useEffect(() => {
    setTimeout(() => {
      console.log("webref", webref);
      // @ts-ignore
      webref.current.injectJavaScript(run);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webref}
        source={{ uri: "https://naruto-arena.net" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess
        allowsInlineMediaPlayback={false}
        originWhitelist={["https://*"]}
        textZoom={110}
        style={{ borderWidth: 5 }}
        startInLoadingState
        renderError={errName => (
          <View style={styles.center}>
            <Icon
              name="alert-circle-outline"
              color={colors.error}
              size={48}
              type="material-community"
            />
            <DText style={{ fontFamily: "Coves-Light" }}>
              {`Ooops... an error has occurred\n${errName}`}
            </DText>
          </View>
        )}
        renderLoading={() => (
          <ActivityIndicator size="large" style={[StyleSheet.absoluteFill]} />
        )}
        onHttpError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;

          console.warn(
            "WebView received error status code: ",
            nativeEvent.statusCode
          );
        }}
      />
    </View>
  );
};
