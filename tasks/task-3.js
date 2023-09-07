// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
//     вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го простого числа
// вычисление всех простых чисел до числа N
// Будет плюсом, если задумаетесь и об оптимизации.

const MathX = () => {
    const getNthFibonacciNumber = (n) => {
        //если число меньше 2 то возвращаем это же число (первые числа последовательности 0 и 1)
        if (n < 2) {
            return n;
        }
        //здесь устанавливаем переменные начала последовательности
        let a = 0;
        let fibNum = 1;
        for (let i = 2; i <= n; i++) {
            //находим сумму следующей последовательности
            let next = a + fibNum;
            //в а записываем предыдущее значение
            a = fibNum;
            //в fibNum записываем текущее
            fibNum = next;
        }
        return fibNum;
    };

    const getFibonacciSequence = (n) => {
        // По опрделению Числа Фибоначчи это последовательность натуральных чисел,
        // которая начинается с чисел ноль и один, а каждое следующее число равно сумме двух предыдущих:
        const fibSequence = [];
        //Устанавливаем первае два значения в 0 и 1
        fibSequence[0] = 0;
        fibSequence[1] = 1;
        //дальше проходим по формуле F_n = F_{n - 1} + F_{n - 2} и записываем их в результирующий массив
        //так как первые два числа мы уже уставновили, начинаем цикл с цифры 2
        for (let i = 2; i < n; ++i) {
            fibSequence[i] = fibSequence[i - 1] + fibSequence[i - 2];
        }

        return fibSequence;
    };

    //Функция определяющая является ли число простым
    const isPrime = (n) => {
        //Условием ищем до квадратного корня числа так как все что больше уже не будет являться простым числом
        for (let i = 2; i <= Math.sqrt(n); i++) {
            //Если находим хоть один делитель то это уже не просто число, так как просто делится только на 1 и на само себя
            if (n % i === 0) {
                return false;
            }
        }
        //число должно быть больше 1
        return n !== 1;
    };

    const getPrimeNumbersSequence = (n) => {
        const primeSequence = [];
        for (let i = 2; i <= n; i++) {
            if (isPrime(i)) {
                primeSequence.push(i);
            }
        }

        return primeSequence;
    };

    const getNthPrime = (n) => {
        if (n < 1) {
            return 'Некорректный параметр';
        }
        //устанавливаем два значения (count проходит до искомой позиции и number искомое число)
        let count = 0;
        let number;
        for (number = 2; count < n; number++) {
            //number в последней итерации увеличится, поэтому сделал пометку ниже
            if (isPrime(number)) {
                count++;
            }
        }
        // Уменьшаем на один так как число было увеличено в теле цикла один раз когда мы достигли искомого числа
        return number - 1;
    };

    return {
        getNthFibonacciNumber,
        getFibonacciSequence,
        getPrimeNumbersSequence,
        getNthPrime
    }
};