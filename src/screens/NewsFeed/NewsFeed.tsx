import React, { useEffect, useState } from "react";
import {  FlatList } from "react-native";
import { NavigationType, Colors, Screens } from "../../utils";
import { Loading} from "@app/components";
import { ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";

export const NewsFeed: React.SFC<NavigationType> = ({ navigation }) => {
  const [html, setHtml] = useState([]);
  useEffect(() => {
    let content = [];

    const getNews = async () => {
      let data = await firestore()
        .collection("news")
        .orderBy("index")
        .get()

        data.forEach(doc => {
          content.push(doc.data());
        });

      setHtml(content);
    }
    getNews()
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.title}
        subtitle={`${item.date} by ${item.author}`}
        key={Math.random.toString()}
        titleStyle={{fontSize: 18, color: Colors.orange}}
        subtitleStyle={{color: Colors.blue}}
        onPress={() => navigation.navigate(Screens.News, {item})}
        chevron
        topDivider
      />
      
    );  
  };

  if(html.length === 0){
    return (<Loading />)
  }

  return (
      <FlatList
        data={html}
        renderItem={renderItem}
        keyExtractor={({ __, index }) => index?.toString()}
      />
  )
  
};
