import React, { useEffect, useState} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import chance from "chance";
import firestore from "@react-native-firebase/firestore";
import Fuse from "fuse.js";
import Splash from "react-native-splash-screen";
import styles from "./Characters.styles";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import { SearchableBar } from "src/components";
import Analytics from "appcenter-analytics";
import Device from "react-native-device-info";
// @ts-ignore
import gif from "../../../assets/images/sharingan_loading.gif";
import { Button } from "react-native-elements";
import { NavigationType, Screens, ICharacters } from "src";

export const Characters: React.SFC<NavigationType> = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [loading, setLoading] = useState(true);
  const [queryCharacters, setQueryCharacters] = useState(characters);

  const fuse = new Fuse(characters, {
    shouldSort: true,
    threshold: 0.3,
    maxPatternLength: 20,
    location: 0,
    distance: 200,
    keys: ["name"]
  });

  const updateQuery = text => {
    setQueryText(text);
    setQueryCharacters(text ? fuse.search(queryText) : characters);
  };

  useEffect(() => {
    Splash.hide();

    const getCharacters = async () => {
      let charactersStored = await AsyncStorage.getItem("characters");
      if (charactersStored && charactersStored.length > 1) {
        setCharacters(JSON.parse(charactersStored));
        setQueryCharacters(JSON.parse(charactersStored));
        setLoading(false);
        return;
      }

      let char: any[] = [];
      firestore()
        .collection("characters")
        .orderBy("character.name")
        .get()
        .then(data => {
          data.docs.forEach((doc) => {
            // @ts-ignore
            char.push({ ...doc!.data()!.character, });
          });

          setCharacters(char);
          setQueryCharacters(char);
          setLoading(false);

          AsyncStorage.setItem("characters", JSON.stringify(char));
        });
    };

    getCharacters();
  }, []);

  const navigateToDetails = async item => {
    let deviceInfo = {
      deviceName: await Device.getDeviceName(),
      sysName: await Device.getSystemName()
    };
    Analytics.trackEvent("go_to_char_details", {
      name: item.name,
      ...deviceInfo
    });
    navigation.navigate(Screens.CharactersDetails, { item });
  };

  const renderItem = ({ item }: { item: ICharacters }) => {
    return (
      <View style={{ zIndex: 1000 }}>
        <TouchableOpacity
          onPress={() => navigateToDetails(item)}
          style={styles.border}
        >
          <Image source={{ uri: item.img }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    );
  };

  const SEARCH_HEIGHT = 60;

  const scrollY = new Animated.Value(0);

  const diff = Animated.diffClamp(scrollY, 0, SEARCH_HEIGHT);

  const searchY = diff.interpolate({
    inputRange: [0, SEARCH_HEIGHT],
    outputRange: [0, -SEARCH_HEIGHT],
    extrapolate: "clamp"
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={gif}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            alignSelf: "center"
          }}
        />
      </View>
    );
  }
  // if (true) {
  //   return (
  //     <WebView
  //       source={{ uri: "https://naruto-arena.net" }}
  //       javaScriptEnabled={true}
  //       style={{
  //         flex: 1,
  //         borderWidth: 1,
  //         justifyContent: "center",
  //         alignItems: "center"
  //       }}
  //       domStorageEnabled={true}
  //     />
  //   );
  // }

  const Footer = () => <View style={{ paddingVertical: 50 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchableBar
        queryText={queryText}
        updateQuery={updateQuery}
        searchY={searchY}
      />
      <Button
          raised
          onPress={() => navigation.toggleDrawer()}
          title="toggle fuckin drawer"
        />
      <FlatList
        data={queryCharacters}
        keyboardDismissMode="interactive"
        scrollEventThrottle={24}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } }
          }
        ])}
        ListHeaderComponentStyle={{ backgroundColor: "transparent" }}
        keyExtractor={() => chance().guid()}
        columnWrapperStyle={styles.flatList}
        numColumns={3}
        renderItem={renderItem}
        initialNumToRender={5}
        ListFooterComponent={Footer}
      />
    </SafeAreaView>
  );
};
