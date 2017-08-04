import {CONFIRM_TYPE} from './constants'

export default ({overlayElement, closeElement, resolve, type}) => e => {
  e.stopPropagation()

  if (e.target !== overlayElement && e.target !== closeElement) {
    return false
  }

  overlayElement.parentNode.removeChild(overlayElement)

  if (type === CONFIRM_TYPE) {
    resolve(false)
    return false
  }

  resolve(undefined)
}
