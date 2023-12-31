//Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом.
// Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

const isPalindrome = (str) => {
    //не добавлял проверку на пустую строку и строку с одним символом, так как в обоих случаях это палиндром
    //отсекам пробелы и устанавливаем строку в нижний регистр
    const newStr = str.split(' ').join('').toLowerCase();
    //проходим циклом до середины строки, уставновив два указателя (текущий и элемент с конца, соответствующий текущему индексу)
    for (let i = 0; i < newStr.length / 2; i++) {
        const curr = newStr[i];
        const currFromEnd = newStr[newStr.length - 1 - i];
        //если в каком то случаем символы не равны, то возвращаем false
        if (curr !== currFromEnd) {
            return false;
        }
    }
    return true;
};
//второе решение с указателями
const isPalindrome2 = (str) => {
    //устанавливаем два указателя на начало и конец строки
    let first = 0;
    let last = str.length - 1;
    //приводим к нижнему регистру
    str = str.toLowerCase();
    //проходим циклом до тех пор, пока начальный указатель не сравняется (либо станет больше конечного)
    while (first < last) {
        //если находим пробел увеличиваем начальный указатель, тем самым пропуская его
        if (str[first] === ' ') {
            first++;
            continue;
        }
        //здесь уменьшаем, так же пропуская пробел
        if (str[last] === ' ') {
            last--;
            continue;
        }

        if (str[first] !== str[last]) {
            return false;
        }

        first++;
        last--;
    }
    return true;
};