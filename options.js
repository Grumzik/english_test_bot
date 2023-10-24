module.exports={
  testOptions : {
    reply_markup: JSON.stringify({
      inline_keyboard:[
        [{text:'yes',callback_data:'yes'},{text:'no',callback_data:'no'}],
        [{text:'Продолжить тест',callback_data:'/continue'}, {text:'Завершить тест',callback_data:'/stop_test'}]
      ]
    })
  }
}

