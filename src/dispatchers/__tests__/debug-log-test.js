jest.unmock('../debug-log')

import debugLog from '../debug-log'

describe('debugLog', () => {
  let subject

  describe('logs a message for any event', () => {
    beforeEach(() => {
      console.warn = jest.fn()
      subject = debugLog
    })

    it('logs for "Event"', () => {
      subject.Event()
      expect(console.warn.mock.calls.length).toBe(1)
    })

    it('logs for "OtherEvent", "a", "b"', () => {
      subject.OtherEvent('a', 'b')
      expect(console.warn.mock.calls.length).toBe(1)
      expect(console.warn.mock.calls[0][1]).toBe('a')
      expect(console.warn.mock.calls[0][2]).toBe('b')
    })
  })
})
