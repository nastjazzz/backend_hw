#!/usr/bin/env node
const fs = require('fs');
const { exit } = require('process');

const analyzeData = (rawData) => {
  let wonGames = 0;
  let lostGames = 0;
  const numberOfGames = rawData.length;

  rawData.forEach((game) => {
    if (game.result === 'win') {
      wonGames += 1;
    }
    if (game.result === 'lose') {
      lostGames += 1;
    }
  });
  const percentWonGames = Math.round((wonGames * 100) / numberOfGames);
  console.log('Общее кол-во партий:', numberOfGames);
  console.log(
    'Кол-во выигранных / проигранных партий:',
    wonGames,
    '/',
    lostGames
  );
  console.log('Процент выигранных партий:', percentWonGames);
};

const readLogFile = () => {
  const [_, __, fileName] = process.argv;

  if (fileName) {
    if (!fs.existsSync(fileName)) {
      console.error('Такого файла нет, дай корректное название!');
      exit();
    }
    fs.stat(`${fileName}`, (err, stats) => {
      if (err) throw err;
      else {
        if (!stats.size) {
          console.error('Файл пуст, нечего анализировать!');
          exit();
        }
      }
    });

    fs.readFile(`${fileName}`, function (err, data) {
      if (err) throw err;
      let rawData = JSON.parse(data);
      // console.log({ rawData });
      analyzeData(rawData);
    });
  } else {
    console.log('Дай мне название файла!');
  }
};

readLogFile();
