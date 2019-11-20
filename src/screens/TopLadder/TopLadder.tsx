/** @format */

import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Streak } from '../../utils';
import { ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Loading, BannerAdsSmart } from '../../components';

interface NavigationParams {
  ladderType: 'streakladder' | 'winladder';
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export const TopLadder: React.SFC<Props> = ({ navigation }) => {
  const [ladder, setLadder] = useState();

  const ladderType = navigation.getParam('ladderType');
  const STREAK_TYPE = ladderType === 'winladder' ? 'Wins' : 'Streak';
  useEffect(() => {
    let ladderList = [];
    const getLadder = async () => {
      let ladderRef = await firestore()
        .collection(ladderType)
        .orderBy('user.streak', 'desc')
        .get();

      ladderRef.docs.forEach(doc => {
        ladderList.push({
          ...doc.data().user,
          id: doc.id,
        });
      });

      setLadder(ladderList);
    };

    getLadder();
  }, []);

  const renderItem = ({ item }: { item: Streak }) => {
    return (
      <ListItem
        title={item.name.toUpperCase()}
        subtitle={`${STREAK_TYPE} ${item.streak}`}
        bottomDivider
      />
    );
  };

  if (!ladder) {
    return <Loading />;
  }
  return (
    <FlatList
      data={ladder}
      renderItem={renderItem}
      ListFooterComponent={BannerAdsSmart}
      ListHeaderComponent={BannerAdsSmart}
    />
  );
};
