// Получаем все кнопки с классами для регистрации, самовывоза и курьера
const buttons = document.querySelectorAll('.registration__button, .delivery__pickup, .delivery__courier');

// Проходим по каждой кнопке
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем переход по ссылке

        // Если текущая кнопка уже активна, убираем класс active
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            // Удаляем класс active у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            // Добавляем класс active для текущей кнопки
            button.classList.add('active');
        }
    });
});



// Бургер
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu');
    const menuNav = document.querySelector('.menu-nav');
    const menuLinks = menuNav.querySelectorAll('a');

    // Открытие/закрытие меню
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active'); // Управляет анимацией кнопки
        menuNav.classList.toggle('open'); // Управляет состоянием меню
        document.body.classList.toggle('no-scroll'); // Отключает/включает скролл
    });

    // Закрытие меню и плавный скроллинг при клике на ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Отключаем стандартное поведение
            const targetId = link.getAttribute('href').substring(1); // ID цели
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                });
            }

            // Закрытие меню после клика
            menuButton.classList.remove('active'); // Убираем анимацию кнопки
            menuNav.classList.remove('open'); // Закрываем меню
            document.body.classList.remove('no-scroll'); // Включаем скролл
        });
    });
});







// фильтр
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('slider-value');
const checkboxes = document.querySelectorAll('.filter-checkbox');
const products = document.querySelectorAll('.catalog__list-item');

// Initially, all products are visible
products.forEach(product => {
    product.style.display = '';
    product.classList.add('fade-in'); // Добавляем класс анимации при загрузке
});

priceSlider.addEventListener('input', debounce(() => {
    priceValue.textContent = priceSlider.value;
    filterProducts();
}, 200)); // Дебаунс с задержкой 200 мс

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', debounce(() => {
        filterProducts();
    }, 200)); // Дебаунс с задержкой 200 мс
});

function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function filterProducts() {
    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const maxPrice = parseInt(priceSlider.value);

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseInt(product.getAttribute('data-price'));

        // Убираем текущие классы анимации
        product.classList.remove('fade-in', 'fade-out');

        // Если чекбоксы не выбраны, фильтровать только по цене
        if (selectedCategories.length === 0) {
            if (productPrice <= maxPrice) {
                product.style.position = ''; // Сброс позиции
                product.style.display = ''; // Показываем элемент
                product.classList.add('fade-in');
            } else {
                product.classList.add('fade-out');
                setTimeout(() => product.style.display = 'none', 500); // Скрытие после анимации
            }
        } else {
            // Фильтрация по категориям и цене
            if (selectedCategories.includes(productCategory) && productPrice <= maxPrice) {
                product.style.position = ''; // Сброс позиции
                product.style.display = ''; // Показываем элемент
                product.classList.add('fade-in');
            } else {
                product.classList.add('fade-out');
                setTimeout(() => product.style.display = 'none', 500);
            }
        }
    });
}







