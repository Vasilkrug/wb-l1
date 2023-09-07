//Реализовать функцию конвертации JSON в строку
//obj - не добавляет undf func symbol, inf and nan - null
//arr - null, und,symbol правращает в null

const toJson = (data) => {
    //здесь проверки на типы данных
    const isNumber = (value) => typeof value === 'number';
    const isString = (value) => typeof value === 'string';
    const isBoolean = (value) => typeof value === 'boolean'
    const isFunction = (value) => typeof value === 'function';
    const isSymbol = (value) => typeof value === 'symbol';
    const isUndefined = (value) => typeof value === 'undefined' && value === undefined;
    const isNull = (value) => typeof value === 'object' && value === null;
    const isNotANumber = (value) => typeof value === 'number' && isNaN(value);
    const isInfinity = (value) => typeof value === 'number' && !isFinite(value);
    const isDate = (value) => typeof value === 'object' && value !== null && typeof value.getMonth === 'function';
    const isArray = (value) => typeof value === 'object' && Array.isArray(value);
    const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

//некоторые значения в массиве, согласно спецификации Json.stringify преобразуются в null
    const nullDataForArray = (value) => {
        return isNotANumber(value) || isInfinity(value) || isNull(value) || isNull(value) || isUndefined(value) || isSymbol(value)
    }
//некоторые значения в объекте, согласно спецификации Json.stringify преобразуются в null
    const nullDataForObject = (value) => {
        return isNotANumber(value) || isInfinity(value)
    }
    ////некоторые значения в объекте, согласно спецификации Json.stringify игнорируются
    const ignoreForObject = (value) => isFunction(value) || isSymbol(value) || isUndefined(value) || isNull();
//доп функция удаления запятой
    const deleteComma = (str) => {
        const tempArr = str.split('');
        tempArr.pop();
        return tempArr.join('');
    };
//согласно спецификации Json.stringify объект Date преобразуем в строку
    if (isDate(data)) {
        return `"${data.toISOString()}"`
    }
//если находим объект , то проходим в цикле и собираем в строку
    if (isObject(data)) {
        let string = ''
        Object.keys(data).forEach(key => {
            const value = data[key]
            //если не находим игнорируемое значение собираем строку,
            // если находим значение которое возвращает согласно спецификации null то делаем это,
            // иначе добавляем значение в строку и вызываем функцию рекурсивно, проверяя что у нас хранится в этом значении
            if (!ignoreForObject(value)) {
                string += nullDataForObject(value) ? `"${key}":${null},` : `"${key}":${toJson(value)},`
            }
        })
        return `{${deleteComma(string)}}`
    }
//если находим массив , то проходим в цикле и собираем в строку
    if (isArray(data)) {
        let string = ''
        data.forEach(item => {
            //если находим значение которое возвращает согласно спецификации null то делаем это,
            // иначе добавляем значение в строку и вызываем функцию рекурсивно, проверяя что у нас хранится в этом значении
            if (nullDataForArray(item)) {
                string += null
                string += ','
            } else {
                string += `${toJson(item)}`
                string += ','
            }
        })
        return `[${deleteComma(string)}]`
    }
//примитивы оборачиваем в ковычки, строку в двойные, остальные в одиновчные
    if (isNumber(data) || isBoolean(data) || isString(data)) {
        const quotes = typeof data === 'string' ? `"` : '';
        return `${quotes}${data}${quotes}`;
    }
};