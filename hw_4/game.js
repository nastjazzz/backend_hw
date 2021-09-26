#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const writeResultToFile = (logFile, result) => {
  const path = `./${logFile}`;

  if (!fs.existsSync(path)) {
    fs.open(`${logFile}`, 'w', (err) => {
      if (err) throw err;
      // console.log('File created');
    });
  }
  fs.stat(`${logFile}`, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      if (!stats.size) {
        fs.appendFile(
          `${logFile}`,
          JSON.stringify([{ result: result }]),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      } else {
        fs.readFile(`${logFile}`, function (err, data) {
          if (err) throw err;
          let rawData = JSON.parse(data);
          // console.log({ rawData });
          rawData.push({ result: result });
          fs.writeFile(path, JSON.stringify(rawData), (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      }
    }
  });
};

const startGame = () => {
  const [_, __, fileName] = process.argv;

  if (fileName) {
    let number = getRandomInt(1, 2);
    console.log(`Привет! Я загадала число - 1 или 2. Отгадывай!`);

    rl.on('line', (data) => {
      let result = '';
      const dataNumber = Number(data);
      console.log({ number, dataNumber });

      if (dataNumber || dataNumber === 0) {
        if (dataNumber === number) {
          console.log('Поздравляю! Число отгадано!');
          result = 'win';
        } else {
          console.log('Увы! Не угадали! :(');
          result = 'lose';
        }
        writeResultToFile(fileName, result);
        rl.question(`Будем дальше играть? (yes/no)\n`, (answer) => {
          if (answer.match(/^[Yy].*/)) {
            console.log('загадываем новое');
            number = getRandomInt(1, 2);
          } else {
            rl.close();
          }
        });
      } else {
        console.log('Вводи, пожалуйста, числа!');
      }
    });
  } else {
    console.log('Дай мне название файла для логов!');
    rl.close();
  }
};

startGame();
