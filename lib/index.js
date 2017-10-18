import style from './style.css'
import {PROMPT_TYPE, ALERT_TYPE, CONFIRM_TYPE} from './core/constants'
import handleConfirm from './core/handle-confirm'
import handleClose from './core/handle-close'

const dialog = type => (text, options = {}) =>
  new Promise(resolve => {
    const overlayElement = document.createElement('div')
    overlayElement.className = style.overlay

    const alertElement = document.createElement('div')
    alertElement.className = style.box

    const contentElement = document.createElement('div')
    contentElement.className = style.content
    contentElement.textContent = text

    const actionsElement = document.createElement('div')
    actionsElement.className = style.actions

    const closeElement = document.createElement('button')
    closeElement.className = style.button
    closeElement.textContent =
      type === ALERT_TYPE ?
        options.confirmText || 'ok' :
        options.cancelText || 'cancel'

    const handleCloseEvent = handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })

    overlayElement.addEventListener('click', handleCloseEvent)
    closeElement.addEventListener('click', handleCloseEvent)

    overlayElement.appendChild(alertElement)
    alertElement.appendChild(contentElement)
    alertElement.appendChild(actionsElement)

    let confirmElement
    let inputElement
    if (type === CONFIRM_TYPE || type === PROMPT_TYPE) {
      confirmElement = document.createElement('button')
      confirmElement.className = style.button
      confirmElement.textContent = options.confirmText || 'ok'
      actionsElement.appendChild(confirmElement)
    }

    if (type === PROMPT_TYPE) {
      confirmElement.removeAttribute('disabled', '')
      inputElement = document.createElement('input')
      inputElement.type = 'text'
      inputElement.className = style.input

      if (options.defaultValue) {
        inputElement.value = options.defaultValue
      }

      contentElement.appendChild(inputElement)

      if (options.regex) {
        confirmElement.setAttribute('disabled', '')
        inputElement.addEventListener('input', () => {
          if (options.regex.test(inputElement.value) === true) {
            confirmElement.removeAttribute('disabled', '')
          } else {
            confirmElement.setAttribute('disabled', '')
          }
        })
      }
    }

    if (type === CONFIRM_TYPE || type === PROMPT_TYPE) {
      confirmElement.addEventListener(
        'click',
        handleConfirm({
          confirmElement,
          type,
          overlayElement,
          resolve,
          inputElement
        })
      )
    }

    actionsElement.appendChild(closeElement)
    document.body.appendChild(overlayElement)

    if (inputElement) {
      inputElement.focus()
    }
  })

export const alert = dialog(ALERT_TYPE)
export const confirm = dialog(CONFIRM_TYPE)
export const prompt = dialog(PROMPT_TYPE)
