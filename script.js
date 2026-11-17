
/* LEONIKA — ЗАКАЗЫ ЧЕРЕЗ WHATSAPP */

// Номер WhatsApp кондитерской
// Пока оставляем пустым
const whatsappNumber = "77000000000";

// Находим все кнопки "Заказать"
const orderButtons = document.querySelectorAll(".order-btn");

// Подключаем каждую кнопку

// Кнопки заказа в каталоге
orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Получаем название торта
        const cakeName = button.dataset.cake;

        // Выбираем этот торт в форме
        const cakeSelect = document.querySelector("#cakeSelect");
        cakeSelect.value = cakeName;

        // Прокручиваем страницу к форме
        document.querySelector("#order").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Кнопка WhatsApp в разделе контактов
const contactButton = document.querySelector(".contact-btn");

contactButton.addEventListener("click", () => {
    if (!whatsappNumber) {
        alert("Нужно добавить номер WhatsApp в script.js");
        return;
    }

    const message =
        "Здравствуйте! Хочу заказать торт в LEONIKA.";

    const url =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
});

// АНИМАЦИЯ ПРИ ПРОКРУТКЕ

const animatedElements = document.querySelectorAll(
    ".hero-text, .catalog-title, .cake-card, .about-image, .about-text, .contacts"
);

animatedElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
} else {
    animatedElements.forEach(element => {
        element.classList.add("active");
    });
}

// ФОРМА ЗАКАЗА LEONIKA

const cakeOrderForm = document.querySelector("#cakeOrderForm");
const cakeDateInput = document.querySelector("#cakeDate");

// Нельзя выбрать прошедшую дату
const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

cakeDateInput.min = localDate;

cakeOrderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const cake = document.querySelector("#cakeSelect").value;
    const weight = document.querySelector("#cakeWeight").value;
    const date = document.querySelector("#cakeDate").value;
    const wishes = document.querySelector("#cakeMessage").value.trim();

    if (!whatsappNumber) {
        alert("Сначала укажи номер WhatsApp в script.js");
        return;
    }

    const message =
        `Здравствуйте! Хочу заказать торт в LEONIKA.\n\n` +
        `🎂 Торт: ${cake}\n` +
        `⚖️ Вес: ${weight}\n` +
        `📅 Дата: ${date}\n` +
        `💗 Пожелания: ${wishes || "Нет"}\n\n` +
        `Подскажите, пожалуйста, стоимость и возможность заказа.`;

    const url =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
});

// МОБИЛЬНОЕ МЕНЮ LEONIKA

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#main-nav");

// Открытие и закрытие меню
menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
    );
});

// Закрываем меню при выборе раздела
mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
    });
});

// Закрываем меню клавишей Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        mobileNav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
    }
});
