const TelegramBot = require('node-telegram-bot-api');

const token = '7427818855:AAEAawHdU2V1Z5Fa6S0RCBriP_hDwn0gPHY';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Salom! Tug\'ilgan sanangizni yil-oy-kun formatida kiriting.');
});

bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;


    if (text.includes('-') && text.length === 10) {
        const [year, month, day] = text.split('-').map(Number);
        const now = new Date();
        const birthDate = new Date(year, month - 1, day);

        let ageYears = now.getFullYear() - birthDate.getFullYear();
        let ageMonths = now.getMonth() - birthDate.getMonth();
        let ageDays = now.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        bot.sendMessage(chatId, `Siz ${ageYears} yosh, ${ageMonths} oy va ${ageDays} kundasiz.`);
    } else {
        bot.sendMessage(chatId, 'Iltimos, sana yil-oy-kun formatida kiriting.');
    }
});
