const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("6612744870:AAGd8ZrGloxsE8PhpzFV1bX2b6-k4SSPGvU");
bot.start((ctx) =>
  ctx.reply(
    "Welcome😃\nSend me your geolocation and I'll show you the temperature)"
  )
);
bot.on("message", async (ctx) => {
  if (ctx.message.location) {
    console.log(ctx.message.location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=2cfcde3b698fd53929ac959947ebc9ae&units=metric`;
    const response = await axios.get(url);
    console.log(response);
    ctx.reply(`${response.data.name}: ${response.data.main.temp} C°`);
  }
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
