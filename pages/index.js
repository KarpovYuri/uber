// Импорт класса валидации
import { FormValidator } from "../js/FormValidator.js";


// Обработчик события загрузки страницы
window.addEventListener('DOMContentLoaded', () => {


  // Переменные мобильного меню
  const menu = document.querySelector('.nav-menu__content');
  const menuItem = menu.querySelectorAll('.nav-menu__item');
  const hamburger = document.querySelector('.hamburger');
  const hamburgerItem = hamburger.querySelectorAll('.hamburger__line');


  // Переменные для работы с модальным окном
  const buttons = document.querySelectorAll('button');
  const leaveRequest = document.querySelector('#leaveRequest');
  const formPopup = document.querySelector('#formPopup');
  const popupTitle = formPopup.querySelector('.popup__title');
  const closeButton = formPopup.querySelector('.popup__close-button');
  const form = formPopup.querySelector('.popup__form');
  const nameInput = formPopup.querySelector('#nameInput');
  const phoneInput = formPopup.querySelector('#phoneInput');
  const popupButton = formPopup.querySelector('.popup__button');
  const messagePopup = document.querySelector('#messagePopup');


  // Объект классов необходимый для запуса валидации
  const formClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active',
  };


  // Создание экземпляра классa валидации
  const Validator = new FormValidator(formClasses, formPopup);


  // Закрытие popup'ов по нажатию Esc
  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(formPopup);
    }
  }


  // Закрытие popup'a
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    // Удаляем обработчик 'Esc' при закрытии
    if (popup.id === 'formPopup') {
      document.removeEventListener('keydown', closeByEsc);
    }
  }


  // Открытие popup'a
  function openPopup(event, popup) {
    if (event.target.id === 'orderCall') {
      popupTitle.textContent = 'Заказать звонок';
      popupButton.textContent = 'Заказать';
    }
    if (event.target.id === 'sendRequest' || event.target.id === 'leaveRequest') {
      popupTitle.textContent = 'Отправить заявку';
      popupButton.textContent = 'Отправить';
    }
    popup.classList.add('popup_opened');
    // Установка обработчика событий на 'Esc' при открытии popup'a
    if (popup.id === 'formPopup') {
      document.addEventListener('keydown', closeByEsc);
    }
  }



  // Проверка input'ов на пустоту
  function checkEmptyField() {
    if (nameInput.value === '' && phoneInput.value === '') {
      Validator.resetFormError();
      Validator.toggleButtonState();
    }
  }


  // Установка обработчиков на кнопки 'Заказать звонок' и 'Отправить заявку'
  buttons.forEach((item) => {
    item.addEventListener('click', (event) => {
      checkEmptyField();
      openPopup(event, formPopup);
    });
  });


  // Установка обработчика на пункт меню 'Оставь заявку'
  leaveRequest.addEventListener('click', (event) => {
    event.preventDefault();
    checkEmptyField();
    openPopup(event, formPopup);
  });


  // Закрытие popup'a по крестику
  closeButton.addEventListener('click', () => {
    closePopup(formPopup);
  }
  );


  // Закрытие popup'a по overlay
  formPopup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(formPopup);
    }
  });


  // Обработчик событий формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closePopup(formPopup);
    evt.target.reset();
    setTimeout(() => {
      openPopup(evt, messagePopup);
      setTimeout(() => closePopup(messagePopup), 1500);
    }, 150);
  });


  // Запуск валидации
  Validator.enableValidation();


  // Обработчик событий нажатия на 'Гамбургер'
  hamburger.addEventListener('click', () => {
    hamburgerItem.forEach(item => {
      item.classList.toggle('hamburger__line_active');
    });
    menu.classList.toggle('nav-menu__content_active');
  });


  // Обработчик событий нажатия на 'Крестик' или пункт меню
  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      hamburgerItem.forEach(item => {
        item.classList.toggle('hamburger__line_active');
      });
      menu.classList.toggle('nav-menu__content_active');
    });
  });

});
