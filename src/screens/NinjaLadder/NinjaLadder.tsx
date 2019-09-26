import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleProp,
  TextStyle,
  ImageBackground
} from "react-native";
import { NavigationType, Users } from "../../utils";
import { ListItem, Icon, colors } from "react-native-elements";
import { Loading } from "../../components/Loading";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";
import styles from "./NinjaLadder.styles";

const BG_IMAGE = {
  ["Jinchuuriki"]: require("../../../assets/images/jinchuuriki_bg.png"),
  ["Akatsuki"]: require("../../../assets/images/akatsuki_bg.png"),
  ["Sannin"]: require("../../../assets/images/sannin_bg.png")
};

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
    tStyle?: StyleProp<TextStyle>,
    sub?: string
  ) => (
    <ListItem
      title={title}
      subtitle={sub}
      containerStyle={styles.listItemContainer}
      subtitleStyle={styles.sub}
      titleStyle={[styles.title, tStyle]}
      leftIcon={
        iconName && <Icon type="foundation" name={iconName} size={16} />
      }
    />
  );

  const gradientRenderItem = ({ item }: { item: Users }) => {
    return (
      <LinearGradient
        colors={["#551892", "#8240C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linear}
      >
        <View
          style={{
            backgroundColor: "transparent",
            zIndex: 1
          }}
        >
          <View>
            {CustomListItem(
              `${item.username.toUpperCase()}`,
              "",
              {
                fontSize: 20
              },
              `${item.rank} - LV ${item.level}`
            )}
            {CustomListItem(`WL :  ${item.wins}  /  ${item.loses}`)}
            {CustomListItem(`XP :  ${item.exp}`)}
            {CustomListItem(`Streak ${item.streak}`)}
          </View>
        </View>
        <ImageBackground
          source={BG_IMAGE[item.rank]}
          imageStyle={styles.imgBgImgStyle}
          style={styles.imgBg}
        />
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
