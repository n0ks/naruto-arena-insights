import React from "react";
import { Avatar, Tile } from "react-native-elements";
import { View, SafeAreaView } from "react-native";
import { NavigationType, ICharacters } from "utils";
import { ScrollView } from "react-native-gesture-handler";
import { Chakra, DText } from "src/components";

import styles from "./CharacterDetails.styles";

export const chakraMap = {
  thai: "#4caf50",
  blood: "#e53935",
  nin: "#1e88e5",
  gen: "#eeeeee",
  rnd: "#424242"
};

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
              imageContainerStyle={styles.tileImgContainer}
              containerStyle={styles.tileContainer}
              imageProps={{
                width: 100,
                height: 100,
                borderRadius: 50,
                containerStyle: {
                  alignSelf: "center",
                  elevation: 3,
                  borderRadius: 50,
                  marginTop: 24
                },
                placeholderStyle: { borderRadius: 50, elevation: 3 },
                resizeMode: "contain",
                style: { width: 100, height: 100 }
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
                  {skill.chakras.map((chakra, i) => (
                    <Chakra chakra={chakra} key={i} />
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
