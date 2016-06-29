jest.unmock('../client')

import { createClient } from '../client'

describe('client', () => {
  let subject

  describe('createClient()', () => {
    describe('without params', () => {
      beforeEach(() => { subject = createClient() })
      it('exists', () => { expect(subject).toBeTruthy() })
    })

    describe('with dispatchers array', () => {
      beforeEach(() => { subject = createClient({ dispatchers: [{ a: 'a' }, { b: 'b' }] }) })
      it('exists', () => { expect(subject).toBeTruthy() })
    })

    describe('with dispatcher object', () => {
      beforeEach(() => { subject = createClient({ dispatcher: { a: 'a' } }) })
      it('exists', () => { expect(subject).toBeTruthy() })
    })
  })

  describe('addDispatcher', () => {
    beforeEach(() => { subject = createClient() })
    it('adds a dispatcher', () => {
      const aDispatcher = { _dispatcherId: 1 }
      subject.addDispatcher(aDispatcher)
      expect(subject.dispatchers.map((d) => d._dispatcherId)).toContain(aDispatcher._dispatcherId)
    })
    it('injects react life cycle methods into dispatcher', () => {
      const aDispatcher = {}
      subject.addDispatcher(aDispatcher)
      expect(subject.dispatchers[0].componentWillMount).toBeTruthy()
      expect(subject.dispatchers[0].componentDidMount).toBeTruthy()
      expect(subject.dispatchers[0].componentWillUnmount).toBeTruthy()
    })
  })

  describe('removeDispatcher', () => {
    const aDispatcher = { _dispatcherId: 1 }

    beforeEach(() => {
      subject = createClient({ dispatchers: [aDispatcher, { other: true }] })
    })

    it('removes its dispatcher', () => {
      expect(subject.dispatchers.map((d) => d._dispatcherId)).toContain(aDispatcher._dispatcherId)
      subject.removeDispatcher(aDispatcher)
      expect(
        subject.dispatchers.map((d) => d._dispatcherId)
      ).not.toContain(aDispatcher._dispatcherId)
    })
  })

  describe('callDispatchers', () => {
    let aDispatcherFunction
    let otherDispatcherFunction
    let aDispatcher
    let otherDispatcher

    beforeEach(() => {
      aDispatcherFunction = jest.fn((i) => (i))
      otherDispatcherFunction = jest.fn((i) => (i))
      aDispatcher = { event: aDispatcherFunction }
      otherDispatcher = { event: otherDispatcherFunction }
      subject = createClient({ dispatchers: [aDispatcher, otherDispatcher] })
    })

    it('calls both dispatchers that respond to event', () => {
      subject.callDispatchers('event')
      expect(aDispatcherFunction.mock.calls.length).toBe(1)
      expect(otherDispatcherFunction.mock.calls.length).toBe(1)
    })

    it('calls dispatcher with arguments "a", "b"', () => {
      subject.callDispatchers('event', 'a', 'b')
      expect(aDispatcherFunction.mock.calls[0][0]).toBe('a')
      expect(aDispatcherFunction.mock.calls[0][1]).toBe('b')
    })

    it('warns when no dispatcher can respond to event', () => {
      console.warn = jest.fn()
      subject.callDispatchers('noEvent')
      expect(console.warn.mock.calls.length).toBe(1)
    })

    it('returns dispatchers responses', () => {
      expect(subject.callDispatchers('event', 1)).toEqual([1, 1])
    })
  })

  describe('other method calls traps to callDispatchers', () => {
    let aDispatcherFunction
    let aDispatcher

    beforeEach(() => {
      aDispatcherFunction = jest.fn()
      aDispatcher = { event: aDispatcherFunction }
      subject = createClient({ dispatchers: [aDispatcher] })
    })

    it('method name is trapped as event name', () => {
      subject.event('a', 'b')
      expect(aDispatcherFunction.mock.calls.length).toBe(1)
      expect(aDispatcherFunction.mock.calls[0][0]).toBe('a')
      expect(aDispatcherFunction.mock.calls[0][1]).toBe('b')
    })
  })
})
