import fs from "fs";

const inputRanges = fs
  .readFileSync("input.txt", "utf8")
  .trim()
  .split(",")
  .map((range) => range.split("-"));

function solve() {
  let sum = 0;

  for (const [min, max] of inputRanges) {
    for (let i = Number(min); i <= Number(max); i++) {
      const strI = String(i);
      // let j = strI.length / 2 for part 1
      for (let j = 1; j <= strI.length / 2; j++) {
        const numPattern = strI.slice(0, j);
        if (strI.length % j !== 0) {
          continue;
        }

        if (numPattern.repeat(strI.length / j) === strI) {
          sum += Number(i);
          break;
        }
      }
    }
  }

  console.log(sum);
}

solve();
