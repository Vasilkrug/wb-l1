//Задача: Создать и добавить элемент с использованием шаблонов:
// Напишите функцию, которая создает новый элемент с использованием шаблонов
// (например, с помощью тега <template>) и добавляет его в DOM.

const body = document.querySelector('body');
//функция на вход принимает текс для элемента шаблона
const createTemplate = (text = '') => {
    //создаем шаблон
    const template = document.createElement('template');
    //создаем элемент
    const p = document.createElement('p');
    p.innerHTML = text;
    template.content.appendChild(p);
    //возвращаем клон шаблона
    return template.content.cloneNode(true);
}

//вспомгательная ункция которая создает колонку
const createColumn = () => {
    const column = document.createElement('div');
    column.classList.add('column');
    return column;
}

//на каждой итерации создаем колонку
for (let i = 1; i <= 10; i++) {
    const column = createColumn();
    for (let j = 1; j <= 10; j++) {
        //здесь на каждой итерации заполняем колонку строками из шаблона
        const text = `${i} x ${j} = ${i * j}`;
        column.appendChild(createTemplate(text));
    }
    //в конце каждой итерации внешнего цилка добавляем колонку в бади
    body.appendChild(column);
}