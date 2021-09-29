#!/usr/bin/env node
require('dotenv').config();

const http = require('http');
const readline = require('readline');

const myAPIKey = process.env.API_KEY;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let defaultCity = 'Moscow';
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}`;

const formatWeather = (weatherObj) => {
  if (!weatherObj) return;
  const { location, current } = weatherObj;
  console.log(`
  Сейчас ${location.localtime},
  Погода в ${location.name}, ${location.country},
  Температура: ${current.temperature}°C, ощущается как ${current.feelslike}°C,
  Скорость ветра: ${current.wind_speed} м/с, направление ветра: ${current.wind_dir},
  Влажность: ${current.humidity} %,
  ${current.weather_descriptions[0]}
    `);
};

const getWeather = async (url) => {
  let data = '';
  return new Promise((res, rej) => {
    http
      .get(url, (response) => {
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res(JSON.parse(data));
        });
      })
      .on('error', (e) => {
        rej(`Error in func getWeather() : ${e.message}`);
      });
  });
};

const start = () => {
  console.log(
    'Привет! Показываю погоду в Москве или в любом другом городе!\n(если захочешь узнать погоду в другому городе, то просто введи название города)'
  );
  rl.on('line', async (data) => {
    let city = data.length ? data : defaultCity;
    let newUrl = url + `&query=${city}`;
    const answer = await getWeather(newUrl);
    formatWeather(answer);
  });
};

start();
