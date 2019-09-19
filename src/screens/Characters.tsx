import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import chance from 'chance';
import firestore from '@react-native-firebase/firestore';
import Fuse from 'fuse.js';
import Splash from 'react-native-splash-screen';
import styles from './Characters.styles';
import { Divider } from 'react-native-elements';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View
  } from 'react-native';
import { NavigationType, Screens } from 'utils';
import { SearchableBar } from 'src/components';

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

  useEffect(() => {
    Splash.hide()
    navigation.setParams({ updateQuery, queryText });
    const getCharacters = async () => {
      let charactersStored = await AsyncStorage.getItem("characters");
      console.log("getchars");
      if (charactersStored && charactersStored.length > 1) {
        console.log("***** GETING CHAR ******", charactersStored);
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
      <TouchableOpacity
        onPress={() => {
          console.log("onpress");
          navigation.navigate(Screens.CharactersDetails, { item });
        }}
        style={styles.border}
      >
        <Image source={{ uri: item.img }} style={styles.avatar} />
      </TouchableOpacity>
    );
  };

  const updateQuery = text => {
    setQueryText(text);
    setQueryCharacters(text ? fuse.search(queryText) : characters);
  };

  return (
    <SafeAreaView>
      <SearchableBar queryText={queryText} updateQuery={updateQuery} />
      <Divider />
      <FlatList
        data={queryCharacters}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        keyExtractor={() => chance().guid()}
        columnWrapperStyle={styles.flatList}
        numColumns={3}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={renderItem}
        initialNumToRender={5}
        ListFooterComponent={() => <View style={{ paddingVertical: 50 }} />}
      />
    </SafeAreaView>
  );
};
