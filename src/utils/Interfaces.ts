/** @format */

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface NavigationType {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface ICharacters {
  name: string;
  img: string;
  description: string;
  skills: CharacterSkill[];
}

export interface Streak {
  name: string;
  profile: string;
  streak: string;
}

export interface CharacterSkill {
  skillName: string;
  skillDescription: string;
  cooldown: string;
  chakras: string[];
  classes: string;
  skillImg: string;
}

export interface Clans {
  clanName: string;
  profile: string;
  wins: string;
  loses: string;
  level: string;
  exp: string;
  streak: string;
  rank: number;
}
export interface Streak {
  name: string;
  profile: string;
  streak: string;
}

export interface Users {
  username: string;
  profile: string;
  wins: string;
  loses: string;
  level: string;
  rank: string;
  exp: string;
  streak: string;
}

export type ChakraName = 'thai' | 'nin' | 'blood' | 'gen' | 'rnd';
