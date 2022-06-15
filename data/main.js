const fs = require("fs");
const jsonData = require("./people.json");

const primaryTable = [];
let flag1 = 0;
let flag2 = 0;
const fd = [];

for (let i = 0; i < jsonData.length; i++) {
  const curr = Object.values(jsonData[i]);
  primaryTable.push(curr);
}

const sorting = (index) => {
  primaryTable.sort((a, b) => {
    if (a[index] === b[index]) {
      return 0;
    } else {
      return a[index] < b[index] ? -1 : 1;
    }
  });
  return primaryTable;
};

for (let j = 0; j < Object.values(jsonData[0]).length; j++) {
  // sorting here
  sorting(j);
  for (let i = j + 1; i < Object.values(jsonData[0]).length; i++) {
    flag1 = 0;
    flag2 = 0;
    for (let k = 0; k < jsonData.length - 1; k++) {
      if (
        primaryTable[k][j] === primaryTable[k + 1][j] &&
        primaryTable[k][i] !== primaryTable[k + 1][i]
      ) {
        flag1 = 1;
      }
      if (
        primaryTable[k][i] === primaryTable[k + 1][i] &&
        primaryTable[k][j] !== primaryTable[k + 1][j]
      ) {
        flag2 = 1;
      }
    }
    if (flag1 === 0) {
      console.log("Functional Dependency from ", j, " to ", i);
      fd.push([j, i]);
    }
    if (flag2 === 0) {
      console.log("Functional Dependency from ", i, " to ", j);
      fd.push([i, j]);
    }
  }
}

const dict = JSON.stringify(fd);
fs.writeFileSync("fdOutput.json", dict);

module.export = { primaryTable, fd, sorting };
