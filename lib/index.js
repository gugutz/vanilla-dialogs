import style from './style.css'

const ALERT_TYPE = 1
const CONFIRM_TYPE = 2

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
    }

    overlayElement.addEventListener('click', handleCloseEvent)
    closeElement.addEventListener('click', handleCloseEvent)

    overlayElement.appendChild(alertElement)
    alertElement.appendChild(contentElement)
    alertElement.appendChild(actionsElement)

    if (type === CONFIRM_TYPE) {
      const confirmElement = document.createElement('button')
      confirmElement.className = style.button
      confirmElement.textContent = options.confirmText || 'ok'

      const handleConfirm = e => {
        e.stopPropagation()
        if (e.target !== confirmElement) {
          return false
        }
        overlayElement.parentNode.removeChild(overlayElement)
        resolve(true)
      }

      confirmElement.addEventListener('click', handleConfirm)
      actionsElement.appendChild(confirmElement)
    }

    actionsElement.appendChild(closeElement)
    document.body.appendChild(overlayElement)
  })

export const alert = dialog(ALERT_TYPE)
export const confirm = dialog(CONFIRM_TYPE)
