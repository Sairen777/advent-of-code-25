import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .reduce(
    (acc, curr) => {
      acc[curr.includes("-") ? 0 : 1].push(curr);

      return acc;
    },
    [[], []] as String[][],
  );

function solvePartOne() {
  let validIdCount = 0;
  const [validRanges, ids] = lines;

  for (const id of ids) {
    for (const validRange of validRanges) {
      const [min, max] = validRange.split("-");

      if (Number(id) >= Number(min) && Number(id) <= Number(max)) {
        validIdCount++;
        break;
      }
    }
  }

  console.log(validIdCount);
}

function solvePartTwo() {
  const [validRanges] = lines;
  let rangesArr: Array<number[] | undefined> = validRanges.map((range) =>
    range.split("-").map(Number),
  );
  let rangesAdjusted = -1;

  while (rangesAdjusted !== 0) {
    rangesAdjusted = 0;

    for (let i = 0; i < rangesArr.length; i++) {
      rangesAdjusted += adjustRangesByRange(rangesArr[i]!, i);
      rangesArr = rangesArr.filter(Boolean);
    }
  }

  console.log(
    (rangesArr as number[][]).reduce((acc: number, curr: number[]) => {
      acc += curr![1] - curr![0] + 1;

      return acc;
    }, 0),
  );

  function adjustRangesByRange(
    [min, max]: number[],
    rangeIndex: number,
  ): number {
    let rangesAdjusted = 0;
    for (let i = rangeIndex + 1; i < rangesArr.length; i++) {
      if (rangesIntersect([min, max], rangesArr[i]!)) {
        rangesArr[i] = [
          Math.min(min, rangesArr[i]![0]),
          Math.max(max, rangesArr[i]![1]),
        ];
        rangesArr[rangeIndex] = undefined;
        rangesAdjusted++;
      }
    }

    return rangesAdjusted;
  }

  function rangesIntersect(
    [min1, max1]: number[],
    [min2, max2]: number[],
  ): boolean {
    return (max1 <= max2 && max1 >= min2) || (max2 <= max1 && max2 >= min1);
  }
}

console.log("part one solution: " + solvePartOne());
console.log("part two solution: " + solvePartTwo());
