/** @format */

import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationType, Colors, Screens } from '@app/utils';
import { Loading, BannerAdsLarge } from '@app/components';
import { ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const NewsFeed: React.SFC<NavigationType> = ({ navigation }) => {
  const [html, setHtml] = useState([]);

  useEffect(() => {
    let content = [];

    const getNews = async () => {
      let data = await firestore()
        .collection('news')
        .orderBy('news.date', 'desc')
        .get();

      data.forEach(doc => {
        content.push(doc.data().news);
      });

      setHtml(content);
    };

    getNews();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        chevron
        topDivider
        title={item.title}
        subtitle={`${moment(item.date).format('DD/MM/YY HH:mm')} by ${
          item.author
        }`}
        key={Math.random.toString()}
        titleStyle={{ fontSize: 18, color: Colors.orange }}
        subtitleStyle={{ color: Colors.blue }}
        onPress={() => navigation.navigate(Screens.News, { item })}
      />
    );
  };

  if (html?.length === 0) {
    return <Loading />;
  }

  return (
    <FlatList
      data={html}
      renderItem={renderItem}
      keyExtractor={(_, index) => index?.toString()}
      ListFooterComponent={BannerAdsLarge}
    />
  );
};
