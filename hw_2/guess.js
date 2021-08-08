#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomInt(min, max) {
  console.log(`Загадано число в диапазоне от ${min} до ${max}`);
  return Math.floor(Math.random() * (max - min)) + min;
}

const startGame = () => {
  console.log(`
Привет!
Сейчас мы будем отгадывать числа.
Если хочешь, то можешь задать свой диапазон для игры.
Для этого нужно ввести команду range: min max.
  `);
  let int = getRandomInt(0, 100);

  rl.on('line', (data) => {
    const dataNumber = Number(data);

    if (data.startsWith('range:')) {
      const [_, minStr, maxStr] = data.split(' ');
      const min = Number(minStr);
      const max = Number(maxStr);

      if ((min || min === 0) && (max || max === 0)) {
        int = getRandomInt(min, max);
      } else {
        console.log('Задай корректный диапазон значений!');
      }
    } else if (dataNumber || dataNumber === 0) {
      if (dataNumber > int) console.log('Меньше');
      if (dataNumber < int) console.log('Больше');
      if (dataNumber === int) {
        console.log(`Отгадано число ${dataNumber}`);
        rl.question(
          `Если хочешь продолжить, то введи restart, если нет - exit\n`,
          (answer) => {
            if (answer === 'restart') {
              int = getRandomInt(0, 100);
            }
            if (answer === 'exit') {
              rl.close();
            }
          }
        );
      }
    } else {
      console.log('Вводи, пожалуйста, числа или команды!');
    }
  });

  rl.on('SIGINT', () => {
    rl.question('Ты уверен, что хочешь выйти?', (answer) => {
      if (answer.match(/^y(es)?$/i) || answer === 'да' || answer === '') {
        rl.close();
      } else {
        console.log('Тогда продолжаем играть!');
      }
    });
  });
};

startGame();
