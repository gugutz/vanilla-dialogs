import handleClose from '../../lib/core/handle-close'
import {ALERT_TYPE, CONFIRM_TYPE, PROMPT_TYPE} from '../../lib/core/constants'

describe('handleClose', () => {
  it('should stop the propagation of the event', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = ALERT_TYPE
    const target = closeElement

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(stopPropagation.mock.calls.length).toBe(1)
  })

  it('should do nothing if the target is not closeElement or overlayElement', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = ALERT_TYPE
    const target = document.createElement('div')

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(containerElement.children.length).toBe(1)
    expect(containerElement.children[0]).toBe(overlayElement)
  })

  it('should remove kill the overlayElement', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = ALERT_TYPE
    const target = closeElement

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(containerElement.children.length).toBe(0)
    expect(containerElement.children[0]).not.toBe(overlayElement)
  })

  it('should resolve with undefined', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = ALERT_TYPE
    const target = closeElement

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(resolve.mock.calls.length).toBe(1)
    expect(resolve.mock.calls[0][0]).toBe(undefined)
  })

  it('should resolve with undefined', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = PROMPT_TYPE
    const target = closeElement

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(resolve.mock.calls.length).toBe(1)
    expect(resolve.mock.calls[0][0]).toBe(undefined)
  })

  it('should resolve with false', () => {
    const closeElement = document.createElement('div')
    closeElement.id = 'close'
    const overlayElement = document.createElement('div')
    overlayElement.id = 'overlay'

    const containerElement = document.createElement('div')
    containerElement.appendChild(overlayElement)

    const resolve = jest.fn()

    const stopPropagation = jest.fn()
    const type = CONFIRM_TYPE
    const target = closeElement

    handleClose({
      closeElement,
      overlayElement,
      resolve,
      type
    })({
      stopPropagation,
      target
    })

    expect(resolve.mock.calls.length).toBe(1)
    expect(resolve.mock.calls[0][0]).toBe(false)
  })
})
