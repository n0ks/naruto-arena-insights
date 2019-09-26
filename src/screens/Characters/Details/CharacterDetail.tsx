import React from "react";
import { Avatar, Tile } from "react-native-elements";
import { View, SafeAreaView,ScrollView } from "react-native";
import { Chakra, DText } from "../../../components";
import styles from "./CharacterDetails.styles";
import { NavigationType, ICharacters } from "../../../utils/Interfaces";
import FastImage from "react-native-fast-image";

export const CharacterDetail: React.SFC<NavigationType> = ({ navigation }) => {
  const character: ICharacters = navigation.getParam("item");

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Avatar
          source={{ uri: character.img }}
          rounded
          size={124}
          containerStyle={[styles.avatarContainer]}
        />
        <DText style={styles.charNameStyle} type="bold">
          {character.name}
        </DText>
        <View style={{ marginBottom: 200 }}>
          <DText style={styles.charDescStyle}>{character.description}</DText>
          {character.skills.map((skill, i) => (
            <Tile
              key={i}
              imageSrc={{ uri: skill.skillImg }}
              activeOpacity={1}
              ImageComponent={FastImage}
              imageContainerStyle={styles.tileImgContainer}
              containerStyle={styles.tileContainer}
              imageProps={{
                width: 100,
                height: 100,
                borderRadius: 50,
                placeholderStyle: { borderRadius: 50 },
                resizeMode: "contain",
                style: styles.fastImage
              }}
            >
              <View
                style={{
                  flexGrow: 1
                }}
              >
                <DText style={styles.skillTitle}>{skill.skillName}</DText>
                <DText style={styles.skillDescription}>
                  {skill.skillDescription}
                </DText>

                <DText style={styles.skillClasses}>{skill.classes}</DText>
                <View style={styles.chakraView}>
                  <DText>{`CD: ${skill.cooldown}`}</DText>
                  {skill.chakras.map((chakra, idx) => (
                    <Chakra chakra={chakra} key={idx} />
                  ))}
                </View>
              </View>
            </Tile>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
