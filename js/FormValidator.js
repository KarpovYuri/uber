export class FormValidator {
  constructor(formClasses, popup) {
    this._form = popup.querySelector(formClasses.formSelector);
    this._inputSelector = formClasses.inputSelector;
    this._buttonElement = this._form.querySelector(formClasses.submitButtonSelector);
    this._inactiveButtonClass = formClasses.inactiveButtonClass;
    this._inputErrorClass = formClasses.inputErrorClass;
    this._errorClass = formClasses.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }


  // Функция показа ошибки
  _showInputError() {
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }


  // Функция скрытия ошибки
  _hideInputError() {
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }


  // Вызов функций показа/скрытия ошибок
  _checkInputValidity(inputElement) {
    this._inputElement = inputElement;
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }


  // Проверка на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  // Переключение активности кнопки отправки формы и клавиши Enter
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }


  // Установка обработчиков событий
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }


  // Очистка формы от ошибок
  resetFormError() {
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      this._hideInputError();
    });
  }

  // Запуск валидации
  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
