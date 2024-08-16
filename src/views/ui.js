import {
  validateName,
  validateEmail,
  validatePhone
} from '../modules/validation'

export default class UI {
  static initialize () {
    this.cacheDOMElements()
    this.eventListeners()
    this.displayError(this.nameInput)
    this.displayError(this.mailInput)
    this.displayError(this.phoneInput)
  }

  static cacheDOMElements () {
    this.nameInput = document.querySelector('#name')
    this.mailInput = document.querySelector('#email')
    this.phoneInput = document.querySelector('#phone')
  }

  static eventListeners () {
    this.phoneInput.addEventListener('input', () => {
      const phoneErrorMsg = document.querySelector('[data-phone-err]')
      validatePhone('phone', phoneErrorMsg)
    })

    this.mailInput.addEventListener('input', () => {
      const mailErrorMsg = document.querySelector('[data-email-err]')
      validateEmail('email', mailErrorMsg)
    })

    this.nameInput.addEventListener('input', () => {
      const nameErrorMsg = document.querySelector('[data-userName-err]')
      validateName('name', nameErrorMsg)
    })
  }

  static displayError = inputField => {
    inputField.addEventListener('input', e => {
      if (inputField.checkValidity()) {
        e.target.classList.remove('red-border')
      } else {
        e.target.classList.add('red-border')
      }
    })
  }
}
