//Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

let i = 0;
const callstackSize = () => {
    i++;
    let a = i + 1;
    let b = a + 1;
    let c = b + 1;
    let d = c + 1;
    let e = d + 1;
    callstackSize();
};

try {
    callstackSize();
} catch (e) {
    //первоначально стэк вызовов пустой
    const callStack = 0;
    //вызывая функцию с одной переменной получаем 13956 вызовов
    const first = 13956;
    //с 5 переменными количество вызовов уже меньше 8971
    const second = 8971;
    const variablesCount = 5;
    //функцию выше мы вызывали с типом данных 'number', а согласно спецификации "Числа в JavaScript представлены 64-битными значениями
    // с плавающей запятой. В байте 8 бит, в результате каждое число занимает 64/8 = 8 байт."
    const numberSize = 8;
    //для начала нам нужно узнать размер функции c помощью размера самого Execution Stack, а так же суммы размеров всех переменных внутри функции
    //В итоге получим формулу расчета количества байт которое занимает функция : fnSize = callstack + variablesCount * numberSize
    //для функции с без переменных получится Result = (callStack + 0 *  numberSize) * first
    //для второй Result = (callStack + variablesCount * numberSize) * second
    //можем приравнять правые части уравнений.
    //callStack * first = (callStack + variablesCount * numberSize) * second
    // упрощаем callStack * first = callStack * second + variablesCount * numberSize * second
    //выражаем отсюда callstack и получаем примерно 72
    // console.log(72 * first)
    // console.log(72 * second + variablesCount * numberSize * second)
    // Итог
    const firstResult = first * 72;
    const secondResult = 72 * second + variablesCount * numberSize * second;
    //размер коллстека в chrome 1mb
    //firefox 1mb
    //opera 1mb
    //yandex 1mb
    //Ну, а если под размером имелось ввиду количество вызовов функции то можно просто сделать console.log(i)
    // который будет разным в зависимости от количества переменных
    console.log(`${firstResult} bytes`)
    console.log(`${secondResult} bytes`)
}