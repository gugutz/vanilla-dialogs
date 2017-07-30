import {PROMPT_TYPE} from './constants'

export default ({
  type,
  confirmElement,
  overlayElement,
  resolve,
  inputElement
}) => event => {
  event.stopPropagation()
  if (event.target !== confirmElement) {
    return false
  }
  overlayElement.parentNode.removeChild(overlayElement)
  if (type === PROMPT_TYPE) {
    resolve(inputElement.value)
  } else {
    resolve(true)
  }
}
