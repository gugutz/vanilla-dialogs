export const PROMPT_TYPE = 3

export const handleConfirm = ({
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
