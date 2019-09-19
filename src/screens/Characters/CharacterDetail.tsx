import React, { useState } from "react";
import { Text, Avatar, Tile, colors } from "react-native-elements";
import { View, SafeAreaView, ColorPropType, StyleSheet } from "react-native";
import { NavigationType, Characters } from "utils";
import { ScrollView } from "react-native-gesture-handler";
import { Chakra } from "src/components";

export const chakraMap = {
  thai: "#4caf50",
  blood: "#e53935",
  nin: "#1e88e5",
  gen: "#eeeeee",
  rnd: "#424242"
};

export const CharacterDetail: React.SFC<NavigationType> = ({ navigation }) => {
  const character: Characters = navigation.getParam("item");
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, alignItems: "center" }}
      >
        <Avatar
          source={{ uri: character.img }}
          rounded
          size={100}
          containerStyle={{ borderWidth: 1, marginBottom: 24 }}
        />
        <Text h1>{character.name}</Text>
        <View style={{ padding: 20 }}>
          <Text
            h4
            h4Style={{
              textAlign: "justify",
              padding: 24
            }}
          >
            {character.description}
          </Text>
          {character.skills.map((skill, i) => (
            <Tile
              key={i}
              imageSrc={{ uri: skill.skillImg }}
              imageContainerStyle={{
                flex: 0,
                alignSelf: "center",
                marginVertical: 16
              }}
              containerStyle={{
                borderTopColor: colors.grey4,
                borderTopWidth: StyleSheet.hairlineWidth
              }}
              title={skill.skillName}
              titleStyle={{
                textTransform: "uppercase"
              }}
              imageProps={{
                width: 100,
                height: 100,
                borderRadius: 50,
                resizeMode: "contain",
                style: { width: 100, height: 100, flexDirection: "row" }
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignContent: "center"
                }}
              >
                <Text h4>{skill.skillDescription}</Text>

                <Text
                  h4
                  h4Style={{
                    color: colors.grey2,
                    fontFamily: "SFProDisplay-Regular"
                  }}
                >
                  {skill.classes}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row"
                    // alignContent: "center"
                  }}
                >
                  <Text
                    h4
                    h4Style={{
                      lineHeight: 16,
                      marginRight: 16
                    }}
                  >{`CD: ${skill.cooldown}`}</Text>
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
