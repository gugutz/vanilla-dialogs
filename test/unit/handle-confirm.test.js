import handleConfirm from '../../lib/core/handle-confirm'
import {PROMPT_TYPE} from '../../lib/core/constants'

describe('handleConfirm', () => {
  it('should stop the propagation of the event', () => {
    const confirmElement = document.createElement('div')
    confirmElement.id = 'confirm'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()
    const inputElement = document.createElement('input')
    const type = 1

    const stopPropagation = jest.fn()
    const target = confirmElement

    handleConfirm({
      confirmElement,
      type,
      overlayElement,
      resolve,
      inputElement
    })({
      stopPropagation,
      target
    })

    expect(stopPropagation.mock.calls.length).toBe(1)
  })

  it('should do nothing if the target is different of the confirmElement', () => {
    const confirmElement = document.createElement('div')
    confirmElement.id = 'confirm'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()
    const inputElement = document.createElement('input')
    const type = 1

    const anotherElement = document.createElement('div')
    anotherElement.id = 'another'

    const stopPropagation = jest.fn()
    const target = anotherElement

    handleConfirm({
      confirmElement,
      type,
      overlayElement,
      resolve,
      inputElement
    })({
      stopPropagation,
      target
    })

    expect(containerElement.children[0]).toEqual(overlayElement)
  })

  it('should remove the overlayElement', () => {
    const confirmElement = document.createElement('div')
    confirmElement.id = 'confirm'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()
    const inputElement = document.createElement('input')
    const type = 1

    const anotherElement = document.createElement('div')
    anotherElement.id = 'another'

    const stopPropagation = jest.fn()
    const target = confirmElement

    handleConfirm({
      confirmElement,
      type,
      overlayElement,
      resolve,
      inputElement
    })({
      stopPropagation,
      target
    })

    expect(containerElement.children.length).toBe(0)
  })

  it('should resolve the value of the input', () => {
    const confirmElement = document.createElement('div')
    confirmElement.id = 'confirm'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()
    const inputElement = document.createElement('input')
    inputElement.value = 'Awesome value'
    const type = PROMPT_TYPE

    const stopPropagation = jest.fn()
    const target = confirmElement

    handleConfirm({
      confirmElement,
      type,
      overlayElement,
      resolve,
      inputElement
    })({
      stopPropagation,
      target
    })

    expect(resolve.mock.calls[0][0]).toBe(inputElement.value)
  })

  it('should resolve with true', () => {
    const confirmElement = document.createElement('div')
    confirmElement.id = 'confirm'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()
    const inputElement = document.createElement('input')
    inputElement.value = 'Awesome value'
    const type = 1

    const stopPropagation = jest.fn()
    const target = confirmElement

    handleConfirm({
      confirmElement,
      type,
      overlayElement,
      resolve,
      inputElement
    })({
      stopPropagation,
      target
    })

    expect(resolve.mock.calls[0][0]).toBe(true)
  })
})
