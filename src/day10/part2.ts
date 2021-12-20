import {
  getInputs,
  isOpening,
  isClosing,
  isMatching,
  bracketLookupTable,
} from "./part1";
import { Stack } from "./Stack";
const closingBracketsValueLookUpTable: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
const solve = async () => {
  const lines = await getInputs();
  const scores: number[] = [];
  lines.forEach((line) => {
    const stack = new Stack<string>();
    let terminated = false;

    line.split("").forEach((char) => {
      if (terminated) return;
      if (isOpening(char)) {
        stack.push(char);
      }
      if (isClosing(char)) {
        const opening = stack.pop();
        if (opening == undefined || !isMatching(opening, char)) {
          // Corrupt Lines
          terminated = true;
          return;
        }
      }
    });

    let score = 0;
    while (stack.data.length > 0 && !terminated) {
      const nextChar = stack.pop();
      if (nextChar == undefined) return;
      score =
        score * 5 +
        closingBracketsValueLookUpTable[bracketLookupTable[nextChar]];
    }
    if (score > 0) scores.push(score);
  });
  scores.sort((a, b) => b - a);
  return scores[Math.floor(scores.length / 2)]; // 3515583998
};

if (require.main === module) {
  (async () => {
    console.log(await solve());
  })();
}
