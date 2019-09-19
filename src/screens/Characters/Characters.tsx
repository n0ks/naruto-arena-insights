import React, { useEffect, useState, useContext } from "react";
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
import { NavigationType, Screens, Colors } from "utils";
import { SearchableBar } from "src/components";
import { Button, ThemeContext } from "react-native-elements";

export const Characters: React.SFC<NavigationType> = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [queryText, setQueryText] = useState("");
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
        return;
      }

      let char: any[] = [];
      firestore()
        .collection("characters")
        .orderBy("character.name")
        .get()
        .then(data => {
          console.log("fiirestore data", data);
          data.docs.forEach((doc, index) => {
            // @ts-ignore
            char.push({ ...doc!.data()!.character });
          });

          setCharacters(char);
          setQueryCharacters(char);

          AsyncStorage.setItem("characters", JSON.stringify(char));
        });
    };

    getCharacters();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ zIndex: 1000 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("onpress");
            navigation.navigate(Screens.CharactersDetails, { item });
          }}
          style={styles.border}
        >
          <Image source={{ uri: item.img }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    );
  };

  const SEARCH_HEIGHT = 60;
  const scrollY = new Animated.Value(0);
  const searchY = scrollY.interpolate({
    inputRange: [0, SEARCH_HEIGHT],
    outputRange: [0, -SEARCH_HEIGHT],
    extrapolate: "clamp"
  });

  return (
    <SafeAreaView>
      <Animated.ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } }
          }
        ])}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
      >
        <SearchableBar
          queryText={queryText}
          updateQuery={updateQuery}
          searchY={searchY}
        />
        <FlatList
          data={queryCharacters}
          scrollEventThrottle={24}
          keyboardDismissMode="interactive"
          contentContainerStyle={{
            backgroundColor: "transparent",
            zIndex: 1000
          }}
          ListHeaderComponentStyle={{ backgroundColor: "transparent" }}
          keyExtractor={() => chance().guid()}
          columnWrapperStyle={styles.flatList}
          numColumns={3}
          // ItemSeparatorComponent={() => <Divider />}
          renderItem={renderItem}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ paddingVertical: 50 }} />}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
