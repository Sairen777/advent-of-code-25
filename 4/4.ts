import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map((row) => row.split(""));

const MAX_ADJACENT_ROLLS = 3;
// switch for part two
const ENABLE_PART_ONE = false;

function solve() {
  let removableRolls = 0;
  let removedLastIteration = -1;

  const getAdjacentRolls = (row: number, col: number): number => {
    let rolls = 0;
    for (let addRow = -1; addRow <= 1; addRow++) {
      for (let addCol = -1; addCol <= 1; addCol++) {
        // skip self
        if (addRow === 0 && addCol === 0) continue;

        if (lines[row + addRow] && lines[row + addRow][col + addCol] === "@") {
          rolls++;
        }
      }
    }

    return rolls;
  };

  while (removedLastIteration !== 0) {
    removedLastIteration = 0;
    for (let row = 0; row < lines[0].length; row++) {
      for (let col = 0; col < lines.length; col++) {
        if (
          lines[row][col] === "@" &&
          getAdjacentRolls(row, col) <= MAX_ADJACENT_ROLLS
        ) {
          if (!ENABLE_PART_ONE) {
            lines[row][col] = "x";
          }

          removableRolls++;
          removedLastIteration++;
        }
      }
    }

    if (ENABLE_PART_ONE) {
      break;
    }
  }

  console.log(removableRolls);
}

solve();
