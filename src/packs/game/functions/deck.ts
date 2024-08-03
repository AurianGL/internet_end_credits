import { CardeNames } from "../constants";
import { Deck } from "../types";

export const generateDeck = (): Deck =>
  Array.from({ length: 13 }).map((_, i) => {
    const name = CardeNames[i];
    const value = i + 2;
    const rarity = "common";

    return { rarity, name, value };
  });
