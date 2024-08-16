import {
  validateName,
  validateEmail,
  validatePhone
} from '../modules/validation'

export default class UI {
  static currentFormStepNum = 0
  static initialize () {
    this.cacheDOMElements()
    this.eventListeners()
    this.displayError(this.nameInput)
    this.displayError(this.mailInput)
    this.displayError(this.phoneInput)
  }

  static cacheDOMElements () {
    this.form = document.querySelector('[data-form]')
    this.formSteps = document.querySelectorAll('[data-form-step]')
    this.progressSteps = document.querySelectorAll('.progress-step__num')
    this.nameInput = document.querySelector('#name')
    this.mailInput = document.querySelector('#email')
    this.phoneInput = document.querySelector('#phone')
    this.nextButtons = document.querySelectorAll('[data-next-btn]')
    this.previousButtons = document.querySelectorAll('.btn-prev')
  }

  static eventListeners () {
    this.form.addEventListener('submit', e => {
      e.preventDefault()
    })

    this.nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.nextBtn === '1') {
          this.currentFormStepNum = 1
          if (
            !this.nameInput.checkValidity() ||
            !this.mailInput.checkValidity() ||
            !this.phoneInput.checkValidity()
          )
            return
        } else if (this.currentFormStepNum < this.progressSteps.length - 1) {
          this.currentFormStepNum++
        }
        this.updateFormSteps(this.currentFormStepNum)
        this.updateProgressBar(this.currentFormStepNum)
      })
    })

    this.previousButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.currentFormStepNum--
        this.updateFormSteps(this.currentFormStepNum)
        this.updateProgressBar(this.currentFormStepNum)
      })
    })

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

  static updateFormSteps = formStepsNum => {
    this.formSteps.forEach(formStep => {
      formStep.classList.contains('form-step-active') &&
        formStep.classList.remove('form-step-active')
    })

    this.formSteps[formStepsNum].classList.add('form-step-active')
  }

  static updateProgressBar = formStepsNum => {
    this.progressSteps.forEach(progressStep => {
      progressStep.classList.contains('progress-step-active') &&
        progressStep.classList.remove('progress-step-active')
    })

    this.progressSteps[formStepsNum].classList.add('progress-step-active')
  }
}
