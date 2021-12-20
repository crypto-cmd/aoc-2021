import { readLines } from "../lib/utils";
import { Stack } from "./Stack";

export const getInputs = async () => {
  const lines = await readLines("./src/day10/input.txt");
  return lines.map((line) => line.trim());
};

 const closingBracketsValueLookUpTable: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export const bracketLookupTable: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
export const closingBrackets = new Set<string>([")", "]", "}", ">"]);
export const openingBrackets = new Set<string>(["(", "[", "{", "<"]);
const solve = async () => {
  const lines = await getInputs();
  const freqTracker: { [key: string]: number } = {};
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
        if (opening == undefined) {
          // Stack is empty
          // console.log(`Line ${lineNumber}: ${char} is closing without opening`);
          terminated = true;
          return;
        }
        if (!isMatching(opening, char)) {
          // console.log(` Line: ${line} : Expected ${opening} but got ${char}`);
          freqTracker[char] = (freqTracker[char] ?? 0) + 1;

          terminated = true;
          return;
        }
      }
    });

    if (stack.data.length > 0 && !terminated) {
      // console.log(`Line ${lineNumber}: Is Incomplete`);
    }
  });
  return Object.entries(freqTracker).reduce((sum, [key, value]) => {
    return sum + closingBracketsValueLookUpTable[key] * value;
  }, 0); // 319329
};
export const isOpening = (char: string) => {
  return openingBrackets.has(char);
};
export const isClosing = (char: string) => {
  return closingBrackets.has(char);
};
export const isMatching = (opening: string, closing: string) => {
  return bracketLookupTable[opening] == closing;
};

if (require.main === module) {
  solve().then(console.log).catch(console.error);
}
