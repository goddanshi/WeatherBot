const { Telegraf } = require('telegraf');
const fetch = require('node-fetch'); // если Node <18

const bot = new Telegraf('7653436705:AAG8sciuij4m1IYiqyx0V7S2tUYp81taHuI');

// Мини-класс для работы с OpenWeatherMap
class Weather {
  #apiKey = 'cb997da61a5d7a3928d4f3455ea3b852';
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async fetchWeather() {
    const res = await fetch(`${this.baseUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.#apiKey}&units=metric`);
    return await res.json();
  }
}

// ID чата куда бот будет слать сообщение
const CHAT_ID = '6449169961';

// Функция, которая опрашивает API и отправляет сообщение
async function sendWeather() {
  const weather = new Weather(58.59665, 49.66007); // координаты
  const data = await weather.fetchWeather();

  const msg = `Погода в ${data.name}:
Температура: ${data.main.temp}°C
Ощущается как: ${data.main.feels_like}°C
Состояние: ${data.weather[0].description}`;

  await bot.telegram.sendMessage(CHAT_ID, msg);
}

// Запуск бота
bot.launch();

// Настройка интервала на каждые 5 минут (300000 мс)
setInterval(sendWeather, 300000);

// Можно сразу отправить первый раз при старте
sendWeather();
