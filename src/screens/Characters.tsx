import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Avatar,
  Button,
  Text,
  Input,
  Divider,
  Icon
} from "react-native-elements";

console.ignoredYellowBox = ["react-devtools agent got no connection"];

import firestore from "@react-native-firebase/firestore";
import Fuse from "fuse.js";
import { Colors } from "utils";
import { SearchableBar } from "src/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const Characters: React.SFC<Props> = ({ navigation }) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [queryText, setQueryText] = useState("");
  const [queryCharacters, setQueryCharacters] = useState(characters);

  const fuse = new Fuse(characters, {
    shouldSort: true,
    threshold: 0.6,
    maxPatternLength: 10,
    location: 0,
    distance: 50,
    keys: ["name"]
  });

  useEffect(() => {
    navigation.setParams({ updateQuery, queryText });

    const getCharacters = async () => {
      console.log("***** GETING CHAR ******");
      let charactersStored = await AsyncStorage.getItem("characters");

      if (!!charactersStored) {
        console.log("setchar", charactersStored);
        setCharacters(JSON.parse(charactersStored));
        setQueryCharacters(JSON.parse(charactersStored));
      }

      // firestore()
      //   .collection("characters")
      //   .get()
      //   .then(data => {
      //     let char: any[] = [];
      //     data.docs.forEach((doc, index) => {
      //       char.push({ ...doc!.data()!.character });
      //       setCharacters(char);
      //     });

      // AsyncStorage.setItem("characters", JSON.stringify(char));
      // });
    };

    getCharacters();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ justifyContent: "center" }}>
        <Avatar
          source={{ uri: item.img }}
          rounded
          size={75}
          containerStyle={{ elevation: 8, backgroundColor: "red" }}
          overlayContainerStyle={{ backgroundColor: "white" }}
          // avatarStyle={{ zIndex: -10,backgroundColor: 'red' }}
        />
      </View>
    );
  };

  const updateQuery = text => {
    setQueryText(text);
    setQueryCharacters(text ? fuse.search(queryText) : characters);
    console.log("setting query text", queryCharacters);
  };
  return (
    <View>
      <SearchableBar queryText={queryText} updateQuery={updateQuery} />
      <Divider />
      <FlatList
        data={queryCharacters}
        keyExtractor={({ _, index }) => `index_${Math.random()}`}
        columnWrapperStyle={{ justifyContent: "space-around", padding: 8 }}
        numColumns={3}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={renderItem}
      />
    </View>
  );
};
