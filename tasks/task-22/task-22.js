//Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write().
// Объясните результат.

//функция отрабатывает 21 раз
//согласно одной статьи из хабра https://habr.com/ru/articles/305366/
// это баг, потенциально позволявший уронить браузер
//в файле index.html я попробовал воспроизвести данную задачу и появляется 21 элемент.
// В Firefox, Edge тоже 21,
// (видимо с момента написания статьи Edge тоже исправил ситуацию
// так как на момент написания статьи в 2016 году он позволял вставить 20 элементов)