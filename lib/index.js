import style from './style.css'

const ALERT_TYPE = 1
const CONFIRM_TYPE = 2
const PROMPT_TYPE = 3

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

    const handleCloseEvent = e => {
      e.stopPropagation()
      if (e.target !== overlayElement && e.target !== closeElement) {
        return false
      }
      overlayElement.parentNode.removeChild(overlayElement)

      if (type === ALERT_TYPE) {
        resolve()
        return false
      }

      if (type === CONFIRM_TYPE) {
        resolve(false)
        return false
      }

      if (type === PROMPT_TYPE) {
        resolve(undefined)
        return false
      }
    }

    overlayElement.addEventListener('click', handleCloseEvent)
    closeElement.addEventListener('click', handleCloseEvent)

    overlayElement.appendChild(alertElement)
    alertElement.appendChild(contentElement)
    alertElement.appendChild(actionsElement)

    let confirmElement
    if (type === CONFIRM_TYPE || type === PROMPT_TYPE) {
      confirmElement = document.createElement('button')
      confirmElement.className = style.button
      confirmElement.textContent = options.confirmText || 'ok'

      const handleConfirm = e => {
        e.stopPropagation()
        if (e.target !== confirmElement) {
          return false
        }
        overlayElement.parentNode.removeChild(overlayElement)
        if (type === PROMPT_TYPE) {
          resolve(inputElement.value)
        } else {
          resolve(true)
        }
      }

      confirmElement.addEventListener('click', handleConfirm)
      actionsElement.appendChild(confirmElement)
    }

    let inputElement
    if (type === PROMPT_TYPE) {
      confirmElement.removeAttribute('disabled', '')
      inputElement = document.createElement('input')
      inputElement.type = 'text'

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

    actionsElement.appendChild(closeElement)
    document.body.appendChild(overlayElement)
  })

export const alert = dialog(ALERT_TYPE)
export const confirm = dialog(CONFIRM_TYPE)
export const prompt = dialog(PROMPT_TYPE)
