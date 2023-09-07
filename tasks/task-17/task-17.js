//Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные
// в поле с помощью одного из геоинформационных сервисов
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
//Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const input = document.querySelector('.address-input');
const list = document.querySelector('.list');
const result = document.querySelector('.result');

const getAddress = () => {
//функция рендера
    const renderList = (data) => {
        //показываем список
        list.style.display = 'block';

        const html = data.map(item => {
            return `<li class="address-item">${item.value}</li>`
        }).join('');

        list.innerHTML = html;
//если есть потомки у списка то вешаем на них обработчики
        if (list.children.length) {
            const addressItems = document.querySelectorAll('.address-item');

            addressItems.forEach(address => {
                address.addEventListener('click', () => {
                    const text = address.textContent;
                    result.innerHTML = text;
                    list.style.display = 'none';
                    input.value = '';
                })
            })

        }
    }
//запрос к серверу
    const fetchData = async (value) => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const apiKey = "2b2a2bd6d973122542a2352b50b36946c27a2b40";

        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + apiKey
            },
            body: JSON.stringify({query: value})
        }

        const request = await fetch(url, options);
        const response = await request.json();
        //получив данные отправляем их на рендер
        renderList(response.suggestions);
    };
    //вызов функции вернет вторую функцию (обертку)
    // переменная isCoolDown имеет два состояния (false - готова выполниться, true - надо ждать)
    //пока переменная равна true все запросы будут игнорироваться
    const debounce = (f, ms) => {
        let isCoolDown = false;

        return (...args) => {
            if (isCoolDown) return;
            f.apply(this, args);
            isCoolDown = true;
            setTimeout(() => isCoolDown = false, ms);
        };
    };
//создание обертки
    const debouncedFetch = debounce(fetchData, 300);
//каждые ввод символа делает запрос на сервер, поэтому благдаря дебаунсу мы можем оптимизировать эти запросы,
// игнорируя лишние запросы и не нагружая нашу программу
    input.addEventListener('input', () => {
        const value = input.value;
        debouncedFetch(value);
    })
};
//скрытие списка по клику вне области
const hideList = () => {
    document.addEventListener('click', (e) => {
            const click = e.composedPath().includes(list)
            if (!click) {
                list.style.display = 'none';
            }
        }
    )
};

getAddress()
hideList()