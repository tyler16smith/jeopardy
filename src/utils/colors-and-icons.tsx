// iconLibrary.ts
import {
  Baby, Bird, CakeSlice, Cat,
  Dog, DollarSign, Fish, Flame,
  Flower, HandMetal, Rabbit, ShoppingCart,
  Shovel, Smile, Squirrel, Star, Sun,
  Tractor, TrafficCone, TreePine, Trophy, Turtle
} from 'lucide-react';
import { type TPlayer } from './types';

type TIconLibrary = Record<number, JSX.Element>

export const NUM_ICONS = 22
export const iconLibrary: TIconLibrary = {
  0: <Smile size={24} />,
  1: <Cat size={24} />,
  2: <Dog size={24} />,
  3: <Fish size={24} />,
  4: <Bird size={24} />,
  5: <Rabbit size={24} />,
  6: <Squirrel size={24} />,
  7: <Turtle size={24} />,
  8: <TreePine size={24} />,
  9: <Baby size={24} />,
  10: <DollarSign size={24} />,
  11: <Flame size={24} />,
  12: <Flower size={24} />,
  13: <Shovel size={24} />,
  14: <ShoppingCart size={24} />,
  15: <Trophy size={24} />,
  16: <Tractor size={24} />,
  17: <Sun size={24} />,
  18: <Star size={24} />,
  19: <TrafficCone size={24} />,
  20: <CakeSlice size={24} />,
  21: <HandMetal size={24} />,
}

type TColorLibrary = Record<number, string>
export const NUM_COLORS = 12
export const colorLibrary: TColorLibrary = {
  0: '#fcba03',
  1: '#c70000',
  2: '#db8400',
  3: '#d4d402',
  4: '#029602',
  5: '#029602',
  6: '#5d1fad',
  7: '#b02098',
  8: '#3088ba',
  9: '#1f9c89',
  10: '#666666',
  11: '#000000',
}

export const getUniqueIconAndColor = (players: TPlayer[]) => {
  let iconId = Math.floor(Math.random() * NUM_ICONS)
  let colorId = Math.floor(Math.random() * NUM_COLORS)
  const maxTries = NUM_ICONS * NUM_COLORS - 2

  while (
    players.length < maxTries &&
    players.some(player => player.iconId === iconId && player.colorId === colorId)
  ) {
    iconId = Math.floor(Math.random() * NUM_ICONS)
    colorId = Math.floor(Math.random() * NUM_COLORS)
  }

  return { iconId, colorId }
}