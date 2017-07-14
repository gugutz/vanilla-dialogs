import style from './style.css'

export const alert = text => new Promise(resolve => {
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

export const confirm = text => new Promise(resolve => {
  const overlayElement = document.createElement('div')
  overlayElement.className = style.overlay

  const boxElement = document.createElement('div')
  boxElement.className = style.box

  const contentElement = document.createElement('div')
  contentElement.className = style.content
  contentElement.textContent = text

  const actionsElement = document.createElement('div')
  actionsElement.className = style.actions

  const closeElement = document.createElement('button')
  closeElement.className = style.button
  closeElement.textContent = 'cancel'

  const confirmElement = document.createElement('button')
  confirmElement.className = style.button
  confirmElement.textContent = 'ok'

  const handleClose = e => {
    e.stopPropagation()
    if (e.target !== overlayElement && e.target !== closeElement) {
      return false
    }
    overlayElement.parentNode.removeChild(overlayElement)
    resolve(false)
  }

  const handleConfirm = e => {
    e.stopPropagation()
    if (e.target !== confirmElement) {
      return false
    }
    overlayElement.parentNode.removeChild(overlayElement)
    resolve(true)
  }

  closeElement.addEventListener('click', handleClose)
  overlayElement.addEventListener('click', handleClose)
  confirmElement.addEventListener('click', handleConfirm)

  overlayElement.appendChild(boxElement)
  boxElement.appendChild(contentElement)
  boxElement.appendChild(actionsElement)
  actionsElement.appendChild(confirmElement)
  actionsElement.appendChild(closeElement)

  document.body.appendChild(overlayElement)
})
