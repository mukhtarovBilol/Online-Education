function toggleMenu() {
    document.querySelector('.nav__list').classList.toggle('active');
    document.querySelector('.burger').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
}

function closeMenu() {
    document.querySelector('.nav__list').classList.remove('active');
    document.querySelector('.burger').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.question__card');

    cards.forEach(card => {
        const header = card.querySelector('.question__card-header');
        const answer = card.querySelector('.question__card-answer');
        const toggleButton = card.querySelector('.toggle-button');

        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');

            // Закрываем все карточки перед открытием новой
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('open');
                    const otherAnswer = otherCard.querySelector('.question__card-answer');
                    // otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.padding = '0 15px';
                    otherCard.querySelector('.toggle-button').style.transform = 'rotate(0)';
                }
            });

            // Открываем/закрываем текущую карточку
            if (isOpen) {
                card.classList.remove('open');
                // answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                answer.style.padding = '0 15px';
                toggleButton.style.transform = 'rotate(0)';
            } else {
                card.classList.add('open');

                // Убираем max-height = 0 перед расчетом высоты
                // answer.style.maxHeight = 'none';
                answer.style.opacity = '1';
                answer.style.padding = '15px';

                // Даем время браузеру применить изменения, затем задаем правильную высоту
                requestAnimationFrame(() => {
                    // const height = answer.scrollHeight + 'px';
                    answer.style.maxHeight = height; // Гарантированное полное открытие
                });

                toggleButton.style.transform = 'rotate(45deg)';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.module__card');

    cards.forEach(card => {
        const header = card.querySelector('.module__card-header');
        const answer = card.querySelector('.module__card-answer');
        const toggleButton = card.querySelector('.toggle-button');

        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');

            // Закрываем все карточки перед открытием новой
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('open');
                    const otherAnswer = otherCard.querySelector('.module__card-answer');
                    // otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.padding = '0 15px';
                    otherCard.querySelector('.toggle-button').style.transform = 'rotate(0)';
                }
            });

            // Открываем/закрываем текущую карточку
            if (isOpen) {
                card.classList.remove('open');
                // answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                answer.style.padding = '0 15px';
                toggleButton.style.transform = 'rotate(0)';
            } else {
                card.classList.add('open');

                // Убираем max-height = 0 перед расчетом высоты
                // answer.style.maxHeight = 'none';
                answer.style.opacity = '1';
                answer.style.padding = '15px';

                // Даем время браузеру применить изменения, затем задаем правильную высоту
                requestAnimationFrame(() => {
                    // const height = answer.scrollHeight + 'px';
                    answer.style.maxHeight = height; // Гарантированное полное открытие
                });

                toggleButton.style.transform = 'rotate(45deg)';
            }
        });
    });
});


// отправка данные из модалки

// Получение элементов страницы
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('modal');
const phoneInput = document.getElementById('phone');

// Открыть модалку при клике на кнопку
openModalButton.addEventListener('click', function () {
    modal.classList.add('show');
});

// Закрыть модалку при клике на пустое место
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Обработка отправки формы
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Валидация полей формы
    if (!name) {
        alert('Пожалуйста, введите ваше имя.');
        return;
    }

    if (!phone || phone === '+998 ') {
        alert('Пожалуйста, введите корректный номер телефона.');
        return;
    }

    // Уведомление об успешной отправке
    alert(`Рахмат, ${name}! Тез орада телефон қиламиз 😊`);

    // Сброс формы
    this.reset();

    // Закрыть модалку после отправки
    modal.classList.remove('show');

    // Отправить данные в Telegram
    sendToTelegram(name, phone);
});

// Автоматическое добавление префикса "+998" для телефона
phoneInput.addEventListener('input', function () {
    if (!this.value.startsWith('+998')) {
        this.value = '+998 ';
    }
    this.value = this.value.replace(/[^\+\d\s-]/g, ''); // Удаление недопустимых символов
});

// Функция для отправки сообщения в Telegram
function sendToTelegram(name, phone) {
    const token = '7766333958:AAFeYXD-guOtwB6-4xeTU1UanMtu55qkkjw'; // Замените на ваш новый токен
    const chatId = '-4612448643'; // Замените на корректный chat_id

    const message = `Новое сообщение:\nИмя: ${name}\nТелефон: ${phone}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    console.log('Отправляем запрос:', url);

    fetch(url)
        .then(response => {
            console.log('HTTP статус:', response.status);
            return response.json();
        })
        .then(data => {
            if (data.ok) {
                console.log('Сообщение успешно отправлено в Telegram.');
            } else {
                console.error('Ошибка API Telegram:', data);
                alert('Ошибка отправки сообщения. Проверьте токен или chat_id.');
            }
        })
        .catch(error => {
            console.error('Ошибка сети:', error);
            alert('Ошибка сети. Проверьте подключение к интернету.');
        });
}


