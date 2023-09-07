//Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK.
// Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных:
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать
// все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

//импортирую функцию из 18 задания для подсчета свободного места в localstorage
import {getLocalStorageSize} from "../task-18.js";

const postsList = document.querySelector('.post-list');
//переменная для изменения смещения при запросах
let offset = 0;
//здесь будем хранить данные для сохранения и изъятия из localstorage
let cache = [];
//сколько элментов берем при запросахк вк апи
const itemsCount = 10;

//функция рендера элемента
const renderPosts = (posts) => {
    posts.forEach(post => {
        const li = document.createElement('li');
        let src = post.attachments[0]?.photo?.sizes[2]?.url ??
            post.attachments[0]?.video?.first_frame[2]?.url ??
            'https://kartinkof.club/uploads/posts/2022-05/1653242155_8-kartinkof-club-p-kartinki-privet-sessiya-8.jpg';
        li.classList.add('post-item');
        li.innerHTML = `<div class="post-text">${post.text}</div>
                            <div class="post-media">
                             <img src=${src} alt="post-img"/>
                        </div>`
        postsList.appendChild(li);
    })
};
//получаем данные со стены
const getData = () => {
    const token = 'vk1.a.Gk7xegvodjD40SkBXeZJ8tgUJsYYn5zJTmhg9fpFlT16uwQH4qdc7' +
        'LF3NfeogaiABe3ENd5hce6qJSRP5WYP5YNWXCbTtDP0nUsXhQdElMxV-QFMjofWM_pRmtfkIMrrIJYVpN7wfb__XxvwqYM' +
        '-Up9j6eSrCSPmqMsSyNxDT040Wz1mkrXQ836ZZ714hqwWP5bgwNJKUbFWE0TTW3E6dA'
    const group_id = -72495085;
    const domain = 'https://vk.com/tnull';

    VK.Api.call('wall.get', {
        owner_id: group_id,
        domain,
        access_token: token,
        count: itemsCount,
        offset: offset,
        v: "5.131"
    }, async (r) => {
        if (r.response) {
            //получаем посты, сохраняем в переменную кэша и рендерим
            const posts = r.response.items;
            cache.push(...posts);
            renderPosts(posts);
            //после рендера вешаем отслеживание на последний элемент
            observer.observe(document.querySelector('.post-item:last-child'));
            //проверяем свободное место в localstorage при каждом запросе
            checkLocalStorage();
        }
    });
};
//создаем обработчик отслеживания, если находим нужный элемент делаем запрос и увеличиваем спещение
const observer = new IntersectionObserver(posts => {
    posts.forEach(post => {
        if (post.isIntersecting) {
            offset += itemsCount;
            getData();
        }
    });
});

//сохраняем данные в localstorage
const saveToLocalStorage = () => {
    localStorage.setItem('posts', JSON.stringify(cache));
    localStorage.setItem('offset', offset);
};
//забираем данные из localstorage при первой загрузке страницы, если их нет то делаем запррос к апи
const getFromLocalStorage = () => {
    const cachePosts = localStorage.getItem('posts');
    const cacheOffset = localStorage.getItem('offset');
    if (cachePosts) {
        cache = JSON.parse(cachePosts);
        offset = parseInt(cacheOffset);
        renderPosts(cache);
        //после рендера нужно повесить обработчик
        observer.observe(document.querySelector('.post-item:last-child'));
    } else {
        getData();
    }
};
//здесь храним количество свободного места в localstorage
const totalSize = getLocalStorageSize();

const checkLocalStorage = () => {
    let currentSize = 0;
//проходим по каждому символу в строке localstorage
    //умножаем длину каждого элемента на 2 так как каждый символ в строке весит 2 байта
    for (let symbol in localStorage) {
        let amount;
        if (typeof localStorage[symbol] === 'string') {
            amount = (localStorage[symbol].length * 2);
            currentSize += amount;
        }
    }
    //получаем оставшееся свободное место
    const res = totalSize - currentSize;
    //отображаем количество свободного места
    console.log(`Осталось ${res} байт свободного места`)
    //если место есть то сохраняем
    if (res > 0) {
        saveToLocalStorage();
    } else {
        //если нет места то обрезаем массив и сохранем его в localstorage
        //таким образом как только место заканчивается , массив обрезается и освобождается место
        cache = cache.slice(cache.length / 2);
        saveToLocalStorage();
        console.log('Освобождено место в localstorage');
    }
};

getFromLocalStorage();

