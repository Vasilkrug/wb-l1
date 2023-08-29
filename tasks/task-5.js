//Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

const toLinkedList = (arr) => {
    //Реализация на классах
    //создаем класс Связного списка
    class LinkedList {
        constructor(){
            //первоначально шапка пуста
            this.head = null;
        }
        //метод добавления новых узлов
        add(value){
//создаем новый узел
            const node = new LinkedNode(value);

            // переменная для сохранения текущего узла
            let current;

            // если шапка пуста то добавляем новый узел и делаем его заголовком
            if (this.head == null)
                this.head = node;
            else {
                current = this.head;
                // если нет то проходим по следущим узлам и добавляем туда новые
                while (current.next) {
                    current = current.next;
                }

                // добавляем узел
                current.next = node;
            }
        }
    }
//класс узла содержащий значение и ссылку на следующий узел
    class LinkedNode {
        constructor (value){
            this.value = value;
            this.next = null;
        }
    }
//создаем новый список и проходимся по входящим данным циклом добавляя их в список
    const list = new LinkedList()
    arr.forEach(element => {
        list.add(element);
    });

    return list;
};


const toLinkedList2 = (arr) => {
    //здесь все тоже самое, только сделал без использования классов
    const obj = {
        head : null,
        add(value){
            const node = {value,next:null}
            let current;

            if (this.head == null)
                this.head = node;
            else {
                current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
            }
        }
    }
    arr.forEach(element => {
        obj.add(element)
    });
    return obj;
};