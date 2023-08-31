//Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами.
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.
const moment = require('moment');
//функция принимает язык в формате ('en','ru' и прочее),формат ('day' вернет текущий день, 'time' вернет текущее время, 'full' вернет полную текущую дату со временем)
const getCurrentDate = (lang = 'en',format='day') => {
    //для избавления от условных конструкций добавли диспетчирезацию по ключу для выбора формата
    const formatMapping = {
        'day':'dddd',
        'time':'LTS',
        'full':'LLLL'
    }
    moment.locale(lang)
    return moment()
        .format(formatMapping[format.toLowerCase()] || 'LL')
}
console.log(getCurrentDate('ru','full'))