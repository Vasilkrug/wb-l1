//Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

const jsonParser = (str) => {
    //инициализируем i как индекс для текущего символа
    // как только i достигнет конца строки проверка завершится
    let i = 0;
    //пара ключ-значение должна заканичиваться запятой и если ее нет то выбрасываем ошибку
    const checkComma = () => {
        if (str[i] !== ',') {
            throw new Error('Expected ",".');
        }
        i++;
    }
    //пара ключ и заначение должны разделяться двоеточием
    const checkColon = () => {
        if (str[i] !== ':') {
            throw new Error('Expected ":".');
        }
        i++;
    }
//пропускаем пробелы
    const skipWhitespace = () => {
        while (
            str[i] === " " ||
            str[i] === "\n" ||
            str[i] === "\t" ||
            str[i] === "\r"
            ) {
            i++;
        }
    }
    //функция проверит,
    // соответствует ли текущая строка str.slice(i) false, true или null, если да, то вернет значение
    const keywordParse = (name, value) => {
        if (str.slice(i, i + name.length) === name) {
            //увеличим счетчик на длинну строки таким образом пропустив ее и вернув само значение
            i += name.length;
            return value;
        }
    }
//функция парсинга строки
    const stringParse = () => {
        if (str[i] === '"') {
            i++;
            let result = "";
            //проходим до конца строки
            while (str[i] !== '"') {
                result += str[i];
                i++;
            }
            i++;
            return result;
        }
    }
    //парсим число которое может быть дробным, отрицательным
    const numberParse = () => {
        let start = i;
        if (str[i] === "-") {
            i++;
        }
        if (str[i] === "0") {
            i++;
        } else if (str[i] >= "1" && str[i] <= "9") {
            i++;
            while (str[i] >= "0" && str[i] <= "9") {
                i++;
            }
        }
        if (str[i] === ".") {
            i++;
            while (str[i] >= "0" && str[i] <= "9") {
                i++;
            }
        }
        if (i > start) {
            return Number(str.slice(start, i));
        }
    };
//парсим значение убирая пробел,
// проверяем значения: "строка", "число", "объект", "массив",
// "true", "false" или "null", а затем также убираем пробел
    //здесь использую оператор ?? который вовзращаем значение по умолчанию только когда значение равно null или undefined
    const parseValue = () => {
        skipWhitespace();
        const value =
            stringParse() ??
            numberParse() ??
            objectParse() ??
            arrayParse() ??
            keywordParse('true', true) ??
            keywordParse('false', false) ??
            keywordParse('null', null);
        skipWhitespace();
        return value;
    };
//как только в строке встретим объект str[i] === '{', нам понадобится функция objectParse
    //в ней используются доп функции пропуска пробела и проверка на наличие запятых с двоеточием
    const objectParse = () => {
        if (str[i] === '{') {
            i++;
            //убираем пробелы
            skipWhitespace();
            const obj = {};
            let initial = true;
            //ппоходим до тех пор пока не доходим до конца объекта
            while (str[i] !== '}') {
                if (!initial) {
                    checkComma();
                    skipWhitespace();
                }
                const key = stringParse();
                skipWhitespace();
                checkColon();
                obj[key] = parseValue();
                initial = false;
            }
            return obj;
        }
    };
//если встречаем массив то работаем в функции парсинга массива
    const arrayParse = () => {
        if (str[i] === '[') {
            i++;
            skipWhitespace();
            const array = [];
            let initial = true;
            while (str[i] !== ']') {
                if (!initial) {
                    checkComma();
                }
                const value = parseValue();
                array.push(value);
                initial = false;
            }
            // проходим пока не доходим до конца массива str[i] === ']'
            i++;
            return array;
        }
    }
    return parseValue();
};