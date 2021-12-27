import { solve } from "./part1";

// JavaScript heap out of memory error *sigh*
if (require.main === module) {
  solve(40)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
}
