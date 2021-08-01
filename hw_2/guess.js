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
    if (data.startsWith('range:')) {
      const [_, min, max] = data.split(' ');
      if (
        (Number(min) || Number(min) === 0) &&
        (Number(max) || Number(max) == 0)
      ) {
        int = getRandomInt(Number(min), Number(max));
      } else {
        console.log(redBright('Задай корректный диапазон значений!'));
      }
    } else if (Number(data) || Number(data) === 0) {
      if (Number(data) > int) console.log('Меньше');
      if (Number(data) < int) console.log('Больше');
      if (Number(data) === int) {
        console.log(`Отгадано число ${Number(data)}`);
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
        rl.pause();
      } else {
        console.log('Тогда продолжаем играть!');
      }
    });
  });
};

startGame();
