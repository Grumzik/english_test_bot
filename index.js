
const TelegramApi = require('node-telegram-bot-api'); 
const {testOptions} = require('./options');
const token = '6935150116:AAFmZFubTVvcTJFM-CY317dgOmTkofvuhwY';
const bot = new TelegramApi(token, {polling: true}); 
const db = {};



async function startTest(chatId){
  await bot.sendMessage(chatId, 'Ответь на вопрос:', testOptions);
}

function start(){

  bot.on('message',(msg)=>{
    console.log(msg);
    const chatId = msg.chat.id,
          user = msg.chat.username,
          text = msg.text;

    bot.setMyCommands([
      {'command':'/start','description':'Первый запус бота'},
      {'command':'/info','description':'Информация об успеваемости'},
      {command:'/start_test',description:'Начать тестирование'},
      {command:'/continue',description:'Следующий вопрос'},
      {command:'/pause',description:'Пауза'},
      {command:'/stop_test',description:'Остановить тестирование'}
    ]);

    switch(text){
      case '/start': 
        bot.sendMessage(chatId, `Hallo, ${user}! You sent me: ${text}`);
        break;
      case '/info':
        bot.sendMessage(chatId, `Hallo! I know you! You are ${user}!`);
        break;
      case  '/start_test': 
        bot.sendMessage(chatId, `Ok! Let's start.  ${text}!`);
        return startTest(chatId);
        break;
      case  '/pause': 
        bot.sendMessage(chatId, `pause.  ${text}!`);
        break;
      case  '/stop_test': 
        bot.sendMessage(chatId, `STOP! you are finished.  ${text}!`);
        break;
    }    
  });

  bot.on('callback_query', async msg=>{
    console.log(msg);
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data==='/continue'){
      return startTest(chatId)
    }

    if(data==='/stop_test'){
      return bot.sendMessage(chatId, 'Тест закончен.')
    }

    bot.sendMessage(chatId,data);
  })

}
start();
