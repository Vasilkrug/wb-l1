//Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент,
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

//функция принимает 4 параметра:родителя,тэг создаваемого элемента,текст этого элемента и объект стилей
//свойство пишется в формате camelCase, значения для для стилей (если это размеры, отступы и другие цифровые) пишутся в строке с указанием единиц измерения
//например ('22px','1rem' и прочее)
const createElement = (parent, tag, text, styles) => {
    const element = document.createElement(tag);
    element.textContent = text;
    Object.keys(styles).forEach(key => {
        element.style[key] = `${styles[key]}`;
    })
    parent.appendChild(element);
};
