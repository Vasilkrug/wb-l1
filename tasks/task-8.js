//Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию,
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

const closures = (arr) => {
    return () => {
        return arr.map(fn => fn())
    }
};