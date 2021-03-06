/** @format */

import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Fuse from 'fuse.js';
import Splash from 'react-native-splash-screen';
import styles from './Characters.styles';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { SearchableBar, Loading, BannerAdsSmart } from '../../components';
import Analytics from 'appcenter-analytics';
import Device from 'react-native-device-info';
// @ts-ignore
import gif from '../../../assets/images/sharingan_loading.gif';
import {
  NavigationType,
  ICharacters,
  Screens,
  requestPermission,
} from '../../utils';
import FastImage from 'react-native-fast-image';

export const Characters: React.SFC<NavigationType> = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(true);
  const [queryCharacters, setQueryCharacters] = useState(characters);

  const fuse = new Fuse(characters, {
    shouldSort: true,
    threshold: 0.3,
    maxPatternLength: 20,
    location: 0,
    distance: 200,
    keys: ['name'],
  });

  const updateQuery = text => {
    setQueryText(text);
    setQueryCharacters(text ? fuse.search(queryText) : characters);
  };

  useEffect(() => {
    Splash.hide();

    const getCharacters = async () => {
      // let charactersStored = await AsyncStorage.getItem("characters");
      // if (charactersStored && charactersStored.length > 1) {
      //   setCharacters(JSON.parse(charactersStored));
      //   setQueryCharacters(JSON.parse(charactersStored));
      //   setLoading(false);
      //   return;
      // }
      let char: any[] = [];
      firestore()
        .collection('characters')
        .orderBy('character.name')
        .get()
        .then(data => {
          data.docs.forEach(doc => {
            char.push({ ...doc!.data()!.character });
          });

          setCharacters(char);

          setQueryCharacters(char);
          setLoading(false);

          // AsyncStorage.setItem("characters", JSON.stringify(char));
        });
    };

    getCharacters();
    requestPermission();
  }, []);

  const navigateToDetails = async item => {
    let deviceInfo = {
      deviceName: await Device.getDeviceName(),
      sysName: await Device.getSystemName(),
      version: await Device.getVersion(),
    };

    Analytics.trackEvent('go_to_char_details', {
      name: item.name,
      ...deviceInfo,
    });

    navigation.navigate(Screens.CharactersDetails, { item });
  };

  const renderItem = ({ item }: { item: ICharacters }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigateToDetails(item)}
          style={styles.border}
        >
          <Image
            source={{ uri: item.img }}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const SEARCH_HEIGHT = 60 + 24;

  const scrollY = new Animated.Value(0);

  const diff = Animated.diffClamp(scrollY, 0, SEARCH_HEIGHT);

  const searchY = diff.interpolate({
    inputRange: [0, SEARCH_HEIGHT],
    outputRange: [0, -SEARCH_HEIGHT],
    extrapolate: 'clamp',
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <SearchableBar
        queryText={queryText}
        updateQuery={updateQuery}
        searchY={searchY}
      />
      <FlatList
        bounces={false}
        data={queryCharacters}
        ListFooterComponent={BannerAdsSmart}
        ListHeaderComponent={BannerAdsSmart}
        keyboardDismissMode="interactive"
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        ListHeaderComponentStyle={{ backgroundColor: 'transparent' }}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{
          paddingTop: SEARCH_HEIGHT,
        }}
        columnWrapperStyle={styles.flatList}
        numColumns={3}
        renderItem={renderItem}
        initialNumToRender={5}
      />
    </SafeAreaView>
  );
};
