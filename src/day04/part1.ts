import { readLines } from "../lib/utils";
import { BingoCard } from "./BingoCard";

export const getInput = async () => {
  const [numsToDrawString, , ...cardsData] = await readLines(
    "./src/day04/input.txt"
  );
  const numsToDraw = numsToDrawString.split(",").map(Number);
  const bingoCards: BingoCard[] = [];
  let cardData: number[] = [];
  let length = 0;
  for (const line of cardsData) {
    if (line === "") {
      bingoCards.push(new BingoCard(cardData, length));
      length = 0;
      cardData = [];
      continue;
    }
    length++;
    cardData.push(
      ...line
        .split(" ")
        .filter((x) => x !== "")
        .map(Number)
    );
  }
  bingoCards.push(new BingoCard(cardData, length));
  return { bingoCards, numsToDraw };
};
const solution = async () => {
  const { bingoCards, numsToDraw } = await getInput();
  for (const num of numsToDraw) {
    for (const card of bingoCards) {
      card.place(num);
      if (card.won()) {
        return card.getUnMarkedNumbers().reduce((a, b) => a + b, 0) * num; // Solution:8442
      }
    }
  }
  return false;
};
if (require.main === module) {
  (async () => {
    console.log(await solution());
  })();
}
