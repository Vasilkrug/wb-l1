//Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.
//
// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)
const tbody = document.querySelector('.tbody');
const table = document.querySelector('.table');

//функция рендера тела таблицы с параметрами для пагинации
const renderTable = (data, itemsPerPage, page) => {
    //уменьшаю переменную чтобы в самом начале копировалась с 0
    page--;
    //перемененые для копирования массива(для пагинации)
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    const paginateData = data.slice(start, end);

    const html = paginateData.map(({fname, lname, tel, address, city, state, zip}) => {
        return `<tr>
                       <td>${fname}</td>
                       <td>${lname}</td>
                       <td>${tel}</td>
                       <td>${address}</td>
                       <td>${city}</td>
                       <td>${state}</td>
                       <td>${zip}</td>
                    </tr>`
    }).join('');

    tbody.innerHTML = html;
};

const fetchData = async () => {
    const url = `http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true`;
    const request = await fetch(url);
    return await request.json();
};

const main = async () => {
    const data = await fetchData();
    let rows = 50;
    let currentPage = 1;
    renderTable(data, rows, currentPage);

    const paginationBtn = (page) => {
        const div = document.createElement('div');
        div.classList.add(`paginate-item`);
        div.textContent = `${page}`;
        //устанавливаем по условию активную кнопку пагинации
        if (currentPage === page) {
            div.classList.add('active-btn')
        }

        div.addEventListener('click', () => {
            currentPage = page;
            renderTable(data, rows, currentPage);
            //по клику удаляем из предыдущей кнопки этот класс
            let currentBtn = document.querySelector('.active-btn');
            currentBtn.classList.remove('active-btn');
            //вешаем на кнопку по которой кликнули активный класс
            div.classList.add('active-btn');
        })
        return div;
    };

    const pagination = (data, itemsPerPage) => {
        const paginationNumbers = document.querySelector('.pagination-numbers');
        const pagesCount = Math.ceil(data.length / itemsPerPage);

        for (let i = 1; i < pagesCount; i++) {
            const div = paginationBtn(i);
            paginationNumbers.appendChild(div);
        }
    }
    pagination(data, rows);
    //флаг для сохранения предыдущей копии массива
    // (если кликнуть снова по кнопке то сортировкк вернет массив в исходное состояние)
    let copyFlag = false;
    //по этому индексу сравниваем кликнули ли на конкретном элементе несколько раз чтобы менять флаг
    let currentIndex;
    //здесь хранится копия массива, кроме шапки
    let copy = [...Array.from(table.rows).slice(1)];
    const sort = (index) => {
        //меняем переменную в зависимости от флага
        let sortedRows;
        if (currentIndex === index) {
            copyFlag = !copyFlag;
        }
        if (copyFlag) {
            sortedRows = [...copy].sort((row1, row2) => {
                if (row1.cells[index].innerHTML < row2.cells[index].innerHTML) {
                    return -1;
                } else if (row1.cells[index].innerHTML > row2.cells[index].innerHTML) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else {
            sortedRows = [...copy];
        }
        //сначала очищаем а затем и добавляем в таблицу отсортированные строки
        table.tBodies[0].innerHTML = ''
        table.tBodies[0].append(...sortedRows)
    };

    //получаем шапку и формируем оттуда массив из th
    const head = table.rows[0].cells;
    const headRow = Array.from(head);

    headRow.forEach((th, index) => {
        th.addEventListener('click', () => {
            currentIndex = index;
            sort(index);
        })
    });
};

window.addEventListener('DOMContentLoaded', main);