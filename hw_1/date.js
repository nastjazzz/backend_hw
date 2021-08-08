#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const countDate = (cmd, number, value) => {
  return cmd === 'add' ? number + value : number - value;
};

const isCommandPresent = (commandsArr) => {
  return commandsArr.includes('add') || commandsArr.includes('sub');
};

const getCmdAnswer = (cmd, option, value, date) => {
  if (option === 'y') {
    console.log(
      new Date(
        date.setFullYear(countDate(cmd, date.getFullYear(), value))
      ).toLocaleDateString()
    );
  }
  if (option === 'm') {
    console.log(
      new Date(
        date.setMonth(countDate(cmd, date.getMonth(), value))
      ).toLocaleDateString()
    );
  }
  if (option === 'd') {
    console.log(
      new Date(
        date.setDate(countDate(cmd, date.getDate(), value))
      ).toLocaleDateString()
    );
  }
};

const parseFlags = () => {
  const date = new Date();
  const isCmdPresent = isCommandPresent(argv._);

  if (argv.y || argv.year) {
    isCmdPresent
      ? getCmdAnswer(...argv._, 'y', argv.y || argv.year, date)
      : console.log(date.getFullYear());
  } else if (argv.month || argv.m) {
    isCmdPresent
      ? getCmdAnswer(...argv._, 'm', argv.month || argv.m, date)
      : console.log(date.getMonth() + 1);
  } else if (argv.d || argv.date) {
    isCmdPresent
      ? getCmdAnswer(...argv._, 'd', argv.d || argv.date, date)
      : console.log(date.getDate());
  } else {
    console.log(date.toLocaleDateString());
  }
};

parseFlags();
