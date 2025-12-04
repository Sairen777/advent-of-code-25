import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const banks = input
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

// change to 2 for part 1 solution
const JOLTAGE_SIZE = 12;

function solve() {
  const maxJoltages = [];

  for (const bank of banks) {
    const bankDigitIndexes: number[] = [];

    while (bankDigitIndexes.length < JOLTAGE_SIZE) {
      let maxNumberIndex = -1;

      for (
        let i = bankDigitIndexes[bankDigitIndexes.length - 1] + 1 || 0;
        i < bank.length;
        i++
      ) {
        if (
          Number(bank[i]) > Number(bank[maxNumberIndex] || -1) &&
          bank.slice(i).length >= JOLTAGE_SIZE - bankDigitIndexes.length
        ) {
          maxNumberIndex = i;
        }
      }

      bankDigitIndexes.push(maxNumberIndex);
    }

    maxJoltages.push(bankDigitIndexes.map((index) => bank[index]).join(""));
  }

  console.log(maxJoltages.reduce((acc, curr) => acc + Number(curr), 0));
}

solve();
