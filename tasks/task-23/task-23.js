//Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля,
// использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.
const form = document.getElementById('form');
const passwordCharacters = document.querySelectorAll('[data-password]');
const passwordInput = document.getElementById('password');
const passwordInfo = document.querySelector('.password-info');

const passwordAnalyzer = (password) => {
    const errors = {length: false, upper: false, lower: false, digit: false, special: false}
    let rating = 0;
    let result = '';
    //вспомогательные функции
    const lengthCheck = (password) => {
        if (password.length >= 8) {
            rating++;
            errors.length = false;
        } else {
            errors.length = true;
        }
    };

    const upperLetterCheck = (password) => {
        if (/[A-Z]/.test(password)) {
            rating++
            errors.upper = false;
        } else {
            errors.upper = true;
        }
    };

    const lowerLetterCheck = (password) => {
        if (/[a-z]/.test(password)) {
            errors.lower = false;
            rating++;
        } else {
            errors.lower = true;
        }
    };

    const digitsCheck = (password) => {
        if (/\d/.test(password)) {
            rating++
            errors.digit = false;
        } else {
            errors.digit = true;
        }
    };

    const specialCheck = (password) => {
        if (/\W/.test(password)) {
            rating++;
            errors.special = false;
        } else {
            errors.special = true;
        }
    }
    //проводим проверки
    lengthCheck(password);
    upperLetterCheck(password);
    lowerLetterCheck(password);
    digitsCheck(password);
    specialCheck(password);
    //устанавливаем сложность пароля в зависимости от рейтинга
    if (rating === 5) {
        result = 'Strong';
        form.style.backgroundColor = 'green';
    } else if (rating >= 3 && rating <= 4) {
        result = 'Medium';
        form.style.backgroundColor = 'orange';
    } else {
        result = 'Week';
        form.style.backgroundColor = 'red';
    }
//устанавливаем стили для характеристик пароля, если с характеристикой все хорошо устанавливаем зеленый цвет,
// иначе красным, чтобы пользователь понял что ему нужно изменить
    passwordCharacters.forEach(character => {
        const name = character.dataset.password;
        if (errors[name]) {
            document.querySelector(`[data-password=${name}]`).style.color = 'red';
        } else {
            document.querySelector(`[data-password=${name}`).style.color = 'green';
        }
    })

    passwordInfo.innerHTML = result;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = passwordInput.value;
    passwordAnalyzer(value);
})