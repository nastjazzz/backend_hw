#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const validFlags = ['year', 'y', 'date', 'd', 'month', 'm'];

const getCommandAnswer = (option, command, counter) => {
  const date = new Date();
  if (counter) {
    if (option === 'm' || option === 'month') {
      return command === 'sub'
        ? new Date(date.setMonth(date.getMonth() - counter)).getMonth() +
            1 +
            ' '
        : new Date(date.setMonth(date.getMonth() + counter)).getMonth() +
            1 +
            ' ';
    }
    if (option === 'y' || option === 'year') {
      return command === 'sub'
        ? date.getFullYear() - counter + ' '
        : date.getFullYear() + counter + ' ';
    } else if (option === 'd' || option === 'date') {
      return command === 'sub'
        ? new Date(date.setDate(date.getDate() - counter)).getDate() + ' '
        : new Date(date.setDate(date.getDate() + counter)).getDate() + ' ';
    }
  } else {
    console.log('какая-то хрень с командой');
    return '';
  }
};

const getCommands = (commands, otherArgv, readyString) => {
  commands.forEach((command, index) => {
    if (otherArgv[index]) {
      const [option, counter] = otherArgv[index];
      if (validFlags.includes(option)) {
        if (typeof counter !== 'object') {
          readyString =
            readyString + getCommandAnswer(option, command, counter);
        } else {
          const newCounter = counter[index];
          readyString =
            readyString + getCommandAnswer(option, command, newCounter);
        }
      } else {
        if (option === '$0' && otherArgv[index - 1]) {
          const [option, counter] = otherArgv[index - 1];
          const newCounter = counter[index];
          readyString =
            readyString + getCommandAnswer(option, command, newCounter);
        }
      }
    }
  });
  if (readyString.length) {
    console.log(readyString);
  } else {
    console.log('какая-то хрень с командой');
  }
};

const printValue = (flags) => {
  const date = new Date();

  let printedValues = {
    year: false,
    month: false,
    date: false,
  };
  let readyString = '';

  if (!Object.keys(flags).length) {
    console.log(date.toLocaleString());
  } else {
    for (let key in flags) {
      if (key === 'year' || key === 'y') {
        if (!printedValues['year']) {
          readyString = readyString + date.getFullYear() + ' ';
          printedValues['year'] = true;
        }
      }
      if (key === 'm' || key === 'month') {
        if (!printedValues['month']) {
          readyString = readyString + (date.getMonth() + 1) + ' ';
          printedValues['month'] = true;
        }
      }
      if (key === 'date' || key === 'd') {
        if (!printedValues['date']) {
          readyString = readyString + date.getDate() + ' ';
          printedValues['date'] = true;
        }
      }
    }
  }
  console.log(readyString);
};

const parceFlags = (argv) => {
  let readyString = '';
  let flags = {};

  for (let key in argv) {
    if (
      key === '_' &&
      (argv[key].includes('add') || argv[key].includes('sub'))
    ) {
      const [rawCommand, ...otherArgv] = Object.entries(argv);
      const [_, commands] = rawCommand;
      getCommands(commands, otherArgv, readyString);
      process.exit(0);
    }
    if (validFlags.includes(key)) {
      flags[key] = argv[key];
    }
  }
  printValue(flags);
};

parceFlags(argv);
