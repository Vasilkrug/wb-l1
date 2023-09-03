//Задача: Добавить анимацию для элемента:
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

const start = document.querySelector('.start');
const ball = document.querySelector('.ball');
//функция имитирующая блок загрузки
const loader = () => {
    //начальный размер
    let startWidth = 20;
    //в интервале каждые 100 мс увеличиваем ширину,
    //интервал добавлен для плавности
    const timer = setInterval(() => {
        if (startWidth < 700) {
            startWidth += 20
            ball.style.width = `${startWidth}px`
        } else {
            clearInterval(timer)
        }

    }, 100)
}

start.addEventListener('click', loader)