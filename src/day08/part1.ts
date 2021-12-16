import { readLines } from "../lib/utils";

export const getInputs = async () => {
  const lines = await readLines("./src/day08/input.txt");
  const signals: string[] = [];
  const outputs: string[] = [];
  lines.forEach((line) => {
    const [signal, output] = line.split("|");
    signals.push(signal.trim());
    outputs.push(output.trim());
  });
  return { signals, outputs };
};
const solve = async () => {
  const { outputs } = await getInputs();
  const uniqueValues = new Set([2, 4, 7, 3]);
  return outputs.reduce((acc, output) => {
    output.split(" ").forEach((value) => {
      if (uniqueValues.has(value.length)) {
        acc+=1;
      }
    });
    return acc;
  }, 0); // 318
};
if (require.main === module) {
  (async () => {
    const count = await solve();
    console.log(count);
  })();
}
