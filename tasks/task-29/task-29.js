//Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице
// и выполняет определенные действия с этими данными, например, отправляет
// их на сервер или отображает всплывающее окно с результатами.
// получаем элемент формы

const app = () => {
    const form = document.getElementById('form');
//вешаем обработчик на форму
    form.addEventListener('submit', (e) => {
        //отменяем перезагрузку страницы на сабмите
        e.preventDefault();
        // создаём объект FormData, передаём в него элемент формы
        const formData = new FormData(form);
        let result = [];
        // извлекаем данные
        //так как полей может быть много, проходим по ним в цикле
        for (let [name, value] of formData) {
            if (value) {
                result.push(`${name}: ${value}`);
            }
        }
        if (!result.length) {
            alert('Данных нет');
        } else {
            alert(`Данные: ${result.join(', ')}`);
        }
    });
};