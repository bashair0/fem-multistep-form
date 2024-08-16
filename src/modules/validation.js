export const validateName = (inputID, msgField) => {
  const input = document.getElementById(inputID)
  const validityState = input.validity

  if (validityState.valueMissing) {
    msgField.textContent = 'This field is required!'
  } else {
    msgField.textContent = ''
  }
}

export const validateEmail = (inputID, msgField) => {
  const input = document.getElementById(inputID)
  const validityState = input.validity
  if (validityState.valueMissing) {
    msgField.textContent = 'This field is required!'
  } else if (validityState.patternMismatch) {
    msgField.textContent = 'Enter a valid email address please'
  } else {
    msgField.textContent = ''
  }
}

export const validatePhone = (inputID, msgField) => {
  const input = document.getElementById(inputID)
  const validityState = input.validity
  if (validityState.valueMissing) {
    msgField.textContent = 'This field is required!'
  } else if (isNaN(input.value)) {
    msgField.textContent = 'Entered value should be number'
  } else if (validityState.tooShort) {
    msgField.textContent = `Phone number shouldn't be less than ${input.minLength} numbers, you entered ${input.value.length}`
  } else if (validityState.rangeOverflow) {
    msgField.textContent = `Phone number shouldn't be more than ${input.maxLength} numbers, you entered ${input.value.length}`
  } else {
    msgField.textContent = ''
  }
}
