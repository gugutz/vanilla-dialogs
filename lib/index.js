import style from './style.css'

export const alert = text => new Promise(resolve => {
  const overlayElement = document.createElement('div')
  overlayElement.className = style.overlay

  const alertElement = document.createElement('div')
  alertElement.className = style.alert

  const contentElement = document.createElement('div')
  contentElement.className = style.content
  contentElement.textContent = text

  const actionsElement = document.createElement('div')
  actionsElement.className = style.actions

  const closeElement = document.createElement('button')
  closeElement.className = style.close
  closeElement.textContent = 'ok'

  const closeAlert = e => {
    e.stopPropagation()
    if (e.target !== overlayElement && e.target !== closeElement) {
      return false
    }
    overlayElement.parentNode.removeChild(overlayElement)
    resolve()
  }

  overlayElement.addEventListener('click', closeAlert)
  closeElement.addEventListener('click', closeAlert)

  overlayElement.appendChild(alertElement)
  alertElement.appendChild(contentElement)
  alertElement.appendChild(actionsElement)
  actionsElement.appendChild(closeElement)

  document.body.appendChild(overlayElement)
})
