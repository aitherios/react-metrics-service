jest.unmock('../client')

import { createClient } from '../client'

describe('client', () => {
  let subject

  describe('createClient()', () => {
    beforeEach(() => { subject = createClient() })
    it('exists', () => { expect(subject).toBeTruthy() })
  })

  describe('addMiddleware', () => {
    beforeEach(() => { subject = createClient() })
    it('adds a middleware', () => {
      const aMiddleware = {}
      subject.addMiddleware(aMiddleware)
      expect(subject.middlewares).toContain(aMiddleware)
    })
    it('injects react life cycle methods into middleware', () => {
      const aMiddleware = {}
      subject.addMiddleware(aMiddleware)
      expect(aMiddleware.componentWillMount).toBeTruthy()
      expect(aMiddleware.componentDidMount).toBeTruthy()
      expect(aMiddleware.componentWillUnmount).toBeTruthy()
    })
  })

  describe('removeMiddleware', () => {
    const aMiddleware = {}

    beforeEach(() => {
      subject = createClient({ middlewares: [aMiddleware, { other: true }] })
    })

    it('removes its middleware', () => {
      expect(subject.middlewares).toContain(aMiddleware)
      subject.removeMiddleware(aMiddleware)
      expect(subject.middlewares).not.toContain(aMiddleware)
    })
  })

  describe('callMiddlewares', () => {
    let aMiddlewareFunction
    let otherMiddlewareFunction
    let aMiddleware
    let otherMiddleware

    beforeEach(() => {
      aMiddlewareFunction = jest.fn()
      otherMiddlewareFunction = jest.fn()
      aMiddleware = { event: aMiddlewareFunction }
      otherMiddleware = { event: otherMiddlewareFunction }
      subject = createClient({ middlewares: [aMiddleware, otherMiddleware] })
    })

    it('calls both middlewares that respond to event', () => {
      subject.callMiddlewares('event')
      expect(aMiddlewareFunction.mock.calls.length).toBe(1)
      expect(otherMiddlewareFunction.mock.calls.length).toBe(1)
    })

    it('calls middleware with arguments "a", "b"', () => {
      subject.callMiddlewares('event', 'a', 'b')
      expect(aMiddlewareFunction.mock.calls[0][0]).toBe('a')
      expect(aMiddlewareFunction.mock.calls[0][1]).toBe('b')
    })

    it('warns when no middleware can respond to event', () => {
      console.warn = jest.fn()
      subject.callMiddlewares('noEvent')
      expect(console.warn.mock.calls.length).toBe(1)
    })
  })

  describe('other method calls traps to callMiddlewares', () => {
    let aMiddlewareFunction
    let aMiddleware

    beforeEach(() => {
      aMiddlewareFunction = jest.fn()
      aMiddleware = { event: aMiddlewareFunction }
      subject = createClient({ middlewares: [aMiddleware] })
    })

    it('method name is trapped as event name', () => {
      subject.event('a', 'b')
      expect(aMiddlewareFunction.mock.calls.length).toBe(1)
      expect(aMiddlewareFunction.mock.calls[0][0]).toBe('a')
      expect(aMiddlewareFunction.mock.calls[0][1]).toBe('b')
    })
  })
})
