import {getInput } from "./part1"

const solution = async () => {
  const { bingoCards, numsToDraw } = await getInput();
  bingoCards.forEach((bingoCard, index) => bingoCard.setId(index));
  const wonCards = new Set();
  for (const num of numsToDraw) {
    for (const card of bingoCards) {
      if(wonCards.has(card.getId())) continue;
      card.place(num);
      if (card.won()) {
        if (wonCards.size === bingoCards.length - 1) {
          return card.getUnMarkedNumbers().reduce((a, b) => a + b, 0) * num; // Solution: 4590
        }
        wonCards.add(card.getId());
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
