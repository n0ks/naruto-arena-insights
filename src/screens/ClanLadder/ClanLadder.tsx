/** @format */

import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import { NavigationType, Clans } from '@app/utils';
import firestore from '@react-native-firebase/firestore';
import { BannerAdsLarge, Loading } from '@app/components';

export const ClanLadder: React.SFC<NavigationType> = () => {
  const [clans, setClans] = useState<Clans[]>();

  useEffect(() => {
    let clanList = [];
    const getClans = async () => {
      let clanRef = await firestore()
        .collection('clans')
        .orderBy('clan.rank', 'asc')
        .get();

      clanRef.docs.forEach(doc => {
        clanList.push({
          ...doc.data().clan,
          id: doc.id,
        });
      });

      setClans(clanList);
    };

    getClans();
  }, []);

  const renderItem = ({ item }: { item: Clans }) => {
    return (
      <Card title={`${item.clanName} #${item.rank}`}>
        <ListItem
          title={`Level: ${item.level}`}
          leftIcon={<Icon type="foundation" name="arrow-up" size={16} />}
        />
        <ListItem
          title={`WL: ${item.wins}  / ${item.loses}`}
          leftIcon={
            <Icon type="material-community" name="sword-cross" size={16} />
          }
        />
        <ListItem
          title={`XP : ${item.exp}`}
          leftIcon={<Icon type="material-community" name="square" size={16} />}
        />
      </Card>
    );
  };

  if (!clans) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        data={clans}
        renderItem={renderItem}
        contentContainerStyle={{ backgroundColor: '#f5f5f5' }}
        ListFooterComponent={BannerAdsLarge}
        ListHeaderComponent={BannerAdsLarge}
      />
    </View>
  );
};
