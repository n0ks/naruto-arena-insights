import React, { useState, useEffect } from "react";
import { View, FlatList, StyleProp, TextStyle } from "react-native";
import { NavigationType, Users } from "../../utils";
import { ListItem, Icon } from "react-native-elements";
import { Loading } from "../../components/Loading";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

export const NinjaLadder: React.SFC<NavigationType> = ({ navigation }) => {
  const [ninjas, setNinjaLadder] = useState<Users[]>();

  useEffect(() => {
    let ninjaList = [];
    const getNinjas = async () => {
      let ladderRef = await firestore()
        .collection("users")
        .orderBy("user.exp", "desc")
        .get();

      ladderRef.docs.forEach(doc => {
        ninjaList.push({
          ...doc.data().user,
          id: doc.id
        });
      });

      setNinjaLadder(ninjaList);
    };

    getNinjas();
  }, []);

  const CustomListItem = (
    title,
    iconName?: string,
    tStyle?: StyleProp<TextStyle>
  ) => (
    <ListItem
      title={title}
      containerStyle={{
        backgroundColor: "transparent",
        paddingVertical: 8
      }}
      titleStyle={[{ color: "#f5f5f5", fontFamily: "CovesBold" }, tStyle]}
      leftIcon={
        iconName && <Icon type="foundation" name={iconName} size={16} />
      }
    />
  );

  const gradientRenderItem = ({ item }: { item: Users }) => {
    return (
      <LinearGradient
        colors={["#BF2F0C", "#EB5D13", "#FF9C3D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        style={{
          height: "auto",
          width: 380,
          elevation: 8,
          borderRadius: 5,
          borderColor: "transparent",
          marginVertical: 16
        }}
      >
        {CustomListItem(
          `${item.username} - ${item.rank.toUpperCase()} - ${item.level}`,
          "",
          {
            fontSize: 16
          }
        )}
        {CustomListItem(`WL :  ${item.wins}  /  ${item.loses}`)}
        {CustomListItem(`XP :  ${item.exp}`)}
        {CustomListItem(`Streak ${item.streak}`)}
      </LinearGradient>
    );
  };

  if (!ninjas) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        data={ninjas}
        renderItem={gradientRenderItem}
        contentContainerStyle={{
          backgroundColor: "#f5f5f5",
          alignItems: "center"
        }}
      />
    </View>
  );
};
