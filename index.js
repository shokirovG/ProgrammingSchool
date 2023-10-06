require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { kurslar, school } = require("./consts");
const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose");
const addStudent = require("./models/onlineReg");
const moment = require("moment");
mongoose.connect(
  `mongodb+srv://programmingschool71782:${process.env.DB_KEY}@cluster0.emoasae.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("DB connected");
  }
);
console.log("bot ishladi");
bot.start((s) => {
  console.log(moment().subtract(10, "days").calendar());
  s.reply(
    "Assalomu alaykum! Programming School botiga xush kelibsiz.",
    Markup.keyboard([
      ["Bizda mavjud kurslar"],
      ["Programming School haqida"],
      ["Admin bilan bog`lanish"],
      ["telefon raqam qoldirish"],
    ])
  );

  bot.on("message", async (ctx) => {
    if (ctx.message.text.slice(0, 6).toLowerCase() == "school") {
      addStudent.create({ input: ctx.message.text }, (err, post) => {
        if (post) {
          ctx.telegram.sendMessage(
            ctx.message.chat.id,
            ctx.message.text.slice(6) + " tabriklaymiz! ro`yhatdan o`tdi"
          );
          console.log("yangi student qoshildi");
        }
      });
    }
    if (ctx.message.text.slice(0, 3) == "+99") {
      addStudent.create({
        input: ctx.message.text,
        date: moment().subtract(10, "days").calendar(),
      });
      ctx.telegram.sendMessage(
        ctx.message.chat.id,
        "Rahmat sizga tez orada adminlarimiz aloqaga chiqishadi."
      );
    }
    switch (ctx.message.text) {
      case "Bizda mavjud kurslar": {
        console.log(ctx.message.chat.id);
        for (let kurs of kurslar) {
          ctx.telegram.sendMessage(ctx.message.chat.id, kurs, {
            parse_mode: "HTML",
          });
        }

        break;
      }
      case "Programming School haqida": {
        ctx.telegram.sendMessage(ctx.message.chat.id, school, {
          parse_mode: "HTML",
        });
        break;
      }

      case "Admin bilan bog`lanish": {
        ctx.telegram.sendMessage(
          ctx.message.chat.id,
          `Admin: Abdurashidova Gulshoda  TEL: +998 94 286 22 25
Menejer: Fayozov Samandar TEL: +998 94 026 42 20
          `
        );

        break;
      }

      case "telefon raqam qoldirish": {
        ctx.telegram.sendMessage(ctx.message.chat.id, "namuna: +998912345678");

        break;
      }
    }
  });
});

bot.launch();
