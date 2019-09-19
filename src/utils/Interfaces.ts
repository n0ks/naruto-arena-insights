import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

export interface NavigationType {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface ICharacters {
  name: string;
  img: string;
  description: string;
  skills: CharacterSkill[];
}

export interface CharacterSkill {
  skillName: string;
  skillDescription: string;
  cooldown: string;
  chakras: string[];
  classes: string;
  skillImg: string;
}
